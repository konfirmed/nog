export type UILocale = "en" | "es" | "fr" | "pt" | "yo" | "ha";

export const UI_LOCALES: Record<UILocale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  yo: "Yorùbá",
  ha: "Hausa",
};

type TranslationKeys = {
  // Nav
  "nav.compare": string;
  "nav.relationshipMap": string;
  // Home
  "home.title": string;
  "home.searchPlaceholder": string;
  "home.language": string;
  "home.findByAttribute": string;
  "home.clearAll": string;
  "home.more": string;
  "home.showLess": string;
  "home.showing": string;
  "home.of": string;
  "home.names": string;
  "home.matching": string;
  "home.noMatch": string;
  "home.compareNames": string;
  "home.exploreRelationships": string;
  "home.copied": string;
  // Pagination
  "pagination.first": string;
  "pagination.previous": string;
  "pagination.next": string;
  "pagination.last": string;
  "pagination.page": string;
  "pagination.of": string;
  // Detail page
  "detail.backToHome": string;
  "detail.meaning": string;
  "detail.languageLabel": string;
  "detail.attributes": string;
  "detail.scriptureRefs": string;
  "detail.contextOfUse": string;
  "detail.divinePersonality": string;
  "detail.notes": string;
  "detail.relatedNames": string;
  // Devotional
  "devotional.title": string;
  "devotional.viewDetails": string;
  "devotional.readDevotional": string;
  "devotional.showLess": string;
  "devotional.scripture": string;
  "devotional.whenToUse": string;
  "devotional.divineCharacter": string;
  "devotional.reflect": string;
  "devotional.share": string;
  "devotional.copy": string;
  // Graph
  "graph.filterByLanguage": string;
  "graph.clearFilters": string;
  "graph.showing": string;
  "graph.namesWith": string;
  "graph.connections": string;
  "graph.loading": string;
  "graph.initializing": string;
  "graph.noData": string;
  "graph.mobileTip": string;
  "graph.relationshipMap": string;
  "graph.viewFullMap": string;
  "graph.connectedNames": string;
  // Compare
  "compare.title": string;
  "compare.selectNames": string;
  // Etymology
  "etymology.breakdown": string;
  "etymology.literalMeaning": string;
  "etymology.legend": string;
  "etymology.prefix": string;
  "etymology.root": string;
  "etymology.suffix": string;
  "etymology.connector": string;
  // Audio
  "audio.listen": string;
  "audio.stop": string;
  // Theme
  "theme.light": string;
  "theme.dark": string;
  "theme.system": string;
};

