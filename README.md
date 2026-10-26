# Agentrnk landing

Separate marketing repo. **Imports the real app** (`@/` from `../agentrank` locally or `app-source/` on CI).

```bash
npm install && npm run dev    # :5174
npm run build                 # dist/
```

The landing page renders **composed product UI** (profile, leaderboard, heatmap mocks) in CSS—same dark surfaces as the app, no screenshots. Optional capture scripts (`capture:shots`, `capture:media`) are for legacy asset workflows only.
