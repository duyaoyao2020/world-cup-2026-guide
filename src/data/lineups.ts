import type { Lineup, Player } from "../types";
import { localAvatarSources } from "./localAvatars";
import { teams } from "./schedule";
import {
  australiaLineup,
  brazilLineup,
  haitiLineup,
  moroccoLineup,
  qatarLineup,
  scotlandLineup,
  swissLineup,
  turkeyLineup,
} from "./tomorrowLineups";
import {
  colombiaLineup,
  croatiaLineup,
  drCongoLineup,
  englandLineup,
  ghanaLineup,
  panamaLineup,
  portugalLineup,
  uzbekistanLineup,
} from "./todayShowcaseLineups";

export {
  australiaLineup,
  brazilLineup,
  haitiLineup,
  moroccoLineup,
  qatarLineup,
  scotlandLineup,
  swissLineup,
  turkeyLineup,
} from "./tomorrowLineups";

export {
  colombiaLineup,
  croatiaLineup,
  drCongoLineup,
  englandLineup,
  ghanaLineup,
  panamaLineup,
  portugalLineup,
  uzbekistanLineup,
} from "./todayShowcaseLineups";

const avatarSources: Record<string, string> = {
  "kor-1": "https://upload.wikimedia.org/wikipedia/commons/2/26/Jo_Hyeon-woo.jpg",
  "kor-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/%28%EC%B6%94%EA%BE%B8%EB%AF%B8%29_%27%EC%9A%B8%EC%82%B0_%ED%95%A9%EB%A5%98%27_%EC%84%A4%EC%98%81%EC%9A%B0.jpg/960px-%28%EC%B6%94%EA%BE%B8%EB%AF%B8%29_%27%EC%9A%B8%EC%82%B0_%ED%95%A9%EB%A5%98%27_%EC%84%A4%EC%98%81%EC%9A%B0.jpg",
  "kor-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/%28%EC%B6%94%EA%BE%B8%EB%AF%B8%29_%27%EC%9A%B8%EC%82%B0_%ED%95%A9%EB%A5%98%27_%EA%B9%80%EC%98%81%EA%B6%8C.jpg/960px-%28%EC%B6%94%EA%BE%B8%EB%AF%B8%29_%27%EC%9A%B8%EC%82%B0_%ED%95%A9%EB%A5%98%27_%EA%B9%80%EC%98%81%EA%B6%8C.jpg",
  "kor-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_26.jpg/960px-FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_26.jpg",
  "kor-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/191202_K%EB%A6%AC%EA%B7%B8_%EC%8B%9C%EC%83%81%EC%8B%9D%2C_%EA%B9%80%EB%AC%B8%ED%99%98_3.jpg/960px-191202_K%EB%A6%AC%EA%B7%B8_%EC%8B%9C%EC%83%81%EC%8B%9D%2C_%EA%B9%80%EB%AC%B8%ED%99%98_3.jpg",
  "kor-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/240611_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_vs_%EC%A4%91%EA%B5%AD_%28%ED%99%A9%EC%9D%B8%EB%B2%94%29.jpg/960px-240611_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_vs_%EC%A4%91%EA%B5%AD_%28%ED%99%A9%EC%9D%B8%EB%B2%94%29.jpg",
  "kor-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/960px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg",
  "kor-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lee_Kang-in_-_2022_%2852551771501%29_%28cropped%29.jpg/960px-Lee_Kang-in_-_2022_%2852551771501%29_%28cropped%29.jpg",
  "kor-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg/960px-240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg",
  "kor-11": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/191130_%EB%B6%80%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC_VS_FC%EC%95%88%EC%96%91_%ED%94%8C%EB%A0%88%EC%9D%B4%EC%98%A4%ED%94%84%2C_%EC%A1%B0%EA%B7%9C%EC%84%B1_2.jpg/960px-191130_%EB%B6%80%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC_VS_FC%EC%95%88%EC%96%91_%ED%94%8C%EB%A0%88%EC%9D%B4%EC%98%A4%ED%94%84%2C_%EC%A1%B0%EA%B7%9C%EC%84%B1_2.jpg",
  "cze-1": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Jind%C5%99ich_Stan%C4%9Bk_brank%C3%A1%C5%99_FK_Viktorie_Plze%C5%88_%28r._2023%29_%28cropped%29.jpg",
  "cze-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/David_Zima_CZE-KUW_2021-11-11_%28cropped%29.jpg/960px-David_Zima_CZE-KUW_2021-11-11_%28cropped%29.jpg",
  "cze-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tom%C3%A1%C5%A1_Hole%C5%A1_Jablonec-Ostrava.jpg/960px-Tom%C3%A1%C5%A1_Hole%C5%A1_Jablonec-Ostrava.jpg",
  "cze-6": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Tom%C3%A1%C5%A1_Sou%C4%8Dek_WHU.jpeg",
  "cze-7": "https://upload.wikimedia.org/wikipedia/commons/2/24/Anton%C3%ADn_Bar%C3%A1k_20180601_AUSCZE_3910_%28cropped%29.jpg",
  "cze-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Vladim%C3%ADr_Coufal_with_West_Ham_United.jpeg/960px-Vladim%C3%ADr_Coufal_with_West_Ham_United.jpeg",
  "cze-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Adam_Hlo%C5%BEek%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%282%29_%28cropped%29.jpg/960px-Adam_Hlo%C5%BEek%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%282%29_%28cropped%29.jpg",
  "cze-11": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3672_by_Stepro.jpg/960px-2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3672_by_Stepro.jpg",
};

