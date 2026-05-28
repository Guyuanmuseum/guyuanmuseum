# Gu Yuan Digital Museum Data

This folder contains static JSON exported from the Gu Yuan Digital Museum Google Sheet.

- `public/` contains JSON that the public website may fetch and render.
- `internal/` preserves planning, review, workflow, governance, and implementation tabs that should not be loaded by public pages yet.
- `public/manifest.json` and `internal/manifest.json` map spreadsheet tabs to their generated JSON files.
- `public/archive-index.json` is a derived index for future AI search, archive filtering, collection pages, exhibition pages, and multilingual rendering.
- `public/local-assets.json` maps existing local image files while Sheet image URLs are still pending.
- `public/support-us.json` drives the preservation-first Support Us section. It contains future support systems only and does not enable payment, ecommerce, auction, or checkout functions.
- `internal/image-intake-checklist.json` tracks museum image intake status, missing files, duplicate files, unclear names, and recommended upload categories.
- `internal/reference-library.json` and `internal/department-tab-targets.json` preserve research-source planning and department tab targets for future scaling.

Language standard: public website content is English + Traditional Chinese (`zh-Hant`). Do not add Simplified Chinese to public-facing JSON fields or rendered UI text.

Future Google Sheets API sync should read credentials from environment variables only. Do not commit `.env` files, private keys, or service-account JSON files.
