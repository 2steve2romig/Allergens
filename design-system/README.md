# SureTrend (Hygiena) — Design System

SureTrend is Hygiena's cloud-based sanitation / food-safety data platform. Quality and sanitation teams use it to track ATP cleaning verification, allergen, microbial and PCR test results across one or many facilities, and to generate audit-ready reports for HACCP, FSSC 22000, ISO 22000 and similar standards.

Positioning line from their site: "Easily transform data." The product is a confident, practical enterprise SaaS tool — not flashy, not playful. It ships alongside the **EnSURE® Touch** handheld luminometer and is also sold as standalone tiered plans (Starter / Power / Premium).

## Sources
- **Figma (attached):** `SureTrend Design System (1).fig` — a single page with a flattened image of the design system (swatches, type, spacing, components, buttons, badges, sidebar, quick-access cards). Extracted reference lives in `reference/`.
- **Hygiena.com** — product copy reference (hygiena.com/suretrend-data-analytics, hygiena.com/analytics/suretrend-analytics). Used to inform content fundamentals and iconography direction; no assets copied.
- **No codebase was attached** — the UI kit is a visual recreation based on the Figma reference, not pulled from production code.

---

## Index
- `colors_and_type.css` — CSS variables for the full token set (colors, type, spacing, radii, shadows) plus semantic element defaults (h1/h2/body/etc).
- `assets/` — brand assets. **The real SureTrend logo is not in the Figma file and has not been supplied** — there's currently no logo in this folder; preview cards render a clearly-marked placeholder.
- `preview/` — one HTML card per design-system concept; registered as review assets in the Design System tab.
- `ui_kits/suretrend/` — interactive recreation of the SureTrend web app (Login → Dashboard → Results → Reports).
- `DEVEXTREME.md` — how our tokens and components map onto the DevExtreme (DevExpress) library the production app is built with.
- `reference/` — the flattened design-system image extracted from the Figma file, plus sectional crops used during extraction. Kept for traceability; not shipped.
- `SKILL.md` — packaging metadata so this folder can be dropped in as a Claude-Code skill.

---

## Content fundamentals

**Voice.** Clear, practical, confidence-building. Talks to QA leads, sanitation supervisors, and compliance teams — people whose day is audits, corrective actions, and spreadsheets they want to stop maintaining. No hype, no slogans, no exclamation points.

**Pronouns.** Second-person "you / your team" is the default. First-person plural ("we / our platform") only when describing Hygiena's role. Never "I".

**Casing.** Sentence case for UI labels and section headers (e.g. "Quick access", "Pass rate"). Title Case only for the product name and legal marks — **SureTrend**, **EnSURE® Touch**, **MicroSnap®**, **One Health Diagnostics™**. `®` and `™` are load-bearing; keep them.

**Numerals and units.** Use digits ("12 RLU", "7 days", "30-day free trial"). RLU is the unit of truth on the hygiene side; CFU on the microbial side.

**Emoji.** No. Not in UI, not in marketing copy. Status is communicated with the colored badge system, not emoji.

**Example voice, from the product and site:**
- "Easily transform data into audit-ready reports."
- "Sign up for free and unlock the power of unified sanitation data management."
- "Identify early risk signals, make corrective actions and resolve issues before they become serious."
- "Reduce paper reports and spreadsheets with auto-generated, customizable reports."
- Dashboard microcopy stays literal: "Pass", "Fail", "Caution", "Tests run", "Pass rate".

**What to avoid.** "Revolutionize", "leverage", "supercharge", "game-changing", rocket emoji, sparkles, "AI-powered" unless the feature is actually AI.

---

## Visual foundations

**Color.** The system is anchored by a four-step blue ramp — **Sky #29ABE2** (primary / sidebar / h1), **Deep #1E8FBF** (hover), **Nav #0D6A99** (headers, on-dark surfaces), **Tint #E8F7FD** (subtle fills, input backgrounds). Three accents live alongside it for categorical use only (purple #5B4FA8, orange #E8662A, teal #2196A8) — they color icon outlines on the quick-access cards and nothing else by default. Semantic is rigid: **Pass #4CAF50, Fail #F44336, Caution #FFC107** — always, everywhere. Neutrals run from pure white surfaces to #1A1A1A text on a #F5F5F5 page background.

**Type.** Open Sans, **brand-licensed TTFs** in `fonts/` — `OpenSans-Regular.ttf` (400) and `OpenSans-Bold.ttf` (700). **Arial** is now self-hosted as the licensed fallback (Regular / Italic / Bold / Black, plus Arial Narrow Bold) rather than relying on the system copy. Weights 400 and 700 only for Open Sans — the `--fw-medium` / `--fw-semibold` tokens map to those two cuts to avoid browser synthetic bold. The scale is small and practical: display 32, h1 24, h2 18, body 14, nav/table 13, caption 11. h1 is **sky-blue** by convention.

