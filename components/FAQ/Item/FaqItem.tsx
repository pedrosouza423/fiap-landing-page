import styles from "./FaqItem.module.scss";
import type { FaqItemData } from "../types";

type FaqItemProps = {
  item: FaqItemData;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

export const FaqItem = ({ item, isActive, onEnter, onLeave }: FaqItemProps) => {
  return (
    <article
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-testid={`faq-item-${item.id}`}
    >
      <span className={styles.line} aria-hidden="true" />

      <h3 className={styles.question}>{item.question}</h3>

      {isActive && <p className={styles.answer}>{item.answer}</p>}
    </article>
  );
};
