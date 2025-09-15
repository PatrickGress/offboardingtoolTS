# Copilot Instructions for AI Coding Agents

## Project Overview
This is a React + TypeScript project bootstrapped with Vite. The architecture is modular, with all source code in the `src/` directory. The entry point is `src/main.tsx`, which loads the root `App` component from `src/App.tsx`.

## Key Files & Structure
- `src/main.tsx`: Vite/React entry point, renders `<App />`.
- `src/App.tsx`: Main application component.
- `src/assets/`: Static assets (e.g., SVGs).
- `public/`: Publicly served files (e.g., `vite.svg`).
- `vite.config.ts`: Vite configuration, uses `@vitejs/plugin-react`.
- `eslint.config.js`: ESLint configuration (TypeScript, React Hooks, Vite refresh).
- `tsconfig*.json`: TypeScript configuration files.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (or `yarn dev`) — launches Vite with HMR.
- **Build:** `npm run build` — runs TypeScript build then Vite build.
- **Lint:** `npm run lint` — runs ESLint with project config.
- **Preview:** `npm run preview` — serves production build locally.

## Linting & TypeScript
- ESLint is configured for TypeScript, React Hooks, and Vite refresh. See `eslint.config.js` for details.
- TypeScript configs are split for app and node usage (`tsconfig.app.json`, `tsconfig.node.json`).

## Patterns & Conventions
- **Component Files:** Use `.tsx` for React components, `.ts` for logic-only modules.
- **CSS:** Styles are colocated (e.g., `App.css`).
- **Imports:** Use relative imports within `src/`.
- **No custom routing or state management detected.**
- **No backend integration or API calls present in the template.**

## Extending & Integrations
- To add React-specific lint rules, see README for `eslint-plugin-react-x` and `eslint-plugin-react-dom` setup.
- Vite plugins can be added via `vite.config.ts`.

## Example: Adding a Component
Create a new file in `src/`, e.g. `src/MyComponent.tsx`:
```tsx
import React from 'react';
export function MyComponent() {
  return <div>Hello!</div>;
}
```
Import and use in `App.tsx`:
```tsx
import { MyComponent } from './MyComponent';
// ...existing code...
<MyComponent />
```

## References
- [README.md](../README.md) — Vite, ESLint, and TypeScript setup details
- [vite.config.ts](../vite.config.ts) — Vite plugins and config
- [eslint.config.js](../eslint.config.js) — Linting rules

---
**If any conventions or workflows are unclear, ask the user for clarification before making changes.**