**Spacing.** 4 / 8 / 12 / 16 / 24 / 32 / 48. Dense at the small end (table cells 4, inputs 6, nav items 8); generous at the top (24 between page sections, 48 for page padding).

**Backgrounds.** Flat. White cards on grey page. No hand-drawn illustrations, no repeating patterns, no full-bleed photography inside the app. The login / marketing split-screen uses a single soft **linear gradient** from Deep blue to Nav blue — that's the only gradient in the system.

**Corners.** 0 for dense table cells, 4 for inputs, 6 for nav items, 8 for cards and buttons, pill (999) for status badges. Never above 8 for cards.

**Borders.** 1px #E0E0E0 hairlines separate cards and table rows. Buttons and icon outlines use 1.5px — slightly heavier so they read crisply against tint fills. Icon strokes are 2px (Lucide default), round caps and joins.

**Shadows / elevation.** Low and restrained. Cards are flat with a border; menus get a small 2px/6px shadow; modals get 8px/24px. The system prefers borders over shadows for separation.

**Animation.** Minimal and functional. Transitions are 120–180ms ease on `background`, `color`, `transform`, `box-shadow`. Quick-access cards scale to 1.04 on hover (this is the only "lift" gesture). No bounces, no springs, no page transitions.

**Hover states.** Primary buttons darken Sky → Deep. Secondary / ghost buttons swap to Blue tint background. Sidebar nav rows get a translucent white overlay (`rgba(255,255,255,.12)`). Quick-access cards scale slightly and gain a soft shadow.

**Press states.** `transform: scale(1.01)` on interactive cards, no color change on buttons — the color is already the hover state.

**Focus.** 3px `rgba(41,171,226,.3)` ring on inputs and keyboard-focused buttons. Border shifts to Sky blue.

**Transparency / blur.** Sparingly. The sidebar active-item pill is `rgba(255,255,255,.22)`; the default row is `rgba(255,255,255,.85)` — that's it. No blur backdrops.

**Imagery.** The app is imagery-light. When a photo shows up (marketing, onboarding), the tone is bright, clean, industrial — food-processing floors, lab benches, stainless steel. Cool temperature, no grain, no film filters.

**Layout.** App shell is a 190px sidebar + fluid main. Content max-width 1400px. Cards stack with 16px gaps, grid with 16–24px gaps. No sticky hero imagery — the sky-blue h1 does that job.

---

## Iconography

**System.** [Lucide](https://lucide.dev), inlined as SVG with `currentColor`. 24×24 viewbox, 2px stroke, round caps and joins. No filled-icon variants except for play buttons and categorical chips.

**Logo.** Both brands live in `assets/`:
- `suretrend-cloud-logo.png` — the product mark (blue cloud + chart + "SureTrend®" wordmark with checkmark). This is the primary in-app lockup.
- `hygiena-logo-black.png` / `hygiena-logo-white.png` / `hygiena-logo-cyan.png` — the Hygiena parent brand, for co-brand footers and on-dark contexts.

SureTrend is a Hygiena product, so on marketing surfaces use a **co-brand lockup**: Hygiena wordmark, 1px divider, SureTrend Cloud mark. In the app itself, lead with the SureTrend Cloud mark alone. Never recolor either logo outside the three provided Hygiena variants.

**Usage.**
- Sidebar nav items: monochrome white, 16px
- Icon tiles on quick-access cards: 22px stroked, **color-coded** per action category (orange = admin/register, sky-blue = users/data, purple = import/migrate, teal = tutorials/help)
- Status badges embed a tiny 9px glyph inside a colored dot (✓ / ✕ / !) — never rely on color alone
- Emoji is **not** used as iconography. Unicode arrows (→, ↑, ↓) are OK in small deltas and breadcrumbs.

**Substitutions.** If a required icon isn't in Lucide, reach for [Phosphor](https://phosphoricons.com) in its Regular weight — stroke weight matches. Flag the swap.

---

## Caveats / substitutions flagged

1. **Fonts** — brand-licensed Open Sans 400 + 700 ship in `fonts/`. Medium / semibold weights aren't licensed yet; the `--fw-medium` / `--fw-semibold` tokens map onto 700 to avoid synthetic bold. Drop additional weights and extend the @font-face block if a finer scale is needed.
2. **Icons** — Lucide is the stand-in; the reference screenshot is too low-res to pin down the exact icon family. Swap if you know the real set.
3. **UI kit** is a visual recreation from the Figma reference — no production codebase was attached, so component implementations are cosmetic, not faithful to the live app's component tree.
4. **Framework** — the production app is built on **DevExtreme**. See `DEVEXTREME.md` for the mapping from our tokens/components onto `dxDataGrid`, `dxChart`, `dxButton`, `dxSelectBox`, etc. Designs should target those primitives so implementation is a direct swap.
