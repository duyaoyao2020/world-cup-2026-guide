import { CalendarDays, Database, Filter, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { MatchCard } from "../components/MatchCard";
import { matches, venues } from "../data/schedule";
import { formatDate, groupMatchesByDate, tournamentToday } from "../utils";

const stages = ["全部阶段", "小组赛", "32强赛", "16强赛", "四分之一决赛", "半决赛", "季军赛", "决赛"];
const phases = ["全部赛程", "小组赛", "淘汰赛"] as const;

export function SchedulePage() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<(typeof phases)[number]>("全部赛程");
  const [stage, setStage] = useState("全部阶段");
  const [city, setCity] = useState("全部城市");
  const [group, setGroup] = useState("全部分组");

  const filtered = useMemo(
    () =>
      matches.filter((match) => {
        const target = `${match.home.name}${match.away.name}${match.home.code}${match.away.code}${match.venue.name}${match.venue.city}`.toLowerCase();
        return (
          target.includes(query.toLowerCase()) &&
          (phase === "全部赛程" || (phase === "小组赛" ? match.stage === "小组赛" : match.stage !== "小组赛")) &&
          (stage === "全部阶段" || match.stage === stage) &&
          (city === "全部城市" || match.venue.city === city) &&
          (group === "全部分组" || match.group === group)
        );
      }),
    [query, phase, stage, city, group],
  );

  const grouped = groupMatchesByDate(filtered);
  const dates = Object.keys(grouped).sort();
  const matchDayCount = Object.keys(groupMatchesByDate(matches)).length;
  const cities = [...new Set(venues.map((venue) => venue.city))];

  const jumpToToday = () => {
    const target = document.getElementById(`date-${tournamentToday}`) ?? document.querySelector(".match-day");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="schedule-page">
      <AppHeader />
      <section className="schedule-hero">
        <div>
          <span className="section-kicker"><Sparkles size={14} /> 2026 MATCH CENTER</span>
          <h1>每一天，<em>都是比赛日。</em></h1>
          <p>从墨西哥城的揭幕哨，到纽约新泽西的最终决战。</p>
        </div>
        <div className="schedule-summary">
          <span><b>{matches.length}</b> 场比赛</span>
          <span><b>{venues.length}</b> 座球场</span>
          <span><b>{matchDayCount}</b> 个比赛日</span>
        </div>
      </section>

      <nav className="schedule-phase-tabs" aria-label="赛程阶段">
        {phases.map((item) => (
          <button className={phase === item ? "is-active" : ""} key={item} onClick={() => setPhase(item)}>
            {item}
            <small>{item === "全部赛程" ? 104 : item === "小组赛" ? 72 : 32}</small>
          </button>
        ))}
      </nav>

      <section className="filters-panel">
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索球队、城市或球场" />
        </label>
        <label>
          <SlidersHorizontal size={15} />
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            {stages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <Filter size={15} />
          <select value={group} onChange={(event) => setGroup(event.target.value)}>
            <option>全部分组</option>
            {"ABCDEFGHIJKL".split("").map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <CalendarDays size={15} />
          <select value={city} onChange={(event) => setCity(event.target.value)}>
            <option>全部城市</option>
            {cities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button onClick={jumpToToday}>定位今日</button>
      </section>

      <section className="schedule-list">
        <div className="schedule-list-head">
          <p><span>{filtered.length}</span> 场符合条件</p>
          <p><Database size={12} /> 数据参考网易 2026 世界杯赛程静态快照 <i /> 主时间：北京时间</p>
        </div>
        {dates.map((date) => (
          <article className="match-day" id={`date-${date}`} key={date}>
            <div className="day-heading">
              <span>{date === tournamentToday ? "TODAY" : date.slice(5).replace("-", " / ")}</span>
              <h2>{formatDate(grouped[date][0].kickoffUtc)}</h2>
              <i />
              <small>{grouped[date].length} 场比赛</small>
            </div>
            <div className="match-table">
              <div className="match-table-head">
                <span>时间 / 阶段</span><span>主队</span><span>比分</span><span>客队</span><span>比赛场地</span>
              </div>
              {grouped[date].map((match) => <MatchCard key={match.id} match={match} />)}
            </div>
          </article>
        ))}
        {dates.length === 0 && <div className="empty-state">没有找到符合条件的比赛，试试放宽筛选。</div>}
        <a className="schedule-source" href="https://sports.163.com/caipiao/worldcup2026" target="_blank" rel="noreferrer">
          赛程数据参考：网易彩票 2026 世界杯赛程
        </a>
      </section>
    </main>
  );
}
