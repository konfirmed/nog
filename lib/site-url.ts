/** Canonical public origin. Local development can opt into localhost explicitly. */
export const siteUrl = process.env.NODE_ENV === 'development'
  ? (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  : 'https://namesofgod.kanmiobasa.com';

export function absoluteUrl(path = ''): string {
  return new URL(path.startsWith('/') ? path : `/${path}`, `${siteUrl}/`).toString();
}
