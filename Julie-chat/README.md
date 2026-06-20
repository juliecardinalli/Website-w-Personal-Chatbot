# Julie Chat Frontend

React/Vite frontend for Julie Cardinalli's personal portfolio and AI chatbot.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview a production build

```bash
npm run preview
```

## Main files

- `src/App.jsx`: Page structure, portfolio sections, links, and visual content
- `src/components/Chat.jsx`: Chat UI and API call to the deployed Cloudflare Worker
- `src/index.css`: Global styling and responsive layout
- `src/assets/`: Site images

## Deployment

Build output goes to `dist/` and can be deployed to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy dist --project-name julie-personal-site
```
