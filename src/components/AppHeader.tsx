import { CalendarDays, ChevronLeft, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
        {!isHome && (
          <Link className="header-link" to="/schedule">
            {location.pathname.startsWith("/match") ? <ChevronLeft size={15} /> : <CalendarDays size={15} />}
            {location.pathname.startsWith("/match") ? "返回赛程" : "全部赛程"}
          </Link>
        )}
      </div>
    </header>
  );
}