const player = (
  id: string,
  name: string,
  englishName: string,
  number: number,
  position: string,
  role: string,
  age: number,
  height: string,
  club: string,
  traits: string[],
  x: number,
  y: number,
  avatar?: string,
): Player => ({
  id,
  name,
  englishName,
  number,
  position,
  role,
  age,
  height,
  club,
  traits,
  x,
  y,
  avatar: localAvatarSources[id] ?? avatarSources[id] ?? avatar,
  avatarCredit: localAvatarSources[id] ? "本地头像库" : avatarSources[id] || avatar ? "Wikimedia Commons" : undefined,
});

export const koreaLineup: Lineup = {
  team: teams.KOR,
  formation: "4-2-3-1",
  coach: "洪明甫",
  kit: { shirt: "#e72d45", shorts: "#171f2a", number: "#ffffff" },
  players: [
    player("kor-1", "赵贤祐", "Jo Hyeon-woo", 21, "门将", "GK", 34, "189cm", "蔚山HD", ["反应敏捷", "门线技术"], 50, 91),
    player("kor-2", "薛英佑", "Seol Young-woo", 22, "左后卫", "LB", 27, "182cm", "贝尔格莱德红星", ["上下往返", "对抗积极"], 17, 72),
    player("kor-3", "金英权", "Kim Young-gwon", 19, "中后卫", "CB", 36, "186cm", "蔚山HD", ["经验丰富", "左脚出球"], 39, 77),
    player("kor-4", "金玟哉", "Kim Min-jae", 4, "中后卫", "CB", 29, "190cm", "拜仁慕尼黑", ["强力对抗", "快速回追"], 61, 77),
    player("kor-5", "金纹奂", "Kim Moon-hwan", 23, "右后卫", "RB", 30, "173cm", "大田韩亚市民", ["快速套边", "压迫果断"], 83, 72),
    player("kor-6", "黄仁范", "Hwang In-beom", 6, "中场", "CM", 29, "177cm", "费耶诺德", ["节奏控制", "纵向传球"], 38, 55),
    player("kor-7", "李在城", "Lee Jae-sung", 10, "中场", "CM", 33, "180cm", "美因茨", ["无球跑动", "高位压迫"], 62, 55),
    player("kor-8", "孙兴慜", "Son Heung-min", 7, "左边锋", "LW", 33, "183cm", "托特纳姆热刺", ["双足终结", "高速反击"], 19, 34, "https://commons.wikimedia.org/wiki/Special:FilePath/Son%20Heung-min%202018.jpg"),
    player("kor-9", "李康仁", "Lee Kang-in", 18, "前腰", "AM", 25, "174cm", "巴黎圣日耳曼", ["精细盘带", "创造机会"], 50, 38),
    player("kor-10", "黄喜灿", "Hwang Hee-chan", 11, "右边锋", "RW", 30, "177cm", "狼队", ["爆发突破", "禁区冲击"], 81, 34),
    player("kor-11", "曹圭成", "Cho Gue-sung", 9, "中锋", "ST", 28, "189cm", "中日德兰", ["高空争顶", "支点策应"], 50, 14),
  ],
};

export const czechLineup: Lineup = {
  team: teams.CZE,
  formation: "3-4-2-1",
  coach: "伊万·哈谢克",
  kit: { shirt: "#f3f5f7", shorts: "#172b50", number: "#050505" },
  players: [
    player("cze-1", "金德日赫·斯塔涅克", "Jindřich Staněk", 1, "门将", "GK", 30, "192cm", "布拉格斯拉维亚", ["出击果断", "高球控制"], 50, 91),
    player("cze-2", "大卫·齐马", "David Zima", 4, "中后卫", "CB", 25, "190cm", "布拉格斯拉维亚", ["正面防守", "制空能力"], 25, 75),
    player("cze-3", "托马什·霍莱什", "Tomáš Holeš", 3, "中后卫", "CB", 33, "180cm", "布拉格斯拉维亚", ["预判拦截", "后场组织"], 50, 78),
    player("cze-4", "罗宾·赫拉纳奇", "Robin Hranáč", 2, "中后卫", "CB", 26, "190cm", "霍芬海姆", ["贴身对抗", "向前传递"], 75, 75),
    player("cze-5", "卢卡什·普罗沃德", "Lukáš Provod", 14, "左翼卫", "LWB", 29, "189cm", "布拉格斯拉维亚", ["传中精准", "覆盖面积"], 12, 52),
    player("cze-6", "托马什·绍切克", "Tomáš Souček", 22, "中场", "CM", 31, "192cm", "西汉姆联", ["空中优势", "后插上"], 40, 56),
    player("cze-7", "安东宁·巴拉克", "Antonín Barák", 7, "中场", "CM", 31, "190cm", "佛罗伦萨", ["左脚组织", "远射威胁"], 60, 56),
    player("cze-8", "弗拉迪米尔·曹法尔", "Vladimír Coufal", 5, "右翼卫", "RWB", 33, "174cm", "西汉姆联", ["传中稳定", "比赛韧性"], 88, 52),
    player("cze-9", "亚当·赫洛热克", "Adam Hložek", 9, "影锋", "SS", 23, "188cm", "霍芬海姆", ["持球推进", "强力射门"], 34, 31),
    player("cze-10", "瓦茨拉夫·切尔尼", "Václav Černý", 17, "影锋", "SS", 28, "182cm", "流浪者", ["左脚内切", "灵活跑位"], 66, 31),
    player("cze-11", "帕特里克·希克", "Patrik Schick", 10, "中锋", "ST", 30, "191cm", "勒沃库森", ["门前终结", "背身支点"], 50, 12, "https://commons.wikimedia.org/wiki/Special:FilePath/Patrik%20Schick%202018.jpg"),
  ],
};

