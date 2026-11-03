import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LEARNING_LESSONS,
  LEARNING_PROGRESS_KEY,
  catalogueLookup,
  getLearningLesson,
  normalizeCompletedDays,
  readLearningProgress,
  writeLearningProgress,
  uniqueCatalogueMatch,
} from '../lib/learning-journey.ts';

// Public catalogue snapshot inspected 2026-11-03; fixtures are not a live DB check.
const catalogue = [
  { name: 'אֱלֹהִים', language: 'hebrew', meaning: 'God / Mighty One' },
  { name: 'יְהוָה יִרְאֶה', language: 'hebrew', meaning: 'The Lord Will Provide' },
  { name: 'יְהוָה רֹפְאֶךָ', language: 'hebrew', meaning: 'The Lord Who Heals You' },
  { name: 'יְהוָה שָׁלוֹם', language: 'hebrew', meaning: 'The Lord is Peace' },
  { name: 'Y Bugail', language: 'welsh', meaning: 'The Shepherd' },
  { name: 'אֵל עֶלְיוֹן', language: 'hebrew', meaning: 'God Most High' },
  { name: 'Aláàánú', language: 'yoruba', meaning: 'The Merciful One' },
];

test('all seven lesson lookups use the intended catalogue identity', () => {
  const expected = [
    ['אֱלֹהִים', 'hebrew'], ['יְהוָה יִרְאֶה', 'hebrew'],
    ['יְהוָה רֹפְאֶךָ', 'hebrew'], ['יְהוָה שָׁלוֹם', 'hebrew'],
    ['Y Bugail Da', 'welsh'], ['אֵל עֶלְיוֹן', 'hebrew'], ['Aláàánú', 'yoruba'],
  ];
  for (const [index, lesson] of LEARNING_LESSONS.entries()) {
    const lookup = catalogueLookup(lesson);
    assert.deepEqual([lookup.name, lookup.language], expected[index]);
    const matches = catalogue.filter(entry => entry.name === lookup.name && entry.language === lookup.language);
    if (lesson.day === 5) {
      // The related, broader Y Bugail must not be presented as this exact title.
      assert.equal(uniqueCatalogueMatch(matches), null);
    } else {
      assert.equal(matches.length, 1, `Day ${lesson.day} must match uniquely`);
      assert.equal(uniqueCatalogueMatch(matches)?.name, expected[index][0]);
    }
  }
});

test('ambiguous or absent catalogue results do not produce a link', () => {
  assert.equal(uniqueCatalogueMatch(null), null);
  assert.equal(uniqueCatalogueMatch([]), null);
  assert.equal(uniqueCatalogueMatch([catalogue[0], catalogue[0]]), null);
  const lookup = catalogueLookup(LEARNING_LESSONS[0]);
  assert.equal(uniqueCatalogueMatch([{ ...catalogue[0], language: 'welsh' }].filter(
    entry => entry.name === lookup.name && entry.language === lookup.language,
  )), null);
});

test('pilot has seven distinct sequential Scripture lessons', () => {
  assert.equal(LEARNING_LESSONS.length, 7);
  assert.deepEqual(LEARNING_LESSONS.map(({ day }) => day), [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(new Set(LEARNING_LESSONS.map(({ language, name }) => language + ':' + name)).size, 7);
  for (const lesson of LEARNING_LESSONS) {
    assert.ok(lesson.scripture && lesson.story && lesson.reflection && lesson.distinction && lesson.practice);
    assert.equal(lesson.question.choices.length, 3);
    assert.ok(lesson.question.choices.includes(lesson.question.answer));
    if (lesson.recall) assert.ok(lesson.recall.choices.includes(lesson.recall.answer));
  }
  assert.ok(LEARNING_PROGRESS_KEY.includes('v1'));
});

test('day lookup rejects malformed and out-of-range day values', () => {
  assert.equal(getLearningLesson(undefined), null);
  for (const value of ['0', '-1', '2.5', '8', 'NaN', 'abc', '2xyz']) {
    assert.equal(getLearningLesson(value), null);
  }
  assert.equal(getLearningLesson('1')?.day, 1);
  assert.equal(getLearningLesson(7)?.day, 7);
});

test('persisted progress is sanitized, deduplicated, versioned and sorted', () => {
  assert.deepEqual(normalizeCompletedDays([7, 3, 3, 1, -1, 0, 8, 2.5, '2', null]), [1, 3, 7]);
  const serialized = writeLearningProgress([7, 4, 4, 1, 9]);
  assert.deepEqual(readLearningProgress(serialized), [1, 4, 7]);
  for (const invalid of ['not-json', '{}', '{"version":2,"completed":[1]}', '{"version":1,"completed":"1"}', 'null']) {
    assert.deepEqual(readLearningProgress(invalid), []);
  }
  assert.deepEqual(readLearningProgress(null), []);
});

