import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalNameSlug, idFromIdentifier, generateSlug, namePath } from '../lib/slug.ts';
import { devotionalIndex } from '../lib/devotional.ts';

const first = '123e4567-e89b-42d3-a456-426614174000';
const second = '123e4567-e89b-42d3-a456-426614174001';
for (const [name, language] of [['Ọlọ́run','yoruba'], ['שָׁלוֹם','hebrew'], ['上帝','mandarin'], ['上帝','wu_chinese'], ['A & B?!','welsh'], ['Élohim','yiddish']]) {
  test(`stable unique route for ${language}`, () => {
    const one = { id: first, name, language };
    const two = { ...one, id: second };
    assert.equal(idFromIdentifier(canonicalNameSlug(one)), first);
    assert.notEqual(namePath(one), namePath(two));
    assert.ok(canonicalNameSlug(one).length > first.length + 1);
  });
}
test('legacy slugs and UUID links remain identifiable', () => {
  assert.equal(generateSlug('Ọlọ́run', 'yoruba'), 'olorun-yoruba');
  assert.equal(idFromIdentifier(first), first);
  assert.equal(idFromIdentifier('not-a-name'), null);
});
test('UTC devotional index is stable within the day and reaches the collection', () => {
  assert.equal(devotionalIndex(new Date('2026-10-26T00:00:00Z'), 379), devotionalIndex(new Date('2026-10-26T23:59:59Z'), 379));
  const start = Date.parse('2026-01-01T00:00:00Z');
  assert.equal(new Set(Array.from({length:379}, (_, day) => devotionalIndex(new Date(start + day*86400000),379))).size,379);
  assert.equal(devotionalIndex(new Date(),0),-1);
});
