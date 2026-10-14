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
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Klucz [web3forms](https://web3forms.com) - bez niego formularz kontaktowy zwróci błąd |

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

Slug = nazwa pliku. Wpis pojawia się automatycznie na liście, w sitemapie i w RSS. Opcjonalne pola: `updatedAt`, `image`, `imageAlt`, `imagePosition` (kadr, np. `"center 40%"`), `readingTime` (domyślnie liczony z treści).

### Zdjęcia

Zdjęcia produktów Somfy leżą w `public/images/somfy`, a ich ścieżki, opisy i kadry w `src/data/media.ts`. Wykorzystane są w miniaturach listy oferty na stronie głównej, w kartach i na podstronach oferty, w sekcji „O firmie”, w pasie zdjęciowym „Sterowanie” (`PhotoBand`), w tle sekcji CTA, we wpisach bloga (pole `image` we frontmatterze) oraz jako przykładowe zdjęcia w galeriach realizacji.

Tło nagłówków (strona główna i podstrony) to zdjęcie budynku z roletami zewnętrznymi z Pexels: `public/images/dom/budynek-z-roletami-zewnetrznymi.jpg`, fot. Francesco Ungaro, [licencja Pexels](https://www.pexels.com/license/) - użycie komercyjne bez opłat i bez obowiązku podpisu. Aby podmienić je na zdjęcie z własnej realizacji, wystarczy zmienić `HOUSE` w `src/data/media.ts`.

Każde zdjęcie ma `alt` opisujący scenę, a przy zdjęciach Somfy także nazwę pokazanego produktu (np. „…sterowane pilotem Somfy Situo 5”). Dotyczy to też zdjęć w tle - dlatego tła są renderowane przez `next/image`, a nie CSS `background-image`.

Galerie realizacji pokazują przykładowe zdjęcia Somfy. Aby podpiąć zdjęcie z własnego montażu:

1. wrzuć plik do `public/images/…`,
2. dopisz ścieżkę w danych, np. w `src/data/projects.ts`:

```ts
gallery: [
  { src: "/images/realizacje/wilanow-1.jpg", alt: "…", caption: "…" },
]
```

Komponent `MediaFrame` sam przełączy się na `next/image` - nie trzeba zmieniać kodu widoków.

### Porównanie przed/po w realizacjach

W `src/data/projects.ts` każda realizacja może mieć pole `beforeAfter` - na stronie realizacji pojawia się wtedy suwak porównania (najlepiej dwa zdjęcia z tego samego kadru):

```ts
beforeAfter: {
  before: { src: "/images/realizacje/wilanow-przed.jpg", alt: "…" },
  after: { src: "/images/realizacje/wilanow-po.jpg", alt: "…" },
},
```

Obecnie demo jest w realizacji „Dom jednorodzinny z roletami RC2” - zdjęcie „przed” to placeholder do podmiany.

## Efekty i animacje

| Efekt | Gdzie |
| --- | --- |
| Model 3D rolety w hero (Three.js, ładowany leniwie po załadowaniu strony) | `src/components/sections/Hero/` (`RollerWindow`, `PortalVan`, `HeroModel`) |
| Zdjęcia odsłaniane jak roleta | `src/ui/ShutterReveal` (wbudowane w `MediaFrame`, wyłączenie: `reveal={false}`) |
| Nagłówki wjeżdżające słowo po słowie | `src/ui/SplitText` (w `SectionHeader`, poza `h1`) |
| Liczniki statystyk | `src/ui/Odometer` |
| Pasek miejscowości (przeciąganie, reakcja na scroll) | `src/components/sections/CitiesMarquee` |
| Przejście między podstronami jak roleta | `src/components/layout/ShutterTransition` |
| Magnetyczne przyciski i pochylane karty | `src/components/layout/InteractiveEffects` + atrybuty `data-magnetic` / `data-tilt` |
| Kroki procesu podświetlane po kolei | `src/components/sections/Process/ProcessSteps.tsx` |
| Paralaksa zdjęć (pas „Sterowanie”, CTA) | CSS `animation-timeline: view()` w modułach `PhotoBand` i `CTA` |

Zasady (SEO na pierwszym miejscu):

- cały tekst jest w HTML z serwera - efekty tylko go animują,
- stany „przed animacją” (ukryte zdjęcia, nagłówki, `Reveal`) działają wyłącznie z klasą `html.js` ustawianą w `layout.tsx` - bez JS treść jest od razu widoczna,
- elementy dekoracyjne (taśma cyfr licznika, kopia listy miast) nie trafiają do HTML ani do czytników ekranu,
- linki pozostają zwykłymi `<a href>`, efekty respektują `prefers-reduced-motion`.

## Kolorystyka

| Token | Wartość | Zastosowanie |
| --- | --- | --- |
| `--color-bg-base` | `#0e0e10` | najciemniejsze tło |
| `--color-bg-raised` / `--color-bg-surface` | `#121216` / `#17171c` | sekcje i karty |
| `--color-brand-primary` | `#8e1f3f` | przyciski, akcenty pełne |
| `--color-brand-accent` | `#e0527a` | drobny tekst akcentowy (kontrast 5:1 na tle bazowym) |
