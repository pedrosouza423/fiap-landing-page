"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

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
  const indicatorRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activeKey = useMemo(() => String(active), [active]);

  useEffect(() => {
    if (reduceMotion) return;

    const el = indicatorRefs.current[activeKey];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [activeKey, reduceMotion]);

  return (
    <nav className={styles.tabs} aria-label="Categorias de cursos">
      {categories.map((cat) => {
        const isActive = active === cat.key;

        return (
          <button
            key={cat.key}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(cat.key)}
          >
            <span
              className={styles.indicator}
              ref={(node) => {
                indicatorRefs.current[String(cat.key)] = node;
              }}
            />
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
};
