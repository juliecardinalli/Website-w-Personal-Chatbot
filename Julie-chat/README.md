# Island-World Portfolio Frontend

React, Vite, and Three.js frontend for [Julie Cardinalli's portfolio](https://jcardinalli.work/). See the [repository README](../README.md) for the backend and full setup.

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

- `src/IslandApp.jsx`: App shell, navigation, and content-panel state
- `src/components/World.jsx`: Interactive Three.js islands
- `src/components/ChapterContents.jsx`: Portfolio sections
- `src/components/Chat.jsx`: Chat UI and API call to the deployed Cloudflare Worker
- `src/islands.css`: Island-world styling and responsive panels
- `src/assets/`: Portfolio photos
- `public/og.png`: Social-link preview image

## Deployment

Build output goes to `dist/`. The production site deploys through the existing Cloudflare Pages GitHub integration. To deploy your own copy manually:

```bash
npm run build
npx wrangler pages deploy dist --project-name your-pages-project
```
