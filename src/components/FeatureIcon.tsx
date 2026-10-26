import styles from "./feature-icon.module.css";

const paths: Record<string, string> = {
  chart:
    "M4 19V5M4 19h16M8 17V9m4 8V7m4 10v-4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0",
  trophy: "M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Zm-2 0H3v1a4 4 0 0 0 4 4M19 4h2v1a4 4 0 0 1-4 4",
  badge:
    "M12 2l2.4 4.8L20 7.8l-3.8 3.7.9 5.5L12 14.8 6.9 17l.9-5.5L4 7.8l5.6-1L12 2Z",
  terminal: "M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M8 11l2 2 4-4",
};

export function FeatureIcon({ name }: { name: keyof typeof paths }) {
  return (
    <span className={styles.icon} aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
