import { FormEvent, useState } from "react";
import styles from "./hero-signup.module.css";

const APP = "https://www.agentrnk.xyz";

export function HeroSignup({ id }: { id?: string }) {
  const [email, setEmail] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `${APP}/auth${q}`;
  }

  return (
    <form className={styles.form} onSubmit={submit} id={id}>
      <label className={styles.srOnly} htmlFor={id ? `${id}-email` : "hero-email"}>
        Email
      </label>
      <input
        id={id ? `${id}-email` : "hero-email"}
        className={styles.input}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="What's your work email?"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className={styles.submit}>
        Get started for free
      </button>
    </form>
  );
}
