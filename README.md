# julie-personal-site

Personal website and AI chatbot for Julie Cardinalli.

The site showcases Julie's professional background, technical projects, personal achievements, and personality in a sleek, modern portfolio format. The chatbot answers as Julie using a general personal knowledge base rather than a role-specific application narrative.

## App

- Frontend: React + Vite in `Julie-chat`
- Chat API: Cloudflare Worker in `backend/agent-worker.js`
- AI stack: Cloudflare Workers AI + Vectorize retrieval
- Deployment target: Cloudflare Pages for the frontend and Cloudflare Workers for the chatbot API

## Local development

```bash
cd Julie-chat
npm run dev
```

## Build

```bash
cd Julie-chat
npm run build
```

## Cloudflare deploy notes

Frontend:

```bash
cd Julie-chat
npm run build
npx wrangler pages deploy dist --project-name julie-personal-site
```

Worker:

```bash
npx wrangler deploy
```

After updating `backend/qna.json`, regenerate embeddings and upload the refreshed vectors before relying on production chatbot retrieval.
