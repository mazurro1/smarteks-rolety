import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { PROCESS_STEPS } from "@/data/site";
import SectionHeader from "@/ui/SectionHeader";
import ProcessSteps from "./ProcessSteps";
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

        <ProcessSteps steps={PROCESS_STEPS} />
      </div>
    </section>
  );
}