export const mexicoLineup: Lineup = {
  team: teams.MEX,
  formation: "4-3-3",
  coach: "哈维尔·阿吉雷",
  kit: { shirt: "#087555", shorts: "#f3f5f4", number: "#ffffff" },
  players: [
    player("mex-1", "路易斯·马拉贡", "Luis Malagón", 1, "门将", "GK", 29, "180cm", "墨西哥美洲", ["近距离反应", "脚下出球"], 50, 91),
    player("mex-2", "赫苏斯·加利亚多", "Jesús Gallardo", 23, "左后卫", "LB", 31, "177cm", "托卢卡", ["高速前插", "边路覆盖"], 16, 72),
    player("mex-3", "约翰·巴斯克斯", "Johan Vásquez", 5, "中后卫", "CB", 27, "184cm", "热那亚", ["左脚出球", "预判拦截"], 39, 77),
    player("mex-4", "塞萨尔·蒙特斯", "César Montes", 3, "中后卫", "CB", 29, "195cm", "莫斯科火车头", ["制空能力", "正面防守"], 61, 77),
    player("mex-5", "豪尔赫·桑切斯", "Jorge Sánchez", 2, "右后卫", "RB", 28, "175cm", "蓝十字", ["边路推进", "积极压迫"], 84, 72),
    player("mex-6", "埃德松·阿尔瓦雷斯", "Edson Álvarez", 4, "后腰", "DM", 28, "187cm", "西汉姆联", ["防线保护", "强硬对抗"], 50, 58, "https://commons.wikimedia.org/wiki/Special:FilePath/Edson%20Alvarez%202018.jpg"),
    player("mex-7", "路易斯·查韦斯", "Luis Chávez", 24, "中场", "CM", 30, "178cm", "莫斯科迪纳摩", ["左脚远射", "定位球"], 31, 51),
    player("mex-8", "奥尔贝林·皮内达", "Orbelín Pineda", 18, "中场", "CM", 30, "169cm", "雅典AEK", ["灵活接应", "串联进攻"], 69, 51),
    player("mex-9", "朱利安·基尼奥内斯", "Julián Quiñones", 9, "左边锋", "LW", 29, "178cm", "卡迪西亚", ["强力突破", "禁区冲击"], 18, 27),
    player("mex-10", "圣地亚哥·希门尼斯", "Santiago Giménez", 11, "中锋", "ST", 25, "183cm", "AC米兰", ["门前终结", "反越位"], 50, 17),
    player("mex-11", "伊尔文·洛萨诺", "Hirving Lozano", 22, "右边锋", "RW", 30, "175cm", "圣迭戈FC", ["高速内切", "直接攻击"], 82, 27, "https://commons.wikimedia.org/wiki/Special:FilePath/Hirving%20Lozano%202018.jpg"),
  ],
};

