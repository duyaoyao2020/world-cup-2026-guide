import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Match } from "../types";
import { formatTime } from "../utils";
import { TeamCrest } from "./TeamCrest";

export function MatchCard({ match }: { match: Match }) {
  const score = match.score ? `${match.score.home} : ${match.score.away}` : "VS";
  const statusClass = match.status === "已结束" ? "is-finished" : match.status === "进行中" ? "is-live" : "is-upcoming";

  return (
    <Link className={`match-row ${match.showcase ? "match-row--featured" : ""}`} to={`/match/${match.id}`}>
      <div className="match-row-time">
        <strong>{formatTime(match.kickoffUtc)}</strong>
        <span>北京时间</span>
        <small>{match.stage}{match.group ? ` · ${match.group}组` : ""}</small>
      </div>
      <div className="match-row-team match-row-team--home">
        <b>{match.home.name}</b>
        <TeamCrest team={match.home} />
      </div>
      <div className="match-row-score">
        <strong>{score}</strong>
        <span className={`match-status ${statusClass}`}>{match.status}</span>
        {match.showcase && <em>3D 阵容</em>}
      </div>
      <div className="match-row-team match-row-team--away">
        <TeamCrest team={match.away} />
        <b>{match.away.name}</b>
      </div>
      <div className="match-row-venue">
        <span><MapPin size={13} /> {match.venue.name}</span>
        <small>{match.venue.city} · 当地 {formatTime(match.kickoffUtc, match.venue.timezone)}</small>
      </div>
      <span className="match-row-number">#{match.number}</span>
      <ArrowUpRight className="match-row-arrow" size={15} />
    </Link>
  );
}
