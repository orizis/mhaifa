const IMG = "/img/";

const rawPlayers = [
  // ═══════════════════════════════════════════════
  // 1990/91
  // ═══════════════════════════════════════════════
  {
    nameHe: "ויקטור צ'אנוב",
    position: "GK",
    seasons: ["1990/91"],
    img: "pics_Archive_126204_20_bf71f04cf9.jpg",
  },
  {
    nameHe: "גיורא אנטמן",
    position: "GK",
    seasons: ["1990/91"],
    img: "pics_Archive_126259_20_241cedd3ae.jpg",
  },
  {
    nameHe: "מרקו בלבול",
    position: "DEF",
    seasons: ["1990/91", "1993/94"],
    img: "pics_Archive_126145_20_053c42421e.jpg",
  },
  {
    nameHe: "איתן אהרוני",
    position: "DEF",
    seasons: ["1990/91", "1993/94"],
    img: "pics_Archive_126178_20_58af476b6b.jpg",
  },
  {
    nameHe: "אלון חרזי",
    position: "DEF",
    seasons: ["1990/91", "1993/94", "2002/03", "2009/10"],
    img: "pics_Archive_475966_20_15a8fd2576.gif",
  },
  {
    nameHe: "ליאור רוזנטל",
    position: "DEF",
    seasons: ["1990/91"],
    img: "pics_Archive_126205_20_d0e6ef41e3.jpg",
  },
  {
    nameHe: "רפי אוסמו (הגדול)",
    position: "DEF",
    seasons: ["1990/91"],
    img: "pics_Archive_126223_20_8c96fdfbad.jpg",
  },
  {
    nameHe: "יוסי צרפתי",
    position: "DEF",
    seasons: ["1990/91"],
    img: "pics_Archive_630485_20_1962936038.jpg",
  },
  {
    nameHe: "שגיא גונן",
    position: "DEF",
    seasons: ["1990/91"],
    img: "pics_Archive_126349_20_db99170c1e.jpg",
  },
  {
    nameHe: "ולדימיר בסונוב",
    position: "DEF",
    seasons: ["1990/91"],
    img: "pics_Archive_126353_20_33a9da22d3.jpg",
  },
  {
    nameHe: "אייל ברקוביץ",
    position: "MID",
    seasons: ["1990/91", "1993/94"],
    img: "pics_Archive_126182_20_78e39b5134.jpg",
  },
  {
    nameHe: "ראובן עטר",
    position: "MID",
    seasons: ["1990/91", "1993/94"],
    img: "pics_Archive_126143_20_756cdff149.jpg",
  },
  {
    nameHe: "אברהם אבוקרט",
    position: "MID",
    seasons: ["1990/91", "1993/94"],
    img: "pics_Archive_1398538_20_6fbf051988.jpg",
  },
  {
    nameHe: "טל בנין",
    position: "MID",
    seasons: ["1990/91"],
    img: "pics_Archive_126206_20_4824357d5c.jpg",
  },
  {
    nameHe: "ירון גבעול",
    position: "MID",
    seasons: ["1990/91"],
    img: "pics_Archive_126209_20_fdd2393c11.jpg",
  },
  {
    nameHe: "יניב כהן",
    position: "MID",
    seasons: ["1990/91"],
    img: "pics_Archive_126264_20_365978433a.jpg",
  },
  {
    nameHe: "דני מלכין",
    position: "MID",
    seasons: ["1990/91"],
    img: "pics_Archive_126275_20_28bd12a808.jpg",
  },
  {
    nameHe: "איתי מרדכי",
    position: "ATT",
    seasons: ["1990/91"],
    img: "pics_Archive_126207_20_922009b42e.jpg",
  },
  {
    nameHe: "משה אייזנברג",
    position: "ATT",
    seasons: ["1990/91"],
    img: "pics_Archive_126208_20_0b8c847186.jpg",
  },
  {
    nameHe: "עופר מזרחי",
    position: "ATT",
    seasons: ["1990/91"],
    img: "pics_Archive_126211_20_e342f4f9e7.jpg",
  },
  {
    nameHe: "שמואל טרגן",
    position: "ATT",
    seasons: ["1990/91"],
    img: "pics_Archive_126328_20_3825e21052.jpg",
  },

  // ═══════════════════════════════════════════════
  // 1993/94
  // ═══════════════════════════════════════════════
  {
    nameHe: "רפי כהן (השוער)",
    position: "GK",
    seasons: ["1993/94"],
    img: "pics_Archive_126167_20_d37d0e072e.jpg",
  },
  {
    nameHe: "גולן דרעי",
    position: "DEF",
    seasons: ["1993/94"],
    img: "pics_Archive_126133_20_cd628a9afa.jpg",
  },
  {
    nameHe: "אריק בנדו",
    position: "DEF",
    seasons: ["1993/94", "2002/03"],
    img: "pics_Archive_797612_20_386fcf118b.jpg",
  },
  {
    nameHe: "רומן פץ",
    position: "DEF",
    seasons: ["1993/94"],
    img: "pics_Archive_126179_20_b64daf4400.jpg",
  },
  {
    nameHe: "משה גלאם",
    position: "DEF",
    seasons: ["1993/94"],
    img: "pics_Archive_126180_20_b59864820b.jpg",
  },
  {
    nameHe: "צבר דניאל",
    position: "DEF",
    seasons: ["1993/94"],
    img: "pics_Archive_126187_20_bcf3b59ce8.jpg",
  },
  {
    nameHe: "אלון חזן",
    position: "MID",
    seasons: ["1993/94"],
    img: "pics_Archive_126153_20_f442e4c185.jpg",
  },
  {
    nameHe: "סרגיי קנדאורוב",
    position: "MID",
    seasons: ["1993/94"],
    img: "pics_Archive_126181_20_01a2d6e970.jpg",
  },
  {
    nameHe: "רוני לוי",
    position: "MID",
    seasons: ["1993/94"],
    img: "pics_Archive_374889_20_e61be8662f.jpg",
  },
  {
    nameHe: "שי הולצמן",
    position: "ATT",
    seasons: ["1993/94"],
    img: "pics_Archive_126173_20_823a579ee0.jpg",
  },
  {
    nameHe: "איוון גצקו",
    position: "ATT",
    seasons: ["1993/94"],
    img: "pics_Archive_126184_20_36bf878216.jpg",
  },
  {
    nameHe: "אלון מזרחי",
    position: "ATT",
    seasons: ["1993/94"],
    img: "pics_Archive_126185_20_0aa252d32d.jpg",
  },

  // ═══════════════════════════════════════════════
  // 2002/03
  // ═══════════════════════════════════════════════
  {
    nameHe: "ניר דוידוביץ",
    position: "GK",
    seasons: ["2002/03", "2009/10"],
    img: "pics_Archive_1112233_20_6f60922ab6.jpg",
  },
  {
    nameHe: "דודו אוואט",
    position: "GK",
    seasons: ["2002/03"],
    img: "pics_Archive_126379_20_779722a450.jpg",
  },
  {
    nameHe: "תום אל-מדון",
    position: "GK",
    seasons: ["2002/03"],
    img: "pics_Archive_797618_20_99c2905362.jpg",
  },
  {
    nameHe: "אריק אג'ייפור",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_126130_20_8acb948950.jpg",
  },
  {
    nameHe: "אבישי ז'אנו",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_126135_20_06c52669f4.jpg",
  },
  {
    nameHe: "אדורם קייסי",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_374936_20_0b036f38f0.jpg",
  },
  {
    nameHe: "דקל קינן",
    position: "DEF",
    seasons: ["2002/03", "2009/10"],
    img: "pics_2015_2016_Roster_Big_1ab6647f41.png",
  },
  {
    nameHe: "יוסי נגר",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_126382_20_8b7615f1cf.jpg",
  },
  {
    nameHe: "ליעד אמיר",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_126383_20_4548b7dc79.jpg",
  },
  {
    nameHe: "כמאל גברין",
    position: "DEF",
    seasons: ["2002/03"],
    img: "pics_Archive_126227_20_83c8bbc47e.jpg",
  },
  {
    nameHe: "ריימונדס ז'וטאוטאס",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_126119_20_76b8ed331f.jpg",
  },
  {
    nameHe: "יניב קטן",
    position: "ATT",
    seasons: ["2002/03", "2009/10"],
    img: "pics_Archive_1552740_20_f52e6ede23.jpg",
  },
  {
    nameHe: "מיכאל זנדברג",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_150168_20_b794243889.JPG",
  },
  {
    nameHe: "אסי אברהמי",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_126147_20_ed28eace85.jpg",
  },
  {
    nameHe: "וואליד באדיר",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_150152_20_399770139a.JPG",
  },
  {
    nameHe: "אייל אלמושנינו",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_126279_20_7c38e7e736.jpg",
  },
  {
    nameHe: "גיירמו ישראלביץ",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_126374_20_9668936b42.jpg",
  },
  {
    nameHe: "ננאד פרלייה",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_126375_20_bb0636d0e6.jpg",
  },
  {
    nameHe: "ג'ובני רוסו",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_374942_20_56e0049de5.jpg",
  },
  {
    nameHe: "עידן טל",
    position: "MID",
    seasons: ["2002/03"],
    img: "pics_Archive_150166_20_732ebc6c89.JPG",
  },
  {
    nameHe: "ניר סביליה",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_126144_20_dc92927ce4.jpg",
  },
  {
    nameHe: "אליניב ברדה",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_150154_20_be64cfccb2.JPG",
  },
  {
    nameHe: "אובידון אושוליגון",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_126351_20_432194801a.jpg",
  },
  {
    nameHe: "יעקובו איגביני",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_126380_20_f6ddc3e6e9.jpg",
  },
  {
    nameHe: "רפי כהן (החלוץ)",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_126125_20_3a830c2b28.jpg",
  },
  {
    nameHe: "ערן לוי",
    position: "ATT",
    seasons: ["2002/03"],
    img: "pics_Archive_126391_20_4095b8bf1d.jpg",
  },

  // ═══════════════════════════════════════════════
  // 2009/10
  // ═══════════════════════════════════════════════
  {
    nameHe: "אמיר אדרי",
    position: "GK",
    seasons: ["2009/10"],
    img: "pics_Archive_1763987_20_2eac308cce.jpg",
  },
  {
    nameHe: "שי מימון",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_Archive_1112295_20_e5913e92c9.jpg",
  },
  {
    nameHe: "אייל משומר",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_2015_2016_Roster_Big_5eac082ede.png",
  },
  {
    nameHe: "פיטר מסיללה",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_Archive_797596_20_46b96565f4.jpg",
  },
  {
    nameHe: "ג'ורג' טאקסיירה",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_Archive_567681_20_68ef2ee046.jpg",
  },
  {
    nameHe: "טאלב טואטחה",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_Archive_1939979_20_a222e0cdee.jpg",
  },
  {
    nameHe: "עלי עותמן",
    position: "DEF",
    seasons: ["2009/10"],
    img: "pics_Archive_1112265_20_5f48415fc6.jpg",
  },
  {
    nameHe: "גוסטבו בוקולי",
    position: "MID",
    seasons: ["2009/10"],
    img: "pics_Archive_1764184_20_4e26968ce4.jpg",
  },
  {
    nameHe: "ליאור רפאלוב",
    position: "MID",
    seasons: ["2009/10"],
    img: "pics_2023_2024_fee40a82cb.png",
  },
  {
    nameHe: "בירם כיאל",
    position: "MID",
    seasons: ["2009/10"],
    img: "pics_Archive_475971_20_50e4cc9708.gif",
  },
  {
    nameHe: "ג'ון גיירו קולמה",
    position: "MID",
    seasons: ["2009/10"],
    img: null,
  },
  {
    nameHe: "אייל גולסה",
    position: "MID",
    seasons: ["2009/10"],
    img: "pics_Archive_1552733_20_629d39f419.jpg",
  },
  { nameHe: "ישראל זגורי", position: "MID", seasons: ["2009/10"], img: null },
  {
    nameHe: "טיאגו דוטרה דה-סילבה",
    position: "MID",
    seasons: ["2009/10"],
    img: null,
  },
  {
    nameHe: "מוחמד כליבאת",
    position: "MID",
    seasons: ["2009/10"],
    img: "pics_Archive_1939985_20_3bf7384f9f.jpg",
  },
  {
    nameHe: "שלומי ארביטמן",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_Archive_474803_20_1a5dea0e95.gif",
  },
  {
    nameHe: "ירו בלו",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_Archive_567680_20_9cb67f4625.jpg",
  },
  {
    nameHe: "מוחמד גדיר",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_2017_18_21d0334a2c.jpg",
  },
  {
    nameHe: "ולדימיר דבאלישווילי",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_Archive_1112285_20_71ea62508d.jpg",
  },
  {
    nameHe: "סאדאת בוקארי",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_Archive_714996_20_83cbe4651b.jpg",
  },
  {
    nameHe: "סינטאיהו סלליך",
    position: "ATT",
    seasons: ["2009/10"],
    img: "pics_Archive_1552731_20_8156c6eb04.jpg",
  },
  { nameHe: "שלומי אזולאי", position: "ATT", seasons: ["2009/10"], img: null },

  // ═══════════════════════════════════════════════
  // 2022/23
  // ═══════════════════════════════════════════════
  {
    nameHe: "ג'וש כהן",
    position: "GK",
    seasons: ["2022/23"],
    img: "pics_2022_2023_2201abbb08.png",
  },
  {
    nameHe: "איתמר ישראלי",
    position: "GK",
    seasons: ["2022/23"],
    img: "pics_2022_2023_53afeb2d0b.png",
  },
  {
    nameHe: "רועי פוקס",
    position: "GK",
    seasons: ["2022/23"],
    img: "pics_2022_2023_7c780e457d.png",
  },
  {
    nameHe: "רועי משפתי",
    position: "GK",
    seasons: ["2022/23"],
    img: "pics_2022_2023_72fff414aa.png",
  },
  {
    nameHe: "שריף כיוף",
    position: "GK",
    seasons: ["2022/23"],
    img: "pics_2020_2021_30c195cb38.png",
  },
  {
    nameHe: "שון גולדברג",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_6a3f2bbc84.jpg",
  },
  {
    nameHe: "בוגדאן פלאניץ'",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_b057f21993.png",
  },
  {
    nameHe: "סאן מנחם",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_9d5b953093.png",
  },
  {
    nameHe: "עופרי ארד",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_29c37faf88.png",
  },
  {
    nameHe: "אורי דהן",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_34cfd63632.png",
  },
  {
    nameHe: "רז מאיר",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_eb34ffc806.png",
  },
  {
    nameHe: "רמי גרשון",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_9f3297a1b7.png",
  },
  {
    nameHe: "דניאל סונדגרן",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_8aa45670a4.png",
  },
  {
    nameHe: "פייר קורנו",
    position: "DEF",
    seasons: ["2022/23"],
    img: "1_5c7923b7eb.png",
  },
  {
    nameHe: "דילן בטובינסיקה",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_2_ed3d8d55bc.png",
  },
  {
    nameHe: "עבדולאי סק",
    position: "DEF",
    seasons: ["2022/23"],
    img: "pics_2022_2023_seck_2_6f930c70b2.png",
  },
  {
    nameHe: "עלי מוחמד",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_b5cbffe0e1.png",
  },
  {
    nameHe: "נטע לביא",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_db60dc66e5.png",
  },
  {
    nameHe: "עומר אצילי",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_1f64c0db56.png",
  },
  {
    nameHe: "דולב חזיזה",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_be31c6e01f.png",
  },
  {
    nameHe: "צ'ירון שרי",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_0260d7ce8c.png",
  },
  {
    nameHe: "מוחמד אבו פאני",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_d456f7d059.png",
  },
  {
    nameHe: "מחמוד ג'אבר",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_7fff26918f.png",
  },
  {
    nameHe: "מאור לוי",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_41257c356e.png",
  },
  {
    nameHe: "בסאם זערורה",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_2a86bfb24e.png",
  },
  {
    nameHe: "אביאל זרגרי",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_77d617baca.png",
  },
  {
    nameHe: "גוני נאור",
    position: "MID",
    seasons: ["2022/23"],
    img: "pics_2022_2023_733515dcf0.png",
  },
  {
    nameHe: "בן שהר",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_01515e6018.png",
  },
  {
    nameHe: "מאוויס צ'יבוטה",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_fcd6434d30.png",
  },
  {
    nameHe: "דין דוד",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_f6a9bfefa0.png",
  },
  {
    nameHe: "ניקיטה רוקאביצה",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_6ccc882539.png",
  },
  {
    nameHe: "פרנזי פיירו",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_Pierrot_2_3f81460c2a.png",
  },
  {
    nameHe: "סוף פודגוראנו",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2019_2020_80b9d46dee.png",
  },
  {
    nameHe: "דיא סבע",
    position: "ATT",
    seasons: ["2022/23"],
    img: "pics_2022_2023_123_a193cb7735.png",
  },
];

