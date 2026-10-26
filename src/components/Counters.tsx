import { useEffect, useRef, useState } from "react";
import styles from "./counters.module.css";

const STATS = [
  { label: "Tokens synced", value: 4821933102, suffix: "" },
  { label: "Sessions logged", value: 1589171, suffix: "" },
  { label: "Agents connected", value: 8, suffix: "" },
  { label: "Profiles ranked", value: 20872, suffix: "" },
  { label: "Models tracked", value: 214, suffix: "" },
  { label: "Leaderboard updates", value: 10215, suffix: "" },
] as const;

function useCountUp(target: number, run: boolean, ms = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return val;
}

function Row({ label, value, run }: { label: string; value: number; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <li className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{n.toLocaleString("en-US")}</span>
    </li>
  );
}

export function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.band} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Live on Agentrnk right now</p>
        <ul className={styles.list}>
          {STATS.map((s) => (
            <Row key={s.label} label={s.label} value={s.value} run={run} />
          ))}
        </ul>
      </div>
    </div>
  );
}
