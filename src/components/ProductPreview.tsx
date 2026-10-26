import { USAGE_SYNC_AGENTS } from "@/lib/coding-agents";
import { IntegrationMark } from "./IntegrationMark";
import styles from "./product-preview.module.css";

/** Static slice of the in-app profile — usage + agent breakdown. */
export function ProductPreview() {
  const previewAgents = USAGE_SYNC_AGENTS.slice(0, 4);
  return (
    <div className={styles.stage}>
    <div className={styles.frame} aria-label="Profile preview">
      <div className={styles.chrome}>
        <span className={styles.dot} data-tone="red" />
        <span className={styles.dot} data-tone="yellow" />
        <span className={styles.dot} data-tone="green" />
        <span className={styles.chromeTitle}>agentrnk.xyz/you</span>
      </div>
      <div className={styles.body}>
        <div className={styles.stats}>
          <div>
            <span className={styles.statLabel}>This week</span>
            <span className={styles.statValue}>1.2M</span>
            <span className={styles.statUnit}>tokens</span>
          </div>
          <div>
            <span className={styles.statLabel}>Rank</span>
            <span className={styles.statValue}>#48</span>
            <span className={styles.statUnit}>global</span>
          </div>
          <div>
            <span className={styles.statLabel}>Session</span>
            <span className={styles.live}>
              <span className={styles.liveDot} /> Live
            </span>
          </div>
        </div>
        <div className={styles.chartWrap}>
          <svg className={styles.chart} viewBox="0 0 320 88" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45d483" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#45d483" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#chartFill)"
              d="M0,72 L0,58 L40,52 L80,48 L120,55 L160,38 L200,42 L240,28 L280,32 L320,18 L320,88 L0,88 Z"
            />
            <polyline
              fill="none"
              stroke="#45d483"
              strokeWidth="2"
              points="0,58 40,52 80,48 120,55 160,38 200,42 240,28 280,32 320,18"
            />
          </svg>
        </div>
        <p className={styles.sectionLabel}>Agents · last 7 days</p>
        <ul className={styles.agentList}>
          {previewAgents.map((agent) => (
            <li key={agent.id}>
              <IntegrationMark agent={agent} compact theme="light" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}
