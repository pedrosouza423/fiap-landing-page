"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./Marquee.module.scss";

type MarqueeVariant = "default" | "scroll";
type BorderMode = "all" | "bottom" | "none";

interface MarqueeProps {
  variant?: MarqueeVariant;
  borderMode?: BorderMode;
}

export function Marquee({
  variant = "default",
  borderMode = "bottom",
}: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollContent = useMemo(
    () => (
      <>
        <div className={styles.scrollBlock} aria-hidden="true">
          <p className={styles.textScroll}>
            SKILLS <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
            <span className={styles.bullet}>•</span> SKILLS{" "}
            <span className={styles.bullet}>•</span>
          </p>

          <p className={styles.textScroll}>
            MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>
          </p>
        </div>

        <div className={styles.scrollBlock} aria-hidden="true">
          <p className={styles.textScroll}>
            SKILLS <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
            <span className={styles.bullet}>•</span> SKILLS{" "}
            <span className={styles.bullet}>•</span>
          </p>

          <p className={styles.textScroll}>
            MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>
          </p>
        </div>
      </>
    ),
    []
  );

  useEffect(() => {
    if (variant !== "scroll") return;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let rafId = 0;

    const update = () => {
      const rect = viewport.getBoundingClientRect();
      const windowH = window.innerHeight || 1;

      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));

      const maxShift = track.scrollWidth * 0.5;
      const x = -maxShift * clamped;

      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, [variant]);

  return (
    <div className={styles.marquee} data-variant={variant} data-border={borderMode}>
      {variant === "default" ? (
        <>
          <div className={styles.defaultViewport}>
            <div className={styles.defaultTrackTop}>
              <p className={styles.textDefault}>
                CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.
              </p>
              <p className={styles.textDefault}>
                CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO.
              </p>
            </div>
          </div>

          <div className={styles.spacer19} />
          <div className={styles.line} />
          <div className={styles.spacer19} />

          <div className={styles.defaultViewport}>
            <div className={styles.defaultTrackBottom}>
              <p className={styles.textDefault}>
                TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.
              </p>
              <p className={styles.textDefault}>
                TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.
              </p>
            </div>
          </div>

          <div className={styles.spacer23} />
          <div className={styles.line} />
        </>
      ) : (
        <div className={styles.scrollViewport} ref={viewportRef}>
          <div className={styles.scrollTrack} ref={trackRef}>
            {scrollContent}
          </div>
        </div>
      )}
    </div>
  );
}
