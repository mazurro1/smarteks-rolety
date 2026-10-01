import Image from "next/image";
import Link from "next/link";
import type { MediaImage } from "@/types";
import styles from "./PhotoBand.module.css";

interface PhotoBandProps {
  image: MediaImage;
  eyebrow: string;
  title: string;
  text: string;
  cta?: { href: string; label: string };
  id: string;
}

/**
 * Pas ze zdjeciem na pelna szerokosc miedzy sekcjami. Zdjecie zostaje jasne -
 * przyciemniony jest tylko panel z tekstem.
 */
export function PhotoBand({ image, eyebrow, title, text, cta, id }: PhotoBandProps) {
  return (
    <section className={styles.band} aria-labelledby={id}>
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={90}
          className={styles.image}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          <p className={styles.text}>{text}</p>
          {cta && (
            <Link href={cta.href} className={styles.link}>
              {cta.label} &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
