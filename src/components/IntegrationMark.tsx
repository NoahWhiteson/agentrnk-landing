import { codingAgentLogo, getCodingAgentById, type CodingAgent } from "@/lib/coding-agents";
import styles from "./integration-mark.module.css";

export function IntegrationMark({
  agent,
  compact,
  theme = "light",
}: {
  agent: CodingAgent | string;
  compact?: boolean;
  theme?: "light" | "dark";
}) {
  const info = typeof agent === "string" ? getCodingAgentById(agent) : agent;
  return (
    <div
      className={[
        compact ? styles.compact : styles.row,
        theme === "dark" ? styles.dark : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.mark} aria-hidden>
        <img src={codingAgentLogo(info)} alt="" width={32} height={32} decoding="async" />
      </span>
      <span className={styles.label}>
        <span className={styles.name}>{info.name}</span>
        {!compact ? <span className={styles.domain}>{info.domain}</span> : null}
      </span>
    </div>
  );
}
