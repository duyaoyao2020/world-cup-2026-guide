import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { CanvasTexture, LinearFilter, SRGBColorSpace } from "three";
import type { Lineup, Player, Side } from "../types";

function Marking({
  x = 0,
  z = 0,
  width,
  depth,
}: {
  x?: number;
  z?: number;
  width: number;
  depth: number;
}) {
  return (
    <mesh position={[x, 0.235, z]} receiveShadow={false}>
      <boxGeometry args={[width, 0.018, depth]} />
      <meshBasicMaterial color="#e5f0e8" />
    </mesh>
  );
}

function GoalFrame({ x, facing }: { x: number; facing: 1 | -1 }) {
  const backX = x + facing * 0.65;
  return (
    <group>
      {[-1.15, 1.15].map((z) => (
        <group key={z}>
          <mesh position={[x, 0.62, z]}>
            <boxGeometry args={[0.055, 0.85, 0.055]} />
            <meshBasicMaterial color="#f4fff8" />
          </mesh>
          <mesh position={[(x + backX) / 2, 1, z]}>
            <boxGeometry args={[0.7, 0.045, 0.045]} />
            <meshBasicMaterial color="#d8e7dd" />
          </mesh>
        </group>
      ))}
      <mesh position={[x, 1, 0]}>
        <boxGeometry args={[0.055, 0.055, 2.35]} />
        <meshBasicMaterial color="#f4fff8" />
      </mesh>
      <mesh position={[backX, 1, 0]}>
        <boxGeometry args={[0.045, 0.045, 2.35]} />
        <meshBasicMaterial color="#c7d9ce" />
      </mesh>
    </group>
  );
}

function FieldMarkings() {
  return (
    <group>
      <Marking z={-4.75} width={14.45} depth={0.045} />
      <Marking z={4.75} width={14.45} depth={0.045} />
      <Marking x={-7.2} width={0.045} depth={9.5} />
      <Marking x={7.2} width={0.045} depth={9.5} />
      <Marking width={0.045} depth={9.5} />
      <Marking x={-6.22} z={-2.5} width={1.95} depth={0.04} />
      <Marking x={-6.22} z={2.5} width={1.95} depth={0.04} />
      <Marking x={-5.25} width={0.04} depth={5.04} />
      <Marking x={6.22} z={-2.5} width={1.95} depth={0.04} />
      <Marking x={6.22} z={2.5} width={1.95} depth={0.04} />
      <Marking x={5.25} width={0.04} depth={5.04} />
      <Marking x={-6.82} z={-1.2} width={0.76} depth={0.035} />
      <Marking x={-6.82} z={1.2} width={0.76} depth={0.035} />
      <Marking x={-6.45} width={0.035} depth={2.44} />
      <Marking x={6.82} z={-1.2} width={0.76} depth={0.035} />
      <Marking x={6.82} z={1.2} width={0.76} depth={0.035} />
      <Marking x={6.45} width={0.035} depth={2.44} />
      <mesh position={[0, 0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.31, 1.35, 64]} />
        <meshBasicMaterial color="#e5f0e8" />
      </mesh>
      <mesh position={[-5.25, 0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.31, 1.35, 48, 1, -0.88, 1.76]} />
        <meshBasicMaterial color="#e5f0e8" />
      </mesh>
      <mesh position={[5.25, 0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.31, 1.35, 48, 1, Math.PI - 0.88, 1.76]} />
        <meshBasicMaterial color="#e5f0e8" />
      </mesh>
      {[-5.95, 0, 5.95].map((x) => (
        <mesh key={x} position={[x, 0.245, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.065, 18]} />
          <meshBasicMaterial color="#e5f2e8" />
        </mesh>
      ))}
      {[
        [-7.2, -4.75, 0],
        [-7.2, 4.75, -Math.PI / 2],
        [7.2, -4.75, Math.PI / 2],
        [7.2, 4.75, Math.PI],
      ].map(([x, z, start]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.245, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 20, 1, start, Math.PI / 2]} />
          <meshBasicMaterial color="#e5f0e8" />
        </mesh>
      ))}
      <GoalFrame x={-7.2} facing={-1} />
      <GoalFrame x={7.2} facing={1} />
    </group>
  );
}

