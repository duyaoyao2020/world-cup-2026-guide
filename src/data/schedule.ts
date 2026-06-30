import referenceSchedule from "./referenceSchedule.json";
import type { Match, Stage, Team, Venue } from "../types";
import { tournamentToday } from "../utils";

type ReferenceTeam = {
  name: string;
  icon?: string;
};

type ReferenceMatch = {
  sourceId: number;
  number: number;
  kickoffUtc: string;
  beijingDate: string;
  stage: number;
  group?: number;
  home: ReferenceTeam;
  away: ReferenceTeam;
  venue: string;
  status: number;
  score?: {
    home: number;
    away: number;
  };
  shootout?: {
    home: number;
    away: number;
  };
};

type TeamStyle = Pick<Team, "code" | "flag" | "primary" | "secondary">;

const teamStyles: Record<string, TeamStyle> = {
  墨西哥: { code: "MEX", flag: "🇲🇽", primary: "#087555", secondary: "#d52b3f" },
  南非: { code: "RSA", flag: "🇿🇦", primary: "#e0b822", secondary: "#13704a" },
  韩国: { code: "KOR", flag: "🇰🇷", primary: "#e9344a", secondary: "#111827" },
  捷克: { code: "CZE", flag: "🇨🇿", primary: "#d21f3c", secondary: "#1e4d8b" },
  加拿大: { code: "CAN", flag: "🇨🇦", primary: "#d71920", secondary: "#ffffff" },
  波黑: { code: "BIH", flag: "🇧🇦", primary: "#1e4f9a", secondary: "#f0cf37" },
  美国: { code: "USA", flag: "🇺🇸", primary: "#173a72", secondary: "#d71920" },
  巴拉圭: { code: "PAR", flag: "🇵🇾", primary: "#d52b3f", secondary: "#f2f2f2" },
  卡塔尔: { code: "QAT", flag: "🇶🇦", primary: "#8e1e46", secondary: "#ffffff" },
  瑞士: { code: "SUI", flag: "🇨🇭", primary: "#d82332", secondary: "#ffffff" },
  巴西: { code: "BRA", flag: "🇧🇷", primary: "#f7d117", secondary: "#1d7d46" },
  摩洛哥: { code: "MAR", flag: "🇲🇦", primary: "#b51f39", secondary: "#0b7d55" },
  海地: { code: "HAI", flag: "🇭🇹", primary: "#2453a6", secondary: "#d52b3f" },
  苏格兰: { code: "SCO", flag: "🏴", primary: "#243d76", secondary: "#ffffff" },
  德国: { code: "GER", flag: "🇩🇪", primary: "#ededed", secondary: "#202020" },
  库拉索: { code: "CUW", flag: "🇨🇼", primary: "#1856a4", secondary: "#f0cc31" },
  科特迪瓦: { code: "CIV", flag: "🇨🇮", primary: "#e97b22", secondary: "#1f7a4f" },
  厄瓜多尔: { code: "ECU", flag: "🇪🇨", primary: "#f0cc31", secondary: "#1a4d89" },
  荷兰: { code: "NED", flag: "🇳🇱", primary: "#f47b20", secondary: "#1c3f6d" },
  日本: { code: "JPN", flag: "🇯🇵", primary: "#243f8f", secondary: "#ffffff" },
  土耳其: { code: "TUR", flag: "🇹🇷", primary: "#c92137", secondary: "#ffffff" },
  葡萄牙: { code: "POR", flag: "🇵🇹", primary: "#b91d36", secondary: "#1d7044" },
  加纳: { code: "GHA", flag: "🇬🇭", primary: "#f2d242", secondary: "#b52234" },
  阿根廷: { code: "ARG", flag: "🇦🇷", primary: "#6cb5e8", secondary: "#ffffff" },
  阿尔及利: { code: "ALG", flag: "🇩🇿", primary: "#167b57", secondary: "#ffffff" },
  奥地利: { code: "AUT", flag: "🇦🇹", primary: "#c82639", secondary: "#ffffff" },
  约旦: { code: "JOR", flag: "🇯🇴", primary: "#ffffff", secondary: "#b52234" },
  法国: { code: "FRA", flag: "🇫🇷", primary: "#203b78", secondary: "#df3348" },
  塞内加尔: { code: "SEN", flag: "🇸🇳", primary: "#17815b", secondary: "#f4c642" },
  挪威: { code: "NOR", flag: "🇳🇴", primary: "#c51b35", secondary: "#173a72" },
  瑞典: { code: "SWE", flag: "🇸🇪", primary: "#f1cb34", secondary: "#2256a0" },
  比利时: { code: "BEL", flag: "🇧🇪", primary: "#9b1c31", secondary: "#f3c53f" },
  埃及: { code: "EGY", flag: "🇪🇬", primary: "#d51f2b", secondary: "#202020" },
  伊朗: { code: "IRN", flag: "🇮🇷", primary: "#f2f2f2", secondary: "#c62238" },
  新西兰: { code: "NZL", flag: "🇳🇿", primary: "#202020", secondary: "#ffffff" },
  西班牙: { code: "ESP", flag: "🇪🇸", primary: "#d72638", secondary: "#f6c445" },
  佛得角: { code: "CPV", flag: "🇨🇻", primary: "#1e4f9a", secondary: "#ffffff" },
  沙特: { code: "KSA", flag: "🇸🇦", primary: "#15764b", secondary: "#ffffff" },
  乌拉圭: { code: "URU", flag: "🇺🇾", primary: "#69b8e8", secondary: "#ffffff" },
  乌兹别克: { code: "UZB", flag: "🇺🇿", primary: "#2c67aa", secondary: "#ffffff" },
  哥伦比亚: { code: "COL", flag: "🇨🇴", primary: "#f5cf36", secondary: "#173a72" },
  克罗地亚: { code: "CRO", flag: "🇭🇷", primary: "#f7f7f7", secondary: "#d94b54" },
  民主刚果: { code: "COD", flag: "🇨🇩", primary: "#2a6bb4", secondary: "#d82c3f" },
  英格兰: { code: "ENG", flag: "🏴", primary: "#f7f7f7", secondary: "#253b70" },
  突尼斯: { code: "TUN", flag: "🇹🇳", primary: "#d72b3f", secondary: "#ffffff" },
  澳大利亚: { code: "AUS", flag: "🇦🇺", primary: "#e2bc31", secondary: "#17613d" },
  巴拿马: { code: "PAN", flag: "🇵🇦", primary: "#d22f43", secondary: "#ffffff" },
  伊拉克: { code: "IRQ", flag: "🇮🇶", primary: "#19814f", secondary: "#ffffff" },
};

