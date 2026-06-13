import type { Match, Team } from "../types";
import { matches } from "./schedule";

export interface StandingRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupStanding {
  group: string;
  rows: StandingRow[];
  completedMatches: number;
  totalMatches: number;
}

const emptyRow = (team: Team): StandingRow => ({
  team,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  points: 0,
});

export function calculateGroupStandings(allMatches: Match[]): GroupStanding[] {
  const groups = new Map<string, Match[]>();

  allMatches
    .filter((match) => match.stage === "小组赛" && match.group)
    .forEach((match) => {
      const groupMatches = groups.get(match.group!) ?? [];
      groupMatches.push(match);
      groups.set(match.group!, groupMatches);
    });

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([group, groupMatches]) => {
      const rows = new Map<string, StandingRow>();

      groupMatches.forEach((match) => {
        rows.set(match.home.code, rows.get(match.home.code) ?? emptyRow(match.home));
        rows.set(match.away.code, rows.get(match.away.code) ?? emptyRow(match.away));

        if (!match.score) return;

        const home = rows.get(match.home.code)!;
        const away = rows.get(match.away.code)!;
        home.played += 1;
        away.played += 1;
        home.goalsFor += match.score.home;
        home.goalsAgainst += match.score.away;
        away.goalsFor += match.score.away;
        away.goalsAgainst += match.score.home;

        if (match.score.home > match.score.away) {
          home.won += 1;
          home.points += 3;
          away.lost += 1;
        } else if (match.score.home < match.score.away) {
          away.won += 1;
          away.points += 3;
          home.lost += 1;
        } else {
          home.drawn += 1;
          away.drawn += 1;
          home.points += 1;
          away.points += 1;
        }
      });

      const rankedRows = [...rows.values()]
        .map((row) => ({ ...row, goalDifference: row.goalsFor - row.goalsAgainst }))
        .sort((left, right) =>
          right.points - left.points ||
          right.goalDifference - left.goalDifference ||
          right.goalsFor - left.goalsFor ||
          left.team.name.localeCompare(right.team.name, "zh-CN"),
        );

      return {
        group,
        rows: rankedRows,
        completedMatches: groupMatches.filter((match) => match.score).length,
        totalMatches: groupMatches.length,
      };
    });
}

export const groupStandings = calculateGroupStandings(matches);
