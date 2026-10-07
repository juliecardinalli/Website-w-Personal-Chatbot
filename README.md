# Interactive Portfolio Website

An explorable island-world portfolio for Julie Cardinalli, built with React and Three.js. Each island opens a different part of the site, from work and projects to life outside work.

[Visit the live site](https://jcardinalli.work/)

The personal chatbot uses Cloudflare Workers AI and Vectorize to retrieve context from a curated Q&A knowledge base before answering. A separate embedding worker supports retrieval and knowledge-base updates.

This repository contains the **complete website**, including the 3D experience, content panels, and integrated chatbot. For a portable, backend-focused version of the chatbot with sample data and offline tests, see the separate [Portfolio Chatbot project](https://github.com/juliecardinalli/portfolio-chatbot). That extraction does not replace this site's production deployment.

## Highlights

- Interactive 3D island navigation with HTML content panels
- A reading-garden island with Julie's 2026 bookshelf
- React/Vite frontend and a separate Three.js world module
- Retrieval-backed chat API on Cloudflare Workers
- Static frontend hosted on Cloudflare Pages

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

Production deploys from the `main` branch through the existing Cloudflare Pages GitHub integration. A manual deployment is also possible:

```bash
cd Julie-chat
npm run build
CLOUDFLARE_ACCOUNT_ID=your-account-id npx wrangler pages deploy dist --project-name your-pages-project --branch main
```

Deploy the chat Worker:

```bash
npx wrangler deploy --config wrangler.toml
```

Deploy the embedding Worker:

```bash
npx wrangler deploy --config embed-worker.toml
```

## Update chatbot knowledge

After editing `backend/qna.json`, regenerate embeddings and upload the refreshed vectors:

```bash
node vectorize/embed.js
node vectorize/upload.js
```

The upload script reads `CF_API_TOKEN`, `CF_ACCOUNT_ID`, and `VECTORIZE_INDEX` from `.dev.vars`. Use your own account, bindings, index, and endpoints for a separate deployment.

## GitHub safety notes

- `.dev.vars` is local-only and must not be committed.
- `.DS_Store`, `node_modules/`, and build outputs are ignored.
- If a Cloudflare token was ever committed, rotate it in Cloudflare before treating the repository as safe.
