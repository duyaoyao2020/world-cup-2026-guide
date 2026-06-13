import { Clock3, Info, Lock, MapPin, MousePointer2, Sparkles, Trophy, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Pitch3D } from "../components/Pitch3D";
import { PlayerCard } from "../components/PlayerCard";
import { TeamCrest } from "../components/TeamCrest";
import { lineupsByMatchId } from "../data/lineups";
import { matches } from "../data/schedule";
import type { Player, Side } from "../types";
import { formatDate, formatTime } from "../utils";

interface FocusedPlayer {
  player: Player;
  side: Side;
}

const englishTeamNames: Record<string, string> = {
  KOR: "KOREA REPUBLIC",
  CZE: "CZECHIA",
  MEX: "MEXICO",
  RSA: "SOUTH AFRICA",
  CAN: "CANADA",
  BIH: "BOSNIA & HERZEGOVINA",
  USA: "UNITED STATES",
  PAR: "PARAGUAY",
  QAT: "QATAR",
  SUI: "SWITZERLAND",
  BRA: "BRAZIL",
  MAR: "MOROCCO",
  HAI: "HAITI",
  SCO: "SCOTLAND",
  AUS: "AUSTRALIA",
  TUR: "TÜRKIYE",
};

export function MatchPage() {
  const { matchId } = useParams();
  const match = matches.find((item) => item.id === matchId) ?? matches[0];
  const lineupBundle = lineupsByMatchId[match.id];
  const homeLineup = lineupBundle?.home;
  const awayLineup = lineupBundle?.away;
  const [hoveredSide, setHoveredSide] = useState<Side>();
  const [locked, setLocked] = useState<FocusedPlayer>();
  const playerCardRef = useRef<HTMLDivElement>(null);
  const playerClickRef = useRef(false);
  const lineupLabel = lineupBundle?.label ?? "演示阵容";
  const lineupSubtitle = lineupBundle?.subtitle ?? "非官方实时首发";
  const lineupNote = lineupBundle?.note ?? "球员信息与阵型用于交互展示，比赛日请以官方公布首发为准。";
  const score = match.score ? `${match.score.home} : ${match.score.away}` : "VS";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLocked(undefined);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setHoveredSide(undefined);
    setLocked(undefined);
  }, [match.id]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (playerClickRef.current) return;
      if (playerCardRef.current?.contains(event.target as Node)) return;
      setLocked(undefined);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  const pitchClass = useMemo(
    () => hoveredSide ? `lineup-stage lineup-stage--focus-${hoveredSide}` : "lineup-stage",
    [hoveredSide],
  );

  const select = (side: Side, player: Player) => {
    playerClickRef.current = true;
    setLocked({ side, player });
    window.setTimeout(() => { playerClickRef.current = false; }, 0);
  };

  if (!homeLineup || !awayLineup) {
    return <GenericMatch match={match} />;
  }

  return (
    <main className="match-page">
      <AppHeader />
      <section
        className="match-scoreboard"
        style={{ "--home-color": match.home.primary, "--away-color": match.away.primary } as React.CSSProperties}
      >
        <div className="match-context">
          <span>{match.stage} · {match.group}组 · 第 {match.number} 场</span>
          <small>{lineupLabel} · {lineupSubtitle}</small>
        </div>
        <div className="scoreboard-teams">
          <div className="scoreboard-team">
            <div><small>{englishTeamNames[match.home.code] ?? match.home.code}</small><h1>{match.home.name}</h1><span>{homeLineup.formation}</span></div>
            <TeamCrest team={match.home} large />
          </div>
          <div className="versus">
            <span>{formatDate(match.kickoffUtc)}</span>
            <strong>{score}</strong>
            <em>{match.status === "已结束" ? "全场" : `${formatTime(match.kickoffUtc)} 北京时间`}</em>
          </div>
          <div className="scoreboard-team scoreboard-team--away">
            <TeamCrest team={match.away} large />
            <div><small>{englishTeamNames[match.away.code] ?? match.away.code}</small><h1>{match.away.name}</h1><span>{awayLineup.formation}</span></div>
          </div>
        </div>
        <div className="venue-strip">
          <span><MapPin size={14} /> {match.venue.city} · {match.venue.name}</span>
          <span><Clock3 size={14} /> 当地时间 {formatTime(match.kickoffUtc, match.venue.timezone)}</span>
          <span><Users size={14} /> 容量 {match.venue.capacity}</span>
        </div>
      </section>

      <section className="interaction-tip">
        <span><MousePointer2 size={15} /> 移入半场放大阵型，点击球员查看资料；点击卡片与球员外部关闭</span>
        {locked && <button onClick={() => setLocked(undefined)}><Lock size={13} /> 已锁定 · 按 ESC 退出</button>}
      </section>

      <section className={pitchClass}>
        <article
          className="team-pitch team-pitch--home"
          onPointerEnter={() => setHoveredSide("home")}
          onPointerMove={() => setHoveredSide("home")}
          onPointerLeave={() => setHoveredSide(undefined)}
        >
          <header><span>{homeLineup.formation}</span><b>{homeLineup.team.name} 首发</b><small>主教练：{homeLineup.coach}</small></header>
          <Pitch3D
            lineup={homeLineup}
            side="home"
            activePlayer={locked?.side === "home" ? locked.player : undefined}
            onSelect={(player) => select("home", player)}
          />
        </article>
        <article
          className="team-pitch team-pitch--away"
          onPointerEnter={() => setHoveredSide("away")}
          onPointerMove={() => setHoveredSide("away")}
          onPointerLeave={() => setHoveredSide(undefined)}
        >
          <header><span>{awayLineup.formation}</span><b>{awayLineup.team.name} 首发</b><small>主教练：{awayLineup.coach}</small></header>
          <Pitch3D
            lineup={awayLineup}
            side="away"
            activePlayer={locked?.side === "away" ? locked.player : undefined}
            onSelect={(player) => select("away", player)}
          />
        </article>
        {locked && (
          <div ref={playerCardRef} className={`player-card-wrap player-card-wrap--${locked.side}`}>
            <PlayerCard player={locked.player} team={locked.side === "home" ? homeLineup.team : awayLineup.team} />
          </div>
        )}
      </section>
      <div className="demo-note"><Info size={14} /> {lineupNote}</div>
    </main>
  );
}

