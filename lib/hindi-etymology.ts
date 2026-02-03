// Hindi Etymology Parser
// Breaks down Hindi divine names into their component parts with meanings

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

// Common Hindi name components and their meanings (derived from Sanskrit)
const HINDI_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "परम": { meaning: "Supreme/Ultimate", type: "prefix" },
  "ईश्वर": { meaning: "Lord/God/Controller", type: "root" },
  "प्रभु": { meaning: "Lord/Master", type: "root" },
  "भगवान": { meaning: "God/Lord (possessing glory)", type: "root" },
  "देव": { meaning: "Divine/God", type: "root" },
  "नाथ": { meaning: "Lord/Protector", type: "root" },
  "स्वामी": { meaning: "Master/Lord", type: "root" },

  // Attribute roots
  "पिता": { meaning: "Father", type: "root" },
  "राजा": { meaning: "King", type: "root" },
  "सृष्टि": { meaning: "Creation", type: "root" },
  "रक्षक": { meaning: "Protector", type: "root" },
  "त्राता": { meaning: "Savior", type: "root" },
  "शक्ति": { meaning: "Power", type: "root" },
  "ज्ञान": { meaning: "Knowledge/Wisdom", type: "root" },
  "प्रेम": { meaning: "Love", type: "root" },
  "दया": { meaning: "Mercy/Compassion", type: "root" },
  "शांति": { meaning: "Peace", type: "root" },
  "न्याय": { meaning: "Justice", type: "root" },
  "सत्य": { meaning: "Truth", type: "root" },
  "पवित्र": { meaning: "Holy/Sacred", type: "root" },
  "अनंत": { meaning: "Infinite/Eternal", type: "root" },
  "सर्व": { meaning: "All/Every", type: "root" },
  "आत्मा": { meaning: "Soul/Spirit", type: "root" },

  // Descriptive elements
  "कर्ता": { meaning: "Creator/Doer", type: "suffix" },
  "दाता": { meaning: "Giver", type: "suffix" },
  "पालक": { meaning: "Sustainer/Nurturer", type: "suffix" },
  "व्यापी": { meaning: "Pervading/Present everywhere", type: "suffix" },
  "शाली": { meaning: "Possessor of", type: "suffix" },

  // Connectors
  "का": { meaning: "of", type: "connector" },
  "के": { meaning: "of (plural)", type: "connector" },
  "और": { meaning: "and", type: "connector" },
};

