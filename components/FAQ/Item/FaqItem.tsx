"use client";

import { useEffect, useState } from "react";
import styles from "./FaqItem.module.scss";
import type { FaqItemData } from "../types";

type FaqItemProps = {
  item: FaqItemData;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
};

export const FaqItem = ({
  item,
  isActive,
  onEnter,
  onLeave,
  onToggle,
}: FaqItemProps) => {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <article
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      
      onMouseEnter={canHover ? onEnter : undefined}
      onMouseLeave={canHover ? onLeave : undefined}
      
      onFocus={canHover ? onEnter : undefined}
      onBlur={canHover ? onLeave : undefined}
      
      onPointerDown={!canHover ? onToggle : undefined}
      data-testid={`faq-item-${item.id}`}
      
      tabIndex={canHover ? 0 : undefined}
      role={canHover ? "button" : undefined}
      aria-expanded={canHover ? isActive : undefined}
    >
      <span className={styles.line} aria-hidden="true" />
      <h3 className={styles.question}>{item.question}</h3>
      <p className={styles.answer}>{item.answer}</p>
    </article>
  );
};
