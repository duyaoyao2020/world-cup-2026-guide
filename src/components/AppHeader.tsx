import { CalendarDays, ChevronLeft, Mail, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  return (
    <header className="app-header">
      <Link className="brand" to="/">
        <span className="brand-mark"><Trophy size={18} /></span>
        <span>
          <b>WORLD CUP 26</b>
          <small>观赛指南</small>
        </span>
      </Link>
      <div className="header-meta">
        <span className="live-dot" />
        <span>赛事静态快照</span>
        {!isContact && (
          <Link className="header-link feedback-link" to="/contact">
            <Mail size={15} />
            <span>意见反馈</span>
          </Link>
        )}
        {!isHome && (
          <Link className="header-link" to={isContact ? "/" : "/schedule"}>
            {location.pathname.startsWith("/match") || isContact ? <ChevronLeft size={15} /> : <CalendarDays size={15} />}
            {location.pathname.startsWith("/match") ? "返回赛程" : isContact ? "返回首页" : "全部赛程"}
          </Link>
        )}
      </div>
    </header>
  );
}
