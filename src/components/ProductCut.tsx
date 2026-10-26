import styles from "./product-cut.module.css";

export function ProductCut({
  src,
  poster,
  alt,
  preferVideo = true,
}: {
  src: string;
  poster?: string;
  alt: string;
  preferVideo?: boolean;
}) {
  const isVideo = preferVideo;

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {isVideo ? (
          <video
            className={styles.media}
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img className={styles.media} src={src} alt={alt} decoding="async" />
        )}
      </div>
    </div>
  );
}
