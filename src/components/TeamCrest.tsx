import { useEffect, useState } from "react";
import type { Team } from "../types";

export function TeamCrest({ team, large = false }: { team: Team; large?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [team.icon]);

  return (
    <span
      className={`team-crest ${large ? "team-crest--large" : ""}`}
      style={{ "--team-primary": team.primary, "--team-secondary": team.secondary } as React.CSSProperties}
      aria-label={team.name}
    >
      {team.icon && !imageFailed ? (
        <img src={team.icon} alt="" onError={() => setImageFailed(true)} />
      ) : (
        <span>{team.flag}</span>
      )}
      <b>{team.code.slice(0, 3)}</b>
    </span>
  );
}
