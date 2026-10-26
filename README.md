# Agentrnk landing

Separate marketing repo. **Imports the real app** (`@/` from `../agentrank` locally or `app-source/` on CI).

```bash
npm install && npm run dev    # :5174
npm run build                 # dist/
```

### App screen recordings

Hero and feature blocks use real app captures (WebM @ 2× retina):

```bash
npm run capture:media
# APP_URL=http://127.0.0.1:5173 npm run capture:media  # local app
```

Writes `src/assets/cuts/{profile,leaderboard}.webm` and `-poster.png`.

For authenticated cuts (leaderboard + your own profile):

```bash
APP_URL=https://agentrnk.xyz INVITE_URL='https://agentrnk.xyz/auth/invite?t=…' npm run capture:media
```

Uses a **one-time** staff invite link; the script signs in, reads your `@username`, and records profile + leaderboard.
