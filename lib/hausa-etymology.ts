// Hausa Etymology Parser
// Breaks down Hausa divine names into their component parts with meanings
// Hausa is a Chadic language with Arabic/Islamic influence in religious vocabulary

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

// Common Hausa name components and their meanings
const HAUSA_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "allah": { meaning: "God (from Arabic)", type: "root" },
  "ubangiji": { meaning: "Lord/Master (indigenous)", type: "root" },
  "uba": { meaning: "Father", type: "root" },
  "sarki": { meaning: "King/Chief", type: "root" },
  "mai": { meaning: "Owner/Possessor of", type: "prefix" },

  // Attribute roots
  "iko": { meaning: "Power/Authority", type: "root" },
  "jinƙai": { meaning: "Mercy/Compassion", type: "root" },
  "ƙauna": { meaning: "Love", type: "root" },
  "adalci": { meaning: "Justice", type: "root" },
  "tsarki": { meaning: "Holiness/Purity", type: "root" },
  "hikima": { meaning: "Wisdom", type: "root" },
  "aminci": { meaning: "Faithfulness/Trust", type: "root" },
  "salama": { meaning: "Peace", type: "root" },
  "gaskiya": { meaning: "Truth", type: "root" },
  "ƙarfi": { meaning: "Strength", type: "root" },
  "dukan": { meaning: "All", type: "prefix" },
  "madawwami": { meaning: "Eternal", type: "root" },

  // Action/Agent markers
  "mahalicci": { meaning: "Creator", type: "root" },
  "mai ceto": { meaning: "Savior", type: "root" },

  // Connectors
  "na": { meaning: "of", type: "connector" },
  "da": { meaning: "and/with", type: "connector" },
};

