# Agentrnk landing

Separate marketing repo. **Imports the real app** (`@/` from `../agentrank` locally or `app-source/` on CI).

```bash
npm install && npm run dev    # :5174
npm run build                 # dist/
```

The landing page imports **real app components** from `@/marketing/landing-ui` (profile, `LineChart`, `ActivityHeatmap`, `LeagueBadge`, leaderboard rows) with fixture data. `main.tsx` loads `@/index.css` so styles match agentrnk.xyz.
