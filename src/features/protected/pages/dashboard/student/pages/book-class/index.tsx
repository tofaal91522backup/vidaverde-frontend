"use client";

import { FormSection } from "@/components/shared/form-related/form-section";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import type { SubmitErrorItem } from "@/hooks/use-zod-tanstack-form";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useMyPackages } from "@/features/protected/pages/dashboard/student/pages/my-packages/queries/use-my-packages";
import { useStudentDashboard } from "@/features/protected/pages/dashboard/student/pages/overview/queries/use-student-dashboard";
import { cn } from "@/lib/utils";
import { CalendarClock, ChevronRight, Package, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PublicPackageTeacher } from "@/features/marketing/types/public-api.types";
import { useState } from "react";
import { StepPackage } from "./components/step-package";
import { StepSlot } from "./components/step-slot";
import { StepTeacher } from "./components/step-teacher";
import { useBookSession } from "./queries/use-book-session";
import { BookSessionSchema } from "./schemas/book-session.schema";

const STEPS = [
  {
    title: "Choose package",
    description: "Only packages with classes left are shown.",
    icon: Package,
  },
  {
    title: "Choose teacher",
    description: "Only the teachers this package can be booked with.",
    icon: UserRound,
  },
  {
    title: "Pick a time",
    description: "Times are shown in your own timezone.",
    icon: CalendarClock,
  },
] as const;

const FIELD_LABELS: Record<string, string> = {
  student_package: "Package",
  teacher: "Teacher",
  start_datetime: "Time slot",
};

export default function BookClassIndex() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // My Packages page theke "Book a class" chaple package ta already select thake
  const presetPackage = searchParams.get("package");

  const [step, setStep] = useState(presetPackage ? 1 : 0);
  /** `StudentPackage.id` — eta-i `student_package` hisebe API te jay. */
  const [packageId, setPackageId] = useState<string | null>(presetPackage);
  /**
   * `StudentPackage.package` — catalogue package-er UUID, `GET
   * /public/packages/:id/teachers/` er jonno. Alada rakhte hoy karon `packageId`
   * student-er **kena copy**, ar eta **asol catalogue package**.
   */
  const [cataloguePackageId, setCataloguePackageId] = useState<string | null>(
    null,
  );
  /** Puro teacher object rakha hoy, karon tar `days` theke-i slot step chole. */
  const [teacher, setTeacher] = useState<PublicPackageTeacher | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  });
  const [errors, setErrors] = useState<SubmitErrorItem[]>([]);

  // Student-er nijer timezone — slot gula ei zone-e dekhabe
  const { data: dashboard } = useStudentDashboard();
  const timezone = dashboard?.timezone ?? "";

  /**
   * My Packages theke `?package=<StudentPackage.id>` diye ashle amader kache
   * catalogue id ta thake na. Ekhane oita list theke mile ber kora hoy, na hole
   * step 1-e "package abar bachao" bolte hoto — ja shortcut-er mane-i noshto kore.
   *
   * `StepPackage`-o ei hook-i dake, tai React Query cache theke-i dey — extra
   * request jay na.
   */
  const { data: myPackages } = useMyPackages();
  const activeCataloguePackageId =
    cataloguePackageId ??
    myPackages?.results?.find((pkg) => pkg.id === packageId)?.package ??
    null;

  const bookSession = useBookSession({
    onSuccess: () => router.push("/dashboard/student/calendar"),
  });

  const canAdvance =
    (step === 0 && Boolean(packageId)) || (step === 1 && Boolean(teacher));

  const handleConfirm = () => {
    const parsed = BookSessionSchema.safeParse({
      student_package: packageId ?? "",
      teacher: teacher?.id ?? "",
      start_datetime: slot ?? "",
    });

    if (!parsed.success) {
      setErrors(
        parsed.error.issues.map((issue) => ({
          field: String(issue.path[0] ?? ""),
          label: FIELD_LABELS[String(issue.path[0] ?? "")],
          message: issue.message,
        })),
      );
      return;
    }

    setErrors([]);
    bookSession.mutate(parsed.data);
  };

  return (
    <DashboardPageLayout
      title="Book a class"
      subtitle="Use one of the classes remaining on your package."
    >
      <div className="max-w-3xl space-y-5">
        <div className="flex flex-wrap gap-1">
          {STEPS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              // Ager step-e fire jawa jay, shamner gula na
              disabled={index > step}
              onClick={() => setStep(index)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
                index < step && "bg-primary/10 text-primary",
                index === step && "border border-foreground text-foreground",
                index > step && "text-muted-foreground",
              )}
            >
              <span>{index + 1}.</span> {item.title}
            </button>
          ))}
        </div>

        <FormSection
          title={STEPS[step].title}
          description={STEPS[step].description}
          icon={STEPS[step].icon}
        >
          <div className="space-y-5">
            {step === 0 && (
              <StepPackage
                selectedId={packageId}
                onSelect={(studentPackageId, catalogueId) => {
                  setPackageId(studentPackageId);
                  setCataloguePackageId(catalogueId);
                  // Package bodlale allowed teacher list-o bodlate pare
                  setTeacher(null);
                  setSlot(null);
                  setStep(1);
                }}
              />
            )}

            {step === 1 && (
              <StepTeacher
                packageId={activeCataloguePackageId}
                timezone={timezone}
                fromDate={fromDate}
                onFromDateChange={(date) => {
                  setFromDate(date);
                  // Date bodlale teacher list-o bodlay, tai purono bachai bad
                  setTeacher(null);
                  setSlot(null);
                }}
                selectedId={teacher?.id ?? null}
                onSelect={(picked) => {
                  setTeacher(picked);
                  setSlot(null);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && teacher && (
              <StepSlot
                days={teacher.days}
                timezone={timezone}
                selectedSlot={slot}
                onSelect={setSlot}
              />
            )}

            <SubmitErrorSummary errors={errors} />

            <div className="flex items-center justify-between gap-3 border-t pt-4">
              <Button
                variant="ghost"
                disabled={step === 0 || bookSession.isPending}
                onClick={() => setStep((current) => current - 1)}
              >
                Back
              </Button>

              {step < 2 ? (
                <Button
                  disabled={!canAdvance}
                  onClick={() => setStep((current) => current + 1)}
                  className="gap-1.5"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <SubmitButton
                  type="button"
                  isLoading={bookSession.isPending}
                  loadingText="Booking..."
                  disabled={!slot}
                  onClick={handleConfirm}
                >
                  Confirm booking
                </SubmitButton>
              )}
            </div>
          </div>
        </FormSection>
      </div>
    </DashboardPageLayout>
  );
}
