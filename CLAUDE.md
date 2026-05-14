# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run the Express server (defaults to `http://localhost:3666`; override with `PORT`).
- No tests, lint, or build steps are configured.

## Architecture

Single-file Express service (`index.js`) that serves random aphorisms/truisms loaded from text files. There is no database or external state.

- Truism lists live in `truisms/*.txt`, one truism per line, blank lines ignored. They are auto-loaded at module init into a `{ <filename>: string[] }` map. **Adding a new list = drop a `.txt` file** — no code change.
- Routes:
  - `GET /truisms/:type/:number?` — primary endpoint. `type` is any filename under `truisms/` (e.g. `jh`, `airbnb`); unknown types fall back to `jh`. `number` clamped to `[1, 100]`. Returns `{ truisms: [...] }`.
  - `GET /airbnb` — single random Airbnb truism, returns `{ truism: "..." }` (note singular key, different shape).
- Randomization is Fisher–Yates over a copy of the source list.
- CORS is enabled globally via `cors()` (permissive defaults).
- Deployed on Vercel via `api/index.js` (one-liner that re-exports the app) and `vercel.json`. The `vercel.json` `functions.includeFiles` entry ships `truisms/**` with the serverless bundle — required, since Vercel's file tracer can miss files read via `fs.readdirSync`.

## Editorial direction

This is a conceptual art project, not just a service. The truisms are the work. The piece is a parody of decorative wall art for short-term rentals — and is *itself* such a piece, deliberately caught in its own critique. Targets: commoditization of art (the sanitized hipster-light aesthetic of Airbnb interiors) and commoditization of hospitality / domesticity itself.

**Form (Jenny Holzer's *Truisms*):** all-caps declarative single sentences, folk-authoritative voice (not academic), alphabetized to flatten into one institutional voice. Punctuation is part of the line (`.` and `?` end-marks matter — they signal register).

**Four registers in the corpus. The friction between them is the work** — too much of any one register breaks the spell:

1. **Sharp critique** — strikes that name the system. *WARMTH IS ONLY EVER FOR RENT*. *DOMESTICITY IS MADE INDUSTRIAL*.
2. **Hollow-poetic** — camouflage; indistinguishable from real Airbnb wall art at a glance. *WINDOWS FRAME LONELY SUNSETS*. *DUVET COVERS HOLD DREAMS OF RESTLESSNESS*. These pieces ARE the critique by being plausibly mistakable for the genuine article.
3. **Corporate-warm / live-laugh-love** — sincere voice in context that the surrounding lines turn sinister. *YOU ARE A PERSON OF EXCEPTIONAL TASTE.* *HAVEN'T I SEEN YOU HERE BEFORE?*
4. **Deadpan literal** — the system speaking its bureaucratic native tongue, no metaphor. *CHECKOUT IS AT 11 AM*. *IT'S THE THREADCOUNT, STUPID*.

Rough target proportions: ~40% hollow-poetic, ~30% sharp, ~15% corporate-warm, ~15% deadpan literal. Reader scanning the wall shouldn't immediately register that anything is wrong.

**Craft principles for new entries:**

- **Oblique beats didactic.** State the thing one step removed; the reader does the connecting work and the connection is the meaning. *A PARASITE ALSO HAS A HOST* doesn't mention Airbnb or the reader, but implicates both. Anything that lectures fails.
- **Specificity beats abstraction.** Concrete noun + judgment word. *STRIPPED BEDS ARE A RITUAL OF INDIGNITY*, not "domestic labor is undignified."
- **Voice is the system's, not the analyst's.** *FOUR STARS IS AN ACT OF VIOLENCE* captures how a host *experiences* the system; an outside-observer "four stars is harmful" doesn't land.
- **Form contradicting content is the engine.** Flattery printed identically on a thousand walls. Sincere voice undermined by mass reproduction.
- **Avoid object-as-verb cliché** (whispers / embraces / cradles / swaddles) — that's the AI-2024 fingerprint and was the failure mode of the original generated list.

**Thematic veins mined so far:** taste-as-market-segmentation, invisible labor (cleaning, hosting), algorithmic management (reviews, dynamic pricing, Superhost status), surveillance (smart devices, noise sensors), tax/zoning evasion, erasure of displaced long-term tenants, performance of hominess (curated bookshelves, welcome baskets), class friction (guest/host/cleaner three-tier economy).

**The lists:**

- `truisms/jh.txt` — canonical Jenny Holzer *Truisms* (1977–79). Reference corpus; the formal model.
- `truisms/airbnb.txt` — original AI-generated 2024 list. Mostly vapid object-as-verb constructions; kept for historical reasons and as a quarry for adaptation.
- `truisms/airbnb_rev2.txt` — the active curated set. This is what the LED display client (`led_display` / `airbnb_truisms` repo) pulls. Edits to the live piece happen here.
