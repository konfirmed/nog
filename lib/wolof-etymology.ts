// Wolof Etymology Parser
// Breaks down Wolof divine names into their component parts with meanings
// Wolof is a Niger-Congo language spoken in Senegal, Gambia, and Mauritania

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

// Common Wolof name components and their meanings
const WOLOF_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "yàlla": { meaning: "God (from Arabic Allah)", type: "root" },
  "borom": { meaning: "Lord/Owner/Master", type: "root" },
  "baay": { meaning: "Father", type: "root" },
  "buur": { meaning: "King", type: "root" },
  "kilifa": { meaning: "Master/Guardian", type: "root" },

  // Attribute roots
  "yéene": { meaning: "Mercy/Compassion", type: "root" },
  "sutura": { meaning: "Protection/Covering", type: "root" },
  "jamm": { meaning: "Peace", type: "root" },
  "dëgg": { meaning: "Truth", type: "root" },
  "rafet": { meaning: "Goodness/Beauty", type: "root" },
  "xel": { meaning: "Mind/Wisdom", type: "root" },
  "dooleel": { meaning: "Power/Strength", type: "root" },
  "set": { meaning: "Purity/Holiness", type: "root" },
  "njëg": { meaning: "Creation", type: "root" },

  // Descriptive elements
  "mag": { meaning: "Great/Elder", type: "prefix" },
  "bu": { meaning: "which/that", type: "connector" },
  "ci": { meaning: "in/at", type: "connector" },
  "gi": { meaning: "the", type: "connector" },
  "bi": { meaning: "the", type: "connector" },

  // Action/Agent markers
  "ki": { meaning: "one who/the one", type: "prefix" },
  "nit": { meaning: "person/being", type: "root" },
};