export const mexicoEcuadorLineup: Lineup = {
  team: teams.MEX,
  formation: "4-1-2-3",
  coach: "哈维尔·阿吉雷",
  kit: { shirt: "#087555", shorts: "#f3f5f4", number: "#ffffff" },
  players: [
    player("mex-11b", "劳尔·兰赫尔", "Raúl Rangel", 1, "门将", "GK", 26, "190cm", "瓜达拉哈拉", ["高球控制", "出击果断"], 50, 91),
    player("mex-2", "赫苏斯·加利亚多", "Jesús Gallardo", 23, "左后卫", "LB", 31, "177cm", "托卢卡", ["高速前插", "边路覆盖"], 16, 72),
    player("mex-3", "约翰·巴斯克斯", "Johan Vásquez", 5, "中后卫", "CB", 27, "184cm", "热那亚", ["左脚出球", "预判拦截"], 39, 77),
    player("mex-4", "塞萨尔·蒙特斯", "César Montes", 3, "中后卫", "CB", 29, "195cm", "莫斯科火车头", ["制空能力", "正面防守"], 61, 77),
    player("mex-5", "豪尔赫·桑切斯", "Jorge Sánchez", 2, "右后卫", "RB", 28, "175cm", "蓝十字", ["边路推进", "积极压迫"], 84, 72),
    player("mex-14", "埃里克·利拉", "Érik Lira", 6, "后腰", "DM", 26, "174cm", "蓝十字", ["防线保护", "短传衔接"], 50, 60),
    player("mex-12", "路易斯·罗莫", "Luis Romo", 7, "中场", "CM", 31, "182cm", "瓜达拉哈拉", ["后插上", "对抗硬度"], 31, 51),
    player("mex-13", "希尔韦托·莫拉", "Gilberto Mora", 19, "中场", "CM", 17, "168cm", "蒂华纳", ["持球摆脱", "肋部接应"], 69, 51),
    player("mex-9", "胡利安·基尼奥内斯", "Julián Quiñones", 16, "左边锋", "LW", 29, "178cm", "卡迪西亚", ["强力突破", "禁区冲击"], 18, 27),
    player("mex-15", "劳尔·希门尼斯", "Raúl Jiménez", 9, "中锋", "ST", 35, "190cm", "富勒姆", ["背身做球", "门前终结"], 50, 17),
    player("mex-16", "罗伯托·阿尔瓦拉多", "Roberto Alvarado", 25, "右边锋", "RW", 27, "176cm", "瓜达拉哈拉", ["回撤串联", "右路推进"], 82, 27),
  ],
};

export const ecuadorLineup: Lineup = {
  team: teams.ECU,
  formation: "4-4-2",
  coach: "塞瓦斯蒂安·贝卡塞塞",
  kit: { shirt: "#f3d23e", shorts: "#172f67", number: "#172f67" },
  players: [
    player("ecu-1", "埃尔南·加林德斯", "Hernán Galíndez", 1, "门将", "GK", 39, "187cm", "飓风", ["门线反应", "高球处理"], 50, 91),
    player("ecu-3", "皮耶罗·因卡皮耶", "Piero Hincapié", 3, "左后卫", "LB", 24, "183cm", "勒沃库森", ["左路推进", "补位速度"], 16, 72),
    player("ecu-6", "威廉·帕乔", "Willian Pacho", 6, "中后卫", "CB", 24, "188cm", "巴黎圣日耳曼", ["正面封堵", "向前出球"], 39, 77),
    player("ecu-4", "霍埃尔·奥尔多涅斯", "Joel Ordóñez", 4, "中后卫", "CB", 22, "188cm", "布鲁日", ["高空对抗", "贴身防守"], 61, 77),
    player("ecu-21b", "阿兰·佛朗哥", "Alan Franco", 21, "右后卫", "RB", 27, "176cm", "米内罗竞技", ["补防覆盖", "强硬对抗"], 84, 72),
    player("ecu-20", "尼尔松·安古洛", "Nilson Angulo", 20, "左边前卫", "LM", 22, "186cm", "安德莱赫特", ["速度冲击", "反击纵深"], 18, 38),
    player("ecu-23", "莫伊塞斯·凯塞多", "Moisés Caicedo", 23, "中场", "CM", 24, "178cm", "切尔西", ["扫荡拦截", "纵向带球"], 40, 53),
    player("ecu-15", "佩德罗·维特", "Pedro Vite", 15, "中场", "CM", 24, "171cm", "温哥华白浪", ["转身摆脱", "直塞穿透"], 60, 53),
    player("ecu-19", "贡萨洛·普拉塔", "Gonzalo Plata", 19, "右边前卫", "RM", 25, "178cm", "弗拉门戈", ["单兵突破", "边路变速"], 82, 38),
    player("ecu-13", "恩内尔·瓦伦西亚", "Enner Valencia", 13, "前锋", "ST", 36, "177cm", "巴西国际", ["斜插抢点", "经验处理"], 40, 17),
    player("ecu-9", "约翰·耶博阿·萨莫拉", "John Yeboah Zamora", 9, "前锋", "ST", 25, "170cm", "威尼斯", ["肋部穿插", "一对一突破"], 60, 17),
  ],
};

