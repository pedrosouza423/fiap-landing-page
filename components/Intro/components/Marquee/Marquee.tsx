"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./Marquee.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const bottomTrackRef = useRef<HTMLDivElement | null>(null);

  const scrollContent = useMemo(
    () => (
      <>
        {/* TOP line */}
        <div className={styles.scrollLine} ref={topTrackRef}>
          <div className={styles.scrollBlock} aria-hidden="true">
            <p className={styles.textScroll}>
              SKILLS <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
              <span className={styles.bullet}>•</span> SKILLS{" "}
              <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
              <span className={styles.bullet}>•</span>
            </p>
          </div>

          <div className={styles.scrollBlock} aria-hidden="true">
            <p className={styles.textScroll}>
              SKILLS <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
              <span className={styles.bullet}>•</span> SKILLS{" "}
              <span className={styles.bullet}>•</span> CONHECIMENTO{" "}
              <span className={styles.bullet}>•</span>
            </p>
          </div>
        </div>

        {/* BOTTOM line */}
        <div className={styles.scrollLine} ref={bottomTrackRef}>
          <div className={styles.scrollBlock} aria-hidden="true">
            <p className={styles.textScroll}>
              MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>{" "}
              MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>
            </p>
          </div>

          <div className={styles.scrollBlock} aria-hidden="true">
            <p className={styles.textScroll}>
              MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>{" "}
              MUITO ALÉM DOS TUTORIAIS <span className={styles.bullet}>•</span>
            </p>
          </div>
        </div>
      </>
    ),
    []
  );

  useEffect(() => {
    if (variant !== "scroll") return;

    gsap.registerPlugin(ScrollTrigger);

    const viewport = viewportRef.current;
    const top = topTrackRef.current;
    const bottom = bottomTrackRef.current;

    if (!viewport || !top || !bottom) return;

    // acessibilidade
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ===== Ajustes finos =====
    // Mesma velocidade nas duas linhas + um pouco mais lento
    const DISTANCE = 32; // menor = desloca menos ao longo do scroll (mais “lento” visualmente)
    const SCRUB = 2.4; // maior = mais suave e mais lento para responder
    const BOTTOM_OFFSET = -25; // começa a 2ª linha um pouco mais à esquerda

    // começa a 2ª linha um pouco mais à esquerda
    gsap.set(bottom, { xPercent: BOTTOM_OFFSET });

    // garante cleanup certo no Next/React
    const ctx = gsap.context(() => {
      // Linha de cima: vai para a esquerda quando scroll desce, e volta quando scroll sobe
      gsap.fromTo(
        top,
        { xPercent: 0 },
        {
          xPercent: -DISTANCE,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top bottom",
            end: "bottom top",
            scrub: SCRUB,
          },
        }
      );

      // Linha de baixo: oposta (direita)
      gsap.fromTo(
        bottom,
        { xPercent: BOTTOM_OFFSET },
        {
          xPercent: BOTTOM_OFFSET + DISTANCE,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top bottom",
            end: "bottom top",
            scrub: SCRUB,
          },
        }
      );
    }, viewport);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      className={styles.marquee}
      data-variant={variant}
      data-border={borderMode}
    >
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
          <div className={styles.scrollStack}>{scrollContent}</div>
        </div>
      )}
    </div>
  );
}
