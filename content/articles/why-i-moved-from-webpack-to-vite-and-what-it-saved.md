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

</body>
\`\`\`

Update your scripts in \`package.json\`:

\`\`\`json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
\`\`\`

One gotcha: Vite wants \`.jsx\` on files that contain JSX. Rename them if they're currently \`.js\`. Also swap \`process.env.FOO\` for \`import.meta.env.VITE_FOO\`.

Run \`npm run dev\` and you're done.
