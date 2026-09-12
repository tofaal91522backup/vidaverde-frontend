import type { SpanishLevel } from "@/types/domain.type";

/**
 * Student-er Spanish level — public checkout, student registration ar student
 * profile tinta jaygay-i ek-i list.
 *
 * Age eta `marketing/schemas/checkout.schema.ts` e chilo. Registration-e-o
 * lagay ekhane shorano holo — auth feature theke marketing feature-e import
 * kora mane duita alada domain-ke jodiye fela.
 *
 * Value gula backend enum — bodlano jabe na. docs/bruno/student/registration/register.bru
 */
export const SPANISH_LEVEL_OPTIONS: ReadonlyArray<{
  value: SpanishLevel;
  label: string;
}> = [
  { value: "none", label: "Complete beginner. I know very little Spanish" },
  { value: "beginner", label: "Beginner. I know some basics" },
  {
    value: "intermediate",
    label: "Intermediate. I can hold simple conversations",
  },
  {
    value: "upper_intermediate",
    label: "Upper intermediate. I'm fairly comfortable but want to improve",
  },
  { value: "advanced", label: "Advanced. I want to polish and perfect" },
] as const;

export const SPANISH_LEVEL_VALUES = SPANISH_LEVEL_OPTIONS.map(
  (option) => option.value,
) as [SpanishLevel, ...SpanishLevel[]];
