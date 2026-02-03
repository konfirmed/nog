// Slug generation utilities for human-readable URLs

// Character normalization map for Yoruba diacritics
const YORUBA_NORMALIZATIONS: Record<string, string> = {
  'ọ': 'o', 'Ọ': 'o',
  'ẹ': 'e', 'Ẹ': 'e',
  'ṣ': 's', 'Ṣ': 's',
  'à': 'a', 'á': 'a', 'â': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u',
  'ǹ': 'n', 'ń': 'n',
  '\u2019': '', "'": '',
  'ọ̀': 'o', 'ọ́': 'o',
  'ẹ̀': 'e', 'ẹ́': 'e',
};

// Hebrew character transliterations
const HEBREW_TRANSLITERATIONS: Record<string, string> = {
  'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h',
  'ו': 'v', 'ז': 'z', 'ח': 'ch', 'ט': 't', 'י': 'y',
  'כ': 'k', 'ך': 'k', 'ל': 'l', 'מ': 'm', 'ם': 'm',
  'נ': 'n', 'ן': 'n', 'ס': 's', 'ע': 'a', 'פ': 'p',
  'ף': 'f', 'צ': 'tz', 'ץ': 'tz', 'ק': 'k', 'ר': 'r',
  'ש': 'sh', 'ת': 't',
  // Vowel marks (nikkud) - remove
  'ָ': '', 'ַ': '', 'ֵ': '', 'ֶ': '', 'ִ': '', 'ֹ': '', 'ֻ': '', 'ְ': '',
  'ֱ': '', 'ֲ': '', 'ֳ': '', 'ּ': '',
};

// Mandarin pinyin (already romanized in the data, but handle Chinese characters if present)
const MANDARIN_NORMALIZATIONS: Record<string, string> = {
  'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
  'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
  'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
  'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
  'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
  'ǖ': 'u', 'ǘ': 'u', 'ǚ': 'u', 'ǜ': 'u', 'ü': 'u',
};

/**
 * Normalize a character using language-specific rules
 */
function normalizeChar(char: string): string {
  // Check all normalization maps
  if (YORUBA_NORMALIZATIONS[char]) return YORUBA_NORMALIZATIONS[char];
  if (HEBREW_TRANSLITERATIONS[char]) return HEBREW_TRANSLITERATIONS[char];
  if (MANDARIN_NORMALIZATIONS[char]) return MANDARIN_NORMALIZATIONS[char];

  // Standard ASCII lowercase
  const lower = char.toLowerCase();
  if (/[a-z0-9]/.test(lower)) return lower;
  if (char === ' ' || char === '-') return '-';

  // Remove other special characters
  return '';
}

/**
 * Generate a URL-safe slug from a name
 */
export function generateSlug(name: string, language: string): string {
  // Normalize each character
  let slug = '';
  for (const char of name) {
    slug += normalizeChar(char);
  }

  // Clean up the slug
  slug = slug
    .replace(/-+/g, '-')  // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .toLowerCase();

  // Add language suffix for uniqueness
  // (e.g., "creator" might exist in multiple languages)
  if (slug) {
    slug = `${slug}-${language}`;
  }

  return slug;
}

/**
 * Check if a string looks like a UUID
 */
export function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Find a name by its slug from a list of names
 */
export function findBySlug(names: Array<{ id: string; name: string; language: string }>, slug: string): { id: string; name: string; language: string } | undefined {
  return names.find(n => generateSlug(n.name, n.language) === slug);
}
