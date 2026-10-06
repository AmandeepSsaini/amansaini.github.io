---
title: Why I Moved from Webpack to Vite (and What It Saved)
date: 2026-10-06T13:14:00
description: Our Webpack builds were slow, so we switched to Vite. CI got about 30% faster and the dev server starts instantly. Here's how to do it in React.
tags:
  - Vite
  - React
  - React
  - Improvement
  - Performance
  - Optimization
cover: ''
draft: false
---

Our build was slow. Dev server took almost a minute to start, and every save felt like a coffee break. Webpack bundles your whole app before it shows you anything — the bigger the app, the longer you wait.

Vite flips that. It serves your code over native ES modules in dev, so the server starts almost instantly and only builds the file you actually changed. For production it still bundles, using Rollup under the hood.

For us it cut CI build times by about 30%. But the daily win was bigger: no more waiting on the dev server.

## How to do it in a React project

Install Vite and the React plugin:

```bash
npm install -D vite @vitejs/plugin-react
```

Create `vite.config.js` in your project root:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
})
```

Move `index.html` out of `public/` and into the root. Vite treats it as the entry point. Then point it at your main file:

```html

```

Update your scripts in `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

One gotcha: Vite wants `.jsx` on files that contain JSX. Rename them if they're currently `.js`. Also swap `process.env.FOO` for `import.meta.env.VITE_FOO`.

Run `npm run dev` and you're done.
