// Welsh Etymology Parser
// Breaks down Welsh divine names into their component parts with meanings
// Welsh is a Celtic language with rich poetic and religious vocabulary

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

// Common Welsh name components and their meanings
const WELSH_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "duw": { meaning: "God", type: "root" },
  "arglwydd": { meaning: "Lord", type: "root" },
  "tad": { meaning: "Father", type: "root" },
  "brenin": { meaning: "King", type: "root" },
  "ysbryd": { meaning: "Spirit", type: "root" },

  // Attribute roots
  "sanctaidd": { meaning: "Holy/Sacred", type: "root" },
  "trugarog": { meaning: "Merciful", type: "root" },
  "cyfiawn": { meaning: "Just/Righteous", type: "root" },
  "doeth": { meaning: "Wise", type: "root" },
  "cariad": { meaning: "Love", type: "root" },
  "heddwch": { meaning: "Peace", type: "root" },
  "goleuni": { meaning: "Light", type: "root" },
  "nerth": { meaning: "Strength/Power", type: "root" },
  "gwirionedd": { meaning: "Truth", type: "root" },
  "ffyddlon": { meaning: "Faithful", type: "root" },
  "tragwyddol": { meaning: "Eternal", type: "root" },

  // Action/Agent markers
  "creawdwr": { meaning: "Creator", type: "root" },
  "gwaredwr": { meaning: "Savior/Deliverer", type: "root" },
  "iachawdwr": { meaning: "Healer/Savior", type: "root" },
  "bugail": { meaning: "Shepherd", type: "root" },
  "barnwr": { meaning: "Judge", type: "root" },

  // Intensifiers/Modifiers
  "hollalluog": { meaning: "Almighty", type: "prefix" },
  "goruchaf": { meaning: "Most High/Supreme", type: "prefix" },
  "mawr": { meaning: "Great", type: "suffix" },

  // Connectors
  "y": { meaning: "the", type: "connector" },
  "yr": { meaning: "the (before vowel)", type: "connector" },
  "o": { meaning: "of/from", type: "connector" },
  "a": { meaning: "and", type: "connector" },
  "ein": { meaning: "our", type: "prefix" },
  "fy": { meaning: "my", type: "prefix" },
};

