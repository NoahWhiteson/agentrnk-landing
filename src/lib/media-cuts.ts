import fallbackPoster from "../assets/dashboard-hero.png";

const cuts = import.meta.glob("../assets/cuts/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function asset(name: string) {
  const key = Object.keys(cuts).find((k) => k.endsWith(`/${name}`));
  return key ? cuts[key] : undefined;
}

export function cutMedia(name: "profile" | "leaderboard") {
  const webm = asset(`${name}.webm`);
  const gif = asset(`${name}.gif`);
  const poster = asset(`${name}-poster.png`);
  return {
    src: webm ?? gif ?? fallbackPoster,
    poster: poster ?? fallbackPoster,
    preferVideo: Boolean(webm),
  };
}
