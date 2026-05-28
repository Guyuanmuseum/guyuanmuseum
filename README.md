# Museum Image Asset Workflow

This folder is the public image root for the Gu Yuan Digital Museum. Keep uploaded files in these folders so JSON image fields can use stable public paths.

## Folders

- `/public/images/artworks/` -> artwork images and artwork details
- `/public/images/portraits/` -> individual portrait photographs
- `/public/images/exhibitions/` -> exhibition installation views, speeches, gallery documentation
- `/public/images/family/` -> family archive photographs and authorized family portraits
- `/public/images/archive/` -> general archival documents, scans, ephemera, and research images

## Naming Standard

Use clear museum archive filenames:

```text
GY-<CATEGORY>-<YEAR_OR_PERIOD>-<ShortEnglishTitle>.<ext>
```

Examples:

```text
GY-ART-1948-HumanBridge.jpg
GY-PH-1950s-GuYuanStudioPortrait.jpg
GY-FAM-GuAncun.jpg
GY-EXH-2026-DigitalMuseumLaunch.jpg
GY-ARC-Undated-LetterScan01.jpg
```

When the title, year, or identity is uncertain, do not guess. Use `To be confirmed` in the intake checklist and wait for confirmation before renaming or updating JSON.

## Intake Steps

1. Place the file in the category folder.
2. Check whether the filename already appears in the JSON `imageUrlFile` field.
3. If the match is exact, use a public path such as `/images/artworks/GY-ART-1948-HumanBridge.jpg`.
4. If the match is unclear, keep the file unchanged and mark it `To be confirmed`.
5. Preserve duplicates until a curator approves cleanup.
6. Keep public website text in English + Traditional Chinese (`zh-Hant`) only.

Missing files should continue to render as museum-style placeholders. Do not expose broken image icons on public pages.
