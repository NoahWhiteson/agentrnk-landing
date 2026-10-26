# Agentrnk landing

Separate marketing repo. **Imports the real app** (`@/` from `../agentrank` locally or `app-source/` on CI).

```bash
npm install && npm run dev    # :5174
npm run build                 # dist/
```

### Product screenshots

Hero, bento grid, and feature blocks use PNG shots from the live app (2× retina clips):

```bash
npm run capture:shots
# APP_URL=http://127.0.0.1:5173 PROFILE_HANDLE=you npm run capture:shots
```

Writes `src/assets/shots/*.png`. Leaderboard needs auth unless you set `INVITE_URL` (one-time staff link) or keep the fallback poster under `src/assets/cuts/`.

Legacy WebM capture: `npm run capture:media`.
