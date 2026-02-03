// Mandarin Etymology Parser
// Breaks down Mandarin Chinese divine names into their component parts with meanings
// Mandarin (普通话) is the standard Chinese language

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

// Common Mandarin name components and their meanings
const MANDARIN_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "上帝": { meaning: "Supreme Sovereign/God Above", type: "root" },
  "神": { meaning: "God/Spirit/Divine", type: "root" },
  "主": { meaning: "Lord/Master", type: "root" },
  "天": { meaning: "Heaven", type: "root" },
  "父": { meaning: "Father", type: "root" },
  "王": { meaning: "King", type: "root" },
  "耶和华": { meaning: "YHWH/Jehovah", type: "root" },

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
  "能": { meaning: "Power/Ability", type: "root" },
  "知": { meaning: "Knowledge", type: "root" },

  // Action/Agent markers
  "者": { meaning: "One who/The one", type: "suffix" },
  "之": { meaning: "of/'s", type: "connector" },
  "的": { meaning: "of/'s (modern)", type: "connector" },
};

// Known Mandarin compound names with predefined breakdowns
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
  "神": {
    original: "神",
    parts: [
      { part: "神", meaning: "Divine/Spirit/God", type: "root" },
    ],
    literalMeaning: "God/The Divine One",
  },
  "耶和华": {
    original: "耶和华",
    parts: [
      { part: "耶和华", meaning: "YHWH (phonetic transliteration)", type: "root" },
    ],
    literalMeaning: "YHWH/Jehovah - The LORD (I AM WHO I AM)",
  },
  "至高神": {
    original: "至高神",
    parts: [
      { part: "至", meaning: "Most/Ultimate", type: "prefix" },
      { part: "高", meaning: "High", type: "root" },
      { part: "神", meaning: "God", type: "suffix" },
    ],
    literalMeaning: "The Most High God",
  },
  "独一真神": {
    original: "独一真神",
    parts: [
      { part: "独一", meaning: "Only/Unique", type: "prefix" },
      { part: "真", meaning: "True", type: "prefix" },
      { part: "神", meaning: "God", type: "root" },
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
  "天地的主": {
    original: "天地的主",
    parts: [
      { part: "天", meaning: "Heaven", type: "root" },
      { part: "地", meaning: "Earth", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "主", meaning: "Lord/Master", type: "root" },
    ],
    literalMeaning: "Lord of Heaven and Earth",
  },

  // === FATHER NAMES ===
  "天父": {
    original: "天父",
    parts: [
      { part: "天", meaning: "Heavenly/Heaven", type: "prefix" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Heavenly Father",
  },
  "我们在天上的父": {
    original: "我们在天上的父",
    parts: [
      { part: "我们", meaning: "Our/We", type: "prefix" },
      { part: "在", meaning: "Who is in", type: "connector" },
      { part: "天上", meaning: "Heaven", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Our Father Who is in Heaven",
  },
  "阿爸父": {
    original: "阿爸父",
    parts: [
      { part: "阿爸", meaning: "Abba (Aramaic intimate Father)", type: "root" },
      { part: "父", meaning: "Father", type: "suffix" },
    ],
    literalMeaning: "Abba Father (Dear/Intimate Father)",
  },
  "永在的父": {
    original: "永在的父",
    parts: [
      { part: "永在", meaning: "Eternal/Everlasting", type: "prefix" },
      { part: "的", meaning: "of/'s", type: "connector" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "The Everlasting Father",
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
  "永恒的君王": {
    original: "永恒的君王",
    parts: [
      { part: "永恒", meaning: "Eternal/Everlasting", type: "prefix" },
      { part: "的", meaning: "of/'s", type: "connector" },
      { part: "君王", meaning: "King/Sovereign", type: "root" },
    ],
    literalMeaning: "The Eternal King",
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
  "全能的神": {
    original: "全能的神",
    parts: [
      { part: "全能", meaning: "Almighty/Omnipotent", type: "prefix" },
      { part: "的", meaning: "of/'s", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "Almighty God",
  },
  "大能的神": {
    original: "大能的神",
    parts: [
      { part: "大能", meaning: "Mighty/Powerful", type: "prefix" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "Mighty God",
  },
  "万军之耶和华": {
    original: "万军之耶和华",
    parts: [
      { part: "万军", meaning: "Hosts/Armies", type: "root" },
      { part: "之", meaning: "of", type: "connector" },
      { part: "耶和华", meaning: "YHWH/The LORD", type: "root" },
    ],
    literalMeaning: "The LORD of Hosts",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "好牧人": {
    original: "好牧人",
    parts: [
      { part: "好", meaning: "Good", type: "prefix" },
      { part: "牧人", meaning: "Shepherd", type: "root" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "牧者": {
    original: "牧者",
    parts: [
      { part: "牧", meaning: "Shepherd/Tend", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Shepherd",
  },
  "保护者": {
    original: "保护者",
    parts: [
      { part: "保护", meaning: "Protect/Guard", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Protector",
  },
  "以色列的牧者": {
    original: "以色列的牧者",
    parts: [
      { part: "以色列", meaning: "Israel", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "牧者", meaning: "Shepherd", type: "root" },
    ],
    literalMeaning: "Shepherd of Israel",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "救主": {
    original: "救主",
    parts: [
      { part: "救", meaning: "Save/Rescue", type: "root" },
      { part: "主", meaning: "Lord", type: "suffix" },
    ],
    literalMeaning: "The Lord Who Saves/Savior",
  },
  "救世主": {
    original: "救世主",
    parts: [
      { part: "救", meaning: "Save", type: "root" },
      { part: "世", meaning: "World", type: "root" },
      { part: "主", meaning: "Lord", type: "suffix" },
    ],
    literalMeaning: "The Lord Who Saves the World/Savior of the World",
  },
  "救赎主": {
    original: "救赎主",
    parts: [
      { part: "救", meaning: "Save", type: "root" },
      { part: "赎", meaning: "Redeem/Ransom", type: "root" },
      { part: "主", meaning: "Lord", type: "suffix" },
    ],
    literalMeaning: "The Redeemer",
  },

  // === HEALER/PROVIDER NAMES ===
  "医治者": {
    original: "医治者",
    parts: [
      { part: "医治", meaning: "Heal/Cure", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Healer",
  },
  "耶和华以勒": {
    original: "耶和华以勒",
    parts: [
      { part: "耶和华", meaning: "YHWH/The LORD", type: "root" },
      { part: "以勒", meaning: "Jireh (Will Provide)", type: "suffix" },
    ],
    literalMeaning: "The LORD Will Provide",
  },
  "供应者": {
    original: "供应者",
    parts: [
      { part: "供应", meaning: "Supply/Provide", type: "root" },
      { part: "者", meaning: "One who", type: "suffix" },
    ],
    literalMeaning: "The Provider",
  },
  "耶和华拉法": {
    original: "耶和华拉法",
    parts: [
      { part: "耶和华", meaning: "YHWH/The LORD", type: "root" },
      { part: "拉法", meaning: "Rapha (Who Heals)", type: "suffix" },
    ],
    literalMeaning: "The LORD Who Heals",
  },

  // === MERCY/COMPASSION NAMES ===
  "怜悯的父": {
    original: "怜悯的父",
    parts: [
      { part: "怜悯", meaning: "Compassion/Mercy", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "父", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Father of Compassion/Mercy",
  },
  "慈爱的神": {
    original: "慈爱的神",
    parts: [
      { part: "慈爱", meaning: "Lovingkindness", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Lovingkindness",
  },
  "有恩典的神": {
    original: "有恩典的神",
    parts: [
      { part: "有", meaning: "Having", type: "prefix" },
      { part: "恩典", meaning: "Grace", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Grace/Gracious God",
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
  "以色列的圣者": {
    original: "以色列的圣者",
    parts: [
      { part: "以色列", meaning: "Israel", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "圣者", meaning: "Holy One", type: "root" },
    ],
    literalMeaning: "The Holy One of Israel",
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
  "赐平安的神": {
    original: "赐平安的神",
    parts: [
      { part: "赐", meaning: "Bestow/Give", type: "prefix" },
      { part: "平安", meaning: "Peace", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God Who Gives Peace",
  },
  "和平的君": {
    original: "和平的君",
    parts: [
      { part: "和平", meaning: "Peace", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "君", meaning: "Prince/Ruler", type: "root" },
    ],
    literalMeaning: "Prince of Peace",
  },
  "耶和华沙龙": {
    original: "耶和华沙龙",
    parts: [
      { part: "耶和华", meaning: "YHWH/The LORD", type: "root" },
      { part: "沙龙", meaning: "Shalom (Peace)", type: "suffix" },
    ],
    literalMeaning: "The LORD Is Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "公义的神": {
    original: "公义的神",
    parts: [
      { part: "公义", meaning: "Righteousness/Justice", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
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
      { part: "的", meaning: "of", type: "connector" },
      { part: "审判官", meaning: "Judge", type: "root" },
    ],
    literalMeaning: "The Righteous Judge",
  },

  // === WISDOM NAMES ===
  "智慧的源头": {
    original: "智慧的源头",
    parts: [
      { part: "智慧", meaning: "Wisdom", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "源头", meaning: "Source", type: "root" },
    ],
    literalMeaning: "Source of Wisdom",
  },
  "全知的神": {
    original: "全知的神",
    parts: [
      { part: "全知", meaning: "All-Knowing/Omniscient", type: "prefix" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "Omniscient God/All-Knowing God",
  },

  // === LIGHT/GLORY NAMES ===
  "世界的光": {
    original: "世界的光",
    parts: [
      { part: "世界", meaning: "World", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "光", meaning: "Light", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "荣耀的王": {
    original: "荣耀的王",
    parts: [
      { part: "荣耀", meaning: "Glory/Honor", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "王", meaning: "King", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },

  // === ROCK/FORTRESS NAMES ===
  "磐石": {
    original: "磐石",
    parts: [
      { part: "磐", meaning: "Large/Firm", type: "prefix" },
      { part: "石", meaning: "Rock/Stone", type: "root" },
    ],
    literalMeaning: "The Rock (Foundation)",
  },
  "我的避难所": {
    original: "我的避难所",
    parts: [
      { part: "我的", meaning: "My", type: "prefix" },
      { part: "避难所", meaning: "Refuge/Shelter", type: "root" },
    ],
    literalMeaning: "My Refuge",
  },
  "坚固台": {
    original: "坚固台",
    parts: [
      { part: "坚固", meaning: "Strong/Firm", type: "prefix" },
      { part: "台", meaning: "Tower/Platform", type: "root" },
    ],
    literalMeaning: "Strong Tower/Fortress",
  },
  "耶和华尼西": {
    original: "耶和华尼西",
    parts: [
      { part: "耶和华", meaning: "YHWH/The LORD", type: "root" },
      { part: "尼西", meaning: "Nissi (My Banner)", type: "suffix" },
    ],
    literalMeaning: "The LORD Is My Banner",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "信实的神": {
    original: "信实的神",
    parts: [
      { part: "信实", meaning: "Faithful/Trustworthy", type: "prefix" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "The Faithful God",
  },
  "真理的神": {
    original: "真理的神",
    parts: [
      { part: "真理", meaning: "Truth", type: "root" },
      { part: "的", meaning: "of", type: "connector" },
      { part: "神", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "永生神": {
    original: "永生神",
    parts: [
      { part: "永", meaning: "Eternal/Forever", type: "prefix" },
      { part: "生", meaning: "Living", type: "root" },
      { part: "神", meaning: "God", type: "suffix" },
    ],
    literalMeaning: "The Eternal Living God",
  },
  "自有永有的": {
    original: "自有永有的",
    parts: [
      { part: "自有", meaning: "Self-existent", type: "root" },
      { part: "永有", meaning: "Eternally existing", type: "root" },
      { part: "的", meaning: "One", type: "suffix" },
    ],
    literalMeaning: "The Self-Existent and Eternal One (I AM WHO I AM)",
  },
  "阿拉法和俄梅戛": {
    original: "阿拉法和俄梅戛",
    parts: [
      { part: "阿拉法", meaning: "Alpha (First)", type: "root" },
      { part: "和", meaning: "and", type: "connector" },
      { part: "俄梅戛", meaning: "Omega (Last)", type: "root" },
    ],
    literalMeaning: "The Alpha and Omega (First and Last)",
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
  "赐各样安慰的神": {
    original: "赐各样安慰的神",
    parts: [
      { part: "赐", meaning: "Bestow/Give", type: "prefix" },
      { part: "各样", meaning: "All kinds of", type: "prefix" },
      { part: "安慰", meaning: "Comfort", type: "root" },
      { part: "的神", meaning: "God of", type: "root" },
    ],
    literalMeaning: "God of All Comfort",
  },
};

/**
 * Parse a Mandarin divine name into its component parts
 */
export function parseMandarinEtymology(name: string): EtymologyBreakdown | null {
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
 * Check if a name has Mandarin etymology available
 */
export function hasMandarinEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "mandarin") return false;
  return parseMandarinEtymology(name) !== null;
}

/**
 * Get all available Mandarin etymologies
 */
export function getAllMandarinEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
