import countries from "./countries.json";

export type Country = {
  /** ISO-3166 alpha-2, e.g. "BD". Ei list-e **unique**. */
  code: string;
  /** e.g. "+880". Unique **na** — "+1" onek desh-e. */
  dial_code: string;
  name: string;
};

export const COUNTRIES = countries as Country[];

/**
 * Country select-er option.
 *
 * `value` naam, code na — backend `country` ke **free-text string** hisebe
 * rakhe (`docs/bruno/student/registration/register.bru`: `"country": "Spain"`),
 * tai purono data-r shathe mile jay.
 */
export const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.name,
  label: country.name,
}));

/**
 * Phone-er dial code select.
 *
 * ⚠️ `value` ISO **code**, dial code na — dial code unique na ("+1" US, CA,
 * ar aro koyekta desh-e). Duplicate `value` dile `<select>` er bachai kaj korto na.
 */
export const DIAL_CODE_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: `${country.name} (${country.dial_code})`,
}));

/** School Ecuador-e, tai default oita-i. */
export const DEFAULT_DIAL_COUNTRY = "EC";

export function dialCodeOf(countryCode: string) {
  return COUNTRIES.find((c) => c.code === countryCode)?.dial_code ?? "";
}

/**
 * "+880 1712 345678" → `{ countryCode: "BD", number: "1712 345678" }`.
 *
 * Shobcheye **lomba** matching prefix neওয়া hoy: "+1" ar "+1876" duita-i ache,
 * chhoto ta age mile gele Jamaica-r number US hoye jeto.
 */
export function splitPhone(value: string) {
  const trimmed = (value ?? "").trim();
  if (!trimmed.startsWith("+")) {
    return { countryCode: "", number: trimmed };
  }

  const match = COUNTRIES.filter((country) =>
    trimmed.startsWith(country.dial_code),
  ).sort((a, b) => b.dial_code.length - a.dial_code.length)[0];

  if (!match) return { countryCode: "", number: trimmed };

  return {
    countryCode: match.code,
    number: trimmed.slice(match.dial_code.length).trim(),
  };
}

/** Ulto dik. Number khali hole khali string — khali "+880" pathanor mane nai. */
export function joinPhone(countryCode: string, number: string) {
  const local = (number ?? "").trim();
  if (!local) return "";

  const dial = dialCodeOf(countryCode);
  return dial ? `${dial} ${local}` : local;
}
