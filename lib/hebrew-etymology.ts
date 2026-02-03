// Hebrew Etymology Parser
// Breaks down Hebrew divine names into their component parts with meanings

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

// Common Hebrew name components and their meanings
const HEBREW_COMPONENTS: Record<string, { meaning: string; type: EtymologyPart["type"] }> = {
  // Divine name roots
  "אל": { meaning: "God/Mighty One", type: "root" },
  "אלה": { meaning: "God (singular)", type: "root" },
  "אלהים": { meaning: "God (plural of majesty)", type: "root" },
  "יה": { meaning: "YAH (short form of YHWH)", type: "root" },
  "יהוה": { meaning: "YHWH/The LORD (I AM)", type: "root" },
  "אדון": { meaning: "Lord/Master", type: "root" },
  "אדני": { meaning: "My Lord", type: "root" },
  "שדי": { meaning: "Almighty/All-Sufficient", type: "root" },

  // Attribute roots
  "עליון": { meaning: "Most High/Supreme", type: "root" },
  "קדוש": { meaning: "Holy/Set Apart", type: "root" },
  "רחום": { meaning: "Compassionate", type: "root" },
  "חנון": { meaning: "Gracious", type: "root" },
  "צבאות": { meaning: "Hosts/Armies", type: "root" },
  "שלום": { meaning: "Peace/Wholeness", type: "root" },
  "רעה": { meaning: "Shepherd", type: "root" },
  "רפא": { meaning: "Healer", type: "root" },
  "נסה": { meaning: "Banner/Standard", type: "root" },
  "ירא": { meaning: "Provider/Sees", type: "root" },
  "צדק": { meaning: "Righteousness", type: "root" },
  "שפט": { meaning: "Judge", type: "root" },
  "ישע": { meaning: "Salvation", type: "root" },
  "גאל": { meaning: "Redeemer", type: "root" },
  "סלע": { meaning: "Rock/Cliff", type: "root" },
  "מגן": { meaning: "Shield", type: "root" },
  "מעוז": { meaning: "Fortress/Stronghold", type: "root" },
  "אמת": { meaning: "Truth/Faithfulness", type: "root" },
  "חסד": { meaning: "Lovingkindness/Mercy", type: "root" },
  "כבוד": { meaning: "Glory/Honor", type: "root" },
  "רוח": { meaning: "Spirit/Breath/Wind", type: "root" },
  "אב": { meaning: "Father", type: "root" },
  "מלך": { meaning: "King", type: "root" },
  "עולם": { meaning: "Eternal/World/Forever", type: "root" },
  "חי": { meaning: "Living", type: "root" },
  "אור": { meaning: "Light", type: "root" },
  "דרך": { meaning: "Way/Path", type: "root" },
  "ברא": { meaning: "Creator", type: "root" },
  "נאמן": { meaning: "Faithful", type: "root" },
  "קנא": { meaning: "Jealous/Zealous", type: "root" },
  "גבור": { meaning: "Mighty/Warrior", type: "root" },
  "ישר": { meaning: "Upright/Straight", type: "root" },

  // Connectors and particles
  "ה": { meaning: "the", type: "connector" },
  "ו": { meaning: "and", type: "connector" },
  "ב": { meaning: "in/with", type: "connector" },
  "ל": { meaning: "to/for", type: "connector" },
  "מ": { meaning: "from", type: "connector" },

  // Suffixes
  "י": { meaning: "my", type: "suffix" },
  "נו": { meaning: "our", type: "suffix" },
  "ך": { meaning: "your", type: "suffix" },
};

