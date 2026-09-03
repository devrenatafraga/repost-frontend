import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Repost</h1>
      <p className={styles.lead}>
        Blog público — scaffold inicial (M1). Tema, posts e widgets chegam nas
        próximas issues.
      </p>
    </main>
  );
}
