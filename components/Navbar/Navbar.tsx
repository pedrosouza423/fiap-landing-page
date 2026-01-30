"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [scrolled, setScrolled] = useState(false);

  /* detecta scroll */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* anima barra */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bar = progressRef.current;
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",

        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}`}
    >
      <Image
        src="/assets/logo-fiap.svg"
        alt="FIAP"
        width={144}
        height={39} 
        priority
        className={styles.logo}
      />

      <div className={styles.progressWrapper} aria-hidden="true">
        <div ref={progressRef} className={styles.progressBar} />
      </div>
    </header>
  );
}
