"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO, CONTACT_TOPICS, SERVICE_CITIES } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import type { ContactFormValues, FormStatus } from "@/types";
import styles from "./ContactForm.module.css";

const MESSAGE_MAX = 2000;
const MESSAGE_MIN = 10;
const NAME_MIN = 2;
const NAME_MAX = 100;
const PHONE_MAX = 11; // "600 000 000" = 11 znakow ze spacjami
const EMAIL_MAX = 254;

const formatPhone = (raw: string): string => {
  const digits = raw.replaceAll(/\D/g, "").slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  topic?: string;
  message?: string;
}

type TouchedFields = Partial<Record<keyof FormErrors, boolean>>;

export function ContactForm() {
  const t = useTranslations(NAMESPACES.CONTACT);
  const tForm = useTranslations(`${NAMESPACES.CONTACT}.form`);
  const tCommon = useTranslations(NAMESPACES.COMMON);
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const getFieldError = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name": {
        if (!value.trim()) return tForm("required");
        if (value.trim().length < NAME_MIN) return tForm("nameMin");
        return undefined;
      }
      case "email": {
        if (!value.trim()) return tForm("required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
          return tForm("invalidEmail");
        return undefined;
      }
      case "phone": {
        if (!value.trim()) return tForm("required");
        const digits = value.replaceAll(/\D/g, "");
        if (digits.length !== 9) return tForm("invalidPhone");
        if (!/^([5-9]|4[5-9])/.test(digits)) return tForm("invalidPhonePrefix");
        return undefined;
      }
      case "topic":
        if (!value) return tForm("required");
        return undefined;
      case "message": {
        if (!value.trim()) return tForm("required");
        if (value.trim().length < MESSAGE_MIN) return tForm("messageMin");
        if (value.length > MESSAGE_MAX) return tForm("messageMax");
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validate = (): boolean => {
    const fields: Array<keyof FormErrors> = [
      "name",
      "phone",
      "email",
      "topic",
      "message",
    ];
    const errs: FormErrors = {};
    for (const field of fields) {
      const error = getFieldError(
        field,
        values[field as keyof ContactFormValues] as string,
      );
      if (error) errs[field] = error;
    }
    setErrors(errs);
    setTouched({
      name: true,
      phone: true,
      email: true,
      topic: true,
      message: true,
    });
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    const value =
      name === "phone" ? formatPhone(e.target.value) : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormErrors]) {
      const error = getFieldError(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = getFieldError(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFieldValid = (field: keyof FormErrors): boolean =>
    Boolean(
      touched[field] &&
        !errors[field] &&
        (values[field as keyof ContactFormValues] as string),
    );

  const fieldClass = (field: keyof FormErrors, base: string) =>
    [
      base,
      errors[field] ? styles.fieldError : "",
      isFieldValid(field) ? styles.fieldValid : "",
    ]
      .filter(Boolean)
      .join(" ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.honeypot) return;
    if (!validate()) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setServerMessage(tForm("errorMessage"));
      return;
    }

    setStatus("submitting");
    const topicLabel = t(`topics.${values.topic}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Smarteks Rolety] Nowe zapytanie: ${topicLabel}`,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          topic: topicLabel,
          message: values.message.trim(),
          botcheck: values.honeypot,
          redirect: "false",
        }),
      });

      const data = (await res.json()) as { success: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setValues({
          name: "",
          phone: "",
          email: "",
          topic: "",
          message: "",
          honeypot: "",
        });
        setTouched({});
        setErrors({});
      } else {
        setStatus("error");
        setServerMessage(data.message ?? tForm("errorMessage"));
      }
    } catch {
      setStatus("error");
      setServerMessage(tForm("errorMessage"));
    }
  };

  const contactCards: {
    icon: IconDefinition;
    label: string;
    value: React.ReactNode;
  }[] = [
    {
      icon: faPhone,
      label: tCommon("contact.phoneLabel"),
      value: <a href={CONTACT_INFO.PHONE_HREF}>{CONTACT_INFO.PHONE}</a>,
    },
    {
      icon: faEnvelope,
      label: tCommon("contact.emailLabel"),
      value: <a href={CONTACT_INFO.EMAIL_HREF}>{CONTACT_INFO.EMAIL}</a>,
    },
    {
      icon: faLocationDot,
      label: tCommon("contact.addressLabel"),
      value: (
        <address className={styles.address}>{CONTACT_INFO.ADDRESS_FULL}</address>
      ),
    },
    {
      icon: faClock,
      label: tCommon("contact.workingHoursLabel"),
      value: (
        <span className={styles.hours}>
          {tCommon("contact.workingHoursValue")}
        </span>
      ),
    },
  ];

  const messageCounterClass = [
    styles.charCounter,
    values.message.length >= MESSAGE_MAX
      ? styles.charDanger
      : values.message.length > MESSAGE_MAX * 0.85
        ? styles.charWarning
        : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`section ${styles.wrapper}`}
      aria-labelledby="contact-form-heading"
    >
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <p className={styles.infoEyebrow}>{t("infoEyebrow")}</p>
            <h2 className={styles.infoTitle}>{t("infoTitle")}</h2>
            <p className={styles.infoLead}>{t("infoLead")}</p>

            <div className={styles.contactCards}>
              {contactCards.map((card) => (
                <div key={card.label} className={styles.contactCard}>
                  <span className={styles.contactCardIcon} aria-hidden="true">
                    <FontAwesomeIcon icon={card.icon} />
                  </span>
                  <div>
                    <p className={styles.contactCardTitle}>{card.label}</p>
                    <div className={styles.contactCardValue}>{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.areaCard}>
              <p className={styles.areaTitle}>{t("areaTitle")}</p>
              <p className={styles.areaCities}>{SERVICE_CITIES.join(" · ")}</p>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 id="contact-form-heading" className={styles.formTitle}>
              {t("formTitle")}
            </h2>
            <p className={styles.formSubtitle}>{t("formSubtitle")}</p>

            {status === "success" ? (
              <div className={`${styles.alert} ${styles.alertSuccess}`} role="alert">
                <p className={styles.alertTitle}>{tForm("successTitle")}</p>
                <p>{tForm("successMessage")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label={t("formAriaLabel")}
              >
                <input
                  tabIndex={-1}
                  className={styles.honeypot}
                  autoComplete="off"
                  name="honeypot"
                  value={values.honeypot}
                  onChange={handleChange}
                  aria-hidden="true"
                />

                {status === "error" && (
                  <div className={`${styles.alert} ${styles.alertError}`} role="alert">
                    <p className={styles.alertTitle}>{tForm("errorTitle")}</p>
                    <p>{serverMessage || tForm("errorMessage")}</p>
                  </div>
                )}

                <div className={styles.fields}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>
                        {tForm("name")} <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={tForm("namePlaceholder")}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={NAME_MAX}
                        className={fieldClass("name", styles.input)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span id="name-error" className={styles.errorMsg} role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="phone" className={styles.label}>
                        {tForm("phone")} <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder={tForm("phonePlaceholder")}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={PHONE_MAX}
                        className={fieldClass("phone", styles.input)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <span id="phone-error" className={styles.errorMsg} role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>
                        {tForm("email")} <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={tForm("emailPlaceholder")}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={EMAIL_MAX}
                        className={fieldClass("email", styles.input)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span id="email-error" className={styles.errorMsg} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="topic" className={styles.label}>
                        {tForm("topic")} <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={values.topic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={fieldClass("topic", styles.select)}
                        aria-describedby={errors.topic ? "topic-error" : undefined}
                        aria-invalid={!!errors.topic}
                      >
                        <option value="">{tForm("topicPlaceholder")}</option>
                        {CONTACT_TOPICS.map((topic) => (
                          <option key={topic.value} value={topic.value}>
                            {t(`topics.${topic.value}`)}
                          </option>
                        ))}
                      </select>
                      {errors.topic && (
                        <span id="topic-error" className={styles.errorMsg} role="alert">
                          {errors.topic}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>
                      {tForm("message")} <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder={tForm("messagePlaceholder")}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={MESSAGE_MAX}
                      className={fieldClass("message", styles.textarea)}
                      aria-describedby={`message-counter${errors.message ? " message-error" : ""}`}
                      aria-invalid={!!errors.message}
                      rows={5}
                    />
                    <div className={styles.fieldFooter}>
                      <span>
                        {errors.message && (
                          <span
                            id="message-error"
                            className={styles.errorMsg}
                            role="alert"
                          >
                            {errors.message}
                          </span>
                        )}
                      </span>
                      <span
                        id="message-counter"
                        className={messageCounterClass}
                        aria-live="polite"
                      >
                        {tForm("messageCounter", {
                          count: values.message.length,
                          max: MESSAGE_MAX,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className={styles.submitRow}>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={styles.submitBtn}
                    >
                      {status === "submitting" ? tForm("sending") : tForm("submit")}
                    </button>
                    <p className={styles.privacy}>
                      {t("privacyNote")}{" "}
                      <Link href={ROUTES.PRIVACY_POLICY}>
                        {t("privacyLinkLabel")}
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
