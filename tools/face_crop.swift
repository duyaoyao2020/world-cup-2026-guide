import AppKit
import Foundation
import Vision

guard CommandLine.arguments.count == 3 else {
    fputs("usage: face_crop input output\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])

guard let image = NSImage(contentsOf: inputURL),
      let source = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    fputs("could not read image\n", stderr)
    exit(3)
}

let request = VNDetectFaceRectanglesRequest()
let handler = VNImageRequestHandler(cgImage: source, options: [:])

do {
    try handler.perform([request])
} catch {
    fputs("face detection failed: \(error)\n", stderr)
    exit(4)
}

guard let faces = request.results, !faces.isEmpty else {
    fputs("no face found\n", stderr)
    exit(5)
}

let face = faces.max { left, right in
    left.boundingBox.width * left.boundingBox.height < right.boundingBox.width * right.boundingBox.height
}!.boundingBox

let width = CGFloat(source.width)
let height = CGFloat(source.height)
let faceX = face.origin.x * width
let faceY = (1 - face.origin.y - face.height) * height
let faceWidth = face.width * width
let faceHeight = face.height * height

// Keep the crop close to the head while retaining hair, chin, and a little shoulder context.
let side = min(max(faceWidth, faceHeight) * 1.75, min(width, height))
let centerX = faceX + faceWidth / 2
let centerY = faceY + faceHeight * 0.46
let cropX = min(max(centerX - side / 2, 0), width - side)
let cropY = min(max(centerY - side / 2, 0), height - side)
let cropRect = CGRect(x: cropX, y: cropY, width: side, height: side).integral

guard let cropped = source.cropping(to: cropRect) else {
    fputs("crop failed\n", stderr)
    exit(6)
}

let size = 507
guard let context = CGContext(
    data: nil,
    width: size,
    height: size,
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: CGColorSpaceCreateDeviceRGB(),
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    fputs("could not create image context\n", stderr)
    exit(7)
}

context.setFillColor(NSColor.clear.cgColor)
context.fill(CGRect(x: 0, y: 0, width: size, height: size))
context.addEllipse(in: CGRect(x: 0, y: 0, width: size, height: size))
context.clip()
context.interpolationQuality = .high
context.draw(cropped, in: CGRect(x: 0, y: 0, width: size, height: size))

guard let result = context.makeImage() else {
    fputs("render failed\n", stderr)
    exit(8)
}

let bitmap = NSBitmapImageRep(cgImage: result)
guard let png = bitmap.representation(using: .png, properties: [:]) else {
    fputs("png encoding failed\n", stderr)
    exit(9)
}

try png.write(to: outputURL)
