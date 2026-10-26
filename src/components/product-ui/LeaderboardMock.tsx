import { ProductShell } from "./ProductShell";
import styles from "./product-ui.module.css";

const ROWS = [
  { rank: 1, name: "alex", tokens: "4.2M", league: "Diamond" },
  { rank: 2, name: "sam", tokens: "3.8M", league: "Platinum" },
  { rank: 3, name: "cursor", tokens: "3.1M", league: "Gold" },
  { rank: 4, name: "devon", tokens: "2.9M", league: "Gold" },
] as const;

export function LeaderboardMock() {
  return (
    <ProductShell url="agentrnk.xyz/leaderboard" className={styles.compact}>
      <div className={[styles.shellInset].join(" ")}>
        <div className={styles.boardHead}>
          <h3 className={styles.boardTitle}>Leaderboard</h3>
          <span className={styles.boardSub}>Tokens · this week</span>
        </div>
        <div className={styles.boardRows}>
          {ROWS.map((row) => (
            <div key={row.rank} className={styles.boardRow}>
              <span className={styles.rank}>{row.rank}</span>
              <div className={styles.rowUser}>
                <span className={styles.rowAvatar} aria-hidden />
                <span className={styles.rowName}>@{row.name}</span>
              </div>
              <span className={styles.rowTokens}>{row.tokens}</span>
              <span className={styles.leagueTag}>{row.league}</span>
            </div>
          ))}
        </div>
      </div>
    </ProductShell>
  );
}
