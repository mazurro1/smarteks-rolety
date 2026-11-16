import { Fragment } from "react";
import Link from "next/link";
import styles from "./RichText.module.css";

interface RichTextProps {
  /** Tekst z linkami w zapisie markdown: `[etykieta](adres)`. */
  text: string;
  linkClassName?: string;
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Tekst z danych (FAQ, kroki procesu, opisy) z linkami w srodku zdania.
 * Adres zaczynajacy sie od "/" to link wewnetrzny, "tel:" i "mailto:" - zwykly
 * odnosnik, pozostale otwieraja sie w nowej karcie.
 */
export default function RichText({ text, linkClassName }: RichTextProps) {
  const className = linkClassName ?? styles.link;
  const parts = text.split(LINK_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        const position = index % 3;
        if (position === 0) return <Fragment key={index}>{part}</Fragment>;
        if (position === 2) return null;

        const href = parts[index + 1];
        if (href.startsWith("/")) {
          return (
            <Link key={index} href={href} className={className}>
              {part}
            </Link>
          );
        }
        if (href.startsWith("tel:") || href.startsWith("mailto:")) {
          return (
            <a key={index} href={href} className={className}>
              {part}
            </a>
          );
        }
        return (
          <a
            key={index}
            href={href}
            className={className}
            target="_blank"
            rel="noopener"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
