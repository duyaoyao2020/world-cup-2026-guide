import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const SchedulePage = lazy(() => import("./pages/SchedulePage").then((module) => ({ default: module.SchedulePage })));
const MatchPage = lazy(() => import("./pages/MatchPage").then((module) => ({ default: module.MatchPage })));
const StandingsPage = lazy(() => import("./pages/StandingsPage").then((module) => ({ default: module.StandingsPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })));

export default function App() {
  return (
    <Suspense fallback={<div className="route-loader"><span /><b>正在进入球场</b></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/match/:matchId" element={<MatchPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
}