const venueDetails: Record<string, Omit<Venue, "name">> = {
  墨西哥城体育场: { id: "mexico-city", city: "墨西哥城", country: "墨西哥", timezone: "America/Mexico_City", capacity: "83,264" },
  瓜达拉哈拉体育场: { id: "guadalajara", city: "瓜达拉哈拉", country: "墨西哥", timezone: "America/Mexico_City", capacity: "48,071" },
  蒙特雷体育场: { id: "monterrey", city: "蒙特雷", country: "墨西哥", timezone: "America/Monterrey", capacity: "53,500" },
  多伦多体育场: { id: "toronto", city: "多伦多", country: "加拿大", timezone: "America/Toronto", capacity: "45,000" },
  不列颠哥伦比亚广场: { id: "vancouver", city: "温哥华", country: "加拿大", timezone: "America/Vancouver", capacity: "54,500" },
  "纽约/新泽西体育场": { id: "new-york-new-jersey", city: "纽约/新泽西", country: "美国", timezone: "America/New_York", capacity: "82,500" },
  洛杉矶体育场: { id: "los-angeles", city: "洛杉矶", country: "美国", timezone: "America/Los_Angeles", capacity: "70,000" },
  达拉斯体育场: { id: "dallas", city: "达拉斯", country: "美国", timezone: "America/Chicago", capacity: "80,000" },
  亚特兰大体育场: { id: "atlanta", city: "亚特兰大", country: "美国", timezone: "America/New_York", capacity: "71,000" },
  迈阿密体育场: { id: "miami", city: "迈阿密", country: "美国", timezone: "America/New_York", capacity: "65,000" },
  硬石体育场: { id: "hard-rock", city: "迈阿密", country: "美国", timezone: "America/New_York", capacity: "65,000" },
  西雅图体育场: { id: "seattle", city: "西雅图", country: "美国", timezone: "America/Los_Angeles", capacity: "69,000" },
  旧金山湾区体育场: { id: "san-francisco-bay-area", city: "旧金山湾区", country: "美国", timezone: "America/Los_Angeles", capacity: "68,500" },
  波士顿体育场: { id: "boston", city: "波士顿", country: "美国", timezone: "America/New_York", capacity: "65,878" },
  费城体育场: { id: "philadelphia", city: "费城", country: "美国", timezone: "America/New_York", capacity: "69,176" },
  堪萨斯城体育场: { id: "kansas-city", city: "堪萨斯城", country: "美国", timezone: "America/Chicago", capacity: "76,416" },
  休斯顿体育场: { id: "houston", city: "休斯顿", country: "美国", timezone: "America/Chicago", capacity: "72,220" },
};

