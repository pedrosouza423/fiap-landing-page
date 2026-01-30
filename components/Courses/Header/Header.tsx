import styles from "./Header.module.scss";

type CoursesHeaderProps = {
  title: string;
  subtitle: string;
};

export const CoursesHeader = ({ title, subtitle }: CoursesHeaderProps) => {
  return (
    <header className={styles.header}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
};
