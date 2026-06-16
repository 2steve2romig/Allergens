---
name: suretrend-design
description: Use this skill to generate well-branded interfaces and assets for SureTrend (Hygiena's sanitation / food-safety data platform), either for production or throwaway prototypes, mocks, and slides. Contains essential design guidelines, colors, type, fonts, assets, and UI-kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick start

- Link `colors_and_type.css` — it defines all color, type, spacing, radius and shadow tokens.
- The primary is **sky-blue #29ABE2**. H1 page titles are sky-blue by convention.
- Status is always Pass/Fail/Caution in green/red/amber. Never use other colors for state.
- Real logo is **not** in `assets/` yet — ask the user for the SVG before shipping anything that needs it.
- Reference recreations of the app live in `ui_kits/suretrend/` — crib components from there.
- Production is on **DevExtreme** — see `DEVEXTREME.md` for the token→component mapping. When designing grids/charts/forms, think in `dxDataGrid` / `dxChart` / `dxSelectBox` etc., not raw HTML.
