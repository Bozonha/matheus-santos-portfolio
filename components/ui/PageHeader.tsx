import styles from "./PageHeader.module.css";

export function PageHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </header>
  );
}
