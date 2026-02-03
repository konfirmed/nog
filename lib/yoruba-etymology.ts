// Yoruba Etymology Parser
// Breaks down compound Yoruba names into their component parts with meanings

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

// Common Yoruba name components and their meanings
const YORUBA_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Prefixes - ownership/possession
  "ọlọ́run": { meaning: "Owner of heaven (God)", type: "root" },
  "olú": { meaning: "Lord/Owner/Head", type: "prefix" },
  "ọba": { meaning: "King", type: "prefix" },
  "alá": { meaning: "Owner of", type: "prefix" },
  "aláà": { meaning: "Owner of (emphatic)", type: "prefix" },
  "elé": { meaning: "Owner of", type: "prefix" },
  "ẹlẹ́": { meaning: "Owner of", type: "prefix" },
  "oni": { meaning: "Owner/Possessor of", type: "prefix" },
  "a": { meaning: "One who", type: "prefix" },

  // Roots - divine attributes
  "ọrun": { meaning: "heaven/sky", type: "root" },
  "ayé": { meaning: "world/earth/life", type: "root" },
  "àìyé": { meaning: "earth/world", type: "root" },
  "dàá": { meaning: "creation/to create", type: "root" },
  "ẹ̀dá": { meaning: "creation/creature", type: "root" },
  "àánú": { meaning: "mercy/compassion", type: "root" },
  "agbára": { meaning: "power/strength", type: "root" },
  "ọ̀fẹ́": { meaning: "grace/free gift", type: "root" },
  "àlàáfíà": { meaning: "peace/well-being", type: "root" },
  "ìmọ̀": { meaning: "knowledge/wisdom", type: "root" },
  "ìfẹ́": { meaning: "love", type: "root" },
  "ìgbàlà": { meaning: "salvation/deliverance", type: "root" },
  "ìtunu": { meaning: "comfort/consolation", type: "root" },
  "ọ̀nà": { meaning: "way/path", type: "root" },
  "ogo": { meaning: "glory/honor", type: "root" },
  "ìṣẹ́gun": { meaning: "victory", type: "root" },
  "ibùkún": { meaning: "blessing", type: "root" },
  "ẹ̀tọ́": { meaning: "justice/righteousness", type: "root" },
  "òtítọ́": { meaning: "truth/faithfulness", type: "root" },
  "ìrànwọ́": { meaning: "help/assistance", type: "root" },
  "àbò": { meaning: "protection/defense", type: "root" },
  "apata": { meaning: "rock/stone", type: "root" },
  "ọkàn": { meaning: "heart/soul", type: "root" },
  "ẹ̀mí": { meaning: "spirit/breath", type: "root" },
  "mímọ́": { meaning: "holy/pure", type: "root" },

  // Descriptive roots
  "gbogbo": { meaning: "all/every", type: "root" },
  "àìyerayé": { meaning: "everlasting/eternal", type: "root" },
  "àgbà": { meaning: "elder/ancient", type: "root" },
  "nlá": { meaning: "great/big", type: "root" },
  "ga": { meaning: "high/exalted", type: "root" },

  // Action roots
  "dá": { meaning: "to create", type: "root" },
  "gbà": { meaning: "to save/receive", type: "root" },
  "ṣe": { meaning: "to do/make", type: "root" },
  "tọ́": { meaning: "to lead/guide", type: "root" },
  "ṣọ́": { meaning: "to watch/guard", type: "root" },
  "wò": { meaning: "to heal/look after", type: "root" },
  "fún": { meaning: "to give", type: "root" },
  "jọba": { meaning: "to reign", type: "root" },

  // Connectors
  "ti": { meaning: "that/which/of", type: "connector" },
  "àti": { meaning: "and", type: "connector" },
  "tó": { meaning: "who/that", type: "connector" },
  "ní": { meaning: "in/at/with", type: "connector" },
  "lórí": { meaning: "upon/over", type: "connector" },

  // Common compound endings
  "marè": { meaning: "supreme/ultimate", type: "suffix" },
  "dùmarè": { meaning: "supreme being", type: "suffix" },
};

