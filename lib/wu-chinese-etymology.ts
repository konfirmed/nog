// Wu Chinese Etymology Parser
// Breaks down Wu Chinese divine names into their component parts with meanings
// Wu Chinese (吴语) is spoken in Shanghai, Zhejiang, and southern Jiangsu regions

export interface EtymologyPart {
  part: string;
  meaning: string;
  type: "prefix" | "root" | "suffix" | "connector";
}

export interface EtymologyBreakdown {
  original: string;
  parts: EtymologyPart[];
  literalMeaning: string;
}

// Common Wu Chinese name components and their meanings
const WU_CHINESE_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "上帝": { meaning: "Supreme Sovereign/God Above", type: "root" },
  "神": { meaning: "God/Spirit/Divine", type: "root" },
  "主": { meaning: "Lord/Master", type: "root" },
  "天": { meaning: "Heaven", type: "root" },
  "爷": { meaning: "Father/Lord (respectful)", type: "root" },
  "王": { meaning: "King", type: "root" },

  // Attribute roots
  "圣": { meaning: "Holy/Sacred", type: "prefix" },
  "全": { meaning: "All/Complete", type: "prefix" },
  "大": { meaning: "Great", type: "prefix" },
  "永": { meaning: "Eternal", type: "prefix" },
  "慈": { meaning: "Merciful/Kind", type: "root" },
  "爱": { meaning: "Love", type: "root" },
  "义": { meaning: "Righteous", type: "root" },
  "智": { meaning: "Wisdom", type: "root" },
  "光": { meaning: "Light", type: "root" },
  "真": { meaning: "True/Truth", type: "root" },

  // Action/Agent markers
  "者": { meaning: "One who/The one", type: "suffix" },
  "之": { meaning: "of/'s", type: "connector" },
  "的": { meaning: "of/'s", type: "connector" },
};