function PlayerModel({
  player,
  shirtColor,
  shortsColor,
  numberColor,
  active,
  onSelect,
  side,
}: {
  player: Player;
  shirtColor: string;
  shortsColor: string;
  numberColor: string;
  active: boolean;
  onSelect: () => void;
  side: Side;
}) {
  const progression = (50 - player.y) / 7.4;
  const px = side === "home" ? progression : -progression;
  const pz = (player.x - 50) / 10.2;
  const scale = active ? 1.2 : 1;
  const numberTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 192;
    canvas.height = 192;
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = numberColor;
    context.font = "900 132px Arial Narrow, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(player.number), 96, 102);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    return texture;
  }, [numberColor, player.number]);

  return (
    <group
      position={[px, 0.18, pz]}
      scale={scale}
      onClick={(event) => { event.stopPropagation(); onSelect(); }}
    >
      <mesh position={[0, 1.28, 0]} castShadow>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#ba8b68" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.91, 0]} castShadow scale={[1, 1.12, 0.62]}>
        <capsuleGeometry args={[0.25, 0.42, 8, 18]} />
        <meshStandardMaterial color={shirtColor} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.93, 0.166]}>
        <planeGeometry args={[0.54, 0.6]} />
        <meshBasicMaterial map={numberTexture} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow scale={[1, 0.5, 0.7]}>
        <boxGeometry args={[0.52, 0.45, 0.33]} />
        <meshStandardMaterial color={shortsColor} roughness={0.65} />
      </mesh>
      {[-0.17, 0.17].map((x) => (
        <group key={`leg-${x}`} position={[x, 0.2, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.07, 0.45, 6, 12]} />
            <meshStandardMaterial color="#ba8b68" />
          </mesh>
          <mesh position={[0, -0.27, 0.07]} scale={[1, 0.45, 1.7]} castShadow>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#d8ff3e" roughness={0.5} />
          </mesh>
        </group>
      ))}
      {[-0.35, 0.35].map((x) => (
        <mesh key={`arm-${x}`} position={[x, 0.9, 0]} rotation={[0, 0, x > 0 ? -0.22 : 0.22]} castShadow>
          <capsuleGeometry args={[0.065, 0.43, 6, 12]} />
          <meshStandardMaterial color="#ba8b68" />
        </mesh>
      ))}
      <Html center position={[0, 1.72, 0]} distanceFactor={11} zIndexRange={[10, 0]}>
        <button
          className={`player-label ${active ? "player-label--active" : ""}`}
          onClick={(event) => { event.stopPropagation(); onSelect(); }}
          aria-label={`${player.name}，${player.position}`}
        >
          <b>{player.number}</b><span>{player.name}</span>
        </button>
      </Html>
    </group>
  );
}

function Field({ lineup, side, activePlayer, onSelect }: Pitch3DProps) {
  return (
    <>
      <color attach="background" args={["#07120e"]} />
      <ambientLight intensity={1.45} />
      <directionalLight position={[4, 9, 4]} intensity={3.2} color="#d9ffeb" castShadow />
      <pointLight position={[-4, 3, -3]} intensity={10} color={lineup.kit.shirt} />
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[15.5, 0.12, 10.5]} />
        <meshStandardMaterial color="#0b4e36" roughness={0.82} />
      </mesh>
      <FieldMarkings />
      {lineup.players.map((player) => (
        <PlayerModel
          key={player.id}
          player={player}
          shirtColor={lineup.kit.shirt}
          shortsColor={lineup.kit.shorts}
          numberColor={lineup.kit.number}
          active={activePlayer?.id === player.id}
          onSelect={() => onSelect(player)}
          side={side}
        />
      ))}
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.58} maxPolarAngle={0.88} />
    </>
  );
}

interface Pitch3DProps {
  lineup: Lineup;
  side: Side;
  activePlayer?: Player;
  onSelect: (player: Player) => void;
}

export function Pitch3D(props: Pitch3DProps) {
  return (
    <Canvas
      className="pitch-canvas"
      camera={{ position: [0, 16.4, 14.2], fov: 44 }}
      shadows
      dpr={[1, 1.45]}
      fallback={<div className="webgl-fallback">此设备使用2.5D阵容卡片模式</div>}
    >
      <Suspense fallback={null}>
        <Field {...props} />
      </Suspense>
    </Canvas>
  );
}
