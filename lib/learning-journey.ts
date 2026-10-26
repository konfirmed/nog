export type LearningQuestion = Readonly<{
  prompt: string;
  choices: readonly [string, string, string];
  answer: string;
  explanation: string;
}>;

export type LearningLesson = Readonly<{
  day: number;
  theme: string;
  name: string;
  language: string;
  meaning: string;
  classification: string;
  scripture: string;
  story: string;
  insight: string;
  distinction: string;
  reflection: string;
  practice: string;
  question: LearningQuestion;
  recall?: LearningQuestion;
}>;

// Short, Scripture-anchored pilot lessons. Catalogue links resolve by name and
// language at request time: never hard-code production Supabase IDs.
// An editorial review of original-language pronunciation is still required.
export const LEARNING_LESSONS: readonly LearningLesson[] = [
  {
    day: 1,
    theme: 'The Creator',
    name: 'Elohim',
    language: 'hebrew',
    meaning: 'God',
    classification: 'Hebrew biblical designation',
    scripture: 'Genesis 1:1–5',
    story: 'Genesis opens with God creating the heavens and the earth. The narrative starts with God as the actor, before it explains anything about the world.',
    insight: 'Elohim is a common Hebrew designation for God, including in the creation account. Begin by remembering who the passage identifies as Creator.',
    distinction: 'Elohim has a plural grammatical form. Its usage and interpretation deserve care; “plural of majesty” should not be presented as an uncontested etymology.',
    reflection: 'How would remembering God as Creator change how you approach something you cannot control?',
    practice: 'Read Genesis 1:1–5 slowly. Say the name and its basic meaning without looking.',
    question: {
      prompt: 'Where do we first encounter Elohim in this journey?',
      choices: ['In the creation account', 'At Gideon’s altar', 'In the story of Hagar'],
      answer: 'In the creation account',
      explanation: 'Genesis 1 introduces God as Creator.',
    },
  },
  {
    day: 2,
    theme: 'The Provider',
    name: 'YHWH Yireh',
    language: 'hebrew',
    meaning: 'The LORD will provide',
    classification: 'Name given to a place in Scripture',
    scripture: 'Genesis 22:1–14',
    story: 'After a severe test, Abraham sees a ram provided in place of Isaac. Abraham names that place with an expression connected to the LORD’s provision.',
    insight: 'Remember the account and its context before turning this expression into a general promise. The Hebrew wording also carries a connection between seeing and providing.',
    distinction: 'Genesis 22:14 names the place, not a new personal name announced directly by God.',
    reflection: 'Where can you practice trust without assuming you know exactly how provision must arrive?',
    practice: 'Read Genesis 22:13–14, then explain the story behind the expression in one sentence.',
    recall: {
      prompt: 'Yesterday, which Hebrew designation appeared in Genesis 1?',
      choices: ['El Elyon', 'Elohim', 'YHWH Shalom'],
      answer: 'Elohim',
      explanation: 'Elohim appears in the Genesis creation account.',
    },
    question: {
      prompt: 'In Genesis 22:14, what does Abraham name?',
      choices: ['A place', 'A new tribe', 'A city gate'],
      answer: 'A place',
      explanation: 'The expression commemorates the place where the LORD provided.',
    },
  },
  {
    day: 3,
    theme: 'The One Who Heals',
    name: 'YHWH Rapha',
    language: 'hebrew',
    meaning: 'The LORD who heals',
    classification: 'Biblical self-description',
    scripture: 'Exodus 15:22–26',
    story: 'After crossing the sea, Israel comes to bitter water at Marah. The passage describes testing, instruction, and the LORD’s declaration about healing.',
    insight: 'The phrase connects healing with God’s character in a particular covenant setting. Reading the full scene helps avoid treating it like a formula.',
    distinction: 'This passage does not promise that every illness will immediately be cured or replace medical care.',
    reflection: 'What would it look like to seek wholeness while remaining honest about suffering?',
    practice: 'Read the scene at Marah and recall what problem the people faced.',
    recall: {
      prompt: 'Who used the expression remembered as YHWH Yireh?',
      choices: ['Abraham', 'Gideon', 'Melchizedek'],
      answer: 'Abraham',
      explanation: 'Abraham named the place in Genesis 22:14.',
    },
    question: {
      prompt: 'What problem did Israel face at Marah?',
      choices: ['Bitter water', 'A missing shepherd', 'A broken city wall'],
      answer: 'Bitter water',
      explanation: 'Exodus 15 places the declaration within the account of the bitter water.',
    },
  },
  {
    day: 4,
    theme: 'The LORD Is Peace',
    name: 'YHWH Shalom',
    language: 'hebrew',
    meaning: 'The LORD is peace',
    classification: 'Name given to an altar in Scripture',
    scripture: 'Judges 6:11–24',
    story: 'Gideon encounters the messenger of the LORD while Israel is under threat. After being reassured, Gideon builds an altar and names it “The LORD is peace.”',
    insight: 'This expression appears in a story of fear and reassurance. Peace here is more meaningful than simply the absence of difficulty.',
    distinction: 'Judges 6:24 records the name of Gideon’s altar; it should not be presented as a direct quotation of God introducing a new name.',
    reflection: 'Where do you need courage or reassurance amid uncertainty?',
    practice: 'Read Judges 6:22–24 and retell why Gideon built the altar.',
    recall: {
      prompt: 'Where does the description “The LORD who heals” appear?',
      choices: ['Exodus 15', 'Genesis 1', 'Psalm 8'],
      answer: 'Exodus 15',
      explanation: 'The phrase is found in the account of Marah in Exodus 15.',
    },
    question: {
      prompt: 'Who named an altar “The LORD is peace”?',
      choices: ['Moses', 'Gideon', 'David'],
      answer: 'Gideon',
      explanation: 'Judges 6:24 identifies Gideon as the builder of the altar.',
    },
  },
  {
    day: 5,
    theme: 'The Good Shepherd',
    name: 'Y Bugail Da',
    language: 'welsh',
    meaning: 'The Good Shepherd',
    classification: 'Welsh rendering of a biblical title',
    scripture: 'John 10:11–16',
    story: 'In John 10, Jesus calls himself the good shepherd and describes a shepherd who cares for the sheep rather than abandoning them.',
    insight: 'The Welsh expression brings a biblical title into another language. The teaching comes from John’s Gospel, while the wording belongs to Welsh Christian usage.',
    distinction: 'This is a translated title, not an original Hebrew divine name; the cross-cultural connection is a translation, not a shared etymology.',
    reflection: 'How does the image of a caring shepherd affect your understanding of leadership?',
    practice: 'Read John 10:11–16 and identify how the good shepherd differs from the hired hand.',
    recall: {
      prompt: 'What did Gideon name “The LORD is peace”?',
      choices: ['A mountain', 'An altar', 'A river'],
      answer: 'An altar',
      explanation: 'Gideon gave this name to an altar in Judges 6:24.',
    },
    question: {
      prompt: 'Who calls himself the good shepherd in John 10?',
      choices: ['Jesus', 'Gideon', 'Abraham'],
      answer: 'Jesus',
      explanation: 'Jesus uses the good-shepherd image in John 10:11.',
    },
  },
  {
    day: 6,
    theme: 'God Most High',
    name: 'El Elyon',
    language: 'hebrew',
    meaning: 'God Most High',
    classification: 'Hebrew biblical title',
    scripture: 'Genesis 14:18–22',
    story: 'Melchizedek, king of Salem and priest of God Most High, blesses Abram. Abram then uses the same divine title in speaking to the king of Sodom.',
    insight: 'El Elyon emphasizes God’s supremacy. The narrative places this title alongside blessing and acknowledgment of the creator of heaven and earth.',
    distinction: 'The phrase is a biblical title. It should not be used to erase the historical setting of the encounter.',
    reflection: 'What changes when you consider authority and success as accountable to God?',
    practice: 'Read Genesis 14:18–22 and remember who blesses Abram.',
    recall: {
      prompt: 'What language is “Y Bugail Da” in this journey?',
      choices: ['Hebrew', 'Welsh', 'Yoruba'],
      answer: 'Welsh',
      explanation: 'Y Bugail Da is the Welsh rendering of “The Good Shepherd.”',
    },
    question: {
      prompt: 'Who is called priest of God Most High in Genesis 14?',
      choices: ['Melchizedek', 'Gideon', 'Isaac'],
      answer: 'Melchizedek',
      explanation: 'Genesis 14:18 identifies Melchizedek in this way.',
    },
  },
  {
    day: 7,
    theme: 'The Merciful One',
    name: 'Aláàánú',
    language: 'yoruba',
    meaning: 'The Merciful One',
    classification: 'Yoruba devotional appellation',
    scripture: 'Psalm 103:8–13',
    story: 'Psalm 103 praises the LORD as merciful, gracious, patient, and compassionate. Yoruba Christian devotional language includes the appellation Aláàánú to express this attribute.',
    insight: 'A cultural expression can direct readers to a biblical attribute without being a word-for-word name from the Bible’s original languages.',
    distinction: 'Psalm 103 supports the theme of mercy; it does not contain the Yoruba word Aláàánú. The language and devotional tradition must be credited accurately.',
    reflection: 'Where can remembering mercy help you extend patience to another person?',
    practice: 'Read Psalm 103:8–13. Without looking, name three attributes of God described there.',
    recall: {
      prompt: 'Who blessed Abram as priest of El Elyon?',
      choices: ['Melchizedek', 'Gideon', 'Jesus'],
      answer: 'Melchizedek',
      explanation: 'Melchizedek blesses Abram in Genesis 14.',
    },
    question: {
      prompt: 'Which attribute does Aláàánú express?',
      choices: ['Mercy', 'Creation', 'Peace'],
      answer: 'Mercy',
      explanation: 'Aláàánú is a Yoruba devotional appellation referring to mercy.',
    },
  },
];

export const LEARNING_PROGRESS_KEY = 'nog:seven-day-learning:v1';

export function getLearningLesson(day: number | string | undefined): LearningLesson | null {
  const numericDay = typeof day === 'number' ? day : Number(day);
  return Number.isInteger(numericDay) && numericDay >= 1 && numericDay <= LEARNING_LESSONS.length
    ? LEARNING_LESSONS[numericDay - 1]
    : null;
}

export function normalizeCompletedDays(days: unknown): number[] {
  if (!Array.isArray(days)) return [];
  return [...new Set(days.filter((value): value is number =>
    typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= LEARNING_LESSONS.length
  ))].sort((a, b) => a - b);
}

export function readLearningProgress(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || !('version' in value) || !('completed' in value)) return [];
    if (value.version !== 1) return [];
    return normalizeCompletedDays(value.completed);
  } catch {
    return [];
  }
}

export function writeLearningProgress(days: readonly number[]): string {
  return JSON.stringify({ version: 1, completed: normalizeCompletedDays([...days]) });
}
