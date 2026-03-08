// All supported languages with display names
// Ordered in YHWH pattern with Mandarin at the end
export const LANGUAGES: Record<string, string> = {
  yoruba: 'Yoruba',           // Y
  hebrew: 'Hebrew',           // H
  welsh: 'Welsh',             // W
  hindi: 'Hindi',             // H
  yiddish: 'Yiddish',         // Y
  hausa: 'Hausa',             // H
  wolof: 'Wolof',             // W
  haitian_creole: 'Haitian Creole', // H
  wu_chinese: 'Wu Chinese',   // W
  mandarin: 'Mandarin',       // (end)
};

export const LANGUAGE_ORDER = Object.keys(LANGUAGES);

export function formatLanguage(lang: string): string {
  return LANGUAGES[lang] || lang.charAt(0).toUpperCase() + lang.slice(1).replace('_', ' ');
}