export const franceSwedenLineup: Lineup = {
  team: teams.FRA,
  formation: "4-2-3-1",
  coach: "迪迪埃·德尚",
  kit: { shirt: "#1b2f6b", shorts: "#ffffff", number: "#f4c63d" },
  players: [
    player("fra-1", "迈克·迈尼昂", "Mike Maignan", 16, "门将", "GK", 31, "191cm", "AC米兰", ["门线反应", "脚下出球"], 50, 91),
    player("fra-2", "卢卡斯·迪涅", "Lucas Digne", 3, "左后卫", "LB", 33, "178cm", "阿斯顿维拉", ["边路传中", "前插稳定"], 16, 72),
    player("fra-3", "威廉·萨利巴", "William Saliba", 17, "中后卫", "CB", 25, "193cm", "阿森纳", ["对抗强硬", "纵向出球"], 39, 77),
    player("fra-4", "达约·于帕梅卡诺", "Dayot Upamecano", 4, "中后卫", "CB", 27, "186cm", "拜仁慕尼黑", ["回追速度", "正面封堵"], 61, 77),
    player("fra-5", "朱尔·孔德", "Jules Koundé", 5, "右后卫", "RB", 27, "180cm", "巴塞罗那", ["一对一防守", "肋部推进"], 84, 72),
    player("fra-6", "奥雷利安·楚阿梅尼", "Aurélien Tchouaméni", 8, "后腰", "DM", 26, "187cm", "皇家马德里", ["中场扫荡", "转移调度"], 40, 57),
    player("fra-7", "阿德里安·拉比奥", "Adrien Rabiot", 14, "中场", "CM", 31, "188cm", "马赛", ["持球推进", "后插上"], 60, 57),
    player("fra-8", "布拉德利·巴尔科拉", "Bradley Barcola", 20, "左边锋", "LW", 23, "186cm", "巴黎圣日耳曼", ["高速突破", "反击纵深"], 18, 34),
    player("fra-9", "迈克尔·奥利塞", "Michael Olise", 11, "前腰", "AM", 24, "184cm", "拜仁慕尼黑", ["左脚创造", "肋部串联"], 50, 38),
    player("fra-10", "奥斯曼·登贝莱", "Ousmane Dembélé", 7, "右边锋", "RW", 29, "178cm", "巴黎圣日耳曼", ["双足变向", "边路爆点"], 82, 34),
    player("fra-11", "基利安·姆巴佩", "Kylian Mbappé", 10, "中锋", "ST", 27, "178cm", "皇家马德里", ["纵深冲刺", "门前终结"], 50, 15),
  ],
};

export const swedenFranceLineup: Lineup = {
  team: teams.SWE,
  formation: "3-4-3",
  coach: "格雷厄姆·波特",
  kit: { shirt: "#1e57a6", shorts: "#f1cb34", number: "#f7f7f7" },
  players: [
    player("swe-1", "雅各布·维德尔·泽特斯特伦", "Jacob Widell Zetterström", 1, "门将", "GK", 28, "197cm", "德比郡", ["高空控制", "门前覆盖"], 50, 91),
    player("swe-2", "古斯塔夫·拉格比耶尔克", "Gustaf Lagerbielke", 14, "右中卫", "RCB", 26, "193cm", "布拉加", ["制空能力", "贴身卡位"], 26, 76),
    player("swe-3", "维克托·林德勒夫", "Victor Lindelöf", 4, "中后卫", "CB", 32, "187cm", "阿斯顿维拉", ["经验调度", "防线指挥"], 50, 79),
    player("swe-4", "加布里埃尔·古德蒙德松", "Gabriel Gudmundsson", 6, "左中卫", "LCB", 27, "180cm", "利兹联", ["左脚推进", "补位积极"], 74, 76),
    player("swe-5", "丹尼尔·斯文松", "Daniel Svensson", 24, "左翼卫", "LWB", 24, "183cm", "多特蒙德", ["大范围跑动", "边线往返"], 14, 52),
    player("swe-6", "埃利奥特·斯特劳德", "Elliot Stroud", 17, "右翼卫", "RWB", 24, "180cm", "米亚尔比", ["持球推进", "反击冲刺"], 86, 52),
    player("swe-7", "卢卡斯·贝里瓦尔", "Lucas Bergvall", 15, "中场", "CM", 20, "187cm", "托特纳姆热刺", ["向前带球", "二点接应"], 40, 55),
    player("swe-8", "亚辛·阿亚里", "Yasin Ayari", 18, "中场", "CM", 22, "172cm", "布莱顿", ["转身摆脱", "中路串联"], 60, 55),
    player("swe-9", "亚历山大·伊萨克", "Alexander Isak", 9, "左边锋", "LW", 27, "192cm", "利物浦", ["斜向盘带", "禁区终结"], 18, 28),
    player("swe-10", "维克托·约克雷斯", "Viktor Gyökeres", 10, "中锋", "ST", 28, "189cm", "阿森纳", ["支点背身", "连续射门"], 50, 16),
    player("swe-11", "安东尼·埃兰加", "Anthony Elanga", 11, "右边锋", "RW", 24, "178cm", "纽卡斯尔联", ["高速爆破", "纵向冲击"], 82, 28),
  ],
};

