import type { Match } from "./types";

const zh = "zh-CN";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(zh, {
    timeZone: "Asia/Shanghai",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(iso));

export const formatTime = (iso: string, timeZone = "Asia/Shanghai") =>
  new Intl.DateTimeFormat(zh, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));

export const formatLocalDate = (iso: string, timeZone = "Asia/Shanghai") =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));

export const formatFullDate = (iso: string) =>
  new Intl.DateTimeFormat(zh, {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(iso));

export const groupMatchesByDate = (matches: Match[]) =>
  matches.reduce<Record<string, Match[]>>((result, match) => {
    const date = formatLocalDate(match.kickoffUtc);
    result[date] = [...(result[date] ?? []), match];
    return result;
  }, {});

export const tournamentToday = formatLocalDate(new Date().toISOString());
