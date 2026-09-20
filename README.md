# Smarteks Rolety

Strona firmowa: rolety zewnętrzne (antywłamaniowe RC2 i RC3, adaptacyjne, podtynkowe) oraz bramy rolowane. Warszawa i okolice.

Next.js 16 (App Router) · TypeScript · CSS Modules · next-intl · ciemna kolorystyka.

## Uruchomienie

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produkcyjny
npm start       # serwer produkcyjny
npm run lint
```

### Zmienne środowiskowe (`.env.local`)

| Zmienna | Do czego służy |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Bazowy adres w metadanych, sitemapie, RSS i danych strukturalnych |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Klucz [web3forms](https://web3forms.com) — bez niego formularz kontaktowy zwróci błąd |

## Struktura

```
src/
├── app/                    # trasy (App Router)
│   ├── oferta/[slug]/      # 5 podstron ofertowych z danych
│   ├── realizacje/[slug]/  # galeria + szczegóły projektu
│   ├── blog/[slug]/        # wpisy z plików markdown
│   ├── kontakt/            # formularz + dane kontaktowe
│   ├── sitemap.ts, robots.ts, manifest.ts, feed.xml/, opengraph-image.tsx
├── components/
│   ├── layout/             # Header (menu oferty), Footer, ScrollToTop
│   └── sections/           # sekcje składające strony
├── constants/              # routes, contact, colors, namespaces
├── data/                   # treść domenowa (patrz niżej)
├── styles/globals.css      # zmienne CSS i reset
├── types/                  # typy współdzielone
└── ui/                     # Button, Badge, Accordion, MediaFrame, Reveal…
messages/pl.json            # teksty interfejsu (next-intl)
```

### Gdzie edytować treść

| Co | Gdzie |
| --- | --- |
| Oferta (5 kategorii: opisy, cechy, parametry, warianty, FAQ, SEO) | `src/data/offer.ts` |
| Realizacje (opisy, zakres prac, parametry, galerie) | `src/data/projects.ts` |
| Strona główna (statystyki, korzyści, proces, FAQ, o firmie) | `src/data/site.ts` |
| Wpisy blogowe | `src/data/blog/*.md` (frontmatter + markdown) |
| Teksty interfejsu (nawigacja, przyciski, formularz, stopka) | `messages/pl.json` |
| Dane kontaktowe, obsługiwane miejscowości | `src/constants/contact.ts` |
| Kolory, odstępy, cienie | `src/styles/globals.css` + `src/constants/colors.ts` |

Zasada: **dane domenowe w `src/data`, teksty interfejsu w `messages/pl.json`**.

### Dodanie wpisu na bloga

Nowy plik `src/data/blog/moj-wpis.md`:

```markdown
---
title: "Tytuł wpisu"
metaDescription: "Opis do wyników wyszukiwania (do ~160 znaków)"
publishedAt: "2026-09-20"
excerpt: "Zajawka widoczna na liście wpisów."
category: "Poradnik"
keywords: ["slowo kluczowe", "kolejne"]
faq:
  - q: "Pytanie?"
    a: "Odpowiedź."
---

Treść w markdown (obsługiwane tabele, listy, cytaty).
```

Slug = nazwa pliku. Wpis pojawia się automatycznie na liście, w sitemapie i w RSS. Opcjonalne pola: `updatedAt`, `image`, `imageAlt`, `readingTime` (domyślnie liczony z treści).

### Zdjęcia

Wszystkie miejsca na zdjęcia renderują na razie stylowany placeholder. Aby podpiąć prawdziwe zdjęcie:

1. wrzuć plik do `public/images/…`,
2. dopisz ścieżkę w danych, np. w `src/data/projects.ts`:

```ts
gallery: [
  { src: "/images/realizacje/wilanow-1.jpg", alt: "…", caption: "…" },
]
```

Komponent `MediaFrame` sam przełączy się na `next/image` — nie trzeba zmieniać kodu widoków.

## Kolorystyka

| Token | Wartość | Zastosowanie |
| --- | --- | --- |
| `--color-bg-base` | `#0e0e10` | najciemniejsze tło |
| `--color-bg-raised` / `--color-bg-surface` | `#121216` / `#17171c` | sekcje i karty |
| `--color-brand-primary` | `#8e1f3f` | przyciski, akcenty pełne |
| `--color-brand-accent` | `#e0527a` | drobny tekst akcentowy (kontrast 5:1 na tle bazowym) |
