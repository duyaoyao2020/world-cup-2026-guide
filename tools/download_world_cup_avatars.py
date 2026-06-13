#!/usr/bin/env python3
"""Download Wikipedia player photos and create 507px circular head avatars."""

import csv
import json
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote, unquote

import requests
from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "头像"
CACHE = ROOT / ".avatar-cache"
SQUADS_URL = "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads"
USER_AGENT = "WorldCupAvatarBuilder/1.0 (personal research project)"

TEAM_NAMES = {
    "Algeria": "阿尔及利亚队", "Argentina": "阿根廷队", "Australia": "澳大利亚队",
    "Austria": "奥地利队", "Belgium": "比利时队", "Bosnia and Herzegovina": "波黑队",
    "Brazil": "巴西队", "Canada": "加拿大队", "Cape Verde": "佛得角队",
    "Colombia": "哥伦比亚队", "Croatia": "克罗地亚队", "Curaçao": "库拉索队",
    "Czech Republic": "捷克队", "DR Congo": "民主刚果队", "Ecuador": "厄瓜多尔队",
    "Egypt": "埃及队", "England": "英格兰队", "France": "法国队", "Germany": "德国队",
    "Ghana": "加纳队", "Haiti": "海地队", "Iran": "伊朗队", "Iraq": "伊拉克队",
    "Ivory Coast": "科特迪瓦队", "Japan": "日本队", "Jordan": "约旦队",
    "Mexico": "墨西哥队", "Morocco": "摩洛哥队", "Netherlands": "荷兰队",
    "New Zealand": "新西兰队", "Norway": "挪威队", "Panama": "巴拿马队",
    "Paraguay": "巴拉圭队", "Portugal": "葡萄牙队", "Qatar": "卡塔尔队",
    "Saudi Arabia": "沙特阿拉伯队", "Scotland": "苏格兰队", "Senegal": "塞内加尔队",
    "South Africa": "南非队", "South Korea": "韩国队", "Spain": "西班牙队",
    "Sweden": "瑞典队", "Switzerland": "瑞士队", "Tunisia": "突尼斯队",
    "Turkey": "土耳其队", "United States": "美国队", "Uruguay": "乌拉圭队",
    "Uzbekistan": "乌兹别克斯坦队",
}


def safe_name(value):
    value = re.sub(r"\s+\((?:captain|vice-captain)\)", "", value, flags=re.I)
    return re.sub(r'[/:*?"<>|]', "_", value).strip()


def fetch(session, url, **kwargs):
    for attempt in range(7):
        try:
            response = session.get(url, timeout=40, **kwargs)
            if response.status_code == 429:
                wait = int(response.headers.get("Retry-After", min(60, 5 * (attempt + 1))))
                print(f"rate limited; waiting {wait}s", flush=True)
                time.sleep(wait)
                continue
            response.raise_for_status()
            return response
        except requests.RequestException:
            if attempt == 6:
                raise
            time.sleep(min(60, 2 ** attempt))
    raise RuntimeError(f"request retries exhausted: {url}")


def parse_squads(session):
    html = fetch(session, SQUADS_URL).text
    soup = BeautifulSoup(html, "html.parser")
    squads = []
    for heading in soup.select("h3"):
        team = heading.get_text(" ", strip=True)
        if team not in TEAM_NAMES:
            continue
        table = heading.find_next("table", class_="wikitable")
        players = []
        for row in table.select("tr")[1:]:
            cells = row.select("th,td")
            if len(cells) < 3:
                continue
            player_cell = cells[2]
            link = next((a for a in player_cell.select("a") if a.get("href", "").startswith("/wiki/")), None)
            if not link:
                continue
            title = unquote(link["href"].removeprefix("/wiki/")).replace("_", " ")
            players.append({
                "number": cells[0].get_text(" ", strip=True),
                "name": re.sub(r"\s+\((?:captain|vice-captain)\)", "", player_cell.get_text(" ", strip=True), flags=re.I),
                "title": title,
            })
        squads.append({"team": team, "folder": TEAM_NAMES[team], "players": players})
    return squads


