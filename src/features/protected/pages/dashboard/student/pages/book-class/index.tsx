"use client";

import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import type { SubmitErrorItem } from "@/hooks/use-zod-tanstack-form";
import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useStudentDashboard } from "@/features/protected/pages/dashboard/student/pages/overview/queries/use-student-dashboard";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { StepPackage } from "./components/step-package";
import { StepSlot } from "./components/step-slot";
import { StepTeacher } from "./components/step-teacher";
import { useBookSession } from "./queries/use-book-session";
import { BookSessionSchema } from "./schemas/book-session.schema";

const STEPS = ["Choose package", "Choose teacher", "Pick a time"] as const;

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
  const [packageId, setPackageId] = useState<string | null>(presetPackage);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [errors, setErrors] = useState<SubmitErrorItem[]>([]);

  // Student-er nijer timezone — slot gula ei zone-e dekhabe
  const { data: dashboard } = useStudentDashboard();
  const timezone = dashboard?.timezone ?? "";

  const bookSession = useBookSession({
    onSuccess: () => router.push("/dashboard/student/calendar"),
  });

  const canAdvance =
    (step === 0 && Boolean(packageId)) || (step === 1 && Boolean(teacherId));

  const handleConfirm = () => {
    const parsed = BookSessionSchema.safeParse({
      student_package: packageId ?? "",
      teacher: teacherId ?? "",
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
      <div className="max-w-3xl space-y-6">
        <div className="flex flex-wrap gap-1">
          {STEPS.map((label, index) => (
            <button
              key={label}
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
              <span>{index + 1}.</span> {label}
            </button>
          ))}
        </div>

        {step === 0 && (
          <StepPackage
            selectedId={packageId}
            onSelect={(id) => {
              setPackageId(id);
              setStep(1);
            }}
          />
        )}

        {step === 1 && (
          <StepTeacher
            selectedId={teacherId}
            onSelect={(id) => {
              setTeacherId(id);
              setSlot(null);
              setStep(2);
            }}
          />
        )}

        {step === 2 && teacherId && (
          <StepSlot
            teacherId={teacherId}
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
    </DashboardPageLayout>
  );
}
