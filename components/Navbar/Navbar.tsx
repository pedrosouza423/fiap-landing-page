"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.wrapper} ${scrolled ? styles.scrolled : ""}`}>
      <Image
        src="/assets/logo-fiap.svg"
        alt="FIAP"
        width={144}
        height={39}
        priority
      />
    </header>
  );
}
