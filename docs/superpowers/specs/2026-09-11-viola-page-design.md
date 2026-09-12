# "Hey Viola" Page — Design

## Goal

A hidden, playful, animated one-off page on andreawolfgang.com that Andrea sends to his friend Viola via a private link. It delivers a short personal message, photos from Italy, and a song. Tone: goofy Italy↔NYC mashup that still lands a warm moment at the payoff.

## Context

- Viola recently moved to New York ("the Big Apple") and works at the Italian Consulate.
- The photos are from a shared Italy trip (Lightroom album titled "Italia 2026").
- The song is *Io per lei – 2021 Remaster* by Pino Daniele (Neapolitan).
- Andrea sends the link directly; it is not discoverable from the site.

## Route & privacy

- Route: `/#/v/napoli-9f3a2c` (HashRouter, slug adjustable).
- Rendered full-screen, **outside** `AppContent` — no navbar, no bento, no theme toggle.
- Not linked from anywhere on the site.
- On mount, inject `<meta name="robots" content="noindex,nofollow">`; remove on unmount so the rest of the site stays indexable.

**Accepted limitation:** this is an unguessable URL, not authentication. The site is static and the repo is public, so the page code, the message text, and the photos are publicly browsable on GitHub. Andrea has explicitly accepted this.

## The experience — 6 beats

**0. The door.** Full-screen dark. One wobbling `Apri 💌` button. Doubles as the user gesture browsers require before audio/motion.

**1. HEY VIOLA.** Letters spring in one-by-one with overshoot. Confetti cannon in Italian-flag green/white/red plus taxi yellow. Slow emoji rain: 🍎 🍕 🗽 🛵.

**2. The message.** Typewriter reveal:
> I've been thinking about you today. One of the reasons may or may not be because it's 9/11 — but anyway, I hope you're liking the Big Apple.

The visual gag attaches to **"Big Apple"** (an oversized 🍎 bounces in). The 9/11 clause renders as plain text with no animation or effect — the line reads as Andrea's own written joke; animating it would land wrong.

**3. The promotion.** A mock consulate ID badge swings in on a lanyard with pendulum physics. The badge carries a headshot of Viola (left) beside the text (right):
> **CONSOLATO GENERALE D'ITALIA · NEW YORK**
> VIOLA — *Chief Executive Officer*

Badge photo lives at `src/assets/viola-badge.jpg` — deliberately outside `src/assets/viola/` so it is not picked up by the Polaroid glob. Rendered as a desaturated, slightly-blown-out "official ID photo" treatment. If the file is absent, the badge falls back to a silhouette placeholder so the page still works.

A red `APPROVED` stamp thwacks onto it (scale-down + slight rotation + screen shake). Then:
> and I hope being CEO of the Italian Consulate isn't weighing too heavy on you

On the word "weighing," a comic stack of paperwork drops onto the badge and the badge sags on its lanyard.

**4. The photos.** "Here are some pictures and a song for you." Italy photos fly in and land as tossed Polaroids — random tilt, taped corners, `Italia 2026` caption. Draggable (touch + mouse); tap to enlarge, tap again to dismiss.

**5. The song.** Official Spotify embed for *Io per lei*, with a "turn it up 🎧" nudge and a dancing Vespa.

**6. Outro.** Short sign-off; hearts float up.

## Tech

- New `src/pages/ViolaPage.jsx` orchestrates the beats and owns the reveal state machine.
- Two focused child components:
  - `src/components/viola/ConfettiBurst.jsx` — emoji/particle burst, takes `colors`, `emojis`, `count`, `trigger`.
  - `src/components/viola/PolaroidStack.jsx` — takes a list of image URLs, handles scatter-in, drag, and enlarge.
- **framer-motion only** for all animation (already a dependency). No new runtime packages.
- Self-contained styling — deliberately does not inherit the site's glass/bento theme.
- **Mobile-first.** Viola will open this on a phone: touch-drag for Polaroids, ≥44px tap targets, no hover-dependent behavior, safe-area-aware, no `100vh` toolbar jump.
- Respect `prefers-reduced-motion`: skip the big motion, still show all content.

## Photos workflow

- Andrea exports from Lightroom into `src/assets/viola/` (JPEG, long edge ~1600px).
- Auto-discovered with `import.meta.glob('../assets/viola/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })` — no manifest file to maintain; ordering follows filename.
- `npm run viola:optimize` (new script, uses the existing `sharp` devDependency) resizes/compresses anything oversized in place before commit.
- The page renders correctly with zero photos, so it can be built and reviewed before the export lands.

## Known caveats

1. Spotify embeds play a 30-second preview unless the viewer is signed into Spotify in that browser, where it plays the full track. Hosting the MP3 is not an option (copyright).
2. The page cannot autoplay audio; Viola taps play on the embed. The beat-0 gesture does not grant Spotify autoplay.
3. Secret URL is obscurity, not security (see Route & privacy).
4. Viola's headshot and the trip photos are committed to a public repo. These are images of a third party, not just Andrea — flagged and accepted.

## Out of scope

- Any backend, auth, or analytics.
- Changes to the existing homepage, Resume, Portfolio, or Photos gallery.
- Hosting the song audio locally.
