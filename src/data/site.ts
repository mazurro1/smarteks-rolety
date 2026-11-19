import { CONTACT_INFO } from "@/constants/contact";
import { OFFER_SLUGS, blogPath, offerPath } from "@/constants/routes";
import type { FaqItem, IconKey, ProcessStep, StatItem } from "@/types";

/** Staz firmy - w statystykach i na zdjeciu w sekcji "Kim jestesmy". */
export const YEARS_IN_BUSINESS = 6;

/** Liczby pokazywane pod hero i na stronie realizacji. */
export const STATS: StatItem[] = [
  { value: "600+", label: "zamontowanych osłon" },
  { value: String(YEARS_IN_BUSINESS), label: "lat doświadczenia" },
  { value: "5 lat", label: "gwarancji" },
  { value: "48h", label: "reakcji serwisu" },
];

/** Krotkie hasla w pasku zaufania pod hero. */
export const TRUST_POINTS: string[] = [
  "Certyfikaty RC2 i RC3",
  "Warszawa i okolice",
  "Montaż i serwis w jednej firmie",
  "Bezpłatny pomiar",
];

export interface Benefit {
  icon: IconKey;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    icon: "shieldCheck",
    title: "Certyfikat, nie deklaracja",
    description:
      "Montujemy zestawy Aluprof badane jako całość wg PN-EN 1627. Po pracach zostaje protokół z numerem certyfikatu - dokument, o który pyta ubezpieczyciel.",
  },
  {
    icon: "ruler",
    title: "Wycena w dwóch krokach",
    description:
      "Wstępną wycenę podajemy na podstawie przesłanych wymiarów. Ostateczną - po pomiarze na miejscu, gdy sprawdzimy nadproże i warstwę ocieplenia. Bez niespodzianek przy montażu.",
  },
  {
    icon: "wrench",
    title: "Serwis od tej samej ekipy",
    description:
      "Nie znikamy po montażu. Przeglądy, regulacje i naprawy prowadzą ci sami ludzie, którzy zakładali instalację - i znają ją na pamięć.",
  },
  {
    icon: "thermometer",
    title: "Energia i komfort",
    description:
      "Osłona po zewnętrznej stronie szyby odcina promieniowanie, zanim nagrzeje wnętrze. Zimą ogranicza straty ciepła przez przeszklenia.",
  },
  {
    icon: "remote",
    title: "Sterowanie bez kombinowania",
    description:
      "Pilot, przycisk, telefon lub automatyka pogodowa. Konfigurujemy sceny i harmonogramy, a potem uczymy, jak z nich korzystać.",
  },
  {
    icon: "bolt",
    title: "Terminy, których dotrzymujemy",
    description:
      "Montaż w większości domów zamyka się w dwóch dniach. Jeśli coś ma się przesunąć, dzwonimy zanim zapytasz.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Wymiary i wstępna wycena",
    description:
      "Prześlij wstępne wymiary okien przez formularz lub e-mailem. Na ich podstawie przygotujemy wstępną wycenę i podpowiemy, które rozwiązanie ma sens.",
  },
  {
    number: "02",
    title: "Bezpłatny pomiar na miejscu",
    description:
      "Sprawdzamy otwory, nadproża, warstwę ocieplenia i dostęp do zasilania. Wskazujemy rozwiązania możliwe w tym konkretnym budynku.",
  },
  {
    number: "03",
    title: "Ostateczna wycena i dobór zestawu",
    description:
      "Otrzymujesz ostateczną wycenę z rozbiciem na osłony, napędy, sterowanie i montaż. Bez pozycji „inne” i bez kosztów, które pojawiają się później. Zakup możesz rozłożyć na raty: kredytu udziela Santander Consumer Bank S.A., a Smarteks jako pośrednik kredytowy tego banku udostępnia wniosek. O kredycie decyduje bank. [Jak kupić na raty →](https://smarteks.pl/zakupy-na-raty/)",
  },
  {
    number: "04",
    title: "Montaż i uruchomienie",
    description:
      "Montujemy, podłączamy, programujemy krańcówki i sceny. Po sobie sprzątamy - to nie powinno być wyróżnikiem, ale bywa.",
  },
  {
    number: "05",
    title: "Odbiór, gwarancja, serwis",
    description:
      "Instruktaż obsługi, protokół z numerem certyfikatu i gwarancja. Potem przeglądy okresowe i jeden numer telefonu, gdy coś się dzieje.",
  },
];

