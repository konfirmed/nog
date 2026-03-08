-- Seed data for NAMES of G_D Across Cultures
-- Populates the names_of_god table with representative entries for all 10 languages

-- Clear existing data (safe for dev/reset only)
TRUNCATE public.names_of_god CASCADE;

-- ============================================================
-- YORUBA NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Ọlọ́run', 'yoruba', 'Oh-LOH-roon', 'Owner of Heaven', ARRAY['Creator', 'Sovereign'], ARRAY['Genesis 1:1', 'Psalm 115:3'], 'Used in everyday speech and worship to refer to God as the supreme being who owns and controls the heavens.', 'The ultimate sovereign deity who possesses and governs the celestial realm. Ọlọ́run embodies absolute authority over all creation.', ARRAY[]::uuid[], 'The most common Yoruba name for God, combining "Olú" (owner) and "ọrun" (heaven).'),
('Ẹlẹ́dàá', 'yoruba', 'Eh-LEH-dah', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Isaiah 40:28'], 'Used in prayers and worship acknowledging God as the maker of all things.', 'The divine craftsman who brought all existence into being through creative power and wisdom.', ARRAY[]::uuid[], 'From "Elé" (owner) and "ẹ̀dá" (creation). Emphasizes God''s role as originator of all life.'),
('Aláàánú', 'yoruba', 'Ah-LAH-ah-noo', 'The Merciful One', ARRAY['Mercy', 'Compassion'], ARRAY['Psalm 103:8', 'Lamentations 3:22-23'], 'Invoked when seeking God''s compassion and forgiveness during times of hardship.', 'The embodiment of divine mercy who extends compassion beyond what is deserved.', ARRAY[]::uuid[], 'From "Alá" (owner of) and "àánú" (mercy/compassion).'),
('Olúwa', 'yoruba', 'Oh-LOO-wah', 'Lord/Master', ARRAY['Sovereign', 'King'], ARRAY['Psalm 24:1', 'Philippians 2:11'], 'The most common way to address God in Yoruba Christian worship and daily life.', 'The supreme Lord and master of all, whose authority extends over every domain of existence.', ARRAY[]::uuid[], 'Widely used in both traditional Yoruba religion and Christianity.'),
('Oníṣẹ́gun', 'yoruba', 'Oh-NEE-sheh-goon', 'The Victorious One', ARRAY['Protector', 'Deliverer'], ARRAY['1 Corinthians 15:57', 'Romans 8:37'], 'Used in prayers for victory over spiritual and physical challenges.', 'The one who wins every battle and grants victory to those who trust in divine power.', ARRAY[]::uuid[], 'From "Oni" (possessor of) and "ìṣẹ́gun" (victory).'),
('Alágbára', 'yoruba', 'Ah-LAHG-bah-rah', 'The Almighty/Powerful One', ARRAY['Almighty', 'Power'], ARRAY['Jeremiah 32:17', 'Revelation 19:6'], 'Used when acknowledging God''s limitless power in worship and prayer.', 'The all-powerful deity whose strength knows no bounds and who can accomplish the impossible.', ARRAY[]::uuid[], 'From "Alá" (owner of) and "agbára" (power/strength).'),
('Olùgbàlà', 'yoruba', 'Oh-loo-GBAH-lah', 'The Savior/Deliverer', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Acts 4:12'], 'Used in worship and testimony when speaking of God''s saving and delivering power.', 'The divine rescuer who delivers from danger, sin, and oppression with mighty hand.', ARRAY[]::uuid[], 'From "Olú" (lord/owner) and "ìgbàlà" (salvation/deliverance).'),
('Adùúráṣẹ', 'yoruba', 'Ah-doo-RAH-sheh', 'The One Who Answers Prayer', ARRAY['Faithful', 'Provider'], ARRAY['Psalm 65:2', 'Jeremiah 33:3'], 'Invoked in prayer meetings and personal devotion to express confidence that God hears and answers.', 'The attentive deity who listens to every prayer and responds with perfect timing and wisdom.', ARRAY[]::uuid[], 'A compound name emphasizing God''s responsiveness to human petition.'),
('Olùṣọ Àgùntàn', 'yoruba', 'Oh-loo-SHOH Ah-GOON-tahn', 'The Shepherd', ARRAY['Protector', 'Provider', 'Peace'], ARRAY['Psalm 23:1', 'John 10:11'], 'Used in pastoral care contexts and when seeking God''s guidance and provision.', 'The caring shepherd who guides, feeds, protects, and leads the flock to green pastures.', ARRAY[]::uuid[], 'Literally "Guardian of the Sheep." Parallels the biblical shepherd imagery.'),
('Ọba àwọn Ọba', 'yoruba', 'Oh-BAH ah-won Oh-BAH', 'King of Kings', ARRAY['King', 'Sovereign'], ARRAY['Revelation 19:16', '1 Timothy 6:15'], 'Used in worship to exalt God above all earthly rulers and powers.', 'The supreme monarch whose reign surpasses all earthly kingdoms and whose authority is unmatched.', ARRAY[]::uuid[], 'A direct translation of the biblical title "King of Kings."');

-- ============================================================
-- HEBREW NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Elohim', 'hebrew', 'El-oh-HEEM', 'God (plural of majesty)', ARRAY['Creator', 'Sovereign', 'Judge'], ARRAY['Genesis 1:1', 'Psalm 19:1'], 'Used throughout the Hebrew Bible, especially in creation narratives and when emphasizing God''s power and authority.', 'The majestic, all-powerful God whose very name suggests fullness of divine attributes and creative power.', ARRAY[]::uuid[], 'Plural form of Eloah, used over 2,500 times in the Hebrew Bible. The plural suggests majesty, not polytheism.'),
('YHWH', 'hebrew', 'Yah-WEH (traditional)', 'I AM WHO I AM / The Self-Existent One', ARRAY['Eternal', 'Faithful', 'Sovereign'], ARRAY['Exodus 3:14', 'Psalm 83:18'], 'The most sacred name, often replaced with "Adonai" in reading. Central to Jewish worship and theology.', 'The eternal, self-existent deity who was, is, and always will be. The covenant-keeping God who reveals Himself through relationship.', ARRAY[]::uuid[], 'The Tetragrammaton — the four-letter name considered too sacred to pronounce. Derived from the Hebrew verb "to be."'),
('El Shaddai', 'hebrew', 'El Shah-DYE', 'God Almighty / The All-Sufficient One', ARRAY['Almighty', 'Provider'], ARRAY['Genesis 17:1', 'Exodus 6:3'], 'Used when emphasizing God''s sufficiency and nurturing power. Common in patriarchal narratives.', 'The all-sufficient God who provides abundantly and whose power nurtures and sustains all life.', ARRAY[]::uuid[], 'Revealed to Abraham. "Shaddai" may derive from "breast" (nurturer) or "mountain" (mighty).'),
('Adonai', 'hebrew', 'Ah-doh-NYE', 'My Lord / Master', ARRAY['Sovereign', 'King'], ARRAY['Psalm 8:1', 'Isaiah 6:1'], 'Used as a substitute when reading YHWH aloud. Common in prayer and liturgy.', 'The supreme master and lord whose authority commands reverence and whose lordship demands obedience.', ARRAY[]::uuid[], 'Plural possessive form of "Adon" (lord), expressing reverence and majesty.'),
('El Elyon', 'hebrew', 'El El-YOHN', 'God Most High', ARRAY['Sovereign', 'King'], ARRAY['Genesis 14:18-20', 'Psalm 78:35'], 'Used to emphasize God''s supremacy over all other powers and authorities.', 'The supreme God who dwells above all, whose position of authority is unrivaled in heaven and earth.', ARRAY[]::uuid[], 'First used by Melchizedek, priest of Salem. Emphasizes God''s supreme position.'),
('YHWH Rapha', 'hebrew', 'Yah-WEH Rah-FAH', 'The LORD Who Heals', ARRAY['Healer'], ARRAY['Exodus 15:26', 'Psalm 103:3'], 'Invoked in prayers for physical, emotional, and spiritual healing.', 'The divine physician who heals all diseases — physical, emotional, and spiritual — restoring wholeness.', ARRAY[]::uuid[], 'Revealed after the waters of Marah. Rapha means "to heal, to restore."'),
('YHWH Shalom', 'hebrew', 'Yah-WEH Shah-LOHM', 'The LORD is Peace', ARRAY['Peace'], ARRAY['Judges 6:24', 'Isaiah 26:3'], 'Used in blessings and greetings. Invoked when seeking divine peace in turbulent times.', 'The God who is the source and embodiment of complete peace, wholeness, and well-being.', ARRAY[]::uuid[], 'Named by Gideon after encountering the Angel of the LORD. Shalom encompasses wholeness and completeness.'),
('YHWH Tsidkenu', 'hebrew', 'Yah-WEH Tsid-KAY-noo', 'The LORD Our Righteousness', ARRAY['Judge', 'Faithful'], ARRAY['Jeremiah 23:6', 'Jeremiah 33:16'], 'Used in Messianic prophecy and when speaking of God''s righteous character.', 'The God who is perfectly righteous and who imparts His righteousness to His people.', ARRAY[]::uuid[], 'A Messianic title given to the coming righteous Branch of David.'),
('YHWH Nissi', 'hebrew', 'Yah-WEH Nis-SEE', 'The LORD is My Banner', ARRAY['Protector', 'Deliverer'], ARRAY['Exodus 17:15', 'Psalm 20:5'], 'Used in contexts of spiritual warfare and victory, declaring God as the rallying point.', 'The God who leads His people to victory and serves as their standard in battle.', ARRAY[]::uuid[], 'Named by Moses after victory over the Amalekites. A banner was a rallying point for troops.'),
('YHWH Yireh', 'hebrew', 'Yah-WEH Yir-EH', 'The LORD Will Provide', ARRAY['Provider', 'Faithful'], ARRAY['Genesis 22:14', 'Philippians 4:19'], 'Invoked when trusting God for provision in times of need and uncertainty.', 'The God who sees ahead and provides exactly what is needed at the perfect moment.', ARRAY[]::uuid[], 'Named by Abraham on Mount Moriah after God provided a ram in place of Isaac.');

-- ============================================================
-- WELSH NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Duw', 'welsh', 'DEE-oo', 'God', ARRAY['Creator', 'Sovereign'], ARRAY['Genesis 1:1', 'John 1:1'], 'The standard Welsh word for God, used in all forms of worship and daily speech.', 'The supreme divine being, creator and sustainer of all things in Welsh spiritual tradition.', ARRAY[]::uuid[], 'The primary Welsh word for God, cognate with Latin "Deus."'),
('Yr Arglwydd', 'welsh', 'Ur ARG-looyth', 'The Lord', ARRAY['Sovereign', 'King'], ARRAY['Psalm 110:1', 'Philippians 2:11'], 'Used in Welsh Bible translations and hymns as the equivalent of "The LORD."', 'The sovereign lord whose authority and rule extend over all creation and history.', ARRAY[]::uuid[], 'The Welsh rendering of "The Lord" in Scripture. Central to Welsh hymn tradition.'),
('Y Creawdwr', 'welsh', 'Uh Kray-OW-door', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Colossians 1:16'], 'Used in worship and theological discussion when emphasizing God''s creative work.', 'The divine architect who designed and brought into being all of creation with purpose and beauty.', ARRAY[]::uuid[], 'From "creu" (to create) + "-wr" (agent suffix). Emphasizes God''s role as maker of all things.'),
('Y Bugail Da', 'welsh', 'Uh BEE-gail Dah', 'The Good Shepherd', ARRAY['Protector', 'Provider', 'Peace'], ARRAY['Psalm 23:1', 'John 10:11'], 'Used in pastoral contexts and Welsh hymns celebrating God''s care and guidance.', 'The tender shepherd who leads, feeds, and protects the flock with loving devotion.', ARRAY[]::uuid[], '"Bugail" means shepherd; "Da" means good. A beloved image in Welsh Christianity.'),
('Brenin y Brenhinoedd', 'welsh', 'BREN-in uh Bren-HIN-oyth', 'King of Kings', ARRAY['King', 'Sovereign'], ARRAY['Revelation 19:16', '1 Timothy 6:15'], 'Used in grand worship contexts to exalt God above all earthly rulers.', 'The monarch of all monarchs whose kingdom is eternal and whose reign is just and merciful.', ARRAY[]::uuid[], 'The Welsh translation of the biblical title "King of Kings." Common in Welsh revival hymns.'),
('Tad Nefol', 'welsh', 'TAHD NEV-ol', 'Heavenly Father', ARRAY['Father', 'Provider'], ARRAY['Matthew 6:9', 'Matthew 7:11'], 'Used in prayer, especially the Lord''s Prayer, and in personal devotion.', 'The loving heavenly father who cares for His children with tenderness, wisdom, and unfailing provision.', ARRAY[]::uuid[], '"Tad" means father; "Nefol" means heavenly. Central to Welsh Christian prayer tradition.'),
('Y Gwaredwr', 'welsh', 'Uh Gwar-ED-oor', 'The Redeemer/Savior', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 44:6', 'Titus 2:13'], 'Used in evangelical and revival worship contexts emphasizing salvation.', 'The divine redeemer who rescues from sin and bondage, paying the ultimate price for freedom.', ARRAY[]::uuid[], 'From "gwared" (to deliver/save). A key term in Welsh revival Christianity.'),
('Yr Ysbryd Glân', 'welsh', 'Ur US-brid Glahn', 'The Holy Spirit', ARRAY['Wisdom', 'Comforter'], ARRAY['John 14:26', 'Acts 2:4'], 'Used in Trinitarian worship and when speaking of God''s indwelling presence and power.', 'The holy breath of God who comforts, guides, empowers, and sanctifies believers.', ARRAY[]::uuid[], '"Ysbryd" means spirit; "Glân" means holy/clean. Central to Welsh Pentecostal and charismatic traditions.');

-- ============================================================
-- HINDI NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('परमेश्वर', 'hindi', 'Par-MESH-war', 'Supreme God / The Highest Lord', ARRAY['Sovereign', 'Creator', 'Almighty'], ARRAY['Genesis 1:1', 'Psalm 97:9'], 'The primary Hindi term for God in Christian contexts, used in Bible translations and worship.', 'The supreme deity who rules over all creation with absolute power, wisdom, and authority.', ARRAY[]::uuid[], 'From "param" (supreme/highest) and "ishwar" (lord/god). The standard Hindi term in Christian Bibles.'),
('प्रभु', 'hindi', 'Pra-BHOO', 'Lord / Master', ARRAY['Sovereign', 'King'], ARRAY['Psalm 8:1', 'Romans 10:9'], 'Used as the Hindi equivalent of "Lord" in prayers, worship, and Scripture reading.', 'The divine master whose lordship extends over all realms of existence and demands loving obedience.', ARRAY[]::uuid[], 'A devotional title meaning "Lord" or "Master," widely used across Hindu and Christian traditions.'),
('सर्वशक्तिमान', 'hindi', 'Sarv-SHAK-ti-maan', 'The Almighty / All-Powerful', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Genesis 17:1'], 'Used when emphasizing God''s omnipotence in worship and theological teaching.', 'The all-powerful one whose strength is infinite and whose might accomplishes the impossible.', ARRAY[]::uuid[], 'From "sarva" (all) and "shaktimaan" (powerful). Equivalent to El Shaddai.'),
('उद्धारकर्ता', 'hindi', 'Ud-DHAR-kar-tah', 'The Savior / Deliverer', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Luke 2:11'], 'Used in evangelistic contexts and worship when speaking of God''s saving work.', 'The divine savior who rescues from sin, death, and bondage, offering eternal freedom and life.', ARRAY[]::uuid[], 'From "uddhar" (salvation/deliverance) and "karta" (doer). Central to Hindi Christian vocabulary.'),
('चंगाई करनेवाला', 'hindi', 'Chan-GAI Kar-neh-WAH-lah', 'The Healer', ARRAY['Healer'], ARRAY['Exodus 15:26', 'Psalm 103:3'], 'Invoked in prayers for healing and in testimonies of divine restoration.', 'The divine physician who heals body, mind, and spirit with compassionate and powerful touch.', ARRAY[]::uuid[], 'Literally "the one who does healing." Used in Hindi Christian healing ministry.'),
('सृष्टिकर्ता', 'hindi', 'Srishti-KAR-tah', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Colossians 1:16'], 'Used in worship and teaching about God''s creative work and authority over nature.', 'The divine creator who spoke the universe into existence with wisdom, purpose, and artistry.', ARRAY[]::uuid[], 'From "srishti" (creation) and "karta" (maker/doer). Emphasizes God as the origin of all things.'),
('शांति का राजकुमार', 'hindi', 'SHAAN-ti kah Raj-KU-mar', 'Prince of Peace', ARRAY['Peace', 'King'], ARRAY['Isaiah 9:6', 'John 14:27'], 'Used in Messianic references and when seeking God''s peace in troubled times.', 'The royal prince whose reign establishes true peace — not merely absence of conflict but fullness of well-being.', ARRAY[]::uuid[], 'A direct translation of the Messianic title from Isaiah 9:6.'),
('अनंत', 'hindi', 'An-ANT', 'The Infinite / Eternal One', ARRAY['Eternal'], ARRAY['Psalm 90:2', 'Revelation 1:8'], 'Used in philosophical and devotional contexts emphasizing God''s boundless nature.', 'The infinite deity who transcends all limits of time, space, and human comprehension.', ARRAY[]::uuid[], 'From "an" (without) and "ant" (end). Describes God''s limitless, eternal nature.');

-- ============================================================
-- YIDDISH NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('דער אויבערשטער', 'yiddish', 'Der OY-ber-shter', 'The Most High / The Supreme One', ARRAY['Sovereign', 'King'], ARRAY['Psalm 91:1', 'Daniel 4:17'], 'The most common Yiddish way to refer to God in everyday speech. Avoids saying the divine name directly.', 'The supreme being who dwells above all, whose exalted position reflects ultimate authority and holiness.', ARRAY[]::uuid[], 'Literally "The Uppermost One." The most popular Yiddish name for God in Ashkenazi tradition.'),
('הקדוש ברוך הוא', 'yiddish', 'Ha-Ka-DOSH Ba-RUCH Hu', 'The Holy One, Blessed Be He', ARRAY['Holy', 'Eternal'], ARRAY['Isaiah 6:3', 'Psalm 99:5'], 'Used in rabbinic literature and formal religious discourse as the primary way to reference God.', 'The supremely holy God whose very nature is set apart and whose blessing flows to all creation.', ARRAY[]::uuid[], 'Abbreviated as HKB"H. The standard rabbinic way to refer to God, emphasizing holiness and blessing.'),
('רבונו של עולם', 'yiddish', 'Ri-BOY-noy shel OY-lem', 'Master of the Universe', ARRAY['Creator', 'Sovereign'], ARRAY['Nehemiah 9:6', 'Psalm 24:1'], 'Used in personal prayer and supplication, often as an opening address to God.', 'The master craftsman and ruler of all existence, whose dominion encompasses every corner of creation.', ARRAY[]::uuid[], 'A common opening in Jewish prayer. Combines intimacy ("Master") with cosmic scope ("of the Universe").'),
('גאָט', 'yiddish', 'GOHT', 'God', ARRAY['Creator', 'Sovereign'], ARRAY['Genesis 1:1', 'Deuteronomy 6:4'], 'The everyday Yiddish word for God, used in conversation and informal contexts.', 'The one true God, creator and sustainer of all existence, known intimately in daily life.', ARRAY[]::uuid[], 'The standard Yiddish word for God, derived from Germanic roots. Used in everyday speech.'),
('דער באַשעפער', 'yiddish', 'Der ba-SHEH-fer', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Isaiah 40:28'], 'Used in religious education and when discussing God''s creative work.', 'The divine creator who fashioned the universe with wisdom and purpose, bringing order from void.', ARRAY[]::uuid[], 'From "bashafn" (to create). Emphasizes God''s role as the originator of all things.'),
('דער רופא', 'yiddish', 'Der ROY-feh', 'The Healer / The Doctor', ARRAY['Healer'], ARRAY['Exodus 15:26', 'Psalm 147:3'], 'Invoked in prayers for the sick (Mi Sheberach) and healing traditions.', 'The divine healer who restores health to body and soul, the ultimate physician.', ARRAY[]::uuid[], 'From Hebrew "rofeh" (healer/physician). Used in healing prayers and blessings.'),
('טאַטע אין הימל', 'yiddish', 'TAH-teh in HIM-mel', 'Father in Heaven', ARRAY['Father', 'Provider'], ARRAY['Matthew 6:9', 'Psalm 68:5'], 'Used in intimate personal prayer, expressing closeness and trust in God as a father.', 'The loving heavenly father who provides, protects, and tenderly cares for His children.', ARRAY[]::uuid[], '"Tate" (father/papa) "in himl" (in heaven). An intimate, tender way to address God.'),
('דער אייביקער', 'yiddish', 'Der AY-bi-ker', 'The Eternal One', ARRAY['Eternal', 'Faithful'], ARRAY['Psalm 90:2', 'Isaiah 40:28'], 'Used in liturgical and philosophical contexts to emphasize God''s timelessness.', 'The eternal God who exists beyond the boundaries of time, without beginning or end.', ARRAY[]::uuid[], 'From "eybik" (eternal/everlasting). Emphasizes God''s unchanging, timeless nature.');

-- ============================================================
-- HAUSA NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Ubangiji', 'hausa', 'Oo-ban-GEE-jee', 'Lord / Master', ARRAY['Sovereign', 'King'], ARRAY['Psalm 24:1', 'Philippians 2:11'], 'The primary Hausa word for God/Lord, used in both Christian and Islamic worship throughout Northern Nigeria.', 'The supreme lord and master whose authority governs all of creation and human affairs.', ARRAY[]::uuid[], 'The most common Hausa term for God. Used universally across religious traditions in Hausaland.'),
('Allah', 'hausa', 'Al-LAH', 'God / The One God', ARRAY['Creator', 'Sovereign', 'Eternal'], ARRAY['Deuteronomy 6:4', 'Isaiah 45:5'], 'Used widely in Hausa-speaking regions by both Muslims and Christians to refer to the one true God.', 'The one true God, singular and absolute, whose existence and authority are unquestioned and supreme.', ARRAY[]::uuid[], 'From Arabic "Allah." Widely used in Hausa regardless of religious affiliation.'),
('Mai Iko Duka', 'hausa', 'My EE-koh DOO-kah', 'The Almighty / The All-Powerful', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Jeremiah 32:17'], 'Used in prayers and worship when declaring God''s supreme power over all circumstances.', 'The all-powerful God whose might is limitless and who can accomplish anything He desires.', ARRAY[]::uuid[], 'Literally "Owner of All Power." Emphasizes God''s omnipotence in Hausa theology.'),
('Mai Ceto', 'hausa', 'My CHEH-toh', 'The Savior / Redeemer', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:3', 'Luke 2:11'], 'Used in Christian contexts when speaking of God''s salvation and redemptive work.', 'The divine savior who rescues from danger, sin, and eternal destruction with powerful deliverance.', ARRAY[]::uuid[], 'From "ceto" (salvation/rescue). A key term in Hausa Christian vocabulary.'),
('Mahalicci', 'hausa', 'Ma-ha-LIT-chee', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Psalm 104:24'], 'Used in worship and religious education when teaching about God as the creator of all things.', 'The divine creator who brought all things into existence through His word and wisdom.', ARRAY[]::uuid[], 'From "halitta" (creation/creature). Refers to God as the one who creates.'),
('Mai Warkarwa', 'hausa', 'My War-KAR-wah', 'The Healer', ARRAY['Healer'], ARRAY['Exodus 15:26', 'James 5:15'], 'Used in prayers for healing and during anointing services in Hausa Christian communities.', 'The divine healer who restores health and wholeness to those who call upon His name.', ARRAY[]::uuid[], 'From "warkarwa" (healing/cure). Used prominently in Hausa faith healing traditions.'),
('Sarkin Salama', 'hausa', 'SAR-kin Sa-LAH-mah', 'King of Peace', ARRAY['Peace', 'King'], ARRAY['Isaiah 9:6', 'John 14:27'], 'Used in blessings and when praying for peace in communities and families.', 'The king whose reign brings true peace and whose presence calms every storm and conflict.', ARRAY[]::uuid[], '"Sarki" means king; "Salama" means peace. Echoes the Messianic title "Prince of Peace."'),
('Mai Jinƙai', 'hausa', 'My Jin-KAI', 'The Merciful One', ARRAY['Mercy', 'Compassion'], ARRAY['Psalm 103:8', 'Micah 7:18'], 'Invoked when seeking God''s mercy and compassion in prayer and supplication.', 'The compassionate God who extends mercy beyond measure to those who humbly seek His face.', ARRAY[]::uuid[], 'From "jinƙai" (mercy/compassion). Emphasizes God''s merciful nature.');

-- ============================================================
-- WOLOF NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Yàlla', 'wolof', 'YAH-lah', 'God', ARRAY['Creator', 'Sovereign'], ARRAY['Genesis 1:1', 'Deuteronomy 6:4'], 'The standard Wolof word for God, used universally in Senegal and Gambia in all religious contexts.', 'The supreme God, creator and ruler of all, recognized as the ultimate authority in Wolof tradition.', ARRAY[]::uuid[], 'The primary Wolof term for God. Used by Muslims, Christians, and practitioners of traditional religion alike.'),
('Borom Asamaan', 'wolof', 'BOH-rom Ah-sah-MAHN', 'Lord of the Heavens', ARRAY['Creator', 'Sovereign'], ARRAY['Psalm 115:3', 'Isaiah 66:1'], 'Used in reverent worship to acknowledge God''s dominion over the celestial realm.', 'The lord who reigns over the heavens, whose dwelling is above all and whose view encompasses everything.', ARRAY[]::uuid[], '"Borom" means owner/lord; "Asamaan" means heavens/sky. Emphasizes God''s cosmic sovereignty.'),
('Kilifa gi', 'wolof', 'Ki-LEE-fah gee', 'The Almighty / The All-Powerful', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Psalm 147:5'], 'Used when emphasizing God''s supreme power and ability to accomplish all things.', 'The almighty ruler whose power knows no limits and whose strength sustains all creation.', ARRAY[]::uuid[], 'Refers to the supreme, all-powerful authority. Used in both Islamic and Christian Wolof contexts.'),
('Borom Jàmm', 'wolof', 'BOH-rom JAHM', 'Lord of Peace', ARRAY['Peace'], ARRAY['Judges 6:24', 'John 14:27'], 'Used in blessings, greetings, and when seeking divine peace for individuals and communities.', 'The lord who is the source of all true peace and whose presence brings tranquility and harmony.', ARRAY[]::uuid[], '"Borom" (owner/lord) and "Jàmm" (peace). Peace is a central value in Wolof culture.'),
('Sang bi', 'wolof', 'SAHNG bee', 'The King', ARRAY['King', 'Sovereign'], ARRAY['Psalm 47:7', '1 Timothy 1:17'], 'Used in worship to exalt God as the supreme king above all earthly rulers.', 'The divine king whose rule is just, eternal, and extends over all peoples and nations.', ARRAY[]::uuid[], 'Literally "The King." Used to express God''s supreme royal authority in Wolof worship.'),
('Lijjanti bi', 'wolof', 'Lij-JAHN-tee bee', 'The Savior / Deliverer', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Acts 4:12'], 'Used in evangelistic preaching and personal testimony about God''s saving power.', 'The divine deliverer who rescues from spiritual bondage and grants eternal freedom and life.', ARRAY[]::uuid[], 'From "lijjanti" (to save/deliver). A key term in Wolof Christian vocabulary.'),
('Borom Yérmande', 'wolof', 'BOH-rom Yehr-MAHN-deh', 'Lord of Mercy / Compassion', ARRAY['Mercy', 'Compassion'], ARRAY['Psalm 103:8', 'Lamentations 3:22-23'], 'Invoked in prayers for mercy and when expressing gratitude for God''s compassionate nature.', 'The merciful lord whose compassion overflows to all who seek His face in humility and need.', ARRAY[]::uuid[], '"Borom" (owner/lord) and "Yérmande" (mercy/compassion). Central to Wolof understanding of God.'),
('Aji Bind ji', 'wolof', 'AH-jee BIND jee', 'The Creator / The Fashioner', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Psalm 139:13-14'], 'Used when speaking of God''s creative work, especially in the context of human creation.', 'The divine artisan who carefully fashions and shapes each creation with purpose and love.', ARRAY[]::uuid[], 'From "bind" (to create/fashion). Emphasizes the personal, intentional nature of God''s creative work.');

-- ============================================================
-- HAITIAN CREOLE NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('Bondye', 'haitian_creole', 'Bon-DYEH', 'God / The Good God', ARRAY['Creator', 'Sovereign'], ARRAY['Genesis 1:1', 'Psalm 100:5'], 'The standard Haitian Creole word for God, used in all religious contexts throughout Haiti.', 'The good God whose nature is fundamentally benevolent and whose goodness permeates all of creation.', ARRAY[]::uuid[], 'From French "Bon Dieu" (Good God). The primary Creole term for the supreme deity.'),
('Senyè a', 'haitian_creole', 'Sen-YEH ah', 'The Lord', ARRAY['Sovereign', 'King'], ARRAY['Psalm 24:1', 'Acts 2:36'], 'Used in Haitian Creole Bible translations and worship as the equivalent of "The Lord."', 'The sovereign lord who rules with justice and mercy, whose authority is recognized by all creation.', ARRAY[]::uuid[], 'From French "Seigneur" (Lord). The standard Creole rendering of "The Lord" in Scripture.'),
('Toupisan', 'haitian_creole', 'Too-pee-SAHN', 'The Almighty / All-Powerful', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Job 42:2'], 'Used when declaring God''s supreme power over all circumstances and challenges.', 'The all-powerful God whose might exceeds all human understanding and earthly power combined.', ARRAY[]::uuid[], 'From French "Tout-Puissant" (All-Powerful). Equivalent to "Almighty" in Haitian theology.'),
('Sovè a', 'haitian_creole', 'Soh-VEH ah', 'The Savior', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Titus 2:13'], 'Used in evangelistic preaching and worship celebrating God''s salvation.', 'The divine savior who rescues from sin, oppression, and eternal destruction with mighty power.', ARRAY[]::uuid[], 'From French "Sauveur" (Savior). Central to Haitian Christian identity and worship.'),
('Papa Bondye', 'haitian_creole', 'Pa-PAH Bon-DYEH', 'Father God / God the Father', ARRAY['Father', 'Provider'], ARRAY['Matthew 6:9', 'Romans 8:15'], 'Used in intimate prayer and worship, especially in Pentecostal and evangelical churches.', 'The loving heavenly father who provides, protects, and cares for His children with tender devotion.', ARRAY[]::uuid[], '"Papa" (father/daddy) + "Bondye" (God). An intimate, familial way to address God in Creole.'),
('Kreyatè a', 'haitian_creole', 'Krey-ah-TEH ah', 'The Creator', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Psalm 104:24'], 'Used in worship and teaching contexts when emphasizing God''s creative power.', 'The divine creator who spoke the universe into existence and continues to sustain all life.', ARRAY[]::uuid[], 'From French "Créateur" (Creator). Emphasizes God''s role as maker of all things.'),
('Gerizon', 'haitian_creole', 'Geh-ree-ZOHN', 'The Healer', ARRAY['Healer'], ARRAY['Exodus 15:26', 'Matthew 4:23'], 'Invoked in healing services and prayer meetings, especially in charismatic churches.', 'The divine healer who restores health and wholeness to body, mind, and spirit.', ARRAY[]::uuid[], 'From French "Guérison" (healing/cure). Healing is a central theme in Haitian Christianity.'),
('Wa Lapè', 'haitian_creole', 'Wah Lah-PEH', 'King of Peace', ARRAY['Peace', 'King'], ARRAY['Isaiah 9:6', 'Ephesians 2:14'], 'Used in blessings and prayers for peace, especially during times of national or personal turmoil.', 'The king whose reign establishes true peace and whose presence brings calm to every storm.', ARRAY[]::uuid[], 'From French "Roi de la Paix" (King of Peace). Reflects the deep Haitian longing for peace.');

-- ============================================================
-- WU CHINESE NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('上帝', 'wu_chinese', 'Zaon-ti (Shanghainese)', 'Supreme Emperor / God Above', ARRAY['Sovereign', 'Creator', 'King'], ARRAY['Genesis 1:1', 'Psalm 47:2'], 'Used in Wu Chinese Bible translations and worship as the primary term for God, emphasizing supreme sovereignty.', 'The supreme emperor who reigns above all, whose authority and majesty are unmatched in heaven and earth.', ARRAY[]::uuid[], 'Literally "Above Emperor." An ancient Chinese term for the supreme deity, used in early Protestant Bible translations.'),
('神', 'wu_chinese', 'Zen (Shanghainese)', 'God / Spirit / Divine Being', ARRAY['Creator', 'Eternal'], ARRAY['John 4:24', 'Genesis 1:2'], 'Used as a general term for God in Wu Chinese Christian contexts and Bible translations.', 'The divine spirit whose essence transcends the physical world and who animates all of creation.', ARRAY[]::uuid[], 'A broad term for divinity or spirit. Used in the Chinese Union Version Bible alongside 上帝.'),
('天父', 'wu_chinese', 'Thi-vu (Shanghainese)', 'Heavenly Father', ARRAY['Father', 'Provider'], ARRAY['Matthew 6:9', 'Matthew 7:11'], 'Used in prayer and worship, especially when reciting the Lord''s Prayer in Wu Chinese.', 'The heavenly father who watches over His children from above with unwavering love and provision.', ARRAY[]::uuid[], '"天" (heaven) + "父" (father). The standard term for "Heavenly Father" in Chinese Christianity.'),
('全能者', 'wu_chinese', 'Jyoe-nen-tsa (Shanghainese)', 'The Almighty / Omnipotent One', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Genesis 17:1'], 'Used in formal worship and theological discourse to describe God''s unlimited power.', 'The omnipotent one whose power is complete and all-encompassing, able to accomplish all things.', ARRAY[]::uuid[], '"全" (complete/all) + "能" (ability/power) + "者" (one who). Equivalent to El Shaddai.'),
('救主', 'wu_chinese', 'Jieu-tsu (Shanghainese)', 'Savior / Lord of Salvation', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Luke 2:11'], 'Used in evangelistic contexts and worship celebrating God''s salvation through Christ.', 'The lord of salvation who rescues from sin and death, offering eternal life to all who believe.', ARRAY[]::uuid[], '"救" (to save/rescue) + "主" (lord/master). The standard Chinese term for "Savior."'),
('造物主', 'wu_chinese', 'Dzau-veh-tsu (Shanghainese)', 'Creator / Lord of Creation', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Romans 1:25'], 'Used in worship and apologetics when discussing God as the origin of all things.', 'The lord of creation who fashioned all things with wisdom and purpose, from the cosmos to the smallest creature.', ARRAY[]::uuid[], '"造" (to make) + "物" (things) + "主" (lord). Emphasizes God as the maker of all things.'),
('和平之君', 'wu_chinese', 'Ghu-bin-tsy-jyoen (Shanghainese)', 'Prince of Peace', ARRAY['Peace', 'King'], ARRAY['Isaiah 9:6', 'John 14:27'], 'Used in Messianic references and prayers for peace in Wu Chinese Christian communities.', 'The royal prince whose reign brings perfect peace and harmony to all who accept His rule.', ARRAY[]::uuid[], '"和平" (peace) + "之" (of) + "君" (prince/ruler). Translation of the Messianic title from Isaiah 9:6.'),
('医治者', 'wu_chinese', 'Yi-dzy-tsa (Shanghainese)', 'The Healer', ARRAY['Healer'], ARRAY['Exodus 15:26', 'Matthew 9:35'], 'Used in healing prayers and services in Wu Chinese-speaking churches.', 'The divine healer who restores wholeness to broken bodies, wounded hearts, and troubled minds.', ARRAY[]::uuid[], '"医治" (to heal/cure) + "者" (one who). Describes God as the ultimate source of healing.');

-- ============================================================
-- MANDARIN NAMES
-- ============================================================
INSERT INTO public.names_of_god (name, language, pronunciation, meaning, attribute, scripture_refs, context_of_use, divine_personality, related_names, notes) VALUES
('上帝', 'mandarin', 'Shàng Dì', 'Supreme Emperor / God Above', ARRAY['Sovereign', 'Creator', 'King'], ARRAY['Genesis 1:1', 'Psalm 47:2'], 'The traditional Chinese term for God, used in early Protestant Bible translations and widely recognized.', 'The supreme emperor above all, whose sovereignty and majesty govern all of creation with righteous authority.', ARRAY[]::uuid[], 'An ancient Chinese concept of a supreme deity. Adopted by Protestant missionaries as the term for God.'),
('神', 'mandarin', 'Shén', 'God / Spirit / Divine Being', ARRAY['Creator', 'Eternal'], ARRAY['John 4:24', 'Genesis 1:2'], 'Used alongside 上帝 in Mandarin Bible translations. Preferred by some denominations.', 'The divine spirit who is the source of all life and existence, transcending physical form.', ARRAY[]::uuid[], 'Used in the Chinese Union Version Bible. The debate over 上帝 vs 神 was a major controversy in Chinese Christianity.'),
('天父', 'mandarin', 'Tiān Fù', 'Heavenly Father', ARRAY['Father', 'Provider'], ARRAY['Matthew 6:9', 'Luke 11:2'], 'Used in prayer and worship as the intimate address for God the Father.', 'The loving heavenly father who watches over and provides for His children with faithful care and tenderness.', ARRAY[]::uuid[], '"天" (heaven) + "父" (father). Universally used in Mandarin-speaking churches.'),
('全能的神', 'mandarin', 'Quán Néng de Shén', 'Almighty God', ARRAY['Almighty', 'Power'], ARRAY['Revelation 1:8', 'Genesis 17:1'], 'Used in formal worship, hymns, and theological contexts to emphasize God''s omnipotence.', 'The almighty God whose power is without limit, who upholds the universe by His mighty word.', ARRAY[]::uuid[], '"全能" (omnipotent) + "的" (possessive) + "神" (God). Standard Mandarin equivalent of "Almighty God."'),
('救主', 'mandarin', 'Jiù Zhǔ', 'Savior / Lord of Salvation', ARRAY['Savior', 'Deliverer'], ARRAY['Isaiah 43:11', 'Luke 2:11'], 'Used in evangelism, worship, and personal testimony about God''s saving work.', 'The lord of salvation who rescues from sin and grants eternal life to all who trust in Him.', ARRAY[]::uuid[], '"救" (to save) + "主" (lord). The standard Chinese Christian term for the Savior.'),
('创造主', 'mandarin', 'Chuàng Zào Zhǔ', 'Creator / Lord of Creation', ARRAY['Creator'], ARRAY['Genesis 1:1', 'Colossians 1:16'], 'Used in worship and apologetics when discussing God''s role as the maker of all things.', 'The lord of creation who designed and fashioned the universe with infinite wisdom and purpose.', ARRAY[]::uuid[], '"创造" (to create) + "主" (lord). Emphasizes God''s creative authority and power.'),
('和平的君王', 'mandarin', 'Hé Píng de Jūn Wáng', 'Prince of Peace', ARRAY['Peace', 'King'], ARRAY['Isaiah 9:6', 'Ephesians 2:14'], 'Used in Messianic contexts and when praying for peace in churches and communities.', 'The prince whose reign brings true and lasting peace to hearts, homes, and nations.', ARRAY[]::uuid[], '"和平" (peace) + "的" (possessive) + "君王" (prince/king). From the Messianic prophecy of Isaiah 9:6.'),
('耶和华以勒', 'mandarin', 'Yēhéhuá Yǐlè', 'The LORD Will Provide (Jehovah Jireh)', ARRAY['Provider', 'Faithful'], ARRAY['Genesis 22:14', 'Philippians 4:19'], 'Used when trusting God for provision and in testimonies of God''s faithful supply.', 'The God who sees our needs before we ask and provides abundantly at exactly the right moment.', ARRAY[]::uuid[], 'Transliteration of "YHWH Yireh" into Mandarin. Named by Abraham on Mount Moriah.'),
('万王之王', 'mandarin', 'Wàn Wáng zhī Wáng', 'King of Kings', ARRAY['King', 'Sovereign'], ARRAY['Revelation 19:16', '1 Timothy 6:15'], 'Used in grand worship and eschatological contexts to exalt God above all earthly powers.', 'The king above ten thousand kings, whose eternal reign surpasses every earthly kingdom and authority.', ARRAY[]::uuid[], '"万" (ten thousand/myriad) + "王" (king) + "之" (of) + "王" (king). Literally "King of Ten Thousand Kings."'),
('圣灵', 'mandarin', 'Shèng Líng', 'The Holy Spirit', ARRAY['Wisdom', 'Comforter'], ARRAY['John 14:26', 'Acts 1:8'], 'Used in Trinitarian worship and when speaking of God''s indwelling presence and empowerment.', 'The holy spirit of God who indwells, empowers, comforts, and guides believers into all truth.', ARRAY[]::uuid[], '"圣" (holy/sacred) + "灵" (spirit). The standard Mandarin term for the Holy Spirit.');

-- ============================================================
-- SET UP CROSS-LANGUAGE RELATIONSHIPS
-- ============================================================
-- Link names with similar meanings across languages

-- Creator relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Creator' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Creator' = ANY(attribute) AND meaning ILIKE '%creator%';

-- Healer relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Healer' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Healer' = ANY(attribute);

-- Savior/Deliverer relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Savior' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Savior' = ANY(attribute);

-- Peace relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Peace' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Peace' = ANY(attribute);

-- King/Sovereign relationships (only "King of Kings" type names)
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'King' = ANY(attribute)
  AND meaning ILIKE '%king%'
  AND id != names_of_god.id
)
WHERE 'King' = ANY(attribute) AND meaning ILIKE '%king%';

-- Almighty/Power relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Almighty' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Almighty' = ANY(attribute);

-- Father relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Father' = ANY(attribute)
  AND id != names_of_god.id
)
WHERE 'Father' = ANY(attribute);

-- Provider relationships
UPDATE public.names_of_god SET related_names = (
  SELECT array_agg(id) FROM public.names_of_god
  WHERE 'Provider' = ANY(attribute)
  AND meaning ILIKE '%provid%'
  AND id != names_of_god.id
)
WHERE 'Provider' = ANY(attribute) AND meaning ILIKE '%provid%';
