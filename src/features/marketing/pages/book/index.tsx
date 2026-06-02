"use client";

import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const teachers = [
  {
    name: "Ximena Argüello",
    firstName: "Ximena",
    image: "/images/teachers/2.jpg",
    availability: "Mon – Fri mornings & afternoons",
  },
  {
    name: "Lucía Rivadeneira",
    firstName: "Lucía",
    image: "/images/teachers/3.jpg",
    availability: "Mon – Fri afternoons",
  },
  {
    name: "Fernando Báez Guzmán",
    firstName: "Fernando",
    image: "/images/teachers/4.jpg",
    availability: "Limited — Tue & Thu",
  },
  {
    name: "Rosa Laura García Caiza",
    firstName: "Laura",
    image: "/images/teachers/5.jpg",
    availability: "Mon, Wed & Fri",
  },
];

const packages = [
  {
    id: "first-lesson",
    label: "Assessment & First Lesson",
    price: "$12",
    description: "60-min session with level assessment. One per student.",
    badge: "Recommended",
  },
  {
    id: "single",
    label: "Single Class",
    price: "$15",
    description: "One 60-minute lesson. Pay as you go.",
  },
  {
    id: "pack-10",
    label: "10-Class Package",
    price: "$130",
    description: "10 × 60-min lessons. Valid 3 months.",
  },
  {
    id: "pack-20",
    label: "20-Class Package",
    price: "$250",
    description: "20 × 60-min lessons. Best value. Valid 6 months.",
    badge: "Best Value",
  },
];

const levels = ["None — complete beginner", "Beginner (A1–A2)", "Intermediate (B1–B2)", "Advanced (C1)"];

const STEPS = ["Teacher", "Package", "Date & Time", "Your Details", "Payment", "Confirmation"] as const;

