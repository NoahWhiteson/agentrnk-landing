import type { ReactNode } from "react";
import styles from "./product-ui.module.css";

export function ProductShell({
  children,
  className,
  url = "agentrnk.xyz/you",
}: {
  children: ReactNode;
  className?: string;
  url?: string;
}) {
  return (
    <div className={[styles.shell, className].filter(Boolean).join(" ")}>
      <div className={styles.urlBar}>
        <span aria-hidden>◆</span>
        <strong>{url}</strong>
      </div>
      {children}
    </div>
  );
}
