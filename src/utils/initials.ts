/**
 * Avatar fallback — naam theke sorbochho duita okkhor.
 *
 * Age eta tinta file-e alada kore lekha chilo (testimonial carousel, student
 * detail, teacher picker). Ek jaygay ana holo jate ek jaygay "Marco Reyes" →
 * "MR" ar onno jaygay "M" na hoye jay.
 */
export function initials(name: string) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}
