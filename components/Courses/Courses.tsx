"use client";

import { useMemo, useState } from "react";
import styles from "./Courses.module.scss";
import { coursesMock } from "./courses.mock";
import type { CourseCategory } from "./types";
import { CoursesHeader } from "./Header/Header";
import { CoursesTabs } from "./Tabs/Tabs";
import { CoursesList } from "./CoursesList/CoursesList";

export const Courses = () => {
  const [active, setActive] = useState<CourseCategory>("Tecnologia");

  const items = useMemo(() => coursesMock.itemsByCategory[active], [active]);

  return (
    <section className={styles.courses}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <CoursesHeader title={coursesMock.header.title} subtitle={coursesMock.header.subtitle} />
          <CoursesTabs
            categories={coursesMock.categories}
            active={active}
            onChange={setActive}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.categoryTitle}>{active}</h3>

          <CoursesList items={items} />
        </div>
      </div>
    </section>
  );
};
