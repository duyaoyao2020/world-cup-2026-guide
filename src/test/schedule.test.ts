import { describe, expect, it } from "vitest";
import {
  bosniaLineup,
  brazilLineup,
  canadaLineup,
  colombiaLineup,
  croatiaLineup,
  czechLineup,
  drCongoLineup,
  englandLineup,
  ghanaLineup,
  haitiLineup,
  koreaLineup,
  mexicoLineup,
  moroccoLineup,
  panamaLineup,
  paraguayLineup,
  portugalLineup,
  qatarLineup,
  scotlandLineup,
  southAfricaLineup,
  swissLineup,
  turkeyLineup,
  usaLineup,
  australiaLineup,
  lineupsByMatchId,
  uzbekistanLineup,
} from "../data/lineups";
import { genericMatchDetailsById } from "../data/matchDetails";
import { localAvatarSources } from "../data/localAvatars";
import { featuredMatch, getDailyFocusMatch, matches } from "../data/schedule";
import { groupStandings } from "../data/standings";
import { formatLocalDate, groupMatchesByDate } from "../utils";

describe("2026 World Cup static schedule", () => {
  it("contains 104 complete and uniquely identified matches", () => {
    expect(matches).toHaveLength(104);
    expect(new Set(matches.map((match) => match.id)).size).toBe(104);
    matches.forEach((match) => {
      expect(match.home.name).toBeTruthy();
      expect(match.away.name).toBeTruthy();
      expect(match.venue.name).toBeTruthy();
      expect(match.venue.timezone).toBeTruthy();
      expect(Number.isNaN(new Date(match.kickoffUtc).getTime())).toBe(false);
    });
  });

  it("uses Korea versus Czechia as the featured 3D match", () => {
    expect(featuredMatch.home.code).toBe("KOR");
    expect(featuredMatch.away.code).toBe("CZE");
    expect(featuredMatch.group).toBe("A");
    expect(featuredMatch.venue.name).toBe("瓜达拉哈拉体育场");
    expect(formatLocalDate(featuredMatch.kickoffUtc)).toBe("2026-06-12");
    expect(koreaLineup.players).toHaveLength(11);
    expect(czechLineup.players).toHaveLength(11);
  });

  it("uses the highest-search-interest match as today's homepage focus", () => {
    const focusMatch = getDailyFocusMatch("2026-06-13");
    expect(focusMatch.home.code).toBe("USA");
    expect(focusMatch.away.code).toBe("PAR");
    expect(focusMatch.beijingDate).toBe("2026-06-13");
    expect(focusMatch.showcase).toBe(true);
  });

  it("falls back to the first non-finished match when a Beijing date has no curated focus", () => {
    const focusMatch = getDailyFocusMatch("2026-07-01");
    expect(focusMatch.id).toBe("match-5403474");
    expect(focusMatch.status).toBe("未开始");
  });

  it("matches the reference fixture order and stage totals", () => {
    expect(matches[0].home.name).toBe("墨西哥");
    expect(matches[0].away.name).toBe("南非");
    expect(
      matches.reduce<Record<string, number>>((totals, match) => {
        totals[match.stage] = (totals[match.stage] ?? 0) + 1;
        return totals;
      }, {}),
    ).toEqual({
      小组赛: 72,
      "32强赛": 16,
      "16强赛": 8,
      四分之一决赛: 4,
      半决赛: 2,
      季军赛: 1,
      决赛: 1,
    });
  });

  it("provides a complete Mexico versus South Africa 3D showcase", () => {
    const match = matches.find((item) => item.id === "match-5403396");
    expect(match?.home.code).toBe("MEX");
    expect(match?.away.code).toBe("RSA");
    expect(match?.showcase).toBe(true);
    expect(mexicoLineup.players).toHaveLength(11);
    expect(southAfricaLineup.players).toHaveLength(11);
    expect(mexicoLineup.kit.shirt).toBe("#087555");
    expect(southAfricaLineup.kit.shirt).toBe("#e0b822");
  });

  it("provides complete 3D showcases for today's Canada and USA matches", () => {
    const canadaMatch = matches.find((item) => item.id === "match-5403398");
    const usaMatch = matches.find((item) => item.id === "match-5403399");

    expect([canadaMatch?.home.code, canadaMatch?.away.code, canadaMatch?.showcase]).toEqual(["CAN", "BIH", true]);
    expect([usaMatch?.home.code, usaMatch?.away.code, usaMatch?.showcase]).toEqual(["USA", "PAR", true]);
    [canadaLineup, bosniaLineup, usaLineup, paraguayLineup].forEach((lineup) => {
      expect(lineup.players).toHaveLength(11);
      expect(lineup.formation).toBeTruthy();
      expect(lineup.coach).toBeTruthy();
      expect(lineup.kit.shirt).toBeTruthy();
    });
  });

  it("provides complete 3D showcases for the four June 14 Beijing matches", () => {
    const expected = [
      ["match-5403400", "QAT", "SUI"],
      ["match-5403401", "BRA", "MAR"],
      ["match-5403402", "HAI", "SCO"],
      ["match-5403403", "AUS", "TUR"],
    ];
    expected.forEach(([id, home, away]) => {
      const match = matches.find((item) => item.id === id);
      expect([match?.home.code, match?.away.code, match?.showcase]).toEqual([home, away, true]);
    });
    [qatarLineup, swissLineup, brazilLineup, moroccoLineup, haitiLineup, scotlandLineup, australiaLineup, turkeyLineup]
      .forEach((lineup) => expect(lineup.players).toHaveLength(11));
    expected.forEach(([id]) => {
      expect(lineupsByMatchId[id]?.label).toBe("预测阵容");
      expect(lineupsByMatchId[id]?.subtitle).toBe("官方首发待公布");
    });
  });

  it("provides complete 3D showcases for the four June 18 Beijing matches", () => {
    const expected = [
      ["match-5403416", "POR", "COD"],
      ["match-5403417", "ENG", "CRO"],
      ["match-5403418", "GHA", "PAN"],
      ["match-5403419", "UZB", "COL"],
    ];
    expected.forEach(([id, home, away]) => {
      const match = matches.find((item) => item.id === id);
      expect([match?.home.code, match?.away.code, match?.showcase]).toEqual([home, away, true]);
      expect(lineupsByMatchId[id]?.label).toBe("预测阵容");
      expect(lineupsByMatchId[id]?.subtitle).toBe("官方首发待公布");
    });
    [
      portugalLineup,
      drCongoLineup,
      englandLineup,
      croatiaLineup,
      ghanaLineup,
      panamaLineup,
      uzbekistanLineup,
      colombiaLineup,
    ].forEach((lineup) => {
      expect(lineup.players).toHaveLength(11);
      expect(lineup.formation).toBeTruthy();
      expect(lineup.coach).toBeTruthy();
      expect(lineup.kit.shirt).toBeTruthy();
    });
  });

  it("provides complete 3D showcases for the two July 2 Beijing matches with ready prediction bundles", () => {
    const expected = [
      ["match-5403475", "ENG", "COD"],
      ["match-5403477", "USA", "BIH"],
    ];
    expected.forEach(([id, home, away]) => {
      const match = matches.find((item) => item.id === id);
      expect([match?.home.code, match?.away.code, match?.showcase]).toEqual([home, away, true]);
      expect(lineupsByMatchId[id]?.label).toBe("预测阵容");
      expect(lineupsByMatchId[id]?.subtitle).toBe("官方首发待公布");
    });
  });

  it("provides the confirmed official lineup showcase for Mexico versus Ecuador", () => {
    const match = matches.find((item) => item.id === "match-5403474");
    expect([match?.home.code, match?.away.code, match?.showcase]).toEqual(["MEX", "ECU", true]);
    expect(lineupsByMatchId["match-5403474"]?.label).toBe("官方首发");
    expect(lineupsByMatchId["match-5403474"]?.subtitle).toBe("阵型已确认");
    expect(lineupsByMatchId["match-5403474"]?.home.players).toHaveLength(11);
    expect(lineupsByMatchId["match-5403474"]?.away.players).toHaveLength(11);
  });

  it("provides the confirmed official lineup showcase for France versus Sweden", () => {
    const match = matches.find((item) => item.id === "match-5403473");
    expect([match?.home.code, match?.away.code, match?.showcase, match?.status]).toEqual(["FRA", "SWE", true, "已结束"]);
    expect(lineupsByMatchId["match-5403473"]?.label).toBe("官方首发");
    expect(lineupsByMatchId["match-5403473"]?.subtitle).toBe("阵型已确认");
    expect(lineupsByMatchId["match-5403473"]?.home.players).toHaveLength(11);
    expect(lineupsByMatchId["match-5403473"]?.away.players).toHaveLength(11);
  });

  it("provides complete clickable player details and local avatar coverage", () => {
    const players = [...koreaLineup.players, ...czechLineup.players];
    players.forEach((player) => {
      expect(player.name).toBeTruthy();
      expect(player.englishName).toBeTruthy();
      expect(player.position).toBeTruthy();
      expect(player.age).toBeGreaterThan(0);
      expect(player.height).toBeTruthy();
      expect(player.club).toBeTruthy();
      expect(player.traits.length).toBeGreaterThan(0);
    });
    expect(Object.keys(localAvatarSources)).toHaveLength(191);
    expect(players.filter((player) => player.avatarCredit === "本地头像库")).toHaveLength(17);
  });

  it("groups matches by Beijing date without dropping matches", () => {
    const grouped = groupMatchesByDate(matches);
    expect(Object.values(grouped).flat()).toHaveLength(104);
  });

  it("calculates all 12 group standings from recorded results", () => {
    expect(groupStandings).toHaveLength(12);
    expect(groupStandings.every((standing) => standing.rows.length === 4)).toBe(true);
    expect(groupStandings.find(({ group }) => group === "A")?.rows[0].team.code).toBe("MEX");
    expect(groupStandings.find(({ group }) => group === "A")?.rows[0].points).toBe(9);
    expect(groupStandings.find(({ group }) => group === "A")?.rows[1].team.code).toBe("RSA");
    expect(groupStandings.find(({ group }) => group === "B")?.rows[0].team.code).toBe("SUI");
    expect(groupStandings.find(({ group }) => group === "B")?.rows[0].points).toBe(7);
    expect(groupStandings.find(({ group }) => group === "B")?.rows[1].team.code).toBe("CAN");
    expect(groupStandings.find(({ group }) => group === "C")?.rows[0].team.code).toBe("BRA");
    expect(groupStandings.find(({ group }) => group === "C")?.rows[1].team.code).toBe("MAR");
    expect(groupStandings.find(({ group }) => group === "D")?.rows[1].team.code).toBe("AUS");
    expect(groupStandings.find(({ group }) => group === "D")?.rows[0].team.code).toBe("USA");
    expect(groupStandings.find(({ group }) => group === "D")?.rows[0].goalDifference).toBe(4);
    expect(groupStandings.find(({ group }) => group === "D")?.rows[1].points).toBe(4);
    expect(groupStandings.find(({ group }) => group === "D")?.rows[2].team.code).toBe("PAR");
    expect(groupStandings.find(({ group }) => group === "E")?.rows[0].team.code).toBe("GER");
    expect(groupStandings.find(({ group }) => group === "E")?.rows[1].team.code).toBe("CIV");
    expect(groupStandings.find(({ group }) => group === "E")?.rows[0].points).toBe(6);
    expect(groupStandings.find(({ group }) => group === "E")?.rows[1].points).toBe(6);
    expect(groupStandings.find(({ group }) => group === "F")?.rows[0].team.code).toBe("NED");
    expect(groupStandings.find(({ group }) => group === "F")?.rows[1].team.code).toBe("JPN");
    expect(groupStandings.find(({ group }) => group === "F")?.rows[0].points).toBe(7);
    expect(groupStandings.find(({ group }) => group === "F")?.rows[1].points).toBe(5);
    expect(groupStandings.find(({ group }) => group === "G")?.rows[0].team.code).toBe("BEL");
    expect(groupStandings.find(({ group }) => group === "G")?.rows[0].points).toBe(5);
    expect(groupStandings.find(({ group }) => group === "G")?.rows[1].team.code).toBe("EGY");
    expect(groupStandings.find(({ group }) => group === "G")?.rows[1].points).toBe(5);
    expect(groupStandings.find(({ group }) => group === "H")?.rows[0].team.code).toBe("ESP");
    expect(groupStandings.find(({ group }) => group === "H")?.rows[0].points).toBe(7);
    expect(groupStandings.find(({ group }) => group === "H")?.rows[1].team.code).toBe("CPV");
    expect(groupStandings.find(({ group }) => group === "I")?.rows[0].team.code).toBe("FRA");
    expect(groupStandings.find(({ group }) => group === "I")?.rows[1].team.code).toBe("NOR");
    expect(groupStandings.find(({ group }) => group === "I")?.rows[0].points).toBe(9);
    expect(groupStandings.find(({ group }) => group === "I")?.rows[1].points).toBe(6);
    expect(groupStandings.find(({ group }) => group === "J")?.rows[0].team.code).toBe("ARG");
    expect(groupStandings.find(({ group }) => group === "J")?.rows[1].team.code).toBe("AUT");
    expect(groupStandings.find(({ group }) => group === "J")?.rows[1].points).toBe(4);
    expect(groupStandings.find(({ group }) => group === "K")?.rows[0].team.code).toBe("COL");
    expect(groupStandings.find(({ group }) => group === "K")?.rows[1].team.code).toBe("POR");
    expect(groupStandings.find(({ group }) => group === "K")?.rows[1].points).toBe(5);
    expect(groupStandings.find(({ group }) => group === "L")?.rows[0].team.code).toBe("ENG");
    expect(groupStandings.find(({ group }) => group === "L")?.rows[0].points).toBe(7);
    expect(groupStandings.find(({ group }) => group === "L")?.rows[1].team.code).toBe("CRO");
    expect(groupStandings.find(({ group }) => group === "L")?.rows[1].points).toBe(6);
    expect(matches.filter((match) => match.status === "已结束")).toHaveLength(78);
  });

  it("replaces knockout placeholders with confirmed pairings and shootout data", () => {
    expect(matches.find((match) => match.id === "match-5403468")?.away.code).toBe("CAN");
    expect(matches.find((match) => match.id === "match-5403470")?.away.code).toBe("PAR");
    expect(matches.find((match) => match.id === "match-5403470")?.shootout).toEqual({ home: 3, away: 4 });
    expect(matches.find((match) => match.id === "match-5403471")?.away.code).toBe("MAR");
    expect(matches.find((match) => match.id === "match-5403471")?.shootout).toEqual({ home: 2, away: 3 });
    expect(matches.find((match) => match.id === "match-5403476")?.away.code).toBe("SEN");
  });

  it("adds confirmed lineup detail cards for all June 17 Beijing matches", () => {
    ["match-5403412", "match-5403413", "match-5403414", "match-5403415"].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("官方首发");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("阵型已确认");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups?.homeXI).toHaveLength(11);
      expect(genericMatchDetailsById[id]?.confirmedLineups?.awayXI).toHaveLength(11);
    });
  });

  it("adds preview detail cards for all June 18 Beijing matches while lineups remain pending", () => {
    ["match-5403416", "match-5403417", "match-5403418", "match-5403419"].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds preview detail cards for all June 19 Beijing matches while lineups remain pending", () => {
    ["match-5403420", "match-5403421", "match-5403422", "match-5403423"].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds preview detail cards for all June 20 Beijing matches while lineups remain pending", () => {
    ["match-5403424", "match-5403425", "match-5403426", "match-5403427"].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds preview detail cards for all June 21 Beijing matches while lineups remain pending", () => {
    ["match-5403428", "match-5403429", "match-5403430", "match-5403431"].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds result detail cards for all June 22 and June 23 Beijing matches", () => {
    [
      "match-5403432",
      "match-5403433",
      "match-5403434",
      "match-5403435",
      "match-5403436",
      "match-5403437",
      "match-5403438",
      "match-5403439",
    ].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds result detail cards for all June 24 and June 25 Beijing matches", () => {
    [
      "match-5403440",
      "match-5403441",
      "match-5403442",
      "match-5403443",
      "match-5403444",
      "match-5403445",
      "match-5403446",
      "match-5403447",
      "match-5403448",
      "match-5403449",
    ].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds result detail cards for all completed June 26 and June 27 Beijing matches", () => {
    [
      "match-5403450",
      "match-5403451",
      "match-5403452",
      "match-5403453",
      "match-5403454",
      "match-5403455",
      "match-5403456",
      "match-5403457",
    ].forEach((id) => {
      expect(genericMatchDetailsById[id]?.statusLabel).toBe("待公布");
      expect(genericMatchDetailsById[id]?.statusSubtitle).toBe("官方首发待公布");
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
  });

  it("adds result and preview detail cards through the current round-of-32 slate", () => {
    [
      "match-5403458",
      "match-5403459",
      "match-5403460",
      "match-5403461",
      "match-5403462",
      "match-5403463",
      "match-5403464",
      "match-5403465",
      "match-5403466",
      "match-5403467",
      "match-5403468",
      "match-5403469",
      "match-5403470",
      "match-5403471",
      "match-5403472",
      "match-5403475",
      "match-5403476",
      "match-5403477",
    ].forEach((id) => {
      expect(genericMatchDetailsById[id]?.homeWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.awayWatch).toHaveLength(3);
      expect(genericMatchDetailsById[id]?.confirmedLineups).toBeUndefined();
    });
    expect(genericMatchDetailsById["match-5403475"]?.statusLabel).toBe("预测阵容");
    expect(genericMatchDetailsById["match-5403476"]?.statusLabel).toBe("待公布");
    expect(genericMatchDetailsById["match-5403477"]?.statusLabel).toBe("预测阵容");
    expect(genericMatchDetailsById["match-5403473"]?.statusLabel).toBe("官方首发");
    expect(genericMatchDetailsById["match-5403473"]?.confirmedLineups?.homeXI).toHaveLength(11);
    expect(genericMatchDetailsById["match-5403473"]?.confirmedLineups?.awayXI).toHaveLength(11);
    expect(genericMatchDetailsById["match-5403474"]?.statusLabel).toBe("官方首发");
    expect(genericMatchDetailsById["match-5403474"]?.confirmedLineups?.homeXI).toHaveLength(11);
    expect(genericMatchDetailsById["match-5403474"]?.confirmedLineups?.awayXI).toHaveLength(11);
  });
});
