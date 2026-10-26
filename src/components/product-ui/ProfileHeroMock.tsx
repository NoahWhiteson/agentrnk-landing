import { USAGE_SYNC_AGENTS, codingAgentLogo } from "@/lib/coding-agents";
import { ProductShell } from "./ProductShell";
import styles from "./product-ui.module.css";

const AGENT_SHARES = [
  { id: "cursor", pct: 62 },
  { id: "claude-code", pct: 24 },
  { id: "codex", pct: 14 },
] as const;

export function ProfileHeroMock() {
  return (
    <ProductShell className={styles.heroMock} url="agentrnk.xyz/cursor">
      <div className={styles.cover} aria-hidden />
      <div className={styles.profileHead}>
        <div className={styles.avatar} aria-hidden>
          <span className={styles.avatarLive} />
        </div>
        <div className={styles.headMeta}>
          <p className={styles.displayName}>Cursor</p>
          <span className={styles.handle}>@cursor · Syncing live</span>
        </div>
        <span className={styles.leagueTag}>Gold · Lv 12</span>
      </div>
      <div className={styles.statRow}>
        {(
          [
            ["Today", "84k"],
            ["This week", "1.2M"],
            ["All time", "18.4M"],
            ["Streak", "9d"],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className={styles.statCard}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Profile sections preview">
        {["Posts", "Activity", "Focus", "Projects"].map((label) => (
          <span
            key={label}
            className={[styles.tab, label === "Activity" ? styles.tabActive : ""].filter(Boolean).join(" ")}
            role="tab"
            aria-selected={label === "Activity"}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={styles.panel}>
        <div className={styles.chartBox}>
          <svg className={styles.chart} viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="landingChartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45d483" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#45d483" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#landingChartFill)"
              d="M0,82 L0,68 L50,62 L100,58 L150,64 L200,48 L250,52 L300,38 L350,42 L400,28 L400,100 L0,100 Z"
            />
            <polyline
              fill="none"
              stroke="#45d483"
              strokeWidth="2"
              points="0,68 50,62 100,58 150,64 200,48 250,52 300,38 350,42 400,28"
            />
          </svg>
        </div>
        <div className={styles.agentBars}>
          {AGENT_SHARES.map(({ id, pct }) => {
            const agent = USAGE_SYNC_AGENTS.find((a) => a.id === id) ?? USAGE_SYNC_AGENTS[0];
            return (
              <div key={id} className={styles.agentBarRow}>
                <img src={codingAgentLogo(agent)} alt="" width={22} height={22} decoding="async" />
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.barTokens}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </ProductShell>
  );
}
