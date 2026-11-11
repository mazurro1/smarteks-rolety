import { OFFER_PRODUCTS } from "@/data/offer";
import Icon from "@/ui/Icon";
import { HeaderClient, type OfferNavItem } from "./HeaderClient";

/**
 * Naglowek: dane menu oferty i ikony przygotowane na serwerze, zeby pelne
 * opisy produktow (src/data/offer.ts) i rejestr ikon nie trafialy do JS
 * przegladarki. Stan menu i przewijania obsluguje HeaderClient.
 */
export function Header() {
  const offerItems: OfferNavItem[] = OFFER_PRODUCTS.map((product) => ({
    slug: product.slug,
    navLabel: product.navLabel,
    tagline: product.tagline,
    badge: product.badge,
    icon: <Icon name={product.icon} />,
  }));

  return <HeaderClient offerItems={offerItems} />;
}
