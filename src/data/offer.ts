import { OFFER_SLUGS } from "@/constants/routes";
import type { OfferProduct } from "@/types";

/**
 * Pelna tresc podstron ofertowych. Jedno zrodlo prawdy dla:
 * nawigacji, strony /oferta, podstron /oferta/[slug], sitemapy i linkowania z realizacji.
 */
export const OFFER_PRODUCTS: OfferProduct[] = [
  {
    slug: OFFER_SLUGS.RC2,
    navLabel: "Rolety antywłamaniowe RC2",
    title: "Rolety antywłamaniowe RC2",
    cardTitle: "Rolety RC2",
    eyebrow: "Klasa odporności RC2",
    badge: "Najczęściej wybierane",
    icon: "shield",
    tagline: "Certyfikowana ochrona dla domów i mieszkań",
    excerpt:
      "Certyfikowana bariera przed włamaniem przez okno. Wzmocnione pancerze, blokady antypodnoszeniowe i prowadnice, które nie ustępują pod naporem łomu.",
    highlights: [
      "Certyfikat klasy RC2 wg PN-EN 1627",
      "Blokady antypodnoszeniowe w każdej rolecie",
      "Akceptowane przez towarzystwa ubezpieczeniowe",
    ],
    intro: [
      "Rolety antywłamaniowe klasy RC2 to najczęściej wybierane zabezpieczenie okien w domach jednorodzinnych i mieszkaniach na parterze. Klasa RC2 oznacza, że konstrukcja przez co najmniej trzy minuty opiera się próbie sforsowania prostymi narzędziami — śrubokrętem, klinem czy niewielkim łomem. W praktyce to czas, po którym zdecydowana większość włamywaczy rezygnuje i szuka łatwiejszego celu.",
      "Odporność nie bierze się z samego pancerza. Składa się na nią pięć elementów: profil wypełniony pianką o wysokiej gęstości, wzmocnione prowadnice z zagłębieniem bocznym, blokady antypodnoszeniowe uniemożliwiające ręczne podniesienie pancerza, sztywna listwa dolna oraz prawidłowe zakotwienie całego zestawu w murze. Pominięcie któregokolwiek z nich sprawia, że roleta traci deklarowaną klasę.",
      "Montujemy wyłącznie kompletne zestawy certyfikowane jako całość, wraz z protokołem montażu. To dokument, o który pyta ubezpieczyciel przy negocjowaniu składki i przy likwidacji szkody.",
    ],
    features: [
      {
        icon: "certificate",
        title: "Certyfikat na cały zestaw",
        description:
          "Klasa RC2 potwierdzona badaniem wg PN-EN 1627 dla kompletu: pancerz, prowadnice, skrzynka i mocowania.",
      },
      {
        icon: "lock",
        title: "Blokady antypodnoszeniowe",
        description:
          "Mechaniczne rygle blokują pancerz w pozycji zamkniętej — rolety nie da się podnieść od zewnątrz.",
      },
      {
        icon: "layers",
        title: "Profil wypełniony pianką",
        description:
          "Aluminiowe profile z rdzeniem z twardej pianki poliuretanowej: sztywność, tłumienie hałasu i izolacja termiczna.",
      },
      {
        icon: "bolt",
        title: "Napęd elektryczny z ryglowaniem",
        description:
          "Silnik z hamulcem elektromechanicznym stanowi dodatkowy punkt blokady pancerza w pozycji dolnej.",
      },
      {
        icon: "volume",
        title: "Cisza i przyciemnienie",
        description:
          "Redukcja hałasu z ulicy do 12 dB i pełne zaciemnienie sypialni bez dodatkowych zasłon.",
      },
      {
        icon: "house",
        title: "Dopasowanie do elewacji",
        description:
          "Pełna paleta RAL, struktury drewnopodobne i skrzynki w kilku kształtach — również do montażu po zakończeniu budowy.",
      },
    ],
    specs: [
      { label: "Klasa odporności", value: "RC2 wg PN-EN 1627/1630" },
      { label: "Czas oporu", value: "min. 3 minuty (narzędzia kat. A2)" },
      { label: "Profil pancerza", value: "Aluminium wypełnione pianką PU, 39–55 mm" },
      { label: "Prowadnice", value: "Wzmocnione, z uszczelką i głębokim zagłębieniem" },
      { label: "Blokady", value: "Antypodnoszeniowe, min. 2 na pancerz" },
      { label: "Napęd", value: "Silnik rurowy z hamulcem, sterowanie radiowe" },
      { label: "Zasilanie awaryjne", value: "Opcjonalne — korba lub akumulator" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "RC2 nakładana",
        description:
          "Skrzynka montowana na elewacji lub we wnęce okiennej. Rozwiązanie do budynków istniejących, bez ingerencji w konstrukcję.",
        points: [
          "Montaż w jeden dzień bez prac murarskich",
          "Skrzynka prosta lub skośna",
          "Możliwa wymiana istniejących rolet zwykłych",
        ],
      },
      {
        name: "RC2 podtynkowa",
        description:
          "Skrzynka ukryta w warstwie ocieplenia lub nadprożu. Od zewnątrz widoczne są wyłącznie prowadnice.",
        points: [
          "Planowana na etapie stanu surowego",
          "Brak mostków termicznych",
          "Rewizja od wewnątrz pomieszczenia",
        ],
      },
      {
        name: "RC2 z siatką przeciwowadową",
        description:
          "Prowadnica zintegrowana z moskitierą rolowaną — jedna rama, dwa niezależne pancerze.",
        points: [
          "Wspólna prowadnica dla rolety i moskitiery",
          "Brak dodatkowych otworów w elewacji",
          "Sterowanie rolety pozostaje elektryczne",
        ],
      },
    ],
    installation: {
      lead: "Montaż rolety antywłamaniowej różni się od montażu rolety zwykłej — o klasie RC2 decyduje sposób zakotwienia w murze, nie sam produkt.",
      points: [
        "Bezpłatny pomiar i ocena nadproża oraz warstwy ocieplenia przed wyceną",
        "Dobór kotew do rodzaju muru: beton, pustak ceramiczny, silikat, beton komórkowy",
        "Montaż prowadnic w rozstawie i z liczbą punktów mocowania wymaganą przez certyfikat",
        "Podłączenie elektryczne z zabezpieczeniem i konfiguracja krańcówek napędu",
        "Protokół montażu z numerem certyfikatu — dokument dla ubezpieczyciela",
      ],
    },
    service: {
      lead: "Roleta antywłamaniowa musi działać bezbłędnie latami. Zajmujemy się nią przez cały okres eksploatacji.",
      points: [
        "Przegląd raz w roku: kontrola blokad, prowadnic, naciągu i krańcówek",
        "Regulacja i wymiana zużytych elementów pancerza bez demontażu skrzynki",
        "Naprawy napędów rurowych i sterowników — najczęściej w jednej wizycie",
        "Wymiana rolet zwykłych na antywłamaniowe w istniejących prowadnicach, gdy pozwala na to konstrukcja",
        "Serwis pogwarancyjny również dla rolet montowanych przez inne firmy",
      ],
    },
    faq: [
      {
        q: "Czy rolety RC2 obniżają składkę ubezpieczenia?",
        a: "W większości towarzystw tak — certyfikowane zabezpieczenia przeciwwłamaniowe są uwzględniane przy wyliczaniu składki i podnoszą limit odpowiedzialności za kradzież z włamaniem. Warunkiem jest przedstawienie protokołu montażu z numerem certyfikatu, który przekazujemy po zakończeniu prac.",
      },
      {
        q: "Czym różni się roleta RC2 od zwykłej rolety zewnętrznej?",
        a: "Zwykła roleta pełni funkcję przeciwsłoneczną i można ją podnieść ręką od zewnątrz w kilka sekund. Roleta RC2 ma wypełniony pianką profil o większej sztywności, wzmocnione prowadnice z głębszym zagłębieniem, blokady antypodnoszeniowe oraz certyfikat wydany dla kompletnego zestawu, a nie dla pojedynczego elementu.",
      },
      {
        q: "Czy rolety RC2 można zamontować w gotowym domu?",
        a: "Tak. W budynkach oddanych do użytku montujemy wersję nakładaną — skrzynka trafia na elewację lub do wnęki okiennej. Prace przy jednym oknie zajmują zwykle 2–3 godziny i nie wymagają robót murarskich.",
      },
      {
        q: "Jak roleta zachowa się przy braku prądu?",
        a: "Standardowo pancerz pozostaje w ostatniej pozycji. Na życzenie montujemy awaryjne otwieranie korbą lub zasilanie akumulatorowe podtrzymujące pracę napędu przez kilkanaście cykli.",
      },
    ],
    meta: {
      title: "Rolety antywłamaniowe RC2 — montaż i serwis Warszawa",
      description:
        "Certyfikowane rolety antywłamaniowe klasy RC2 wg PN-EN 1627. Montaż, serwis i przeglądy w Warszawie i okolicach. Protokół montażu dla ubezpieczyciela.",
      keywords: [
        "rolety antywlamaniowe RC2",
        "rolety RC2 Warszawa",
        "rolety antywlamaniowe montaz",
        "rolety zewnetrzne antywlamaniowe",
        "certyfikat RC2 PN-EN 1627",
      ],
    },
    projectCategories: ["rc2"],
  },
  {
    slug: OFFER_SLUGS.RC3,
    navLabel: "Rolety antywłamaniowe RC3",
    title: "Rolety antywłamaniowe RC3",
    cardTitle: "Rolety RC3",
    eyebrow: "Klasa odporności RC3",
    badge: "Najwyższa ochrona",
    icon: "shieldCheck",
    tagline: "Maksymalna klasa dla willi i obiektów o podwyższonym ryzyku",
    excerpt:
      "Pancerz z profili ekstrudowanych, podwójne ryglowanie i prowadnice kotwione w konstrukcji. Ochrona tam, gdzie RC2 to za mało.",
    highlights: [
      "Certyfikat klasy RC3 wg PN-EN 1627",
      "Profile ekstrudowane, bez wypełnienia pianką",
      "Wymagane przez ubezpieczycieli przy wysokich sumach",
    ],
    intro: [
      "Klasa RC3 to wyższy poziom odporności: konstrukcja musi wytrzymać co najmniej pięć minut ataku prowadzonego dodatkowym łomem i narzędziami umożliwiającymi podważanie z dużą siłą. To standard stosowany w willach, domach z dużymi przeszkleniami, kancelariach, gabinetach lekarskich i obiektach, w których przechowywane są wartościowe przedmioty.",
      "Różnica względem RC2 jest konstrukcyjna, nie kosmetyczna. Pancerz wykonany jest z profili ekstrudowanych — pełnych, walcowanych profili aluminiowych bez rdzenia z pianki. Prowadnice mają większy przekrój i są kotwione bezpośrednio w konstrukcji nośnej, a nie w warstwie ocieplenia. Pancerz ryglowany jest wielopunktowo, a listwa dolna wzmocniona stalowym wkładem.",
      "Rolety RC3 są cięższe i wymagają mocniejszych napędów, dlatego każdy projekt liczymy indywidualnie — od nośności nadproża po dobór momentu silnika. Przy dużych przeszkleniach tarasowych stosujemy pancerze dzielone lub podwójne prowadnice.",
    ],
    features: [
      {
        icon: "shieldCheck",
        title: "Pięć minut oporu",
        description:
          "Badanie wg PN-EN 1630 z narzędziami kategorii A3 — łom, dłuto, młotek. Klasa potwierdzona certyfikatem.",
      },
      {
        icon: "layers",
        title: "Profile ekstrudowane",
        description:
          "Pełne profile aluminiowe o grubości ścianki do 3 mm. Brak rdzenia z pianki oznacza wielokrotnie większą sztywność.",
      },
      {
        icon: "lock",
        title: "Ryglowanie wielopunktowe",
        description:
          "Blokady w prowadnicach i w listwie dolnej rozkładają obciążenie na całą szerokość pancerza.",
      },
      {
        icon: "ruler",
        title: "Kotwienie w konstrukcji",
        description:
          "Prowadnice mocowane do nadproża i muru nośnego, z pominięciem warstwy ocieplenia — zgodnie z wytycznymi certyfikatu.",
      },
      {
        icon: "gauge",
        title: "Napędy o podwyższonym momencie",
        description:
          "Silniki dobierane do rzeczywistej masy pancerza, z zapasem momentu i zabezpieczeniem przed przeciążeniem.",
      },
      {
        icon: "bolt",
        title: "Integracja z alarmem",
        description:
          "Styki kontrolne położenia pancerza podłączane do centrali alarmowej lub systemu automatyki budynku.",
      },
    ],
    specs: [
      { label: "Klasa odporności", value: "RC3 wg PN-EN 1627/1630" },
      { label: "Czas oporu", value: "min. 5 minut (narzędzia kat. A3)" },
      { label: "Profil pancerza", value: "Ekstrudowane aluminium, ścianka do 3 mm" },
      { label: "Masa pancerza", value: "12–17 kg/m² zależnie od profilu" },
      { label: "Prowadnice", value: "Wzmocnione, kotwione w konstrukcji nośnej" },
      { label: "Ryglowanie", value: "Wielopunktowe, pancerz + listwa dolna" },
      { label: "Maks. szerokość", value: "do 4,5 m w jednym pancerzu" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "RC3 okienna",
        description:
          "Standardowe zastosowanie przy oknach parteru i kondygnacji dostępnych z poziomu terenu lub dachu garażu.",
        points: [
          "Pancerz ekstrudowany 45 mm",
          "Blokady w obu prowadnicach",
          "Skrzynka nakładana lub podtynkowa",
        ],
      },
      {
        name: "RC3 tarasowa",
        description:
          "Rozwiązanie do przeszkleń przesuwnych HS i dużych witryn. Pancerz dzielony lub prowadzony w dwóch torach.",
        points: [
          "Szerokości powyżej 3 m",
          "Wzmocniona listwa dolna ze stalowym wkładem",
          "Napęd z zabezpieczeniem przeciążeniowym",
        ],
      },
      {
        name: "RC3 dla obiektów",
        description:
          "Gabinety, kancelarie, lombardy, apteki i punkty handlowe — z rejestracją stanu pancerza w systemie alarmowym.",
        points: [
          "Styki kontrolne położenia",
          "Sterowanie grupowe całą fasadą",
          "Harmonogramy otwierania i zamykania",
        ],
      },
    ],
    installation: {
      lead: "Rolety RC3 ważą nawet trzykrotnie więcej niż rolety standardowe — montaż zaczynamy od weryfikacji, czy budynek jest na nie przygotowany.",
      points: [
        "Ocena nośności nadproża i sposobu kotwienia przed przyjęciem zlecenia",
        "Dobór kotew i punktów mocowania zgodny z dokumentacją certyfikacyjną zestawu",
        "Montaż z pominięciem warstwy ocieplenia — prowadnice zawsze w konstrukcji nośnej",
        "Dobór napędu do rzeczywistej masy pancerza, z zapasem momentu obrotowego",
        "Protokół odbioru z numerem certyfikatu i dokumentacją fotograficzną kotwienia",
      ],
    },
    service: {
      lead: "Cięższy pancerz to większe obciążenie mechanizmów. Regularny przegląd jest tu warunkiem utrzymania klasy odporności.",
      points: [
        "Przegląd techniczny raz w roku z kontrolą momentu dokręcenia kotew",
        "Kontrola i regulacja ryglowania wielopunktowego",
        "Wymiana rolek, zawieszek i uszczelek prowadnic",
        "Diagnostyka napędów i sterowników, z wymianą na kompatybilne modele",
        "Serwis awaryjny dla obiektów komercyjnych — priorytetowy termin",
      ],
    },
    faq: [
      {
        q: "Kiedy RC3 ma sens zamiast RC2?",
        a: "Gdy budynek jest oddalony od sąsiadów lub osłonięty od ulicy, gdy w domu przechowywane są wartościowe przedmioty, gdy ubezpieczyciel wymaga wyższej klasy przy dużej sumie ubezpieczenia albo gdy okna parteru łatwo dostępne są z ogrodu, dachu garażu czy tarasu.",
      },
      {
        q: "Czy roletę RC3 można zamontować w istniejącym budynku?",
        a: "Zwykle tak, ale wymaga to sprawdzenia nadproża i sposobu kotwienia. Prowadnice muszą trafić w konstrukcję nośną — sama warstwa ocieplenia lub tynku nie przeniesie obciążeń. Ocenę wykonujemy bezpłatnie podczas pomiaru.",
      },
      {
        q: "Czy rolety RC3 są głośniejsze w pracy?",
        a: "Nie. Cięższy pancerz pracuje na mocniejszym napędzie i z dokładniej dobranymi rolkami, więc poziom hałasu jest porównywalny z RC2. Różnicę słychać dopiero przy zaniedbanym serwisie i wysuszonych uszczelkach.",
      },
      {
        q: "Czy można łączyć RC3 z automatyką i alarmem?",
        a: "Tak. Standardowo montujemy sterowanie radiowe, a na życzenie dokładamy styki kontrolne informujące centralę alarmową o pozycji pancerza oraz integrację ze sterowaniem całą fasadą.",
      },
    ],
    meta: {
      title: "Rolety antywłamaniowe RC3 — najwyższa klasa ochrony, Warszawa",
      description:
        "Rolety antywłamaniowe klasy RC3 z profili ekstrudowanych. Certyfikat PN-EN 1627, ryglowanie wielopunktowe, montaż i serwis w Warszawie i okolicach.",
      keywords: [
        "rolety antywlamaniowe RC3",
        "rolety RC3 Warszawa",
        "rolety antywlamaniowe willa",
        "rolety klasa RC3 certyfikat",
        "zabezpieczenie okien RC3",
      ],
    },
    projectCategories: ["rc3"],
  },
  {
    slug: OFFER_SLUGS.ADAPTIVE,
    navLabel: "Rolety adaptacyjne",
    title: "Rolety adaptacyjne",
    cardTitle: "Rolety adaptacyjne",
    eyebrow: "Światło pod kontrolą",
    icon: "sun",
    tagline: "Roleta i żaluzja fasadowa w jednym pancerzu",
    excerpt:
      "Uchylne lamele pozwalają wpuścić światło przy opuszczonym pancerzu. Prywatność bez ciemności i bez rezygnacji z widoku.",
    highlights: [
      "Płynna regulacja kąta lameli",
      "Światło dzienne przy zamkniętej rolecie",
      "Automatyka pogodowa w standardzie",
    ],
    intro: [
      "Roleta adaptacyjna rozwiązuje problem, który ma każda klasyczna roleta zewnętrzna: opuszczona zasłania wszystko. Tutaj po osiągnięciu dolnego położenia pancerz rozsuwa się, a lamele odchylają się o zadany kąt. Do wnętrza wpada rozproszone światło dzienne, powietrze swobodnie przepływa, a z zewnątrz nadal nie widać, co dzieje się w pomieszczeniu.",
      "To rozwiązanie sprawdza się w domach z dużymi przeszkleniami od południa i zachodu, w biurach, w których liczy się komfort pracy przy monitorze, oraz wszędzie tam, gdzie przez pół roku trzeba wybierać między przegrzaniem a sztucznym światłem. Osłona zatrzymuje promieniowanie przed szybą, więc działa skuteczniej niż jakakolwiek roleta wewnętrzna.",
      "Sterowanie prowadzimy automatyką pogodową: czujnik nasłonecznienia przymyka lamele, gdy słońce operuje na elewację, a czujnik wiatru zwija pancerz, zanim podmuch stanie się niebezpieczny. Dzięki temu instalacja pracuje bez udziału domowników.",
    ],
    features: [
      {
        icon: "sun",
        title: "Regulacja kąta lameli",
        description:
          "Od pełnego zaciemnienia do prześwitu — ustawienie zapamiętywane i przywoływane jednym przyciskiem.",
      },
      {
        icon: "thermometer",
        title: "Ochrona przed przegrzewaniem",
        description:
          "Osłona po zewnętrznej stronie szyby odcina promieniowanie, zanim nagrzeje wnętrze. Realna ulga dla klimatyzacji.",
      },
      {
        icon: "remote",
        title: "Automatyka pogodowa",
        description:
          "Czujniki słońca, wiatru i temperatury sterują pancerzem bez udziału użytkownika, z priorytetem bezpieczeństwa.",
      },
      {
        icon: "volume",
        title: "Cicha praca",
        description:
          "Lamele prowadzone na taśmach i rolkach z tworzywa — bez metalicznego klekotu przy zmianie położenia.",
      },
      {
        icon: "layers",
        title: "Smukły pancerz",
        description:
          "Lamele o wysokości 65–90 mm zwijane w kompaktową skrzynkę, również w wersji ukrytej w elewacji.",
      },
      {
        icon: "house",
        title: "Dwie funkcje, jedno urządzenie",
        description:
          "Zastępuje komplet: roletę zaciemniającą i żaluzję fasadową. Jeden otwór montażowy, jeden napęd, jedno sterowanie.",
      },
    ],
    specs: [
      { label: "Typ osłony", value: "Roleta z uchylnymi lamelami (adaptacyjna)" },
      { label: "Wysokość lameli", value: "65 / 80 / 90 mm" },
      { label: "Kąt otwarcia", value: "Płynny, do ok. 70°" },
      { label: "Maks. szerokość", value: "do 4 m w jednym pancerzu" },
      { label: "Maks. powierzchnia", value: "do 12 m² na jedną osłonę" },
      { label: "Odporność na wiatr", value: "Klasa 5 wg PN-EN 13659 (zależnie od wymiaru)" },
      { label: "Sterowanie", value: "Radiowe, pilot, przycisk, automatyka pogodowa" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "Adaptacyjna standardowa",
        description:
          "Podstawowa wersja do okien pionowych w domach jednorodzinnych i mieszkaniach z balkonem.",
        points: [
          "Lamele 65 mm",
          "Skrzynka nakładana",
          "Sterowanie radiowe z pilotem",
        ],
      },
      {
        name: "Adaptacyjna fasadowa",
        description:
          "Wersja do dużych przeszkleń i elewacji biurowych, z prowadnicami linkowymi lub szynowymi.",
        points: [
          "Lamele 80–90 mm",
          "Sterowanie grupowe całą fasadą",
          "Czujniki nasłonecznienia i wiatru",
        ],
      },
      {
        name: "Adaptacyjna w wersji podtynkowej",
        description:
          "Skrzynka ukryta w warstwie ocieplenia — z zewnątrz widoczne pozostają tylko lamele i prowadnice.",
        points: [
          "Planowana na etapie budowy",
          "Rewizja od strony wnętrza",
          "Brak mostków termicznych",
        ],
      },
    ],
    installation: {
      lead: "Efekt zależy od geometrii okna i strony świata. Podczas pomiaru ustalamy kąt pracy lameli, a nie tylko wymiary.",
      points: [
        "Analiza nasłonecznienia elewacji i dobór wysokości lameli",
        "Pomiar z uwzględnieniem głębokości wnęki i sposobu otwierania okna",
        "Montaż prowadnic z zachowaniem swobody pracy lameli na całej wysokości",
        "Uruchomienie napędu, zaprogramowanie pozycji pośrednich i scen",
        "Kalibracja czujników wiatru i słońca oraz instruktaż obsługi",
      ],
    },
    service: {
      lead: "Mechanizm uchylania lameli wymaga innej obsługi niż zwykła roleta — serwisujemy go u każdego klienta, także po latach.",
      points: [
        "Przegląd naciągu taśm i stanu zawieszek lameli",
        "Kalibracja położeń pośrednich po wymianie napędu lub baterii w czujnikach",
        "Wymiana uszkodzonych lameli bez demontażu całego pancerza",
        "Regulacja czujników pogodowych i korekta scenariuszy automatyki",
        "Modernizacja starszych instalacji: dodanie automatyki do rolet sterowanych ręcznie",
      ],
    },
    faq: [
      {
        q: "Czym roleta adaptacyjna różni się od żaluzji fasadowej?",
        a: "Żaluzja fasadowa ma sztywne lamele prowadzone w szynach i jest osłoną wyłącznie przeciwsłoneczną. Roleta adaptacyjna zwija się jak klasyczna roleta do skrzynki, a funkcję regulacji światła uzyskuje dopiero w dolnym położeniu. Zajmuje mniej miejsca i pełni obie role naraz.",
      },
      {
        q: "Czy rolety adaptacyjne zaciemniają pomieszczenie?",
        a: "Tak, po zamknięciu lameli uzyskujemy pełne zaciemnienie, porównywalne z klasyczną roletą zewnętrzną. Różnica polega na tym, że można je otworzyć stopniowo, bez podnoszenia całego pancerza.",
      },
      {
        q: "Jak zachowują się przy silnym wietrze?",
        a: "Czujnik wiatru automatycznie zwija pancerz po przekroczeniu ustawionego progu. Bez czujnika osłona pozostaje w miejscu do granicy odporności deklarowanej dla danego wymiaru — dlatego przy dużych powierzchniach montujemy czujnik standardowo.",
      },
      {
        q: "Czy mogą zastąpić rolety antywłamaniowe?",
        a: "Nie. Rolety adaptacyjne odpowiadają za komfort świetlny i termiczny, a nie za ochronę przed włamaniem. Jeśli potrzebne są obie funkcje, stosujemy rolety adaptacyjne na piętrze i rolety RC2 lub RC3 na kondygnacjach dostępnych z zewnątrz.",
      },
    ],
    meta: {
      title: "Rolety adaptacyjne — regulacja światła, montaż Warszawa",
      description:
        "Rolety adaptacyjne z uchylnymi lamelami: światło dzienne przy zamkniętym pancerzu, ochrona przed przegrzewaniem, automatyka pogodowa. Montaż i serwis.",
      keywords: [
        "rolety adaptacyjne",
        "rolety adaptacyjne Warszawa",
        "rolety z uchylnymi lamelami",
        "rolety zewnetrzne regulacja swiatla",
        "oslony przeciwsloneczne fasadowe",
      ],
    },
    projectCategories: ["adaptive"],
  },
  {
    slug: OFFER_SLUGS.RECESSED,
    navLabel: "Rolety podtynkowe",
    title: "Rolety podtynkowe",
    cardTitle: "Rolety podtynkowe",
    eyebrow: "Ukryte w elewacji",
    icon: "layers",
    tagline: "Czysta bryła budynku bez widocznej skrzynki",
    excerpt:
      "Skrzynka schowana w warstwie ocieplenia lub nadprożu. Z zewnątrz widać wyłącznie prowadnice, a ciepło nie ucieka mostkiem termicznym.",
    highlights: [
      "Skrzynka niewidoczna z zewnątrz",
      "Bez mostka termicznego nad oknem",
      "Rewizja serwisowa od wnętrza",
    ],
    intro: [
      "Roleta podtynkowa to rozwiązanie dla inwestorów, którzy planują osłony na etapie budowy. Skrzynka trafia w warstwę ocieplenia lub w przygotowane nadproże, zanim położony zostanie tynk. Po zakończeniu prac elewacja pozostaje gładka — widoczne są tylko prowadnice przy ościeżu i listwa dolna pancerza.",
      "Poza estetyką liczy się energetyka. Skrzynka nakładana zawsze tworzy pewien mostek termiczny nad oknem. Wersja podtynkowa, poprawnie ocieplona i uszczelniona, tego problemu nie ma — izolacja przebiega nad nią bez przerwy, a rewizja otwierana jest od wewnątrz pomieszczenia, nie od strony elewacji.",
      "Podtynkowo montujemy zarówno rolety standardowe, jak i pancerze antywłamaniowe RC2 oraz rolety adaptacyjne. Warunkiem jest wcześniejsze uzgodnienie wymiarów nadproża, bo skrzynka musi być wpisana w projekt, zanim powstanie stan surowy.",
    ],
    features: [
      {
        icon: "layers",
        title: "Zabudowa w ociepleniu",
        description:
          "Skrzynka ze styropianu lub kompozytu wtapiana w warstwę izolacji — elewacja zostaje równa.",
      },
      {
        icon: "thermometer",
        title: "Ciągła izolacja nad oknem",
        description:
          "Brak przerwy w warstwie ocieplenia to niższe straty ciepła i brak wykraplania na nadprożu.",
      },
      {
        icon: "wrench",
        title: "Rewizja od wewnątrz",
        description:
          "Dostęp serwisowy przez klapę w nadprożu — naprawa nie wymaga rusztowania ani ingerencji w tynk.",
      },
      {
        icon: "volume",
        title: "Cichsza praca",
        description:
          "Skrzynka otoczona izolacją tłumi dźwięk pracy napędu lepiej niż wersja nakładana.",
      },
      {
        icon: "shield",
        title: "Również w wersji RC2",
        description:
          "Ukryta skrzynka nie wyklucza certyfikowanej ochrony — pancerz antywłamaniowy montujemy podtynkowo.",
      },
      {
        icon: "ruler",
        title: "Wsparcie na etapie projektu",
        description:
          "Podajemy wymiary nadproży i rozstaw prowadnic zanim wykonawca zacznie murować.",
      },
    ],
    specs: [
      { label: "Typ skrzynki", value: "Podtynkowa, w warstwie ocieplenia lub nadprożu" },
      { label: "Wysokość skrzynki", value: "205 / 245 / 300 mm" },
      { label: "Materiał skrzynki", value: "Styropian EPS z wzmocnieniem, kompozyt" },
      { label: "Rewizja", value: "Od strony wnętrza, klapa w nadprożu" },
      { label: "Dostępne pancerze", value: "Standardowy, RC2, adaptacyjny" },
      { label: "Etap montażu", value: "Stan surowy — przed tynkowaniem" },
      { label: "Sterowanie", value: "Radiowe, przewodowe lub automatyka budynku" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "W warstwie ocieplenia",
        description:
          "Najczęstsze rozwiązanie w domach jednorodzinnych — skrzynka wtapiana w styropian elewacyjny.",
        points: [
          "Montaż po wykonaniu stanu surowego",
          "Ocieplenie prowadzone bez przerwy",
          "Prowadnice licowane z ościeżem",
        ],
      },
      {
        name: "Nadprożowa",
        description:
          "Skrzynka stanowi element nadproża i przenosi obciążenia — wymaga uzgodnienia z konstruktorem.",
        points: [
          "Pełna integracja z murem",
          "Największa oszczędność miejsca",
          "Konieczne ustalenie na etapie projektu",
        ],
      },
      {
        name: "Renowacyjna",
        description:
          "Wersja do budynków docieplanych — skrzynkę ukrywamy przy okazji termomodernizacji elewacji.",
        points: [
          "Montaż podczas docieplania budynku",
          "Wymiana starych rolet natynkowych",
          "Poprawa parametrów cieplnych nadproża",
        ],
      },
    ],
    installation: {
      lead: "Roleta podtynkowa to element budynku, nie dodatek — im wcześniej wejdziemy w projekt, tym mniej kosztownych korekt.",
      points: [
        "Konsultacja wymiarów nadproży i rozstawu prowadnic przed stanem surowym",
        "Dostarczenie skrzynek i rur na budowę w ustalonym terminie",
        "Montaż skrzynek przed ociepleniem, z przygotowaniem przepustów elektrycznych",
        "Powrót po tynkach: montaż pancerza, prowadnic i napędu",
        "Uruchomienie, programowanie sterowania i przekazanie dokumentacji",
      ],
    },
    service: {
      lead: "Ukryta skrzynka nie oznacza utrudnionego serwisu — dostęp prowadzimy przez rewizję od wewnątrz.",
      points: [
        "Przeglądy z kontrolą naciągu pancerza i stanu prowadnic",
        "Wymiana napędu bez naruszania elewacji i tynku",
        "Uszczelnianie i regulacja rewizji, gdy pojawia się przewiew",
        "Naprawa rolet podtynkowych montowanych przez inne firmy",
        "Modernizacja sterowania: zamiana taśmy lub korby na napęd elektryczny",
      ],
    },
    faq: [
      {
        q: "Na jakim etapie budowy trzeba zamówić rolety podtynkowe?",
        a: "Najpóźniej przed wykonaniem nadproży, czyli w trakcie stanu surowego. Skrzynka ma określoną wysokość, którą trzeba uwzględnić w murze i w wymiarze otworu okiennego. Zgłoszenie po otynkowaniu elewacji oznacza konieczność montażu wersji nakładanej.",
      },
      {
        q: "Czy serwis wymaga skuwania tynku?",
        a: "Nie. Każda skrzynka ma rewizję dostępną od strony pomieszczenia. Przez nią wymieniamy napęd, regulujemy naciąg i wykonujemy naprawy pancerza.",
      },
      {
        q: "Czy roleta podtynkowa może być antywłamaniowa?",
        a: "Tak, montujemy podtynkowo zestawy klasy RC2. Warunkiem zachowania certyfikatu jest kotwienie prowadnic w konstrukcji nośnej oraz zastosowanie skrzynki przewidzianej przez producenta dla danego zestawu.",
      },
      {
        q: "Czy da się ukryć skrzynkę w istniejącym budynku?",
        a: "Tak, jeśli planowane jest docieplenie elewacji. Przy okazji termomodernizacji skrzynka trafia w nową warstwę styropianu. W budynku bez takich prac pozostaje wersja nakładana lub montaż we wnęce okiennej.",
      },
    ],
    meta: {
      title: "Rolety podtynkowe — skrzynka ukryta w elewacji, Warszawa",
      description:
        "Rolety podtynkowe montowane w warstwie ocieplenia i nadprożu. Bez mostka termicznego, z rewizją od wewnątrz. Doradztwo na etapie budowy, montaż i serwis.",
      keywords: [
        "rolety podtynkowe",
        "rolety podtynkowe Warszawa",
        "rolety w warstwie ocieplenia",
        "skrzynka rolety nadprozowa",
        "rolety zewnetrzne nowy dom",
      ],
    },
    projectCategories: ["recessed"],
  },
  {
    slug: OFFER_SLUGS.ROLLER_GATES,
    navLabel: "Bramy rolowane",
    title: "Bramy rolowane",
    cardTitle: "Bramy rolowane",
    eyebrow: "Garaże i obiekty",
    icon: "warehouse",
    tagline: "Zero miejsca pod sufitem, pełna automatyka wjazdu",
    excerpt:
      "Pancerz zwijany do skrzynki nad wjazdem zamiast prowadnic pod stropem. Rozwiązanie do niskich garaży, hal i punktów usługowych.",
    highlights: [
      "Brak prowadnic pod stropem garażu",
      "Praca w garażach o niskim nadprożu",
      "Automatyka z awaryjnym otwieraniem",
    ],
    intro: [
      "Brama rolowana zwija się na wał umieszczony w skrzynce nad wjazdem, zamiast odjeżdżać pod strop jak brama segmentowa. Dzięki temu cała przestrzeń garażu pozostaje wolna — można pod sufitem poprowadzić instalacje, zawiesić regały czy zamontować oświetlenie bez kolidowania z prowadnicami.",
      "To rozwiązanie sprawdza się przede wszystkim w garażach o niskim nadprożu, w zabudowie szeregowej, przy wjazdach do hal oraz w punktach handlowych i usługowych, gdzie brama pełni jednocześnie funkcję zabezpieczenia witryny po godzinach pracy.",
      "Każdą bramę wyposażamy w napęd z awaryjnym otwieraniem, fotokomórki i listwę krawędziową. W obiektach komercyjnych dokładamy sterowanie grupowe, pętlę indukcyjną lub integrację z systemem kontroli dostępu.",
    ],
    features: [
      {
        icon: "warehouse",
        title: "Oszczędność przestrzeni",
        description:
          "Pancerz zwijany nad otworem — strop i ściany boczne garażu pozostają w pełni dostępne.",
      },
      {
        icon: "bolt",
        title: "Napęd z otwieraniem awaryjnym",
        description:
          "Silnik w wale z mechanizmem ręcznym lub zasilaniem akumulatorowym na wypadek braku prądu.",
      },
      {
        icon: "shield",
        title: "Zabezpieczenia krawędziowe",
        description:
          "Fotokomórki i listwa krawędziowa zatrzymują pancerz przy napotkaniu przeszkody.",
      },
      {
        icon: "ruler",
        title: "Praca przy niskim nadprożu",
        description:
          "Skrzynka wymaga zwykle 30–40 cm nad otworem — mniej niż prowadnice bramy segmentowej.",
      },
      {
        icon: "remote",
        title: "Sterowanie pod obiekt",
        description:
          "Piloty, klawiatury kodowe, breloki zbliżeniowe, sterowanie z telefonu lub pętla indukcyjna.",
      },
      {
        icon: "certificate",
        title: "Wersje wzmocnione",
        description:
          "Profile o zwiększonej sztywności i ryglowanie pancerza tam, gdzie brama pełni funkcję zabezpieczenia.",
      },
    ],
    specs: [
      { label: "Typ", value: "Brama rolowana z napędem w wale" },
      { label: "Maks. szerokość", value: "do 6 m (wersje przemysłowe większe)" },
      { label: "Wymagane nadproże", value: "od 30 cm zależnie od średnicy zwoju" },
      { label: "Profil pancerza", value: "Aluminiowy wypełniony pianką lub ekstrudowany" },
      { label: "Prędkość pracy", value: "ok. 0,15 m/s" },
      { label: "Zabezpieczenia", value: "Fotokomórki, listwa krawędziowa, kontrola przeszkody" },
      { label: "Otwieranie awaryjne", value: "Ręczne lub akumulatorowe" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "Garażowa",
        description:
          "Podstawowa wersja do domów jednorodzinnych i zabudowy szeregowej, z pancerzem wypełnionym pianką.",
        points: [
          "Napęd z pilotem w komplecie",
          "Skrzynka nakładana lub wnękowa",
          "Kolory z palety RAL",
        ],
      },
      {
        name: "Wzmocniona",
        description:
          "Profile ekstrudowane i ryglowanie pancerza — tam, gdzie brama chroni magazyn lub wartościowe wyposażenie.",
        points: [
          "Sztywniejszy pancerz",
          "Rygle boczne pancerza",
          "Możliwa integracja z alarmem",
        ],
      },
      {
        name: "Obiektowa",
        description:
          "Wjazdy do hal, parkingów podziemnych i punktów usługowych, z automatyką ruchu i kontrolą dostępu.",
        points: [
          "Pętla indukcyjna i czujniki ruchu",
          "Sterowanie grupowe i harmonogramy",
          "Integracja z kontrolą dostępu",
        ],
      },
    ],
    installation: {
      lead: "Montaż zaczynamy od pomiaru nadproża i ościeży — to one decydują, czy brama rolowana w ogóle zmieści się w otworze.",
      points: [
        "Pomiar otworu, nadproża i przestrzeni bocznych przed wyceną",
        "Dobór średnicy wału i typu skrzynki do dostępnej wysokości",
        "Montaż prowadnic, wału i pancerza wraz z podłączeniem elektrycznym",
        "Konfiguracja napędu, krańcówek, fotokomórek i listwy krawędziowej",
        "Testy zabezpieczeń, instruktaż obsługi i przekazanie pilotów",
      ],
    },
    service: {
      lead: "Brama pracuje kilka razy dziennie przez cały rok — to najbardziej eksploatowany element wyposażenia budynku.",
      points: [
        "Przeglądy okresowe: naciąg, prowadnice, zabezpieczenia, stan pancerza",
        "Wymiana napędów i sterowników, także w bramach innych producentów",
        "Naprawa uszkodzonych profili bez wymiany całego pancerza",
        "Dorabianie pilotów, wymiana klawiatur i czytników",
        "Serwis awaryjny przy zablokowanej bramie — priorytet dla obiektów komercyjnych",
      ],
    },
    faq: [
      {
        q: "Ile miejsca nad wjazdem wymaga brama rolowana?",
        a: "Zwykle od 30 do 40 cm, zależnie od wysokości otworu i średnicy zwiniętego pancerza. To mniej niż potrzebuje brama segmentowa z prowadnicami pod stropem, dlatego bramy rolowane są standardem w niskich garażach.",
      },
      {
        q: "Co się stanie przy braku prądu?",
        a: "Każdą bramę wyposażamy w otwieranie awaryjne. W wersji podstawowej jest to mechanizm ręczny odblokowujący napęd, w rozbudowanej — zasilanie akumulatorowe pozwalające na kilkanaście cykli pracy.",
      },
      {
        q: "Czy brama rolowana zabezpiecza przed włamaniem?",
        a: "Wersja standardowa jest przede wszystkim osłoną. Jeśli brama ma pełnić funkcję zabezpieczenia, stosujemy pancerz z profili ekstrudowanych i ryglowanie boczne, opcjonalnie z podłączeniem do systemu alarmowego.",
      },
      {
        q: "Czy serwisujecie bramy zamontowane przez inną firmę?",
        a: "Tak. Naprawiamy i przeglądamy bramy rolowane niezależnie od tego, kto je montował — o ile dostępne są części zamienne lub możliwa jest wymiana napędu na kompatybilny model.",
      },
    ],
    meta: {
      title: "Bramy rolowane — montaż i serwis, Warszawa i okolice",
      description:
        "Bramy rolowane garażowe i obiektowe: praca przy niskim nadprożu, napęd z otwieraniem awaryjnym, fotokomórki i listwa krawędziowa. Montaż, serwis, naprawy.",
      keywords: [
        "bramy rolowane",
        "bramy rolowane Warszawa",
        "brama garazowa rolowana",
        "montaz bram rolowanych",
        "serwis bram rolowanych",
      ],
    },
    projectCategories: ["rollerGates"],
  },
];

export const getOfferProduct = (slug: string): OfferProduct | undefined =>
  OFFER_PRODUCTS.find((product) => product.slug === slug);

export const getOfferSlugs = (): string[] =>
  OFFER_PRODUCTS.map((product) => product.slug);
