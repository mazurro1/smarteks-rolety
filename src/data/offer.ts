import { CONTACT_INFO } from "@/constants/contact";
import { OFFER_SLUGS, blogPath, offerPath, projectPath } from "@/constants/routes";
import { SOMFY_IMAGES } from "@/data/media";
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
    heroTitle: "Rolety antywłamaniowe RC2 w Warszawie",
    cardTitle: "Rolety RC2",
    eyebrow: "Klasa odporności RC2",
    badge: "Do domów na osiedlach",
    icon: "shield",
    image: { ...SOMFY_IMAGES.shuttersCornerRemote, position: "center 35%" },
    tagline: "Certyfikowana ochrona dla domów i mieszkań",
    excerpt:
      "Certyfikowana bariera przed włamaniem przez okno. Wzmocnione pancerze, blokady antypodnoszeniowe i prowadnice, które nie ustępują pod naporem łomu.",
    highlights: [
      "Certyfikat klasy RC2 wg PN-EN 1627",
      "Blokady antypodnoszeniowe w każdej rolecie",
      "Akceptowane przez towarzystwa ubezpieczeniowe",
    ],
    intro: [
      "Rolety antywłamaniowe zewnętrzne klasy RC2 to zabezpieczenie okien w domach jednorodzinnych i mieszkaniach na parterze. Klasa RC2 oznacza, że konstrukcja przez co najmniej trzy minuty opiera się próbie sforsowania prostymi narzędziami - śrubokrętem, klinem czy niewielkim łomem. Przez ten czas hałas przy oknie może zwrócić uwagę sąsiadów.",
      "Odporność nie bierze się z samego pancerza. Składa się na nią pięć elementów: profil ekstrudowany z pełnego aluminium, wzmocnione prowadnice z zagłębieniem bocznym, blokady antypodnoszeniowe uniemożliwiające ręczne podniesienie pancerza, sztywna listwa dolna oraz prawidłowe zakotwienie całego zestawu w murze. Pominięcie któregokolwiek z nich sprawia, że roleta traci deklarowaną klasę.",
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
          "Mechaniczne rygle blokują pancerz w pozycji zamkniętej - rolety nie da się podnieść od zewnątrz.",
      },
      {
        icon: "layers",
        title: "Profil ekstrudowany",
        description:
          "Pełne profile aluminiowe PE 41 dają pancerzowi sztywność, której nie ma profil wypełniony pianką.",
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
          "Pełna paleta RAL, struktury drewnopodobne i skrzynki w kilku kształtach - również do montażu po zakończeniu budowy.",
      },
    ],
    specs: [
      { label: "System", value: "Aluprof Safety Plus" },
      { label: "Klasa odporności", value: "RC2 wg PN-EN 1627/1630" },
      { label: "Czas oporu", value: "min. 3 minuty (narzędzia kat. A2)" },
      { label: "Profil pancerza", value: "Aluminium ekstrudowane, profil PE 41 (41 mm)" },
      { label: "Prowadnice", value: "Wzmocnione, z uszczelką i głębokim zagłębieniem" },
      { label: "Blokady", value: "Antypodnoszeniowe, min. 2 na pancerz" },
      { label: "Napęd", value: "Silnik rurowy z hamulcem, sterowanie radiowe" },
      { label: "Zasilanie awaryjne", value: "Opcjonalne - korba lub akumulator" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    quickFactsCount: 5,
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
          "Prowadnica zintegrowana z moskitierą rolowaną - jedna rama, dwa niezależne pancerze.",
        points: [
          "Wspólna prowadnica dla rolety i moskitiery",
          "Brak dodatkowych otworów w elewacji",
          "Sterowanie rolety pozostaje elektryczne",
        ],
      },
    ],
    installation: {
      lead: "Montaż rolety antywłamaniowej różni się od montażu rolety zwykłej - o klasie RC2 decyduje sposób zakotwienia w murze, nie sam produkt.",
      points: [
        "Bezpłatny pomiar i ocena nadproża oraz warstwy ocieplenia przed wyceną",
        "Dobór kotew do rodzaju muru: beton, pustak ceramiczny, silikat, beton komórkowy",
        "Montaż prowadnic w rozstawie i z liczbą punktów mocowania wymaganą przez certyfikat",
        "Podłączenie elektryczne z zabezpieczeniem i konfiguracja krańcówek napędu",
        "Protokół montażu z numerem certyfikatu - dokument dla ubezpieczyciela",
      ],
    },
    service: {
      lead: "Roleta antywłamaniowa musi działać bezbłędnie latami. Zajmujemy się nią przez cały okres eksploatacji.",
      points: [
        "Przegląd raz w roku: kontrola blokad, prowadnic, naciągu i krańcówek",
        "Regulacja i wymiana zużytych elementów pancerza bez demontażu skrzynki",
        "Naprawy napędów rurowych i sterowników - najczęściej w jednej wizycie",
        "Wymiana rolet zwykłych na antywłamaniowe w istniejących prowadnicach, gdy pozwala na to konstrukcja",
        "Serwis pogwarancyjny również dla rolet montowanych przez inne firmy",
      ],
    },
    faq: [
      {
        q: "Czy rolety RC2 obniżają składkę ubezpieczenia?",
        a: "O tym decyduje ubezpieczyciel. Sprawdź ogólne warunki swojej polisy albo zapytaj agenta, czy bierze pod uwagę rolety z certyfikatem klasy RC2.",
      },
      {
        q: "Czym różni się roleta RC2 od zwykłej rolety zewnętrznej?",
        a: "Zwykła roleta pełni funkcję przeciwsłoneczną i można ją podnieść ręką od zewnątrz w kilka sekund. Roleta RC2 ma wypełniony pianką profil o większej sztywności, wzmocnione prowadnice z głębszym zagłębieniem, blokady antypodnoszeniowe oraz certyfikat wydany dla kompletnego zestawu, a nie dla pojedynczego elementu.",
      },
      {
        q: "Czy rolety RC2 można zamontować w gotowym domu?",
        a: "Tak. W budynkach oddanych do użytku montujemy wersję nakładaną - skrzynka trafia na elewację lub do wnęki okiennej. Prace przy jednym oknie zajmują zwykle 2-3 godziny i nie wymagają robót murarskich.",
      },
      {
        q: "Jak roleta zachowa się przy braku prądu?",
        a: "Standardowo pancerz pozostaje w ostatniej pozycji. Na życzenie montujemy awaryjne otwieranie korbą lub zasilanie akumulatorowe podtrzymujące pracę napędu przez kilkanaście cykli.",
      },
      {
        q: "Ile kosztują rolety antywłamaniowe RC2?",
        a: `Cena zależy od wymiarów i liczby okien, wersji (nakładana albo podtynkowa) i sterowania, dlatego podajemy ją po bezpłatnym pomiarze. Co wpływa na cenę rolet zewnętrznych, opisaliśmy w poradniku [ile kosztują rolety zewnętrzne](${blogPath("ile-kosztuja-rolety-zewnetrzne")}).`,
      },
      {
        q: "Czy rolety RC2 można kupić na raty?",
        a: `Tak. Zakup rolet z montażem możesz rozłożyć na raty. Kredytu udziela Santander Consumer Bank S.A., a Smarteks działa jako pośrednik kredytowy tego banku: informuje o możliwości skorzystania z kredytu i udostępnia wniosek. O przyznaniu kredytu i jego warunkach decyduje bank. Szczegóły: [zakupy na raty w Smarteks](${CONTACT_INFO.INSTALMENTS_URL}).`,
      },
    ],
    faqGuides: [
      {
        text: "Nie wiesz, którą klasę wybrać? Przeczytaj poradnik",
        linkLabel: "rolety RC2 czy RC3 – jak wybrać klasę",
        href: blogPath("rolety-rc2-czy-rc3-ktora-klase-wybrac"),
      },
    ],
    meta: {
      title: "Rolety antywłamaniowe zewnętrzne RC2",
      description:
        "Certyfikowane rolety antywłamaniowe zewnętrzne klasy RC2 wg PN-EN 1627. Montaż, serwis i przeglądy w Warszawie i okolicach.",
    },
    projectCategories: ["rc2"],
  },
  {
    slug: OFFER_SLUGS.RC3,
    navLabel: "Rolety antywłamaniowe RC3",
    title: "Rolety antywłamaniowe RC3",
    cardTitle: "Rolety RC3",
    eyebrow: "Klasa odporności RC3",
    badge: "Wyższa klasa ochrony",
    icon: "shieldCheck",
    image: { ...SOMFY_IMAGES.remoteShutterSlats, position: "center 30%" },
    tagline: "Dla domów wolnostojących w zacisznych miejscach",
    excerpt:
      "Pancerz z profili ekstrudowanych, podwójne ryglowanie i prowadnice kotwione w konstrukcji. Ochrona tam, gdzie RC2 to za mało.",
    highlights: [
      "Certyfikat klasy RC3 wg PN-EN 1627",
      "Profile ekstrudowane, bez wypełnienia pianką",
      "Wymagane przez ubezpieczycieli przy wysokich sumach",
    ],
    intro: [
      "Klasa RC3 to wyższy poziom odporności: konstrukcja musi wytrzymać co najmniej pięć minut ataku prowadzonego dodatkowym łomem i narzędziami umożliwiającymi podważanie z dużą siłą. To standard stosowany w willach, domach z dużymi przeszkleniami, kancelariach, gabinetach lekarskich i obiektach, w których przechowywane są wartościowe przedmioty.",
      "Różnica względem RC2 jest konstrukcyjna, nie kosmetyczna. Pancerz wykonany jest z profili ekstrudowanych - pełnych, walcowanych profili aluminiowych bez rdzenia z pianki. Prowadnice mają większy przekrój i są kotwione bezpośrednio w konstrukcji nośnej, a nie w warstwie ocieplenia. Pancerz ryglowany jest wielopunktowo, a listwa dolna wzmocniona stalowym wkładem.",
      "Rolety RC3 są cięższe i wymagają mocniejszych napędów, dlatego każdy projekt liczymy indywidualnie - od nośności nadproża po dobór momentu silnika. Przy dużych przeszkleniach tarasowych stosujemy pancerze dzielone lub podwójne prowadnice.",
    ],
    features: [
      {
        icon: "shieldCheck",
        title: "Pięć minut oporu",
        description:
          "Badanie wg PN-EN 1630 z narzędziami kategorii A3 - łom, dłuto, młotek. Klasa potwierdzona certyfikatem.",
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
          "Prowadnice mocowane do nadproża i muru nośnego, z pominięciem warstwy ocieplenia - zgodnie z wytycznymi certyfikatu.",
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
      { label: "System", value: "Aluprof Safety Premium" },
      { label: "Klasa odporności", value: "RC3 wg PN-EN 1627/1630" },
      { label: "Czas oporu", value: "min. 5 minut (narzędzia kat. A3)" },
      { label: "Profil pancerza", value: "Ekstrudowane aluminium, ścianka do 3 mm" },
      { label: "Masa pancerza", value: "8,7 kg/m² (profil Aluprof PE 55)" },
      { label: "Prowadnice", value: "Wzmocnione, kotwione w konstrukcji nośnej" },
      { label: "Ryglowanie", value: "Wielopunktowe, pancerz + listwa dolna" },
      { label: "Napęd", value: "tylko elektryczny" },
      { label: "Maks. szerokość", value: "do 4,5 m w jednym pancerzu" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    quickFactsCount: 5,
    variants: [
      {
        name: "RC3 okienna",
        description:
          "Standardowe zastosowanie przy oknach parteru i kondygnacji dostępnych z poziomu terenu lub dachu garażu.",
        points: [
          "Pancerz ekstrudowany 55 mm (PE 55)",
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
          "Gabinety, kancelarie, lombardy, apteki i punkty handlowe - z rejestracją stanu pancerza w systemie alarmowym.",
        points: [
          "Styki kontrolne położenia",
          "Sterowanie grupowe całą elewacją",
          "Harmonogramy otwierania i zamykania",
        ],
      },
    ],
    installation: {
      lead: "Rolety RC3 ważą nawet trzykrotnie więcej niż rolety standardowe - montaż zaczynamy od weryfikacji, czy budynek jest na nie przygotowany.",
      points: [
        "Ocena nośności nadproża i sposobu kotwienia przed przyjęciem zlecenia",
        "Dobór kotew i punktów mocowania zgodny z dokumentacją certyfikacyjną zestawu",
        "Montaż z pominięciem warstwy ocieplenia - prowadnice zawsze w konstrukcji nośnej",
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
        "Serwis awaryjny dla obiektów komercyjnych - priorytetowy termin",
      ],
    },
    faq: [
      {
        q: "Kiedy RC3 ma sens zamiast RC2?",
        a: "Gdy budynek jest oddalony od sąsiadów lub osłonięty od ulicy, gdy w domu przechowywane są wartościowe przedmioty, gdy ubezpieczyciel wymaga wyższej klasy przy dużej sumie ubezpieczenia albo gdy okna parteru łatwo dostępne są z ogrodu, dachu garażu czy tarasu.",
      },
      {
        q: "Czy roletę RC3 można zamontować w istniejącym budynku?",
        a: "Zwykle tak, ale wymaga to sprawdzenia nadproża i sposobu kotwienia. Prowadnice muszą trafić w konstrukcję nośną - sama warstwa ocieplenia lub tynku nie przeniesie obciążeń. Ocenę wykonujemy bezpłatnie podczas pomiaru.",
      },
      {
        q: "Czy rolety RC3 są głośniejsze w pracy?",
        a: "Nie. Cięższy pancerz pracuje na mocniejszym napędzie i z dokładniej dobranymi rolkami, więc poziom hałasu jest porównywalny z RC2. Różnicę słychać dopiero przy zaniedbanym serwisie i wysuszonych uszczelkach.",
      },
      {
        q: "Czy można łączyć RC3 z automatyką i alarmem?",
        a: "Tak. Standardowo montujemy sterowanie radiowe, a na życzenie dokładamy styki kontrolne informujące centralę alarmową o pozycji pancerza oraz integrację ze sterowaniem całą elewacją.",
      },
      {
        q: "Czy rolety RC3 można kupić na raty?",
        a: `Tak. Zakup rolet z montażem możesz rozłożyć na raty. Kredytu udziela Santander Consumer Bank S.A., a Smarteks działa jako pośrednik kredytowy tego banku: informuje o możliwości skorzystania z kredytu i udostępnia wniosek. O przyznaniu kredytu i jego warunkach decyduje bank. Szczegóły: [zakupy na raty w Smarteks](${CONTACT_INFO.INSTALMENTS_URL}).`,
      },
    ],
    faqGuides: [
      {
        text: "Zastanawiasz się, czy wystarczy RC2? Obie klasy porównaliśmy w poradniku",
        linkLabel: "rolety RC2 czy RC3 – jak wybrać klasę",
        href: blogPath("rolety-rc2-czy-rc3-ktora-klase-wybrac"),
      },
    ],
    meta: {
      title: "Rolety antywłamaniowe RC3 dla domów",
      description:
        "Rolety antywłamaniowe klasy RC3 z profili ekstrudowanych. Certyfikat PN-EN 1627, ryglowanie wielopunktowe, montaż i serwis w Warszawie i okolicach.",
    },
    projectCategories: ["rc3"],
  },
  {
    slug: OFFER_SLUGS.ADAPTIVE,
    navLabel: "Rolety adaptacyjne",
    title: "Rolety adaptacyjne",
    heroTitle: "Rolety adaptacyjne (natynkowe)",
    // Na podstronie bez etykiety i podtytulu pod H1 - opis jest we wstepie.
    heroEyebrow: null,
    heroLead: null,
    cardTitle: "Rolety adaptacyjne",
    eyebrow: "Do gotowych domów",
    badge: "Do gotowych domów",
    icon: "sun",
    image: { ...SOMFY_IMAGES.shutterGarden, position: "center 30%" },
    tagline:
      "Rolety montowane do gotowych okien, bez kucia ścian. Skrzynka na ścianie nad oknem albo we wnęce, w kilku kształtach i wielu kolorach.",
    excerpt:
      "Rolety montowane do gotowych okien, bez kucia ścian. Skrzynka na ścianie nad oknem albo we wnęce, w kilku kształtach i wielu kolorach.",
    highlights: [
      "Bez wymiany okien",
      "Skrzynka na ścianie lub we wnęce",
      "Napęd elektryczny",
    ],
    intro: [
      "Rolety adaptacyjne, nazywane też natynkowymi, to rolety zewnętrzne montowane do gotowych okien – bez wymiany okien i bez kucia ścian. Skrzynkę montuje się na ścianie nad oknem albo we wnęce okiennej, przy ramie okna. Montujemy rolety adaptacyjne Aluprof w domach i mieszkaniach w Warszawie i okolicach.",
    ],
    features: [],
    specs: [],
    quickFacts: [
      { label: "Typ osłony", value: "Roleta zewnętrzna do gotowych okien" },
      { label: "Skrzynka", value: "na elewacji lub we wnęce" },
      { label: "Napęd", value: "elektryczny – pilot, przycisk albo telefon" },
      { label: "Montaż", value: "w każdej chwili, także w gotowym domu" },
    ],
    variants: [],
    sections: [
      {
        title: "Dla kogo są rolety adaptacyjne",
        list: [
          "Dom lub mieszkanie już stoi i nie chcesz kuć ścian ani wymieniać okien.",
          "W nadprożu nie ma miejsca na ukrytą skrzynkę.",
        ],
        paragraphs: [
          `Jeśli budujesz dom, rozważ [rolety podtynkowe](${offerPath(OFFER_SLUGS.RECESSED)}) – ich skrzynkę zabudowuje się w elewacji i przykrywa tynkiem.`,
        ],
      },
      {
        title: "Skrzynka na elewacji czy we wnęce",
        paragraphs: [
          "Skrzynka może być ścięta pod kątem 45°, półowalna albo owalna i jest dostępna w wielu kolorach. Kształt, kolor i miejsce – elewację albo wnękę – dobieramy do budynku przy pomiarze.",
        ],
      },
      {
        title: "Napęd i sterowanie",
        paragraphs: [
          "Montujemy wyłącznie rolety z napędem elektrycznym. Sterujesz nimi pilotem, przyciskiem na ścianie albo z telefonu. Do okien trzeba doprowadzić zasilanie; sposób ustalamy przy pomiarze.",
        ],
      },
      {
        title: "Wersja antywłamaniowa",
        paragraphs: [
          `Zwykła roleta adaptacyjna nie ma normy włamaniowej – jej ochrona przed włamaniem jest symboliczna. Jeśli na tym Ci zależy, wybierz zestaw z certyfikatem – [rolety antywłamaniowe RC2](${offerPath(OFFER_SLUGS.RC2)}) też montuje się na gotowym budynku.`,
          `Szukasz rolet, które po zamknięciu przepuszczają światło? To inny produkt – rolety z regulacją światła. Jak działają, opisaliśmy w [poradniku](${blogPath("rolety-adaptacyjne-swiatlo-i-prywatnosc")}), a zamontowane zobaczysz [w apartamencie na Mokotowie](${projectPath("apartament-mokotow-rolety-adaptacyjne")}).`,
        ],
      },
    ],
    installation: {
      lead: "Efekt zależy od geometrii okna i strony świata. Podczas pomiaru ustalamy kąt pracy profili, a nie tylko wymiary.",
      points: [
        "Ocena miejsca na skrzynkę: elewacja albo wnęka okienna",
        "Pomiar z uwzględnieniem głębokości wnęki i sposobu otwierania okna",
        "Montaż prowadnic z zachowaniem swobody pracy pancerza na całej wysokości",
        "Uruchomienie napędu, programowanie krańcówek i scen",
        "Instruktaż obsługi",
      ],
    },
    service: {
      lead: "Mechanizm uchylania profili wymaga innej obsługi niż zwykła roleta - serwisujemy go u każdego klienta, także po latach.",
      points: [
        "Przegląd pancerza, zawieszek i prowadnic",
        "Wymiana uszkodzonych profili bez demontażu całego pancerza",
        "Korekta scen i harmonogramów sterowania",
        "Modernizacja starszych instalacji: dodanie automatyki do rolet sterowanych ręcznie",
      ],
    },
    faq: [
      {
        q: "Czym rolety adaptacyjne różnią się od podtynkowych?",
        a: "W roletach adaptacyjnych skrzynkę widać i można je dołożyć do domu, który już stoi. W podtynkowych skrzynki nie widać, bo przykrywa ją tynk – dlatego trzeba je zaplanować już na etapie projektu.",
      },
      {
        q: "Czy montaż wymaga kucia albo wymiany okien?",
        a: "Nie. Skrzynkę i prowadnice przykręca się do ściany albo do ramy okna. Potrzebne jest tylko zasilanie do napędu.",
      },
      {
        q: "Jak sprawić, żeby skrzynka była mniej widoczna?",
        a: `Dobierz kolor skrzynki do elewacji albo okien – przy pomiarze pokażemy dostępne kształty i kolory. Całkiem niewidoczna jest skrzynka rolety podtynkowej – w gotowym domu wymaga to jednak zmian w nadprożu. Więcej sposobów znajdziesz w poradniku [jak zamaskować skrzynkę rolety zewnętrznej](${blogPath("jak-zamaskowac-skrzynke-rolety-zewnetrznej")}).`,
      },
    ],
    meta: {
      title: "Rolety adaptacyjne (natynkowe) – Warszawa",
      description:
        "Rolety adaptacyjne (natynkowe) do gotowych domów i mieszkań: skrzynka na elewacji lub we wnęce, bez wymiany okien. Montaż i serwis w Warszawie i okolicach.",
    },
    // Realizacje z Mokotowa i Woli to rolety z regulacja swiatla - nie ta kategoria.
    projectCategories: [],
  },
  {
    slug: OFFER_SLUGS.RECESSED,
    navLabel: "Rolety podtynkowe",
    title: "Rolety podtynkowe",
    heroTitle: "Rolety podtynkowe w Warszawie",
    cardTitle: "Rolety podtynkowe",
    eyebrow: "Ukryte w elewacji",
    icon: "layers",
    image: { ...SOMFY_IMAGES.shutterTahoma, position: "center 55%" },
    tagline: "Czysta bryła budynku bez widocznej skrzynki",
    excerpt:
      "Skrzynka schowana w warstwie ocieplenia lub nadprożu. Z zewnątrz widać wyłącznie prowadnice, a ciepło nie ucieka mostkiem termicznym.",
    highlights: [
      "Skrzynka niewidoczna z zewnątrz",
      "Bez mostka termicznego nad oknem",
      "Rewizja serwisowa od wnętrza",
    ],
    intro: [
      "Roleta podtynkowa to rozwiązanie dla inwestorów, którzy planują osłony na etapie budowy. Skrzynka trafia w warstwę ocieplenia lub w przygotowane nadproże, zanim położony zostanie tynk. Po zakończeniu prac elewacja pozostaje gładka - widoczne są tylko prowadnice przy ościeżu i listwa dolna pancerza.",
      "Poza estetyką liczy się energetyka. Skrzynka nakładana zawsze tworzy pewien mostek termiczny nad oknem. Wersja podtynkowa, poprawnie ocieplona i uszczelniona, tego problemu nie ma - izolacja przebiega nad nią bez przerwy, a rewizja otwierana jest od wewnątrz pomieszczenia, nie od strony elewacji.",
      "Podtynkowo montujemy zarówno rolety standardowe, jak i pancerze antywłamaniowe RC2 oraz rolety z regulacją światła. Warunkiem jest wcześniejsze uzgodnienie wymiarów nadproża, bo skrzynka musi być wpisana w projekt, zanim powstanie stan surowy. Montaż rolet podtynkowych prowadzimy w Warszawie i okolicach.",
    ],
    features: [
      {
        icon: "layers",
        title: "Zabudowa w ociepleniu",
        description:
          "Skrzynka ze styropianu lub kompozytu wtapiana w warstwę izolacji - elewacja zostaje równa.",
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
          "Dostęp serwisowy przez klapę w nadprożu - naprawa nie wymaga rusztowania ani ingerencji w tynk.",
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
          "Ukryta skrzynka nie wyklucza certyfikowanej ochrony - pancerz antywłamaniowy montujemy podtynkowo.",
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
      { label: "Dostępne pancerze", value: "Standardowy, RC2, z regulacją światła" },
      { label: "Etap montażu", value: "Stan surowy - przed tynkowaniem" },
      { label: "Sterowanie", value: "Radiowe, przewodowe lub automatyka budynku" },
      { label: "Gwarancja", value: "5 lat na komponenty i montaż" },
    ],
    variants: [
      {
        name: "W warstwie ocieplenia",
        description:
          "Najczęstsze rozwiązanie w domach jednorodzinnych - skrzynka wtapiana w styropian elewacyjny.",
        points: [
          "Montaż po wykonaniu stanu surowego",
          "Ocieplenie prowadzone bez przerwy",
          "Prowadnice licowane z ościeżem",
        ],
      },
      {
        name: "Nadprożowa",
        description:
          "Skrzynka stanowi element nadproża i przenosi obciążenia - wymaga uzgodnienia z konstruktorem.",
        points: [
          "Pełna integracja z murem",
          "Największa oszczędność miejsca",
          "Konieczne ustalenie na etapie projektu",
        ],
      },
      {
        name: "Renowacyjna",
        description:
          "Wersja do budynków docieplanych - skrzynkę ukrywamy przy okazji termomodernizacji elewacji.",
        points: [
          "Montaż podczas docieplania budynku",
          "Wymiana starych rolet natynkowych",
          "Poprawa parametrów cieplnych nadproża",
        ],
      },
    ],
    installation: {
      lead: "Roleta podtynkowa to element budynku, nie dodatek - im wcześniej wejdziemy w projekt, tym mniej kosztownych korekt.",
      points: [
        "Konsultacja wymiarów nadproży i rozstawu prowadnic przed stanem surowym",
        "Dostarczenie skrzynek i rur na budowę w ustalonym terminie",
        "Montaż skrzynek przed ociepleniem, z przygotowaniem przepustów elektrycznych",
        "Powrót po tynkach: montaż pancerza, prowadnic i napędu",
        "Uruchomienie, programowanie sterowania i przekazanie dokumentacji",
      ],
    },
    service: {
      lead: "Ukryta skrzynka nie oznacza utrudnionego serwisu - dostęp prowadzimy przez rewizję od wewnątrz.",
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
        a: "Tak, jeśli planowane jest docieplenie elewacji. Przy okazji termomodernizacji skrzynka trafia w nową warstwę styropianu. W budynku bez takich prac pozostaje wersja nakładana lub montaż we wnęce okiennej. Wszystkie sposoby opisaliśmy w poradniku [jak zamaskować skrzynkę rolety zewnętrznej](/blog/jak-zamaskowac-skrzynke-rolety-zewnetrznej).",
      },
      {
        q: "Czy roletę podtynkową montuje się razem z oknami?",
        a: "Planuje się je razem, ale montuje w dwóch etapach. Wysokość skrzynki (205, 245 albo 300 mm) trzeba uwzględnić w wymiarze otworu, zanim zamówisz okna. Skrzynki montujemy w stanie surowym, przed ociepleniem i tynkowaniem, a pancerz, prowadnice i napęd – po skończeniu elewacji.",
      },
    ],
    faqGuides: [
      {
        text: "Na jakim etapie budowy je zamówić, opisaliśmy krok po kroku w poradniku",
        linkLabel: "rolety podtynkowe – kiedy je zamówić",
        href: blogPath("rolety-podtynkowe-kiedy-zamowic"),
      },
    ],
    meta: {
      title: "Montaż rolet podtynkowych – Warszawa",
      description:
        "Rolety podtynkowe montowane w warstwie ocieplenia i nadprożu. Bez mostka termicznego, z rewizją od wewnątrz. Doradztwo na etapie budowy, montaż i serwis.",
    },
    projectCategories: ["recessed"],
  },
  {
    slug: OFFER_SLUGS.ROLLER_GATES,
    navLabel: "Bramy rolowane",
    title: "Bramy rolowane",
    heroTitle: "Bramy rolowane w Warszawie",
    cardTitle: "Bramy rolowane",
    eyebrow: "Garaże i obiekty",
    icon: "warehouse",
    image: SOMFY_IMAGES.garageTransmitter,
    tagline: "Zero miejsca pod sufitem, pełna automatyka wjazdu",
    excerpt:
      "Pancerz zwijany do skrzynki nad wjazdem zamiast prowadnic pod stropem. Rozwiązanie do niskich garaży, hal i punktów usługowych.",
    highlights: [
      "Brak prowadnic pod stropem garażu",
      "Praca w garażach o niskim nadprożu",
      "Automatyka z awaryjnym otwieraniem",
    ],
    intro: [
      "Brama rolowana zwija się na wał umieszczony w skrzynce nad wjazdem, zamiast odjeżdżać pod strop jak brama segmentowa. Dzięki temu cała przestrzeń garażu pozostaje wolna - można pod sufitem poprowadzić instalacje, zawiesić regały czy zamontować oświetlenie bez kolidowania z prowadnicami.",
      "To rozwiązanie sprawdza się przede wszystkim w garażach o niskim nadprożu, w zabudowie szeregowej, przy wjazdach do hal oraz w punktach handlowych i usługowych, gdzie brama pełni jednocześnie funkcję zabezpieczenia witryny po godzinach pracy.",
      "Każdą bramę wyposażamy w napęd z awaryjnym otwieraniem, fotokomórki i listwę krawędziową. W obiektach komercyjnych dokładamy sterowanie grupowe, pętlę indukcyjną lub integrację z systemem kontroli dostępu.",
    ],
    features: [
      {
        icon: "warehouse",
        title: "Oszczędność przestrzeni",
        description:
          "Pancerz zwijany nad otworem - strop i ściany boczne garażu pozostają w pełni dostępne.",
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
          "Skrzynkę montuje się pod nadprożem albo na zewnątrz, nad otworem – wtedy nie zabiera miejsca nad wjazdem w garażu.",
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
      {
        label: "Wymagane nadproże",
        value: "zależnie od średnicy zwoju; przy montażu skrzynki na zewnątrz – niepotrzebne",
      },
      { label: "Profil pancerza", value: "Aluminiowy wypełniony pianką (Aluprof PA 77 lub PA 52)" },
      {
        label: "Kolory i przeszklenia",
        value:
          "kolory standardowe i okleiny drewnopodobne (m.in. złoty dąb, orzech), skrzynka i prowadnice także w kolorze RAL; profile z okienkami i profile wentylacyjne",
      },
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
          "Sztywniejsze profile i ryglowanie pancerza - tam, gdzie brama chroni magazyn lub wartościowe wyposażenie.",
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
      lead: "Montaż zaczynamy od pomiaru nadproża i ościeży - to one decydują, czy brama rolowana w ogóle zmieści się w otworze.",
      points: [
        "Pomiar otworu, nadproża i przestrzeni bocznych przed wyceną",
        "Dobór średnicy wału i typu skrzynki do dostępnej wysokości",
        "Montaż prowadnic, wału i pancerza wraz z podłączeniem elektrycznym",
        "Konfiguracja napędu, krańcówek, fotokomórek i listwy krawędziowej",
        "Testy zabezpieczeń, instruktaż obsługi i przekazanie pilotów",
      ],
    },
    service: {
      lead: "Brama pracuje kilka razy dziennie przez cały rok - to najbardziej eksploatowany element wyposażenia budynku.",
      points: [
        "Przeglądy okresowe: naciąg, prowadnice, zabezpieczenia, stan pancerza",
        "Wymiana napędów i sterowników, także w bramach innych producentów",
        "Naprawa uszkodzonych profili bez wymiany całego pancerza",
        "Dorabianie pilotów, wymiana klawiatur i czytników",
        "Serwis awaryjny przy zablokowanej bramie - priorytet dla obiektów komercyjnych",
      ],
    },
    faq: [
      {
        q: "Ile miejsca nad wjazdem wymaga brama rolowana?",
        a: "Zależy od wysokości bramy i sposobu montażu. Gdy skrzynka wisi na zewnątrz budynku, miejsce nad wjazdem w garażu zostaje wolne. Sprawdzamy to przy pomiarze.",
      },
      {
        q: "Co się stanie przy braku prądu?",
        a: "Każdą bramę wyposażamy w otwieranie awaryjne. W wersji podstawowej jest to mechanizm ręczny odblokowujący napęd, w rozbudowanej - zasilanie akumulatorowe pozwalające na kilkanaście cykli pracy.",
      },
      {
        q: "Czy brama rolowana zabezpiecza przed włamaniem?",
        a: "Zamyka garaż pancerzem z profili aluminiowych i utrudnia wejście, ale nie ma certyfikowanej klasy odporności na włamanie według normy.",
      },
      {
        q: "Czy serwisujecie bramy zamontowane przez inną firmę?",
        a: "Tak. Naprawiamy i przeglądamy bramy rolowane niezależnie od tego, kto je montował - o ile dostępne są części zamienne lub możliwa jest wymiana napędu na kompatybilny model.",
      },
      {
        q: "Czy bramę rolowaną można zamontować w istniejącym garażu?",
        a: "Tak. Bramę robimy na wymiar otworu, a sposób montażu – w garażu, na zewnątrz albo w świetle otworu – dobieramy do miejsca wokół wjazdu. Potrzebne jest zasilanie przy bramie; jeśli go nie ma, przewód doprowadza elektryk z uprawnieniami.",
      },
    ],
    faqGuides: [
      {
        text: "Wahasz się między dwoma typami bram? Przeczytaj poradnik",
        linkLabel: "brama rolowana czy segmentowa",
        href: blogPath("brama-rolowana-czy-segmentowa"),
      },
      {
        text: "Rodzaje, wymiary i sposoby montażu opisaliśmy w poradniku",
        linkLabel: "bramy garażowe rolowane",
        href: blogPath("bramy-garazowe-rolowane-rodzaje-wymiary-montaz"),
      },
    ],
    meta: {
      title: "Bramy rolowane Warszawa – montaż i serwis",
      description:
        "Bramy rolowane garażowe i obiektowe: praca przy niskim nadprożu, napęd z otwieraniem awaryjnym, fotokomórki i listwa krawędziowa. Montaż, serwis, naprawy.",
    },
    projectCategories: ["rollerGates"],
  },
];

export const getOfferProduct = (slug: string): OfferProduct | undefined =>
  OFFER_PRODUCTS.find((product) => product.slug === slug);

export const getOfferSlugs = (): string[] =>
  OFFER_PRODUCTS.map((product) => product.slug);
