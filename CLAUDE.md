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
