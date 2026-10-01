import type { MediaImage } from "@/types";

/**
 * Zdjecia produktow Somfy (public/images/somfy).
 *
 * Konwencja: alt opisuje scene i nazywa pokazany produkt Somfy. Tla tez maja
 * alt - dlatego sa renderowane jako <Image>, a nie CSS background.
 */
const DIR = "/images/somfy";

/**
 * Tlo naglowkow: prawdziwe zdjecie domu z Unsplash (licencja Unsplash -
 * uzycie komercyjne bez oplat). Fot. Meri Vasilevski,
 * https://unsplash.com/photos/a-house-with-a-tree-in-front-of-it-4KXEQrDUizs
 */
const HOUSE: MediaImage = {
  src: "/images/dom/nowoczesny-dom-z-zaslonami.jpg",
  alt: "Nowoczesny piętrowy dom z zasłonami w dużych oknach, garażem i ogrodem przed wejściem",
};

export const SOMFY_IMAGES = {
  shutterGarden: {
    src: `${DIR}/roleta-zewnetrzna-somfy-smoove-ogrod.jpg`,
    alt: "Uchylona roleta zewnętrzna w przeszkleniu tarasowym z widokiem na ogród, obok naścienny nadajnik Somfy Smoove",
  },
  shuttersCornerRemote: {
    src: `${DIR}/rolety-zewnetrzne-pilot-somfy-situo-5.jpg`,
    alt: "Rolety zewnętrzne w narożnym przeszkleniu sterowane pilotem Somfy Situo 5",
  },
  remoteShutterSlats: {
    src: `${DIR}/pilot-somfy-situo-5-roleta-zewnetrzna.jpg`,
    alt: "Pilot Somfy Situo 5 skierowany na opuszczony pancerz rolety zewnętrznej",
  },
  louvresRoom: {
    src: `${DIR}/zaluzje-zewnetrzne-somfy-smoove-pokoj.jpg`,
    alt: "Pokój z zewnętrznymi lamelami uchylonymi do światła dziennego i naściennym nadajnikiem Somfy Smoove",
  },
  shutterTahoma: {
    src: `${DIR}/roleta-zewnetrzna-somfy-tahoma-switch.jpg`,
    alt: "Roleta zewnętrzna opuszczona do połowy przeszklenia, nadajnik Somfy Smoove na słupie i centrala Somfy TaHoma switch na stoliku",
  },
  garageTransmitter: {
    src: `${DIR}/nadajnik-somfy-wjazd-do-garazu.jpg`,
    alt: "Naścienny nadajnik Somfy przy wjeździe do garażu, w tle brama wjazdowa",
  },
  smooveShutter: {
    src: `${DIR}/somfy-smoove-sun-protect-roleta.jpg`,
    alt: "Naścienny nadajnik Somfy Smoove z przełącznikiem Sun Protect obok okna z roletą zewnętrzną",
  },
  smooveWall: {
    src: `${DIR}/somfy-smoove-sun-protect-sciana.jpg`,
    alt: "Naścienny nadajnik Somfy Smoove z funkcją Sun Protect na ścianie oświetlonej słońcem",
  },
  roundTransmitterTable: {
    src: `${DIR}/nadajnik-somfy-na-stole-roleta.jpg`,
    alt: "Dłoń na okrągłym nadajniku Somfy położonym na stole przy oknie z roletą zewnętrzną",
  },
  livingRoomShutter: {
    src: `${DIR}/salon-roleta-zewnetrzna-somfy-smoove.jpg`,
    alt: "Salon z roletą zewnętrzną opuszczoną do połowy okna i naściennym nadajnikiem Somfy Smoove",
  },
  wallSwitchGate: {
    src: `${DIR}/nadajnik-somfy-elewacja-brama.jpg`,
    alt: "Dłoń naciskająca naścienny nadajnik Somfy na elewacji, w tle brama wjazdowa",
  },
  keyfobGate: {
    src: `${DIR}/brelok-somfy-brama-wjazdowa.jpg`,
    alt: "Brelok Somfy w dłoni przed szarą bramą wjazdową",
  },
  tahomaHallway: {
    src: `${DIR}/somfy-tahoma-switch-smoove-przedpokoj.jpg`,
    alt: "Centrala Somfy TaHoma switch na konsoli i nadajnik Somfy Smoove na ścianie",
  },
  blackSwitchFacade: {
    src: `${DIR}/czarny-nadajnik-somfy-elewacja.jpg`,
    alt: "Dłoń naciskająca czarny naścienny nadajnik Somfy na tynkowanej elewacji",
  },
  remoteWindow: {
    src: `${DIR}/pilot-somfy-situo-5-okno.jpg`,
    alt: "Pilot Somfy Situo 5 skierowany na okno z opuszczoną osłoną",
  },
  remoteTerraceWindow: {
    src: `${DIR}/pilot-somfy-situo-5-roleta-okno-tarasowe.jpg`,
    alt: "Sterowanie roletą zewnętrzną okna tarasowego pilotem Somfy Situo 5",
  },
  louvresBalcony: {
    src: `${DIR}/pilot-somfy-situo-zaluzje-fasadowe-balkon.jpg`,
    alt: "Zewnętrzne lamele przy wyjściu na balkon sterowane pilotem Somfy Situo",
  },
  sensorsPergolaHouse: {
    src: `${DIR}/czujniki-somfy-pergola-dom.jpg`,
    alt: "Czujniki wiatru i nasłonecznienia Somfy na narożniku pergoli przy domu",
  },
  rainSensor: {
    src: `${DIR}/czujnik-deszczu-somfy-pergola.jpg`,
    alt: "Czujnik deszczu Somfy na belce pergoli w czasie opadów",
  },
  sunSensorPergola: {
    src: `${DIR}/czujnik-slonca-somfy-pergola.jpg`,
    alt: "Czujnik nasłonecznienia Somfy na belce pergoli na tle nieba",
  },
  windSensorPergola: {
    src: `${DIR}/czujnik-wiatru-somfy-pergola.jpg`,
    alt: "Czujnik wiatru Somfy z wiatraczkiem na krawędzi pergoli",
  },
  smooveTerrace: {
    src: `${DIR}/somfy-smoove-wyjscie-na-taras.jpg`,
    alt: "Dłoń na naściennym nadajniku Somfy Smoove przy wyjściu na taras",
  },
  smooveWhiteWall: {
    src: `${DIR}/somfy-smoove-biala-sciana.jpg`,
    alt: "Naścienny nadajnik Somfy Smoove na białej ścianie w smudze słońca",
  },
  situoWallHolder: {
    src: `${DIR}/pilot-somfy-situo-5-uchwyt-scienny.jpg`,
    alt: "Pilot Somfy Situo 5 w uchwycie ściennym obok okna z roletą",
  },
  sunSensorWindow: {
    src: `${DIR}/czujnik-slonca-somfy-okno.jpg`,
    alt: "Czujnik nasłonecznienia Somfy na ścianie obok okna z kasetą osłony",
  },
  facadeScreenSensor: {
    src: `${DIR}/elewacja-oslona-czujnik-somfy.jpg`,
    alt: "Elewacja z zewnętrzną osłoną w kasecie i czujnikiem Somfy obok numeru domu",
  },
  bedroomSunProtect: {
    src: `${DIR}/sypialnia-somfy-smoove-sun-protect.jpg`,
    alt: "Sypialnia w świetle przechodzącym przez lamele, na ścianie nadajnik Somfy Smoove z funkcją Sun Protect",
  },
  remotesTable: {
    src: `${DIR}/piloty-somfy-na-stole.jpg`,
    alt: "Pięć pilotów Somfy do rolet na drewnianym stole w słońcu",
  },
  roundTransmitterBook: {
    src: `${DIR}/okragly-nadajnik-somfy-stol.jpg`,
    alt: "Okrągły nadajnik Somfy na stole w świetle przechodzącym przez lamele rolety",
  },
} satisfies Record<string, MediaImage>;

/** Tlo naglowka strony glownej. */
export const HERO_IMAGE: MediaImage = {
  ...HOUSE,
  position: "68% 40%",
};

/** Domyslne tlo naglowkow podstron. */
export const PAGE_HERO_IMAGE: MediaImage = {
  ...HOUSE,
  position: "center 35%",
};

/** Tlo sekcji z wezwaniem do kontaktu. */
export const CTA_IMAGE: MediaImage = {
  ...SOMFY_IMAGES.smooveWall,
  position: "center 45%",
};

export const COMPANY_IMAGE: MediaImage = SOMFY_IMAGES.smooveShutter;

/** Pas ze zdjeciem miedzy sekcjami strony glownej. */
export const CONTROL_BAND_IMAGE: MediaImage = {
  ...SOMFY_IMAGES.remotesTable,
  position: "center 55%",
};
