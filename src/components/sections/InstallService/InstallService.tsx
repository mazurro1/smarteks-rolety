import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { SECTION_ANCHORS } from "@/constants/routes";
import type { OfferProduct } from "@/types";
import SectionHeader from "@/ui/SectionHeader";
import Icon from "@/ui/Icon";
import styles from "./InstallService.module.css";

interface InstallServiceProps {
  installation: OfferProduct["installation"];
  service: OfferProduct["service"];
}

/**
 * Powtarzalny blok „montaz + serwis" — obecny na kazdej podstronie ofertowej.
 */
export async function InstallService({
  installation,
  service,
}: InstallServiceProps) {
  const t = await getTranslations(`${NAMESPACES.OFFER}.installService`);

  const blocks = [
    {
      id: SECTION_ANCHORS.INSTALLATION,
      icon: "ruler" as const,
      label: t("installationLabel"),
      title: t("installationTitle"),
      lead: installation.lead,
      points: installation.points,
    },
    {
      id: SECTION_ANCHORS.SERVICE,
      icon: "wrench" as const,
      label: t("serviceLabel"),
      title: t("serviceTitle"),
      lead: service.lead,
      points: service.points,
    },
  ];

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="install-service-heading"
    >
      <div className="container">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          id="install-service-heading"
        />

        <div className={styles.grid}>
          {blocks.map((block) => (
            <article key={block.id} id={block.id} className={styles.card}>
              <header className={styles.cardHead}>
                <span className={styles.icon}>
                  <Icon name={block.icon} />
                </span>
                <div>
                  <p className={styles.label}>{block.label}</p>
                  <h3 className={styles.title}>{block.title}</h3>
                </div>
              </header>

              <p className={styles.lead}>{block.lead}</p>

              <ul className={styles.points}>
                {block.points.map((point) => (
                  <li key={point} className={styles.point}>
                    <Icon name="check" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
