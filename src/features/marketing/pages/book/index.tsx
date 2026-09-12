"use client";

import { Container } from "@/components/shared/Container";
import {
  orderPublicPackages,
  usePublicPackages,
} from "@/features/marketing/pages/courses/queries/use-public-packages";
import { usePublicTeachers } from "@/features/marketing/pages/courses/queries/use-public-teachers";
import { SlotPicker } from "@/features/marketing/pages/book/components/SlotPicker";
import { getPublicTimeZone } from "@/features/marketing/constants/public-api";
import type {
  PublicCheckoutResponse,
  PublicTeacherSlot,
} from "@/features/marketing/types/public-api.types";
import {
  CheckoutDetailsSchema,
  SPANISH_LEVEL_OPTIONS,
  type CheckoutDetailsValues,
} from "@/features/marketing/schemas/checkout.schema";
import {
  DUMMY_PAYMENT_METHOD,
  useCheckout,
} from "@/features/marketing/queries/use-checkout";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronRight, UserRound } from "lucide-react";

const STEPS = [
  "Choose Your Teacher",
  "Choose Your Package",
  "Date & Time",
  "Your Details",
  "Payment",
] as const;

/**
 * `start_local` offset shoho ashe ("2026-09-10T15:00:00+02:00"). Oi string-er
 * offset-er ager tuku-i visitor-er nijer shomoy — `new Date().toLocale*()`
 * chalale browser zone-e abar convert hoye vul dekhato.
 */