export const southAfricaLineup: Lineup = {
  team: teams.RSA,
  formation: "4-2-3-1",
  coach: "雨果·布鲁斯",
  kit: { shirt: "#e0b822", shorts: "#167149", number: "#101713" },
  players: [
    player("rsa-1", "龙文·威廉姆斯", "Ronwen Williams", 1, "门将", "GK", 34, "184cm", "马梅洛迪日落", ["点球判断", "后场组织"], 50, 91),
    player("rsa-2", "奥布里·莫迪巴", "Aubrey Modiba", 6, "左后卫", "LB", 30, "167cm", "马梅洛迪日落", ["左路传中", "攻守往返"], 16, 72),
    player("rsa-3", "格兰特·科卡纳", "Grant Kekana", 20, "中后卫", "CB", 33, "179cm", "马梅洛迪日落", ["位置感", "冷静出球"], 39, 77),
    player("rsa-4", "莫托比·姆瓦拉", "Mothobi Mvala", 14, "中后卫", "CB", 32, "176cm", "马梅洛迪日落", ["贴身盯防", "身体对抗"], 61, 77),
    player("rsa-5", "库利索·穆道", "Khuliso Mudau", 5, "右后卫", "RB", 31, "181cm", "马梅洛迪日落", ["速度突出", "边路压迫"], 84, 72),
    player("rsa-6", "特博霍·莫科埃纳", "Teboho Mokoena", 4, "后腰", "DM", 29, "176cm", "马梅洛迪日落", ["远射威胁", "攻防转换"], 38, 57),
    player("rsa-7", "斯菲菲洛·西托勒", "Sphephelo Sithole", 13, "中场", "CM", 27, "186cm", "通德拉", ["覆盖面积", "拦截对抗"], 62, 57),
    player("rsa-8", "奥斯温·阿波利斯", "Oswin Appollis", 11, "左边锋", "LW", 24, "171cm", "奥兰多海盗", ["快速突破", "反击跑位"], 18, 34),
    player("rsa-9", "特姆巴·兹瓦内", "Themba Zwane", 10, "前腰", "AM", 36, "170cm", "马梅洛迪日落", ["小空间处理", "创造机会"], 50, 38),
    player("rsa-10", "珀西·陶", "Percy Tau", 9, "右边锋", "RW", 32, "175cm", "卡塔尔SC", ["左脚内切", "灵活串联"], 82, 34, "https://commons.wikimedia.org/wiki/Special:FilePath/Percy%20Tau%202018.jpg"),
    player("rsa-11", "埃维登斯·马科帕", "Evidence Makgopa", 17, "中锋", "ST", 26, "188cm", "奥兰多海盗", ["高点支撑", "禁区抢点"], 50, 15),
  ],
};

export const canadaLineup: Lineup = {
  team: teams.CAN,
  formation: "4-2-3-1",
  coach: "杰西·马希",
  kit: { shirt: "#d71920", shorts: "#171b21", number: "#ffffff" },
  players: [
    player("can-1", "戴恩·圣克莱尔", "Dayne St. Clair", 1, "门将", "GK", 29, "191cm", "明尼苏达联", ["门线反应", "高球控制"], 50, 91),
    player("can-2", "阿方索·戴维斯", "Alphonso Davies", 19, "左后卫", "LB", 25, "183cm", "拜仁慕尼黑", ["极速推进", "纵向突破"], 16, 72),
    player("can-3", "德里克·科尼利厄斯", "Derek Cornelius", 13, "中后卫", "CB", 28, "187cm", "马赛", ["左脚出球", "正面防守"], 39, 77),
    player("can-4", "莫伊塞·邦比托", "Moïse Bombito", 15, "中后卫", "CB", 26, "190cm", "尼斯", ["快速回追", "空中对抗"], 61, 77),
    player("can-5", "阿利斯泰尔·约翰斯顿", "Alistair Johnston", 2, "右后卫", "RB", 27, "180cm", "凯尔特人", ["强势压迫", "边路支援"], 84, 72),
    player("can-6", "斯蒂芬·尤斯塔基奥", "Stephen Eustáquio", 7, "后腰", "DM", 29, "177cm", "波尔图", ["节奏控制", "纵向传球"], 39, 57),
    player("can-7", "伊斯梅尔·科内", "Ismaël Koné", 8, "中场", "CM", 24, "188cm", "雷恩", ["持球推进", "覆盖面积"], 61, 57),
    player("can-8", "雅各布·沙菲尔伯格", "Jacob Shaffelburg", 14, "左边锋", "LW", 26, "180cm", "纳什维尔", ["冲刺反击", "直接传中"], 18, 34),
    player("can-9", "乔纳森·戴维", "Jonathan David", 10, "前腰", "SS", 26, "180cm", "尤文图斯", ["灵活跑位", "快速终结"], 50, 38),
    player("can-10", "塔琼·布坎南", "Tajon Buchanan", 11, "右边锋", "RW", 27, "183cm", "比利亚雷亚尔", ["一对一突破", "边路爆发"], 82, 34),
    player("can-11", "赛尔·拉林", "Cyle Larin", 9, "中锋", "ST", 31, "188cm", "费耶诺德", ["禁区抢点", "背身支点"], 50, 15),
  ],
};

