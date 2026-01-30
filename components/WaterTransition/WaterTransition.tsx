"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./WaterTransition.module.scss";

export function WaterTransition() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 26rem)");
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) return null;

  return (
    <section className={styles.water}>
      <div className={styles.container}>
        <Image
          src="/assets/water-transition/water_150.jpg"
          alt="Animação de fluxo de água"
          fill
          className={styles.image}
          priority
          draggable={false}
        />
      </div>
    </section>
  );
}
