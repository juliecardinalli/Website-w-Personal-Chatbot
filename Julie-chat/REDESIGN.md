# Julie's island portfolio

An original, low-poly 3D portfolio inspired by the island-and-railway interaction in the supplied Packy McCormick reference. No reference artwork or source code was copied.

## Main files

- `src/IslandApp.jsx`: page layout, native accessible dialogs, and preserved section hashes.
- `src/components/World.jsx`: original Three.js islands, railway, moving train, drag/zoom, pause, and non-WebGL fallback.
- `src/components/ChapterContents.jsx`: professional background, AI project, existing chat, speaking video, life, and contact panels.
- `src/islands.css`: ivory/sage/terracotta visual theme and small-screen layouts.
- `public/og.png`: generated social-preview card, not a screenshot of the live 3D experience.

The existing photos, Vimeo link, social accounts, email address, and AI endpoint are retained. No backend, Cloudflare Access, DNS, or account settings were changed. The old `App.jsx` and `index.css` remain available as the previous design; `main.jsx` now loads the island design.

## Development and deployment

Use the existing npm/Vite workflow: `npm install`, `npm run dev`, and `npm run build`. The Cloudflare dashboard confirms that the existing Pages project is `julieperplexity-agent`, in Portfolio Account (`b9aeac9364f25369c11c9611e57a2c1c`), with production branch `main` and domain `jcardinalli.work`. The old README project name `julie-personal-site` was outdated. Publish only to this existing project; do not create or migrate to a different hosting project. Leave Cloudflare Access policies and the account-wide default-block setting untouched.

The production build succeeds. Six chapter panels passed server-rendered content/link checks, and `npm audit --omit=dev` reported zero vulnerabilities. Browser interaction testing was not performed during this pass. Dev dependency advisories inherited from the existing lockfile have not been broadly upgraded as part of this visual change.

## Social-preview asset

Generated with the built-in image-generation tool; dimensions 1730 × 909. Final project asset: `public/og.png`.

Prompt: One landscape social-preview card for Julie Cardinalli, warm ivory background, forest-green editorial typography and terracotta accent. Exact text: “Julie Cardinalli” and “Follow your curiosity.” Four original low-poly floating islands joined by a tiny elevated railway: a white cloud campus with an orange cloud, glass AI observatory, outdoor amphitheatre, and mountain cabin with pines and a lake. Soft shadows, muted sage/lavender/clay palette, professional but playful. No logos, watermarks, copied artwork, or other text.
