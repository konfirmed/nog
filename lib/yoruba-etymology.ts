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
  // === SUPREME BEING NAMES ===
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
  "ọlọ́run": {
    original: "Ọlọ́run",
    parts: [
      { part: "Ọl(ú)", meaning: "Owner", type: "prefix" },
      { part: "ọ́run", meaning: "heaven/sky", type: "root" },
    ],
    literalMeaning: "Owner of the heavens / God",
  },

  // === CREATOR NAMES ===
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
  "ẹlẹ́dàá": {
    original: "Ẹlẹ́dàá",
    parts: [
      { part: "Ẹlẹ́", meaning: "Owner of", type: "prefix" },
      { part: "ẹ̀dá/dàá", meaning: "creation/creature", type: "root" },
    ],
    literalMeaning: "Owner of creation / The Creator",
  },

  // === ATTRIBUTE NAMES ===
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
  "aláàfíà": {
    original: "Aláàfíà",
    parts: [
      { part: "Aláà", meaning: "Owner of", type: "prefix" },
      { part: "àfíà/àlàáfíà", meaning: "peace/well-being", type: "root" },
    ],
    literalMeaning: "Owner of peace / The Peaceful One",
  },
  "alábàáṣẹ": {
    original: "Alábàáṣẹ",
    parts: [
      { part: "A", meaning: "One who", type: "prefix" },
      { part: "lá", meaning: "has/uses", type: "root" },
      { part: "bàá", meaning: "grants/gives to", type: "root" },
      { part: "àṣẹ", meaning: "authority/command", type: "root" },
    ],
    literalMeaning: "The One who grants authority / Authority-Giver",
  },
  "olùrànlọ́wọ́": {
    original: "Olùrànlọ́wọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "ràn...lọ́wọ́", meaning: "helps/assists", type: "root" },
    ],
    literalMeaning: "The One who helps / Helper",
  },
  "olùgbọ́n": {
    original: "Olùgbọ́n",
    parts: [
      { part: "Olù", meaning: "One who has", type: "prefix" },
      { part: "ọgbọ́n", meaning: "wisdom", type: "root" },
    ],
    literalMeaning: "The Wise One",
  },

  // === LORD/MASTER NAMES ===
  "olúwa": {
    original: "Olúwa",
    parts: [
      { part: "Olú", meaning: "Owner/Head", type: "prefix" },
      { part: "wa", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "Our Lord/Master",
  },
  "olúwa mi": {
    original: "Olúwa mi",
    parts: [
      { part: "Olú", meaning: "Owner/Head", type: "prefix" },
      { part: "wa", meaning: "existence", type: "root" },
      { part: "mi", meaning: "my", type: "suffix" },
    ],
    literalMeaning: "My Lord/Master",
  },

  // === KING NAMES ===
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
  "olórí ayé àti ọ̀run": {
    original: "Olórí Ayé àti Ọ̀run",
    parts: [
      { part: "Olórí", meaning: "Head/Ruler", type: "prefix" },
      { part: "Ayé", meaning: "Earth/World", type: "root" },
      { part: "àti", meaning: "and", type: "connector" },
      { part: "Ọ̀run", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "Head of Earth and Heaven / Cosmic Lord",
  },
  "olúṣètọ́ ayé": {
    original: "Olúṣètọ́ Ayé",
    parts: [
      { part: "Olú", meaning: "Lord/Master", type: "prefix" },
      { part: "ṣètọ́", meaning: "arranges/designs/sets in order", type: "root" },
      { part: "Ayé", meaning: "World/Earth", type: "root" },
    ],
    literalMeaning: "The One who designs the World / Architect of the World",
  },
  "ọba ogo": {
    original: "Ọba Ogo",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Ogo", meaning: "Glory", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },
  "ọba àwọn ọba": {
    original: "Ọba àwọn Ọba",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "àwọn", meaning: "of the", type: "connector" },
      { part: "Ọba", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "ọba mímọ́": {
    original: "Ọba Mímọ́",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Mímọ́", meaning: "Holy/Pure", type: "root" },
    ],
    literalMeaning: "Holy King",
  },
  "ọba àìkú": {
    original: "Ọba Àìkú",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "Àìkú", meaning: "Immortality/Deathlessness", type: "root" },
    ],
    literalMeaning: "Immortal King / King who does not die",
  },
  "ọba tó ń jọba": {
    original: "Ọba tó ń jọba",
    parts: [
      { part: "Ọba", meaning: "King", type: "prefix" },
      { part: "tó", meaning: "who", type: "connector" },
      { part: "ń", meaning: "is (continuous)", type: "connector" },
      { part: "jọba", meaning: "reigning", type: "root" },
    ],
    literalMeaning: "The King who reigns / The Reigning King",
  },

  // === SHEPHERD/GUARDIAN NAMES ===
  "olùṣọ́": {
    original: "Olùṣọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "ṣọ́", meaning: "watches/guards", type: "root" },
    ],
    literalMeaning: "The One who watches/guards / Shepherd",
  },
  "olùṣọ́ àgùntàn": {
    original: "Olùṣọ́ Àgùntàn",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "ṣọ́", meaning: "watches/guards", type: "root" },
      { part: "àgùntàn", meaning: "sheep", type: "root" },
    ],
    literalMeaning: "The One who guards sheep / The Good Shepherd",
  },

  // === ETERNAL/UNCHANGING NAMES ===
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
  "àìyerayé": {
    original: "Àìyerayé",
    parts: [
      { part: "Àì", meaning: "without/not", type: "prefix" },
      { part: "ye", meaning: "end/perish", type: "root" },
      { part: "ra", meaning: "buy/redeem", type: "root" },
      { part: "yé", meaning: "to end", type: "root" },
    ],
    literalMeaning: "Without end / Everlasting",
  },
  "ẹni àìyerayé": {
    original: "Ẹni Àìyerayé",
    parts: [
      { part: "Ẹni", meaning: "The One/Person", type: "prefix" },
      { part: "Àìyerayé", meaning: "Everlasting", type: "root" },
    ],
    literalMeaning: "The Everlasting One",
  },

  // === WISDOM/KNOWLEDGE NAMES ===
  "olú-ìmọ̀": {
    original: "Olú-Imọ̀",
    parts: [
      { part: "Olú", meaning: "Lord/Source", type: "prefix" },
      { part: "Ìmọ̀", meaning: "Knowledge/Wisdom", type: "root" },
    ],
    literalMeaning: "Lord/Source of Knowledge",
  },
  "olúmọ́ ohun gbogbo": {
    original: "Olúmọ́ Ohun Gbogbo",
    parts: [
      { part: "Olú", meaning: "One who", type: "prefix" },
      { part: "mọ́", meaning: "knows", type: "root" },
      { part: "ohun gbogbo", meaning: "all things", type: "root" },
    ],
    literalMeaning: "The One who knows all things / All-Knowing",
  },

  // === GOD OF... COMPOUND NAMES ===
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
  "ọlọ́run àlàáfíà": {
    original: "Ọlọ́run Àlàáfíà",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Àlàáfíà", meaning: "Peace", type: "root" },
    ],
    literalMeaning: "God of Peace",
  },
  "ọlọ́run ìrètí": {
    original: "Ọlọ́run Ìrètí",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Ìrètí", meaning: "Hope", type: "root" },
    ],
    literalMeaning: "God of Hope",
  },
  "ọlọ́run ọ̀nà": {
    original: "Ọlọ́run Ọ̀nà",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Ọ̀nà", meaning: "Way/Path", type: "root" },
    ],
    literalMeaning: "God of the Way",
  },
  "ọlọ́run òtítọ́": {
    original: "Ọlọ́run Òtítọ́",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Òtítọ́", meaning: "Truth", type: "root" },
    ],
    literalMeaning: "God of Truth",
  },
  "ọlọ́run ìyè": {
    original: "Ọlọ́run Ìyè",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Ìyè", meaning: "Life", type: "root" },
    ],
    literalMeaning: "God of Life",
  },
  "ọlọ́run ìṣẹ́gun": {
    original: "Ọlọ́run Ìṣẹ́gun",
    parts: [
      { part: "Ọlọ́run", meaning: "God (Owner of heaven)", type: "prefix" },
      { part: "Ìṣẹ́gun", meaning: "Victory", type: "root" },
    ],
    literalMeaning: "God of Victory",
  },

  // === ROCK/FORTRESS NAMES ===
  "apata mi": {
    original: "Apata Mi",
    parts: [
      { part: "Apata", meaning: "Rock/Stone", type: "root" },
      { part: "mi", meaning: "my", type: "suffix" },
    ],
    literalMeaning: "My Rock",
  },
  "apata àìyerayé": {
    original: "Apata Àìyerayé",
    parts: [
      { part: "Apata", meaning: "Rock", type: "root" },
      { part: "Àìyerayé", meaning: "Everlasting", type: "root" },
    ],
    literalMeaning: "Everlasting Rock",
  },
  "ibi ìsàdi": {
    original: "Ibi Ìsàdi",
    parts: [
      { part: "Ibi", meaning: "Place", type: "prefix" },
      { part: "Ìsàdi", meaning: "Refuge/Hiding", type: "root" },
    ],
    literalMeaning: "Place of Refuge",
  },
  "odì": {
    original: "Odì",
    parts: [
      { part: "Odì", meaning: "Fortress/Wall", type: "root" },
    ],
    literalMeaning: "Fortress / Strong Defense",
  },

  // === HEALER/PROVIDER NAMES ===
  "olùwòsàn": {
    original: "Olùwòsàn",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "wò...sàn", meaning: "heals/makes well", type: "root" },
    ],
    literalMeaning: "The One who heals / Healer",
  },
  "olùpèsè": {
    original: "Olùpèsè",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "pèsè", meaning: "provides/prepares", type: "root" },
    ],
    literalMeaning: "The One who provides / Provider",
  },
  "olùfúnni": {
    original: "Olùfúnni",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "fún...ni", meaning: "gives to one", type: "root" },
    ],
    literalMeaning: "The One who gives / Giver",
  },

  // === LIGHT/GLORY NAMES ===
  "ìmọ́lẹ̀": {
    original: "Ìmọ́lẹ̀",
    parts: [
      { part: "Ì", meaning: "that which", type: "prefix" },
      { part: "mọ́lẹ̀", meaning: "shines/illuminates", type: "root" },
    ],
    literalMeaning: "Light / That which illuminates",
  },
  "ìmọ́lẹ̀ ayé": {
    original: "Ìmọ́lẹ̀ Ayé",
    parts: [
      { part: "Ìmọ́lẹ̀", meaning: "Light", type: "root" },
      { part: "Ayé", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },
  "olú ogo": {
    original: "Olú Ogo",
    parts: [
      { part: "Olú", meaning: "Lord/Owner", type: "prefix" },
      { part: "Ogo", meaning: "Glory", type: "root" },
    ],
    literalMeaning: "Lord of Glory",
  },

  // === JUDGE/JUSTICE NAMES ===
  "adájọ́": {
    original: "Adájọ́",
    parts: [
      { part: "A", meaning: "One who", type: "prefix" },
      { part: "dá", meaning: "makes/renders", type: "root" },
      { part: "ẹjọ́", meaning: "judgment/case", type: "root" },
    ],
    literalMeaning: "One who renders judgment / Judge",
  },
  "adájọ́ ododo": {
    original: "Adájọ́ Ododo",
    parts: [
      { part: "Adájọ́", meaning: "Judge", type: "root" },
      { part: "Ododo", meaning: "Righteous/True", type: "root" },
    ],
    literalMeaning: "Righteous Judge",
  },
  "olùdájọ́": {
    original: "Olùdájọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "dá", meaning: "renders", type: "root" },
      { part: "ẹjọ́", meaning: "judgment", type: "root" },
    ],
    literalMeaning: "The One who judges / Judge",
  },

  // === FATHER NAMES ===
  "baba wa": {
    original: "Baba Wa",
    parts: [
      { part: "Baba", meaning: "Father", type: "root" },
      { part: "wa", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "Our Father",
  },
  "baba àìnípẹ̀kun": {
    original: "Baba Àìnípẹ̀kun",
    parts: [
      { part: "Baba", meaning: "Father", type: "root" },
      { part: "Àìnípẹ̀kun", meaning: "without end/eternal", type: "root" },
    ],
    literalMeaning: "Eternal Father",
  },
  "baba ọ̀run": {
    original: "Baba Ọ̀run",
    parts: [
      { part: "Baba", meaning: "Father", type: "root" },
      { part: "Ọ̀run", meaning: "Heaven", type: "root" },
    ],
    literalMeaning: "Heavenly Father",
  },
  "baba àwọn aláìní baba": {
    original: "Baba Àwọn Aláìní Baba",
    parts: [
      { part: "Baba", meaning: "Father", type: "root" },
      { part: "àwọn", meaning: "of those", type: "connector" },
      { part: "aláìní", meaning: "without", type: "prefix" },
      { part: "baba", meaning: "father", type: "root" },
    ],
    literalMeaning: "Father of the fatherless",
  },

  // === SPIRIT NAMES ===
  "ẹ̀mí mímọ́": {
    original: "Ẹ̀mí Mímọ́",
    parts: [
      { part: "Ẹ̀mí", meaning: "Spirit/Breath", type: "root" },
      { part: "Mímọ́", meaning: "Holy/Pure", type: "root" },
    ],
    literalMeaning: "Holy Spirit",
  },
  "ẹ̀mí ọlọ́run": {
    original: "Ẹ̀mí Ọlọ́run",
    parts: [
      { part: "Ẹ̀mí", meaning: "Spirit", type: "root" },
      { part: "Ọlọ́run", meaning: "of God", type: "root" },
    ],
    literalMeaning: "Spirit of God",
  },

  // === ANCIENT/ELDER NAMES ===
  "àtàyébáyé": {
    original: "Àtàyébáyé",
    parts: [
      { part: "Àtàyé", meaning: "From the beginning of the world", type: "root" },
      { part: "báyé", meaning: "with the world", type: "suffix" },
    ],
    literalMeaning: "The Ancient of Days / From eternity",
  },
  "àgbà ọjọ́": {
    original: "Àgbà Ọjọ́",
    parts: [
      { part: "Àgbà", meaning: "Elder/Ancient", type: "root" },
      { part: "Ọjọ́", meaning: "Days", type: "root" },
    ],
    literalMeaning: "Ancient of Days",
  },
  "ẹni àtijọ́": {
    original: "Ẹni Àtijọ́",
    parts: [
      { part: "Ẹni", meaning: "The One/Person", type: "prefix" },
      { part: "Àtijọ́", meaning: "Ancient/From old", type: "root" },
    ],
    literalMeaning: "The Ancient One",
  },

  // === MAJESTY/FIRE NAMES ===
  "ẹlẹ́rùjẹ̀jẹ̀": {
    original: "Ẹlẹ́rùjẹ̀jẹ̀",
    parts: [
      { part: "Ẹlẹ́", meaning: "Owner of / One who has", type: "prefix" },
      { part: "rù", meaning: "carries/wears/is clothed with", type: "root" },
      { part: "jẹ̀jẹ̀", meaning: "majesty/awe/terror (intensifier)", type: "root" },
    ],
    literalMeaning: "The One clothed with fire and majesty / The Terrifyingly Majestic One",
  },
  "ẹlẹ́rù": {
    original: "Ẹlẹ́rù",
    parts: [
      { part: "Ẹlẹ́", meaning: "Owner of / One who has", type: "prefix" },
      { part: "ẹ̀rù", meaning: "fear/awe/terror", type: "root" },
    ],
    literalMeaning: "The Fearsome One / The Awe-inspiring One",
  },

  // === ADDITIONAL COMPOUND NAMES ===
  "olùgbàgbọ́": {
    original: "Olùgbàgbọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "gbà...gbọ́", meaning: "believes/receives faith", type: "root" },
    ],
    literalMeaning: "The Faithful One / One worthy of trust",
  },
  "olùṣọ́tọ́": {
    original: "Olùṣọ́tọ́",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "ṣọ́tọ́", meaning: "separates/sanctifies", type: "root" },
    ],
    literalMeaning: "The One who sanctifies / Sanctifier",
  },
  "olùdarí": {
    original: "Olùdarí",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "darí", meaning: "leads/guides", type: "root" },
    ],
    literalMeaning: "The One who leads / Guide/Leader",
  },
  "olùdaríjì": {
    original: "Olùdaríjì",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "darí", meaning: "forgives/pardons", type: "root" },
      { part: "jì", meaning: "completely", type: "suffix" },
    ],
    literalMeaning: "The One who forgives / Forgiver",
  },
  "olùrápàdà": {
    original: "Olùrápàdà",
    parts: [
      { part: "Olù", meaning: "One who", type: "prefix" },
      { part: "rà...pàdà", meaning: "redeems/buys back", type: "root" },
    ],
    literalMeaning: "The One who redeems / Redeemer",
  },
  "ènìyàn àṣírí": {
    original: "Ènìyàn Àṣírí",
    parts: [
      { part: "Ènìyàn", meaning: "Person/Being", type: "root" },
      { part: "Àṣírí", meaning: "Secret/Mystery", type: "root" },
    ],
    literalMeaning: "The Mysterious One / Being of Secrets",
  },
  "ẹni tí a ń pè ní àmì": {
    original: "Ẹni tí a ń pè ní Àmì",
    parts: [
      { part: "Ẹni", meaning: "The One", type: "prefix" },
      { part: "tí", meaning: "who", type: "connector" },
      { part: "a ń pè", meaning: "is called", type: "root" },
      { part: "ní", meaning: "as", type: "connector" },
      { part: "Àmì", meaning: "Amen/True One", type: "root" },
    ],
    literalMeaning: "The One called Amen / The True One",
  },
};

/**
 * Normalize a Yoruba name for lookup (lowercase, handle diacritics)
 */
function normalizeForLookup(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`ʼ]/g, "'")
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
