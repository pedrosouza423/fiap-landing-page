import styles from "./Tabs.module.scss";
import type { CourseCategory } from "../types";

type CategoryItem = {
  key: CourseCategory;
  label: string;
};

type CoursesTabsProps = {
  categories: CategoryItem[];
  active: CourseCategory;
  onChange: (cat: CourseCategory) => void;
};

export const CoursesTabs = ({ categories, active, onChange }: CoursesTabsProps) => {
  return (
    <nav className={styles.tabs} aria-label="Categorias de cursos">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          className={`${styles.tab} ${active === cat.key ? styles.active : ""}`}
          onClick={() => onChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
};