// Known Hebrew compound names with predefined breakdowns
const KNOWN_COMPOUNDS: Record<string, EtymologyBreakdown> = {
  // === PRIMARY DIVINE NAMES ===
  "אֱלֹהִים": {
    original: "אֱלֹהִים",
    parts: [
      { part: "אֱלֹהּ", meaning: "God (singular)", type: "root" },
      { part: "ים", meaning: "plural of majesty", type: "suffix" },
    ],
    literalMeaning: "God (plural of majesty expressing infinite greatness)",
  },
  "יְהוָה": {
    original: "יְהוָה",
    parts: [
      { part: "י", meaning: "He", type: "prefix" },
      { part: "הוה", meaning: "was/is/will be (to be)", type: "root" },
    ],
    literalMeaning: "I AM WHO I AM / The Self-Existent One / He Who Causes to Be",
  },
  "אֲדֹנָי": {
    original: "אֲדֹנָי",
    parts: [
      { part: "אָדוֹן", meaning: "Lord/Master", type: "root" },
      { part: "י", meaning: "my (plural intensive)", type: "suffix" },
    ],
    literalMeaning: "My Lords (intensive plural) / The Lord",
  },

  // === EL COMPOUND NAMES ===
  "אֵל עֶלְיוֹן": {
    original: "אֵל עֶלְיוֹן",
    parts: [
      { part: "אֵל", meaning: "God/Mighty One", type: "root" },
      { part: "עֶלְיוֹן", meaning: "Most High/Supreme", type: "root" },
    ],
    literalMeaning: "God Most High / The Supreme God",
  },
  "אֵל שַׁדַּי": {
    original: "אֵל שַׁדַּי",
    parts: [
      { part: "אֵל", meaning: "God/Mighty One", type: "root" },
      { part: "שַׁדַּי", meaning: "Almighty/All-Sufficient", type: "root" },
    ],
    literalMeaning: "God Almighty / The All-Sufficient God",
  },
  "אֵל רֳאִי": {
    original: "אֵל רֳאִי",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "רֳאִי", meaning: "seeing/who sees", type: "root" },
    ],
    literalMeaning: "The God Who Sees Me",
  },
  "אֵל עוֹלָם": {
    original: "אֵל עוֹלָם",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "עוֹלָם", meaning: "Everlasting/Eternal", type: "root" },
    ],
    literalMeaning: "The Everlasting God / God of Eternity",
  },
  "אֵל בֵּית־אֵל": {
    original: "אֵל בֵּית־אֵל",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "בֵּית", meaning: "House", type: "root" },
      { part: "אֵל", meaning: "God", type: "root" },
    ],
    literalMeaning: "God of Bethel / God of the House of God",
  },
  "אֵל נֶאֱמָן": {
    original: "אֵל נֶאֱמָן",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "נֶאֱמָן", meaning: "Faithful/Trustworthy", type: "root" },
    ],
    literalMeaning: "Faithful God",
  },
  "אֵל יִשְׂרָאֵל": {
    original: "אֵל יִשְׂרָאֵל",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "יִשְׂרָאֵל", meaning: "Israel (wrestles with God)", type: "root" },
    ],
    literalMeaning: "God of Israel",
  },
  "אֵל נוֹשֵׁעַ": {
    original: "אֵל נוֹשֵׁעַ",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "נוֹשֵׁעַ", meaning: "who saves/delivers", type: "root" },
    ],
    literalMeaning: "God Who Saves",
  },
  "אֵל שׁוֹפֵט": {
    original: "אֵל שׁוֹפֵט",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "שׁוֹפֵט", meaning: "Judge/who judges", type: "root" },
    ],
    literalMeaning: "God the Judge",
  },
  "אֵל בּוֹרֵא": {
    original: "אֵל בּוֹרֵא",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "בּוֹרֵא", meaning: "Creator/who creates", type: "root" },
    ],
    literalMeaning: "God the Creator",
  },
  "אֵל קַנָּא": {
    original: "אֵל קַנָּא",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "קַנָּא", meaning: "Jealous/Zealous", type: "root" },
    ],
    literalMeaning: "Jealous God / Zealous God",
  },
  "אֵל גִּבּוֹר": {
    original: "אֵל גִּבּוֹר",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "גִּבּוֹר", meaning: "Mighty/Warrior", type: "root" },
    ],
    literalMeaning: "Mighty God / God the Warrior",
  },
  "אֵל חַי": {
    original: "אֵל חַי",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "חַי", meaning: "Living", type: "root" },
    ],
    literalMeaning: "The Living God",
  },
  "אֵל רַחוּם": {
    original: "אֵל רַחוּם",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "רַחוּם", meaning: "Compassionate/Merciful", type: "root" },
    ],
    literalMeaning: "Compassionate God",
  },
  "אֵל חַנּוּן": {
    original: "אֵל חַנּוּן",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "חַנּוּן", meaning: "Gracious", type: "root" },
    ],
    literalMeaning: "Gracious God",
  },

  // === YAHWEH COMPOUND NAMES ===
  "יְהוָה צְבָאוֹת": {
    original: "יְהוָה צְבָאוֹת",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "צְבָאוֹת", meaning: "Hosts/Armies", type: "root" },
    ],
    literalMeaning: "The LORD of Hosts / The LORD of Armies",
  },
  "יְהוָה נִסִּי": {
    original: "יְהוָה נִסִּי",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "נִסִּי", meaning: "my Banner/Standard", type: "root" },
    ],
    literalMeaning: "The LORD is My Banner",
  },
  "יְהוָה רֹעִי": {
    original: "יְהוָה רֹעִי",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "רֹעִי", meaning: "my Shepherd", type: "root" },
    ],
    literalMeaning: "The LORD is My Shepherd",
  },
  "יְהוָה יִרְאֶה": {
    original: "יְהוָה יִרְאֶה",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "יִרְאֶה", meaning: "will provide/will see", type: "root" },
    ],
    literalMeaning: "The LORD Will Provide / The LORD Sees",
  },
  "יְהוָה רֹפֶא": {
    original: "יְהוָה רֹפֶא",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "רֹפֶא", meaning: "who heals", type: "root" },
    ],
    literalMeaning: "The LORD Who Heals",
  },
  "יְהוָה שָׁלוֹם": {
    original: "יְהוָה שָׁלוֹם",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "שָׁלוֹם", meaning: "Peace/Wholeness", type: "root" },
    ],
    literalMeaning: "The LORD is Peace",
  },
  "יְהוָה צִדְקֵנוּ": {
    original: "יְהוָה צִדְקֵנוּ",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "צִדְקֵ", meaning: "Righteousness", type: "root" },
      { part: "נוּ", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "The LORD Our Righteousness",
  },
  "יְהוָה שָׁמָּה": {
    original: "יְהוָה שָׁמָּה",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "שָׁמָּה", meaning: "is there", type: "root" },
    ],
    literalMeaning: "The LORD is There",
  },
  "יְהוָה מְקַדִּשְׁכֶם": {
    original: "יְהוָה מְקַדִּשְׁכֶם",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "מְקַדִּשׁ", meaning: "who sanctifies", type: "root" },
      { part: "כֶם", meaning: "you", type: "suffix" },
    ],
    literalMeaning: "The LORD Who Sanctifies You",
  },
  "יְהוָה סֶלַעִי": {
    original: "יְהוָה סֶלַעִי",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "סֶלַע", meaning: "Rock/Cliff", type: "root" },
      { part: "י", meaning: "my", type: "suffix" },
    ],
    literalMeaning: "The LORD My Rock",
  },
  "יְהוָה מָעוֹז": {
    original: "יְהוָה מָעוֹז",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "מָעוֹז", meaning: "Fortress/Stronghold", type: "root" },
    ],
    literalMeaning: "The LORD My Fortress",
  },
  "יְהוָה גָּד֖וֹל וְנוֹרָ֑א": {
    original: "יְהוָה גָּד֖וֹל וְנוֹרָ֑א",
    parts: [
      { part: "יְהוָה", meaning: "The LORD", type: "root" },
      { part: "גָּדוֹל", meaning: "Great", type: "root" },
      { part: "וְ", meaning: "and", type: "connector" },
      { part: "נוֹרָא", meaning: "Awesome/Fearsome", type: "root" },
    ],
    literalMeaning: "The Great and Awesome LORD",
  },

  // === HOLY/SACRED NAMES ===
  "קְדוֹשׁ יִשְׂרָאֵל": {
    original: "קְדוֹשׁ יִשְׂרָאֵל",
    parts: [
      { part: "קְדוֹשׁ", meaning: "Holy One", type: "root" },
      { part: "יִשְׂרָאֵל", meaning: "of Israel", type: "root" },
    ],
    literalMeaning: "The Holy One of Israel",
  },
  "הַקָּדוֹשׁ": {
    original: "הַקָּדוֹשׁ",
    parts: [
      { part: "הַ", meaning: "The", type: "connector" },
      { part: "קָּדוֹשׁ", meaning: "Holy One", type: "root" },
    ],
    literalMeaning: "The Holy One",
  },

  // === FATHER/FAMILY NAMES ===
  "אָבִינוּ": {
    original: "אָבִינוּ",
    parts: [
      { part: "אָב", meaning: "Father", type: "root" },
      { part: "ינוּ", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "Our Father",
  },
  "אֲבִי יָתוֹם": {
    original: "אֲבִי יָתוֹם",
    parts: [
      { part: "אֲבִי", meaning: "Father of", type: "root" },
      { part: "יָתוֹם", meaning: "the fatherless/orphan", type: "root" },
    ],
    literalMeaning: "Father of the Fatherless",
  },
  "אֵל אָבִי": {
    original: "אֵל אָבִי",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "אָבִי", meaning: "my Father", type: "root" },
    ],
    literalMeaning: "God My Father",
  },
  "אָב הָרַחֲמִים": {
    original: "אָב הָרַחֲמִים",
    parts: [
      { part: "אָב", meaning: "Father", type: "root" },
      { part: "הָ", meaning: "of the", type: "connector" },
      { part: "רַחֲמִים", meaning: "mercies/compassions", type: "root" },
    ],
    literalMeaning: "Father of Mercies",
  },

  // === KING/RULER NAMES ===
  "מֶלֶךְ הַכָּבוֹד": {
    original: "מֶלֶךְ הַכָּבוֹד",
    parts: [
      { part: "מֶלֶךְ", meaning: "King", type: "root" },
      { part: "הַ", meaning: "of", type: "connector" },
      { part: "כָּבוֹד", meaning: "Glory", type: "root" },
    ],
    literalMeaning: "King of Glory",
  },
  "מֶלֶךְ עוֹלָם": {
    original: "מֶלֶךְ עוֹלָם",
    parts: [
      { part: "מֶלֶךְ", meaning: "King", type: "root" },
      { part: "עוֹלָם", meaning: "Eternity/Forever", type: "root" },
    ],
    literalMeaning: "King of Eternity / Eternal King",
  },
  "מֶלֶךְ הַמְּלָכִים": {
    original: "מֶלֶךְ הַמְּלָכִים",
    parts: [
      { part: "מֶלֶךְ", meaning: "King", type: "root" },
      { part: "הַ", meaning: "of the", type: "connector" },
      { part: "מְּלָכִים", meaning: "Kings", type: "root" },
    ],
    literalMeaning: "King of Kings",
  },
  "אָדוֹן הַכֹּל": {
    original: "אָדוֹן הַכֹּל",
    parts: [
      { part: "אָדוֹן", meaning: "Lord/Master", type: "root" },
      { part: "הַ", meaning: "of", type: "connector" },
      { part: "כֹּל", meaning: "All/Everything", type: "root" },
    ],
    literalMeaning: "Lord of All",
  },
  "אֲדוֹן הָאֲדֹנִים": {
    original: "אֲדוֹן הָאֲדֹנִים",
    parts: [
      { part: "אֲדוֹן", meaning: "Lord", type: "root" },
      { part: "הָ", meaning: "of the", type: "connector" },
      { part: "אֲדֹנִים", meaning: "Lords", type: "root" },
    ],
    literalMeaning: "Lord of Lords",
  },

  // === SPIRIT NAMES ===
  "רוּחַ אֱלֹהִים": {
    original: "רוּחַ אֱלֹהִים",
    parts: [
      { part: "רוּחַ", meaning: "Spirit/Breath", type: "root" },
      { part: "אֱלֹהִים", meaning: "of God", type: "root" },
    ],
    literalMeaning: "Spirit of God",
  },
  "רוּחַ יְהוָה": {
    original: "רוּחַ יְהוָה",
    parts: [
      { part: "רוּחַ", meaning: "Spirit", type: "root" },
      { part: "יְהוָה", meaning: "of the LORD", type: "root" },
    ],
    literalMeaning: "Spirit of the LORD",
  },
  "רוּחַ הַקֹּדֶשׁ": {
    original: "רוּחַ הַקֹּדֶשׁ",
    parts: [
      { part: "רוּחַ", meaning: "Spirit", type: "root" },
      { part: "הַ", meaning: "the", type: "connector" },
      { part: "קֹּדֶשׁ", meaning: "Holy/Holiness", type: "root" },
    ],
    literalMeaning: "The Holy Spirit",
  },

  // === SAVIOR/REDEEMER NAMES ===
  "מוֹשִׁיעַ": {
    original: "מוֹשִׁיעַ",
    parts: [
      { part: "מוֹ", meaning: "one who", type: "prefix" },
      { part: "שִׁיעַ", meaning: "saves/delivers", type: "root" },
    ],
    literalMeaning: "Savior / Deliverer",
  },
  "גֹּאֵל": {
    original: "גֹּאֵל",
    parts: [
      { part: "גֹּאֵל", meaning: "Redeemer/Kinsman-Redeemer", type: "root" },
    ],
    literalMeaning: "Redeemer / One who redeems",
  },
  "גֹּאֲלֵנוּ": {
    original: "גֹּאֲלֵנוּ",
    parts: [
      { part: "גֹּאֵל", meaning: "Redeemer", type: "root" },
      { part: "נוּ", meaning: "our", type: "suffix" },
    ],
    literalMeaning: "Our Redeemer",
  },

  // === RIGHTEOUS/JUST NAMES ===
  "צַדִּיק יָשָׁר": {
    original: "צַדִּיק יָשָׁר",
    parts: [
      { part: "צַדִּיק", meaning: "Righteous One", type: "root" },
      { part: "יָשָׁר", meaning: "Upright/Straight", type: "root" },
    ],
    literalMeaning: "The Righteous and Upright One",
  },
  "שׁוֹפֵט כָּל הָאָרֶץ": {
    original: "שׁוֹפֵט כָּל הָאָרֶץ",
    parts: [
      { part: "שׁוֹפֵט", meaning: "Judge", type: "root" },
      { part: "כָּל", meaning: "of all", type: "connector" },
      { part: "הָאָרֶץ", meaning: "the Earth", type: "root" },
    ],
    literalMeaning: "Judge of All the Earth",
  },

  // === ANCIENT/ETERNAL NAMES ===
  "עַתִּיק יוֹמִין": {
    original: "עַתִּיק יוֹמִין",
    parts: [
      { part: "עַתִּיק", meaning: "Ancient", type: "root" },
      { part: "יוֹמִין", meaning: "of Days", type: "root" },
    ],
    literalMeaning: "Ancient of Days",
  },
  "אֵל קֶדֶם": {
    original: "אֵל קֶדֶם",
    parts: [
      { part: "אֵל", meaning: "God", type: "root" },
      { part: "קֶדֶם", meaning: "of Old/Ancient", type: "root" },
    ],
    literalMeaning: "God of Old / Eternal God",
  },

  // === ROCK/FORTRESS NAMES ===
  "צוּר יִשְׂרָאֵל": {
    original: "צוּר יִשְׂרָאֵל",
    parts: [
      { part: "צוּר", meaning: "Rock", type: "root" },
      { part: "יִשְׂרָאֵל", meaning: "of Israel", type: "root" },
    ],
    literalMeaning: "Rock of Israel",
  },
  "צוּרִי וּמְצוּדָתִי": {
    original: "צוּרִי וּמְצוּדָתִי",
    parts: [
      { part: "צוּר", meaning: "Rock", type: "root" },
      { part: "י", meaning: "my", type: "suffix" },
      { part: "וּ", meaning: "and", type: "connector" },
      { part: "מְצוּדָה", meaning: "Fortress", type: "root" },
      { part: "תִי", meaning: "my", type: "suffix" },
    ],
    literalMeaning: "My Rock and My Fortress",
  },
  "מָגֵן וּמָחֶסֶה": {
    original: "מָגֵן וּמָחֶסֶה",
    parts: [
      { part: "מָגֵן", meaning: "Shield", type: "root" },
      { part: "וּ", meaning: "and", type: "connector" },
      { part: "מָחֶסֶה", meaning: "Refuge", type: "root" },
    ],
    literalMeaning: "Shield and Refuge",
  },

  // === LIGHT/GLORY NAMES ===
  "אוֹר יִשְׂרָאֵל": {
    original: "אוֹר יִשְׂרָאֵל",
    parts: [
      { part: "אוֹר", meaning: "Light", type: "root" },
      { part: "יִשְׂרָאֵל", meaning: "of Israel", type: "root" },
    ],
    literalMeaning: "Light of Israel",
  },
  "אוֹר הָעוֹלָם": {
    original: "אוֹר הָעוֹלָם",
    parts: [
      { part: "אוֹר", meaning: "Light", type: "root" },
      { part: "הָ", meaning: "of the", type: "connector" },
      { part: "עוֹלָם", meaning: "World", type: "root" },
    ],
    literalMeaning: "Light of the World",
  },

  // === SHEPHERD NAMES ===
  "רֹעֵה יִשְׂרָאֵל": {
    original: "רֹעֵה יִשְׂרָאֵל",
    parts: [
      { part: "רֹעֵה", meaning: "Shepherd", type: "root" },
      { part: "יִשְׂרָאֵל", meaning: "of Israel", type: "root" },
    ],
    literalMeaning: "Shepherd of Israel",
  },
};

/**
 * Normalize a Hebrew name for lookup
 */
function normalizeForLookup(name: string): string {
  return name
    .trim()
    .replace(/[\u0591-\u05C7]/g, ""); // Remove Hebrew cantillation marks
}

/**
 * Parse a Hebrew name and return its etymology breakdown
 */
export function parseHebrewEtymology(name: string): EtymologyBreakdown | null {
  const normalized = normalizeForLookup(name);

  // Check if we have a known compound
  for (const [key, breakdown] of Object.entries(KNOWN_COMPOUNDS)) {
    const normalizedKey = normalizeForLookup(key);
    if (normalized === normalizedKey || normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
      return breakdown;
    }
  }

  return null;
}

/**
 * Check if a name is Hebrew and might have etymology available
 */
export function hasHebrewEtymology(name: string, language: string): boolean {
  if (language !== "hebrew") return false;
  return parseHebrewEtymology(name) !== null;
}
