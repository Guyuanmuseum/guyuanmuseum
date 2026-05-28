#!/usr/bin/env python3
"""Export the Gu Yuan Google Sheet workbook to static JSON data files."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from pathlib import Path

import openpyxl


SPREADSHEET_ID = "1eljw6wpcWKclc3D4TTzZ4d6f7uLJYFbyxGo8R2L9buQ"
SPREADSHEET_URL = (
    "https://docs.google.com/spreadsheets/d/"
    f"{SPREADSHEET_ID}/edit?usp=sharing"
)

FILE_NAMES = {
    "Timeline時間線": "timeline",
    "Sheet8": "sheet8",
    "Biography生平": "biography",
    "Life Stages｜人生阶段数据库": "life-stages",
    "Artworks Database｜作品数据库": "artworks",
    "Sources｜资料来源数据库": "sources",
    "Gu Ancun  Review Notes｜古安村反馈表": "review-notes",
    "Photos Archive照片庫": "photos-archive",
    "人物身份 metadata": "people-identity-metadata",
    "People  Contributors tab": "people-contributors",
    "Collections": "collections",
    "Museum Canon tab": "museum-canon",
    "Exhibitions tab": "exhibitions",
    "Research Themes tab": "research-themes",
    "Keywords  Tags ": "keywords-tags",
    "Metadata Standards ": "metadata-standards",
    "Digital Workflow": "digital-workflow",
    "JSON Structure": "json-structure",
    "JSON Example System": "json-example-system",
    "Website Architecture": "website-architecture",
    "Homepage Strategy": "homepage-strategy",
    "Homepage Narrative Flow": "homepage-narrative-flow",
    "International Positioning": "international-positioning",
    "Official International Descript": "official-international-description",
    "Institutional Strategy": "institutional-strategy",
    "Project Deck": "project-deck",
    "Funding Strategy": "funding-strategy",
    "Funding Priorities": "funding-priorities",
    "Governance Structure": "governance-structure",
    "Organizational Structure Overvi": "organizational-structure-overview",
    "Legal & Foundation Strategy": "legal-foundation-strategy",
    "Recommended Organizational Evol": "recommended-organizational-evolution",
    "Archive Roadmap": "archive-roadmap",
    "6-Month Priority Plan": "six-month-priority-plan",
    "Website Update Plan": "website-update-plan",
    "Website Build Priority": "website-build-priority",
    "Daily Execution Workflow": "daily-execution-workflow",
    "Recommended Weekly Rhythm": "recommended-weekly-rhythm",
    "Homepage Execution": "homepage-execution",
    "Homepage Visual Hierarchy": "homepage-visual-hierarchy",
    "Gu Yuan Portrait Archive｜古元肖像档案": "gu-yuan-portrait-archive",
}

REQUESTED_ALIASES = {
    "timeline": "timeline",
    "biography": "biography",
    "lifeStages": "life-stages",
    "artworks": "artworks",
    "photosArchive": "photos-archive",
    "sources": "sources",
    "reviewNotes": "review-notes",
    "websiteStatus": "website-status",
    "collections": "collections",
    "museumCanon": "museum-canon",
    "exhibitions": "exhibitions",
    "researchThemes": "research-themes",
    "keywordsTags": "keywords-tags",
    "peopleContributors": "people-contributors",
    "metadataStandards": "metadata-standards",
    "digitalWorkflow": "digital-workflow",
    "websiteArchitecture": "website-architecture",
}

PUBLIC_KEYS = {
    "timeline",
    "biography",
    "life-stages",
    "artworks",
    "photos-archive",
    "people-identity-metadata",
    "people-contributors",
    "collections",
    "museum-canon",
    "exhibitions",
    "research-themes",
    "keywords-tags",
    "sources",
    "website-architecture",
    "gu-yuan-portrait-archive",
    "official-international-description",
    "international-positioning",
}

SCALE_TARGETS = [
    "AI search",
    "Archive filtering",
    "Collection pages",
    "Exhibition pages",
    "Multilingual rendering",
]


def to_json_value(value):
    if isinstance(value, dt.datetime):
        return value.date().isoformat() if value.time() == dt.time() else value.isoformat()
    if isinstance(value, dt.date):
        return value.isoformat()
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def trim(values):
    cells = [to_json_value(value) for value in values]
    while cells and cells[-1] in (None, ""):
        cells.pop()
    return cells


def key_from_header(header, fallback):
    text = str(header or "").strip()
    if not text:
        return fallback
    text = text.replace("EN", " En ").replace("CN", " Cn ")
    parts = [part for part in re.split(r"[^0-9A-Za-z]+", text) if part]
    if not parts:
        return fallback
    normalized = [part.lower() for part in parts]
    first, *rest = normalized
    return first + "".join(part[:1].upper() + part[1:] for part in rest)


def unique_keys(headers):
    keys = []
    seen = {}
    for index, header in enumerate(headers, start=1):
        base = key_from_header(header, f"column{index}")
        count = seen.get(base, 0) + 1
        seen[base] = count
        keys.append(base if count == 1 else f"{base}{count}")
    return keys


def slugify(sheet_name):
    slug = re.sub(r"[^0-9A-Za-z]+", "-", sheet_name).strip("-").lower()
    return slug or "sheet"


def sheet_to_document(ws, generated_at):
    non_empty = []
    for row_number, row in enumerate(ws.iter_rows(values_only=True), start=1):
        values = trim(row)
        if values:
            non_empty.append((row_number, values))

    headers = non_empty[0][1] if non_empty else []
    keys = unique_keys(headers)
    records = []
    for row_number, values in non_empty[1:]:
        normalized_values = list(values) + [None] * max(0, len(keys) - len(values))
        if normalized_values[: len(headers)] == headers:
            continue
        record = {"_row": row_number}
        for key, value in zip(keys, normalized_values):
            record[key] = value
        records.append(record)

    return {
        "source": {
            "spreadsheetId": SPREADSHEET_ID,
            "spreadsheetUrl": SPREADSHEET_URL,
            "sheetName": ws.title,
            "generatedAt": generated_at,
            "headers": headers,
        },
        "records": records,
    }


def record_for_area(records, area):
    return next((record for record in records if record.get("homepageArea") == area), {})


def quoted_value(text):
    if not text:
        return ""
    match = re.search(r"[“\"]([^”\"]+)[”\"]", text)
    return match.group(1) if match else text


def build_site_content(documents, generated_at):
    homepage_execution = documents["homepage-execution"]["records"]
    website_architecture = documents["website-architecture"]["records"]
    official_description = documents["official-international-description"]["records"]

    main_title = quoted_value(record_for_area(homepage_execution, "Main Title").get("mainAction"))
    title_cn = quoted_value(record_for_area(homepage_execution, "Chinese Subtitle").get("mainAction"))
    intro_texts = [
        row.get("officialPositioningStatementEn")
        for row in official_description
        if row.get("officialPositioningStatementEn")
    ]
    marker_index = next(
        (index for index, text in enumerate(intro_texts) if str(text).startswith("官方")),
        len(intro_texts),
    )
    intro_en = intro_texts[:marker_index]
    intro_cn = intro_texts[marker_index + 1 :]

    nav_pages = [
        row
        for row in website_architecture
        if row.get("status") == "Active"
        and row.get("pageNameEn")
        in {
            "Home",
            "About Gu Yuan",
            "Collections",
            "Museum Canon",
            "Exhibitions",
            "Archive",
            "Research",
            "Family Archive",
        }
    ]

    return {
        "source": {
            "spreadsheetId": SPREADSHEET_ID,
            "spreadsheetUrl": SPREADSHEET_URL,
            "derivedFrom": [
                "Homepage Execution",
                "Official International Descript",
                "Website Architecture",
            ],
            "generatedAt": generated_at,
        },
        "navigation": [
            {
                "id": row.get("pageId"),
                "labelEn": row.get("pageNameEn"),
                "labelCn": row.get("pageNameCn"),
                "href": {
                    "Home": "#top",
                    "About Gu Yuan": "#life",
                    "Collections": "#collections",
                    "Museum Canon": "#works",
                    "Exhibitions": "#exhibitions",
                    "Archive": "#archive",
                    "Research": "#research",
                    "Family Archive": "#guardian",
                }.get(row.get("pageNameEn"), "#top"),
            }
            for row in nav_pages
        ],
        "hero": {
            "eyebrowEn": "Digital Museum",
            "eyebrowCn": "数字美术馆",
            "titleEn": main_title,
            "titleCn": title_cn,
            "ledeEn": intro_en[0] if intro_en else "",
            "ledeCn": intro_cn[0] if intro_cn else "",
            "secondaryEn": intro_en[1] if len(intro_en) > 1 else "",
            "secondaryCn": intro_cn[1] if len(intro_cn) > 1 else "",
        },
        "ui": {
            "languageToggleEn": "中文",
            "languageToggleCn": "English",
            "primaryCtaEn": "Museum Canon",
            "primaryCtaCn": "核心馆藏",
            "secondaryCtaEn": "Timeline",
            "secondaryCtaCn": "时间线",
        },
    }


def title_pair(record, en_key, cn_key):
    return {
        "en": record.get(en_key),
        "zh": record.get(cn_key),
    }


def build_archive_index(documents, generated_at):
    entries = []

    source_specs = [
        ("artwork", "artworks", "id", "titleEn", "titleCn", "descriptionEn", "descriptionCn"),
        ("photo", "photos-archive", "id", "titleEn", "titleCn", "descriptionEn", "descriptionCn"),
        (
            "collection",
            "collections",
            "collectionId",
            "collectionTitleEn",
            "collectionTitleCn",
            "descriptionEn",
            "descriptionCn",
        ),
        (
            "canon",
            "museum-canon",
            "canonId",
            "artworkTitleEn",
            "artworkTitleCn",
            "importanceEn",
            "importanceCn",
        ),
        (
            "exhibition",
            "exhibitions",
            "exhibitionId",
            "exhibitionTitleEn",
            "exhibitionTitleCn",
            "descriptionEn",
            "descriptionCn",
        ),
        (
            "research-theme",
            "research-themes",
            "researchId",
            "researchThemeEn",
            "researchThemeCn",
            "descriptionEn",
            "descriptionCn",
        ),
        ("keyword", "keywords-tags", "tagId", "keywordEn", "keywordCn", "descriptionEn", "descriptionCn"),
    ]

    for content_type, key, id_key, title_en, title_cn, body_en, body_cn in source_specs:
        for record in documents.get(key, {}).get("records", []):
            entries.append(
                {
                    "type": content_type,
                    "id": record.get(id_key),
                    "title": title_pair(record, title_en, title_cn),
                    "summary": title_pair(record, body_en, body_cn),
                    "year": record.get("year") or record.get("years"),
                    "category": record.get("category")
                    or record.get("theme")
                    or record.get("collection")
                    or record.get("relatedCollections"),
                    "period": record.get("period"),
                    "medium": record.get("medium"),
                    "status": record.get("status"),
                    "sourceFile": f"{key}.json",
                }
            )

    return {
        "source": {
            "spreadsheetId": SPREADSHEET_ID,
            "spreadsheetUrl": SPREADSHEET_URL,
            "derivedFrom": [spec[1] for spec in source_specs],
            "generatedAt": generated_at,
        },
        "scaleTargets": SCALE_TARGETS,
        "entries": entries,
    }


def visibility_for_key(key):
    return "public" if key in PUBLIC_KEYS else "internal"


def write_data_file(output_dir, key, document, visibility=None):
    folder = visibility or visibility_for_key(key)
    path = output_dir / folder / f"{key}.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {
        "key": key,
        "file": f"{folder}/{key}.json",
        "visibility": folder,
        "sheetName": document["source"]["sheetName"],
        "recordCount": len(document.get("records", [])),
        "headers": document["source"].get("headers", []),
    }


def write_manifest(output_dir, visibility, source, files, requested_aliases):
    manifest = {
        "source": source,
        "visibility": visibility,
        "scaleTargets": SCALE_TARGETS,
        "requestedAliases": {
            key: value for key, value in requested_aliases.items() if value["visibility"] == visibility
        },
        "files": sorted(
            [file for file in files if file["visibility"] == visibility],
            key=lambda item: item["key"],
        ),
    }
    path = output_dir / visibility / "manifest.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("workbook", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()

    wb = openpyxl.load_workbook(args.workbook, data_only=True)
    (args.output_dir / "public").mkdir(parents=True, exist_ok=True)
    (args.output_dir / "internal").mkdir(parents=True, exist_ok=True)
    generated_at = dt.datetime.now(dt.timezone.utc).isoformat()

    documents = {}
    manifest_files = []
    for ws in wb.worksheets:
        name = FILE_NAMES.get(ws.title, slugify(ws.title))
        document = sheet_to_document(ws, generated_at)
        documents[name] = document
        manifest_files.append(write_data_file(args.output_dir, name, document))

    if "website-update-plan" in documents:
        website_status = {
            "source": {
                **documents["website-update-plan"]["source"],
                "sheetName": "Website Status",
                "sourceSheetName": documents["website-update-plan"]["source"]["sheetName"],
                "note": "No exact Website Status tab was present in the export; this mirrors Website Update Plan status rows.",
            },
            "records": documents["website-update-plan"]["records"],
        }
        documents["website-status"] = website_status
        manifest_files.append(write_data_file(args.output_dir, "website-status", website_status, "internal"))

    site_content = build_site_content(documents, generated_at)
    manifest_files.append(
        {
            **write_data_file(
                args.output_dir,
                "site-content",
                {
                    **site_content,
                    "source": {
                        **site_content["source"],
                        "sheetName": "Derived site content",
                        "headers": [],
                    },
                    "records": [site_content],
                },
                "public",
            ),
            "recordCount": 1,
        }
    )

    archive_index = build_archive_index(documents, generated_at)
    manifest_files.append(
        {
            **write_data_file(
                args.output_dir,
                "archive-index",
                {
                    **archive_index,
                    "source": {
                        **archive_index["source"],
                        "sheetName": "Derived archive index",
                        "headers": [],
                    },
                    "records": archive_index["entries"],
                },
                "public",
            ),
            "recordCount": len(archive_index["entries"]),
        }
    )

    local_assets_path = args.output_dir / "public" / "local-assets.json"
    if local_assets_path.exists():
        manifest_files.append(
            {
                "key": "local-assets",
                "file": "public/local-assets.json",
                "visibility": "public",
                "sheetName": "Local asset map",
                "recordCount": 1,
                "headers": [],
            }
        )

    source = {
        "spreadsheetId": SPREADSHEET_ID,
        "spreadsheetUrl": SPREADSHEET_URL,
        "generatedAt": generated_at,
    }
    requested_aliases = {
        key: {
            "file": f"{visibility_for_key(value)}/{value}.json",
            "visibility": visibility_for_key(value),
        }
        for key, value in REQUESTED_ALIASES.items()
    }
    write_manifest(args.output_dir, "public", source, manifest_files, requested_aliases)
    write_manifest(args.output_dir, "internal", source, manifest_files, requested_aliases)


if __name__ == "__main__":
    main()
