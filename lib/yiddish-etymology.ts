// Yiddish Etymology Parser
// Breaks down Yiddish divine names into their component parts with meanings
// Yiddish uses Hebrew-derived religious terms with Germanic grammatical structures

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

// Common Yiddish name components and their meanings
const YIDDISH_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots (Hebrew-derived)
  "גאָט": { meaning: "God", type: "root" },
  "האר": { meaning: "Lord/Master", type: "root" },
  "אדון": { meaning: "Lord (Hebrew)", type: "root" },
  "אויבערשטער": { meaning: "Supreme One/Most High", type: "root" },
  "באשעפער": { meaning: "Creator", type: "root" },
  "טאטע": { meaning: "Father (affectionate)", type: "root" },
  "פאָטער": { meaning: "Father (formal)", type: "root" },
  "מלך": { meaning: "King (Hebrew)", type: "root" },
  "קעניג": { meaning: "King (Germanic)", type: "root" },

  // Attribute roots
  "רחמנות": { meaning: "Mercy/Compassion", type: "root" },
  "קדושה": { meaning: "Holiness", type: "root" },
  "גערעכטיקייט": { meaning: "Justice/Righteousness", type: "root" },
  "שלום": { meaning: "Peace", type: "root" },
  "אמת": { meaning: "Truth", type: "root" },
  "חסד": { meaning: "Lovingkindness", type: "root" },
  "כח": { meaning: "Power/Strength", type: "root" },
  "חכמה": { meaning: "Wisdom", type: "root" },

  // Descriptive elements
  "אייביק": { meaning: "Eternal", type: "prefix" },
  "הייליק": { meaning: "Holy/Sacred", type: "prefix" },
  "אלמעכטיק": { meaning: "Almighty", type: "prefix" },
  "בארימהארציק": { meaning: "Merciful", type: "prefix" },
  "גרויס": { meaning: "Great", type: "prefix" },

  // Suffixes
  "ער": { meaning: "one who (agent)", type: "suffix" },
  "קייט": { meaning: "-ness (abstract noun)", type: "suffix" },
};