// Known Wolof compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "yàlla": {
    original: "Yàlla",
    parts: [
      { part: "Yàlla", meaning: "God (derived from Arabic 'Allah')", type: "root" },
    ],
    literalMeaning: "God - The Supreme Being",
  },
  "yàlla bu mag": {
    original: "Yàlla Bu Mag",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Bu", meaning: "Who is", type: "connector" },
      { part: "Mag", meaning: "Great/Supreme", type: "suffix" },
    ],
    literalMeaning: "God Who is Great/The Great God",
  },
  "borom asamaan": {
    original: "Borom Asamaan",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Asamaan", meaning: "Heaven/Sky", type: "root" },
    ],
    literalMeaning: "Lord of Heaven",
  },
  "borom bi": {
    original: "Borom Bi",
    parts: [
      { part: "Borom", meaning: "Lord/Owner", type: "root" },
      { part: "Bi", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Lord/The Master",
  },

  // === CREATOR NAMES ===
  "ki ëppal": {
    original: "Ki Ëppal",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Ëppal", meaning: "Created/Made", type: "root" },
    ],
    literalMeaning: "The Creator",
  },
  "borom njëg": {
    original: "Borom Njëg",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Njëg", meaning: "Creation", type: "root" },
    ],
    literalMeaning: "Lord of Creation",
  },

  // === FATHER NAMES ===
  "baay bi ci asamaan": {
    original: "Baay Bi ci Asamaan",
    parts: [
      { part: "Baay", meaning: "Father", type: "root" },
      { part: "Bi", meaning: "The", type: "connector" },
      { part: "ci", meaning: "in/at", type: "connector" },
      { part: "Asamaan", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "The Father in Heaven",
  },
  "sunu baay": {
    original: "Sunu Baay",
    parts: [
      { part: "Sunu", meaning: "Our", type: "prefix" },
      { part: "Baay", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Our Father",
  },

  // === KING NAMES ===
  "buur yi buur": {
    original: "Buur yi Buur",
    parts: [
      { part: "Buur", meaning: "King", type: "root" },
      { part: "yi", meaning: "of the", type: "connector" },
      { part: "Buur", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "borom yi borom": {
    original: "Borom yi Borom",
    parts: [
      { part: "Borom", meaning: "Lord", type: "root" },
      { part: "yi", meaning: "of the", type: "connector" },
      { part: "Borom", meaning: "Lords", type: "root" },
    ],
    literalMeaning: "Lord of Lords",
  },
  "buur bu dul dee": {
    original: "Buur Bu Dul Dee",
    parts: [
      { part: "Buur", meaning: "King", type: "root" },
      { part: "Bu", meaning: "Who", type: "connector" },
      { part: "Dul Dee", meaning: "Never dies", type: "root" },
    ],
    literalMeaning: "The King Who Never Dies/The Eternal King",
  },

  // === ALMIGHTY/POWER NAMES ===
  "yàlla bu am dooleel": {
    original: "Yàlla Bu Am Dooleel",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Bu", meaning: "Who", type: "connector" },
      { part: "Am", meaning: "Has", type: "connector" },
      { part: "Dooleel", meaning: "All Power", type: "root" },
    ],
    literalMeaning: "God Who Has All Power/The Almighty",
  },
  "ki am kàttan": {
    original: "Ki Am Kàttan",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Am", meaning: "Has", type: "connector" },
      { part: "Kàttan", meaning: "Strength/Might", type: "root" },
    ],
    literalMeaning: "The Mighty One",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "kilifa bu baax": {
    original: "Kilifa Bu Baax",
    parts: [
      { part: "Kilifa", meaning: "Guardian/Shepherd", type: "root" },
      { part: "Bu", meaning: "Who is", type: "connector" },
      { part: "Baax", meaning: "Good", type: "suffix" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "ki yor": {
    original: "Ki Yor",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Yor", meaning: "Keeps/Guards", type: "root" },
    ],
    literalMeaning: "The Guardian/Keeper",
  },
  "borom sutura": {
    original: "Borom Sutura",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Sutura", meaning: "Protection/Covering", type: "root" },
    ],
    literalMeaning: "Lord of Protection",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "ki musal": {
    original: "Ki Musal",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Musal", meaning: "Saves/Delivers", type: "root" },
    ],
    literalMeaning: "The Savior",
  },
  "ki fey": {
    original: "Ki Fey",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Fey", meaning: "Pays/Redeems", type: "root" },
    ],
    literalMeaning: "The Redeemer",
  },
  "ki moom": {
    original: "Ki Moom",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Moom", meaning: "Frees/Liberates", type: "root" },
    ],
    literalMeaning: "The Liberator/Deliverer",
  },

  // === HEALER/PROVIDER NAMES ===
  "ki wer": {
    original: "Ki Wer",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Wer", meaning: "Heals", type: "root" },
    ],
    literalMeaning: "The Healer",
  },
  "ki may": {
    original: "Ki May",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "May", meaning: "Gives", type: "root" },
    ],
    literalMeaning: "The Giver/Provider",
  },
  "borom barke": {
    original: "Borom Barke",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Barke", meaning: "Blessing/Provision", type: "root" },
    ],
    literalMeaning: "Lord of Blessing/The Provider",
  },

  // === MERCY/COMPASSION NAMES ===
  "yàlla yéene": {
    original: "Yàlla Yéene",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Yéene", meaning: "of Mercy", type: "root" },
    ],
    literalMeaning: "God of Mercy",
  },
  "ki am yéene": {
    original: "Ki Am Yéene",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Am", meaning: "Has", type: "connector" },
      { part: "Yéene", meaning: "Mercy/Compassion", type: "root" },
    ],
    literalMeaning: "The Merciful One",
  },
  "borom yéene": {
    original: "Borom Yéene",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Yéene", meaning: "Mercy", type: "root" },
    ],
    literalMeaning: "Lord of Mercy",
  },

  // === HOLY NAMES ===
  "ki set": {
    original: "Ki Set",
    parts: [
      { part: "Ki", meaning: "The One who is", type: "prefix" },
      { part: "Set", meaning: "Pure/Holy", type: "root" },
    ],
    literalMeaning: "The Holy One",
  },
  "xel gu set": {
    original: "Xel Gu Set",
    parts: [
      { part: "Xel", meaning: "Spirit", type: "root" },
      { part: "Gu", meaning: "Which is", type: "connector" },
      { part: "Set", meaning: "Holy/Pure", type: "suffix" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === PEACE NAMES ===
  "yàlla jamm": {
    original: "Yàlla Jamm",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Jamm", meaning: "of Peace", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "buur jamm": {
    original: "Buur Jamm",
    parts: [
      { part: "Buur", meaning: "Prince/King", type: "root" },
      { part: "Jamm", meaning: "of Peace", type: "root" },
    ],
    literalMeaning: "Prince of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "ki àtte": {
    original: "Ki Àtte",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Àtte", meaning: "Judges", type: "root" },
    ],
    literalMeaning: "The Judge",
  },
  "yàlla bu jub": {
    original: "Yàlla Bu Jub",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Bu", meaning: "Who is", type: "connector" },
      { part: "Jub", meaning: "Just/Righteous", type: "suffix" },
    ],
    literalMeaning: "The Just/Righteous God",
  },

  // === WISDOM NAMES ===
  "yàlla xel": {
    original: "Yàlla Xel",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Xel", meaning: "of Wisdom", type: "root" },
    ],
    literalMeaning: "God of Wisdom",
  },
  "borom xam-xam": {
    original: "Borom Xam-Xam",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Xam-Xam", meaning: "Knowledge (reduplicated)", type: "root" },
    ],
    literalMeaning: "Lord of Knowledge",
  },

  // === LIGHT/GLORY NAMES ===
  "leer bi àddina": {
    original: "Leer Bi Àddina",
    parts: [
      { part: "Leer", meaning: "Light", type: "root" },
      { part: "Bi", meaning: "of the", type: "connector" },
      { part: "Àddina", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "borom ndam": {
    original: "Borom Ndam",
    parts: [
      { part: "Borom", meaning: "Lord/Owner of", type: "root" },
      { part: "Ndam", meaning: "Glory/Honor", type: "root" },
    ],
    literalMeaning: "Lord of Glory",
  },

  // === ROCK/FORTRESS NAMES ===
  "doj bi": {
    original: "Doj Bi",
    parts: [
      { part: "Doj", meaning: "Rock/Stone", type: "root" },
      { part: "Bi", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Rock",
  },
  "bunt bu dul tëcc": {
    original: "Bunt Bu Dul Tëcc",
    parts: [
      { part: "Bunt", meaning: "Fortress/Stronghold", type: "root" },
      { part: "Bu", meaning: "Which", type: "connector" },
      { part: "Dul Tëcc", meaning: "Cannot be broken", type: "suffix" },
    ],
    literalMeaning: "The Unbreakable Fortress",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "ki dëgg": {
    original: "Ki Dëgg",
    parts: [
      { part: "Ki", meaning: "The One who is", type: "prefix" },
      { part: "Dëgg", meaning: "True/Faithful", type: "root" },
    ],
    literalMeaning: "The True/Faithful One",
  },
  "yàlla dëgg": {
    original: "Yàlla Dëgg",
    parts: [
      { part: "Yàlla", meaning: "God", type: "root" },
      { part: "Dëgg", meaning: "of Truth", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "ki dul dee": {
    original: "Ki Dul Dee",
    parts: [
      { part: "Ki", meaning: "The One who", type: "prefix" },
      { part: "Dul", meaning: "Cannot/Does not", type: "connector" },
      { part: "Dee", meaning: "Die", type: "root" },
    ],
    literalMeaning: "The One Who Cannot Die/The Eternal One",
  },
  "bu ne ba fellu": {
    original: "Bu Ne Ba Fellu",
    parts: [
      { part: "Bu", meaning: "Who", type: "connector" },
      { part: "Ne", meaning: "Is", type: "connector" },
      { part: "Ba Fellu", meaning: "Without end", type: "root" },
    ],
    literalMeaning: "The One Without End",
  },
};

/**
 * Parse a Wolof divine name into its component parts
 */
export function parseWolofEtymology(name: string): EtymologyBreakdown | null {
  // Normalize the name for lookup
  const normalizedName = name.trim().toLowerCase();

  // Check for exact match in known compounds
  if (KNOWN_COMPOUNDS[normalizedName]) {
    return KNOWN_COMPOUNDS[normalizedName];
  }

  // Check case-insensitive
  for (const [key, value] of Object.entries(KNOWN_COMPOUNDS)) {
    if (key.toLowerCase() === normalizedName) {
      return value;
    }
  }

  return null;
}

/**
 * Check if a name has Wolof etymology available
 */
export function hasWolofEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "wolof") return false;
  return parseWolofEtymology(name) !== null;
}

/**
 * Get all available Wolof etymologies
 */
export function getAllWolofEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
