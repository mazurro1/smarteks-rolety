import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { BENEFITS } from "@/data/site";
import SectionHeader from "@/ui/SectionHeader";
import Icon from "@/ui/Icon";
import Reveal from "@/ui/Reveal";
import styles from "./Benefits.module.css";

export async function Benefits() {
  const t = await getTranslations(NAMESPACES.HOME);

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="benefits-heading"
    >
      <div className="container">
        <SectionHeader
          eyebrow={t("benefits.eyebrow")}
          title={t("benefits.title")}
          lead={t("benefits.lead")}
          id="benefits-heading"
        />

        <div className={styles.grid}>
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 50}>
              <article className={styles.card}>
                <span className={styles.icon}>
                  <Icon name={benefit.icon} />
                </span>
                <h3 className={styles.title}>{benefit.title}</h3>
                <p className={styles.description}>{benefit.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
