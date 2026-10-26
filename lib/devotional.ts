/** One devotional day is a UTC calendar day, shared by all visitors. */
export function devotionalIndex(now: Date, total: number): number {
  if (!Number.isSafeInteger(total) || total < 1) return -1;
  return Math.floor(now.getTime() / 86_400_000) % total;
}
