import styles from "./CoursesList.module.scss";
import type { CourseItem } from "../types";

type CoursesListProps = {
  items: CourseItem[];
};

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li className={styles.row} key={item.title}>
          <span className={styles.courseTitle}>{item.title}</span>

          <span className={styles.tags}>
            {item.tags.map((t) => (
              <span className={styles.tag} key={t}>
                {t.toUpperCase()}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
};
