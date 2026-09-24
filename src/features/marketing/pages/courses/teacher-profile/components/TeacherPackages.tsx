"use client";

import { Container } from "@/components/shared/Container";
import { getPublicTimeZone } from "@/features/marketing/constants/public-api";
import { useTeacherPackages } from "@/features/marketing/pages/book/queries/use-teacher-packages";
import { useOwnPackageCopy } from "@/features/marketing/pages/courses/queries/use-public-packages";
import { useLanguage } from "@/providers/language-provider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

/** `start_local` offset shoho ashe — `slice` kore naive ongsho-i visitor-er shomoy. */
function formatNextAvailable(isoLocal: string, label: string) {
  const date = new Date(isoLocal?.slice(0, 19) ?? "");
  if (Number.isNaN(date.getTime())) return label;

  return `${date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })} at ${label}`;
}

/**
 * "Book with {name}" — oi teacher-er shathe kon package kena jay.
 *
 * Mul booking flow package-first, tai teacher profile theke shoja `/book`-e
 * pathale visitor package screen-e porto ar tar bachai kora teacher hariye jeto.
 * Ekhane package ta beche nile duita-i query param niye booking-e jay.
 */
export default function TeacherPackages({
  teacherId,
  teacherFirstName,
}: {
  teacherId: string;
  teacherFirstName: string;
}) {
  const { language } = useLanguage();
  const ownCopy = useOwnPackageCopy();
  const timeZone = useMemo(() => getPublicTimeZone(), []);

  const { data, isLoading, isError } = useTeacherPackages({
    teacherId,
    tz: timeZone,
    lang: language,
  });

  const packages = data?.packages ?? [];
  const nextAvailable = data?.teacher?.next_available;

  // Inactive teacher-e 404 — tokhon ei section-ta chup-chap lukiye rakha-i bhalo,
  // karon profile page nijei tar age error dekhabe.
  if (isError) return null;

  return (
    <section
      id="packages"
      className="scroll-mt-20 border-b border-vv-line bg-vv-bg py-16"
      data-screen-label="Teacher Packages"
    >
      <Container>
        <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
          {"// Book with " + teacherFirstName}
        </span>
        <h2 className="mt-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em] text-vv-ink">
          Choose your package
        </h2>

        {/* Availability package-bhede bodlay na, tai eta ekbar-i bola hoy —
            proti card-e na. `null` mane ei window-e khali nai, kintu package
            gula tokhon-o kena jay, tai card disable kora hoy na. */}
        <p className="mt-3 max-w-[58ch] text-[15px] text-vv-ink-2">
          {nextAvailable
            ? `Next available: ${formatNextAvailable(nextAvailable.start_local, nextAvailable.label)} (${data?.timezone}).`
            : `${teacherFirstName} has no open times in the next ${data?.days_searched ?? 14} days, but you can still buy a package and book further ahead.`}
        </p>

        {isLoading && (
          <p className="mt-8 text-[14px] text-vv-ink-2" role="status">
            Loading packages…
          </p>
        )}

        {!isLoading && packages.length === 0 && (
          <p className="mt-8 text-[14px] text-vv-ink-2">
            No packages are available with this teacher right now.
          </p>
        )}

        {packages.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/online-classes/book?package=${encodeURIComponent(pkg.id)}&teacher=${encodeURIComponent(teacherId)}`}
                className="group relative flex flex-col gap-2 rounded-xl border border-vv-line bg-vv-bg-warm p-5 transition hover:border-vv-ink"
              >
                {/* Shudhu explicitly-limited package-e. Unrestricted package-eo
                    ei teacher-er shathe kena jay, kintu oita exclusive na. */}
                {pkg.restricted_to_listed_teachers && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-vv-accent px-2.5 py-0.5 text-[10px] font-semibold text-vv-accent-deep">
                    Exclusive
                  </span>
                )}

                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-[15px] font-semibold text-vv-ink"
                    translate={ownCopy(pkg, "title") ? "no" : undefined}
                  >
                    {pkg.title}
                  </span>
                  <span className="shrink-0 text-[18px] font-bold text-vv-ink">
                    ${pkg.price}
                  </span>
                </div>

                <p
                  className="text-[13px] text-vv-ink-2"
                  translate={ownCopy(pkg, "description") ? "no" : undefined}
                >
                  {pkg.description}
                </p>

                <span className="mt-auto pt-2 text-[12px] text-vv-muted">
                  {pkg.total_classes}{" "}
                  {pkg.total_classes === 1 ? "class" : "classes"} · valid for{" "}
                  {pkg.validity_days} days
                </span>

                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-vv-accent-deep">
                  {/* Google "Reserva esto" dito */}
                  <span translate="no">
                    {language === "es" ? "Reservar este paquete" : "Book this"}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
