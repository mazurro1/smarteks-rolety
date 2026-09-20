import type { Project, ProjectCategory } from "@/types";

/**
 * Realizacje. Galerie celowo nie maja pola `src` — dopoki zdjecie nie zostanie
 * wgrane do /public/images/realizacje, komponent renderuje stylowany placeholder.
 * Aby podpiac zdjecie, wystarczy dopisac `src: "/images/realizacje/<plik>.jpg"`.
 */
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  rc2: "Rolety RC2",
  rc3: "Rolety RC3",
  adaptive: "Rolety adaptacyjne",
  recessed: "Rolety podtynkowe",
  rollerGates: "Bramy rolowane",
};

export const PROJECTS: Project[] = [
  {
    slug: "dom-jednorodzinny-wilanow-rolety-rc2",
    title: "Dom jednorodzinny z roletami RC2",
    category: "rc2",
    location: "Warszawa, Wilanów",
    year: 2026,
    buildingType: "Dom jednorodzinny",
    summary:
      "Jedenaście okien parteru i piętra zabezpieczonych certyfikowanymi roletami RC2 z jednolitym sterowaniem centralnym.",
    description: [
      "Inwestor zgłosił się po włamaniu u sąsiada — zależało mu na zabezpieczeniu, które będzie realną barierą, a nie tylko osłoną przeciwsłoneczną. Po pomiarze zaproponowaliśmy rolety RC2 na wszystkie okna parteru oraz na okna piętra dostępne z dachu garażu.",
      "Budynek był wykończony, więc zastosowaliśmy skrzynki nakładane montowane we wnękach okiennych. Dzięki temu prace obyły się bez naruszania elewacji, a całość zamknęła się w dwóch dniach roboczych.",
      "Sterowanie połączyliśmy w grupy: parter, piętro i scena „wszystko zamknięte” uruchamiana jednym przyciskiem przy drzwiach wejściowych oraz z telefonu.",
    ],
    scope: [
      "Pomiar i dobór zestawów certyfikowanych RC2",
      "Montaż 11 rolet z blokadami antypodnoszeniowymi",
      "Podłączenie elektryczne i konfiguracja napędów radiowych",
      "Sterowanie grupowe i scena centralnego zamknięcia",
      "Protokół montażu z numerem certyfikatu dla ubezpieczyciela",
    ],
    specs: [
      { label: "Liczba osłon", value: "11 rolet" },
      { label: "Klasa", value: "RC2 wg PN-EN 1627" },
      { label: "Typ skrzynki", value: "Nakładana, montaż we wnęce" },
      { label: "Sterowanie", value: "Radiowe, grupowe + aplikacja" },
      { label: "Czas realizacji", value: "2 dni robocze" },
    ],
    gallery: [
      {
        alt: "Elewacja frontowa domu jednorodzinnego z zamontowanymi roletami antywłamaniowymi RC2",
        caption: "Elewacja frontowa po montażu — skrzynki ukryte we wnękach okiennych",
      },
      {
        alt: "Zbliżenie na prowadnicę rolety antywłamaniowej RC2 zamontowanej we wnęce okiennej",
        caption: "Wzmocniona prowadnica z głębokim zagłębieniem bocznym",
      },
      {
        alt: "Pancerz rolety RC2 w pozycji zamkniętej widziany od strony ogrodu",
        caption: "Pancerz zamknięty — widoczna sztywna listwa dolna",
      },
      {
        alt: "Panel sterowania roletami przy drzwiach wejściowych domu",
        caption: "Sterownik centralny ze sceną zamknięcia całego domu",
      },
    ],
    outcome:
      "Ubezpieczyciel uwzględnił certyfikowane zabezpieczenia przy odnowieniu polisy, a dom zyskał pełne zaciemnienie sypialni bez dodatkowych zasłon.",
  },
  {
    slug: "willa-konstancin-rolety-rc3",
    title: "Willa z roletami RC3 i integracją z alarmem",
    category: "rc3",
    location: "Konstancin-Jeziorna",
    year: 2026,
    buildingType: "Willa",
    summary:
      "Najwyższa klasa odporności na przeszkleniach parteru, z kontrolą położenia pancerza raportowaną do centrali alarmowej.",
    description: [
      "Willa stoi na dużej, zadrzewionej działce, osłonięta od ulicy — sytuacja, w której włamywacz ma komfort pracy. Ubezpieczyciel przy tej sumie ubezpieczenia wymagał zabezpieczeń klasy RC3.",
      "Największym wyzwaniem były dwa przeszklenia tarasowe o szerokości ponad trzech metrów. Zastosowaliśmy pancerze ekstrudowane ze wzmocnioną listwą dolną i napędami o podwyższonym momencie, a prowadnice zakotwiliśmy bezpośrednio w konstrukcji nośnej, z pominięciem warstwy ocieplenia.",
      "Każda roleta otrzymała styk kontrolny położenia. Centrala alarmowa wie, czy pancerz jest opuszczony, i uwzględnia to przy uzbrajaniu systemu na noc.",
    ],
    scope: [
      "Analiza nośności nadproży i sposobu kotwienia",
      "Montaż 8 rolet RC3, w tym 2 tarasowych o szerokości 3,4 m",
      "Ryglowanie wielopunktowe pancerzy",
      "Styki kontrolne położenia i integracja z centralą alarmową",
      "Dokumentacja fotograficzna kotwienia i protokół odbioru",
    ],
    specs: [
      { label: "Liczba osłon", value: "8 rolet" },
      { label: "Klasa", value: "RC3 wg PN-EN 1627" },
      { label: "Największa osłona", value: "3,4 m szerokości" },
      { label: "Integracja", value: "Centrala alarmowa, styki położenia" },
      { label: "Czas realizacji", value: "4 dni robocze" },
    ],
    gallery: [
      {
        alt: "Willa z dużymi przeszkleniami i roletami antywłamaniowymi RC3 na parterze",
        caption: "Przeszklenia parteru osłonięte pancerzami RC3",
      },
      {
        alt: "Zbliżenie na pancerz z profili ekstrudowanych rolety RC3",
        caption: "Profil ekstrudowany — pełne aluminium bez wypełnienia pianką",
      },
      {
        alt: "Prowadnica rolety RC3 kotwiona w konstrukcji nośnej budynku",
        caption: "Kotwienie prowadnicy w murze nośnym, z pominięciem ocieplenia",
      },
      {
        alt: "Centrala alarmowa z podglądem stanu rolet antywłamaniowych",
        caption: "Stan pancerzy raportowany do systemu alarmowego",
      },
    ],
    outcome:
      "Obiekt spełnił wymagania ubezpieczyciela dla najwyższej sumy ubezpieczenia, a domownicy uzbrajają alarm z pewnością, że wszystkie osłony są zamknięte.",
  },
  {
    slug: "apartament-mokotow-rolety-adaptacyjne",
    title: "Apartament z roletami adaptacyjnymi od południa",
    category: "adaptive",
    location: "Warszawa, Mokotów",
    year: 2025,
    buildingType: "Apartament z tarasem",
    summary:
      "Przeszklenia południowo-zachodnie z regulacją kąta lameli i automatyką słoneczną — koniec z wyborem między upałem a ciemnością.",
    description: [
      "Salon z przeszkleniem na południowy zachód nagrzewał się latem do granic wytrzymałości, a klasyczne rolety zewnętrzne oznaczały pracę przy sztucznym świetle przez pół dnia.",
      "Zamontowaliśmy rolety adaptacyjne z lamelami 80 mm. Po opuszczeniu pancerza lamele odchylają się o zadany kąt: światło wpada do wnętrza, powietrze przepływa, a z zewnątrz nie widać, co dzieje się w mieszkaniu.",
      "Automatyka steruje osłonami bez udziału mieszkańców — czujnik nasłonecznienia przymyka lamele, gdy słońce operuje na elewację, a czujnik wiatru zwija pancerz przed nadejściem silniejszych podmuchów.",
    ],
    scope: [
      "Analiza nasłonecznienia elewacji i dobór wysokości lameli",
      "Montaż 5 rolet adaptacyjnych, w tym osłony tarasowej 3,2 m",
      "Instalacja czujników nasłonecznienia i wiatru",
      "Zaprogramowanie scen dziennych i wieczornych",
      "Instruktaż obsługi aplikacji i pilota",
    ],
    specs: [
      { label: "Liczba osłon", value: "5 rolet adaptacyjnych" },
      { label: "Lamele", value: "80 mm, kąt do 70°" },
      { label: "Największa osłona", value: "3,2 m szerokości" },
      { label: "Automatyka", value: "Czujnik słońca i wiatru" },
      { label: "Czas realizacji", value: "2 dni robocze" },
    ],
    gallery: [
      {
        alt: "Taras apartamentu z roletami adaptacyjnymi o częściowo uchylonych lamelach",
        caption: "Lamele uchylone — światło dzienne przy opuszczonym pancerzu",
      },
      {
        alt: "Wnętrze salonu oświetlone rozproszonym światłem przez uchylone lamele rolety",
        caption: "Rozproszone światło we wnętrzu, bez oślepiania przy monitorze",
      },
      {
        alt: "Zbliżenie na mechanizm uchylania lameli rolety adaptacyjnej",
        caption: "Mechanizm uchylania lameli prowadzonych na taśmach",
      },
      {
        alt: "Czujnik nasłonecznienia zamontowany na elewacji budynku",
        caption: "Czujnik nasłonecznienia sterujący kątem lameli",
      },
    ],
    outcome:
      "Temperatura w salonie w szczycie upałów spadła o kilka stopni, a klimatyzacja pracuje wyraźnie krócej w ciągu dnia.",
  },
  {
    slug: "dom-piaseczno-rolety-podtynkowe",
    title: "Dom w budowie — rolety podtynkowe w ociepleniu",
    category: "recessed",
    location: "Piaseczno",
    year: 2026,
    buildingType: "Dom jednorodzinny w budowie",
    summary:
      "Skrzynki wtopione w warstwę ocieplenia na etapie stanu surowego. Po tynkach elewacja pozostała całkowicie gładka.",
    description: [
      "Inwestor skontaktował się z nami na etapie stanu surowego otwartego — czyli w najlepszym możliwym momencie. Uzgodniliśmy wymiary nadproży i rozstaw prowadnic, zanim ekipa murarska dotarła do otworów okiennych.",
      "Skrzynki podtynkowe trafiły w warstwę ocieplenia przed tynkowaniem, wraz z przygotowanymi przepustami elektrycznymi. Izolacja przebiega nad nimi bez przerwy, więc nad oknami nie powstał mostek termiczny.",
      "Po wykonaniu elewacji wróciliśmy na budowę, żeby zamontować pancerze, prowadnice i napędy. Z zewnątrz widoczne są wyłącznie prowadnice przy ościeżach.",
    ],
    scope: [
      "Konsultacja wymiarów nadproży przed stanem surowym",
      "Dostawa i montaż 14 skrzynek podtynkowych w warstwie ocieplenia",
      "Przygotowanie przepustów elektrycznych pod napędy",
      "Montaż pancerzy i prowadnic po wykonaniu tynków",
      "Uruchomienie sterowania i przekazanie dokumentacji",
    ],
    specs: [
      { label: "Liczba osłon", value: "14 rolet" },
      { label: "Skrzynka", value: "Podtynkowa 245 mm, EPS wzmocniony" },
      { label: "Rewizja", value: "Od strony wnętrza" },
      { label: "Etap montażu", value: "Stan surowy + po tynkach" },
      { label: "Czas realizacji", value: "2 wizyty, łącznie 4 dni" },
    ],
    gallery: [
      {
        alt: "Skrzynka rolety podtynkowej osadzona w warstwie ocieplenia na budowie",
        caption: "Skrzynka wtapiana w ocieplenie przed tynkowaniem",
      },
      {
        alt: "Nadproże z przygotowanym przepustem elektrycznym pod napęd rolety",
        caption: "Przepusty elektryczne przygotowane przed zamknięciem nadproża",
      },
      {
        alt: "Gotowa elewacja domu bez widocznych skrzynek rolet",
        caption: "Elewacja po tynkach — skrzynki całkowicie niewidoczne",
      },
      {
        alt: "Rewizja serwisowa rolety podtynkowej widoczna od strony pomieszczenia",
        caption: "Rewizja serwisowa dostępna od wnętrza",
      },
    ],
    outcome:
      "Budynek zyskał osłony bez kompromisu w bryle elewacji i bez przerwania ciągłości izolacji nad oknami.",
  },
  {
    slug: "szeregowka-pruszkow-brama-rolowana",
    title: "Brama rolowana w garażu o niskim nadprożu",
    category: "rollerGates",
    location: "Pruszków",
    year: 2025,
    buildingType: "Zabudowa szeregowa",
    summary:
      "Garaż, w którym brama segmentowa nie miała gdzie odjechać. Pancerz rolowany zwolnił całą przestrzeń pod stropem.",
    description: [
      "W garażu szeregowca zostało niespełna 35 cm nad otworem wjazdowym, a pod stropem biegły instalacje. Brama segmentowa z prowadnicami odpadała już na etapie pomiaru.",
      "Zamontowaliśmy bramę rolowaną z pancerzem zwijanym na wał w skrzynce nad wjazdem. Strop pozostał wolny — właściciel zawiesił pod nim regały i oświetlenie warsztatowe.",
      "Napęd wyposażyliśmy w mechanizm awaryjnego otwierania, fotokomórki i listwę krawędziową. Sterowanie odbywa się pilotem oraz klawiaturą kodową przy wjeździe.",
    ],
    scope: [
      "Pomiar otworu i dobór średnicy wału do niskiego nadproża",
      "Montaż bramy rolowanej z napędem w wale",
      "Instalacja fotokomórek i listwy krawędziowej",
      "Klawiatura kodowa i piloty dla domowników",
      "Testy zabezpieczeń i instruktaż obsługi",
    ],
    specs: [
      { label: "Szerokość wjazdu", value: "2,6 m" },
      { label: "Dostępne nadproże", value: "35 cm" },
      { label: "Pancerz", value: "Aluminiowy wypełniony pianką" },
      { label: "Zabezpieczenia", value: "Fotokomórki, listwa krawędziowa" },
      { label: "Czas realizacji", value: "1 dzień roboczy" },
    ],
    gallery: [
      {
        alt: "Brama rolowana zamontowana w garażu domu w zabudowie szeregowej",
        caption: "Brama rolowana w otworze wjazdowym o niskim nadprożu",
      },
      {
        alt: "Skrzynka bramy rolowanej nad wjazdem do garażu",
        caption: "Skrzynka z wałem — 35 cm nad otworem",
      },
      {
        alt: "Wolna przestrzeń pod stropem garażu bez prowadnic bramy segmentowej",
        caption: "Strop bez prowadnic — miejsce na regały i instalacje",
      },
      {
        alt: "Klawiatura kodowa do sterowania bramą rolowaną przy wjeździe",
        caption: "Klawiatura kodowa i piloty dla domowników",
      },
    ],
    outcome:
      "Wjazd zautomatyzowany mimo skrajnie niskiego nadproża, a garaż zyskał pełną przestrzeń magazynową pod stropem.",
  },
  {
    slug: "biuro-wola-rolety-adaptacyjne",
    title: "Biuro na Woli — fasada z automatyką słoneczną",
    category: "adaptive",
    location: "Warszawa, Wola",
    year: 2025,
    buildingType: "Lokal biurowy",
    summary:
      "Dwadzieścia dwie osłony adaptacyjne sterowane grupowo, z harmonogramem dopasowanym do godzin pracy zespołu.",
    description: [
      "Open space z przeszkleniami na dwie strony świata oznaczał codzienną wojnę o rolety — jedni chcieli światła, inni uciekali przed odblaskiem na monitorach.",
      "Rolety adaptacyjne rozwiązały spór technicznie: lamele przepuszczają światło dzienne, jednocześnie odcinając bezpośrednie promieniowanie. Sterowanie podzieliliśmy na strefy odpowiadające układowi stanowisk.",
      "Harmonogram uruchamia osłony przed przyjściem zespołu i otwiera je po godzinach pracy, żeby serwis sprzątający miał pełne światło dzienne.",
    ],
    scope: [
      "Projekt stref sterowania dopasowany do układu biura",
      "Montaż 22 rolet adaptacyjnych na dwóch elewacjach",
      "Sterowanie grupowe z panelami w strefach",
      "Harmonogramy tygodniowe i scenariusze pogodowe",
      "Szkolenie administratora biura z obsługi systemu",
    ],
    specs: [
      { label: "Liczba osłon", value: "22 rolety adaptacyjne" },
      { label: "Elewacje", value: "Południowa i zachodnia" },
      { label: "Sterowanie", value: "Strefowe, panele + harmonogram" },
      { label: "Automatyka", value: "Czujniki słońca i wiatru" },
      { label: "Czas realizacji", value: "5 dni roboczych" },
    ],
    gallery: [
      {
        alt: "Elewacja biurowa z rzędem rolet adaptacyjnych o uchylonych lamelach",
        caption: "Fasada biura z osłonami w pozycji roboczej",
      },
      {
        alt: "Open space z roletami adaptacyjnymi ograniczającymi odblask na monitorach",
        caption: "Światło dzienne bez odblasków na stanowiskach pracy",
      },
      {
        alt: "Panel sterowania strefami rolet w biurze",
        caption: "Panel sterowania strefą — jedno dotknięcie na cały rząd okien",
      },
      {
        alt: "Zbliżenie na lamele rolety adaptacyjnej na elewacji biurowca",
        caption: "Lamele 90 mm w wersji fasadowej",
      },
    ],
    outcome:
      "Zespół przestał ręcznie regulować osłony, a pomiary wykazały niższe zużycie energii na chłodzenie w miesiącach letnich.",
  },
  {
    slug: "dom-jozefow-rc2-podtynkowe",
    title: "Rolety RC2 ukryte w elewacji",
    category: "rc2",
    extraCategories: ["recessed"],
    location: "Józefów",
    year: 2026,
    buildingType: "Dom jednorodzinny",
    summary:
      "Certyfikowana ochrona RC2 w skrzynkach podtynkowych — bezpieczeństwo bez widocznych elementów na elewacji.",
    description: [
      "Inwestor nie chciał rezygnować z ochrony antywłamaniowej, ale nie zgadzał się na skrzynki widoczne na świeżo wykończonej, minimalistycznej elewacji.",
      "Połączyliśmy oba wymagania: pancerze certyfikowane w klasie RC2 trafiły do skrzynek podtynkowych przewidzianych przez producenta dla tego zestawu. Prowadnice zakotwiliśmy w konstrukcji nośnej, co było warunkiem utrzymania klasy odporności.",
      "Rezultatem jest dom, w którym nic nie zdradza obecności zabezpieczeń — poza smukłymi prowadnicami przy ościeżach.",
    ],
    scope: [
      "Dobór zestawu RC2 dopuszczonego do zabudowy podtynkowej",
      "Montaż 9 skrzynek podtynkowych w warstwie ocieplenia",
      "Kotwienie prowadnic w konstrukcji nośnej",
      "Konfiguracja sterowania radiowego i sceny nocnej",
      "Protokół montażu z numerem certyfikatu",
    ],
    specs: [
      { label: "Liczba osłon", value: "9 rolet" },
      { label: "Klasa", value: "RC2 wg PN-EN 1627" },
      { label: "Skrzynka", value: "Podtynkowa, w warstwie ocieplenia" },
      { label: "Sterowanie", value: "Radiowe + scena nocna" },
      { label: "Czas realizacji", value: "3 dni robocze" },
    ],
    gallery: [
      {
        alt: "Minimalistyczna elewacja domu bez widocznych skrzynek rolet antywłamaniowych",
        caption: "Elewacja bez widocznych skrzynek — pancerze RC2 w środku",
      },
      {
        alt: "Prowadnica rolety antywłamaniowej licowana z ościeżem okna",
        caption: "Smukła prowadnica licowana z ościeżem",
      },
      {
        alt: "Skrzynka podtynkowa z pancerzem antywłamaniowym w trakcie montażu",
        caption: "Zestaw RC2 przygotowany do zabudowy podtynkowej",
      },
      {
        alt: "Zamknięte rolety antywłamaniowe RC2 na elewacji domu wieczorem",
        caption: "Scena nocna — wszystkie pancerze zamknięte jednym poleceniem",
      },
    ],
    outcome:
      "Dom uzyskał certyfikowaną ochronę okien parteru bez żadnego kompromisu w wyglądzie elewacji.",
  },
  {
    slug: "hala-marki-bramy-rolowane",
    title: "Hala magazynowa — trzy bramy rolowane z automatyką",
    category: "rollerGates",
    location: "Marki",
    year: 2024,
    buildingType: "Obiekt magazynowy",
    summary:
      "Wjazdy dostawcze z pętlą indukcyjną i sterowaniem grupowym, zintegrowane z systemem kontroli dostępu obiektu.",
    description: [
      "Hala obsługuje kilkadziesiąt dostaw dziennie. Poprzednie bramy otwierane ręcznie generowały kolejki i nieustanne wezwania do obsługi.",
      "Zamontowaliśmy trzy bramy rolowane z napędami przemysłowymi, pętlą indukcyjną wykrywającą pojazd oraz fotokomórkami i listwami krawędziowymi na każdym wjeździe.",
      "Sterowanie zintegrowaliśmy z systemem kontroli dostępu — kierowca z uprawnieniem otwiera bramę identyfikatorem, a wszystkie zdarzenia trafiają do rejestru obiektu.",
    ],
    scope: [
      "Demontaż starych bram i przygotowanie otworów",
      "Montaż 3 bram rolowanych z napędami przemysłowymi",
      "Pętla indukcyjna i czujniki ruchu na każdym wjeździe",
      "Integracja z systemem kontroli dostępu obiektu",
      "Umowa serwisowa z priorytetowym czasem reakcji",
    ],
    specs: [
      { label: "Liczba bram", value: "3 wjazdy dostawcze" },
      { label: "Szerokość", value: "od 3,5 do 4,2 m" },
      { label: "Napęd", value: "Przemysłowy, z otwieraniem awaryjnym" },
      { label: "Automatyka", value: "Pętla indukcyjna, kontrola dostępu" },
      { label: "Czas realizacji", value: "6 dni roboczych" },
    ],
    gallery: [
      {
        alt: "Trzy bramy rolowane na elewacji hali magazynowej",
        caption: "Wjazdy dostawcze po wymianie bram",
      },
      {
        alt: "Napęd przemysłowy bramy rolowanej zamontowany nad wjazdem do hali",
        caption: "Napęd przemysłowy z otwieraniem awaryjnym",
      },
      {
        alt: "Pętla indukcyjna w posadzce przed bramą rolowaną hali",
        caption: "Pętla indukcyjna wykrywająca nadjeżdżający pojazd",
      },
      {
        alt: "Czytnik kontroli dostępu sterujący bramą rolowaną w obiekcie magazynowym",
        caption: "Otwieranie identyfikatorem, z rejestrem zdarzeń",
      },
    ],
    outcome:
      "Obsługa dostaw przyspieszyła, a rejestr zdarzeń dał kierownikowi obiektu pełny wgląd w ruch na wjazdach.",
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);

export const getProjectSlugs = (): string[] =>
  PROJECTS.map((project) => project.slug);

export const getProjectsByCategory = (
  categories: ProjectCategory[],
  limit?: number,
): Project[] => {
  const matched = PROJECTS.filter(
    (project) =>
      categories.includes(project.category) ||
      project.extraCategories?.some((extra) => categories.includes(extra)),
  );
  return typeof limit === "number" ? matched.slice(0, limit) : matched;
};

export const getLatestProjects = (limit: number): Project[] =>
  [...PROJECTS].sort((a, b) => b.year - a.year).slice(0, limit);
