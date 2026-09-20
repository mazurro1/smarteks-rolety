import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { PROCESS_STEPS } from "@/data/site";
import SectionHeader from "@/ui/SectionHeader";
import Reveal from "@/ui/Reveal";
import styles from "./Process.module.css";

export async function Process() {
  const t = await getTranslations(NAMESPACES.HOME);

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="process-heading"
    >
      <div className="container">
        <SectionHeader
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          lead={t("process.lead")}
          id="process-heading"
        />

        <ol className={styles.steps}>
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number} className={styles.step}>
              <Reveal delay={index * 70} className={styles.stepInner}>
                <span className={styles.marker} aria-hidden="true">
                  <span className={styles.dot} />
                </span>
                <span className={styles.number}>{step.number}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