// Known Welsh compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "duw hollalluog": {
    original: "Duw Hollalluog",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Hollalluog", meaning: "Almighty/All-Powerful", type: "suffix" },
    ],
    literalMeaning: "God Almighty",
  },
  "y goruchaf": {
    original: "Y Goruchaf",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Goruchaf", meaning: "Most High/Supreme", type: "root" },
    ],
    literalMeaning: "The Most High",
  },
  "yr arglwydd dduw": {
    original: "Yr Arglwydd Dduw",
    parts: [
      { part: "Yr", meaning: "The", type: "connector" },
      { part: "Arglwydd", meaning: "Lord", type: "root" },
      { part: "Dduw", meaning: "God (mutated)", type: "root" },
    ],
    literalMeaning: "The Lord God",
  },

  // === CREATOR NAMES ===
  "y creawdwr": {
    original: "Y Creawdwr",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Creawdwr", meaning: "Creator", type: "root" },
    ],
    literalMeaning: "The Creator",
  },
  "creawdwr nef a daear": {
    original: "Creawdwr Nef a Daear",
    parts: [
      { part: "Creawdwr", meaning: "Creator", type: "root" },
      { part: "Nef", meaning: "Heaven", type: "root" },
      { part: "a", meaning: "and", type: "connector" },
      { part: "Daear", meaning: "Earth", type: "root" },
    ],
    literalMeaning: "Creator of Heaven and Earth",
  },

  // === FATHER NAMES ===
  "ein tad": {
    original: "Ein Tad",
    parts: [
      { part: "Ein", meaning: "Our", type: "prefix" },
      { part: "Tad", meaning: "Father", type: "root" },
    ],
    literalMeaning: "Our Father",
  },
  "tad nefol": {
    original: "Tad Nefol",
    parts: [
      { part: "Tad", meaning: "Father", type: "root" },
      { part: "Nefol", meaning: "Heavenly", type: "suffix" },
    ],
    literalMeaning: "Heavenly Father",
  },
  "y tad tragwyddol": {
    original: "Y Tad Tragwyddol",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Tad", meaning: "Father", type: "root" },
      { part: "Tragwyddol", meaning: "Eternal/Everlasting", type: "suffix" },
    ],
    literalMeaning: "The Eternal Father",
  },

  // === KING NAMES ===
  "brenin y brenhinoedd": {
    original: "Brenin y Brenhinoedd",
    parts: [
      { part: "Brenin", meaning: "King", type: "root" },
      { part: "y", meaning: "of the", type: "connector" },
      { part: "Brenhinoedd", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "arglwydd yr arglwyddi": {
    original: "Arglwydd yr Arglwyddi",
    parts: [
      { part: "Arglwydd", meaning: "Lord", type: "root" },
      { part: "yr", meaning: "of the", type: "connector" },
      { part: "Arglwyddi", meaning: "Lords", type: "root" },
    ],
    literalMeaning: "Lord of Lords",
  },
  "y brenin tragwyddol": {
    original: "Y Brenin Tragwyddol",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Brenin", meaning: "King", type: "root" },
      { part: "Tragwyddol", meaning: "Eternal", type: "suffix" },
    ],
    literalMeaning: "The Eternal King",
  },

  // === SHEPHERD NAMES ===
  "y bugail da": {
    original: "Y Bugail Da",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Bugail", meaning: "Shepherd", type: "root" },
      { part: "Da", meaning: "Good", type: "suffix" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "bugail fy enaid": {
    original: "Bugail fy Enaid",
    parts: [
      { part: "Bugail", meaning: "Shepherd", type: "root" },
      { part: "fy", meaning: "my", type: "connector" },
      { part: "Enaid", meaning: "Soul", type: "root" },
    ],
    literalMeaning: "Shepherd of my Soul",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "gwaredwr": {
    original: "Gwaredwr",
    parts: [
      { part: "Gwared", meaning: "Rescue/Deliver", type: "root" },
      { part: "wr", meaning: "one who (agent)", type: "suffix" },
    ],
    literalMeaning: "The Deliverer/Savior",
  },
  "iachawdwr": {
    original: "Iachawdwr",
    parts: [
      { part: "Iach", meaning: "Health/Healing", type: "root" },
      { part: "awdwr", meaning: "one who gives/does", type: "suffix" },
    ],
    literalMeaning: "The Savior/Healer",
  },
  "prynwr": {
    original: "Prynwr",
    parts: [
      { part: "Pryn", meaning: "Ransom/Redeem", type: "root" },
      { part: "wr", meaning: "one who", type: "suffix" },
    ],
    literalMeaning: "The Redeemer",
  },

  // === HEALER/PROVIDER NAMES ===
  "meddyg yr enaid": {
    original: "Meddyg yr Enaid",
    parts: [
      { part: "Meddyg", meaning: "Physician/Healer", type: "root" },
      { part: "yr", meaning: "of the", type: "connector" },
      { part: "Enaid", meaning: "Soul", type: "root" },
    ],
    literalMeaning: "Healer of the Soul",
  },
  "y darpariwr": {
    original: "Y Darpariwr",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Darpariwr", meaning: "Provider", type: "root" },
    ],
    literalMeaning: "The Provider",
  },
  "rhoddwr pob daioni": {
    original: "Rhoddwr Pob Daioni",
    parts: [
      { part: "Rhoddwr", meaning: "Giver", type: "root" },
      { part: "Pob", meaning: "Every/All", type: "connector" },
      { part: "Daioni", meaning: "Good thing/Goodness", type: "root" },
    ],
    literalMeaning: "Giver of All Good Things",
  },

  // === MERCY/COMPASSION NAMES ===
  "y duw trugarog": {
    original: "Y Duw Trugarog",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Trugarog", meaning: "Merciful", type: "suffix" },
    ],
    literalMeaning: "The Merciful God",
  },
  "tad trugaredd": {
    original: "Tad Trugaredd",
    parts: [
      { part: "Tad", meaning: "Father", type: "root" },
      { part: "Trugaredd", meaning: "Mercy/Compassion", type: "root" },
    ],
    literalMeaning: "Father of Mercy",
  },
  "duw gras": {
    original: "Duw Gras",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Gras", meaning: "Grace", type: "root" },
    ],
    literalMeaning: "God of Grace",
  },

  // === HOLY NAMES ===
  "y sanctaidd un": {
    original: "Y Sanctaidd Un",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Sanctaidd", meaning: "Holy/Sacred", type: "prefix" },
      { part: "Un", meaning: "One", type: "root" },
    ],
    literalMeaning: "The Holy One",
  },
  "yr ysbryd glân": {
    original: "Yr Ysbryd Glân",
    parts: [
      { part: "Yr", meaning: "The", type: "connector" },
      { part: "Ysbryd", meaning: "Spirit", type: "root" },
      { part: "Glân", meaning: "Holy/Pure/Clean", type: "suffix" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === PEACE NAMES ===
  "duw tangnefedd": {
    original: "Duw Tangnefedd",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Tangnefedd", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "tywysog tangnefedd": {
    original: "Tywysog Tangnefedd",
    parts: [
      { part: "Tywysog", meaning: "Prince", type: "root" },
      { part: "Tangnefedd", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "Prince of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "y barnwr cyfiawn": {
    original: "Y Barnwr Cyfiawn",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Barnwr", meaning: "Judge", type: "root" },
      { part: "Cyfiawn", meaning: "Just/Righteous", type: "suffix" },
    ],
    literalMeaning: "The Righteous Judge",
  },
  "duw cyfiawnder": {
    original: "Duw Cyfiawnder",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Cyfiawnder", meaning: "Justice/Righteousness", type: "root" },
    ],
    literalMeaning: "God of Justice",
  },

  // === WISDOM NAMES ===
  "duw doethineb": {
    original: "Duw Doethineb",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Doethineb", meaning: "Wisdom", type: "root" },
    ],
    literalMeaning: "God of Wisdom",
  },
  "ffynnon doethineb": {
    original: "Ffynnon Doethineb",
    parts: [
      { part: "Ffynnon", meaning: "Fountain/Source", type: "root" },
      { part: "Doethineb", meaning: "Wisdom", type: "root" },
    ],
    literalMeaning: "Fountain of Wisdom",
  },

  // === LIGHT/GLORY NAMES ===
  "goleuni'r byd": {
    original: "Goleuni'r Byd",
    parts: [
      { part: "Goleuni", meaning: "Light", type: "root" },
      { part: "'r", meaning: "of the", type: "connector" },
      { part: "Byd", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "brenin y gogoniant": {
    original: "Brenin y Gogoniant",
    parts: [
      { part: "Brenin", meaning: "King", type: "root" },
      { part: "y", meaning: "of", type: "connector" },
      { part: "Gogoniant", meaning: "Glory", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },

  // === ROCK/FORTRESS NAMES ===
  "y graig": {
    original: "Y Graig",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Graig", meaning: "Rock", type: "root" },
    ],
    literalMeaning: "The Rock",
  },
  "craig yr oesoedd": {
    original: "Craig yr Oesoedd",
    parts: [
      { part: "Craig", meaning: "Rock", type: "root" },
      { part: "yr", meaning: "of the", type: "connector" },
      { part: "Oesoedd", meaning: "Ages", type: "root" },
    ],
    literalMeaning: "Rock of Ages",
  },
  "tŵr cadarn": {
    original: "Tŵr Cadarn",
    parts: [
      { part: "Tŵr", meaning: "Tower", type: "root" },
      { part: "Cadarn", meaning: "Strong/Mighty", type: "suffix" },
    ],
    literalMeaning: "Strong Tower/Fortress",
  },
  "noddfa": {
    original: "Noddfa",
    parts: [
      { part: "Nodd", meaning: "Refuge/Protection", type: "root" },
      { part: "fa", meaning: "place", type: "suffix" },
    ],
    literalMeaning: "Place of Refuge",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "y ffyddlon un": {
    original: "Y Ffyddlon Un",
    parts: [
      { part: "Y", meaning: "The", type: "connector" },
      { part: "Ffyddlon", meaning: "Faithful", type: "prefix" },
      { part: "Un", meaning: "One", type: "root" },
    ],
    literalMeaning: "The Faithful One",
  },
  "duw gwirionedd": {
    original: "Duw Gwirionedd",
    parts: [
      { part: "Duw", meaning: "God", type: "root" },
      { part: "Gwirionedd", meaning: "Truth", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "yr un tragwyddol": {
    original: "Yr Un Tragwyddol",
    parts: [
      { part: "Yr", meaning: "The", type: "connector" },
      { part: "Un", meaning: "One", type: "root" },
      { part: "Tragwyddol", meaning: "Eternal/Everlasting", type: "suffix" },
    ],
    literalMeaning: "The Eternal One",
  },
  "yr alffa a'r omega": {
    original: "Yr Alffa a'r Omega",
    parts: [
      { part: "Yr", meaning: "The", type: "connector" },
      { part: "Alffa", meaning: "Alpha (First)", type: "root" },
      { part: "a'r", meaning: "and the", type: "connector" },
      { part: "Omega", meaning: "Omega (Last)", type: "root" },
    ],
    literalMeaning: "The Alpha and the Omega",
  },
  "yr hwn sydd": {
    original: "Yr Hwn Sydd",
    parts: [
      { part: "Yr", meaning: "The", type: "connector" },
      { part: "Hwn", meaning: "One", type: "root" },
      { part: "Sydd", meaning: "Who Is", type: "suffix" },
    ],
    literalMeaning: "The One Who Is (I AM)",
  },

  // === COMFORT NAMES ===
  "diddanydd": {
    original: "Diddanydd",
    parts: [
      { part: "Diddanu", meaning: "To comfort/console", type: "root" },
      { part: "ydd", meaning: "one who", type: "suffix" },
    ],
    literalMeaning: "The Comforter",
  },
};

/**
 * Parse a Welsh divine name into its component parts
 */
export function parseWelshEtymology(name: string): EtymologyBreakdown | null {
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
 * Check if a name has Welsh etymology available
 */
export function hasWelshEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "welsh") return false;
  return parseWelshEtymology(name) !== null;
}

/**
 * Get all available Welsh etymologies
 */
export function getAllWelshEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
