const DATA_BASE = "./src/data/";

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
  architecture: "public/website-architecture.json",
};

const state = {
  language: "en",
  data: {},
};

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
  return state.language === "zh" ? cn || "" : en || "";
}

function localizedField(record, enKey, cnKey) {
  return localized(record?.[enKey], record?.[cnKey]);
}

function englishOnly(value) {
  return state.language === "en" ? value || "" : "";
}

function uiText(en, zh) {
  return state.language === "zh" ? zh : en;
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function cleanAsset(value) {
  const text = String(value || "").trim();
  if (!text || /^to be/i.test(text)) return "";
  return text;
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
  const sheetAsset = cleanAsset(record?.imageUrlFile);
  const fallback = localAssets.fallbacks?.[index % (localAssets.fallbacks?.length || 1)];
  return sheetAsset || mapped || fallback || "assets/artworks/work-03.jpg";
}

function localizedMedium(value) {
  if (state.language !== "zh") return value || "";
  const mediumMap = {
    "Woodcut print": "木刻版画",
    "Color woodcut": "套色木刻",
    "New Year picture / print": "新年画 / 版画",
    Photograph: "照片",
  };
  return mediumMap[value] || "";
}

function localizedStatus(value) {
  if (!value) return "";
  if (state.language !== "zh") return value;
  const statusMap = {
    Active: "进行中",
    Draft: "草案",
    Planning: "规划中",
    Future: "未来阶段",
    "To confirm": "待确认",
    "To be confirmed": "待确认",
  };
  return statusMap[value] || "";
}

function collectionName(value) {
  if (!value) return "";
  if (state.language !== "zh") return value;
  const collection = records("collections").find(
    (item) => item.collectionTitleEn === value || item.theme === value,
  );
  return collection?.collectionTitleCn || "";
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
      label: uiText("Collection", "馆藏单元"),
      value: collectionName(displayRecord?.collection || artwork?.period),
    },
    {
      label: uiText("Status", "状态"),
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

function makeRecordCard(title, body, meta) {
  const card = createElement("article", "info-card");
  if (meta) card.append(createElement("span", "icon", meta));
  if (title) card.append(createElement("h3", "", title));
  if (body) card.append(createElement("p", "", body));
  return card;
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

  toggle.textContent =
    state.language === "zh" ? state.data.site.ui.languageToggleCn : state.data.site.ui.languageToggleEn;
  toggle.setAttribute("aria-label", state.language === "zh" ? "Switch to English" : "Switch to Chinese");

  const primary = $("[data-primary-cta]");
  primary.textContent =
    state.language === "zh" ? state.data.site.ui.primaryCtaCn : state.data.site.ui.primaryCtaEn;
}

function renderHero() {
  const { hero, ui } = state.data.site;
  setText("[data-hero-eyebrow]", localized(hero.eyebrowEn, hero.eyebrowCn));
  setText("[data-hero-title]", localized(hero.titleEn, hero.titleCn));
  setText("[data-hero-lede]", localized(hero.ledeEn, hero.ledeCn));
  setText("[data-hero-secondary]", localized(hero.secondaryEn, hero.secondaryCn));
  setText("[data-hero-primary]", `${localized(ui.primaryCtaEn, ui.primaryCtaCn)} ->`);
  setText("[data-hero-secondary-link]", localized(ui.secondaryCtaEn, ui.secondaryCtaCn));

  document.title = state.language === "zh" ? hero.titleCn : "Gu Yuan Digital Museum";
}

function renderResearchNotes() {
  const container = $("[data-research-notes]");
  reset(container);

  const firstArtwork = records("artworks")[0] || {};
  const source = records("sources")[0] || {};
  const familyContributor = records("people")[1] || {};
  const notes = [
    {
      label: uiText("Research in progress", "研究持续进行"),
      body: uiText("Archive records remain under scholarly review.", "档案资料将持续核验与扩展。"),
    },
    {
      label: uiText("Source pending verification", "来源待核验"),
      body: uiText(source.title || firstArtwork.source, "来源与版权状态将继续核验。"),
    },
    {
      label: uiText("Family archive note", "家族档案注记"),
      body: uiText(familyContributor.relationship || familyContributor.role, "家族档案记忆为本项目的重要基础。"),
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
  const image = document.createElement("img");
  image.src = mainImage;
  image.alt = canonTitle(canonItems[0]);
  preview.append(image);

  const row = createElement("div", "print-row");
  canonItems.slice(1, 4).forEach((item, index) => {
    const artwork = artworkByEnglishTitle(item.artworkTitleEn) || item;
    const thumb = document.createElement("img");
    thumb.src = assetForArtwork(artwork, index + 1);
    thumb.alt = canonTitle(item);
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
      article.append(createElement("p", "eyebrow", item.id));
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
  caption.append(createElement("p", "work-category", englishOnly(featured.canonLevel) || featured.id));
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
  button.dataset.titleCn = displayRecord.artworkTitleCn || artwork.titleCn || "";
  button.dataset.year = displayRecord.year || artwork.year || "";
  button.dataset.medium = artwork.medium || displayRecord.collection || "";
  button.dataset.mediumCn = localizedMedium(artwork.medium || displayRecord.medium || "");
  button.dataset.descriptionEn = displayRecord.importanceEn || artwork.descriptionEn || "";
  button.dataset.descriptionCn = displayRecord.importanceCn || artwork.descriptionCn || "";
  button.setAttribute("aria-label", canonTitle(displayRecord) || artworkTitle(artwork));

  const image = document.createElement("img");
  image.src = button.dataset.src;
  image.alt = canonTitle(displayRecord) || artworkTitle(artwork);
  if (featured) image.loading = "eager";
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

  const cards = [
    { page: pageByName("Museum Canon"), count: records("artworks").length, note: records("artworks")[0] },
    { page: pageByName("Archive"), count: records("photos").length, note: records("photos")[0] },
    { page: pageByName("Research"), count: records("sources").length, note: records("sources")[0] },
    { page: pageByName("Search"), count: records("keywords").length, note: records("keywords")[0] },
  ];

  cards.forEach((item) => {
    const body =
      localizedField(item.note, "descriptionEn", "descriptionCn") ||
      englishOnly(item.note?.usedFor || item.page?.mainContent);
    archive.append(makeRecordCard(localized(item.page.pageNameEn, item.page.pageNameCn), body, String(item.count)));
  });
}

function renderGuardian() {
  const copy = $("[data-guardian-copy]");
  const panel = $("[data-guardian-panel]");
  reset(copy);
  reset(panel);

  const page = pageByName("Family Archive");
  const people = records("people");
  const guAncun = people[1] || people[0] || {};
  copy.append(createElement("p", "eyebrow", localized(page.pageNameEn, page.pageNameCn)));
  copy.append(createElement("h2", "", localized(guAncun.nameEn, guAncun.nameCn)));
  copy.append(createElement("p", "", englishOnly(guAncun.notes)));

  people.slice(0, 6).forEach((person, index) => {
    const item = document.createElement("div");
    item.append(createElement("span", "", String(index + 1).padStart(2, "0")));
    item.append(createElement("h3", "", localized(person.nameEn, person.nameCn)));
    const detail = state.language === "en" ? person.role : hasCjk(person.role) ? person.role : "";
    if (detail) item.append(createElement("p", "", detail));
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
      englishOnly(item.exhibitionType) || item.exhibitionId,
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
        englishOnly(item.category) || item.researchId,
      ),
    );
  });

  const workflowGrid = createElement("div", "workflow-list");
  records("keywords").slice(0, 4).forEach((item) => {
    const card = makeRecordCard(
      keywordTitle(item),
      localizedField(item, "descriptionEn", "descriptionCn"),
      englishOnly(item.category) || item.tagId,
    );
    workflowGrid.append(card);
  });
  research.append(themeGrid, workflowGrid);
}

function renderFooter() {
  const footer = $("[data-footer]");
  reset(footer);
  const { hero, source } = state.data.site;
  const credit = createElement("div", "footer-credit");
  credit.append(createElement("p", "", localized(hero.titleEn, hero.titleCn)));
  const partnership = createElement("div", "footer-partnership");
  const image = document.createElement("img");
  image.src = "assets/partners/owl-art-foundation-logo.png";
  image.alt = "OWL Art Foundation logo";
  partnership.append(image, createElement("p", "", source.spreadsheetUrl));
  credit.append(partnership);

  const links = createElement("div", "footer-links");
  records("architecture")
    .filter((item) => item.status === "Active")
    .slice(0, 3)
    .forEach((item) => links.append(createElement("span", "", localized(item.pageNameEn, item.pageNameCn))));

  footer.append(credit, links);
}

function bindModal() {
  const artworkModal = $("#artwork-modal");
  const modalImage = $("#modal-image");
  const modalTitle = $("#modal-title");
  const modalTitleZh = $("#modal-title-zh");
  const modalMeta = $("#modal-meta");

  document.querySelectorAll(".artwork-open").forEach((button) => {
    button.addEventListener("click", () => {
      const isZh = state.language === "zh";
      modalImage.src = button.dataset.src;
      modalImage.alt = isZh ? button.dataset.titleCn : button.dataset.titleEn;
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
  document.documentElement.lang = state.language === "zh" ? "zh-Hans" : "en";
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