export const HOME_FAQ: FaqItem[] = [
  {
    q: "Ile kosztuje montaż rolet zewnętrznych?",
    a: "Cena zależy od wymiaru osłony, typu pancerza i sposobu montażu. Roleta standardowa na typowe okno to zwykle kilkaset złotych za sztukę wraz z montażem, certyfikowana roleta RC2 kosztuje wyraźnie więcej ze względu na konstrukcję pancerza i prowadnic. Wstępną wycenę przygotujemy na podstawie wymiarów przesłanych przez formularz lub e-mailem, a dokładną kwotę potwierdzamy po bezpłatnym pomiarze.",
  },
  {
    q: "Czy montujecie rolety w gotowych, wykończonych domach?",
    a: "Tak. W budynkach oddanych do użytku montujemy rolety nakładane - skrzynka trafia na elewację lub do wnęki okiennej. Prace przy jednym oknie zajmują 2-3 godziny i nie wymagają robót murarskich. Wersję podtynkową można ukryć w elewacji tylko przy okazji docieplania budynku.",
  },
  {
    q: "Jak długo trwa realizacja od podpisania umowy?",
    a: "Standardowo od 3 do 5 tygodni. Większość tego czasu to produkcja osłon na wymiar. Sam montaż w domu jednorodzinnym zamyka się zwykle w dwóch dniach roboczych.",
  },
  {
    q: "Czym różnią się rolety RC2 od RC3?",
    a: "Klasą odporności potwierdzoną badaniem. RC2 wytrzymuje co najmniej 3 minuty ataku prostymi narzędziami, RC3 - 5 minut z użyciem łomu. RC3 ma pancerz z pełnych profili ekstrudowanych, mocniejsze prowadnice kotwione w konstrukcji nośnej i ryglowanie wielopunktowe.",
  },
  {
    q: "Co obejmuje gwarancja?",
    a: "Pięć lat na komponenty i wykonanie montażu. W okresie gwarancji usterki usuwamy na własny koszt. Po jej upływie prowadzimy serwis odpłatny, z dostępem do części również do starszych instalacji.",
  },
  {
    q: "Serwisujecie rolety zamontowane przez inną firmę?",
    a: "Tak, to duża część naszej pracy. Wymieniamy napędy, naprawiamy pancerze i prowadnice, modernizujemy sterowanie z taśmy na napęd elektryczny. Warunkiem jest dostępność części lub możliwość zastosowania kompatybilnego zamiennika.",
  },
  {
    q: "Czy rolety można kupić na raty?",
    a: "Tak. Zakup rolet z montażem możesz rozłożyć na raty. Kredytu udziela Santander Consumer Bank S.A., a Smarteks działa jako pośrednik kredytowy tego banku: informuje o możliwości skorzystania z kredytu i udostępnia wniosek. O przyznaniu kredytu i jego warunkach decyduje bank. Szczegóły: [zakupy na raty w Smarteks](https://smarteks.pl/zakupy-na-raty/).",
  },
  {
    q: "Czy można zamontować rolety zewnętrzne w mieszkaniu w bloku?",
    a: "Tak. Elewacja bloku jest zwykle częścią wspólną budynku, dlatego przed montażem zapytaj zarządcę – wspólnotę albo spółdzielnię – czy potrzebna jest zgoda i czy są wymagania, na przykład co do koloru skrzynki. Przy pomiarze dobierzemy system do okien i sprawdzimy, jak doprowadzić zasilanie.",
  },
  {
    q: "Czy montujecie rolety na pasek?",
    a: "Nie. Montujemy wyłącznie rolety z napędem elektrycznym. Pasek wymaga otworu w ścianie, przez który ucieka ciepło, a napęd elektryczny wystarczy zasilić przewodem. Roletą sterujesz pilotem, przyciskiem na ścianie albo z telefonu.",
  },
];

/** Tabela "co pasuje do Twojego domu" pod lista kategorii na stronie glownej. */
export const OFFER_GUIDE = {
  title: "Jakie rolety zewnętrzne do Twojego domu",
  columns: ["Twoja sytuacja", "Co pasuje"],
  rows: [
    {
      situation: "Dom albo mieszkanie już stoi",
      fit: `[rolety adaptacyjne](${offerPath(OFFER_SLUGS.ADAPTIVE)}) – skrzynka na elewacji albo we wnęce, bez wymiany okien`,
    },
    {
      situation: "Budujesz dom albo docieplasz elewację",
      fit: `[rolety podtynkowe](${offerPath(OFFER_SLUGS.RECESSED)}) – skrzynka schowana w ociepleniu, trzeba ją zaplanować przed tynkowaniem`,
    },
    {
      situation: "Chcesz ochrony przed włamaniem",
      fit: `[rolety antywłamaniowe RC2](${offerPath(OFFER_SLUGS.RC2)}) – certyfikowany zestaw, także do gotowego domu; przy wyższym ryzyku [RC3](${offerPath(OFFER_SLUGS.RC3)})`,
    },
    {
      situation: "Garaż albo wjazd do hali",
      fit: `[brama rolowana](${offerPath(OFFER_SLUGS.ROLLER_GATES)}) – zwija się nad wjazdem i nie zabiera miejsca pod stropem`,
    },
  ],
};

