// Haitian Creole Etymology Parser
// Breaks down Haitian Creole divine names into their component parts with meanings
// Haitian Creole is a French-based creole with African substrate influences

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

// Common Haitian Creole name components and their meanings
const HAITIAN_CREOLE_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots (French-derived)
  "bondye": { meaning: "God (from French 'Bon Dieu')", type: "root" },
  "senyè": { meaning: "Lord (from French 'Seigneur')", type: "root" },
  "papa": { meaning: "Father", type: "root" },
  "wa": { meaning: "King (from French 'Roi')", type: "root" },
  "mèt": { meaning: "Master (from French 'Maître')", type: "root" },
  "lespri": { meaning: "Spirit (from French 'L'esprit')", type: "root" },

  // Attribute roots
  "pouvwa": { meaning: "Power", type: "root" },
  "mizèrikòd": { meaning: "Mercy", type: "root" },
  "lajistis": { meaning: "Justice", type: "root" },
  "lapè": { meaning: "Peace", type: "root" },
  "laverite": { meaning: "Truth", type: "root" },
  "lanmou": { meaning: "Love", type: "root" },
  "sajès": { meaning: "Wisdom", type: "root" },
  "limyè": { meaning: "Light", type: "root" },
  "sen": { meaning: "Holy/Saint (from French 'Saint')", type: "prefix" },

  // Descriptive elements
  "tout": { meaning: "All", type: "prefix" },
  "gran": { meaning: "Great (from French 'Grand')", type: "prefix" },
  "etènèl": { meaning: "Eternal (from French 'Éternel')", type: "prefix" },
  "bon": { meaning: "Good (from French 'Bon')", type: "prefix" },

  // Connectors
  "ki": { meaning: "who/which", type: "connector" },
  "nan": { meaning: "in", type: "connector" },
  "a": { meaning: "the/of", type: "connector" },
  "la": { meaning: "the", type: "connector" },
};

