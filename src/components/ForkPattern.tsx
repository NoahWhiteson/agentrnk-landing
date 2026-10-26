import styles from "./fork-pattern.module.css";

/** Profile hero line art — same SVG as `public/brand/social-banner.html`. */
export function ForkPattern() {
  return (
    <svg
      className={styles.pattern}
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <pattern id="landing-forks" width="480" height="120" patternUnits="userSpaceOnUse">
          <path
            className={styles.line}
            d="M 0.5 0 V 120 M 120.5 0 V 120 M 240.5 0 V 120 M 360.5 0 V 120 M 0 24.5 H 98.5 A 22 22 0 0 1 120.5 46.5 M 240 24.5 H 142.5 A 22 22 0 0 0 120.5 46.5 M 120.5 46.5 V 120 M 0 84.5 H 98.5 A 22 22 0 0 1 120.5 106.5 M 240 84.5 H 142.5 A 22 22 0 0 0 120.5 106.5 M 240 60.5 H 338.5 A 22 22 0 0 1 360.5 82.5 M 480 60.5 H 381.5 A 22 22 0 0 0 360.5 82.5 M 360.5 82.5 V 120 M 420.5 0 V 24.5 M 240 24.5 H 480"
          />
          <path className={styles.cross} d="M 414.5 24.5 H 426.5 M 420.5 18.5 V 30.5" />
        </pattern>
        <radialGradient id="landing-forks-glow" cx="22%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#landing-forks-glow)" />
      <rect width="100%" height="100%" fill="url(#landing-forks)" />
    </svg>
  );
}
