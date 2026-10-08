# Interactive Portfolio Website

An explorable island-world portfolio for Julie Cardinalli, built with React and Three.js. Four islands cover work, projects, speaking, and reading.

[Visit the live site](https://jcardinalli.work/)

The personal chatbot uses Cloudflare Workers AI and Vectorize to retrieve context from a curated Q&A knowledge base before answering. A separate embedding worker supports retrieval and knowledge-base updates.

This repository contains the **complete website**, including the 3D experience, content panels, and integrated chatbot. For a portable, backend-focused version of the chatbot with sample data and offline tests, see the separate [Portfolio Chatbot project](https://github.com/juliecardinalli/portfolio-chatbot). That extraction does not replace this site's production deployment.

## Highlights

- Interactive 3D island navigation with HTML content panels
- A reading-garden island with Julie's 2026 bookshelf
- React/Vite frontend and a separate Three.js world module
- Retrieval-backed chat API on Cloudflare Workers
- Static frontend hosted on Cloudflare Pages
- A mouse-following photo-head stick-figure cursor, with native-pointer fallbacks for touch, reduced motion, and text entry

The world and content can run locally without deploying a new backend. The chat component currently points to the live Worker; replace that endpoint to use your own service.

## What is included

- `Julie-chat/src/IslandApp.jsx`: Island-world app and content-panel navigation
- `Julie-chat/src/components/World.jsx`: Three.js scene and island interactions
- `Julie-chat/src/components/ChapterContents.jsx`: Portfolio content
- `Julie-chat/`: React/Vite frontend and static assets
- `backend/agent-worker.js`: Chat API Worker
- `backend/embed-worker.js`: Embedding Worker used by the chat and vector scripts
- `backend/qna.json`: Source knowledge base for chatbot retrieval
- `vectorize/embed.js`: Generates vector embeddings from `backend/qna.json`
- `vectorize/upload.js`: Uploads generated vectors to Cloudflare Vectorize
- `wrangler.toml`: Cloudflare Worker config for the chat API
- `embed-worker.toml`: Cloudflare Worker config for the embedding service

## Prerequisites

- Node.js 22.12+ (recommended for the current Vite build)
- npm
- Cloudflare account with Workers AI enabled
- Cloudflare Vectorize index
- Wrangler CLI access to the target Cloudflare account

## Local setup

Install frontend dependencies:

```bash
cd Julie-chat
npm install
```

From the repository root, create local environment config if you are running the vector scripts:

```bash
cp .dev.vars.example .dev.vars
```

Then fill in the values in `.dev.vars`. Do not commit `.dev.vars`; it is intentionally ignored.

## Run the frontend locally

```bash
cd Julie-chat
npm run dev
```

The chat component currently calls the deployed Worker endpoint in `Julie-chat/src/components/Chat.jsx`.

## Build the frontend

```bash
cd Julie-chat
npm run build
```

The production build is written to `Julie-chat/dist/`.

## Deploy

The personal-account deployment is the Cloudflare Pages project `julie-cardinalli-world`. The previous account's GitHub integration has not been moved or disconnected, so pushing to `main` does **not** automatically update this new project. Publish it explicitly:

```bash
cd Julie-chat
npm run build
CLOUDFLARE_ACCOUNT_ID=d2dbc2205fcf0779553671040c235052 npx wrangler pages deploy dist --project-name julie-cardinalli-world --branch main
```

Deploy the chat Worker:

```bash
npx wrangler deploy --config wrangler.toml
```

Deploy the embedding Worker:

```bash
npx wrangler deploy --config embed-worker.toml
```

Both Worker configuration files pin the personal account to prevent accidental deployments to the old organization account. Deploy the embedding Worker before the chat Worker on a new account. `embed-worker` is private and is reached by the chat Worker's `EMBED` service binding; only `julie-agent-worker` has a public `workers.dev` URL. The chat uses the `julie-qna-fast` Vectorize index (384 dimensions, cosine metric) and Workers AI. No API keys are shipped to the browser.

Run the migration regression checks with `node --test backend/agent-worker.test.js` and `node --test Julie-chat/verify-island-labels.test.js`.

## Cursor avatar

`Julie-chat/src/components/AvatarCursor.jsx` draws an animated SVG stick body under Julie's cutout head. The decoration is click-through and uses a manual popover so it also appears above native chapter dialogs. A small dot marks the exact click point. It stays off on touch/coarse-pointer devices and with reduced motion, and restores the normal cursor over form fields and embedded media. Pointer movement is batched into one frame; no JavaScript animation loop runs while idle.

Run its checks with `node --test Julie-chat/verify-avatar-cursor.test.js`.

Asset: [`Julie-chat/src/assets/julie-cursor-head.png`](Julie-chat/src/assets/julie-cursor-head.png), 160 × 160 PNG with alpha. Created with the built-in image-generation tool from Julie's existing `julie-cow.jpg` photo, then downscaled for delivery. The original photo is unchanged.

Final image prompt:

> Use case: background-extraction. Asset type: transparent cutout head for a tiny personal-website cursor avatar. Input image 1 is the EDIT TARGET: the woman at the LEFT of the photo beside a fluffy white cow. Extract ONLY this woman's head, sunglasses, and the hair immediately framing her face, trimmed to around chin length. Preserve her exact recognizable face, expression, skin tone, sunglasses and brown highlighted hair from the photograph. Photographic cutout, NOT an illustration, NOT a redesigned face. Remove the entire cow, body, shirt, shoulders, fence, trees, sky and all background. No neck/body below the chin and no stick body yet (the website will draw it). Center the single head cutout, upright, with a small even transparent margin, on a genuinely transparent alpha background, clean natural edges, no shadow, no outline, no text, no checkerboard pixels. Output one small square PNG asset.

## Update chatbot knowledge

After editing `backend/qna.json`, run the private embedding Worker through a local, authenticated remote-development session in one terminal:

```bash
npx wrangler dev --config embed-worker.toml --remote --port 8787
```

In another terminal, regenerate embeddings, convert them, and upload through Wrangler's current Vectorize v2 command:

```bash
EMBED_WORKER_URL=http://127.0.0.1:8787 node vectorize/embed.js
node convert-to-ndjson.js
CLOUDFLARE_ACCOUNT_ID=d2dbc2205fcf0779553671040c235052 npx wrangler vectorize upsert julie-qna-fast --file vectorize/embeddings.ndjson
```

The legacy `vectorize/upload.js` script targets the old Vectorize API and is not used for this deployment. Stop the remote-development session when finished. Use your own account, bindings, index, and endpoints for a separate deployment.

## GitHub safety notes

- `.dev.vars` is local-only and must not be committed.
- `.DS_Store`, `node_modules/`, and build outputs are ignored.
- If a Cloudflare token was ever committed, rotate it in Cloudflare before treating the repository as safe.
