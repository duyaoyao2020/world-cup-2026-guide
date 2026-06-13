import { Activity, Ruler, Shield, Sparkles, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { Player, Team } from "../types";

export function PlayerCard({ player, team }: { player: Player; team: Team }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isLocalAvatar = player.avatarCredit === "本地头像库";

  useEffect(() => setImageFailed(false), [player.id]);

  return (
    <aside className="player-card" style={{ "--team-color": team.primary } as React.CSSProperties}>
      <div className="player-card-visual">
        {player.avatar && !imageFailed ? (
          <img
            className={`player-avatar player-avatar--compact ${isLocalAvatar ? "player-avatar--local" : "player-avatar--round"}`}
            src={player.avatar}
            alt={player.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="avatar-fallback">
            <span>{player.number}</span>
            <b><UserRound size={42} strokeWidth={1.1} /></b>
          </div>
        )}
        {player.avatarCredit && !imageFailed && <small className="photo-credit">PHOTO · {player.avatarCredit}</small>}
        <strong>{player.number}</strong>
        <span>{player.role}</span>
      </div>
      <div className="player-card-copy">
        <small>PLAYER FOCUS</small>
        <h3>{player.name}</h3>
        <p>{player.englishName}</p>
        <div className="player-facts">
          <span><Shield size={14} /> {player.position}</span>
          <span><Activity size={14} /> {player.age} 岁</span>
          <span><Ruler size={14} /> {player.height}</span>
        </div>
        <div className="player-club">{player.club}</div>
        <div className="trait-list">
          {player.traits.map((trait) => <span key={trait}><Sparkles size={12} />{trait}</span>)}
        </div>
      </div>
    </aside>
  );
}
