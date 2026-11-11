import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface FontAwesomeIconProps {
  icon: IconDefinition;
  className?: string;
  /** Ikony sa zawsze dekoracyjne - znaczenie niesie tekst obok. */
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Ikona Font Awesome jako zwykly <svg> - ten sam znacznik i klasa
 * `svg-inline--fa` co w @fortawesome/react-fontawesome, ale bez biblioteki
 * fontawesome-svg-core w JS przegladarki (mniej kodu do pobrania i wykonania).
 * Bazowy styl `.svg-inline--fa` jest w globals.css.
 */
export function FontAwesomeIcon({ icon, className }: FontAwesomeIconProps) {
  const {
    prefix,
    iconName,
    icon: [width, height, , , path],
  } = icon;

  return (
    <svg
      data-prefix={prefix}
      data-icon={iconName}
      className={`svg-inline--fa fa-${iconName}${className ? ` ${className}` : ""}`}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d={Array.isArray(path) ? path.join(" ") : path} />
    </svg>
  );
}
