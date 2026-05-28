const DATA_BASE = "/src/data/";

const DATA_FILES = {
  site: "public/site-content.json",
  assets: "public/local-assets.json",
  manifest: "public/manifest.json",
  archiveIndex: "public/archive-index.json",
  timeline: "public/timeline.json",
  biography: "public/biography.json",
  lifeStages: "public/life-stages.json",
  artworks: "public/artworks.json",
  photos: "public/photos-archive.json",
  sources: "public/sources.json",
  collections: "public/collections.json",
  canon: "public/museum-canon.json",
  exhibitions: "public/exhibitions.json",
  research: "public/research-themes.json",
  keywords: "public/keywords-tags.json",
  people: "public/people-contributors.json",
  support: "public/support-us.json",
  architecture: "public/website-architecture.json",
};

const state = {
  language: "en",
  data: {},
};

const LANGUAGE_STANDARD = {
  english: "en",
  chinese: "zh-Hant",
  chineseLabel: "Traditional Chinese",
};

const TRADITIONAL_PHRASES = {
  "中国现代记忆的木刻史诗": "中國現代記憶的木刻史詩",
  "古元数字美术馆": "古元數字美術館",
  "数字美术馆": "數字美術館",
  "关于古元": "關於古元",
  "馆藏专题": "館藏專題",
  "核心馆藏": "核心館藏",
  "档案库": "檔案庫",
  "家族档案": "家族檔案",
  "首页": "首頁",
  "展览": "展覽",
  "中国现代视觉文化数字档案": "中國現代視覺文化數字檔案",
  "国际策展人与翻译总监": "國際策展人與翻譯總監",
  "自幼由古元与夫人抚养长大": "自幼由古元與夫人撫養長大",
  "陪伴二老走过晚年": "陪伴二老走過晚年",
  "国际策展、翻译与跨文化诠释": "國際策展、翻譯與跨文化詮釋",
  "木刻版画": "木刻版畫",
  "新年画 / 版画": "新年畫 / 版畫",
};

const SIMPLIFIED_TO_TRADITIONAL = {
  与: "與",
  专: "專",
  业: "業",
  东: "東",
  个: "個",
  为: "為",
  义: "義",
  习: "習",
  乡: "鄉",
  书: "書",
  争: "爭",
  于: "於",
  产: "產",
  们: "們",
  众: "眾",
  会: "會",
  传: "傳",
  伤: "傷",
  伪: "偽",
  体: "體",
  关: "關",
  兴: "興",
  内: "內",
  军: "軍",
  农: "農",
  冲: "衝",
  减: "減",
  击: "擊",
  划: "劃",
  刘: "劉",
  创: "創",
  剧: "劇",
  动: "動",
  劳: "勞",
  勋: "勳",
  区: "區",
  华: "華",
  单: "單",
  卢: "盧",
  卫: "衛",
  厂: "廠",
  历: "歷",
  县: "縣",
  参: "參",
  双: "雙",
  发: "發",
  变: "變",
  台: "臺",
  号: "號",
  后: "後",
  响: "響",
  园: "園",
  围: "圍",
  国: "國",
  图: "圖",
  场: "場",
  复: "復",
  夺: "奪",
  奖: "獎",
  学: "學",
  宁: "寧",
  宝: "寶",
  实: "實",
  对: "對",
  导: "導",
  寿: "壽",
  将: "將",
  届: "屆",
  属: "屬",
  岁: "歲",
  师: "師",
  带: "帶",
  广: "廣",
  庄: "莊",
  庆: "慶",
  库: "庫",
  开: "開",
  张: "張",
  强: "強",
  归: "歸",
  当: "當",
  录: "錄",
  忆: "憶",
  态: "態",
  愿: "願",
  戏: "戲",
  战: "戰",
  护: "護",
  担: "擔",
  挥: "揮",
  据: "據",
  数: "數",
  无: "無",
  旧: "舊",
  时: "時",
  晖: "暉",
  术: "術",
  机: "機",
  来: "來",
  构: "構",
  枣: "棗",
  树: "樹",
  档: "檔",
  桥: "橋",
  毁: "毀",
  气: "氣",
  渐: "漸",
  温: "溫",
  湾: "灣",
  灯: "燈",
  烧: "燒",
  献: "獻",
  环: "環",
  现: "現",
  画: "畫",
  础: "礎",
  离: "離",
  种: "種",
  称: "稱",
  筑: "築",
  筛: "篩",
  简: "簡",
  篮: "籃",
  粮: "糧",
  紧: "緊",
  纪: "紀",
  纹: "紋",
  线: "線",
  组: "組",
  织: "織",
  绍: "紹",
  经: "經",
  结: "結",
  绘: "繪",
  给: "給",
  统: "統",
  续: "續",
  编: "編",
  罗: "羅",
  联: "聯",
  艺: "藝",
  节: "節",
  范: "範",
  荡: "蕩",
  获: "獲",
  蒋: "蔣",
  袭: "襲",
  装: "裝",
  观: "觀",
  视: "視",
  览: "覽",
  觉: "覺",
  触: "觸",
  计: "計",
  讨: "討",
  议: "議",
  记: "記",
  讲: "講",
  许: "許",
  论: "論",
  设: "設",
  评: "評",
  识: "識",
  诉: "訴",
  译: "譯",
  诗: "詩",
  话: "話",
  语: "語",
  课: "課",
  谁: "誰",
  调: "調",
  谈: "談",
  负: "負",
  贡: "貢",
  财: "財",
  责: "責",
  资: "資",
  赠: "贈",
  践: "踐",
  车: "車",
  转: "轉",
  轻: "輕",
  较: "較",
  输: "輸",
  边: "邊",
  达: "達",
  迁: "遷",
  过: "過",
  运: "運",
  这: "這",
  进: "進",
  连: "連",
  遗: "遺",
  钢: "鋼",
  铁: "鐵",
  铡: "鍘",
  键: "鍵",
  长: "長",
  间: "間",
  阳: "陽",
  阶: "階",
  际: "際",
  陕: "陝",
  随: "隨",
  难: "難",
  页: "頁",
  项: "項",
  领: "領",
  题: "題",
  风: "風",
  饰: "飾",
  馆: "館",
  马: "馬",
  验: "驗",
  鲁: "魯",
  鸟: "鳥",
  黄: "黃",
  龄: "齡",
};

