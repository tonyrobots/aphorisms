# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — run the Express server (defaults to `http://localhost:3666`; override with `PORT`).
- No tests, lint, or build steps are configured.

## Architecture

Single-file Express service (`index.js`) that serves random aphorisms/truisms from in-memory arrays. There is no database, persistence layer, or external state.

- Truism lists are hardcoded as module-level constants at the bottom of `index.js`: `JHTruisms` (Jenny Holzer-style) and `airBnbTruisms`. New collections should be added the same way and wired into the `switch` on `type` in the `/truisms/:type/:number?` handler.
- `truisms.txt` is a source/reference file for the Holzer truisms; it is not loaded at runtime — `JHTruisms` in `index.js` is the live data.
- Routes:
  - `GET /truisms/:type/:number?` — primary endpoint. `type` is `jh` or `airbnb` (falls back to `jh`). `number` is clamped to `[1, 100]`. Returns `{ truisms: [...] }`.
  - `GET /airbnb` — single random Airbnb truism, returns `{ truism: "..." }` (note singular key, different shape from `/truisms`).
  - `GET /aphorism` — references `selectRandomAphorisms`, which is **not defined**; this route currently 500s. Either implement the helper or remove the route when touching it.
- Randomization uses `[...list].sort(() => 0.5 - Math.random())` then `slice`. There's a commented-out unbiased shuffle (`getRandomElements`) preserved in the file as an alternative.
- CORS is enabled globally via `cors()` with default (permissive) settings.
