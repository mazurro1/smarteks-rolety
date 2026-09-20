import Image from "next/image";
import styles from "./MediaFrame.module.css";

type Ratio = "21/9" | "16/9" | "4/3" | "3/2" | "1/1" | "3/4";

interface MediaFrameProps {
  /** Sciezka do pliku w /public. Brak = stylowany placeholder z etykieta. */
  src?: string;
  alt: string;
  ratio?: Ratio;
  /** Krotka etykieta widoczna w placeholderze (np. typ ujecia). */
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const RATIO_CLASS: Record<Ratio, string> = {
  "21/9": styles.ratio219,
  "16/9": styles.ratio169,
  "4/3": styles.ratio43,
  "3/2": styles.ratio32,
  "1/1": styles.ratio11,
  "3/4": styles.ratio34,
};

/**
 * Ramka na zdjecie. Dopoki w danych nie ma sciezki `src`, renderuje placeholder
 * w stylistyce strony — zamiana na prawdziwe zdjecie nie wymaga zmian w kodzie,
 * wystarczy dopisac `src` w pliku danych.
 */
export default function MediaFrame({
  src,
  alt,
  ratio = "4/3",
  label,
  priority = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1239px) 50vw, 33vw",
  className = "",
}: MediaFrameProps) {
  const wrapperClass = [styles.frame, RATIO_CLASS[ratio], className]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return (
      <div className={wrapperClass}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass} role="img" aria-label={alt}>
      <div className={styles.placeholder} aria-hidden="true">
        <div className={styles.slats} />
        <div className={styles.placeholderBody}>
          <svg
            viewBox="0 0 24 24"
            className={styles.placeholderIcon}
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v8.2l3.6-3.6a1 1 0 0 1 1.4 0l2.5 2.5 2.1-2.1a1 1 0 0 1 1.4 0L19 14.4V7H5Zm11.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            />
          </svg>
          {label && <span className={styles.placeholderLabel}>{label}</span>}
        </div>
      </div>
    </div>
  );
}
