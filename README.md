# 3D Portfolio (React + Vite)

This repository is a small single-page portfolio built with React and Vite that demonstrates interactive 3D scenes using Three.js via `@react-three/fiber` and `@react-three/drei`.

The site is data-driven and optimized for showcasing 3D model assets, animated UI elements, and lightweight interactions.

## Quick links

- Local dev server: `npm run dev` (Vite, default port 5173)
- Production build: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`
- Live demo: https://portfolio3d-weld-theta.vercel.app/

## Tech stack

- React (v19)
- Vite (bundler / dev server)
- Three.js via `@react-three/fiber` and `@react-three/drei`
- GSAP for timeline animations (`gsap`, `@gsap/react`)
- Tailwind CSS for styling
- Email: `@emailjs/browser` (contact form)

## What’s in this repo (high level)

- `src/` — application source
	- `src/App.jsx` — page composition; imports `src/sections/*`
	- `src/sections/` — page sections (Hero, TechStack, Showcase, Contact, etc.)
	- `src/components/` — reusable UI and 3D wrapper components
	- `src/components/models/` — 3D model components that load GLTF/GLB and expose props (scale/rotation/position)
	- `src/constants/index.js` — centralized data used across sections (navLinks, techStackIcons, counterItems)

- `public/` — static assets
	- `public/images/` — logos, icons, textures
	- `public/models/` — `.glb` / transformed models consumed by 3D components

## Architecture & conventions — the why

- Single-page composition: `src/App.jsx` composes the entire site by importing modular `sections`. New pages/sections should be added to `src/sections/` and then imported into `App.jsx`.
- Data-driven UI: most content is stored in `src/constants/index.js`. This makes it easier to add or swap assets without changing component code — e.g., add a new tech model by appending to `techStackIcons`.
- 3D model handling: models live in `public/models/` and are referenced by path from `src/constants/index.js`. Components in `src/components/models/` use loader helpers (e.g., `useGLTF`) and accept transform props.
- Styling: Tailwind CSS utility classes are used across components. Global styles live in `src/index.css` and Vite includes the Tailwind plugin via `vite.config.js`.

## Common workflows (developer tasks)

- Run dev server and iterate with HMR:

```powershell
npm run dev
```

- Create a production build and preview it locally:

```powershell
npm run build
npm run preview
```

- Run linter:

```powershell
npm run lint
```

## Adding or changing 3D assets (practical example)

Add a new tech/logo model:

1. Place `my-tech-transformed.glb` into `public/models/` following the naming convention used by existing files (e.g. `react_logo-transformed.glb`).
2. Open `src/constants/index.js` and add a new entry to `techStackIcons`:

```js
{
	name: 'MyTech',
	modelPath: '/models/my-tech-transformed.glb',
	scale: 1, // tune in small increments
	rotation: [0, 0, 0],
}
```

3. The `TechStack` section maps over `techStackIcons` and will automatically render your model. If visuals need fine-tuning, edit the consuming component in `src/components/models/techLogo/` (or the generic model wrapper).

Notes: large GLB files hurt dev reloads and bundle size; prefer optimized, decimated models and compressed textures.

## Integration points / external services

- Email sending (contact form) uses `@emailjs/browser`. Service IDs and templates are likely referenced in `src/sections/Contact.jsx` or the contact model component. Do not commit real service keys; use environment variables or secrets.
- Animations use GSAP — follow the pattern in `src/components` when creating timelines and remember to clean up on unmount to avoid leaks.

## Project-specific patterns for AI agents

- Prefer data-driven edits: change `src/constants/index.js` instead of modifying section markup when updating displayed content.
- When adding models, only add files to `public/models/` and update `src/constants/index.js`. Avoid hardcoding asset paths in multiple places.
- Inspect `src/components/models/*` to reuse the existing `useGLTF` and transform prop patterns.

## Troubleshooting & tips

- If a 3D model doesn’t appear: verify the `modelPath` in `src/constants/index.js`, confirm the file exists in `public/models/`, and check console for loader errors.
- If the dev server fails to start, ensure you have a compatible Node version and that dependencies are installed with `npm install`.

## Tests & CI

- There is no automated test harness included. Rely on `npm run dev` for manual verification. If you add tests, prefer lightweight unit tests for pure JS logic and visual/manual QA for 3D rendering.

## Contributing

- Keep 3D assets optimized (reduce polygon counts and texture sizes) to keep the site responsive.
- Do not commit secrets (EmailJS keys). Use env variables for local development.

## Where to look first when debugging or adding features

- `package.json` — scripts & dependencies
- `src/constants/index.js` — central content and model references
- `src/sections/*` and `src/components/*` — UI and 3D logic
- `public/models/` and `public/images/` — static assets

---

If you'd like, I can also:

- Add a short CONTRIBUTING.md with PR checklist (model size, bundle check, review steps).
- Add small runnable sample showing how a component loads a GLB (copy from an existing component into `/examples`).

Request any changes or additional focus areas and I’ll update the README accordingly.

