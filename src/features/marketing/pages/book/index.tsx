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
    description: "60-min session with full level assessment and personalised learning plan. One per student.",
    badge: "★ Recommended for new students",
  },
  {
    id: "single",
    label: "Single Class",
    price: "$[X]",
    description: "One 60-minute lesson. No commitment.",
  },
  {
    id: "pack-10",
    label: "10-Class Package",
    price: "$[X]",
    description: "10 × 60-min private lessons. Valid for 3 months.",
  },
  {
    id: "pack-20",
    label: "20-Class Package",
    price: "$254.64",
    description: "20 × 60-min private lessons. Best-value package for serious learners. Valid for 6 months.",
    badge: "★ Best value",
  },
];

const levels = [
  "Complete beginner — I know very little Spanish",
  "Beginner — I know some basics",
  "Intermediate — I can hold simple conversations",
  "Upper intermediate — I'm fairly comfortable but want to improve",
  "Advanced — I want to polish and perfect",
];

const STEPS = ["Choose Your Teacher", "Choose Your Package", "Date & Time", "Your Details", "Payment"] as const;

export default function BookRoute() {
  const searchParams = useSearchParams();
  const preselectedTeacher = searchParams.get("teacher");

  const initialTeacher =
    teachers.find((t) => t.firstName.toLowerCase() === preselectedTeacher?.toLowerCase()) ?? null;

  const [step, setStep] = useState(initialTeacher ? 1 : 0);
  const [selectedTeacher, setSelectedTeacher] = useState<(typeof teachers)[number] | null>(initialTeacher);
  const [matchMe, setMatchMe] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[number] | null>(packages[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", level: levels[0] });
  const [confirmed, setConfirmed] = useState(false);

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const canAdvance = () => {
    if (step === 0) return !!selectedTeacher || matchMe;
    if (step === 1) return !!selectedPackage;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!details.firstName && !!details.lastName && !!details.email;
    if (step === 4) return true;
    return false;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <section className="min-h-[70vh] flex items-center" data-screen-label="Booking Confirmed">
        <Container className="text-center py-20">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-balance">
            You&apos;re booked!
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] mx-auto m-0">
            Your lesson with{" "}
            <strong className="text-vv-ink">
              {matchMe ? "your matched teacher" : selectedTeacher?.name}
            </strong>{" "}
            is confirmed for{" "}
            <strong className="text-vv-ink">{selectedDate}</strong> at{" "}
            <strong className="text-vv-ink">{selectedTime}</strong> in your timezone.
            Check your inbox — we&apos;ve sent everything you need.
          </p>
          <div className="mt-8 rounded-xl border border-vv-line bg-vv-bg-warm p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-vv-ink mb-3">Booking Summary</h3>
            <dl className="flex flex-col gap-2 text-[14px]">
              {[
                ["Teacher", matchMe ? "Matched by Vida Verde" : selectedTeacher?.name],
                ["Package", selectedPackage?.label],
                ["Date", selectedDate],
                ["Time", selectedTime],
                ["Platform", "Google Meet (link sent by email)"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-vv-ink-2">{label}</dt>
                  <dd className="font-medium text-vv-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px mt-6"
          >
            Add to Calendar →
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

        {/* Step 0 — Teacher */}
        {step === 0 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-1 text-vv-ink">Choose Your Teacher</h2>
            <p className="text-[14px] text-vv-ink-2 mb-6">
              Not sure? We&apos;ll match you with the best available teacher.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {teachers.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => { setSelectedTeacher(t); setMatchMe(false); }}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-4 text-left transition",
                    selectedTeacher?.name === t.name && !matchMe
                      ? "border-vv-accent bg-vv-accent/10"
                      : "border-vv-line hover:border-vv-ink",
                  )}
                >
                  <div className="h-12 w-12 shrink-0 rounded-full bg-vv-bg-warm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-vv-ink text-[15px]">{t.name}</div>
                    <div className="text-[12px] text-vv-ink-2">{t.availability}</div>
                  </div>
                </button>
              ))}

              {/* Match me option */}
              <button
                type="button"
                onClick={() => { setMatchMe(true); setSelectedTeacher(null); }}
                className={cn(
                  "flex items-center gap-4 rounded-xl border p-4 text-left transition sm:col-span-2",
                  matchMe
                    ? "border-vv-accent bg-vv-accent/10"
                    : "border-vv-line border-dashed hover:border-vv-ink",
                )}
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-vv-bg-warm border border-vv-line flex items-center justify-center text-xl">
                  ✨
                </div>
                <div>
                  <div className="font-semibold text-vv-ink text-[15px]">Match me with a teacher</div>
                  <div className="text-[12px] text-vv-ink-2">
                    Tell us your level and goals — we&apos;ll pick the best fit for you.
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 1 — Package */}
        {step === 1 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-6 text-vv-ink">Choose Your Package</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={cn(
                    "relative flex flex-col gap-1.5 rounded-xl border p-5 text-left transition",
                    selectedPackage?.id === pkg.id
                      ? "border-vv-accent bg-vv-accent/10"
                      : "border-vv-line hover:border-vv-ink",
                  )}
                >
                  {pkg.badge && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-vv-accent px-2.5 py-0.5 text-[10px] font-semibold text-vv-accent-deep">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-vv-ink text-[15px]">{pkg.label}</span>
                    <span className="text-[18px] font-bold text-vv-ink shrink-0">{pkg.price}</span>
                  </div>
                  <p className="text-[13px] text-vv-ink-2">{pkg.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-[20px] font-semibold mb-1 text-vv-ink">Choose Your Date &amp; Time</h2>
            <p className="text-[13px] text-vv-ink-2 mb-6">
              Times shown in your local timezone. Ecuador is GMT−5.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
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
                          ? "border-vv-accent bg-vv-accent/10 font-medium text-vv-ink"
                          : "border-vv-line text-vv-ink-2 hover:border-vv-ink",
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
            <h2 className="text-[20px] font-semibold mb-6 text-vv-ink">Your Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  First name
                </label>
                <input
                  type="text"
                  required
                  value={details.firstName}
                  onChange={(e) => setDetails((d) => ({ ...d, firstName: e.target.value }))}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  value={details.lastName}
                  onChange={(e) => setDetails((d) => ({ ...d, lastName: e.target.value }))}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={details.email}
                  onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Your current Spanish level
                </label>
                <select
                  value={details.level}
                  onChange={(e) => setDetails((d) => ({ ...d, level: e.target.value }))}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
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
            <h2 className="text-[20px] font-semibold mb-2 text-vv-ink">Payment</h2>
            <p className="text-[13px] text-vv-ink-2 mb-6">
              Secure payment via Stripe. Your card details are never stored on our servers.
            </p>
            <div className="rounded-xl border border-vv-line bg-vv-bg-warm p-6 mb-6">
              <h3 className="font-semibold text-vv-ink mb-3">Order Summary</h3>
              <dl className="flex flex-col gap-2 text-[14px]">
                {[
                  ["Teacher", matchMe ? "Matched by Vida Verde" : selectedTeacher?.name],
                  ["Package", selectedPackage?.label],
                  ["Date", `${selectedDate} at ${selectedTime}`],
                  ["Platform", "Google Meet"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-vv-ink-2">{label}</dt>
                    <dd className="font-medium text-vv-ink">{value}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-vv-line pt-3 mt-1 text-[16px] font-bold">
                  <dt className="text-vv-ink">Total</dt>
                  <dd className="text-vv-ink">{selectedPackage?.price}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-vv-line bg-vv-bg p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none font-mono focus:border-vv-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none font-mono focus:border-vv-accent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none font-mono focus:border-vv-accent"
                  />
                </div>
              </div>
              <p className="text-[11px] text-vv-ink-2">
                🔒 Payments powered by Stripe. We accept Visa, Mastercard, Apple Pay and Google Pay.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-vv-line pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
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
                "inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px",
                !canAdvance() && "opacity-40 cursor-not-allowed",
              )}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Confirm &amp; Pay — {selectedPackage?.price}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