export const bosniaLineup: Lineup = {
  team: teams.BIH,
  formation: "4-2-3-1",
  coach: "谢尔盖·巴尔巴雷兹",
  kit: { shirt: "#1e4f9a", shorts: "#16366f", number: "#f0cf37" },
  players: [
    player("bih-1", "尼古拉·瓦西里", "Nikola Vasilj", 1, "门将", "GK", 30, "193cm", "圣保利", ["高球控制", "门线覆盖"], 50, 91),
    player("bih-2", "塞亚德·科拉希纳茨", "Sead Kolašinac", 5, "左后卫", "LB", 32, "183cm", "亚特兰大", ["强硬对抗", "向前压迫"], 16, 72),
    player("bih-3", "阿德里安·莱昂·巴里希奇", "Adrian Leon Barišić", 4, "中后卫", "CB", 24, "192cm", "巴塞尔", ["制空能力", "长传出球"], 39, 77),
    player("bih-4", "尼古拉·卡蒂奇", "Nikola Katić", 18, "中后卫", "CB", 29, "194cm", "普利茅斯", ["禁区防守", "头球解围"], 61, 77),
    player("bih-5", "阿马尔·德迪奇", "Amar Dedić", 7, "右后卫", "RB", 23, "180cm", "萨尔茨堡红牛", ["边路推进", "传中支援"], 84, 72),
    player("bih-6", "本亚明·塔希罗维奇", "Benjamin Tahirović", 6, "后腰", "DM", 23, "191cm", "布隆德比", ["后场组织", "拦截覆盖"], 39, 57),
    player("bih-7", "阿明·吉戈维奇", "Armin Gigović", 8, "中场", "CM", 24, "187cm", "荷尔斯泰因基尔", ["攻防转换", "前插跑动"], 61, 57),
    player("bih-8", "埃斯米尔·巴伊拉克塔雷维奇", "Esmir Bajraktarević", 20, "左边锋", "LW", 21, "175cm", "埃因霍温", ["灵巧盘带", "内切创造"], 18, 34),
    player("bih-9", "哈里斯·哈伊拉迪诺维奇", "Haris Hajradinović", 10, "前腰", "AM", 32, "178cm", "卡斯帕萨", ["关键传球", "定位球"], 50, 38),
    player("bih-10", "埃尔梅丁·德米罗维奇", "Ermedin Demirović", 11, "右边锋", "SS", 28, "185cm", "斯图加特", ["禁区冲击", "无球跑动"], 82, 34),
    player("bih-11", "埃丁·哲科", "Edin Džeko", 9, "中锋", "ST", 40, "193cm", "佛罗伦萨", ["高点支撑", "门前经验"], 50, 15),
  ],
};

export const usaLineup: Lineup = {
  team: teams.USA,
  formation: "4-2-3-1",
  coach: "毛里西奥·波切蒂诺",
  kit: { shirt: "#f4f5f6", shorts: "#173a72", number: "#173a72" },
  players: [
    player("usa-1", "马特·特纳", "Matt Turner", 1, "门将", "GK", 32, "191cm", "里昂", ["近距离反应", "门线技术"], 50, 91),
    player("usa-2", "安东尼·罗宾逊", "Antonee Robinson", 5, "左后卫", "LB", 28, "183cm", "富勒姆", ["高速套边", "连续传中"], 16, 72),
    player("usa-3", "蒂姆·里姆", "Tim Ream", 13, "中后卫", "CB", 38, "186cm", "夏洛特FC", ["经验丰富", "左脚组织"], 39, 77),
    player("usa-4", "克里斯·理查兹", "Chris Richards", 3, "中后卫", "CB", 26, "188cm", "水晶宫", ["空中对抗", "快速回追"], 61, 77),
    player("usa-5", "塞尔吉诺·德斯特", "Sergiño Dest", 2, "右后卫", "RB", 25, "171cm", "埃因霍温", ["持球推进", "内线配合"], 84, 72),
    player("usa-6", "泰勒·亚当斯", "Tyler Adams", 4, "后腰", "DM", 27, "175cm", "伯恩茅斯", ["抢断覆盖", "快速出球"], 39, 57),
    player("usa-7", "韦斯顿·麦肯尼", "Weston McKennie", 8, "中场", "CM", 27, "185cm", "尤文图斯", ["后插上", "空中冲击"], 61, 57),
    player("usa-8", "克里斯蒂安·普利希奇", "Christian Pulisic", 10, "左边锋", "LW", 27, "178cm", "AC米兰", ["内切突破", "关键终结"], 18, 34),
    player("usa-9", "马利克·蒂尔曼", "Malik Tillman", 11, "前腰", "AM", 24, "187cm", "勒沃库森", ["持球创造", "禁区前插"], 50, 38),
    player("usa-10", "蒂莫西·维阿", "Timothy Weah", 21, "右边锋", "RW", 26, "183cm", "马赛", ["纵向速度", "边路冲击"], 82, 34),
    player("usa-11", "福拉林·巴洛贡", "Folarin Balogun", 20, "中锋", "ST", 24, "178cm", "摩纳哥", ["反越位", "快速终结"], 50, 15),
  ],
};

