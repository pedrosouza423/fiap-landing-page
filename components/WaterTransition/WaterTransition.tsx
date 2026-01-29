"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./WaterTransition.module.scss";

const TOTAL_FRAMES = 192;

export function WaterTransition() {
  const [frame] = useState(0); // por enquanto fixo

  const src = `/assets/water-transition/water_${String(frame).padStart(
    3,
    "0"
  )}.png`;

  return (
    <section className={styles.water}>
      <div className={styles.container}>
        <Image
          src="/assets/water-transition/water_150.jpg"
          alt="Animação de fluxo de água"
          width={1920}
          height={1080}
          className={styles.image}
          priority
          draggable={false}
        />
      </div>
    </section>
  );
}
