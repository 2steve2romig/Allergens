# DevExtreme alignment

SureTrend's front-end is built on the **DevExtreme** component library (DevExpress). Any UI designed for the app should map cleanly onto DevExtreme primitives rather than reinvent them — that way designs ship straight through to production without the dev team having to approximate.

Reference: https://js.devexpress.com/Documentation/

## Component mapping

| Design-system element | DevExtreme component | Notes |
|---|---|---|
| Results table | `dxDataGrid` | Use built-in column chooser, filter row, grouping, and export-to-Excel. Pass/Fail badges render as a custom `cellTemplate`. |
| Dashboard KPIs | `dxTileView` or plain cards | Prefer plain cards — `dxTileView` adds drag affordances we don't need. |
| Trend chart | `dxChart` / `dxRangeSelector` | Line series with a gradient fill, no markers below 200 points. Range selector below the chart when the window is > 90 days. |
| Sidebar nav | `dxTreeView` (or plain HTML) | Plain HTML is fine for ≤ 8 top-level items; switch to `dxTreeView` once nested. |
| Form fields | `dxTextBox`, `dxSelectBox`, `dxDateBox`, `dxNumberBox` | `stylingMode: "outlined"` for the standard look; `"filled"` for the blue-tint variant used on the login page. |
| Select / dropdown | `dxSelectBox` with `dropDownButtonTemplate` | Use the down-chevron from our iconography. |
| Buttons | `dxButton` | `type: "default"` = primary (sky blue), `type: "normal" stylingMode: "outlined"` = secondary, `type: "normal" stylingMode: "text"` = ghost, `type: "danger"` for destructive. |
| Badges | plain HTML pill | DevExtreme has no badge primitive — keep our CSS pill. |
| Tabs | `dxTabs` | `stylingMode: "secondary"` to match our 2px underline. |
| Modals | `dxPopup` | `showCloseButton: true`, `dragEnabled: false`, 8px radius in our theme. |
| Toasts | `dxToast` | Use `type: "success" \| "error" \| "warning"` — map to our Pass/Fail/Caution colors. |
| File upload | `dxFileUploader` | `uploadMode: "useButtons"` for the Import flow. |
| Scheduler | `dxScheduler` | Sampling plan / test-plan calendars. |
| Map | `dxVectorMap` | Environmental maps / site heatmap view. |

## Theme tokens

DevExtreme ships a theme builder — feed it our tokens so the generated Less/CSS matches `colors_and_type.css`:

```
$base-bg: #F5F5F5;
$base-font-family: "Open Sans", "Arial", sans-serif;
$base-font-size: 14px;
$base-text-color: #1A1A1A;
$base-accent: #29ABE2;        // dx-primary
$base-accent-highlight: #1E8FBF;
$base-border-color: #E0E0E0;
$base-border-radius: 4px;     // small controls
$button-border-radius: 8px;   // override for dxButton
$base-success: #4CAF50;
$base-danger: #F44336;
$base-warning: #FFC107;
```

Build against the **Generic Light** base scheme, not Material — Material's ripple and elevation don't match our flat-first elevation system.

## Conventions

- Grids default to `showBorders: true`, `rowAlternationEnabled: false`, `hoverStateEnabled: true`. Row height tracks our 13px table-cell scale (≈ 36px rows).
- Pagination uses `showInfo: true` and `showNavigationButtons: true`; page size 25 / 50 / 100.
- For bulk actions, put a `dxToolbar` above the grid with left-aligned primary action and right-aligned export / filter / column chooser.
- Date formats follow our spec: `M/d/yyyy, h:mm a` (e.g. "4/21/2026, 8:38 PM") — set via `dxDateBox` `displayFormat`.
- RLU columns use `format: "#,##0"` and `alignment: "right"`, tabular numerals.
- Status columns render via `cellTemplate` that emits our `<span class="badge pass|fail|caution">` markup so the design-system CSS stays the single source of truth.

## When to break from DevExtreme

Use plain HTML when the control is purely presentational (KPI cards, quick-access tiles, brand lockups, marketing CTAs). Reach for DevExtreme the moment state, validation, keyboard navigation, or accessibility matters — it's been battle-tested in those areas and our hand-rolled versions haven't.
