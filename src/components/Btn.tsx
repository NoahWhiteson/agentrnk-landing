import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./btn.module.css";

type Variant = "primary" | "secondary" | "ghost" | "download" | "hero";

export function Btn({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: "md" | "sm";
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={[styles.btn, styles[variant], size === "sm" ? styles.sm : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}
