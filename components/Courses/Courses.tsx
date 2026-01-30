"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import styles from "./Courses.module.scss";
import { coursesMock } from "./courses.mock";
import type { CourseCategory } from "./types";

import { CoursesHeader } from "./Header/Header";
import { CoursesTabs } from "./Tabs/Tabs";
import { CoursesList } from "./CoursesList/CoursesList";

export const Courses = () => {
  const [active, setActive] = useState<CourseCategory>("Tecnologia");
  const items = useMemo(() => coursesMock.itemsByCategory[active], [active]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const nextRef = useRef<CourseCategory | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ✅ detecta mobile (414 do figma e abaixo)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 26rem)");
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const getNodes = () => {
    const root = rootRef.current;
    if (!root) return null;

    const title = root.querySelector('[data-role="category-title"]');
    const rows = root.querySelectorAll("li");

    return { root, title, rows };
  };

  const handleChangeDesktop = (next: CourseCategory) => {
    if (next === active) return;
    if (isAnimatingRef.current) return;

    if (prefersReduced) {
      setActive(next);
      return;
    }

    const nodes = getNodes();
    if (!nodes) {
      setActive(next);
      return;
    }

    const { root, title, rows } = nodes;

    isAnimatingRef.current = true;
    nextRef.current = next;

    gsap.killTweensOf([root, title, rows]);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    tl.to(root, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.6 }, 0);
    tl.to([title, rows], { opacity: 0, duration: 0.2, stagger: 0.02 }, 0);

    tl.add(() => {
      const value = nextRef.current;
      nextRef.current = null;
      if (value) setActive(value);
    });

    tl.add(() => {
      requestAnimationFrame(() => {
        const fresh = getNodes();
        if (!fresh) return;

        gsap.set(fresh.root, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set([fresh.title, fresh.rows], { opacity: 0 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          })
          .to(fresh.root, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.75,
          })
          .to(fresh.title, { opacity: 1, duration: 0.22 }, 0.1)
          .to(fresh.rows, { opacity: 1, duration: 0.22, stagger: 0.03 }, 0.18);
      });
    });
  };

  const handleToggleMobile = (cat: CourseCategory) => {
    setActive((prev) => (prev === cat ? prev : cat));
  };

  return (
    <section className={styles.courses}>
      <div className={styles.container}>
        {!isMobile && (
          <>
            <div className={styles.headerRow}>
              <CoursesHeader
                title={coursesMock.header.title}
                subtitle={coursesMock.header.subtitle}
              />

              <CoursesTabs
                categories={coursesMock.categories}
                active={active}
                onChange={handleChangeDesktop}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.contentAnim} ref={rootRef}>
                <h3 className={styles.categoryTitle} data-role="category-title">
                  {active}
                </h3>

                <CoursesList items={items} />
              </div>
            </div>
          </>
        )}

        {isMobile && (
          <>
            <div className={styles.headerRowMobile}>
              <CoursesHeader
                title={coursesMock.header.title}
                subtitle={coursesMock.header.subtitle}
              />
            </div>

            <div className={styles.mobileAccordion} aria-label="Categorias de cursos">
              {coursesMock.categories.map((cat) => {
                const isActive = active === cat.key;
                const catItems = coursesMock.itemsByCategory[cat.key];

                return (
                  <div key={cat.key} className={styles.mobileBlock}>
                    <button
                      type="button"
                      className={styles.mobileRow}
                      onClick={() => handleToggleMobile(cat.key)}
                      aria-expanded={isActive}
                    >
                      <span className={styles.mobileLabel}>
                        {cat.label.toUpperCase()}
                      </span>

                      <span
                        className={`${styles.mobileToggle} ${
                          isActive ? styles.mobileToggleActive : ""
                        }`}
                        aria-hidden="true"
                      >
                        <span className={styles.mobileSymbol}>
                          {isActive ? "−" : "+"}
                        </span>
                      </span>
                    </button>

                    <div
                      className={`${styles.mobilePanel} ${
                        isActive ? styles.mobilePanelOpen : ""
                      }`}
                    >
                      <CoursesList items={catItems} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