// Known Haitian Creole compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === SUPREME BEING NAMES ===
  "bondye": {
    original: "Bondye",
    parts: [
      { part: "Bon", meaning: "Good", type: "prefix" },
      { part: "Dye", meaning: "God (from French 'Dieu')", type: "root" },
    ],
    literalMeaning: "The Good God (primary name for God in Haitian Creole)",
  },
  "gran mèt la": {
    original: "Gran Mèt La",
    parts: [
      { part: "Gran", meaning: "Great", type: "prefix" },
      { part: "Mèt", meaning: "Master", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Great Master",
  },
  "pi wo a": {
    original: "Pi Wo A",
    parts: [
      { part: "Pi", meaning: "Most", type: "prefix" },
      { part: "Wo", meaning: "High", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Most High",
  },

  // === CREATOR NAMES ===
  "kreyatè a": {
    original: "Kreyatè A",
    parts: [
      { part: "Kreyatè", meaning: "Creator (from French 'Créateur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Creator",
  },
  "moun ki kreye tout bagay": {
    original: "Moun Ki Kreye Tout Bagay",
    parts: [
      { part: "Moun", meaning: "One/Person", type: "root" },
      { part: "Ki", meaning: "Who", type: "connector" },
      { part: "Kreye", meaning: "Created", type: "root" },
      { part: "Tout Bagay", meaning: "Everything", type: "root" },
    ],
    literalMeaning: "The One Who Created Everything",
  },

  // === FATHER NAMES ===
  "papa nou ki nan syèl la": {
    original: "Papa Nou Ki Nan Syèl La",
    parts: [
      { part: "Papa", meaning: "Father", type: "root" },
      { part: "Nou", meaning: "Our", type: "connector" },
      { part: "Ki Nan", meaning: "Who is in", type: "connector" },
      { part: "Syèl La", meaning: "Heaven (the)", type: "root" },
    ],
    literalMeaning: "Our Father Who is in Heaven",
  },
  "papa etènèl": {
    original: "Papa Etènèl",
    parts: [
      { part: "Papa", meaning: "Father", type: "root" },
      { part: "Etènèl", meaning: "Eternal", type: "suffix" },
    ],
    literalMeaning: "The Eternal Father",
  },
  "papa nou": {
    original: "Papa Nou",
    parts: [
      { part: "Papa", meaning: "Father", type: "root" },
      { part: "Nou", meaning: "Our", type: "suffix" },
    ],
    literalMeaning: "Our Father",
  },

  // === KING NAMES ===
  "wa dè wa yo": {
    original: "Wa Dè Wa Yo",
    parts: [
      { part: "Wa", meaning: "King", type: "root" },
      { part: "Dè", meaning: "of the", type: "connector" },
      { part: "Wa Yo", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "senyè dè senyè yo": {
    original: "Senyè Dè Senyè Yo",
    parts: [
      { part: "Senyè", meaning: "Lord", type: "root" },
      { part: "Dè", meaning: "of the", type: "connector" },
      { part: "Senyè Yo", meaning: "Lords", type: "root" },
    ],
    literalMeaning: "Lord of Lords",
  },
  "wa ki pap janm mouri": {
    original: "Wa Ki Pap Janm Mouri",
    parts: [
      { part: "Wa", meaning: "King", type: "root" },
      { part: "Ki", meaning: "Who", type: "connector" },
      { part: "Pap Janm", meaning: "Will never", type: "connector" },
      { part: "Mouri", meaning: "Die", type: "root" },
    ],
    literalMeaning: "The King Who Will Never Die",
  },

  // === ALMIGHTY/POWER NAMES ===
  "toupisan": {
    original: "Toupisan",
    parts: [
      { part: "Tou", meaning: "All (from 'tout')", type: "prefix" },
      { part: "Pisan", meaning: "Powerful (from French 'puissant')", type: "root" },
    ],
    literalMeaning: "The All-Powerful/Almighty",
  },
  "bondye ki gen tout pouvwa": {
    original: "Bondye Ki Gen Tout Pouvwa",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Ki Gen", meaning: "Who has", type: "connector" },
      { part: "Tout", meaning: "All", type: "prefix" },
      { part: "Pouvwa", meaning: "Power", type: "root" },
    ],
    literalMeaning: "God Who Has All Power",
  },

  // === SHEPHERD/PROTECTOR NAMES ===
  "bon bèje a": {
    original: "Bon Bèje A",
    parts: [
      { part: "Bon", meaning: "Good", type: "prefix" },
      { part: "Bèje", meaning: "Shepherd (from French 'berger')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Good Shepherd",
  },
  "pwotektè a": {
    original: "Pwotektè A",
    parts: [
      { part: "Pwotektè", meaning: "Protector (from French 'protecteur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Protector",
  },
  "gadyen a": {
    original: "Gadyen A",
    parts: [
      { part: "Gadyen", meaning: "Guardian (from French 'gardien')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Guardian",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "sovè a": {
    original: "Sovè A",
    parts: [
      { part: "Sovè", meaning: "Savior (from French 'sauveur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Savior",
  },
  "delivrè a": {
    original: "Delivrè A",
    parts: [
      { part: "Delivrè", meaning: "Deliverer (from French 'délivreur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Deliverer",
  },
  "redanmtè a": {
    original: "Redanmtè A",
    parts: [
      { part: "Redanmtè", meaning: "Redeemer (from French 'rédempteur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Redeemer",
  },

  // === HEALER/PROVIDER NAMES ===
  "gerisonè a": {
    original: "Gerisonè A",
    parts: [
      { part: "Gerisonè", meaning: "Healer (from French 'guérisseur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Healer",
  },
  "moun ki bay tout bagay": {
    original: "Moun Ki Bay Tout Bagay",
    parts: [
      { part: "Moun", meaning: "One", type: "root" },
      { part: "Ki", meaning: "Who", type: "connector" },
      { part: "Bay", meaning: "Gives", type: "root" },
      { part: "Tout Bagay", meaning: "Everything", type: "root" },
    ],
    literalMeaning: "The One Who Gives Everything/The Provider",
  },

  // === MERCY/COMPASSION NAMES ===
  "bondye mizèrikòd": {
    original: "Bondye Mizèrikòd",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Mizèrikòd", meaning: "of Mercy (from French 'miséricorde')", type: "root" },
    ],
    literalMeaning: "God of Mercy",
  },
  "papa mizèrikòd": {
    original: "Papa Mizèrikòd",
    parts: [
      { part: "Papa", meaning: "Father", type: "root" },
      { part: "Mizèrikòd", meaning: "of Mercy", type: "root" },
    ],
    literalMeaning: "Father of Mercy",
  },
  "bondye ki gen kè sansib": {
    original: "Bondye Ki Gen Kè Sansib",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Ki Gen", meaning: "Who has", type: "connector" },
      { part: "Kè", meaning: "Heart", type: "root" },
      { part: "Sansib", meaning: "Sensitive/Compassionate", type: "suffix" },
    ],
    literalMeaning: "God Who Has a Compassionate Heart",
  },

  // === HOLY NAMES ===
  "sen an": {
    original: "Sen An",
    parts: [
      { part: "Sen", meaning: "Holy/Saint", type: "root" },
      { part: "An", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Holy One",
  },
  "sentespri a": {
    original: "Sentespri A",
    parts: [
      { part: "Sen", meaning: "Holy (from French 'Saint')", type: "prefix" },
      { part: "Espri", meaning: "Spirit (from French 'Esprit')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === PEACE NAMES ===
  "bondye lapè": {
    original: "Bondye Lapè",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Lapè", meaning: "of Peace (from French 'la paix')", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "prens lapè a": {
    original: "Prens Lapè A",
    parts: [
      { part: "Prens", meaning: "Prince (from French 'prince')", type: "root" },
      { part: "Lapè", meaning: "of Peace", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Prince of Peace",
  },

  // === JUDGE/JUSTICE NAMES ===
  "jij ki jis la": {
    original: "Jij Ki Jis La",
    parts: [
      { part: "Jij", meaning: "Judge (from French 'juge')", type: "root" },
      { part: "Ki", meaning: "Who is", type: "connector" },
      { part: "Jis", meaning: "Just/Righteous", type: "suffix" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Righteous Judge",
  },
  "bondye lajistis": {
    original: "Bondye Lajistis",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Lajistis", meaning: "of Justice (from French 'la justice')", type: "root" },
    ],
    literalMeaning: "God of Justice",
  },

  // === WISDOM NAMES ===
  "bondye sajès": {
    original: "Bondye Sajès",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Sajès", meaning: "of Wisdom (from French 'sagesse')", type: "root" },
    ],
    literalMeaning: "God of Wisdom",
  },
  "sous sajès la": {
    original: "Sous Sajès La",
    parts: [
      { part: "Sous", meaning: "Source (from French 'source')", type: "root" },
      { part: "Sajès", meaning: "of Wisdom", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Source of Wisdom",
  },

  // === LIGHT/GLORY NAMES ===
  "limyè mond lan": {
    original: "Limyè Mond Lan",
    parts: [
      { part: "Limyè", meaning: "Light (from French 'lumière')", type: "root" },
      { part: "Mond", meaning: "World (from French 'monde')", type: "root" },
      { part: "Lan", meaning: "of the", type: "connector" },
    ],
    literalMeaning: "Light of the World",
  },
  "wa laglwa a": {
    original: "Wa Laglwa A",
    parts: [
      { part: "Wa", meaning: "King", type: "root" },
      { part: "Laglwa", meaning: "of Glory (from French 'la gloire')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The King of Glory",
  },

  // === ROCK/FORTRESS NAMES ===
  "wòch la": {
    original: "Wòch La",
    parts: [
      { part: "Wòch", meaning: "Rock (from French 'roche')", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Rock",
  },
  "fòtrès la": {
    original: "Fòtrès La",
    parts: [
      { part: "Fòtrès", meaning: "Fortress (from French 'forteresse')", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Fortress",
  },
  "refij mwen": {
    original: "Refij Mwen",
    parts: [
      { part: "Refij", meaning: "Refuge (from French 'refuge')", type: "root" },
      { part: "Mwen", meaning: "My", type: "suffix" },
    ],
    literalMeaning: "My Refuge",
  },

  // === FAITHFUL/TRUTH NAMES ===
  "fidèl la": {
    original: "Fidèl La",
    parts: [
      { part: "Fidèl", meaning: "Faithful (from French 'fidèle')", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Faithful One",
  },
  "bondye laverite": {
    original: "Bondye Laverite",
    parts: [
      { part: "Bondye", meaning: "God", type: "root" },
      { part: "Laverite", meaning: "of Truth (from French 'la vérité')", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },

  // === ETERNAL NAMES ===
  "etènèl la": {
    original: "Etènèl La",
    parts: [
      { part: "Etènèl", meaning: "Eternal (from French 'éternel')", type: "root" },
      { part: "La", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Eternal One",
  },
  "alfa ak omega": {
    original: "Alfa ak Omega",
    parts: [
      { part: "Alfa", meaning: "Alpha (First)", type: "root" },
      { part: "ak", meaning: "and", type: "connector" },
      { part: "Omega", meaning: "Omega (Last)", type: "root" },
    ],
    literalMeaning: "The Alpha and Omega (First and Last)",
  },
  "moun ki la pou tout tan an": {
    original: "Moun Ki La Pou Tout Tan An",
    parts: [
      { part: "Moun", meaning: "One", type: "root" },
      { part: "Ki La", meaning: "Who is there", type: "connector" },
      { part: "Pou Tout Tan", meaning: "For all time/Forever", type: "root" },
      { part: "An", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The One Who Is There Forever",
  },

  // === COMFORT NAMES ===
  "konsolatè a": {
    original: "Konsolatè A",
    parts: [
      { part: "Konsolatè", meaning: "Comforter (from French 'consolateur')", type: "root" },
      { part: "A", meaning: "The", type: "connector" },
    ],
    literalMeaning: "The Comforter",
  },
};

/**
 * Parse a Haitian Creole divine name into its component parts
 */
export function parseHaitianCreoleEtymology(name: string): EtymologyBreakdown | null {
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
 * Check if a name has Haitian Creole etymology available
 */
export function hasHaitianCreoleEtymology(name: string, language: string): boolean {
  const lang = language.toLowerCase().replace(/[_\s]/g, '');
  if (lang !== "haitiancreole" && lang !== "haitian_creole" && lang !== "haitian") return false;
  return parseHaitianCreoleEtymology(name) !== null;
}

/**
 * Get all available Haitian Creole etymologies
 */
export function getAllHaitianCreoleEtymologies(): EtymologyBreakdown[] {
  return Object.values(KNOWN_COMPOUNDS);
}
