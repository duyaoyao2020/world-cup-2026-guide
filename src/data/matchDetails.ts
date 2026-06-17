export interface GenericMatchDetail {
  statusLabel: "演示阵容" | "预测阵容" | "待公布" | "官方首发";
  statusSubtitle: string;
  note: string;
  headline: string;
  summary: string;
  homeWatch: string[];
  awayWatch: string[];
  confirmedLineups?: {
    sourceLabel: string;
    homeFormation: string;
    awayFormation: string;
    homeXI: string[];
    awayXI: string[];
  };
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
    statusLabel: "官方首发",
    statusSubtitle: "阵型已确认",
    note: "法国 3比1 塞内加尔赛果已同步，详情页同时补入赛前公布的首发与阵型，便于回看比赛开局部署。",
    headline: "I组首轮，法国 3比1 击败塞内加尔，拿到小组开门红。",
    summary: "项目已同步终场比分，并补入两队赛前确认首发与 4-2-3-1 对 4-2-3-1 的开局阵型。",
    homeWatch: ["Kylian Mbappé", "Aurélien Tchouaméni", "William Saliba"],
    awayWatch: ["Sadio Mané", "Kalidou Koulibaly", "Lamine Camara"],
    confirmedLineups: {
      sourceLabel: "首发名单据 The Times 与赛中报道整理",
      homeFormation: "4-2-3-1",
      awayFormation: "4-2-3-1",
      homeXI: ["Mike Maignan", "Jules Koundé", "Dayot Upamecano", "William Saliba", "Théo Hernandez", "Aurélien Tchouaméni", "Adrien Rabiot", "Désiré Doué", "Michael Olise", "Ousmane Dembélé", "Kylian Mbappé"],
      awayXI: ["Édouard Mendy", "Krépin Diatta", "Kalidou Koulibaly", "Moussa Niakhaté", "El Hadji Malick Diouf", "Idrissa Gueye", "Pape Gueye", "Ismaïla Sarr", "Lamine Camara", "Sadio Mané", "Nicolas Jackson"],
    },
  },
  "match-5403413": {
    statusLabel: "官方首发",
    statusSubtitle: "阵型已确认",
    note: "伊拉克 1比4 挪威赛果已同步；页面写入了开球前公布的两队首发，方便对应哈兰德双响与伊拉克反扑阶段的站位。",
    headline: "I组另一场由挪威 4比1 击败伊拉克，暂居小组榜首。",
    summary: "项目已同步终场比分，并补入伊拉克 4-4-2 与挪威 4-3-3 的赛前确认首发。",
    homeWatch: ["Aymen Hussein", "Ali Al-Hamadi", "Zidane Iqbal"],
    awayWatch: ["Erling Haaland", "Martin Ødegaard", "Alexander Sørloth"],
    confirmedLineups: {
      sourceLabel: "首发名单据 The Guardian 赛前 lineup post 整理",
      homeFormation: "4-4-2",
      awayFormation: "4-3-3",
      homeXI: ["Jalal Hassan", "Merchas Doski", "Tahseen", "Akam Hashim", "Hussein Ali", "Osama Jasim", "Ismail", "Amir Al-Ammari", "Ibrahim Bayesh", "Ali Al-Hamadi", "Aymen Hussein"],
      awayXI: ["Ørjan Nyland", "David Møller Wolfe", "Torbjørn Heggem", "Kristoffer Vassbakk Ajer", "Julian Ryerson", "Fredrik Aursnes", "Sander Berge", "Martin Ødegaard", "Antonio Nusa", "Erling Haaland", "Alexander Sørloth"],
    },
  },
  "match-5403414": {
    statusLabel: "官方首发",
    statusSubtitle: "阵型已确认",
    note: "阿根廷 3比0 阿尔及利赛果已同步，页面附上两队赛前确认首发与阵型，便于回看比赛部署。",
    headline: "J组焦点战由阿根廷 3比0 完胜阿尔及利，顺利拿到首轮三分。",
    summary: "项目已同步终场比分，并补入阿根廷 4-3-3 对阿尔及利亚 5-2-3 的赛前确认首发。",
    homeWatch: ["Lionel Messi", "Julián Alvarez", "Enzo Fernández"],
    awayWatch: ["Riyad Mahrez", "Amine Gouiri", "Rayan Aït-Nouri"],
    confirmedLineups: {
      sourceLabel: "首发名单据 The Guardian 赛前 lineup post 整理",
      homeFormation: "4-3-3",
      awayFormation: "5-2-3",
      homeXI: ["Emiliano Martínez", "Gonzalo Montiel", "Cristian Romero", "Lisandro Martínez", "Facundo Medina", "Rodrigo De Paul", "Enzo Fernández", "Alexis Mac Allister", "Lionel Messi", "Thiago Almada", "Lautaro Martínez"],
      awayXI: ["Luca Zidane", "17 Belghali", "Aïssa Mandi", "Ramy Bensebaini", "Rayan Aït-Nouri", "Nabil Bentaleb", "Hicham Boudaoui", "Mohamed Maza", "Farès Chaïbi", "Anis Hadj Moussa", "Amine Gouiri"],
    },
  },
  "match-5403415": {
    statusLabel: "官方首发",
    statusSubtitle: "阵型已确认",
    note: "奥地利 3比1 约旦赛果已同步；本页记录了两队确认首发，便于回看约旦队史首个世界杯进球之前后的战术布局。",
    headline: "J组首轮收官战由奥地利 3比1 击败约旦，完成小组首秀抢分。",
    summary: "项目已同步终场比分，并补入奥地利 4-2-3-1 对约旦 3-4-3 的赛前确认首发。",
    homeWatch: ["David Alaba", "Marcel Sabitzer", "Konrad Laimer"],
    awayWatch: ["Musa Al-Taamari", "Ali Olwan", "Yazan Al-Arab"],
    confirmedLineups: {
      sourceLabel: "首发名单据 The Guardian 赛前 lineup post 整理",
      homeFormation: "4-2-3-1",
      awayFormation: "3-4-3",
      homeXI: ["Alexander Schlager", "Stefan Posch", "Philipp Lienhart", "David Alaba", "Phillipp Mwene", "Xaver Schlager", "Nicolas Seiwald", "Marcel Sabitzer", "Konrad Laimer", "Romano Schmid", "Saša Kalajdžić"],
      awayXI: ["Yazeed Abulaila", "Yazan Al-Arab", "Abdallah Nasib", "Mohammad Abualnadi", "Ehsan Haddad", "Nizar Al-Rashdan", "Noor Al-Rawabdeh", "Mohannad Abu Taha", "Musa Al-Taamari", "Ali Olwan", "Odeh Al-Fakhouri"],
    },
  },
  "match-5403416": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "北京时间 2026年6月18日 01:00 开球前，本页只保留已确认的赛程、场馆与赛前关注点；最终首发请以 FIFA Match Centre 与两队赛前官宣为准。",
    headline: "K组揭幕战在休斯顿进行，葡萄牙由 C 罗领衔迎战民主刚果。",
    summary: "美联社赛前信息显示，C 罗将开启个人第六届世界杯征程；民主刚果则希望依靠维萨与姆本巴的纵深冲击，在身体对抗里打乱葡萄牙的控球节奏。",
    homeWatch: ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva"],
    awayWatch: ["Yoane Wissa", "Chancel Mbemba", "Cédric Bakambu"],
  },
  "match-5403417": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "英格兰与克罗地亚的官方首发尚未发布，当前页面仅展示已确认赛程与赛前背景；最终名单请以赛前官宣为准。",
    headline: "L组焦点战移师达拉斯，英格兰在图赫尔世界杯首战对阵克罗地亚。",
    summary: "美联社赛前报道提到，哈里·凯恩距离英格兰国家队 75 球只差 1 球，而克罗地亚则可能迎来莫德里奇的最后一次世界杯征程，首轮强碰直接影响本组开局层次。",
    homeWatch: ["Harry Kane", "Jude Bellingham", "Bukayo Saka"],
    awayWatch: ["Luka Modrić", "Joško Gvardiol", "Andrej Kramarić"],
  },
  "match-5403418": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "加纳与巴拿马页面当前只展示赛前已确认信息，不提前写入未经核实的 XI；据 Guardian 6月17日报道，Thomas Partey 的加拿大签证上诉已被驳回，本场将无缘多伦多首战，官方首发仍待赛前确认。",
    headline: "L组另一场在多伦多上演，加纳与巴拿马争夺首轮关键分数。",
    summary: "两队都希望在同组英格兰与克罗地亚之外先抢到开局主动权；加纳需要在缺少 Thomas Partey 的情况下，把伊尼亚基·威廉斯、乔丹·阿尤与安托万·塞梅尼奥的纵向冲击转化为禁区威胁，巴拿马则要依靠卡拉斯基利亚与穆里略把比赛带进高对抗节奏。",
    homeWatch: ["Iñaki Williams", "Jordan Ayew", "Antoine Semenyo"],
    awayWatch: ["Adalberto Carrasquilla", "Michael Amir Murillo", "José Luis Rodríguez"],
  },
  "match-5403419": {
    statusLabel: "待公布",
    statusSubtitle: "官方首发待公布",
    note: "乌兹别克与哥伦比亚的官方首发待赛前确认；当前页面先保留已确认赛程、场馆与赛前看点。",
    headline: "K组首轮收官战回到墨西哥城，世界杯新军乌兹别克迎战哥伦比亚。",
    summary: "美联社赛前信息指出，法比奥·卡纳瓦罗执教的乌兹别克将迎来队史世界杯首秀；哥伦比亚则希望依靠路易斯·迪亚斯与哈梅斯·罗德里格斯尽快把纸面优势转成小组积分。",
    homeWatch: ["Eldor Shomurodov", "Abbosbek Fayzullaev", "Abdukodir Khusanov"],
    awayWatch: ["Luis Díaz", "James Rodríguez", "Jhon Arias"],
  },
};