function dedup(list) {
  const map = new Map();
  for (const p of list) {
    if (map.has(p.nameHe)) {
      const existing = map.get(p.nameHe);
      existing.seasons = [...new Set([...existing.seasons, ...p.seasons])];
      if (!existing.imageUrl && p.img) existing.imageUrl = IMG + p.img;
    } else {
      map.set(p.nameHe, {
        ...p,
        id: p.nameHe.replace(/[\s'"]/g, "-").replace(/-+/g, "-"),
        imageUrl: p.img ? IMG + p.img : null,
      });
    }
  }
  return [...map.values()];
}

export const PLAYERS = dedup(rawPlayers);

export const MANAGERS = [
  {
    id: "shlomo-sharf",
    nameHe: "שלמה שרף",
    seasons: ["1990/91"],
    imageUrl: "./shlomo.jpg",
    position: "MGR",
  },
  {
    id: "giora-spiegel",
    nameHe: "גיורא שפיגל",
    seasons: ["1993/94"],
    imageUrl: "./giora_spiegel.jpg",
    position: "MGR",
  },
  {
    id: "yitzhak-shum",
    nameHe: "יצחק שום",
    seasons: ["2002/03"],
    imageUrl: "./shumi.jpg",
    position: "MGR",
  },
  {
    id: "werner-lorant",
    nameHe: "אלישע לוי",
    seasons: ["2009/10"],
    imageUrl: "./elisha.jpg",
    position: "MGR",
  },
  {
    id: "barak-bakhar",
    nameHe: "ברק בכר",
    seasons: ["2022/23"],
    imageUrl: "./barak.webp",
    position: "MGR",
  },
];

export const SEASONS = ["1990/91", "1993/94", "2002/03", "2009/10", "2022/23"];

export const POSITION_LABELS = {
  GK: "שוער",
  DEF: "מגן",
  MID: "קישור",
  ATT: "התקפה",
  MGR: "מאמן",
};

export const SEASON_LABELS = {
  "1990/91": "זוכי הדאבל",
  "1993/94": "עונת ללא הפסד",
  "2002/03": "ליגת האלופות א׳",
  "2009/10": "ליגת האלופות ב׳",
  "2022/23": "ליגת האלופות ג׳",
};
