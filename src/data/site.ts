import type { FaqItem, IconKey, ProcessStep, StatItem } from "@/types";

/** Liczby pokazywane pod hero i na stronie realizacji. */
export const STATS: StatItem[] = [
  { value: "600+", label: "zamontowanych osłon" },
  { value: "12", label: "lat na rynku" },
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
      "Montujemy zestawy badane jako całość wg PN-EN 1627. Po pracach zostaje protokół z numerem certyfikatu — dokument, o który pyta ubezpieczyciel.",
  },
  {
    icon: "ruler",
    title: "Pomiar przed wyceną",
    description:
      "Przyjeżdżamy, mierzymy i sprawdzamy nadproże oraz warstwę ocieplenia. Wycena powstaje na podstawie tego, co zastaliśmy, a nie szacunków przez telefon.",
  },
  {
    icon: "wrench",
    title: "Serwis od tej samej ekipy",
    description:
      "Nie znikamy po montażu. Przeglądy, regulacje i naprawy prowadzą ci sami ludzie, którzy zakładali instalację — i znają ją na pamięć.",
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
    title: "Rozmowa i wstępny zakres",
    description:
      "Ustalamy, co ma osłaniać instalacja: bezpieczeństwo, światło, ciepło czy wszystko naraz. Podajemy orientacyjny przedział cenowy.",
  },
  {
    number: "02",
    title: "Bezpłatny pomiar na miejscu",
    description:
      "Sprawdzamy otwory, nadproża, warstwę ocieplenia i dostęp do zasilania. Wskazujemy rozwiązania możliwe w tym konkretnym budynku.",
  },
  {
    number: "03",
    title: "Wycena i dobór zestawu",
    description:
      "Otrzymujesz wycenę z rozbiciem na osłony, napędy, sterowanie i montaż. Bez pozycji „inne” i bez kosztów, które pojawiają się później.",
  },
  {
    number: "04",
    title: "Montaż i uruchomienie",
    description:
      "Montujemy, podłączamy, programujemy krańcówki i sceny. Po sobie sprzątamy — to nie powinno być wyróżnikiem, ale bywa.",
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
    a: "Cena zależy od wymiaru osłony, typu pancerza i sposobu montażu. Roleta standardowa na typowe okno to zwykle kilkaset złotych za sztukę wraz z montażem, certyfikowana roleta RC2 kosztuje wyraźnie więcej ze względu na konstrukcję pancerza i prowadnic. Dokładną kwotę podajemy po bezpłatnym pomiarze — bez niego każda wycena jest zgadywaniem.",
  },
  {
    q: "Czy montujecie rolety w gotowych, wykończonych domach?",
    a: "Tak. W budynkach oddanych do użytku montujemy rolety nakładane — skrzynka trafia na elewację lub do wnęki okiennej. Prace przy jednym oknie zajmują 2–3 godziny i nie wymagają robót murarskich. Wersję podtynkową można ukryć w elewacji tylko przy okazji docieplania budynku.",
  },
  {
    q: "Jak długo trwa realizacja od podpisania umowy?",
    a: "Standardowo od 3 do 5 tygodni. Większość tego czasu to produkcja osłon na wymiar. Sam montaż w domu jednorodzinnym zamyka się zwykle w dwóch dniach roboczych.",
  },
  {
    q: "Czym różnią się rolety RC2 od RC3?",
    a: "Klasą odporności potwierdzoną badaniem. RC2 wytrzymuje co najmniej 3 minuty ataku prostymi narzędziami, RC3 — 5 minut z użyciem łomu. RC3 ma pancerz z pełnych profili ekstrudowanych, mocniejsze prowadnice kotwione w konstrukcji nośnej i ryglowanie wielopunktowe.",
  },
  {
    q: "Co obejmuje gwarancja?",
    a: "Pięć lat na komponenty i wykonanie montażu. W okresie gwarancji usterki usuwamy na własny koszt. Po jej upływie prowadzimy serwis odpłatny, z dostępem do części również do starszych instalacji.",
  },
  {
    q: "Serwisujecie rolety zamontowane przez inną firmę?",
    a: "Tak, to duża część naszej pracy. Wymieniamy napędy, naprawiamy pancerze i prowadnice, modernizujemy sterowanie z taśmy na napęd elektryczny. Warunkiem jest dostępność części lub możliwość zastosowania kompatybilnego zamiennika.",
  },
];

/** Ogolny blok montaz + serwis dla strony /oferta (bez wiazania z produktem). */
export const GENERIC_INSTALLATION = {
  lead: "Montaż prowadzi nasza własna ekipa — bez podwykonawców dobieranych na zlecenie. Każde zlecenie zaczyna się od pomiaru na miejscu, bo o trwałości instalacji decyduje to, w czym zakotwimy prowadnice.",
  points: [
    "Bezpłatny pomiar i ocena nadproża, ocieplenia oraz dostępu do zasilania",
    "Dobór kotew do rodzaju muru: beton, pustak, silikat, beton komórkowy",
    "Podłączenie elektryczne, programowanie krańcówek i sterowania",
    "Uprzątnięcie miejsca pracy i instruktaż obsługi po zakończeniu montażu",
    "Protokół odbioru, a przy zestawach certyfikowanych — numer certyfikatu",
  ],
};

export const GENERIC_SERVICE = {
  lead: "Serwisujemy wszystko, co montujemy — i sporo tego, co zamontował ktoś inny. Jeden numer telefonu, ta sama ekipa, która zna instalację od środka.",
  points: [
    "Przeglądy okresowe: prowadnice, naciąg pancerza, blokady, napęd",
    "Naprawy napędów rurowych, sterowników i uszkodzonych profili",
    "Modernizacja sterowania: z taśmy lub korby na napęd elektryczny",
    "Serwis gwarancyjny na własny koszt przez cały okres gwarancji",
    "Serwis rolet i bram zamontowanych przez inne firmy",
  ],
};

/** Skrocony opis firmy — sekcja na stronie glownej i dane do schema.org. */
export const COMPANY_INTRO = {
  eyebrow: "Kim jesteśmy",
  title: "Rolety zewnętrzne to cała nasza robota",
  paragraphs: [
    "Smarteks Rolety to zespół montażowy z Warszawy, który zajmuje się wyłącznie osłonami zewnętrznymi: roletami antywłamaniowymi, adaptacyjnymi, podtynkowymi i bramami rolowanymi. Nie rozmieniamy się na dziesięć branż — dzięki temu wiemy, jak zachowa się nadproże z pustaka, ile waży pancerz ekstrudowany i który napęd wytrzyma dziesięć lat pracy.",
    "Pracujemy w Warszawie i okolicach — w promieniu, w którym jesteśmy w stanie przyjechać na serwis szybko, a nie „kiedyś w przyszłym miesiącu”. To świadome ograniczenie zasięgu: wolimy obsłużyć mniejszy obszar porządnie niż pół kraju byle jak.",
  ],
  points: [
    {
      title: "Jedna specjalizacja",
      description: "Tylko osłony zewnętrzne — od pomiaru po serwis po latach.",
    },
    {
      title: "Własna ekipa montażowa",
      description: "Bez podwykonawców przypadkowo dobranych na zlecenie.",
    },
    {
      title: "Krótki dojazd",
      description: "Warszawa i okolice — serwis w rozsądnym czasie reakcji.",
    },
  ],
};
