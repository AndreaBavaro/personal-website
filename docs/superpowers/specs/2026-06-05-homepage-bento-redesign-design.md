# Homepage Bento Redesign — Design

## Goal

Replace the current cramped single-card landing with a viewport-filling **bento grid** that surfaces the most important professional information at a glance — no scrolling on desktop, graceful stacking on mobile/iOS.

## Context

- The real landing is rendered inline by `AppContent` in `src/App.jsx` (the `{!activeSection && ...}` block). `src/pages/Home.jsx` and `src/components/Navbar.jsx` are dead code (nothing imports them).
- Navigation uses `activeSection` state: clicking a nav button swaps the hero out for that section (`Resume`, `Portfolio`, `Contact`, and an inline `about` case). This behavior is preserved.
- Styling is glassmorphism (frosted translucent cards, blur) over a fixed `public/background.jpg` with a dark overlay. The bento reuses this language.
- Content source of truth: `src/data/resumeData.js` (already updated this session).

## Layout

### Banner (top)
- `Andrea Wolfgang Diano-Bavaro` — large display type (`clamp(28px, 5.2vw, 58px)`, weight 800).
- Subtitle: `Full Stack Developer · Toronto`.

### Bento grid (3 columns × 2 rows on desktop)
| Tile | Position | Content |
|------|----------|---------|
| **Photo + links** | col 1, rows 1–2 (tall) | Circular `/profile.jpg` + GitHub / LinkedIn / Email icon buttons (56px, large) |
| **Experience** | col 2, row 1 | Citi logo on a white badge + "Full Stack Developer"; below: "2 years managing projects across Go, Python, and TypeScript." |
| **Nitely** | col 3, row 1 | Accent (blue) tile. "Shipped · App Store" → Nitely (iOS) → Supabase/Swift summary + tech tags |
| **About** | cols 2–3, row 2 (wide) | Condensed LinkedIn intro |

### Nav row (below grid)
- `About Me · Resume · Portfolio · Contact` — existing pill buttons, existing toggle behavior.

### Tile click-through (shortcuts)
- Experience tile → opens Resume section.
- Nitely tile → opens Portfolio section.
- About tile → opens the About section (full text).
- Implemented by calling the same `setActiveSection(...)` the nav buttons use.

## Content

**Banner:** `Andrea Wolfgang Diano-Bavaro` / `Full Stack Developer · Toronto`

**Experience tile:** Citi logo + `Full Stack Developer`; `2 years managing projects across Go, Python, and TypeScript.`

**Nitely tile:** label `Shipped · App Store`; title `Nitely (iOS)`; body `Toronto nightlife app — Swift/SwiftUI front end on a Supabase backend (79 tables, 165+ RPCs).`; tags `Swift, SwiftUI, Supabase, Next.js`.

**About tile (condensed):**
> Hey, I'm Andrea — a Software Developer on Citi's Platform Engineering team. I pair unconstrained, creative problem-solving with first-principles thinking to land on the most effective path forward. Off the clock: travelling (especially to Italy for family & culture), sports, and good conversations over a meal.

**About section (full, behind About Me button)** — replace the current hardcoded About copy with the full LinkedIn version (3 paragraphs):
> Hey, I'm Andrea! I'm currently a Software Developer on the Platform Engineering team at Citi.
>
> I take pride in an unorthodox approach to problem-solving. I like to explore the unrealistic and the creative without constraints, then use first-principles thinking to leverage those ideas into the most effective course of action.
>
> On my free time I love travelling, especially to Italy, to learn more about my family and cultural history. I also enjoy experiences with loved ones and strangers too — through sharing meals, playing sports, watching sports, or just sitting and talking about life.

Keep the existing "See The World!" → `/photos` button beneath the About section.

## Citi logo asset

- Add `public/citi-logo.svg` — faithful wordmark: blue (`#003B7E`) lowercase "citi" + red (`#ED1C24`) arc over the "t".
- Rendered on a small white rounded badge so the blue/red mark reads against the dark frosted tile.
- Nominative use of an employer logo on a personal portfolio.

## Skills note

The grouped Tech-stack tile was replaced by the About tile, so skills no longer appear on the homepage. They remain on the Resume section (`resumeData.js` → `skills`). Accepted.

## iOS / responsive

- **Single-column stack** under 640px: photo+links → Experience → Nitely → About → nav. Vertical scroll on phones is acceptable (the no-scroll guarantee is desktop/laptop only).
- `-webkit-backdrop-filter` alongside `backdrop-filter` for frosted glass on Safari.
- Touch targets ≥ 44px (social icons are 56px; nav buttons comfortably exceed).
- No reliance on `:hover` for any information — hover only adds lift/affordance.
- Guard the existing `background-attachment: fixed` (janky on iOS Safari) — set `scroll` on small screens to avoid jump/blank repaint.
- Use a min-height approach that tolerates the iOS dynamic toolbar (avoid hard `100vh` lock that causes content clipping).

## Implementation surface

- `src/App.jsx` — replace the landing `{!activeSection && ...}` markup with banner + bento; add tile components/markup; wire tile click-throughs; update the inline `about` section copy. Reuse `socialLinks`/`homePoints` data already present (homePoints can be dropped).
- `public/citi-logo.svg` — new asset.
- Existing MUI imports cover everything; no new dependencies.

## Out of scope

- Deleting dead files (`Home.jsx`, `Navbar.jsx`) — separate cleanup, flagged earlier.
- Reconciling the "Full Stack Developer" (tile/banner) vs "Software Developer, Platform Engineering" (About) wording — user chose to keep both.