const stageNames: Record<number, Stage> = {
  232934: "小组赛",
  232927: "32强赛",
  232928: "16强赛",
  232929: "四分之一决赛",
  232930: "半决赛",
  232931: "季军赛",
  232932: "决赛",
};

const statusNames: Record<number, Match["status"]> = {
  1: "未开始",
  2: "进行中",
  3: "已结束",
};

const isPlaceholderIcon = (icon?: string) => icon?.includes("/snapshot/soccer/") ?? false;

const canonicalIconsByName = (referenceSchedule as ReferenceMatch[])
  .flatMap((match) => [match.home, match.away])
  .reduce<Record<string, string>>((icons, team) => {
    if (!team.icon || isPlaceholderIcon(team.icon)) {
      return icons;
    }
    icons[team.name] ??= team.icon;
    return icons;
  }, {});

const createTeam = ({ name, icon }: ReferenceTeam): Team => {
  const style = teamStyles[name] ?? {
    code: name.match(/^[A-L][1-3]$/) ? name : "TBD",
    flag: "◈",
    primary: "#344651",
    secondary: "#9aa8ae",
  };
  const resolvedIcon = !icon || isPlaceholderIcon(icon) ? canonicalIconsByName[name] ?? icon : icon;

  return {
    ...style,
    name,
    shortName: name.length > 7 ? `${name.slice(0, 7)}…` : name,
    icon: resolvedIcon,
  };
};

const venueNames = [...new Set((referenceSchedule as ReferenceMatch[]).map((match) => match.venue))];

export const venues: Venue[] = venueNames.map((name, index) => ({
  name,
  ...(venueDetails[name] ?? {
    id: `venue-${index + 1}`,
    city: name.replace(/体育场|广场/g, ""),
    country: "美国",
    timezone: "America/New_York",
    capacity: "待公布",
  }),
}));

const venuesByName = Object.fromEntries(venues.map((venue) => [venue.name, venue]));

const allReferenceTeams = (referenceSchedule as ReferenceMatch[]).flatMap((match) => [match.home, match.away]);
export const teams: Record<string, Team> = {};

allReferenceTeams.forEach((referenceTeam) => {
  const builtTeam = createTeam(referenceTeam);
  teams[builtTeam.code] ??= builtTeam;
});

export const matches: Match[] = (referenceSchedule as ReferenceMatch[]).map((reference) => {
  const featured = reference.home.name === "韩国" && reference.away.name === "捷克";
  const showcasePairs = new Set([
    "墨西哥-南非",
    "加拿大-波黑",
    "美国-巴拉圭",
    "卡塔尔-瑞士",
    "巴西-摩洛哥",
    "海地-苏格兰",
    "澳大利亚-土耳其",
    "葡萄牙-民主刚果",
    "英格兰-克罗地亚",
    "加纳-巴拿马",
    "乌兹别克-哥伦比亚",
    "英格兰-民主刚果",
    "美国-波黑",
  ]);
  const showcase = featured || showcasePairs.has(`${reference.home.name}-${reference.away.name}`);

  return {
    id: featured ? "group-f-1" : `match-${reference.sourceId}`,
    sourceId: reference.sourceId,
    number: reference.number,
    stage: stageNames[reference.stage],
    group: reference.group ? String.fromCharCode(64 + reference.group) : undefined,
    home: createTeam(reference.home),
    away: createTeam(reference.away),
    venue: venuesByName[reference.venue],
    kickoffUtc: reference.kickoffUtc,
    beijingDate: reference.beijingDate,
    status: statusNames[reference.status],
    score: reference.score,
    shootout: reference.shootout,
    featured,
    showcase,
  };
});

export const featuredMatch = matches.find((match) => match.featured)!;

// Curated from Google search-interest signals. Keep the 3D showcase marker separate
// so the homepage focus can change without changing match-detail behavior.
const dailySearchFocusMatchIds: Record<string, string> = {
  "2026-06-13": "match-5403399",
};

export const getDailyFocusMatch = (beijingDate: string) => {
  const matchesOnDate = matches.filter((match) => match.beijingDate === beijingDate);
  return matches.find((match) => match.id === dailySearchFocusMatchIds[beijingDate])
    ?? matchesOnDate.find((match) => match.status !== "已结束")
    ?? matchesOnDate.find((match) => match.showcase)
    ?? matchesOnDate[0]
    ?? featuredMatch;
};

export const todayFocusMatch = getDailyFocusMatch(tournamentToday);
export const todayFocusUsesGoogleInterest = Boolean(dailySearchFocusMatchIds[tournamentToday]);