export const paraguayLineup: Lineup = {
  team: teams.PAR,
  formation: "4-2-3-1",
  coach: "古斯塔沃·阿尔法罗",
  kit: { shirt: "#d52b3f", shorts: "#233d78", number: "#ffffff" },
  players: [
    player("par-1", "罗伯托·费尔南德斯", "Roberto Fernández", 12, "门将", "GK", 38, "191cm", "博塔弗戈", ["门线反应", "比赛经验"], 50, 91),
    player("par-2", "朱尼奥尔·阿隆索", "Júnior Alonso", 6, "左后卫", "LB", 33, "184cm", "米内罗竞技", ["左脚出球", "防守韧性"], 16, 72),
    player("par-3", "奥马尔·阿尔德雷特", "Omar Alderete", 3, "中后卫", "CB", 29, "188cm", "赫塔费", ["正面防守", "长传转移"], 39, 77),
    player("par-4", "古斯塔沃·戈麦斯", "Gustavo Gómez", 15, "中后卫", "CB", 33, "185cm", "帕尔梅拉斯", ["防线指挥", "制空能力"], 61, 77),
    player("par-5", "胡安·卡塞雷斯", "Juan Cáceres", 4, "右后卫", "RB", 26, "173cm", "莫斯科迪纳摩", ["边路压迫", "快速回追"], 84, 72),
    player("par-6", "安德烈斯·库巴斯", "Andrés Cubas", 14, "后腰", "DM", 30, "166cm", "温哥华白浪", ["拦截扫荡", "快速转移"], 39, 57),
    player("par-7", "迭戈·戈麦斯", "Diego Gómez", 8, "中场", "CM", 23, "183cm", "布莱顿", ["覆盖面积", "纵向推进"], 61, 57),
    player("par-8", "拉蒙·索萨", "Ramón Sosa", 7, "左边锋", "LW", 26, "179cm", "帕尔梅拉斯", ["爆发突破", "反击推进"], 18, 34),
    player("par-9", "胡里奥·恩西索", "Julio Enciso", 19, "前腰", "AM", 22, "173cm", "斯特拉斯堡", ["远射威胁", "灵巧创造"], 50, 38),
    player("par-10", "米格尔·阿尔米隆", "Miguel Almirón", 10, "右边锋", "RW", 32, "174cm", "亚特兰大联", ["高速内切", "连续压迫"], 82, 34),
    player("par-11", "安东尼奥·萨纳布里亚", "Antonio Sanabria", 9, "中锋", "ST", 30, "180cm", "都灵", ["禁区终结", "背身策应"], 50, 15),
  ],
};

export interface MatchLineupBundle {
  home: Lineup;
  away: Lineup;
  label?: "演示阵容" | "预测阵容" | "待公布" | "官方首发";
  subtitle?: string;
  note?: string;
}

const tomorrowPredictionBundle = (
  home: Lineup,
  away: Lineup,
  note = "两队官方首发尚未发布，当前页面根据已公布大名单与常用阵型整理为赛前预测阵容，仅供观赛参考。",
): MatchLineupBundle => ({
  home,
  away,
  label: "预测阵容",
  subtitle: "官方首发待公布",
  note,
});

export const lineupsByMatchId: Record<string, MatchLineupBundle> = {
  "group-f-1": { home: koreaLineup, away: czechLineup },
  "match-5403396": { home: mexicoLineup, away: southAfricaLineup },
  "match-5403398": { home: canadaLineup, away: bosniaLineup },
  "match-5403399": { home: usaLineup, away: paraguayLineup },
  "match-5403400": tomorrowPredictionBundle(qatarLineup, swissLineup),
  "match-5403401": tomorrowPredictionBundle(brazilLineup, moroccoLineup),
  "match-5403402": tomorrowPredictionBundle(haitiLineup, scotlandLineup),
  "match-5403403": tomorrowPredictionBundle(australiaLineup, turkeyLineup),
  "match-5403416": tomorrowPredictionBundle(portugalLineup, drCongoLineup),
  "match-5403417": tomorrowPredictionBundle(englandLineup, croatiaLineup),
  "match-5403418": tomorrowPredictionBundle(
    ghanaLineup,
    panamaLineup,
    "两队官方首发尚未发布，当前页面按已公布大名单与常用站位整理为赛前预测阵容；Thomas Partey 已确认缺席多伦多首战。",
  ),
  "match-5403419": tomorrowPredictionBundle(uzbekistanLineup, colombiaLineup),
  "match-5403473": {
    home: franceSwedenLineup,
    away: swedenFranceLineup,
    label: "官方首发",
    subtitle: "阵型已确认",
    note: "法国 vs 瑞典首发据 The Guardian 开赛前 lineup post 与赛后报道交叉整理；当前 3D 阵型对应北京时间 2026年7月1日这场 32 强赛的实际开场 XI。",
  },
  "match-5403474": {
    home: mexicoEcuadorLineup,
    away: ecuadorLineup,
    label: "官方首发",
    subtitle: "阵型已确认",
    note: "首发名单与阵型据 FIFA《Tactical Line-up – Round of 32 – Mexico v. Ecuador》整理；当前 3D 阵型对应北京时间 2026年7月1日官方公布的开场首发。",
  },
  "match-5403475": tomorrowPredictionBundle(
    englandLineup,
    drCongoLineup,
    "两队官方首发尚未公布，当前页面按已公布名单与近期常用站位整理为赛前预测阵容，供北京时间 7 月 2 日观赛参考。",
  ),
  "match-5403477": tomorrowPredictionBundle(
    usaLineup,
    bosniaLineup,
    "美国与波黑的官方首发待公布，当前页面先以常用 4-2-3-1 站位展示赛前预测阵容，避免误写为确认首发。",
  ),
};
