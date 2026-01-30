"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FaqItem.module.scss";
import type { FaqItemData } from "../types";

type FaqItemProps = {
  item: FaqItemData;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
};

export const FaqItem = ({ item, isActive, onEnter, onLeave, onToggle }: FaqItemProps) => {
  const [canHover, setCanHover] = useState(true);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMobileToggle = () => {
    onToggle();
    requestAnimationFrame(() => rootRef.current?.blur());
  };

  return (
    <article
      ref={(n) => {
        rootRef.current = n;
      }}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      onMouseEnter={canHover ? onEnter : undefined}
      onMouseLeave={canHover ? onLeave : undefined}
      onFocus={canHover ? onEnter : undefined}
      onBlur={canHover ? onLeave : undefined}
      onClick={!canHover ? handleMobileToggle : undefined}
      data-testid={`faq-item-${item.id}`}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
    >
      <span className={styles.line} aria-hidden="true" />
      <h3 className={styles.question}>{item.question}</h3>
      <p className={styles.answer}>{item.answer}</p>
    </article>
  );
};
