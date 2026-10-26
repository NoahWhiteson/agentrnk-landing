import { USAGE_SYNC_AGENTS, codingAgentLogo } from "@/lib/coding-agents";
import { ProductShell } from "./ProductShell";
import styles from "./product-ui.module.css";

const AGENT_SHARES = [
  { id: "cursor", pct: 58 },
  { id: "claude-code", pct: 28 },
  { id: "opencode", pct: 14 },
] as const;

export function ProfileActivityMock() {
  return (
    <ProductShell url="agentrnk.xyz/you" className={styles.compact}>
      <div className={styles.shellInset}>
        <div className={styles.statRow} style={{ margin: "0 0 1rem" }}>
          {(
            [
              ["Today", "52k"],
              ["Week", "890k"],
              ["All time", "12.1M"],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className={styles.statCard}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statValue}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.chartBox}>
          <svg className={styles.chart} viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="landingChartFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45d483" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#45d483" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#landingChartFill2)"
              d="M0,80 L0,70 L80,65 L160,55 L240,60 L320,40 L400,35 L400,100 L0,100 Z"
            />
            <polyline
              fill="none"
              stroke="#45d483"
              strokeWidth="2"
              points="0,70 80,65 160,55 240,60 320,40 400,35"
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
