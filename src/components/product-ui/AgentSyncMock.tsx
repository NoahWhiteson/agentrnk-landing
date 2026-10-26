import { USAGE_SYNC_AGENTS } from "@/lib/coding-agents";
import { IntegrationMark } from "../IntegrationMark";
import { ProductShell } from "./ProductShell";
import styles from "./product-ui.module.css";

export function AgentSyncMock() {
  const agents = USAGE_SYNC_AGENTS.slice(0, 5);
  return (
    <ProductShell url="agentrnk.xyz/onboarding" className={styles.compact}>
      <div className={styles.shellInset}>
        <p className={styles.heatmapLabel}>Connected agents</p>
        <ul className={styles.agentBars} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {agents.map((agent) => (
            <li key={agent.id}>
              <IntegrationMark agent={agent} theme="dark" />
            </li>
          ))}
        </ul>
      </div>
    </ProductShell>
  );
}
