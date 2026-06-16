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
  "match-5403412": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "法国与塞内加尔详情页当前只展示赛前已确认赛程、场馆与观赛焦点，最终首发请以 FIFA Match Centre 与两队赛前官宣为准。",
    headline: "I组首轮重演 2002 年经典揭幕战，法国在纽约/新泽西迎战塞内加尔。",
    summary: "姆巴佩领衔的法国锋线将面对塞内加尔的身体对抗与转换速度，这场强强对话会直接决定 I 组开局层次。",
    homeWatch: ["Kylian Mbappé", "Aurélien Tchouaméni", "William Saliba"],
    awayWatch: ["Sadio Mané", "Kalidou Koulibaly", "Lamine Camara"],
  },
  "match-5403413": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "伊拉克 vs 挪威页面不会提前写入未经确认的 XI；开球前如有可靠首发来源，再单独同步。",
    headline: "I组另一场在波士顿进行，久违重返世界杯的挪威对阵同样回归舞台的伊拉克。",
    summary: "哈兰德与厄德高带来的纵深与终结能力是挪威最大变量，伊拉克则要把比赛拖入高对抗与局部缠斗节奏。",
    homeWatch: ["Aymen Hussein", "Ali Al-Hamadi", "Zidane Iqbal"],
    awayWatch: ["Erling Haaland", "Martin Ødegaard", "Alexander Sørloth"],
  },
  "match-5403414": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "阿根廷与阿尔及利亚详情页先保留赛前看点与比赛背景，不会把演示站位误标为官方首发。",
    headline: "J组首场焦点战在堪萨斯城打响，梅西第 200 场国家队比赛成为阿根廷揭幕战焦点。",
    summary: "卫冕冠军想用控场与前场压迫稳稳起步，阿尔及利亚则会尝试把比赛带进更直接的反击与二点球争夺。",
    homeWatch: ["Lionel Messi", "Julián Alvarez", "Enzo Fernández"],
    awayWatch: ["Riyad Mahrez", "Amine Gouiri", "Rayan Aït-Nouri"],
  },
  "match-5403415": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "奥地利 vs 约旦页面目前仅展示已确认的赛前信息；官方首发公布前，任何阵容都应视为待公布。",
    headline: "J组首轮收官战移师湾区，约旦首次世界杯亮相就要面对朗尼克执教的奥地利。",
    summary: "奥地利希望用高强度压迫尽快建立主动权，约旦则会依靠穆萨·塔马里领衔的反击线路寻找历史首分。",
    homeWatch: ["David Alaba", "Marcel Sabitzer", "Konrad Laimer"],
    awayWatch: ["Musa Al-Taamari", "Ali Olwan", "Yazan Al-Arab"],
  },
};
