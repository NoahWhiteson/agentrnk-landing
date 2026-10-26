import { USAGE_SYNC_AGENTS, codingAgentLogo } from "@/lib/coding-agents";
import styles from "./agent-logo-strip.module.css";

export function AgentLogoStrip() {
  return (
    <ul className={styles.strip} aria-label="Supported coding agents">
      {USAGE_SYNC_AGENTS.map((agent) => (
        <li key={agent.id}>
          <img
            src={codingAgentLogo(agent)}
            alt={agent.name}
            width={40}
            height={40}
            className={styles.logo}
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}
