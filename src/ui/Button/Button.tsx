import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { ButtonVariant, ButtonSize } from "@/types";
import styles from "./Button.module.css";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends
    BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  as?: "button";
  href?: never;
}

interface ButtonAsAnchor
  extends
    BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  as: "a";
  href: string;
  external?: boolean;
}

interface ButtonAsLink extends BaseProps {
  as: "link";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    children,
    className = "",
  } = props;
  const cls = [
    styles.btn,
    styles[variant],
    size !== "md" ? styles[size] : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const {
      as: _a,
      href,
      external,
      variant: _v,
      size: _s,
      fullWidth: _f,
      ...rest
    } = props;
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (props.as === "link") {
    const {
      as: _a,
      href,
      variant: _v,
      size: _s,
      fullWidth: _f,
      ...rest
    } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    as: _a,
    variant: _v,
    size: _s,
    fullWidth: _f,
    ...rest
  } = props as ButtonAsButton;
  return (
    <button
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
