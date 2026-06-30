import { ArrowRight, Clock3, GitBranch, MapPin, ShieldCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { TeamCrest } from "../components/TeamCrest";
import { matches } from "../data/schedule";
import type { Match, Team } from "../types";
import { formatDate, formatTime } from "../utils";

const matchesByNumber = new Map(matches.map((match) => [match.number, match]));

const bracketOrder = {
  roundOf32: [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
  roundOf16: [89, 90, 91, 92, 93, 94, 95, 96],
  quarterFinals: [97, 98, 99, 100],
  semiFinals: [101, 102],
  finals: [103, 104],
} as const;

const nextRoundSources: Record<number, { home?: { type: "winner" | "loser"; from: number }; away?: { type: "winner" | "loser"; from: number } }> = {
  89: { home: { type: "winner", from: 73 }, away: { type: "winner", from: 75 } },
  90: { home: { type: "winner", from: 74 }, away: { type: "winner", from: 77 } },
  91: { home: { type: "winner", from: 76 }, away: { type: "winner", from: 78 } },
  92: { home: { type: "winner", from: 79 }, away: { type: "winner", from: 80 } },
  93: { home: { type: "winner", from: 83 }, away: { type: "winner", from: 84 } },
  94: { home: { type: "winner", from: 81 }, away: { type: "winner", from: 82 } },
  95: { home: { type: "winner", from: 86 }, away: { type: "winner", from: 88 } },
  96: { home: { type: "winner", from: 85 }, away: { type: "winner", from: 87 } },
  97: { home: { type: "winner", from: 89 }, away: { type: "winner", from: 90 } },
  98: { home: { type: "winner", from: 93 }, away: { type: "winner", from: 94 } },
  99: { home: { type: "winner", from: 91 }, away: { type: "winner", from: 92 } },
  100: { home: { type: "winner", from: 95 }, away: { type: "winner", from: 96 } },
  101: { home: { type: "winner", from: 97 }, away: { type: "winner", from: 98 } },
  102: { home: { type: "winner", from: 99 }, away: { type: "winner", from: 100 } },
  103: { home: { type: "loser", from: 101 }, away: { type: "loser", from: 102 } },
  104: { home: { type: "winner", from: 101 }, away: { type: "winner", from: 102 } },
};

const stageColumns = [
  { key: "roundOf32", title: "32强赛", subtitle: "16 场", matchNumbers: bracketOrder.roundOf32 },
  { key: "roundOf16", title: "16强赛", subtitle: "8 场", matchNumbers: bracketOrder.roundOf16 },
  { key: "quarterFinals", title: "四分之一决赛", subtitle: "8 强", matchNumbers: bracketOrder.quarterFinals },
  { key: "semiFinals", title: "半决赛", subtitle: "4 强", matchNumbers: bracketOrder.semiFinals },
  { key: "finals", title: "决赛周", subtitle: "季军赛 + 决赛", matchNumbers: bracketOrder.finals },
] as const;

function getWinner(match: Match): Team | undefined {
  if (match.status !== "已结束" || !match.score) {
    return undefined;
  }
  if (match.score.home > match.score.away) {
    return match.home;
  }
  if (match.score.home < match.score.away) {
    return match.away;
  }
  if (!match.shootout) {
    return undefined;
  }
  return match.shootout.home > match.shootout.away ? match.home : match.away;
}

function getLoser(match: Match): Team | undefined {
  if (match.status !== "已结束" || !match.score) {
    return undefined;
  }
  if (match.score.home > match.score.away) {
    return match.away;
  }
  if (match.score.home < match.score.away) {
    return match.home;
  }
  if (!match.shootout) {
    return undefined;
  }
  return match.shootout.home > match.shootout.away ? match.away : match.home;
}

function resolveTeam(matchNumber: number, side: "home" | "away"): Team {
  const match = matchesByNumber.get(matchNumber)!;
  const source = nextRoundSources[matchNumber]?.[side];

  if (!source) {
    return side === "home" ? match.home : match.away;
  }

  const sourceMatch = matchesByNumber.get(source.from);
  if (!sourceMatch) {
    return side === "home" ? match.home : match.away;
  }

  const resolved = source.type === "winner" ? getWinner(sourceMatch) : getLoser(sourceMatch);
  return resolved ?? (side === "home" ? match.home : match.away);
}

function matchScoreLabel(match: Match) {
  if (!match.score) {
    return "VS";
  }
  return `${match.score.home} : ${match.score.away}`;
}

function statusCopy(match: Match) {
  if (match.status === "进行中") {
    return "进行中";
  }
  if (match.status === "已结束") {
    return match.shootout ? `已结束 · 点球 ${match.shootout.home}:${match.shootout.away}` : "已结束";
  }
  return "待开球";
}

export function KnockoutPage() {
  const knockoutMatches = matches.filter((match) => match.stage !== "小组赛");
  const decidedMatches = knockoutMatches.filter((match) => match.status === "已结束").length;
  const liveMatches = knockoutMatches.filter((match) => match.status === "进行中").length;

  return (
    <main className="knockout-page">
      <AppHeader />
      <section className="knockout-hero">
        <div className="knockout-copy">
          <span className="section-kicker"><GitBranch size={14} /> KNOCKOUT STAGE</span>
          <h1>淘汰赛<br /><em>签表</em></h1>
          <p>从 32 强到冠军战，按当前静态快照把已确认赛果、点球结果与下一轮对位继续往前推进。</p>
          <div className="knockout-hero-actions">
            <Link className="primary-cta compact" to="/schedule">
              <span><Trophy size={16} /> 返回完整赛程</span>
              <ArrowRight size={16} />
            </Link>
            <Link className="secondary-cta" to="/standings">
              小组赛积分 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="knockout-metrics">
          <div><small>DECIDED</small><strong>{decidedMatches}</strong><span>已决出淘汰赛赛果</span></div>
          <div><small>LIVE</small><strong>{liveMatches}</strong><span>进行中的淘汰赛</span></div>
          <div><small>PATH</small><strong>32 → 1</strong><span>晋级链路</span></div>
        </div>
      </section>

      <section className="knockout-format">
        <div><ShieldCheck size={15} /><strong>赛制</strong><span>32 强赛 → 16 强赛 → 8 强 → 半决赛 → 决赛</span></div>
        <div><Clock3 size={15} /><strong>更新时间</strong><span>北京时间 2026年7月1日 06:40 静态快照</span></div>
        <div><MapPin size={15} /><strong>结果说明</strong><span>点球大战在比分下方单独标注，未完场比赛不提前写入胜者。</span></div>
      </section>

      <section className="knockout-grid" aria-label="淘汰赛签表">
        {stageColumns.map((column) => (
          <article className="knockout-column" key={column.key}>
            <header className="knockout-column-head">
              <small>{column.subtitle}</small>
              <h2>{column.title}</h2>
            </header>
            <div className="knockout-column-body">
              {column.matchNumbers.map((matchNumber) => {
                const match = matchesByNumber.get(matchNumber);
                if (!match) {
                  return null;
                }
                const home = resolveTeam(match.number, "home");
                const away = resolveTeam(match.number, "away");
                const winner = getWinner(match);

                return (
                  <Link className="knockout-match-card" key={match.id} to={`/match/${match.id}`}>
                    <div className="knockout-match-meta">
                      <span>Match {match.number}</span>
                      <small>{statusCopy(match)}</small>
                    </div>
                    <div className="knockout-match-date">
                      <strong>{formatDate(match.kickoffUtc)}</strong>
                      <span>{formatTime(match.kickoffUtc)} 北京时间</span>
                    </div>
                    <div className="knockout-match-teams">
                      <div className={`knockout-team ${winner?.code === home.code ? "is-winner" : ""}`}>
                        <TeamCrest team={home} />
                        <b>{home.name}</b>
                      </div>
                      <div className="knockout-score">
                        <strong>{matchScoreLabel(match)}</strong>
                        {match.shootout && <small>点球 {match.shootout.home} : {match.shootout.away}</small>}
                      </div>
                      <div className={`knockout-team ${winner?.code === away.code ? "is-winner" : ""}`}>
                        <TeamCrest team={away} />
                        <b>{away.name}</b>
                      </div>
                    </div>
                    <div className="knockout-match-footer">
                      <span>{match.venue.city}</span>
                      <em>{match.venue.name}</em>
                    </div>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
