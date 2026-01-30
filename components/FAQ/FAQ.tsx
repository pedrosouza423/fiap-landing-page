"use client";

import { useState } from "react";
import styles from "./FAQ.module.scss";
import { faqMock } from "./FAQ.mock";
import { FaqItem } from "./Item/FaqItem";

export const FAQ = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{faqMock.header.title}</h2>
          <p className={styles.subtitle}>{faqMock.header.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {faqMock.items.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onEnter={() => setActiveId(item.id)}
              onLeave={() =>
                setActiveId((prev) => (prev === item.id ? null : prev))
              }
              onToggle={() =>
                setActiveId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
