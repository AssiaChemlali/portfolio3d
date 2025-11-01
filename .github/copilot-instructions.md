## Repo overview

This is a small React + Vite portfolio that uses react-three-fiber, @react-three/drei and Three.js for interactive 3D scenes. Key folders:

- `src/sections/` — high-level page sections (Hero, TechStack, Showcase, Contact, etc.)
- `src/components/` — reusable UI + 3D components (NavBar, model wrappers, counters)
- `src/components/models/` — 3D React components that wrap GLTF/GLB models (e.g. `Computer.jsx`, `HeroExperience.jsx`)
- `public/images/` and `public/models/` — static assets (images, logos, `.glb` models)
- `src/constants/index.js` — canonical data lists used by sections (navLinks, techStackIcons, counterItems). Edit here to change displayed content.

## Build & run (essential)

- Local dev server: `npm run dev` (uses Vite; default port 5173)
- Build production bundle: `npm run build` (Vite build)
- Preview production bundle: `npm run preview`
- Lint: `npm run lint`

When you need to test changes to 3D assets or models live, run `npm run dev` and open http://localhost:5173.

## Project-specific conventions & patterns

- Single-page composition: `src/App.jsx` composes the page by importing components from `src/sections/*`. Modify or add sections there.
- Data-driven sections: content is mostly fed from `src/constants/index.js`. For example, add a new tech logo by adding an object to `techStackIcons` (include `modelPath`, `scale`, `rotation`) and ensure the referenced `/models/*.glb` exists in `public/models/`.
- 3D components use `@react-three/fiber` + `@react-three/drei`. Look at `src/components/models/*` for patterns: they often load models and expose props for scale/rotation/position.
- Styling: Tailwind CSS classes are used across the project; global CSS is in `src/index.css` and Vite includes the Tailwind plugin in `vite.config.js`.

## Editing assets & models (common tasks)

- Add a new GLB model: put `my-model.glb` in `public/models/`, then reference it in `src/constants/index.js` (e.g. `modelPath: '/models/my-model.glb'`). Adjust `scale` and `rotation` there or in the consumer component.
- Add a logo image: put it under `public/images/logos/` and reference via the path in `src/constants/index.js` or directly in a JSX file.

## Example: add a tech logo (step-by-step)

1. Copy `public/models/react_logo-transformed.glb` style for naming/transform conventions.
2. Add `my-tech-transformed.glb` to `public/models/`.
3. In `src/constants/index.js` add:
   {
     name: "MyTech",
     modelPath: "/models/my-tech-transformed.glb",
     scale: 1,
     rotation: [0, 0, 0],
   }
4. The `TechStack` section will map over that list and render the model — adjust component props if needed.

## Integration points & external deps

- Email sending uses `@emailjs/browser` — check `src/sections/Contact.jsx` (or `src/components/models/contact/`) for service IDs. Do not commit secrets; prefer env vars if you need to persist keys.
- Animation: `gsap` and `@gsap/react` are used in components; follow existing usage patterns in `src/components` for timeline creation and cleanup.
- Three.js/react-three-fiber: models are loaded and manipulated in component files inside `src/components/models/` and `src/sections/*`.

## Editing guidance for AI agents

- Prefer data-driven edits: change lists in `src/constants/index.js` instead of editing markup when possible.
- Follow existing component props and patterns: inspect `src/components/models/*` before reusing loading/transform code.
- Keep edits local to `src/sections/*` or `src/components/*` unless adding assets (which go under `public/`).
- When adding new assets, update `public/models/` and `public/images/` and the relevant entry in `src/constants/index.js`.

## Files to check first when investigating a bug or feature

- `package.json` — scripts & deps
- `vite.config.js` — Vite plugins (Tailwind config)
- `src/constants/index.js` — content lists driving the UI
- `src/sections/*` and `src/components/*` — where UI and 3D logic live
- `public/models/` and `public/images/` — static assets

## Quick notes / caveats

- No test harness is present; rely on `npm run dev` for quick verification.
- Be mindful of large GLB files; prefer optimized models (there's an `Optimized-room.jsx` in `/models/` showing prior optimization work).
- Avoid committing secrets (EmailJS IDs) into source — use envs if persistent keys are required.

If anything in these instructions is unclear or you'd like the agent to prioritize different areas (examples, tests, or adding type hints), tell me which sections to expand or change.
