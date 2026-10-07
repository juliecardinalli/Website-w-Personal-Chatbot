# Julie's island portfolio

An original, low-poly 3D portfolio inspired by the island-and-railway interaction in the supplied Packy McCormick reference. No reference artwork or source code was copied.

## Main files

- `src/IslandApp.jsx`: page layout, native accessible dialogs, and preserved section hashes.
- `src/components/World.jsx`: original Three.js islands, railway, moving train, drag/zoom, pause, and non-WebGL fallback.
- `src/components/ChapterContents.jsx`: professional background, AI project, existing chat, speaking video, life, and contact panels.
- `src/islands.css`: ivory/sage/terracotta visual theme and small-screen layouts.
- `public/og.png`: generated social-preview card, not a screenshot of the live 3D experience.

The redesign retained the existing photos, Vimeo link, social accounts, and email address. The old `App.jsx` and `index.css` remain available as the previous design; `main.jsx` now loads the island design. A subsequent user-approved account migration updated the AI endpoint and hosting configuration without changing the design.

## Development and deployment

Use the existing npm/Vite workflow: `npm install`, `npm run dev`, and `npm run build`. Following the user-approved account migration, publish to Pages project `julie-cardinalli-world` in the personal account (`d2dbc2205fcf0779553671040c235052`), using production branch `main`. The previous `julieperplexity-agent` project in Portfolio Account is no longer the intended production destination. See the root README for explicit deployment commands; the old GitHub integration was not repointed. Leave the old account's Cloudflare Access policies and default-block setting untouched.

The production build succeeds. Six chapter panels passed server-rendered content/link checks, and `npm audit --omit=dev` reported zero vulnerabilities. Browser interaction testing was not performed during this pass. Dev dependency advisories inherited from the existing lockfile have not been broadly upgraded as part of this visual change.

## Social-preview asset

Generated with the built-in image-generation tool; dimensions 1730 × 909. Final project asset: `public/og.png`.

Prompt: One landscape social-preview card for Julie Cardinalli, warm ivory background, forest-green editorial typography and terracotta accent. Exact text: “Julie Cardinalli” and “Follow your curiosity.” Four original low-poly floating islands joined by a tiny elevated railway: a white cloud campus with an orange cloud, glass AI observatory, outdoor amphitheatre, and mountain cabin with pines and a lake. Soft shadows, muted sage/lavender/clay palette, professional but playful. No logos, watermarks, copied artwork, or other text.
