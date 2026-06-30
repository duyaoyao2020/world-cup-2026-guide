import { Activity, BarChart3, CheckCircle2, ExternalLink, Info, Layers3, Trophy } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { matches } from "../data/schedule";
import { TeamCrest } from "../components/TeamCrest";
import { groupStandings } from "../data/standings";

const particles = Array.from({ length: 14 }, (_, index) => index);

export function StandingsPage() {
  const [activeGroup, setActiveGroup] = useState(groupStandings[0]?.group ?? "A");
  const standing = groupStandings.find(({ group }) => group === activeGroup) ?? groupStandings[0];
  const completedMatches = matches.filter((match) => match.status === "已结束").length;

  return (
    <main className="standings-page">
      <div className="standings-backdrop" />
      <div className="standings-vignette" />
      <div className="light-beam light-beam--one" />
      <div className="light-beam light-beam--two" />
      <div className="particles standings-particles">
        {particles.map((particle) => <i key={particle} style={{ "--i": particle } as React.CSSProperties} />)}
      </div>
      <AppHeader />
      <section className="standings-hero">
        <div className="standings-hero-copy">
          <span className="section-kicker"><BarChart3 size={14} /> GROUP STANDINGS</span>
          <h1>小组<br /><em>积分表</em></h1>
          <p>用比赛结果读取晋级轨迹。积分、净胜球与进球数均由当前静态赛果自动计算。</p>
        </div>
        <div className="standings-hero-dashboard">
          <div><Layers3 size={15} /><small>GROUPS</small><strong>12</strong><span>四队一组</span></div>
          <div><Activity size={15} /><small>RECORDED</small><strong>{completedMatches}</strong><span>已录入赛果</span></div>
          <div><Trophy size={15} /><small>ADVANCE</small><strong>32</strong><span>晋级淘汰赛</span></div>
        </div>
      </section>

      <nav className="standings-group-deck" aria-label="选择小组">
        {groupStandings.map(({ group, completedMatches }) => (
          <button
            className={group === activeGroup ? "is-active" : ""}
            key={group}
            onClick={() => setActiveGroup(group)}
          >
            <span>{group}</span>
            <small>{group}组</small>
            <i style={{ "--progress": `${(completedMatches / 6) * 100}%` } as React.CSSProperties} />
          </button>
        ))}
      </nav>

      {standing && (
        <section className="standings-content">
          <div className="standings-board">
            <header className="standings-heading">
              <div>
                <span>GROUP {standing.group}</span>
                <h2>{standing.group}组晋级轨迹</h2>
              </div>
              <p><CheckCircle2 size={14} /> 已结束 {standing.completedMatches} / {standing.totalMatches} 场</p>
            </header>
            <div className="standings-watermark">{standing.group}</div>
            <div className="standings-table-wrap">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>球队</th>
                    <th>赛</th>
                    <th>胜</th>
                    <th>平</th>
                    <th>负</th>
                    <th>进 / 失</th>
                    <th>净胜球</th>
                    <th>积分</th>
                    <th>晋级轨迹</th>
                  </tr>
                </thead>
                <tbody>
                  {standing.rows.map((row, index) => (
                    <tr className={`standing-row standing-row--${index + 1}`} key={row.team.code}>
                      <td><b className="standing-rank">{String(index + 1).padStart(2, "0")}</b></td>
                      <td>
                        <div className="standing-team">
                          <TeamCrest team={row.team} />
                          <div><strong>{row.team.name}</strong><small>{row.team.code}</small></div>
                        </div>
                      </td>
                      <td>{row.played}</td>
                      <td>{row.won}</td>
                      <td>{row.drawn}</td>
                      <td>{row.lost}</td>
                      <td>{row.goalsFor} / {row.goalsAgainst}</td>
                      <td className={row.goalDifference > 0 ? "positive" : ""}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</td>
                      <td><strong className="standing-points">{row.points}</strong></td>
                      <td>
                        <span className={`qualification qualification--${index < 2 ? "direct" : index === 2 ? "third" : "waiting"}`}>
                          {index < 2 ? "直接晋级" : index === 2 ? "第三名竞争" : "等待反超"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="standings-note">
            <Info size={14} />
            <span>同分球队依次按净胜球、进球数排序；完整同分规则以赛事官方规定为准。</span>
            <a href="https://www.miguvideo.com/mgs/website/prd/usmcaCup2026MatchData.html?seasonIdFk=110000005666&competitionId=100000000991" target="_blank" rel="noreferrer">
              数据格式参考 <ExternalLink size={12} />
            </a>
          </footer>
        </section>
      )}
    </main>
  );
}
