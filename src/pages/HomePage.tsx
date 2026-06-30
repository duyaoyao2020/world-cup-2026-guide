import { ArrowRight, CalendarDays, GitBranch, MapPin, Play, Radio, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { matches, todayFocusMatch, todayFocusUsesGoogleInterest, venues } from "../data/schedule";
import { formatFullDate, formatTime } from "../utils";

const particles = Array.from({ length: 22 }, (_, index) => index);

export function HomePage() {
  return (
    <main className="home-page">
      <div className="hero-backdrop" />
      <div className="hero-vignette" />
      <div className="light-beam light-beam--one" />
      <div className="light-beam light-beam--two" />
      <div className="particles">
        {particles.map((particle) => <i key={particle} style={{ "--i": particle } as React.CSSProperties} />)}
      </div>
      <AppHeader />

      <section className="hero-content">
        <div className="hero-eyebrow">
          <span><Radio size={14} /> 2026 北美盛夏</span>
          <span>{formatFullDate(todayFocusMatch.kickoffUtc)}</span>
        </div>
        <div className="hero-title-lockup">
          <span>THE WORLD'S GAME</span>
          <h1>世界杯<br /><em>观赛指南</em></h1>
          <p>一屏纵览 104 场比赛。进入球场，读取阵型，聚焦每一名改变比赛的人。</p>
        </div>
        <div className="hero-actions">
          <Link className="primary-cta" to="/schedule">
            <span><Play size={17} fill="currentColor" /> 进入完整赛程</span>
            <ArrowRight size={18} />
          </Link>
          <div className="branch-actions">
            <Link className="secondary-cta" to="/standings">
              小组赛 · 积分表 <ArrowRight size={16} />
            </Link>
            <Link className="knockout-cta" to="/knockout">
              <span><GitBranch size={16} /> 淘汰赛</span>
              <small>签表与赛果</small>
            </Link>
          </div>
        </div>
      </section>

      <section className="hero-dashboard">
        <div className="hero-stat">
          <small>MATCHES</small>
          <strong>{matches.length}</strong>
          <span><CalendarDays size={14} /> 史上最大规模</span>
        </div>
        <div className="hero-stat">
          <small>HOST CITIES</small>
          <strong>{venues.length}</strong>
          <span><MapPin size={14} /> 美国 · 加拿大 · 墨西哥</span>
        </div>
        <Link className="next-match" to={`/match/${todayFocusMatch.id}`}>
          <div>
            <span className="status-pill">
              <i /> 今日焦点 · {todayFocusUsesGoogleInterest ? "Google 搜索热度最高" : "当日精选"}
            </span>
            <h3>{todayFocusMatch.home.name} <b>VS</b> {todayFocusMatch.away.name}</h3>
            <p>{todayFocusMatch.venue.city} · 北京时间 {formatTime(todayFocusMatch.kickoffUtc)}</p>
          </div>
          <span className="round-button"><Trophy size={19} /></span>
        </Link>
      </section>
      <div className="scroll-cue"><span /> SCROLL TO DISCOVER</div>
    </main>
  );
}
