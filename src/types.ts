export type Stage =
  | "小组赛"
  | "32强赛"
  | "16强赛"
  | "四分之一决赛"
  | "半决赛"
  | "季军赛"
  | "决赛";

export type Side = "home" | "away";

export interface Team {
  code: string;
  name: string;
  shortName: string;
  flag: string;
  primary: string;
  secondary: string;
  icon?: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  capacity: string;
}

export interface Match {
  id: string;
  sourceId?: number;
  number: number;
  stage: Stage;
  group?: string;
  home: Team;
  away: Team;
  venue: Venue;
  kickoffUtc: string;
  beijingDate?: string;
  status?: "未开始" | "进行中" | "已结束";
  score?: {
    home: number;
    away: number;
  };
  featured?: boolean;
  showcase?: boolean;
}

export interface Player {
  id: string;
  name: string;
  englishName: string;
  number: number;
  position: string;
  role: string;
  age: number;
  height: string;
  club: string;
  traits: string[];
  x: number;
  y: number;
  avatar?: string;
  avatarCredit?: string;
}

export interface Lineup {
  team: Team;
  formation: string;
  coach: string;
  kit: {
    shirt: string;
    shorts: string;
    number: string;
  };
  players: Player[];
}