function GenericMatch({ match }: { match: (typeof matches)[number] }) {
  return (
    <main className="generic-match-page">
      <AppHeader />
      <div className="generic-stadium" />
      <section className="generic-match-content">
        <span className="section-kicker"><Trophy size={14} /> MATCH {String(match.number).padStart(3, "0")}</span>
        <p>{match.stage}{match.group ? ` · ${match.group}组` : ""}</p>
        <div className="generic-versus">
          <div><TeamCrest team={match.home} large /><h1>{match.home.name}</h1><span>{match.home.code}</span></div>
          <strong>{match.score ? `${match.score.home} : ${match.score.away}` : "VS"}</strong>
          <div><TeamCrest team={match.away} large /><h1>{match.away.name}</h1><span>{match.away.code}</span></div>
        </div>
        <div className="generic-info">
          <span><Clock3 size={16} /> {formatDate(match.kickoffUtc)} · 北京时间 {formatTime(match.kickoffUtc)}</span>
          <span><MapPin size={16} /> {match.venue.city} · {match.venue.name}</span>
          <span><Users size={16} /> 容量 {match.venue.capacity}</span>
        </div>
        <div className="generic-callout">
          <Sparkles size={18} />
          <div><b>{match.status === "已结束" ? "当前页面未收录官方首发" : "比赛阵容将在赛前更新"}</b><span>{match.status === "已结束" ? "当前页面已同步赛果与场馆信息。" : "当前页面展示已确认的赛程与场馆信息。"}</span></div>
        </div>
        <Link className="primary-cta compact" to="/schedule">返回完整赛程</Link>
      </section>
    </main>
  );
}