function formatSlotDate(isoLocal: string) {
  const date = new Date(isoLocal?.slice(0, 19) ?? "");
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatSlotTime(isoLocal: string) {
  return isoLocal?.slice(11, 16) ?? "";
}

export default function BookRoute() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const { data: packageData, isLoading: packagesLoading, isError: packagesError } =
    usePublicPackages({ lang: language });
  const { data: teacherData, isLoading: teachersLoading, isError: teachersError } =
    usePublicTeachers({ lang: language });
  const preselectedTeacher = searchParams.get("teacher");
  const preselectedPackage = searchParams.get("package");
  const packages = useMemo(
    () => orderPublicPackages(packageData ?? []),
    [packageData],
  );
  const teachers = teacherData ?? [];

  const [step, setStep] = useState(0);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    preselectedTeacher,
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    preselectedPackage,
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<PublicTeacherSlot | null>(
    null,
  );
  // Visitor-er nijer zone; ei zone-e-i backend slot render kore
  const timeZone = useMemo(() => getPublicTimeZone(), []);

  /** `start_local` offset shoho ashe; oi string-er nijer part-i visitor-er shomoy. */
  const slotDateLabel = selectedSlot
    ? formatSlotDate(selectedSlot.start_local)
    : "";
  const [details, setDetails] = useState<CheckoutDetailsValues>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    country: "",
    spanish_level: "none",
  });
  const [detailErrors, setDetailErrors] = useState<string[]>([]);
  /** Confirmation screen backend-er ferot deওয়া data theke banano hoy. */
  const [result, setResult] = useState<PublicCheckoutResponse | null>(null);

  const checkout = useCheckout({ onSuccess: setResult });

  const setDetail = (field: keyof CheckoutDetailsValues, value: string) =>
    setDetails((current) => ({ ...current, [field]: value }));

  const selectedPackage =
    packages.find((pkg) => pkg.id === selectedPackageId) ?? packages[0] ?? null;
  const selectedTeacher =
    teachers.find((teacher) => teacher.id === selectedTeacherId) ?? null;

  /** Teacher ba date bodlale purono slot ar valid na — clear kore deওয়া hoy. */
  const changeTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setSelectedSlot(null);
  };

  const changeDate = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const canAdvance = () => {
    if (step === 0) return !!selectedTeacher && !teachersLoading;
    if (step === 1) return !!selectedPackage && !packagesLoading;
    if (step === 2) return !!selectedSlot;
    if (step === 3) return CheckoutDetailsSchema.safeParse(details).success;
    if (step === 4) return true;
    return false;
  };

  const handleConfirm = () => {
    const parsed = CheckoutDetailsSchema.safeParse(details);
    if (!parsed.success) {
      setDetailErrors(parsed.error.issues.map((issue) => issue.message));
      setStep(3);
      return;
    }
    if (!selectedTeacher || !selectedPackage || !selectedSlot) return;

    setDetailErrors([]);
    checkout.mutate({
      teacher: selectedTeacher.id,
      package: selectedPackage.id,
      // Slots API-r `start_utc` hubohu — backend eta re-validate kore
      start_datetime: selectedSlot.start_utc,
      ...parsed.data,
      timezone: timeZone,
      payment_method: DUMMY_PAYMENT_METHOD,
    });
  };

  if (result) {
    const booking = result.booking;
    return (
      <section
        className="min-h-[70vh] flex items-center"
        data-screen-label="Booking Confirmed"
      >
        <Container className="text-center py-20">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-balance">
            You&apos;re booked!
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] mx-auto m-0">
            {result.message}
          </p>

          {/* Shudhu notun account toiri hole — purono student-ke email-er kotha bola bhul hoto */}
          {booking.account_created && (
            <p className="mt-4 rounded-xl border border-vv-accent bg-vv-accent/10 px-4 py-3 text-[14px] text-vv-ink max-w-md mx-auto">
              We created your student account. Check your email for the password
              so you can manage your classes.
            </p>
          )}

          <div className="mt-8 rounded-xl border border-vv-line bg-vv-bg-warm p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-vv-ink mb-3">Booking Summary</h3>
            <dl className="flex flex-col gap-2 text-[14px]">
              {[
                ["Teacher", booking.teacher],
                ["Package", booking.package_title],
                [
                  "Starts",
                  `${formatSlotDate(booking.start_local)} at ${formatSlotTime(booking.start_local)}`,
                ],
                ["Timezone", booking.timezone],
                ["Duration", `${booking.duration_minutes} minutes`],
                ["Invoice", booking.invoice_number],
                ["Paid", `${booking.amount_paid} ${booking.currency}`],
                ["Classes remaining", String(booking.classes_remaining)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-vv-ink-2">{label}</dt>
                  <dd className="font-medium text-vv-ink text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={booking.meet_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px mt-6"
          >
            Join on Google Meet{" "}
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </a>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12" data-screen-label="Book a Lesson">
      <Container className="max-w-215">
        {/* Header + progress */}
        <div className="mb-10">
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-4">
            Home <span className="mx-1 text-vv-line-2">/</span> Online Classes{" "}
            <span className="mx-1 text-vv-line-2">/</span> Book
          </div>
          <h1 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-6 text-balance">
            Book Your Spanish Lesson
          </h1>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap text-[12px] font-medium px-3 py-1.5 rounded-full",
                  i < step
                    ? "bg-vv-accent text-vv-accent-deep"
                    : i === step
                      ? "border border-vv-ink text-vv-ink"
                      : "text-vv-ink-2",
                )}
              >
                <span>{i + 1}.</span> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Step 0. Teacher */}
        {step === 0 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-1 text-vv-ink">
              Choose Your Teacher
            </h2>
            <p className="text-[14px] text-vv-ink-2 mb-6">
              Choose the teacher you would like to learn with.
            </p>
            {teachersLoading && (
              <p className="text-[13px] text-vv-ink-2" role="status">
                Loading teachers…
              </p>
            )}
            {teachersError && (
              <p className="text-[13px] text-red-600" role="alert">
                Teachers are unavailable right now. Please try again shortly.
              </p>
            )}
            {!teachersLoading && !teachersError && teachers.length === 0 && (
              <p className="text-[13px] text-vv-ink-2">
                No teachers are currently available.
              </p>
            )}
            {teachers.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {teachers.map((teacher) => (
                  <button
                    key={teacher.id}
                    type="button"
                    onClick={() => changeTeacher(teacher.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border p-4 text-left transition",
                      selectedTeacher?.id === teacher.id
                        ? "border-vv-accent bg-vv-accent/10"
                        : "border-vv-line hover:border-vv-ink",
                    )}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-vv-bg-warm">
                      {teacher.profile_img_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={teacher.profile_img_url}
                          alt={teacher.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound
                          aria-hidden="true"
                          className="h-5 w-5 text-vv-muted"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-vv-ink text-[15px]">
                        {teacher.name}
                      </div>
                      <div className="text-[12px] text-vv-ink-2">
                        {teacher.availability_label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 1. Package */}
        {step === 1 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-vv-ink">
              Choose Your Package
            </h2>
            {packagesLoading && (
              <p className="text-[13px] text-vv-ink-2" role="status">
                Loading available packages…
              </p>
            )}
            {packagesError && (
              <p className="text-[13px] text-red-600" role="alert">
                Packages are unavailable right now. Please go back and try again.
              </p>
            )}
            {!packagesLoading && !packagesError && packages.length === 0 && (
              <p className="text-[13px] text-vv-ink-2">
                No packages are currently available.
              </p>
            )}
            {packages.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={cn(
                      "relative flex flex-col gap-1.5 rounded-xl border p-5 text-left transition",
                      selectedPackage?.id === pkg.id
                        ? "border-vv-accent bg-vv-accent/10"
                        : "border-vv-line hover:border-vv-ink",
                    )}
                  >
                    {pkg.is_first_lesson && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-vv-accent px-2.5 py-0.5 text-[10px] font-semibold text-vv-accent-deep">
                        ★ Recommended for new students
                      </span>
                    )}
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-vv-ink text-[15px]">
                        {pkg.title}
                      </span>
                      <span className="text-[18px] font-bold text-vv-ink shrink-0">
                        ${pkg.price}
                      </span>
                    </div>
                    <p className="text-[13px] text-vv-ink-2">
                      {pkg.description}
                    </p>
                    <span className="text-[12px] text-vv-muted">
                      {pkg.total_classes} {pkg.total_classes === 1 ? "class" : "classes"}
                      {" · "}
                      valid for {pkg.validity_days} days
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2. Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-1 text-vv-ink">
              Choose Your Date &amp; Time
            </h2>
            <p className="text-[13px] text-vv-ink-2 mb-6">
              Real availability for {selectedTeacher?.name ?? "your teacher"},
              shown in your own timezone.
            </p>
            <SlotPicker
              teacherId={selectedTeacherId}
              timeZone={timeZone}
              date={selectedDate}
              onDateChange={changeDate}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </div>
        )}

        {/* Step 3. Details */}
        {step === 3 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-vv-ink">
              Your Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bk-first" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  First name
                </label>
                <input
                  id="bk-first"
                  type="text"
                  required
                  value={details.first_name}
                  onChange={(e) => setDetail("first_name", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bk-last" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Last name <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="bk-last"
                  type="text"
                  value={details.last_name}
                  onChange={(e) => setDetail("last_name", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="bk-email" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Email address
                </label>
                <input
                  id="bk-email"
                  type="email"
                  required
                  value={details.email}
                  onChange={(e) => setDetail("email", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
                <p className="text-[12px] text-vv-ink-2">
                  We use this to find or create your student account.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bk-phone" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Phone <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  value={details.phone_number}
                  onChange={(e) => setDetail("phone_number", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bk-country" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Country <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="bk-country"
                  type="text"
                  value={details.country}
                  onChange={(e) => setDetail("country", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="bk-level" className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Your current Spanish level
                </label>
                {/* Free text na — backend enum value gula-i pathano hoy */}
                <select
                  id="bk-level"
                  value={details.spanish_level}
                  onChange={(e) => setDetail("spanish_level", e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                >
                  {SPANISH_LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {detailErrors.length > 0 && (
              <ul
                role="alert"
                className="mt-4 list-disc rounded-lg border border-red-200 bg-red-50 py-3 pl-8 pr-4 text-[13px] text-red-700"
              >
                {detailErrors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Step 4. Payment */}
        {step === 4 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-2 text-vv-ink">
              Payment
            </h2>
            <p className="text-[13px] text-vv-ink-2 mb-6">
              Review your booking and confirm.
            </p>
            <div className="rounded-xl border border-vv-line bg-vv-bg-warm p-6 mb-6">
              <h3 className="font-semibold text-vv-ink mb-3">Order Summary</h3>
              <dl className="flex flex-col gap-2 text-[14px]">
                {[
                  ["Teacher", selectedTeacher?.name],
                  ["Package", selectedPackage?.title],
                  ["Date", `${slotDateLabel} at ${selectedSlot?.label ?? ""}`],
                  ["Platform", "Google Meet"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-vv-ink-2">{label}</dt>
                    <dd className="font-medium text-vv-ink">{value}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-vv-line pt-3 mt-1 text-[16px] font-bold">
                  <dt className="text-vv-ink">Total</dt>
                  <dd className="text-vv-ink">${selectedPackage?.price}</dd>
                </div>
              </dl>
            </div>
            {/*
              Kono card number/expiry/CVC neওয়া hoy NA — Phase 1-e backend ekta
              dummy gateway chalay ar shudhu documented `payment_method` token
              ney. Asol card field boshale amra PCI scope-e dhuke jetam ar oi
              data kothao jeto-o na.
            */}
            <div className="rounded-xl border border-vv-line bg-vv-bg p-6">
              <p className="text-[14px] text-vv-ink">
                Payments are being finalised. Your place is reserved as soon as
                you confirm, and we will email you the invoice.
              </p>
              <p className="mt-2 text-[12px] text-vv-ink-2">
                No card details are collected on this page.
              </p>
            </div>

            {checkout.isError && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
              >
                {/* Backend-er nijer message — slot chole geche, lead time, first-lesson
                    limit ba declined card — shob ekhanei bola hoy */}
                {(checkout.error as { response?: { data?: { message?: string } } })
                  ?.response?.data?.message ??
                  "We could not complete your booking. Please try again."}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-vv-line pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              disabled={!canAdvance()}
              onClick={() => setStep((s) => s + 1)}
              className={cn(
                "inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px",
                !canAdvance() && "opacity-40 cursor-not-allowed",
              )}
            >
              Continue{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={checkout.isPending}
              onClick={handleConfirm}
              className={cn(
                "inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px",
                checkout.isPending && "opacity-60 cursor-not-allowed",
              )}
            >
              {checkout.isPending
                ? "Confirming…"
                : `Confirm booking · $${selectedPackage?.price ?? ""}`}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