const translations: Record<UILocale, TranslationKeys> = {
  en: {
    "nav.compare": "Compare",
    "nav.relationshipMap": "Relationship Map",
    "home.title": "NAMES of G_D Across Cultures",
    "home.searchPlaceholder": "Search by name, meaning, pronunciation, or language...",
    "home.language": "Language:",
    "home.findByAttribute": "Find by attribute:",
    "home.clearAll": "Clear all",
    "home.more": "more",
    "home.showLess": "Show less",
    "home.showing": "Showing",
    "home.of": "of",
    "home.names": "names",
    "home.matching": "matching:",
    "home.noMatch": "No names match your search.",
    "home.compareNames": "Compare Names",
    "home.exploreRelationships": "Explore Relationships",
    "home.copied": "Copied to clipboard",
    "pagination.first": "First",
    "pagination.previous": "Previous",
    "pagination.next": "Next",
    "pagination.last": "Last",
    "pagination.page": "Page",
    "pagination.of": "of",
    "detail.backToHome": "← Back to Home",
    "detail.meaning": "Meaning:",
    "detail.languageLabel": "Language:",
    "detail.attributes": "Attributes:",
    "detail.scriptureRefs": "Scripture References:",
    "detail.contextOfUse": "Context of Use:",
    "detail.divinePersonality": "Divine Personality:",
    "detail.notes": "Notes:",
    "detail.relatedNames": "Related Names",
    "devotional.title": "Daily Devotional",
    "devotional.viewDetails": "View full details →",
    "devotional.readDevotional": "Read today's devotional",
    "devotional.showLess": "Show less",
    "devotional.scripture": "Scripture",
    "devotional.whenToUse": "When to use this name",
    "devotional.divineCharacter": "Divine Character",
    "devotional.reflect": "Reflect",
    "devotional.share": "Share:",
    "devotional.copy": "Copy",
    "graph.filterByLanguage": "Filter by language:",
    "graph.clearFilters": "Clear filters",
    "graph.showing": "Showing",
    "graph.namesWith": "names with",
    "graph.connections": "connections",
    "graph.loading": "Loading graph...",
    "graph.initializing": "Initializing...",
    "graph.noData": "No data to display",
    "graph.mobileTip": "Tip: Pinch to zoom, drag to pan, tap a node to view details",
    "graph.relationshipMap": "Relationship Map",
    "graph.viewFullMap": "View full map →",
    "graph.connectedNames": "connected names. Click a node to explore.",
    "compare.title": "Compare Names",
    "compare.selectNames": "Select names to compare",
    "etymology.breakdown": "Etymology Breakdown",
    "etymology.literalMeaning": "Literal meaning:",
    "etymology.legend": "Legend:",
    "etymology.prefix": "Prefix",
    "etymology.root": "Root",
    "etymology.suffix": "Suffix",
    "etymology.connector": "Connector",
    "audio.listen": "Listen",
    "audio.stop": "Stop",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
  },
  es: {
    "nav.compare": "Comparar",
    "nav.relationshipMap": "Mapa de Relaciones",
    "home.title": "NOMBRES de D_S a Través de las Culturas",
    "home.searchPlaceholder": "Buscar por nombre, significado, pronunciación o idioma...",
    "home.language": "Idioma:",
    "home.findByAttribute": "Buscar por atributo:",
    "home.clearAll": "Limpiar todo",
    "home.more": "más",
    "home.showLess": "Ver menos",
    "home.showing": "Mostrando",
    "home.of": "de",
    "home.names": "nombres",
    "home.matching": "coinciden:",
    "home.noMatch": "Ningún nombre coincide con tu búsqueda.",
    "home.compareNames": "Comparar Nombres",
    "home.exploreRelationships": "Explorar Relaciones",
    "home.copied": "Copiado al portapapeles",
    "pagination.first": "Primera",
    "pagination.previous": "Anterior",
    "pagination.next": "Siguiente",
    "pagination.last": "Última",
    "pagination.page": "Página",
    "pagination.of": "de",
    "detail.backToHome": "← Volver al Inicio",
    "detail.meaning": "Significado:",
    "detail.languageLabel": "Idioma:",
    "detail.attributes": "Atributos:",
    "detail.scriptureRefs": "Referencias Bíblicas:",
    "detail.contextOfUse": "Contexto de Uso:",
    "detail.divinePersonality": "Personalidad Divina:",
    "detail.notes": "Notas:",
    "detail.relatedNames": "Nombres Relacionados",
    "devotional.title": "Devocional Diario",
    "devotional.viewDetails": "Ver detalles completos →",
    "devotional.readDevotional": "Leer el devocional de hoy",
    "devotional.showLess": "Ver menos",
    "devotional.scripture": "Escritura",
    "devotional.whenToUse": "Cuándo usar este nombre",
    "devotional.divineCharacter": "Carácter Divino",
    "devotional.reflect": "Reflexión",
    "devotional.share": "Compartir:",
    "devotional.copy": "Copiar",
    "graph.filterByLanguage": "Filtrar por idioma:",
    "graph.clearFilters": "Limpiar filtros",
    "graph.showing": "Mostrando",
    "graph.namesWith": "nombres con",
    "graph.connections": "conexiones",
    "graph.loading": "Cargando gráfico...",
    "graph.initializing": "Inicializando...",
    "graph.noData": "No hay datos para mostrar",
    "graph.mobileTip": "Consejo: Pellizca para zoom, arrastra para mover, toca un nodo para ver detalles",
    "graph.relationshipMap": "Mapa de Relaciones",
    "graph.viewFullMap": "Ver mapa completo →",
    "graph.connectedNames": "nombres conectados. Haz clic en un nodo para explorar.",
    "compare.title": "Comparar Nombres",
    "compare.selectNames": "Seleccionar nombres para comparar",
    "etymology.breakdown": "Desglose Etimológico",
    "etymology.literalMeaning": "Significado literal:",
    "etymology.legend": "Leyenda:",
    "etymology.prefix": "Prefijo",
    "etymology.root": "Raíz",
    "etymology.suffix": "Sufijo",
    "etymology.connector": "Conector",
    "audio.listen": "Escuchar",
    "audio.stop": "Parar",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",
  },
  fr: {
    "nav.compare": "Comparer",
    "nav.relationshipMap": "Carte des Relations",
    "home.title": "NOMS de D_EU à Travers les Cultures",
    "home.searchPlaceholder": "Rechercher par nom, signification, prononciation ou langue...",
    "home.language": "Langue :",
    "home.findByAttribute": "Rechercher par attribut :",
    "home.clearAll": "Tout effacer",
    "home.more": "plus",
    "home.showLess": "Voir moins",
    "home.showing": "Affichage de",
    "home.of": "sur",
    "home.names": "noms",
    "home.matching": "correspondant :",
    "home.noMatch": "Aucun nom ne correspond à votre recherche.",
    "home.compareNames": "Comparer les Noms",
    "home.exploreRelationships": "Explorer les Relations",
    "home.copied": "Copié dans le presse-papiers",
    "pagination.first": "Premier",
    "pagination.previous": "Précédent",
    "pagination.next": "Suivant",
    "pagination.last": "Dernier",
    "pagination.page": "Page",
    "pagination.of": "sur",
    "detail.backToHome": "← Retour à l'accueil",
    "detail.meaning": "Signification :",
    "detail.languageLabel": "Langue :",
    "detail.attributes": "Attributs :",
    "detail.scriptureRefs": "Références Bibliques :",
    "detail.contextOfUse": "Contexte d'utilisation :",
    "detail.divinePersonality": "Personnalité Divine :",
    "detail.notes": "Notes :",
    "detail.relatedNames": "Noms Associés",
    "devotional.title": "Méditation Quotidienne",
    "devotional.viewDetails": "Voir les détails complets →",
    "devotional.readDevotional": "Lire la méditation du jour",
    "devotional.showLess": "Voir moins",
    "devotional.scripture": "Écriture",
    "devotional.whenToUse": "Quand utiliser ce nom",
    "devotional.divineCharacter": "Caractère Divin",
    "devotional.reflect": "Réflexion",
    "devotional.share": "Partager :",
    "devotional.copy": "Copier",
    "graph.filterByLanguage": "Filtrer par langue :",
    "graph.clearFilters": "Effacer les filtres",
    "graph.showing": "Affichage de",
    "graph.namesWith": "noms avec",
    "graph.connections": "connexions",
    "graph.loading": "Chargement du graphique...",
    "graph.initializing": "Initialisation...",
    "graph.noData": "Aucune donnée à afficher",
    "graph.mobileTip": "Astuce : Pincez pour zoomer, faites glisser pour déplacer, touchez un nœud pour voir les détails",
    "graph.relationshipMap": "Carte des Relations",
    "graph.viewFullMap": "Voir la carte complète →",
    "graph.connectedNames": "noms connectés. Cliquez sur un nœud pour explorer.",
    "compare.title": "Comparer les Noms",
    "compare.selectNames": "Sélectionner les noms à comparer",
    "etymology.breakdown": "Analyse Étymologique",
    "etymology.literalMeaning": "Sens littéral :",
    "etymology.legend": "Légende :",
    "etymology.prefix": "Préfixe",
    "etymology.root": "Racine",
    "etymology.suffix": "Suffixe",
    "etymology.connector": "Connecteur",
    "audio.listen": "Écouter",
    "audio.stop": "Arrêter",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",
  },
  pt: {
    "nav.compare": "Comparar",
    "nav.relationshipMap": "Mapa de Relações",
    "home.title": "NOMES de D_US Através das Culturas",
    "home.searchPlaceholder": "Buscar por nome, significado, pronúncia ou idioma...",
    "home.language": "Idioma:",
    "home.findByAttribute": "Buscar por atributo:",
    "home.clearAll": "Limpar tudo",
    "home.more": "mais",
    "home.showLess": "Ver menos",
    "home.showing": "Mostrando",
    "home.of": "de",
    "home.names": "nomes",
    "home.matching": "correspondentes:",
    "home.noMatch": "Nenhum nome corresponde à sua busca.",
    "home.compareNames": "Comparar Nomes",
    "home.exploreRelationships": "Explorar Relações",
    "home.copied": "Copiado para a área de transferência",
    "pagination.first": "Primeira",
    "pagination.previous": "Anterior",
    "pagination.next": "Próxima",
    "pagination.last": "Última",
    "pagination.page": "Página",
    "pagination.of": "de",
    "detail.backToHome": "← Voltar ao Início",
    "detail.meaning": "Significado:",
    "detail.languageLabel": "Idioma:",
    "detail.attributes": "Atributos:",
    "detail.scriptureRefs": "Referências Bíblicas:",
    "detail.contextOfUse": "Contexto de Uso:",
    "detail.divinePersonality": "Personalidade Divina:",
    "detail.notes": "Notas:",
    "detail.relatedNames": "Nomes Relacionados",
    "devotional.title": "Devocional Diário",
    "devotional.viewDetails": "Ver detalhes completos →",
    "devotional.readDevotional": "Ler o devocional de hoje",
    "devotional.showLess": "Ver menos",
    "devotional.scripture": "Escritura",
    "devotional.whenToUse": "Quando usar este nome",
    "devotional.divineCharacter": "Caráter Divino",
    "devotional.reflect": "Reflexão",
    "devotional.share": "Compartilhar:",
    "devotional.copy": "Copiar",
    "graph.filterByLanguage": "Filtrar por idioma:",
    "graph.clearFilters": "Limpar filtros",
    "graph.showing": "Mostrando",
    "graph.namesWith": "nomes com",
    "graph.connections": "conexões",
    "graph.loading": "Carregando gráfico...",
    "graph.initializing": "Inicializando...",
    "graph.noData": "Nenhum dado para exibir",
    "graph.mobileTip": "Dica: Aperte para zoom, arraste para mover, toque em um nó para ver detalhes",
    "graph.relationshipMap": "Mapa de Relações",
    "graph.viewFullMap": "Ver mapa completo →",
    "graph.connectedNames": "nomes conectados. Clique em um nó para explorar.",
    "compare.title": "Comparar Nomes",
    "compare.selectNames": "Selecionar nomes para comparar",
    "etymology.breakdown": "Análise Etimológica",
    "etymology.literalMeaning": "Significado literal:",
    "etymology.legend": "Legenda:",
    "etymology.prefix": "Prefixo",
    "etymology.root": "Raiz",
    "etymology.suffix": "Sufixo",
    "etymology.connector": "Conector",
    "audio.listen": "Ouvir",
    "audio.stop": "Parar",
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "theme.system": "Sistema",
  },
  yo: {
    "nav.compare": "Fiwéra",
    "nav.relationshipMap": "Àwòrán Àjọ",
    "home.title": "ÀWỌN ORÚKỌ ỌLỌRUN Ní Àwọn Àṣà Ọ̀tọ̀ọ̀tọ̀",
    "home.searchPlaceholder": "Ṣàwárí pẹ̀lú orúkọ, ìtumọ̀, bí a ṣe ń pè é, tàbí èdè...",
    "home.language": "Èdè:",
    "home.findByAttribute": "Wá nípasẹ̀ àbùdá:",
    "home.clearAll": "Pa gbogbo rẹ̀",
    "home.more": "si",
    "home.showLess": "Fi díẹ̀ hàn",
    "home.showing": "Ń fi hàn",
    "home.of": "nínú",
    "home.names": "orúkọ",
    "home.matching": "tó bá mu:",
    "home.noMatch": "Kò sí orúkọ tó bá àwárí rẹ mu.",
    "home.compareNames": "Ṣe Fiwéra Orúkọ",
    "home.exploreRelationships": "Ṣàwárí Àjọṣe",
    "home.copied": "A ti daakọ sí clipboard",
    "pagination.first": "Àkọ́kọ́",
    "pagination.previous": "Ṣáájú",
    "pagination.next": "Tókàn",
    "pagination.last": "Ìkẹyìn",
    "pagination.page": "Ojú-ìwé",
    "pagination.of": "nínú",
    "detail.backToHome": "← Padà sí Ilé",
    "detail.meaning": "Ìtumọ̀:",
    "detail.languageLabel": "Èdè:",
    "detail.attributes": "Àwọn Àbùdá:",
    "detail.scriptureRefs": "Ìtọ́kasí Bíbélì:",
    "detail.contextOfUse": "Ìgbà tí a máa ń lò:",
    "detail.divinePersonality": "Ìwà Ọlọ́run:",
    "detail.notes": "Àkíyèsí:",
    "detail.relatedNames": "Àwọn Orúkọ Tó Jọra",
    "devotional.title": "Ìwádìí Ojoojúmọ́",
    "devotional.viewDetails": "Wo àlàyé kíkún →",
    "devotional.readDevotional": "Ka ìwádìí òní",
    "devotional.showLess": "Fi díẹ̀ hàn",
    "devotional.scripture": "Ìwé Mímọ́",
    "devotional.whenToUse": "Ìgbà tí a máa ń lo orúkọ yìí",
    "devotional.divineCharacter": "Ìwà Ọlọ́run",
    "devotional.reflect": "Ronú",
    "devotional.share": "Pín:",
    "devotional.copy": "Daakọ",
    "graph.filterByLanguage": "Ṣàyọ nípasẹ̀ èdè:",
    "graph.clearFilters": "Pa àwọn àyọ",
    "graph.showing": "Ń fi hàn",
    "graph.namesWith": "orúkọ pẹ̀lú",
    "graph.connections": "àsopọ̀",
    "graph.loading": "Ń gba àwòrán...",
    "graph.initializing": "Ń bẹ̀rẹ̀...",
    "graph.noData": "Kò sí data láti fi hàn",
    "graph.mobileTip": "Ìmọ̀ràn: Fún fún zoom, fà láti yí, tẹ ibi kan láti wo àlàyé",
    "graph.relationshipMap": "Àwòrán Àjọṣe",
    "graph.viewFullMap": "Wo àwòrán kíkún →",
    "graph.connectedNames": "orúkọ tó ní àsopọ̀. Tẹ ibi kan láti ṣàwárí.",
    "compare.title": "Ṣe Fiwéra Orúkọ",
    "compare.selectNames": "Yan orúkọ láti fi wéra",
    "etymology.breakdown": "Ìtúpalẹ̀ Ètímólójì",
    "etymology.literalMeaning": "Ìtumọ̀ gangan:",
    "etymology.legend": "Àlàyé:",
    "etymology.prefix": "Ìbẹ̀rẹ̀",
    "etymology.root": "Gbòǹgbo",
    "etymology.suffix": "Ìparí",
    "etymology.connector": "Asopọ̀",
    "audio.listen": "Gbọ́",
    "audio.stop": "Dúró",
    "theme.light": "Ìmọ́lẹ̀",
    "theme.dark": "Òkùnkùn",
    "theme.system": "Ètò",
  },
  ha: {
    "nav.compare": "Kwatanta",
    "nav.relationshipMap": "Taswirar Dangantaka",
    "home.title": "SUNAYE NA ALLAH A Cikin Al'adu Daban-daban",
    "home.searchPlaceholder": "Nema ta suna, ma'ana, yadda ake furta, ko harshe...",
    "home.language": "Harshe:",
    "home.findByAttribute": "Nema ta sifa:",
    "home.clearAll": "Share duka",
    "home.more": "ƙari",
    "home.showLess": "Nuna kaɗan",
    "home.showing": "Ana nuna",
    "home.of": "daga cikin",
    "home.names": "sunaye",
    "home.matching": "da suka dace:",
    "home.noMatch": "Babu suna da ya dace da binciken ka.",
    "home.compareNames": "Kwatanta Sunaye",
    "home.exploreRelationships": "Bincika Dangantaka",
    "home.copied": "An kwafa zuwa clipboard",
    "pagination.first": "Na Farko",
    "pagination.previous": "Na Baya",
    "pagination.next": "Na Gaba",
    "pagination.last": "Na Ƙarshe",
    "pagination.page": "Shafi",
    "pagination.of": "daga cikin",
    "detail.backToHome": "← Koma Gida",
    "detail.meaning": "Ma'ana:",
    "detail.languageLabel": "Harshe:",
    "detail.attributes": "Siffofi:",
    "detail.scriptureRefs": "Nassoshi daga Littafi Mai Tsarki:",
    "detail.contextOfUse": "Yanayin Amfani:",
    "detail.divinePersonality": "Halin Allah:",
    "detail.notes": "Bayani:",
    "detail.relatedNames": "Sunaye Masu Alaƙa",
    "devotional.title": "Zurfin Tunani na Yau",
    "devotional.viewDetails": "Duba cikakken bayani →",
    "devotional.readDevotional": "Karanta zurfin tunani na yau",
    "devotional.showLess": "Nuna kaɗan",
    "devotional.scripture": "Nassosi",
    "devotional.whenToUse": "Lokacin da za a yi amfani da wannan suna",
    "devotional.divineCharacter": "Halin Allah",
    "devotional.reflect": "Yi Tunani",
    "devotional.share": "Rabawa:",
    "devotional.copy": "Kwafa",
    "graph.filterByLanguage": "Tace ta harshe:",
    "graph.clearFilters": "Share tacewa",
    "graph.showing": "Ana nuna",
    "graph.namesWith": "sunaye da",
    "graph.connections": "haɗi",
    "graph.loading": "Ana loda zane...",
    "graph.initializing": "Ana fara...",
    "graph.noData": "Babu bayanai don nunawa",
    "graph.mobileTip": "Shawara: Matse don ƙara girma, ja don motsa, taɓa wuri don ganin cikakken bayani",
    "graph.relationshipMap": "Taswirar Dangantaka",
    "graph.viewFullMap": "Duba cikakken taswira →",
    "graph.connectedNames": "sunaye masu haɗi. Danna wuri don bincikawa.",
    "compare.title": "Kwatanta Sunaye",
    "compare.selectNames": "Zaɓi sunaye don kwatantawa",
    "etymology.breakdown": "Nazarin Asalin Kalma",
    "etymology.literalMeaning": "Ma'anar zahiri:",
    "etymology.legend": "Bayani:",
    "etymology.prefix": "Farkon",
    "etymology.root": "Tushe",
    "etymology.suffix": "Ƙarshe",
    "etymology.connector": "Haɗi",
    "audio.listen": "Saurara",
    "audio.stop": "Tsaya",
    "theme.light": "Haske",
    "theme.dark": "Duhu",
    "theme.system": "Tsarin",
  },
};

export type TranslationKey = keyof TranslationKeys;

export function getTranslation(locale: UILocale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function getTranslations(locale: UILocale): TranslationKeys {
  return translations[locale] ?? translations.en;
}