export default function BookRoute() {
  const searchParams = useSearchParams();
  const preselectedTeacher = searchParams.get("teacher");

  const initialTeacher =
    teachers.find((t) => t.firstName.toLowerCase() === preselectedTeacher?.toLowerCase()) ?? null;

  const [step, setStep] = useState(initialTeacher ? 1 : 0);
  const [selectedTeacher, setSelectedTeacher] = useState<(typeof teachers)[number] | null>(initialTeacher);
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[number] | null>(packages[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", level: levels[0] });
  const [confirmed, setConfirmed] = useState(false);

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const canAdvance = () => {
    if (step === 0) return !!selectedTeacher;
    if (step === 1) return !!selectedPackage;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!details.firstName && !!details.lastName && !!details.email;
    if (step === 4) return true;
    return false;
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setStep(5);
  };

  if (confirmed) {
    return (
      <section className="min-h-[70vh] flex items-center" data-screen-label="Booking Confirmed">
        <Container className="text-center py-20">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="h2 mb-4">You&apos;re booked!</h1>
          <p className="lede max-w-[50ch] mx-auto text-[var(--vv-ink-2)]">
            A confirmation email with your Google Meet link and details about
            your teacher is on its way to{" "}
            <strong className="text-[var(--vv-ink)]">{details.email}</strong>.
          </p>
          <div className="mt-8 rounded-xl border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-[var(--vv-ink)] mb-3">Booking Summary</h3>
            <dl className="flex flex-col gap-2 text-[14px]">
              {[
                ["Teacher", selectedTeacher?.name],
                ["Package", selectedPackage?.label],
                ["Date", selectedDate],
                ["Time", selectedTime],
                ["Platform", "Google Meet (link sent by email)"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-[var(--vv-ink-2)]">{label}</dt>
                  <dd className="font-medium text-[var(--vv-ink)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a href="/" className="vv-btn vv-btn-ghost mt-6 inline-block">
            ← Back to homepage
          </a>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12" data-screen-label="Book a Lesson">
      <Container className="max-w-[860px]">
        {/* Progress */}
        <div className="mb-10">
          <div className="crumb mb-4">Home <span>/</span> Book a Lesson</div>
          <h1 className="h2 mb-6">Book Your Lesson</h1>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap text-[12px] font-medium px-3 py-1.5 rounded-full",
                  i < step
                    ? "bg-[var(--vv-accent)] text-[var(--vv-accent-deep)]"
                    : i === step
                    ? "border border-[var(--vv-ink)] text-[var(--vv-ink)]"
                    : "text-[var(--vv-ink-2)]",
                )}
              >
                <span>{i + 1}.</span> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Step 0 — Teacher */}
        {step === 0 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-[var(--vv-ink)]">Choose Your Teacher</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {teachers.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setSelectedTeacher(t)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-4 text-left transition",
                    selectedTeacher?.name === t.name
                      ? "border-[var(--vv-accent)] bg-[var(--vv-accent)]/10"
                      : "border-[var(--vv-line)] hover:border-[var(--vv-ink)]",
                  )}
                >
                  <div className="h-12 w-12 shrink-0 rounded-full bg-[var(--vv-bg-warm)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--vv-ink)] text-[15px]">{t.name}</div>
                    <div className="text-[12px] text-[var(--vv-ink-2)]">{t.availability}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Package */}
        {step === 1 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-[var(--vv-ink)]">Select a Package</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={cn(
                    "relative flex flex-col gap-1.5 rounded-xl border p-5 text-left transition",
                    selectedPackage?.id === pkg.id
                      ? "border-[var(--vv-accent)] bg-[var(--vv-accent)]/10"
                      : "border-[var(--vv-line)] hover:border-[var(--vv-ink)]",
                  )}
                >
                  {pkg.badge && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-[var(--vv-accent)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--vv-accent-deep)]">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-[var(--vv-ink)] text-[15px]">{pkg.label}</span>
                    <span className="text-[18px] font-bold text-[var(--vv-ink)] ml-2">{pkg.price}</span>
                  </div>
                  <p className="text-[13px] text-[var(--vv-ink-2)]">{pkg.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-[var(--vv-ink)]">Choose Date &amp; Time</h2>
            <p className="text-[13px] text-[var(--vv-ink-2)] mb-4">
              All times shown in your local timezone. Ecuador is GMT−5.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none focus:border-[var(--vv-accent)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                  Time
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-[14px] transition",
                        selectedTime === time
                          ? "border-[var(--vv-accent)] bg-[var(--vv-accent)]/10 font-medium text-[var(--vv-ink)]"
                          : "border-[var(--vv-line)] text-[var(--vv-ink-2)] hover:border-[var(--vv-ink)]",
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Details */}
        {step === 3 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-[var(--vv-ink)]">Your Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={details[field]}
                    onChange={(e) => setDetails((d) => ({ ...d, [field]: e.target.value }))}
                    className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none focus:border-[var(--vv-accent)]"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={details.email}
                  onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                  className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none focus:border-[var(--vv-accent)]"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                  Current Spanish Level
                </label>
                <select
                  value={details.level}
                  onChange={(e) => setDetails((d) => ({ ...d, level: e.target.value }))}
                  className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none focus:border-[var(--vv-accent)]"
                >
                  {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Payment */}
        {step === 4 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-2 text-[var(--vv-ink)]">Payment</h2>
            <p className="text-[13px] text-[var(--vv-ink-2)] mb-6">
              Secure payment processed by Stripe. Your card details never touch our servers.
            </p>
            <div className="rounded-xl border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] p-6 mb-6">
              <h3 className="font-semibold text-[var(--vv-ink)] mb-3">Order Summary</h3>
              <dl className="flex flex-col gap-2 text-[14px]">
                {[
                  ["Teacher", selectedTeacher?.name],
                  ["Package", selectedPackage?.label],
                  ["Date", `${selectedDate} at ${selectedTime}`],
                  ["Platform", "Google Meet"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-[var(--vv-ink-2)]">{label}</dt>
                    <dd className="font-medium text-[var(--vv-ink)]">{value}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[var(--vv-line)] pt-3 mt-1 text-[16px] font-bold">
                  <dt className="text-[var(--vv-ink)]">Total</dt>
                  <dd className="text-[var(--vv-ink)]">{selectedPackage?.price}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-[var(--vv-line)] bg-[var(--vv-bg)] p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none font-mono focus:border-[var(--vv-accent)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none font-mono focus:border-[var(--vv-accent)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none font-mono focus:border-[var(--vv-accent)]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[var(--vv-ink-2)]">
                🔒 Payments powered by Stripe. We accept Visa, Mastercard, Apple Pay and Google Pay.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 5 && (
          <div className="mt-8 flex items-center justify-between border-t border-[var(--vv-line)] pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="vv-btn vv-btn-ghost"
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
                className={cn("vv-btn vv-btn-primary", !canAdvance() && "opacity-40 cursor-not-allowed")}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="vv-btn vv-btn-primary"
              >
                Confirm & Pay {selectedPackage?.price} →
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
