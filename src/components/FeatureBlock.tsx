import { Btn } from "./Btn";
import { ProductCut } from "./ProductCut";
import styles from "./feature-block.module.css";

export function FeatureBlock({
  title,
  body,
  href,
  linkLabel,
  mediaSrc,
  mediaPoster,
  mediaAlt,
  reverse,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  mediaSrc: string;
  mediaPoster?: string;
  mediaAlt: string;
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
      <ProductCut src={mediaSrc} poster={mediaPoster} alt={mediaAlt} />
    </article>
  );
}
