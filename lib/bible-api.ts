// Bible API service using bible-api.com (free, no API key required)

// Book name normalization map (handles common variations)
const BOOK_NORMALIZATIONS: Record<string, string> = {
  // Old Testament
  genesis: "genesis",
  gen: "genesis",
  exodus: "exodus",
  exod: "exodus",
  ex: "exodus",
  leviticus: "leviticus",
  lev: "leviticus",
  numbers: "numbers",
  num: "numbers",
  deuteronomy: "deuteronomy",
  deut: "deuteronomy",
  joshua: "joshua",
  josh: "joshua",
  judges: "judges",
  judg: "judges",
  ruth: "ruth",
  "1 samuel": "1samuel",
  "1samuel": "1samuel",
  "1 sam": "1samuel",
  "2 samuel": "2samuel",
  "2samuel": "2samuel",
  "2 sam": "2samuel",
  "1 kings": "1kings",
  "1kings": "1kings",
  "2 kings": "2kings",
  "2kings": "2kings",
  "1 chronicles": "1chronicles",
  "1chronicles": "1chronicles",
  "2 chronicles": "2chronicles",
  "2chronicles": "2chronicles",
  ezra: "ezra",
  nehemiah: "nehemiah",
  neh: "nehemiah",
  esther: "esther",
  job: "job",
  psalm: "psalms",
  psalms: "psalms",
  ps: "psalms",
  proverbs: "proverbs",
  prov: "proverbs",
  ecclesiastes: "ecclesiastes",
  eccl: "ecclesiastes",
  "song of solomon": "song of solomon",
  "song of songs": "song of solomon",
  isaiah: "isaiah",
  isa: "isaiah",
  jeremiah: "jeremiah",
  jer: "jeremiah",
  lamentations: "lamentations",
  lam: "lamentations",
  ezekiel: "ezekiel",
  ezek: "ezekiel",
  daniel: "daniel",
  dan: "daniel",
  hosea: "hosea",
  joel: "joel",
  amos: "amos",
  obadiah: "obadiah",
  jonah: "jonah",
  micah: "micah",
  nahum: "nahum",
  habakkuk: "habakkuk",
  hab: "habakkuk",
  zephaniah: "zephaniah",
  haggai: "haggai",
  zechariah: "zechariah",
  zech: "zechariah",
  malachi: "malachi",
  mal: "malachi",
  // New Testament
  matthew: "matthew",
  matt: "matthew",
  mt: "matthew",
  mark: "mark",
  mk: "mark",
  luke: "luke",
  lk: "luke",
  john: "john",
  jn: "john",
  acts: "acts",
  romans: "romans",
  rom: "romans",
  "1 corinthians": "1corinthians",
  "1corinthians": "1corinthians",
  "1 cor": "1corinthians",
  "2 corinthians": "2corinthians",
  "2corinthians": "2corinthians",
  "2 cor": "2corinthians",
  galatians: "galatians",
  gal: "galatians",
  ephesians: "ephesians",
  eph: "ephesians",
  philippians: "philippians",
  phil: "philippians",
  colossians: "colossians",
  col: "colossians",
  "1 thessalonians": "1thessalonians",
  "1thessalonians": "1thessalonians",
  "2 thessalonians": "2thessalonians",
  "2thessalonians": "2thessalonians",
  "1 timothy": "1timothy",
  "1timothy": "1timothy",
  "1 tim": "1timothy",
  "2 timothy": "2timothy",
  "2timothy": "2timothy",
  "2 tim": "2timothy",
  titus: "titus",
  philemon: "philemon",
  hebrews: "hebrews",
  heb: "hebrews",
  james: "james",
  jas: "james",
  "1 peter": "1peter",
  "1peter": "1peter",
  "1 pet": "1peter",
  "2 peter": "2peter",
  "2peter": "2peter",
  "2 pet": "2peter",
  "1 john": "1john",
  "1john": "1john",
  "2 john": "2john",
  "2john": "2john",
  "3 john": "3john",
  "3john": "3john",
  jude: "jude",
  revelation: "revelation",
  rev: "revelation",
};

export interface BibleVerse {
  reference: string;
  text: string;
  translation: string;
}

export interface ParsedReference {
  book: string;
  chapter: string;
  verses: string;
  apiQuery: string;
}

/**
 * Parse a scripture reference into components
 * Examples:
 *   "Genesis 1:1" -> { book: "genesis", chapter: "1", verses: "1", apiQuery: "genesis+1:1" }
 *   "Psalm 103:8" -> { book: "psalms", chapter: "103", verses: "8", apiQuery: "psalms+103:8" }
 *   "John 3:16-17" -> { book: "john", chapter: "3", verses: "16-17", apiQuery: "john+3:16-17" }
 */
export function parseScriptureRef(ref: string): ParsedReference | null {
  // Match patterns like "Genesis 1:1", "1 John 3:16", "Psalm 103:8-10"
  const regex = /^(\d?\s?[a-zA-Z]+(?:\s+[a-zA-Z]+)?)\s+(\d+):(\d+(?:-\d+)?)$/;
  const match = ref.trim().match(regex);

  if (!match) return null;

  const [, bookRaw, chapter, verses] = match;
  const bookKey = bookRaw.toLowerCase().trim();
  const normalizedBook = BOOK_NORMALIZATIONS[bookKey];

  if (!normalizedBook) return null;

  return {
    book: normalizedBook,
    chapter,
    verses,
    apiQuery: `${normalizedBook}+${chapter}:${verses}`,
  };
}

const CACHE_KEY_PREFIX = "bible-verse-";

/**
 * Get cached verse from localStorage
 */
function getCachedVerse(reference: string): BibleVerse | null {
  if (typeof window === "undefined") return null;

  const cached = localStorage.getItem(CACHE_KEY_PREFIX + reference);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Cache verse in localStorage
 */
function cacheVerse(reference: string, verse: BibleVerse): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CACHE_KEY_PREFIX + reference, JSON.stringify(verse));
  } catch {
    // localStorage might be full or disabled
  }
}

/**
 * Fetch verse text from bible-api.com
 */
export async function fetchVerse(
  reference: string,
  translation: string = "kjv"
): Promise<BibleVerse | null> {
  // Check cache first
  const cacheKey = `${reference}-${translation}`;
  const cached = getCachedVerse(cacheKey);
  if (cached) return cached;

  const parsed = parseScriptureRef(reference);
  if (!parsed) return null;

  try {
    const response = await fetch(
      `https://bible-api.com/${parsed.apiQuery}?translation=${translation}`
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (data.error) return null;

    const verse: BibleVerse = {
      reference: data.reference || reference,
      text: data.text?.trim() || "",
      translation: translation.toUpperCase(),
    };

    // Cache the result
    cacheVerse(cacheKey, verse);

    return verse;
  } catch {
    return null;
  }
}