// Known Hausa compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "ubangiji": {
    original: "Ubangiji",
    parts: [
      { part: "Uba", meaning: "Father/Master", type: "root" },
      { part: "n", meaning: "of", type: "connector" },
      { part: "giji", meaning: "House/Family", type: "root" },
    ],
    literalMeaning: "Lord/Master of the House (The Supreme Lord)",
  },
  "allah madaukakin sarki": {
    original: "Allah Madaukakin Sarki",
    parts: [
      { part: "Allah", meaning: "God", type: "root" },
      { part: "Madaukakin", meaning: "Most Exalted", type: "prefix" },
      { part: "Sarki", meaning: "King", type: "root" },
    ],
    literalMeaning: "God, the Most Exalted King",
  },
  "mafi girma": {
    original: "Mafi Girma",
    parts: [
      { part: "Mafi", meaning: "Most", type: "prefix" },
      { part: "Girma", meaning: "Greatness/Majesty", type: "root" },
    ],
    literalMeaning: "The Most High/Greatest One",
  },

  // === CREATOR NAMES ===
  "mahalicci": {
    original: "Mahalicci",
    parts: [
      { part: "Ma", meaning: "One who does", type: "prefix" },
      { part: "halicci", meaning: "Creation/Creating", type: "root" },
    ],
    literalMeaning: "The Creator",
  },
  "wanda ya halicci komai": {
    original: "Wanda Ya Halicci Komai",
    parts: [
      { part: "Wanda", meaning: "The One who", type: "prefix" },
      { part: "Ya", meaning: "He", type: "connector" },
      { part: "Halicci", meaning: "Created", type: "root" },
      { part: "Komai", meaning: "Everything", type: "root" },
    ],
    literalMeaning: "The One Who Created Everything",
  },

  // === ALMIGHTY/POWER NAMES ===
  "mai iko duka": {
    original: "Mai Iko Duka",
    parts: [
      { part: "Mai", meaning: "Owner/Possessor of", type: "prefix" },
      { part: "Iko", meaning: "Power/Authority", type: "root" },
      { part: "Duka", meaning: "All", type: "suffix" },
    ],
    literalMeaning: "The All-Powerful/Almighty",
  },
  "maɗaukaki": {
    original: "Maɗaukaki",
    parts: [
      { part: "Ma", meaning: "One who is", type: "prefix" },
      { part: "ɗaukaki", meaning: "Exalted/Elevated", type: "root" },
    ],
    literalMeaning: "The Exalted One",
  },
  "allah mai ƙarfi": {
    original: "Allah Mai Ƙarfi",
    parts: [
      { part: "Allah", meaning: "God", type: "root" },
      { part: "Mai", meaning: "Owner of", type: "prefix" },
      { part: "Ƙarfi", meaning: "Strength/Power", type: "root" },
    ],
    literalMeaning: "God of Strength",
  },

  // === FATHER NAMES ===
  "uba na sama": {
    original: "Uba na Sama",
    parts: [
      { part: "Uba", meaning: "Father", type: "root" },
      { part: "na", meaning: "of", type: "connector" },
      { part: "Sama", meaning: "Heaven/Sky", type: "root" },
    ],
    literalMeaning: "Father in Heaven",
  },
  "ubanmu": {
    original: "Ubanmu",
    parts: [
      { part: "Uba", meaning: "Father", type: "root" },
      { part: "n", meaning: "of", type: "connector" },
      { part: "mu", meaning: "us/our", type: "suffix" },
    ],
    literalMeaning: "Our Father",
  },

  // === KING NAMES ===
  "sarkin sarakuna": {
    original: "Sarkin Sarakuna",
    parts: [
      { part: "Sarkin", meaning: "King of", type: "root" },
      { part: "Sarakuna", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "ubangijin iyayengiji": {
    original: "Ubangijin Iyayengiji",
    parts: [
      { part: "Ubangijin", meaning: "Lord of", type: "root" },
      { part: "Iyayengiji", meaning: "Lords", type: "root" },
    ],
    literalMeaning: "Lord of Lords",
  },
  "sarki madawwami": {
    original: "Sarki Madawwami",
    parts: [
      { part: "Sarki", meaning: "King", type: "root" },
      { part: "Madawwami", meaning: "Eternal/Everlasting", type: "suffix" },
    ],
    literalMeaning: "The Eternal King",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "makiyayi nagari": {
    original: "Makiyayi Nagari",
    parts: [
      { part: "Makiyayi", meaning: "Shepherd", type: "root" },
      { part: "Nagari", meaning: "Good/Righteous", type: "suffix" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "mai kiyayewa": {
    original: "Mai Kiyayewa",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Kiyayewa", meaning: "Guarding/Protecting", type: "root" },
    ],
    literalMeaning: "The Protector/Guardian",
  },
  "mai tsaro": {
    original: "Mai Tsaro",
    parts: [
      { part: "Mai", meaning: "Owner/Provider of", type: "prefix" },
      { part: "Tsaro", meaning: "Protection/Security", type: "root" },
    ],
    literalMeaning: "The Protector",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "mai ceto": {
    original: "Mai Ceto",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Ceto", meaning: "Saving/Rescuing", type: "root" },
    ],
    literalMeaning: "The Savior",
  },
  "mai fansarwa": {
    original: "Mai Fansarwa",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Fansarwa", meaning: "Redeeming/Ransoming", type: "root" },
    ],
    literalMeaning: "The Redeemer",
  },
  "mai 'yantarwa": {
    original: "Mai 'Yantarwa",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "'Yantarwa", meaning: "Liberating/Freeing", type: "root" },
    ],
    literalMeaning: "The Deliverer/Liberator",
  },

  // === HEALER/PROVIDER NAMES ===
  "mai warkarwa": {
    original: "Mai Warkarwa",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Warkarwa", meaning: "Healing", type: "root" },
    ],
    literalMeaning: "The Healer",
  },
  "mai tanadi": {
    original: "Mai Tanadi",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Tanadi", meaning: "Providing/Preparing", type: "root" },
    ],
    literalMeaning: "The Provider",
  },
  "mai bayarwa": {
    original: "Mai Bayarwa",
    parts: [
      { part: "Mai", meaning: "One who does", type: "prefix" },
      { part: "Bayarwa", meaning: "Giving", type: "root" },
    ],
    literalMeaning: "The Giver",
  },

  // === MERCY/COMPASSION NAMES ===
  "mai jinƙai": {
    original: "Mai Jinƙai",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Jinƙai", meaning: "Mercy/Compassion", type: "root" },
    ],
    literalMeaning: "The Merciful One",
  },
  "mai tausayi": {
    original: "Mai Tausayi",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Tausayi", meaning: "Compassion/Sympathy", type: "root" },
    ],
    literalMeaning: "The Compassionate One",
  },
  "mai alheri": {
    original: "Mai Alheri",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Alheri", meaning: "Grace/Kindness", type: "root" },
    ],
    literalMeaning: "The Gracious One",
  },

  // === HOLY NAMES ===
  "mai tsarki": {
    original: "Mai Tsarki",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Tsarki", meaning: "Holiness/Purity", type: "root" },
    ],
    literalMeaning: "The Holy One",
  },
  "ruhu mai tsarki": {
    original: "Ruhu Mai Tsarki",
    parts: [
      { part: "Ruhu", meaning: "Spirit", type: "root" },
      { part: "Mai", meaning: "Having", type: "prefix" },
      { part: "Tsarki", meaning: "Holiness", type: "root" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === PEACE NAMES ===
  "allah na salama": {
    original: "Allah na Salama",
    parts: [
      { part: "Allah", meaning: "God", type: "root" },
      { part: "na", meaning: "of", type: "connector" },
      { part: "Salama", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "sarkin salama": {
    original: "Sarkin Salama",
    parts: [
      { part: "Sarkin", meaning: "Prince/King of", type: "root" },
      { part: "Salama", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "Prince of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "mai shari'a": {
    original: "Mai Shari'a",
    parts: [
      { part: "Mai", meaning: "One who has/does", type: "prefix" },
      { part: "Shari'a", meaning: "Judgment/Law", type: "root" },
    ],
    literalMeaning: "The Judge",
  },
  "mai adalci": {
    original: "Mai Adalci",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Adalci", meaning: "Justice/Righteousness", type: "root" },
    ],
    literalMeaning: "The Just/Righteous One",
  },

  // === WISDOM NAMES ===
  "mai hikima": {
    original: "Mai Hikima",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Hikima", meaning: "Wisdom", type: "root" },
    ],
    literalMeaning: "The Wise One",
  },

  // === LIGHT/GLORY NAMES ===
  "hasken duniya": {
    original: "Hasken Duniya",
    parts: [
      { part: "Hasken", meaning: "Light of", type: "root" },
      { part: "Duniya", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "mai ɗaukaka": {
    original: "Mai Ɗaukaka",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Ɗaukaka", meaning: "Glory/Exaltation", type: "root" },
    ],
    literalMeaning: "The Glorious One",
  },

  // === ROCK/FORTRESS NAMES ===
  "dutsen kariya": {
    original: "Dutsen Kariya",
    parts: [
      { part: "Dutsen", meaning: "Rock of", type: "root" },
      { part: "Kariya", meaning: "Protection", type: "root" },
    ],
    literalMeaning: "Rock of Protection",
  },
  "mafaka": {
    original: "Mafaka",
    parts: [
      { part: "Ma", meaning: "Place of", type: "prefix" },
      { part: "faka", meaning: "Refuge/Shelter", type: "root" },
    ],
    literalMeaning: "The Refuge/Fortress",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "mai aminci": {
    original: "Mai Aminci",
    parts: [
      { part: "Mai", meaning: "One who has", type: "prefix" },
      { part: "Aminci", meaning: "Faithfulness/Trust", type: "root" },
    ],
    literalMeaning: "The Faithful One",
  },
  "allah na gaskiya": {
    original: "Allah na Gaskiya",
    parts: [
      { part: "Allah", meaning: "God", type: "root" },
      { part: "na", meaning: "of", type: "connector" },
      { part: "Gaskiya", meaning: "Truth", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "madawwami": {
    original: "Madawwami",
    parts: [
      { part: "Ma", meaning: "One who is", type: "prefix" },
      { part: "dawwami", meaning: "Eternal/Everlasting", type: "root" },
    ],
    literalMeaning: "The Eternal One",
  },
  "wanda yake har abada": {
    original: "Wanda Yake Har Abada",
    parts: [
      { part: "Wanda", meaning: "The One who", type: "prefix" },
      { part: "Yake", meaning: "Is", type: "connector" },
      { part: "Har Abada", meaning: "Forever", type: "root" },
    ],
    literalMeaning: "The One Who Is Forever",
  },
};

/**
 * Parse a Hausa divine name into its component parts
 */
export function parseHausaEtymology(name: string): EtymologyBreakdown | null {
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
 * Check if a name has Hausa etymology available
 */
export function hasHausaEtymology(name: string, language: string): boolean {
  if (language.toLowerCase() !== "hausa") return false;
  return parseHausaEtymology(name) !== null;
}

/**
 * Get all available Hausa etymologies
 */
export function getAllHausaEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
