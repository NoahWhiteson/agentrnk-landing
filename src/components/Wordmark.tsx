import styles from "./wordmark.module.css";

export function Wordmark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo-wordmark.png"
      alt="Agentrnk"
      className={[styles.logo, className].filter(Boolean).join(" ")}
      decoding="async"
    />
  );
}
