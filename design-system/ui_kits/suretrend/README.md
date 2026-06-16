# SureTrend UI kit

Hi-fidelity recreation of the SureTrend web app, for use in prototypes and mocks.

## What's here
- `index.html` — click-through app shell; opens on the Dashboard, sidebar switches screens
- `app.css` — all component styles (imports `colors_and_type.css` from the root)
- `Icons.jsx` — Lucide-style inline SVG icons
- `Sidebar.jsx`, `Topbar.jsx` — app chrome
- `Dashboard.jsx` — KPIs, trend chart, quick-access tiles
- `Results.jsx` — filterable results table with pass/caution/fail tabs
- `Reports.jsx` — report library
- `Login.jsx` — split-screen auth with SSO
- `App.jsx` — router + mount

## Design notes
- Fonts: Open Sans, self-hosted (Arial fallback) — see `colors_and_type.css`
- Sidebar is sky-blue (#29ABE2), 190px wide, white-on-blue nav
- Flat white cards on a #F5F5F5 page bg, 1px borders, 8px radius — shadows stay minimal
- Status always uses the green/red/amber trio; badges are pill-shaped with a dot icon
- Logo is a **placeholder** until the real SureTrend mark is supplied