def page_images(session, titles):
    cache_file = CACHE / "photo_urls.json"
    result = json.loads(cache_file.read_text(encoding="utf-8")) if cache_file.exists() else {}
    pending = [title for title in titles if title not in result]

    def find_image(title):
        url = "https://en.wikipedia.org/wiki/" + quote(title.replace(" ", "_"), safe="()_")
        for attempt in range(8):
            try:
                response = requests.get(url, timeout=40, headers={"User-Agent": USER_AGENT})
                if response.status_code == 429:
                    wait = int(response.headers.get("Retry-After", 60))
                    print(f"page lookup rate limited; waiting {wait}s", flush=True)
                    time.sleep(wait)
                    continue
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                meta = soup.select_one('meta[property="og:image"]')
                return meta.get("content") if meta else None
            except requests.RequestException:
                if attempt == 7:
                    raise
                time.sleep(min(60, 2 ** attempt))
        return None

    for index, title in enumerate(pending, 1):
        try:
            result[title] = find_image(title)
        except Exception as exc:
            print(f"photo lookup failed for {title}: {exc}", flush=True)
        cache_file.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        if index % 25 == 0:
            print(f"photo links: {len(result)}/{len(titles)}", flush=True)
        time.sleep(0.6)
    cache_file.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def main():
    session = requests.Session()
    session.headers["User-Agent"] = USER_AGENT
    OUTPUT.mkdir(exist_ok=True)
    CACHE.mkdir(exist_ok=True)

    squads = parse_squads(session)
    if len(squads) != 48:
        raise RuntimeError(f"expected 48 squads, found {len(squads)}")
    titles = [p["title"] for squad in squads for p in squad["players"]]
    images = page_images(session, titles)

    cropper = CACHE / "face_crop"
    subprocess.run(["swiftc", str(ROOT / "tools" / "face_crop.swift"), "-o", str(cropper)], check=True)
    tasks = []
    for squad in squads:
        (OUTPUT / squad["folder"]).mkdir(exist_ok=True)
        for player in squad["players"]:
            tasks.append((squad, player))

    def build_avatar(index, squad, player):
        url = images.get(player["title"])
        status = "missing_photo"
        output = OUTPUT / squad["folder"] / f"{safe_name(player['name'])}.png"
        try:
            if output.exists():
                status = "exists"
            elif url:
                ext = Path(url.split("?", 1)[0]).suffix or ".jpg"
                source = CACHE / f"{safe_name(squad['team'])}_{safe_name(player['name'])}{ext}"
                if not source.exists():
                    proxy_url = "https://images.weserv.nl/?url=" + url + "&w=1400&fit=inside"
                    source.write_bytes(fetch(requests.Session(), proxy_url, headers={"User-Agent": USER_AGENT}).content)
                run = subprocess.run([str(cropper), str(source), str(output)], capture_output=True, text=True)
                status = "created" if run.returncode == 0 else f"crop_failed: {run.stderr.strip()}"
        except Exception as exc:
            status = f"error: {exc}"
        record = {
            "team": squad["team"], "team_folder": squad["folder"], "number": player["number"],
            "player": player["name"], "wikipedia_title": player["title"], "photo_url": url or "",
            "avatar": str(output.relative_to(ROOT)) if output.exists() else "", "status": status,
        }
        return index, record

    records_by_index = {}
    total = len(tasks)
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(build_avatar, index, squad, player) for index, (squad, player) in enumerate(tasks, 1)]
        for future in as_completed(futures):
            index, record = future.result()
            records_by_index[index] = record
            print(f"[{len(records_by_index)}/{total}] {record['team_folder']} / {record['player']}: {record['status']}", flush=True)
    records = [records_by_index[index] for index in range(1, total + 1)]

    with (OUTPUT / "头像来源与状态.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=records[0].keys())
        writer.writeheader()
        writer.writerows(records)
    (OUTPUT / "阵容名单.json").write_text(json.dumps(squads, ensure_ascii=False, indent=2), encoding="utf-8")
    summary = {}
    for record in records:
        summary[record["status"].split(":", 1)[0]] = summary.get(record["status"].split(":", 1)[0], 0) + 1
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
