"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";
import styles from "./Accordion.module.css";

interface AccordionProps {
  items: FaqItem[];
  /** Prefiks identyfikatorow — pozwala uzyc kilku akordeonow na jednej stronie. */
  idPrefix?: string;
  columns?: 1 | 2;
}

export default function Accordion({
  items,
  idPrefix = "faq",
  columns = 1,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className={[styles.list, columns === 2 ? styles.twoColumns : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-q-${index}`;
        const panelId = `${idPrefix}-a-${index}`;

        return (
          <div
            key={item.q}
            className={[styles.item, isOpen ? styles.open : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={styles.question}>{item.q}</span>
                <span className={styles.indicator} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
