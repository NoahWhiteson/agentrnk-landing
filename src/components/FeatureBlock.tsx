import type { ReactNode } from "react";
import { Btn } from "./Btn";
import styles from "./feature-block.module.css";

export function FeatureBlock({
  title,
  body,
  href,
  linkLabel,
  media,
  reverse,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  media: ReactNode;
  reverse?: boolean;
}) {
  return (
    <article className={[styles.block, reverse ? styles.reverse : ""].filter(Boolean).join(" ")}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <Btn variant="ghost" href={href} className={styles.link}>
          {linkLabel}
          <span aria-hidden> →</span>
        </Btn>
      </div>
      <div className={styles.media}>{media}</div>
    </article>
  );
}
