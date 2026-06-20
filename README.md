# Julie Personal Site

Personal portfolio website and AI chatbot for Julie Cardinalli.

The frontend is a React/Vite app. The chatbot is backed by Cloudflare Workers AI, a Cloudflare Vectorize index, and a small embedding worker that turns the site's Q&A knowledge base into searchable context.

## What is included

- `Julie-chat/`: React/Vite frontend for the personal site
- `backend/agent-worker.js`: Chat API Worker
- `backend/embed-worker.js`: Embedding Worker used by the chat and vector scripts
- `backend/qna.json`: Source knowledge base for chatbot retrieval
- `vectorize/embed.js`: Generates vector embeddings from `backend/qna.json`
- `vectorize/upload.js`: Uploads generated vectors to Cloudflare Vectorize
- `wrangler.toml`: Cloudflare Worker config for the chat API
- `embed-worker.toml`: Cloudflare Worker config for the embedding service

## Prerequisites

- Node.js 18+
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

Create local environment config for vector scripts:

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

Deploy the frontend to Cloudflare Pages:

```bash
cd Julie-chat
npm run build
npx wrangler pages deploy dist --project-name julie-personal-site
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

The upload script reads `CF_API_TOKEN`, `CF_ACCOUNT_ID`, and `VECTORIZE_INDEX` from `.dev.vars`.

## GitHub safety notes

- `.dev.vars` is local-only and must not be committed.
- `.DS_Store`, `node_modules/`, and build outputs are ignored.
- If a Cloudflare token was ever committed, rotate it in Cloudflare before treating the repository as safe.
