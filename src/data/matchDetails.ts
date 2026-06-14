export interface GenericMatchDetail {
  statusLabel: "演示阵容" | "预测阵容" | "待公布";
  statusSubtitle: string;
  note: string;
  headline: string;
  summary: string;
  homeWatch: string[];
  awayWatch: string[];
}

export const genericMatchDetailsById: Record<string, GenericMatchDetail> = {
  "match-5403404": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "当前页面先提供开球时间、场地与观赛关注点；最终首发请以 FIFA Match Centre 与两队赛前官宣为准。",
    headline: "E组首轮，德国迎战首次亮相世界杯的库拉索。",
    summary: "两队都从 0 战 0 分起步，休斯顿首战将直接影响本组开局走势。",
    homeWatch: ["Joshua Kimmich", "Jamal Musiala", "Kai Havertz"],
    awayWatch: ["Leandro Bacuna", "Tahith Chong", "Sontje Hansen"],
  },
  "match-5403405": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "荷兰与日本详情页现阶段仅展示赛前看点，不将演示名单误写为官方首发。",
    headline: "F组首轮，荷兰与日本在达拉斯直接对话。",
    summary: "这场比赛汇集两支转换速度很快的球队，首轮抢分价值很高。",
    homeWatch: ["Virgil van Dijk", "Frenkie de Jong", "Cody Gakpo"],
    awayWatch: ["Takefusa Kubo", "Ritsu Dōan", "Ayase Ueda"],
  },
  "match-5403406": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "项目会在确认可靠来源后再同步首发；当前保留赛前信息，避免提前写入未经确认的 XI。",
    headline: "E组另一场由科特迪瓦对阵厄瓜多尔。",
    summary: "费城这场首轮较量将决定 E 组首个比赛日结束后的积分层次。",
    homeWatch: ["Franck Kessié", "Seko Fofana", "Simon Adingra"],
    awayWatch: ["Moisés Caicedo", "Piero Hincapié", "Enner Valencia"],
  },
  "match-5403407": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "瑞典与突尼斯页面暂以赛前资讯为主，官方首发公布前不会把预测站位写成已确认阵容。",
    headline: "F组首轮收官战在蒙特雷上演，瑞典对阵突尼斯。",
    summary: "同组另一场结果出来前，两队都会把这场视为争取主动权的直接交锋。",
    homeWatch: ["Alexander Isak", "Victor Lindelöf", "Lucas Bergvall"],
    awayWatch: ["Ellyes Skhiri", "Hannibal Mejbri", "Elias Achouri"],
  },
};