// Known Wu Chinese compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "上帝": {
    original: "上帝",
    parts: [
      { part: "上", meaning: "Above/Supreme", type: "prefix" },
      { part: "帝", meaning: "Sovereign/Emperor", type: "root" },
    ],
    literalMeaning: "The Supreme Sovereign Above/God",
  },
  "天老爷": {
    original: "天老爷",
    parts: [
      { part: "天", meaning: "Heaven/Heavenly", type: "prefix" },
      { part: "老", meaning: "Venerable/Old", type: "prefix" },
      { part: "爷", meaning: "Lord/Master", type: "root" },
    ],
    literalMeaning: "Heavenly Venerable Lord (colloquial Wu term for God)",
  },
  "至高者": {
    original: "至高者",
    parts: [
      { part: "至", meaning: "Most/Ultimate", type: "prefix" },
      { part: "高", meaning: "High", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Most High One",
  },
  "独一真神": {
    original: "独一真神",
    parts: [
      { part: "独一", meaning: "Only/Unique", type: "prefix" },
      { part: "真", meaning: "True", type: "prefix" },
      { part: "神", meaning: "God/Spirit", type: "root" },
    ],
    literalMeaning: "The One True God",
  },

  // === CREATOR NAMES ===
  "造物主": {
    original: "造物主",
    parts: [
      { part: "造", meaning: "Create/Make", type: "root" },
      { part: "物", meaning: "Things/Creation", type: "root" },
      { part: "主", meaning: "Lord/Master", type: "suffix" },
    ],
    literalMeaning: "The Lord Who Creates All Things/The Creator",
  },
  "创造者": {
    original: "创造者",
    parts: [
      { part: "创造", meaning: "Create/Creation", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Creator",
  },
  "天地之主": {
    original: "天地之主",
    parts: [
      { part: "天", meaning: "Heaven", type: "root" },
      { part: "地", meaning: "Earth", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "主", meaning: "Lord/Master", type: "root" },
    ],
    literalMeaning: "Lord of Heaven and Earth",
  },

  // === FATHER NAMES ===
  "天父": {
    original: "天父",
    parts: [
      { part: "天", meaning: "Heavenly", type: "prefix" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Heavenly Father",
  },
  "阿爸父": {
    original: "阿爸父",
    parts: [
      { part: "阿爸", meaning: "Abba (intimate Father)", type: "root" },
      { part: "父", meaning: "Father", type: "suffix" },
    ],
    literalMeaning: "Abba Father (intimate/dear Father)",
  },
  "慈父": {
    original: "慈父",
    parts: [
      { part: "慈", meaning: "Merciful/Loving", type: "prefix" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "The Merciful/Loving Father",
  },

  // === KING NAMES ===
  "万王之王": {
    original: "万王之王",
    parts: [
      { part: "万", meaning: "Ten thousand/All", type: "prefix" },
      { part: "王", meaning: "Kings", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "王", meaning: "King", type: "root" },
    ],
    literalMeaning: "King of All Kings/King of Kings",
  },
  "万主之主": {
    original: "万主之主",
    parts: [
      { part: "万", meaning: "Ten thousand/All", type: "prefix" },
      { part: "主", meaning: "Lords", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "主", meaning: "Lord", type: "root" },
    ],
    literalMeaning: "Lord of All Lords/Lord of Lords",
  },
  "永生之王": {
    original: "永生之王",
    parts: [
      { part: "永", meaning: "Eternal", type: "prefix" },
      { part: "生", meaning: "Living", type: "root" },
      { part: "之", meaning: "'s", type: "connector" },
      { part: "王", meaning: "King", type: "root" },
    ],
    literalMeaning: "The Eternal Living King",
  },

  // === ALMIGHTY/POWER NAMES ===
  "全能者": {
    original: "全能者",
    parts: [
      { part: "全", meaning: "All/Complete", type: "prefix" },
      { part: "能", meaning: "Power/Ability", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The All-Powerful One/The Almighty",
  },
  "全能神": {
    original: "全能神",
    parts: [
      { part: "全", meaning: "All", type: "prefix" },
      { part: "能", meaning: "Powerful", type: "root" },
      { part: "神", meaning: "God", type: "suffix" },
    ],
    literalMeaning: "Almighty God",
  },
  "大能者": {
    original: "大能者",
    parts: [
      { part: "大", meaning: "Great", type: "prefix" },
      { part: "能", meaning: "Power/Might", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Mighty One",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "好牧人": {
    original: "好牧人",
    parts: [
      { part: "好", meaning: "Good", type: "prefix" },
      { part: "牧", meaning: "Shepherd/Tend", type: "root" },
      { part: "人", meaning: "Person/One", type: "suffix" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "保护者": {
    original: "保护者",
    parts: [
      { part: "保护", meaning: "Protect/Guard", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Protector",
  },
  "看顾者": {
    original: "看顾者",
    parts: [
      { part: "看", meaning: "Watch over", type: "root" },
      { part: "顾", meaning: "Care for", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The One Who Watches Over/Guardian",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "救主": {
    original: "救主",
    parts: [
      { part: "救", meaning: "Save/Rescue", type: "root" },
      { part: "主", meaning: "Lord/Master", type: "suffix" },
    ],
    literalMeaning: "The Lord Who Saves/Savior",
  },
  "救世主": {
    original: "救世主",
    parts: [
      { part: "救", meaning: "Save", type: "root" },
      { part: "世", meaning: "World/Age", type: "root" },
      { part: "主", meaning: "Lord", type: "suffix" },
    ],
    literalMeaning: "The Lord Who Saves the World/Savior of the World",
  },
  "救赎者": {
    original: "救赎者",
    parts: [
      { part: "救", meaning: "Save", type: "root" },
      { part: "赎", meaning: "Redeem/Ransom", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Redeemer",
  },

  // === HEALER/PROVIDER NAMES ===
  "医治者": {
    original: "医治者",
    parts: [
      { part: "医", meaning: "Heal/Medicine", type: "root" },
      { part: "治", meaning: "Treat/Cure", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Healer",
  },
  "供应者": {
    original: "供应者",
    parts: [
      { part: "供应", meaning: "Supply/Provide", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Provider",
  },
  "赐恩者": {
    original: "赐恩者",
    parts: [
      { part: "赐", meaning: "Bestow/Give", type: "root" },
      { part: "恩", meaning: "Grace/Favor", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Giver of Grace",
  },

  // === MERCY/COMPASSION NAMES ===
  "慈爱之神": {
    original: "慈爱之神",
    parts: [
      { part: "慈", meaning: "Merciful", type: "prefix" },
      { part: "爱", meaning: "Love", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Merciful Love",
  },
  "怜悯之父": {
    original: "怜悯之父",
    parts: [
      { part: "怜悯", meaning: "Compassion/Mercy", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Father of Compassion",
  },

  // === HOLY NAMES ===
  "圣者": {
    original: "圣者",
    parts: [
      { part: "圣", meaning: "Holy/Sacred", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Holy One",
  },
  "圣灵": {
    original: "圣灵",
    parts: [
      { part: "圣", meaning: "Holy", type: "prefix" },
      { part: "灵", meaning: "Spirit", type: "root" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === PEACE NAMES ===
  "平安之神": {
    original: "平安之神",
    parts: [
      { part: "平安", meaning: "Peace/Safety", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "和平之君": {
    original: "和平之君",
    parts: [
      { part: "和平", meaning: "Peace/Harmony", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "君", meaning: "Prince/Ruler", type: "root" },
    ],
    literalMeaning: "Prince of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "公义之神": {
    original: "公义之神",
    parts: [
      { part: "公义", meaning: "Righteousness/Justice", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Righteousness",
  },
  "审判者": {
    original: "审判者",
    parts: [
      { part: "审判", meaning: "Judge/Judgment", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Judge",
  },
  "公正的审判官": {
    original: "公正的审判官",
    parts: [
      { part: "公正", meaning: "Just/Fair", type: "prefix" },
      { part: "的", meaning: "'s", type: "connector" },
      { part: "审判", meaning: "Judgment", type: "root" },
      { part: "官", meaning: "Official/Judge", type: "suffix" },
    ],
    literalMeaning: "The Righteous Judge",
  },

  // === WISDOM NAMES ===
  "智慧之神": {
    original: "智慧之神",
    parts: [
      { part: "智慧", meaning: "Wisdom", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Wisdom",
  },
  "智慧之源": {
    original: "智慧之源",
    parts: [
      { part: "智慧", meaning: "Wisdom", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "源", meaning: "Source/Spring", type: "root" },
    ],
    literalMeaning: "Source of Wisdom",
  },

  // === LIGHT/GLORY NAMES ===
  "世界之光": {
    original: "世界之光",
    parts: [
      { part: "世界", meaning: "World", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "光", meaning: "Light", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "荣耀之王": {
    original: "荣耀之王",
    parts: [
      { part: "荣耀", meaning: "Glory/Honor", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "王", meaning: "King", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },

  // === ROCK/FORTRESS NAMES ===
  "磐石": {
    original: "磐石",
    parts: [
      { part: "磐", meaning: "Large/Solid", type: "prefix" },
      { part: "石", meaning: "Rock/Stone", type: "root" },
    ],
    literalMeaning: "The Rock (Foundation)",
  },
  "避难所": {
    original: "避难所",
    parts: [
      { part: "避", meaning: "Avoid/Escape", type: "root" },
      { part: "难", meaning: "Trouble/Danger", type: "root" },
      { part: "所", meaning: "Place", type: "suffix" },
    ],
    literalMeaning: "Place of Refuge",
  },
  "坚固台": {
    original: "坚固台",
    parts: [
      { part: "坚固", meaning: "Strong/Firm", type: "prefix" },
      { part: "台", meaning: "Tower/Platform", type: "root" },
    ],
    literalMeaning: "Strong Tower/Fortress",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "信实者": {
    original: "信实者",
    parts: [
      { part: "信", meaning: "Faith/Trust", type: "root" },
      { part: "实", meaning: "True/Real", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Faithful One",
  },
  "真理之神": {
    original: "真理之神",
    parts: [
      { part: "真理", meaning: "Truth", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "永恒者": {
    original: "永恒者",
    parts: [
      { part: "永", meaning: "Eternal/Forever", type: "prefix" },
      { part: "恒", meaning: "Constant/Everlasting", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Eternal One",
  },
  "昔在今在以后永在者": {
    original: "昔在今在以后永在者",
    parts: [
      { part: "昔在", meaning: "Who was", type: "root" },
      { part: "今在", meaning: "Who is", type: "root" },
      { part: "以后永在", meaning: "Who is to come forever", type: "root" },
      { part: "者", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The One Who Was, Is, and Is To Come",
  },
  "阿拉法俄梅戛": {
    original: "阿拉法俄梅戛",
    parts: [
      { part: "阿拉法", meaning: "Alpha (First)", type: "root" },
      { part: "俄梅戛", meaning: "Omega (Last)", type: "root" },
    ],
    literalMeaning: "The Alpha and Omega",
  },

  // === COMFORT NAMES ===
  "安慰者": {
    original: "安慰者",
    parts: [
      { part: "安慰", meaning: "Comfort/Console", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Comforter",
  },
};

/**
 * Parse a Wu Chinese divine name into its component parts
 */
export function parseWuChineseEtymology(name: string): EtymologyBreakdown | null {
  // Normalize the name for lookup
  const normalizedName = name.trim();

  // Check for exact match in known compounds
  if (KNOWN_COMPOUNDS[normalizedName]) {
    return KNOWN_COMPOUNDS[normalizedName];
  }

  // Check case-insensitive (for romanized input)
  const lowerName = normalizedName.toLowerCase();
  for (const [key, value] of Object.entries(KNOWN_COMPOUNDS)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  return null;
}

/**
 * Check if a name has Wu Chinese etymology available
 */
export function hasWuChineseEtymology(name: string, language: string): boolean {
  const lang = language.toLowerCase().replace(/[_\s]/g, '');
  if (lang !== "wuchinese" && lang !== "wu_chinese" && lang !== "wu") return false;
  return parseWuChineseEtymology(name) !== null;
}

/**
 * Get all available Wu Chinese etymologies
 */
export function getAllWuChineseEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
