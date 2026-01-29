import styles from "./Header.module.scss";

export function Header() {
  return (
    <section className={styles.wrapper} aria-label="Header">
      <span className={styles.bgText} aria-hidden="true">
        SOBRE
      </span>

      <h1 className={styles.title}>
        <span className={styles.titleLineCenter}>
          A melhor faculdade
        </span>

        <span className={styles.titleLineLeft}>
          de tecnologia
        </span>
      </h1>
    </section>
  );
}
