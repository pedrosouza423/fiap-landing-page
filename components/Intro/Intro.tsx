import Image from "next/image";

import styles from "./Intro.module.scss";
import { Marquee } from "./components/Marquee/Marquee";

export function Intro() {
  return (
    <section className={styles.intro}>
      <Marquee variant="default" borderMode="bottom" />

      <div className={styles.imageWrapper}>
        <Image
          src="/assets/intro/intro.png"
          alt="Pessoa estudando com notebook"
          width={1495}
          height={804}
          priority
        />
      </div>

      <div className={styles.marqueeBottom}>
        <Marquee variant="scroll" borderMode="none" />
      </div>
    </section>
  );
}