/** Oceny klientow - sekcja "Opinie" na stronie glownej. Liczby aktualizowac recznie razem z data. */
export const REVIEWS = {
  eyebrow: "Opinie",
  title: "Jak oceniają nas klienci",
  stats: [
    { value: "5,0 / 5", stars: "★★★★★", label: "średnia ocena na Oferteo" },
    { value: "36", stars: undefined, label: "opinii na Oferteo" },
  ],
  note: "Stan na 16.11.2026. Opinie dotyczą wszystkich usług firmy Smarteks, nie tylko rolet.",
  links: [
    { href: CONTACT_INFO.OFERTEO_URL, label: "Zobacz opinie na Oferteo" },
    { href: CONTACT_INFO.GOOGLE_REVIEWS_URL, label: "Opinie w Google" },
  ],
};

/** Ogolny blok montaz + serwis dla strony /oferta (bez wiazania z produktem). */
export const GENERIC_INSTALLATION = {
  lead: "Montaż prowadzi nasza własna ekipa - bez podwykonawców dobieranych na zlecenie. Każde zlecenie zaczyna się od pomiaru na miejscu, bo o trwałości instalacji decyduje to, w czym zakotwimy prowadnice.",
  points: [
    "Bezpłatny pomiar i ocena nadproża, ocieplenia oraz dostępu do zasilania",
    "Dobór kotew do rodzaju muru: beton, pustak, silikat, beton komórkowy",
    "Podłączenie elektryczne, programowanie krańcówek i sterowania",
    "Uprzątnięcie miejsca pracy i instruktaż obsługi po zakończeniu montażu",
    "Protokół odbioru, a przy zestawach certyfikowanych - numer certyfikatu",
  ],
};

export const GENERIC_SERVICE = {
  lead: "Serwisujemy wszystko, co montujemy - i sporo tego, co zamontował ktoś inny. Jeden numer telefonu, ta sama ekipa, która zna instalację od środka.",
  points: [
    "Przeglądy okresowe: prowadnice, naciąg pancerza, blokady, napęd",
    "Naprawy napędów rurowych, sterowników i uszkodzonych profili",
    "Modernizacja sterowania: z taśmy lub korby na napęd elektryczny",
    "Serwis gwarancyjny na własny koszt przez cały okres gwarancji",
    "Serwis rolet i bram zamontowanych przez inne firmy",
  ],
  note: `Co sprawdzić samemu, a co zostawić serwisowi, opisaliśmy w poradniku [przegląd rolet zewnętrznych – co sprawdzić raz w roku](${blogPath("przeglad-rolet-co-sprawdzic-raz-w-roku")}).`,
};

/** Skrocony opis firmy - sekcja na stronie glownej i dane do schema.org. */
export const COMPANY_INTRO = {
  eyebrow: "Kim jesteśmy",
  title: "Osłony zewnętrzne znamy od nadproża po napęd",
  paragraphs: [
    `Smarteks to firma montażowa z Warszawy z kilkoma specjalizacjami. Jedną z nich są osłony zewnętrzne: rolety antywłamaniowe, adaptacyjne, podtynkowe i bramy rolowane - to im poświęcona jest ta strona. Pełną ofertę firmy znajdziesz na [smarteks.pl](${CONTACT_INFO.MAIN_SITE_URL}). Przy każdym montażu sprawdzamy, jak zachowa się nadproże z pustaka, ile waży pancerz ekstrudowany i który napęd wytrzyma dziesięć lat pracy.`,
    "Pracujemy w Warszawie i okolicach - w promieniu, w którym jesteśmy w stanie przyjechać na serwis szybko, a nie „kiedyś w przyszłym miesiącu”. To świadome ograniczenie zasięgu: wolimy obsłużyć mniejszy obszar porządnie niż pół kraju byle jak.",
  ],
  points: [
    {
      title: "Kilka specjalizacji",
      description:
        "Rolety i bramy rolowane, a także szlabany parkingowe i automatyka wjazdów.",
      links: [
        {
          href: CONTACT_INFO.BARRIERS_SITE_URL,
          label: "Zobacz ofertę szlabanów",
        },
        {
          href: CONTACT_INFO.MAIN_SITE_URL,
          label: "Pełna oferta Smarteks",
        },
      ],
    },
    {
      title: "Własna ekipa montażowa",
      description: "Bez podwykonawców przypadkowo dobranych na zlecenie.",
    },
    {
      title: "Krótki dojazd",
      description: "Warszawa i okolice - serwis w rozsądnym czasie reakcji.",
    },
  ],
};
