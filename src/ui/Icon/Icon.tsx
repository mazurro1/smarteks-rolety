import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faShieldHalved,
  faLock,
  faSun,
  faLayerGroup,
  faWarehouse,
  faBolt,
  faWrench,
  faRulerCombined,
  faTruck,
  faPhone,
  faEnvelope,
  faClock,
  faLocationDot,
  faCheck,
  faStar,
  faGauge,
  faVolumeHigh,
  faTemperatureHalf,
  faSliders,
  faHouse,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { IconKey } from "@/types";

/**
 * Rejestr ikon. Dane domenowe trzymaja tylko klucz (IconKey), dzieki czemu
 * moga byc serializowane i przekazywane miedzy serwerem a klientem.
 */
export const ICONS: Record<IconKey, IconDefinition> = {
  shield: faShield,
  shieldCheck: faShieldHalved,
  lock: faLock,
  sun: faSun,
  layers: faLayerGroup,
  warehouse: faWarehouse,
  bolt: faBolt,
  wrench: faWrench,
  ruler: faRulerCombined,
  truck: faTruck,
  phone: faPhone,
  envelope: faEnvelope,
  clock: faClock,
  pin: faLocationDot,
  check: faCheck,
  star: faStar,
  gauge: faGauge,
  volume: faVolumeHigh,
  thermometer: faTemperatureHalf,
  remote: faSliders,
  house: faHouse,
  certificate: faCertificate,
};

interface IconProps {
  name: IconKey;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  return (
    <FontAwesomeIcon icon={ICONS[name]} className={className} aria-hidden="true" />
  );
}