function toTraditional(value) {
  let text = String(value || "");
  Object.entries(TRADITIONAL_PHRASES)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([simplified, traditional]) => {
      text = text.split(simplified).join(traditional);
    });
  return Array.from(text)
    .map((character) => SIMPLIFIED_TO_TRADITIONAL[character] || character)
    .join("");
}

const $ = (selector, root = document) => root.querySelector(selector);
const records = (key) => state.data[key]?.records || [];

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function setText(selector, text) {
  const element = $(selector);
  if (element) element.textContent = text || "";
}

function reset(element) {
  if (element) element.replaceChildren();
}

function localized(en, cn) {
  return state.language === "zh" ? toTraditional(cn || "") : en || "";
}

function localizedField(record, enKey, cnKey) {
  return localized(record?.[enKey], record?.[cnKey]);
}

function englishOnly(value) {
  return state.language === "en" ? value || "" : "";
}

function uiText(en, zh) {
  return state.language === "zh" ? toTraditional(zh) : en;
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function cleanAsset(value) {
  const text = String(value || "").trim();
  if (!text || /^to be/i.test(text) || /^uploaded image$/i.test(text)) return "";
  if (/docs\.google\.com\/spreadsheets/i.test(text)) return "";
  if (/drive\.google\.com|docs\.google\.com/i.test(text) && !/\.(avif|gif|jpe?g|png|webp)([?#].*)?$/i.test(text)) {
    return "";
  }
  return text;
}

function futureImagePath(fileName, type = "artworks") {
  const cleanName = String(fileName || "")
    .trim()
    .replace(/^public\//, "")
    .replace(/^\.\//, "");
  if (!cleanName) return "";
  if (/^(https?:|data:|blob:)/i.test(cleanName)) return cleanName;
  if (cleanName.startsWith("/images/")) return cleanName;
  if (cleanName.startsWith("/") || cleanName.startsWith("assets/")) return cleanName;
  if (cleanName.startsWith("images/")) return `/${cleanName}`;
  if (cleanName.includes("/")) return cleanName;
  return `/images/${type}/${cleanName}`;
}

function resolveImageSrc(src) {
  const text = cleanAsset(src);
  if (!text) return "";
  if (text.startsWith("/images/")) return text;
  if (text.startsWith("images/")) return `/${text}`;
  return text;
}

function makeImagePlaceholder(label) {
  const placeholder = createElement("div", "museum-image-placeholder");
  const accessibleLabel = label || uiText("Archive image pending", "檔案影像待整理");
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", accessibleLabel);
  placeholder.append(createElement("span", "", uiText("Image pending", "影像待整理")));
  placeholder.append(createElement("strong", "", accessibleLabel));
  return placeholder;
}

function makeImageElement(src, alt, options = {}) {
  if (!src) return makeImagePlaceholder(alt);
  const image = document.createElement("img");
  image.src = resolveImageSrc(src);
  image.alt = alt || "";
  image.loading = options.eager ? "eager" : "lazy";
  image.addEventListener(
    "error",
    () => {
      image.replaceWith(makeImagePlaceholder(image.alt));
    },
    { once: true },
  );
  return image;
}

function imagePath(record, type = "artworks") {
  return futureImagePath(cleanAsset(record?.imageUrlFile || record?.fileName), type);
}

function imagePathForPhoto(record) {
  if (!record) return "";
  if (/Portrait/i.test(record.category || "") || /Portrait/i.test(record.collection || "")) {
    return imagePath(record, "portraits");
  }
  if (/Family Archive/i.test(record.collection || "")) {
    return imagePath(record, "family");
  }
  if (/Exhibition Photo/i.test(record.category || "") || /Exhibition Archive/i.test(record.collection || "")) {
    return imagePath(record, "exhibitions");
  }
  return imagePath(record, "artworks");
}

function safeMeta(value) {
  const text = String(value || "").trim();
  return /^[A-Z]{2,}-\d{3,}$/.test(text) ? "" : text;
}

function artworkTitle(record) {
  return localizedField(record, "titleEn", "titleCn");
}

function canonTitle(record) {
  return localizedField(record, "artworkTitleEn", "artworkTitleCn");
}

function collectionTitle(record) {
  return localizedField(record, "collectionTitleEn", "collectionTitleCn");
}

function exhibitionTitle(record) {
  return localizedField(record, "exhibitionTitleEn", "exhibitionTitleCn");
}

function researchTitle(record) {
  return localizedField(record, "researchThemeEn", "researchThemeCn");
}

function keywordTitle(record) {
  return localizedField(record, "keywordEn", "keywordCn");
}

function pageByName(name) {
  return records("architecture").find((record) => record.pageNameEn === name) || {};
}

function pageHeadingTitle(page) {
  return localized(page.mainPurpose || page.pageNameEn, page.pageNameCn);
}

function artworkByEnglishTitle(title) {
  return records("artworks").find((record) => record.titleEn === title) || {};
}

function assetForArtwork(record, index = 0) {
  const localAssets = state.data.assets || {};
  const mapped = localAssets.artworks?.[record?.titleEn || record?.artworkTitleEn];
  const sheetAsset = imagePath(record, "artworks");
  return sheetAsset || mapped || "";
}

function localizedMedium(value) {
  if (state.language !== "zh") return value || "";
  const mediumMap = {
    "Woodcut print": "木刻版畫",
    "Color woodcut": "套色木刻",
    "New Year picture / print": "新年畫 / 版畫",
    Photograph: "照片",
  };
  return toTraditional(mediumMap[value] || "");
}

function localizedStatus(value) {
  if (!value) return "";
  if (state.language !== "zh") return value;
  const statusMap = {
    Active: "進行中",
    Draft: "草案",
    Planning: "規劃中",
    Future: "未來階段",
    "To confirm": "待確認",
    "To be confirmed": "待確認",
  };
  return toTraditional(statusMap[value] || "");
}

function collectionName(value) {
  if (!value) return "";
  if (state.language !== "zh") return value;
  const collection = records("collections").find(
    (item) => item.collectionTitleEn === value || item.theme === value,
  );
  return toTraditional(collection?.collectionTitleCn || "");
}

function appendArtworkMetadata(parent, displayRecord, artwork) {
  const items = [
    {
      label: uiText("Year", "年代"),
      value: displayRecord?.year || artwork?.year,
    },
    {
      label: uiText("Medium", "媒材"),
      value: localizedMedium(artwork?.medium || displayRecord?.medium),
    },
    {
      label: uiText("Collection", "館藏單元"),
      value: collectionName(displayRecord?.collection || artwork?.period),
    },
    {
      label: uiText("Status", "狀態"),
      value: localizedStatus(displayRecord?.status || artwork?.status),
    },
  ].filter((item) => item.value);

  if (!items.length) return;

  const list = createElement("dl", "artwork-label-meta");
  items.forEach((item) => {
    const group = document.createElement("div");
    group.append(createElement("dt", "", item.label));
    group.append(createElement("dd", "", item.value));
    list.append(group);
  });
  parent.append(list);
}

function makeHeading(eyebrow, title, body) {
  const wrapper = document.createElement("div");
  if (eyebrow) wrapper.append(createElement("p", "eyebrow", eyebrow));
  if (title) wrapper.append(createElement("h2", "", title));
  if (body) wrapper.append(createElement("p", "", body));
  return wrapper;
}

function makeRecordCard(title, body, meta, options = {}) {
  const card = createElement("article", "info-card");
  if (options.imageSrc || options.imageAlt) {
    const media = createElement("div", "info-card-media");
    media.append(makeImageElement(options.imageSrc, options.imageAlt || title));
    card.append(media);
  }
  const displayMeta = safeMeta(meta);
  if (displayMeta) card.append(createElement("span", "icon", displayMeta));
  if (title) card.append(createElement("h3", "", title));
  if (body) card.append(createElement("p", "", body));
  return card;
}

const PUBLIC_FAMILY_PROFILE_ORDER = ["Gu Yuan", "Jiang Yuheng", "Gu Ancun", "Wei Duan"];

const FAMILY_PROFILE_ZH = {
  "Gu Yuan": {
    role: "藝術家",
  },
  "Jiang Yuheng": {
    role: "家族檔案人物",
  },
  "Gu Ancun": {
    role: "家族檔案代表",
  },
};

const FAMILY_PROFILE_OVERRIDES = {
  "Gu Ancun": {
    featured: true,
    imageUrlFile: "/images/family/GY-FAM-GuAncun.jpg",
    nameEn: "Gu Ancun / 古安村",
    nameCn: "古安村",
    roleEn: "Chief Curator and Family Oral History Director",
    roleCn: "首席策展人暨家族口述歷史總監",
    bodyEn:
      "Gu Ancun serves as the Chief Curator of the Gu Yuan Digital Museum. As a core member of the Gu Yuan family archive, she is the primary provider of family oral history materials, archival memory, and historical verification related to Gu Yuan’s life and artistic legacy.\n\nShe is also one of the principal donors of Gu Yuan artworks, documents, and family archival materials supporting this digital preservation initiative.\n\nThis website is officially authorized by the Gu Yuan family and operates with the family’s unique permission and long-term archival support.",
    bodyCn:
      "古安村女士為古元數字美術館首席策展人。作為古元家族檔案的重要核心成員，她長期提供與古元生平、藝術創作及家族歷史相關的口述歷史、檔案記憶與歷史校訂資料。\n\n她同時亦為古元作品、文獻與家族檔案的重要捐贈者之一，支持本數字保存計畫的長期建設。\n\n本網站已獲古元家族正式授權，並在家族獨家許可與長期支持下建立。",
  },
  "Wei Duan": {
    imageUrlFile: "/images/family/GY-FAM-WeiDuan-BrookeDuan.jpg",
    nameEn: "Wei Duan / Brooke Duan / 段薇",
    nameCn: "段薇",
    roleEn: "International Curator and Translation Director",
    roleCn: "國際策展人與翻譯總監",
    bodyEn:
      "Raised by Gu Yuan and his wife from infancy, Wei Duan accompanied them throughout their later years. She serves as the international curator for Gu Yuan’s artworks and oversees the international translation and cross-cultural interpretation of his artistic legacy.",
    bodyCn:
      "段薇自幼由古元與夫人撫養長大，並陪伴二老走過晚年。她負責古元作品的國際策展、翻譯與跨文化詮釋工作。",
  },
};

function publicFamilyProfiles() {
  const peopleByName = new Map(records("people").map((person) => [person.nameEn, person]));
  return PUBLIC_FAMILY_PROFILE_ORDER.map((name) => {
    const person = peopleByName.get(name);
    if (!person) return null;
    const override = FAMILY_PROFILE_OVERRIDES[name] || {};
    const zh = FAMILY_PROFILE_ZH[name] || {};
    return {
      nameEn: override.nameEn || `${person.nameEn}${person.nameCn ? ` / ${toTraditional(person.nameCn)}` : ""}`,
      nameCn: override.nameCn || toTraditional(person.nameCn || person.nameEn),
      roleEn: override.roleEn || person.role || "",
      roleCn: override.roleCn || zh.role || "",
      bodyEn: override.bodyEn || person.notes || "",
      bodyCn: override.bodyCn || "",
      imageUrlFile: override.imageUrlFile || person.imageUrlFile || "",
      featured: Boolean(override.featured),
    };
  }).filter(Boolean);
}

function appendProfileParagraphs(parent, body) {
  String(body || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .forEach((paragraph) => parent.append(createElement("p", "", paragraph)));
}

async function loadData() {
  const entries = await Promise.all(
    Object.entries(DATA_FILES).map(async ([key, file]) => {
      const response = await fetch(`${DATA_BASE}${file}`);
      if (!response.ok) throw new Error(`Unable to load ${file}`);
      return [key, await response.json()];
    }),
  );
  state.data = Object.fromEntries(entries);
}

function renderHeader() {
  const nav = $("[data-nav]");
  const toggle = $("[data-language-toggle]");
  nav.querySelectorAll("a").forEach((link) => link.remove());

  state.data.site.navigation.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = localized(item.labelEn, item.labelCn);
    nav.insertBefore(link, toggle);
  });

  toggle.textContent = localized(state.data.site.ui.languageToggleEn, state.data.site.ui.languageToggleCn);
  toggle.setAttribute("aria-label", state.language === "zh" ? "Switch to English" : "Switch to Chinese");

  const primary = $("[data-primary-cta]");
  primary.textContent = localized(state.data.site.ui.primaryCtaEn, state.data.site.ui.primaryCtaCn);
}

function renderHero() {
  const { hero, ui } = state.data.site;
  setText("[data-hero-eyebrow]", localized(hero.eyebrowEn, hero.eyebrowCn));
  setText("[data-hero-title]", localized(hero.titleEn, hero.titleCn));
  setText("[data-hero-lede]", localized(hero.ledeEn, hero.ledeCn));
  setText("[data-hero-secondary]", localized(hero.secondaryEn, hero.secondaryCn));
  setText("[data-hero-primary]", `${localized(ui.primaryCtaEn, ui.primaryCtaCn)} ->`);
  setText("[data-hero-secondary-link]", localized(ui.secondaryCtaEn, ui.secondaryCtaCn));

  document.title = state.language === "zh" ? localized(hero.titleEn, hero.titleCn) : "Gu Yuan Digital Museum";
}

function renderResearchNotes() {
  const container = $("[data-research-notes]");
  reset(container);

  const firstArtwork = records("artworks")[0] || {};
  const source = records("sources")[0] || {};
  const familyContributor = records("people")[1] || {};
  const notes = [
    {
      label: uiText("Research in progress", "研究持續進行"),
      body: uiText("Archive records remain under scholarly review.", "檔案資料將持續核驗與擴展。"),
    },
    {
      label: uiText("Source pending verification", "來源待核驗"),
      body: uiText(source.title || firstArtwork.source, "來源與版權狀態將繼續核驗。"),
    },
    {
      label: uiText("Family archive note", "家族檔案註記"),
      body: uiText(familyContributor.relationship || familyContributor.role, "家族檔案記憶為本項目的重要基礎。"),
    },
  ];

  const inner = createElement("div", "archive-note-inner");
  notes.forEach((note) => {
    const card = createElement("article", "research-note");
    card.append(createElement("p", "eyebrow", note.label));
    if (note.body) card.append(createElement("p", "", note.body));
    inner.append(card);
  });
  container.append(inner);
}

function renderFeaturedGallery() {
  const gallery = $("[data-featured-gallery]");
  reset(gallery);

  const exhibition = records("exhibitions")[0] || {};
  const canonItems = records("canon").slice(0, 4);
  const mainArtwork = artworkByEnglishTitle(canonItems[0]?.artworkTitleEn) || canonItems[0];
  const mainImage = assetForArtwork(mainArtwork, 0);

  const card = createElement("div", "gallery-card");
  const panel = createElement("div", "gallery-panel");
  const heading = document.createElement("div");
  heading.append(createElement("p", "eyebrow", englishOnly(exhibition.exhibitionType) || exhibitionTitle(exhibition)));
  heading.append(createElement("h2", "", exhibitionTitle(exhibition)));

  const preview = createElement("div", "gallery-preview");
  const image = makeImageElement(mainImage, canonTitle(canonItems[0]), { eager: true });
  preview.append(image);

  const row = createElement("div", "print-row");
  canonItems.slice(1, 4).forEach((item, index) => {
    const artwork = artworkByEnglishTitle(item.artworkTitleEn) || item;
    const thumb = makeImageElement(assetForArtwork(artwork, index + 1), canonTitle(item));
    row.append(thumb);
  });
  preview.append(row);
  preview.append(createElement("p", "", localizedField(exhibition, "descriptionEn", "descriptionCn")));

  panel.append(heading, preview);
  card.append(panel);
  gallery.append(card);
}

function renderAbout() {
  const heading = $("[data-about-heading]");
  const about = $("[data-about]");
  reset(heading);
  reset(about);

  const aboutPage = pageByName("About Gu Yuan");
  const intro = records("biography")[0] || {};
  heading.append(
    makeHeading(
      localized(aboutPage.pageNameEn, aboutPage.pageNameCn),
      localizedField(intro, "titleEn", "titleCn"),
      localizedField(intro, "contentEn", "contentCn"),
    ),
  );

  const biography = createElement("div", "lang-block");
  records("biography")
    .slice(1)
    .forEach((item) => {
      const article = createElement("article", "database-card");
      article.append(createElement("h3", "", localizedField(item, "titleEn", "titleCn")));
      article.append(createElement("p", "", localizedField(item, "contentEn", "contentCn")));
      biography.append(article);
    });
  about.append(biography);
}

function renderWorks() {
  const heading = $("[data-works-heading]");
  const intro = $("[data-works-intro]");
  const works = $("[data-works]");
  reset(heading);
  reset(works);

  const canonPage = pageByName("Museum Canon");
  const collection = records("collections")[1] || records("collections")[0] || {};
  heading.append(makeHeading(localized(canonPage.pageNameEn, canonPage.pageNameCn), pageHeadingTitle(canonPage), ""));
  intro.textContent = localizedField(collection, "descriptionEn", "descriptionCn");

  const canonItems = records("canon");
  const featured = canonItems[0] || {};
  const featuredArtwork = artworkByEnglishTitle(featured.artworkTitleEn) || featured;

  const featuredFigure = createElement("figure", "featured-artwork");
  featuredFigure.append(makeArtworkButton(featuredArtwork, featured, 0, true));
  const caption = document.createElement("figcaption");
  caption.append(createElement("p", "work-category", englishOnly(featured.canonLevel) || uiText("Core collection", "核心館藏")));
  caption.append(createElement("h3", "", canonTitle(featured)));
  appendArtworkMetadata(caption, featured, featuredArtwork);
  caption.append(createElement("p", "", localizedField(featured, "importanceEn", "importanceCn")));
  featuredFigure.append(caption);

  const supporting = createElement("div", "supporting-artworks");
  canonItems.slice(1, 5).forEach((item, index) => {
    const artwork = artworkByEnglishTitle(item.artworkTitleEn) || item;
    const figure = document.createElement("figure");
    figure.append(makeArtworkButton(artwork, item, index + 1));
    const figcaption = document.createElement("figcaption");
    figcaption.append(createElement("h3", "", canonTitle(item)));
    appendArtworkMetadata(figcaption, item, artwork);
    figure.append(figcaption);
    supporting.append(figure);
  });

  works.append(featuredFigure, supporting);
}

function makeArtworkButton(artwork, displayRecord, index, featured = false) {
  const button = createElement("button", "artwork-open");
  button.type = "button";
  button.dataset.src = assetForArtwork(artwork, index);
  button.dataset.titleEn = displayRecord.artworkTitleEn || artwork.titleEn || "";
  button.dataset.titleCn = toTraditional(displayRecord.artworkTitleCn || artwork.titleCn || "");
  button.dataset.year = displayRecord.year || artwork.year || "";
  button.dataset.medium = artwork.medium || displayRecord.collection || "";
  button.dataset.mediumCn = localizedMedium(artwork.medium || displayRecord.medium || "");
  button.dataset.descriptionEn = displayRecord.importanceEn || artwork.descriptionEn || "";
  button.dataset.descriptionCn = toTraditional(displayRecord.importanceCn || artwork.descriptionCn || "");
  button.setAttribute("aria-label", canonTitle(displayRecord) || artworkTitle(artwork));

  const image = makeImageElement(button.dataset.src, canonTitle(displayRecord) || artworkTitle(artwork), { eager: featured });
  button.append(image);
  return button;
}

function renderLife() {
  const heading = $("[data-life-heading]");
  const timeline = $("[data-timeline]");
  const stages = $("[data-life-stages]");
  reset(heading);
  reset(timeline);
  reset(stages);

  const page = pageByName("Timeline");
  heading.append(makeHeading(localized(page.pageNameEn, page.pageNameCn), pageHeadingTitle(page), ""));

  records("timeline").forEach((item) => {
    const article = document.createElement("article");
    article.append(createElement("strong", "", item.year));
    article.append(createElement("span", "", localizedField(item, "eventEn", "eventCn")));
    timeline.append(article);
  });

  records("lifeStages").forEach((item) => {
    stages.append(
      makeRecordCard(
        localizedField(item, "stageEn", "stageCn"),
        localizedField(item, "descriptionEn", "descriptionCn"),
        item.period,
      ),
    );
  });
}

function renderArchive() {
  const heading = $("[data-archive-heading]");
  const archive = $("[data-archive]");
  reset(heading);
  reset(archive);

  const page = pageByName("Archive");
  heading.append(makeHeading(localized(page.pageNameEn, page.pageNameCn), pageHeadingTitle(page), englishOnly(page.mainContent)));

  const canonLead = records("canon")[0] || {};
  const canonArtwork = artworkByEnglishTitle(canonLead.artworkTitleEn) || records("artworks")[0] || {};
  const photoLead = records("photos")[0] || {};
  const exhibitionLead = records("exhibitions")[0] || {};
  const familyLead = records("photos").find((photo) => /Family Archive/i.test(photo.collection || "")) || records("people").find((person) => person.nameEn === "Gu Ancun") || {};
  const cards = [
    {
      page: pageByName("Museum Canon"),
      count: records("artworks").length,
      note: records("artworks")[0],
      imageSrc: assetForArtwork(canonArtwork, 0),
      imageAlt: artworkTitle(canonArtwork) || canonTitle(canonLead),
    },
    {
      page: pageByName("Archive"),
      count: records("photos").length,
      note: photoLead,
      imageSrc: imagePathForPhoto(photoLead),
      imageAlt: localizedField(photoLead, "titleEn", "titleCn"),
    },
    {
      page: pageByName("Research"),
      count: records("sources").length,
      note: records("sources")[0],
      imageSrc: imagePath(exhibitionLead, "exhibitions"),
      imageAlt: exhibitionTitle(exhibitionLead),
    },
    {
      page: pageByName("Search"),
      count: records("keywords").length,
      note: records("keywords")[0],
      imageSrc: imagePathForPhoto(familyLead),
      imageAlt: localizedField(familyLead, "titleEn", "titleCn") || localized(familyLead.nameEn, familyLead.nameCn),
    },
  ];

  cards.forEach((item) => {
    const body =
      localizedField(item.note, "descriptionEn", "descriptionCn") ||
      englishOnly(item.note?.usedFor || item.page?.mainContent);
    archive.append(
      makeRecordCard(localized(item.page.pageNameEn, item.page.pageNameCn), body, String(item.count), {
        imageSrc: item.imageSrc,
        imageAlt: item.imageAlt,
      }),
    );
  });
}

function renderGuardian() {
  const copy = $("[data-guardian-copy]");
  const panel = $("[data-guardian-panel]");
  reset(copy);
  reset(panel);

  const page = pageByName("Family Archive");
  const profiles = publicFamilyProfiles();
  const featuredProfile = profiles.find((profile) => profile.featured) || profiles[0];
  copy.append(createElement("p", "eyebrow", localized(page.pageNameEn, page.pageNameCn)));

  if (featuredProfile) {
    const featured = createElement("article", "guardian-feature-profile");
    const portrait = createElement("div", "guardian-portrait");
    portrait.append(makeImageElement(featuredProfile.imageUrlFile, localized(featuredProfile.nameEn, featuredProfile.nameCn)));

    const profileCopy = createElement("div", "guardian-feature-copy");
    profileCopy.append(createElement("h2", "", localized(featuredProfile.nameEn, featuredProfile.nameCn)));
    profileCopy.append(createElement("p", "guardian-role", localized(featuredProfile.roleEn, featuredProfile.roleCn)));
    appendProfileParagraphs(profileCopy, localized(featuredProfile.bodyEn, featuredProfile.bodyCn));
    featured.append(portrait, profileCopy);
    copy.append(featured);
  }

  profiles
    .filter((person) => person !== featuredProfile)
    .forEach((person) => {
      const item = document.createElement("div");
      item.className = "guardian-profile-card";
      item.append(createElement("h3", "", localized(person.nameEn, person.nameCn)));
      const role = localized(person.roleEn, person.roleCn);
      const description = localized(person.bodyEn, person.bodyCn);
      if (role) item.append(createElement("span", "", role));
      appendProfileParagraphs(item, description);
      panel.append(item);
    });
}

function renderCollections() {
  const heading = $("[data-collections-heading]");
  const grid = $("[data-collections]");
  reset(heading);
  reset(grid);

  const page = pageByName("Collections");
  heading.append(makeHeading(localized(page.pageNameEn, page.pageNameCn), pageHeadingTitle(page), englishOnly(page.mainContent)));

  records("collections").forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "collection-card";
    const media = createElement("div", "collection-card-media");
    media.append(makeImageElement(imagePath(item, "artworks"), collectionTitle(item)));
    card.append(media);
    card.append(createElement("span", "", String(index + 1).padStart(2, "0")));
    card.append(createElement("h3", "", collectionTitle(item)));
    card.append(createElement("p", "", localizedField(item, "descriptionEn", "descriptionCn")));
    grid.append(card);
  });
}

function renderExhibitions() {
  const heading = $("[data-exhibitions-heading]");
  const grid = $("[data-exhibitions]");
  reset(heading);
  reset(grid);

  const page = pageByName("Exhibitions");
  heading.append(makeHeading(localized(page.pageNameEn, page.pageNameCn), pageHeadingTitle(page), englishOnly(page.mainContent)));

  records("exhibitions").forEach((item) => {
    const card = makeRecordCard(
      exhibitionTitle(item),
      localizedField(item, "descriptionEn", "descriptionCn"),
      englishOnly(item.exhibitionType),
      {
        imageSrc: imagePath(item, "exhibitions"),
        imageAlt: exhibitionTitle(item),
      },
    );
    grid.append(card);
  });
}

function renderResearch() {
  const heading = $("[data-research-heading]");
  const research = $("[data-research]");
  reset(heading);
  reset(research);

  const page = pageByName("Research");
  heading.append(makeHeading(localized(page.pageNameEn, page.pageNameCn), pageHeadingTitle(page), ""));

  const themeGrid = createElement("div", "research-card-grid");
  records("research").slice(0, 6).forEach((item) => {
    themeGrid.append(
      makeRecordCard(
        researchTitle(item),
        localizedField(item, "descriptionEn", "descriptionCn"),
        englishOnly(item.category),
      ),
    );
  });

  const workflowGrid = createElement("div", "workflow-list");
  records("keywords").slice(0, 4).forEach((item) => {
    const card = makeRecordCard(
      keywordTitle(item),
      localizedField(item, "descriptionEn", "descriptionCn"),
      englishOnly(item.category),
    );
    workflowGrid.append(card);
  });
  research.append(themeGrid, workflowGrid);
}

function renderSupport() {
  const heading = $("[data-support-heading]");
  const grid = $("[data-support-cards]");
  const note = $("[data-support-note]");
  reset(heading);
  reset(grid);

  const intro = state.data.support?.intro || {};
  heading.append(
    makeHeading(
      localized(intro.eyebrowEn, intro.eyebrowCn),
      localized(intro.titleEn, intro.titleCn),
      localized(intro.bodyEn, intro.bodyCn),
    ),
  );

  records("support").forEach((item) => {
    const card = createElement("article", "support-card");
    card.append(createElement("span", "support-status", localized(item.statusEn, item.statusCn)));
    card.append(createElement("p", "eyebrow", localized(item.categoryEn, item.categoryCn)));
    card.append(createElement("h3", "", localized(item.titleEn, item.titleCn)));
    card.append(createElement("p", "", localized(item.descriptionEn, item.descriptionCn)));
    grid.append(card);
  });

  if (note) note.textContent = localized(intro.noteEn, intro.noteCn);
}

function renderFooter() {
  const footer = $("[data-footer]");
  reset(footer);
  const credit = createElement("div", "footer-credit");
  const partnership = createElement("div", "footer-partnership");
  const image = document.createElement("img");
  image.src = "assets/partners/owl-art-foundation-logo.png";
  image.alt = "OWL Art Foundation logo";
  partnership.append(image, createElement("p", "", uiText("Designed and developed by OWL Art Foundation", "由 OWL Art Foundation 設計與建置")));
  credit.append(partnership);
  credit.append(createElement("p", "", uiText("Gu Yuan Digital Museum", "古元數字美術館")));
  credit.append(
    createElement(
      "p",
      "",
      uiText("A Digital Archive of Modern Chinese Visual Culture", "中國現代視覺文化數字檔案"),
    ),
  );
  footer.append(credit);
}

function bindModal() {
  const artworkModal = $("#artwork-modal");
  const modalImage = $("#modal-image");
  const modalTitle = $("#modal-title");
  const modalTitleZh = $("#modal-title-zh");
  const modalMeta = $("#modal-meta");

  function removeModalPlaceholder() {
    $(".modal-image-placeholder", artworkModal)?.remove();
    modalImage.hidden = false;
  }

  modalImage.onerror = () => {
    modalImage.hidden = true;
    modalImage.after(makeImagePlaceholder(modalImage.alt));
    $(".museum-image-placeholder", artworkModal)?.classList.add("modal-image-placeholder");
  };

  document.querySelectorAll(".artwork-open").forEach((button) => {
    button.addEventListener("click", () => {
      const isZh = state.language === "zh";
      removeModalPlaceholder();
      modalImage.alt = isZh ? button.dataset.titleCn : button.dataset.titleEn;
      const modalSrc = resolveImageSrc(button.dataset.src);
      if (modalSrc) {
        modalImage.src = modalSrc;
      } else {
        modalImage.hidden = true;
        modalImage.after(makeImagePlaceholder(modalImage.alt));
        $(".museum-image-placeholder", artworkModal)?.classList.add("modal-image-placeholder");
      }
      modalTitle.textContent = isZh ? button.dataset.titleCn : button.dataset.titleEn;
      modalTitleZh.textContent = isZh ? "" : "";
      modalMeta.textContent = [
        button.dataset.year,
        isZh ? button.dataset.mediumCn : button.dataset.medium,
      ]
        .filter(Boolean)
        .join(" · ");
      artworkModal.showModal();
    });
  });
}

function renderAll() {
  document.documentElement.lang = state.language === "zh" ? LANGUAGE_STANDARD.chinese : LANGUAGE_STANDARD.english;
  document.body.dataset.lang = state.language;
  renderHeader();
  renderHero();
  renderResearchNotes();
  renderFeaturedGallery();
  renderAbout();
  renderWorks();
  renderLife();
  renderArchive();
  renderGuardian();
  renderCollections();
  renderExhibitions();
  renderResearch();
  renderSupport();
  renderFooter();
  bindModal();
}

function setLanguage(language) {
  state.language = language;
  renderAll();
}

window.setLanguage = setLanguage;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadData();
    renderAll();

    $("[data-language-toggle]").addEventListener("click", () => {
      setLanguage(state.language === "zh" ? "en" : "zh");
    });

    $(".modal-close").addEventListener("click", () => {
      $("#artwork-modal").close();
    });

    $("#artwork-modal").addEventListener("click", (event) => {
      if (event.target === $("#artwork-modal")) {
        $("#artwork-modal").close();
      }
    });
  } catch (error) {
    document.body.classList.add("data-load-error");
    setText("[data-hero-title]", "Content database unavailable");
    setText("[data-hero-lede]", error.message);
  }
});