// Known Yiddish compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "דער אויבערשטער": {
    original: "דער אויבערשטער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "אויבערשטער", meaning: "Supreme One/Highest", type: "root" },
    ],
    literalMeaning: "The Supreme One/The Most High (common Yiddish term for God)",
  },
  "גאָט אין הימל": {
    original: "גאָט אין הימל",
    parts: [
      { part: "גאָט", meaning: "God", type: "root" },
      { part: "אין", meaning: "in", type: "connector" },
      { part: "הימל", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "God in Heaven",
  },
  "רבונו של עולם": {
    original: "רבונו של עולם",
    parts: [
      { part: "רבונו", meaning: "Master/Lord of", type: "root" },
      { part: "של", meaning: "of", type: "connector" },
      { part: "עולם", meaning: "World/Universe", type: "root" },
    ],
    literalMeaning: "Master of the Universe (Hebrew liturgical term used in Yiddish)",
  },
  "הקדוש ברוך הוא": {
    original: "הקדוש ברוך הוא",
    parts: [
      { part: "הקדוש", meaning: "The Holy One", type: "root" },
      { part: "ברוך", meaning: "Blessed", type: "root" },
      { part: "הוא", meaning: "He (is)", type: "suffix" },
    ],
    literalMeaning: "The Holy One, Blessed Be He",
  },

  // === FATHER NAMES ===
  "טאַטע אין הימל": {
    original: "טאַטע אין הימל",
    parts: [
      { part: "טאַטע", meaning: "Father (dear/affectionate)", type: "root" },
      { part: "אין", meaning: "in", type: "connector" },
      { part: "הימל", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "Father in Heaven (affectionate)",
  },
  "אונזער טאַטע": {
    original: "אונזער טאַטע",
    parts: [
      { part: "אונזער", meaning: "Our", type: "prefix" },
      { part: "טאַטע", meaning: "Father (dear)", type: "root" },
    ],
    literalMeaning: "Our Father",
  },
  "אָבינו שבשמים": {
    original: "אָבינו שבשמים",
    parts: [
      { part: "אָבינו", meaning: "Our Father", type: "root" },
      { part: "שב", meaning: "who is in", type: "connector" },
      { part: "שמים", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "Our Father who is in Heaven",
  },

  // === CREATOR NAMES ===
  "דער באַשעפער": {
    original: "דער באַשעפער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "באַשעפער", meaning: "Creator", type: "root" },
    ],
    literalMeaning: "The Creator",
  },
  "בורא עולם": {
    original: "בורא עולם",
    parts: [
      { part: "בורא", meaning: "Creator of", type: "root" },
      { part: "עולם", meaning: "World/Universe", type: "root" },
    ],
    literalMeaning: "Creator of the World",
  },

  // === KING NAMES ===
  "מלך מלכי המלכים": {
    original: "מלך מלכי המלכים",
    parts: [
      { part: "מלך", meaning: "King", type: "root" },
      { part: "מלכי", meaning: "of Kings", type: "root" },
      { part: "המלכים", meaning: "the Kings", type: "root" },
    ],
    literalMeaning: "King of the King of Kings (Supreme King)",
  },
  "דער אייביקער קעניג": {
    original: "דער אייביקער קעניג",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "אייביקער", meaning: "Eternal", type: "prefix" },
      { part: "קעניג", meaning: "King", type: "root" },
    ],
    literalMeaning: "The Eternal King",
  },

  // === ALMIGHTY/POWER NAMES ===
  "דער אַלמעכטיקער": {
    original: "דער אַלמעכטיקער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "אַלמעכטיקער", meaning: "Almighty/All-Powerful", type: "root" },
    ],
    literalMeaning: "The Almighty One",
  },
  "גאָט פון כוחות": {
    original: "גאָט פון כוחות",
    parts: [
      { part: "גאָט", meaning: "God", type: "root" },
      { part: "פון", meaning: "of", type: "connector" },
      { part: "כוחות", meaning: "Powers/Hosts", type: "root" },
    ],
    literalMeaning: "God of Hosts/Powers",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "דער גוטער פּאַסטעך": {
    original: "דער גוטער פּאַסטעך",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "גוטער", meaning: "Good", type: "prefix" },
      { part: "פּאַסטעך", meaning: "Shepherd", type: "root" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "שומר ישראל": {
    original: "שומר ישראל",
    parts: [
      { part: "שומר", meaning: "Guardian/Keeper", type: "root" },
      { part: "ישראל", meaning: "Israel", type: "root" },
    ],
    literalMeaning: "Guardian of Israel",
  },

  // === MERCY/COMPASSION NAMES ===
  "דער בארימהארציקער": {
    original: "דער בארימהארציקער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "בארימהארציקער", meaning: "Merciful/Compassionate One", type: "root" },
    ],
    literalMeaning: "The Merciful One",
  },
  "אֵל רחום וחנון": {
    original: "אֵל רחום וחנון",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "רחום", meaning: "Compassionate", type: "root" },
      { part: "ו", meaning: "and", type: "connector" },
      { part: "חנון", meaning: "Gracious", type: "root" },
    ],
    literalMeaning: "God, Compassionate and Gracious",
  },
  "פאָטער פון רחמנות": {
    original: "פאָטער פון רחמנות",
    parts: [
      { part: "פאָטער", meaning: "Father", type: "root" },
      { part: "פון", meaning: "of", type: "connector" },
      { part: "רחמנות", meaning: "Mercy/Compassion", type: "root" },
    ],
    literalMeaning: "Father of Mercy",
  },

  // === HEALER/SAVIOR NAMES ===
  "דער היילער": {
    original: "דער היילער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "היילער", meaning: "Healer", type: "root" },
    ],
    literalMeaning: "The Healer",
  },
  "רופא כל בשר": {
    original: "רופא כל בשר",
    parts: [
      { part: "רופא", meaning: "Healer", type: "root" },
      { part: "כל", meaning: "all", type: "connector" },
      { part: "בשר", meaning: "flesh", type: "root" },
    ],
    literalMeaning: "Healer of All Flesh",
  },
  "דער אויסלייזער": {
    original: "דער אויסלייזער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "אויסלייזער", meaning: "Redeemer/Deliverer", type: "root" },
    ],
    literalMeaning: "The Redeemer",
  },

  // === PEACE NAMES ===
  "גאָט פון שלום": {
    original: "גאָט פון שלום",
    parts: [
      { part: "גאָט", meaning: "God", type: "root" },
      { part: "פון", meaning: "of", type: "connector" },
      { part: "שלום", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "דער גערעכטער ריכטער": {
    original: "דער גערעכטער ריכטער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "גערעכטער", meaning: "Righteous/Just", type: "prefix" },
      { part: "ריכטער", meaning: "Judge", type: "root" },
    ],
    literalMeaning: "The Righteous Judge",
  },
  "דיין האמת": {
    original: "דיין האמת",
    parts: [
      { part: "דיין", meaning: "Judge", type: "root" },
      { part: "ה", meaning: "the", type: "connector" },
      { part: "אמת", meaning: "Truth", type: "root" },
    ],
    literalMeaning: "The Judge of Truth",
  },

  // === HOLY NAMES ===
  "דער הייליקער": {
    original: "דער הייליקער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "הייליקער", meaning: "Holy One", type: "root" },
    ],
    literalMeaning: "The Holy One",
  },

  // === LIGHT/GLORY NAMES ===
  "דאָס ליכט פון דער וועלט": {
    original: "דאָס ליכט פון דער וועלט",
    parts: [
      { part: "דאָס", meaning: "The", type: "connector" },
      { part: "ליכט", meaning: "Light", type: "root" },
      { part: "פון דער", meaning: "of the", type: "connector" },
      { part: "וועלט", meaning: "World", type: "root" },
    ],
    literalMeaning: "The Light of the World",
  },
  "אור העולם": {
    original: "אור העולם",
    parts: [
      { part: "אור", meaning: "Light", type: "root" },
      { part: "ה", meaning: "the", type: "connector" },
      { part: "עולם", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World (Hebrew)",
  },

  // === ROCK/FORTRESS NAMES ===
  "צור ישראל": {
    original: "צור ישראל",
    parts: [
      { part: "צור", meaning: "Rock", type: "root" },
      { part: "ישראל", meaning: "Israel", type: "root" },
    ],
    literalMeaning: "Rock of Israel",
  },

  // === ETERNAL NAMES ===
  "דער אייביקער": {
    original: "דער אייביקער",
    parts: [
      { part: "דער", meaning: "The", type: "connector" },
      { part: "אייביקער", meaning: "Eternal One", type: "root" },
    ],
    literalMeaning: "The Eternal One",
  },
  "מלך עולם": {
    original: "מלך עולם",
    parts: [
      { part: "מלך", meaning: "King", type: "root" },
      { part: "עולם", meaning: "Eternal/World", type: "root" },
    ],
    literalMeaning: "Eternal King",
  },
};

/**
 * Parse a Yiddish divine name into its component parts
 */
export function parseYiddishEtymology(name: string): EtymologyBreakdown | null {
  // Normalize the name for lookup
  const normalizedName = name.trim();

  // Check for exact match in known compounds
  if (KNOWN_COMPOUNDS[normalizedName]) {
    return KNOWN_COMPOUNDS[normalizedName];
  }

  // Check case-insensitive
  const lowerName = normalizedName.toLowerCase();
  for (const [key, value] of Object.entries(KNOWN_COMPOUNDS)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  return null;
}

/**
 * Check if a name has Yiddish etymology available
 */
export function hasYiddishEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "yiddish") return false;
  return parseYiddishEtymology(name) !== null;
}

/**
 * Get all available Yiddish etymologies
 */
export function getAllYiddishEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