// Known Hindi compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "परमेश्वर": {
    original: "परमेश्वर",
    parts: [
      { part: "परम", meaning: "Supreme/Ultimate", type: "prefix" },
      { part: "ईश्वर", meaning: "Lord/God", type: "root" },
    ],
    literalMeaning: "The Supreme Lord/The Ultimate God",
  },
  "परम पिता": {
    original: "परम पिता",
    parts: [
      { part: "परम", meaning: "Supreme/Ultimate", type: "prefix" },
      { part: "पिता", meaning: "Father", type: "root" },
    ],
    literalMeaning: "The Supreme Father",
  },
  "परमात्मा": {
    original: "परमात्मा",
    parts: [
      { part: "परम", meaning: "Supreme/Ultimate", type: "prefix" },
      { part: "आत्मा", meaning: "Soul/Spirit", type: "root" },
    ],
    literalMeaning: "The Supreme Soul/Spirit",
  },
  "सर्वशक्तिमान": {
    original: "सर्वशक्तिमान",
    parts: [
      { part: "सर्व", meaning: "All", type: "prefix" },
      { part: "शक्ति", meaning: "Power", type: "root" },
      { part: "मान", meaning: "Possessing", type: "suffix" },
    ],
    literalMeaning: "The All-Powerful/Almighty",
  },
  "सर्वव्यापी": {
    original: "सर्वव्यापी",
    parts: [
      { part: "सर्व", meaning: "All/Everywhere", type: "prefix" },
      { part: "व्यापी", meaning: "Pervading/Present", type: "root" },
    ],
    literalMeaning: "The Omnipresent One",
  },
  "सर्वज्ञ": {
    original: "सर्वज्ञ",
    parts: [
      { part: "सर्व", meaning: "All", type: "prefix" },
      { part: "ज्ञ", meaning: "Knowing", type: "root" },
    ],
    literalMeaning: "The All-Knowing/Omniscient One",
  },

  // === CREATOR NAMES ===
  "सृष्टिकर्ता": {
    original: "सृष्टिकर्ता",
    parts: [
      { part: "सृष्टि", meaning: "Creation/Universe", type: "root" },
      { part: "कर्ता", meaning: "Creator/Maker", type: "suffix" },
    ],
    literalMeaning: "The Creator of the Universe",
  },
  "जगतकर्ता": {
    original: "जगतकर्ता",
    parts: [
      { part: "जगत", meaning: "World/Universe", type: "root" },
      { part: "कर्ता", meaning: "Creator/Maker", type: "suffix" },
    ],
    literalMeaning: "The Maker of the World",
  },
  "विश्वकर्मा": {
    original: "विश्वकर्मा",
    parts: [
      { part: "विश्व", meaning: "Universe/World", type: "root" },
      { part: "कर्मा", meaning: "Doer/Creator", type: "suffix" },
    ],
    literalMeaning: "The Architect of the Universe",
  },

  // === PROTECTOR/SAVIOR NAMES ===
  "रक्षक": {
    original: "रक्षक",
    parts: [
      { part: "रक्ष", meaning: "Protection", type: "root" },
      { part: "क", meaning: "One who does", type: "suffix" },
    ],
    literalMeaning: "The Protector",
  },
  "त्राणकर्ता": {
    original: "त्राणकर्ता",
    parts: [
      { part: "त्राण", meaning: "Rescue/Deliverance", type: "root" },
      { part: "कर्ता", meaning: "Doer/One who performs", type: "suffix" },
    ],
    literalMeaning: "The Deliverer/Savior",
  },
  "उद्धारक": {
    original: "उद्धारक",
    parts: [
      { part: "उद्धार", meaning: "Salvation/Upliftment", type: "root" },
      { part: "क", meaning: "One who does", type: "suffix" },
    ],
    literalMeaning: "The Savior/Redeemer",
  },
  "पालनहार": {
    original: "पालनहार",
    parts: [
      { part: "पालन", meaning: "Nurturing/Sustaining", type: "root" },
      { part: "हार", meaning: "One who does", type: "suffix" },
    ],
    literalMeaning: "The Sustainer/Nurturer",
  },

  // === KING/LORD NAMES ===
  "राजाओं का राजा": {
    original: "राजाओं का राजा",
    parts: [
      { part: "राजाओं", meaning: "Of kings", type: "root" },
      { part: "का", meaning: "of", type: "connector" },
      { part: "राजा", meaning: "King", type: "root" },
    ],
    literalMeaning: "The King of Kings",
  },
  "प्रभुओं का प्रभु": {
    original: "प्रभुओं का प्रभु",
    parts: [
      { part: "प्रभुओं", meaning: "Of Lords", type: "root" },
      { part: "का", meaning: "of", type: "connector" },
      { part: "प्रभु", meaning: "Lord", type: "root" },
    ],
    literalMeaning: "The Lord of Lords",
  },
  "अधिराज": {
    original: "अधिराज",
    parts: [
      { part: "अधि", meaning: "Supreme/Over", type: "prefix" },
      { part: "राज", meaning: "King/Rule", type: "root" },
    ],
    literalMeaning: "The Supreme King/Sovereign",
  },

  // === SHEPHERD/GUIDE NAMES ===
  "चरवाहा": {
    original: "चरवाहा",
    parts: [
      { part: "चर", meaning: "Moving/Grazing", type: "root" },
      { part: "वाहा", meaning: "One who leads", type: "suffix" },
    ],
    literalMeaning: "The Shepherd (One who leads the flock)",
  },
  "मार्गदर्शक": {
    original: "मार्गदर्शक",
    parts: [
      { part: "मार्ग", meaning: "Path/Way", type: "root" },
      { part: "दर्शक", meaning: "Shower/Guide", type: "suffix" },
    ],
    literalMeaning: "The Guide/One who shows the way",
  },

  // === HEALER/PROVIDER NAMES ===
  "चंगाकर्ता": {
    original: "चंगाकर्ता",
    parts: [
      { part: "चंगा", meaning: "Healing/Health", type: "root" },
      { part: "कर्ता", meaning: "Doer/One who does", type: "suffix" },
    ],
    literalMeaning: "The Healer",
  },
  "प्रदाता": {
    original: "प्रदाता",
    parts: [
      { part: "प्र", meaning: "Forward/Forth", type: "prefix" },
      { part: "दाता", meaning: "Giver", type: "root" },
    ],
    literalMeaning: "The Provider/Giver",
  },
  "पोषणकर्ता": {
    original: "पोषणकर्ता",
    parts: [
      { part: "पोषण", meaning: "Nourishment", type: "root" },
      { part: "कर्ता", meaning: "Doer", type: "suffix" },
    ],
    literalMeaning: "The Nourisher/Provider",
  },

  // === PEACE/COMFORT NAMES ===
  "शांतिदाता": {
    original: "शांतिदाता",
    parts: [
      { part: "शांति", meaning: "Peace", type: "root" },
      { part: "दाता", meaning: "Giver", type: "suffix" },
    ],
    literalMeaning: "The Giver of Peace",
  },
  "सांत्वनाकर्ता": {
    original: "सांत्वनाकर्ता",
    parts: [
      { part: "सांत्वना", meaning: "Comfort/Consolation", type: "root" },
      { part: "कर्ता", meaning: "Doer", type: "suffix" },
    ],
    literalMeaning: "The Comforter",
  },

  // === HOLY/RIGHTEOUS NAMES ===
  "पवित्र आत्मा": {
    original: "पवित्र आत्मा",
    parts: [
      { part: "पवित्र", meaning: "Holy/Sacred", type: "prefix" },
      { part: "आत्मा", meaning: "Spirit/Soul", type: "root" },
    ],
    literalMeaning: "The Holy Spirit",
  },
  "परमपवित्र": {
    original: "परमपवित्र",
    parts: [
      { part: "परम", meaning: "Supreme/Most", type: "prefix" },
      { part: "पवित्र", meaning: "Holy/Sacred", type: "root" },
    ],
    literalMeaning: "The Most Holy One",
  },

  // === ETERNAL NAMES ===
  "अनादि": {
    original: "अनादि",
    parts: [
      { part: "अ", meaning: "Without/No", type: "prefix" },
      { part: "आदि", meaning: "Beginning", type: "root" },
    ],
    literalMeaning: "The One without Beginning/Eternal",
  },
  "अनंत": {
    original: "अनंत",
    parts: [
      { part: "अ", meaning: "Without/No", type: "prefix" },
      { part: "अंत", meaning: "End", type: "root" },
    ],
    literalMeaning: "The Infinite/One without End",
  },
  "शाश्वत प्रभु": {
    original: "शाश्वत प्रभु",
    parts: [
      { part: "शाश्वत", meaning: "Eternal/Everlasting", type: "prefix" },
      { part: "प्रभु", meaning: "Lord", type: "root" },
    ],
    literalMeaning: "The Eternal Lord",
  },

  // === JUDGE/JUSTICE NAMES ===
  "न्यायी": {
    original: "न्यायी",
    parts: [
      { part: "न्याय", meaning: "Justice", type: "root" },
      { part: "ई", meaning: "One who is", type: "suffix" },
    ],
    literalMeaning: "The Just One/Judge",
  },
  "न्यायाधीश": {
    original: "न्यायाधीश",
    parts: [
      { part: "न्याय", meaning: "Justice", type: "root" },
      { part: "अधीश", meaning: "Lord/Master", type: "suffix" },
    ],
    literalMeaning: "The Lord of Justice/Supreme Judge",
  },

  // === WISDOM/KNOWLEDGE NAMES ===
  "ज्ञान का स्रोत": {
    original: "ज्ञान का स्रोत",
    parts: [
      { part: "ज्ञान", meaning: "Knowledge/Wisdom", type: "root" },
      { part: "का", meaning: "of", type: "connector" },
      { part: "स्रोत", meaning: "Source", type: "root" },
    ],
    literalMeaning: "The Source of Wisdom",
  },

  // === LIGHT/GLORY NAMES ===
  "ज्योति": {
    original: "ज्योति",
    parts: [
      { part: "ज्योति", meaning: "Light/Radiance", type: "root" },
    ],
    literalMeaning: "The Divine Light",
  },
  "प्रकाशदाता": {
    original: "प्रकाशदाता",
    parts: [
      { part: "प्रकाश", meaning: "Light", type: "root" },
      { part: "दाता", meaning: "Giver", type: "suffix" },
    ],
    literalMeaning: "The Giver of Light",
  },

  // === ROCK/FORTRESS NAMES ===
  "चट्टान": {
    original: "चट्टान",
    parts: [
      { part: "चट्टान", meaning: "Rock/Boulder", type: "root" },
    ],
    literalMeaning: "The Rock (Foundation of Faith)",
  },
  "दुर्ग": {
    original: "दुर्ग",
    parts: [
      { part: "दुर्ग", meaning: "Fortress/Stronghold", type: "root" },
    ],
    literalMeaning: "The Fortress",
  },
  "शरणस्थान": {
    original: "शरणस्थान",
    parts: [
      { part: "शरण", meaning: "Refuge/Shelter", type: "root" },
      { part: "स्थान", meaning: "Place", type: "suffix" },
    ],
    literalMeaning: "The Place of Refuge",
  },

  // === MERCY/LOVE NAMES ===
  "दयालु": {
    original: "दयालु",
    parts: [
      { part: "दया", meaning: "Mercy/Compassion", type: "root" },
      { part: "लु", meaning: "Full of", type: "suffix" },
    ],
    literalMeaning: "The Merciful One",
  },
  "करुणामय": {
    original: "करुणामय",
    parts: [
      { part: "करुणा", meaning: "Compassion", type: "root" },
      { part: "मय", meaning: "Full of/Made of", type: "suffix" },
    ],
    literalMeaning: "Full of Compassion",
  },
  "प्रेममय": {
    original: "प्रेममय",
    parts: [
      { part: "प्रेम", meaning: "Love", type: "root" },
      { part: "मय", meaning: "Full of", type: "suffix" },
    ],
    literalMeaning: "Full of Love",
  },
};

/**
 * Parse a Hindi divine name into its component parts
 */
export function parseHindiEtymology(name: string): EtymologyBreakdown | null {
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
 * Check if a name has Hindi etymology available
 */
export function hasHindiEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "hindi") return false;
  return parseHindiEtymology(name) !== null;
}

/**
 * Get all available Hindi etymologies
 */
export function getAllHindiEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