// Known compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  "olódùmarè": {
    original: "Olódùmarè",
    parts: [
      { part: "Ol(ú)", meaning: "Owner/Lord", type: "prefix" },
      { part: "ó", meaning: "who", type: "connector" },
      { part: "dù", meaning: "dark/deep", type: "root" },
      { part: "marè", meaning: "never ends", type: "suffix" },
    ],
    literalMeaning: "The Owner who is infinitely deep/The Supreme One who never ends",
  },
  "elédùmarè": {
    original: "Elédùmarè",
    parts: [
      { part: "Elé", meaning: "Owner of", type: "prefix" },
      { part: "dù", meaning: "dark/deep", type: "root" },
      { part: "marè", meaning: "never ends", type: "suffix" },
    ],
    literalMeaning: "Owner of infinite depth/The Supreme Creator",
  },
  "ọlọ́run ẹlẹ́dàá": {
    original: "Ọlọ́run Ẹlẹ́dàá",
    parts: [
      { part: "Ọl(ú)", meaning: "Owner", type: "prefix" },
      { part: "ọ́run", meaning: "heaven", type: "root" },
      { part: "Ẹlẹ́", meaning: "Owner of", type: "prefix" },
      { part: "dàá", meaning: "creation", type: "root" },
    ],
    literalMeaning: "Owner of heaven who owns creation / God the Creator",
  },
  "aláàánú": {
    original: "Aláàánú",
    parts: [
      { part: "Aláà", meaning: "Owner of", type: "prefix" },
      { part: "ànú", meaning: "mercy/compassion", type: "root" },
    ],
    literalMeaning: "Owner of mercy / The Merciful One",
  },
  "alágbára": {
    original: "Alágbára",
    parts: [
      { part: "Al(á)", meaning: "Owner of", type: "prefix" },
      { part: "agbára", meaning: "power/strength", type: "root" },
    ],
    literalMeaning: "Owner of power / The Powerful One",
  },
  "olúgbàlà": {
    original: "Olúgbàlà",
    parts: [
      { part: "Olú", meaning: "Lord/Owner", type: "prefix" },
      { part: "ìgbàlà", meaning: "salvation/deliverance", type: "root" },
    ],
    literalMeaning: "Lord of salvation / Savior",
  },
  "olúwa": {
    original: "Olúwa",
    parts: [
      { part: "Olú", meaning: "Owner/Head", type: "prefix" },
      { part: "wa", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "Our Lord/Master",
  },
  "ọba ọrun": {
    original: "Ọba Ọrun",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Ọrun", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "King of Heaven",
  },
  "ọba àìyé àti ọ̀run": {
    original: "Oba Àìyé àti Ọ̀run",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Àìyé", meaning: "Earth/World", type: "root" },
      { part: "àti", meaning: "and", type: "connector" },
      { part: "Ọ̀run", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "King of Earth and Heaven",
  },
  "olùṣọ́": {
    original: "Olùṣọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "ṣọ́", meaning: "watches/guards", type: "root" },
    ],
    literalMeaning: "The One who watches/guards / Shepherd",
  },
  "adagba má p'arọ́": {
    original: "Adagba Má P'arọ́",
    parts: [
      { part: "A", meaning: "One who", type: "prefix" },
      { part: "dàgbà", meaning: "grows old/ages", type: "root" },
      { part: "má", meaning: "does not", type: "connector" },
      { part: "p'arọ́", meaning: "tell lies/change", type: "root" },
    ],
    literalMeaning: "One who ages but does not change / The Immutable One",
  },
  "ọba ogo": {
    original: "Ọba Ogo",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Ogo", meaning: "Glory", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },
  "olú-ìmọ̀": {
    original: "Olú-Imọ̀",
    parts: [
      { part: "Olú", meaning: "Lord/Source", type: "prefix" },
      { part: "Ìmọ̀", meaning: "Knowledge/Wisdom", type: "root" },
    ],
    literalMeaning: "Lord/Source of Knowledge",
  },
  "ọlọ́run ìfẹ́": {
    original: "Ọlọ́run Ìfẹ́",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Ìfẹ́", meaning: "Love", type: "root" },
    ],
    literalMeaning: "God of Love",
  },
  "ọlọ́run itunu": {
    original: "Ọlọ́run Itunu",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Itunu", meaning: "Comfort", type: "root" },
    ],
    literalMeaning: "God of Comfort",
  },
  "alábò": {
    original: "Alábò",
    parts: [
      { part: "Al(á)", meaning: "Owner of", type: "prefix" },
      { part: "àbò", meaning: "protection/shield", type: "root" },
    ],
    literalMeaning: "Owner of protection / The Defender",
  },
  "aríbùkún": {
    original: "Aríbùkún",
    parts: [
      { part: "A", meaning: "One who", type: "prefix" },
      { part: "rí", meaning: "has/possesses", type: "root" },
      { part: "ìbùkún", meaning: "blessing", type: "root" },
    ],
    literalMeaning: "One who has blessing / The Blessing Giver",
  },
};

/**
 * Normalize a Yoruba name for lookup (lowercase, handle diacritics)
 */
function normalizeForLookup(name: string): string {
  return name
    .toLowerCase()
    .replace(/[']/g, "'")
    .trim();
}

/**
 * Parse a Yoruba name and return its etymology breakdown
 */
export function parseYorubaEtymology(name: string): EtymologyBreakdown | null {
  const normalized = normalizeForLookup(name);

  // Check if we have a known compound
  if (KNOWN_COMPOUNDS[normalized]) {
    return KNOWN_COMPOUNDS[normalized];
  }

  // Try to find partial matches in known compounds
  for (const [key, breakdown] of Object.entries(KNOWN_COMPOUNDS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return breakdown;
    }
  }

  // Attempt basic parsing for simple compounds
  const parts: EtymologyPart[] = [];

  // Check for common prefixes
  const prefixes = ["ọlọ́run", "olú", "ọba", "aláà", "alá", "ẹlẹ́", "elé", "oni", "olù"];
  for (const prefix of prefixes) {
    if (normalized.startsWith(prefix)) {
      const component = YORUBA_COMPONENTS[prefix];
      if (component) {
        parts.push({
          part: prefix.charAt(0).toUpperCase() + prefix.slice(1),
          meaning: component.meaning,
          type: component.type,
        });
        break;
      }
    }
  }

  // If we found parts, return partial breakdown
  if (parts.length > 0) {
    return {
      original: name,
      parts,
      literalMeaning: `Compound name starting with "${parts[0].meaning}"`,
    };
  }

  return null;
}

/**
 * Check if a name is Yoruba and might have etymology available
 */
export function hasYorubaEtymology(name: string, language: string): boolean {
  if (language !== "yoruba") return false;
  return parseYorubaEtymology(name) !== null;
}
