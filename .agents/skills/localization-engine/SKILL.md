---
name: localization-engine
description: Rules for managing multi-lingual translation dictionaries, currency formats, and localized date strings.
---

# Localization Engine & Multi-Lingual Optimization Skill

This skill ensures the application handles internationalization (i18n) cleanly, specifically focusing on Uzbek (uz) and Japanese (jp) locales.

## Translation Guidelines

1. **Strict Key Alignment:**
   * When adding a new translation string to `src/translations.js`, it must be added to both the `uz` and `jp` dictionaries.
   * Never leave a key missing in one locale; if a translation is missing, use a clean placeholder or fallback language.

2. **Currency & Unit Formatting:**
   * Japanese Yen must be formatted with the `¥` symbol or `円` suffix, using standard comma grouping (e.g. `amount.toLocaleString() + ' JPY'`).
   * Uzbek Som must use `so'm` or `UZS`.

3. **Date Formats:**
   * Japanese standard date representation: `YYYY-MM-DD` or `YYYY年MM月DD日`.
   * Uzbek standard date representation: `YYYY-MM-DD` or `DD.MM.YYYY`.
