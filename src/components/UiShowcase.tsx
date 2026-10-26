import { ProductCut } from "./ProductCut";
import { productShots } from "../lib/media-shots";
import styles from "./ui-showcase.module.css";

export function UiShowcase() {
  const { hero, profileUsage, profileFocus } = productShots;

  return (
    <div className={styles.stage}>
      <div className={styles.fog} aria-hidden />
      <div className={styles.stack}>
        <ProductCut
          className={styles.heroFrame}
          src={hero.src}
          alt={hero.alt}
          priority
        />
        <ProductCut
          className={styles.floatUsage}
          src={profileUsage.src}
          alt={profileUsage.alt}
        />
        <ProductCut
          className={styles.floatFocus}
          src={profileFocus.src}
          alt={profileFocus.alt}
        />
      </div>
    </div>
  );
}
