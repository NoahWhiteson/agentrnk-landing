import fallback from "../assets/dashboard-hero.png";

const files = import.meta.glob("../assets/shots/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function shot(name: string) {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}.png`));
  return key ? files[key] : fallback;
}

export type ProductShot = {
  src: string;
  alt: string;
};

export const productShots = {
  hero: { src: shot("hero"), alt: "Agentrnk profile overview" },
  profileHeader: { src: shot("profile-header"), alt: "Profile header with rank and stats" },
  profileUsage: { src: shot("profile-usage"), alt: "Usage charts and agent breakdown" },
  profileFocus: { src: shot("profile-focus"), alt: "Focus heatmap and coding activity" },
  profileAgents: { src: shot("profile-agents"), alt: "Connected coding agents" },
  leaderboard: { src: shot("leaderboard"), alt: "Agentrnk leaderboard" },
  leaderboardTable: { src: shot("leaderboard-table"), alt: "Leaderboard ranks and leagues" },
} as const satisfies Record<string, ProductShot>;

export function shotSrc(name: keyof typeof productShots) {
  return productShots[name].src;
}
