import { ProductShell } from "./ProductShell";
import styles from "./product-ui.module.css";

const LEVELS = [0.12, 0.22, 0.35, 0.5, 0.68, 0.85, 1];

function cellOpacity(index: number) {
  const level = LEVELS[(index * 7 + 3) % LEVELS.length];
  return level;
}

export function FocusHeatmapMock() {
  return (
    <ProductShell url="agentrnk.xyz/you" className={styles.compact}>
      <div className={styles.shellInset}>
        <p className={styles.heatmapLabel}>Focus · last 12 weeks</p>
        <div className={styles.heatmap} aria-hidden>
          {Array.from({ length: 14 * 7 }, (_, i) => (
            <span
              key={i}
              className={styles.heatCell}
              style={{ background: `rgba(69, 212, 131, ${cellOpacity(i)})` }}
            />
          ))}
        </div>
      </div>
    </ProductShell>
  );
}
