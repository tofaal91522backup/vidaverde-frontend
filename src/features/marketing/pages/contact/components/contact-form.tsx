"use client";
import { Check } from "lucide-react";

import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import {
  useContactSubjects,
  useSendContactMessage,
} from "@/features/marketing/queries/use-contact";
import {
  ContactSchema,
  type ContactFormValues,
} from "@/features/marketing/schemas/contact.schema";
import type { PublicAcknowledgementResponse } from "@/features/marketing/types/public-api.types";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { getErrorMessage } from "@/utils/get-error-message";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ContactForm({ programme = "" }: { programme?: string }) {
  const [response, setResponse] =
    useState<PublicAcknowledgementResponse | null>(null);
  const {
    data: subjectData,
    isLoading: subjectsLoading,
    isError: subjectsError,
  } = useContactSubjects();
  const mutation = useSendContactMessage({ onSuccess: setResponse });
  const { form, submitErrors } = useZodTanstackForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "other",
      message: "",
      programme,
    },
    schema: ContactSchema,
    mutation,
    fieldLabels: {
      name: "Name",
      email: "Email address",
      subject: "Subject",
      message: "Message",
    },
  });
  const subjects = subjectData?.subjects ?? [];

  if (response) {
    return (
      <div className="flex flex-col items-start gap-4 py-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-vv-accent text-vv-accent-deep">
          <Check className="size-6" strokeWidth={3} aria-hidden="true" />
        </div>
        <h3 className="text-[22px] font-semibold text-vv-ink m-0">
          Message sent!
        </h3>
        <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
          {response.message}
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <Link
            href="/online-classes"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] leading-none py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            Explore Online Classes
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </Link>
          <Link
            href="/study-in-quito"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] leading-none py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
          >
            Study in Quito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <h3 className="text-[20px] font-semibold text-vv-ink m-0 mb-1">
          Send a Message
        </h3>
        <p className="text-[13px] text-vv-ink-2 m-0">
          We respond within 24 hours, Monday to Friday.
        </p>
      </div>

      <SubmitErrorSummary errors={submitErrors} />
      {mutation.isError && (
        <p className="text-sm text-red-600" role="alert">
          {getErrorMessage(mutation.error)}
        </p>
      )}

      <form.Field name="name">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-name"
              className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
            >
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              placeholder="Your full name"
              className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
            >
              Your email address
            </label>
            <input
              id="contact-email"
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              placeholder="you@example.com"
              className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="subject">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-subject"
              className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
            >
              What&apos;s this about?
            </label>
            <select
              id="contact-subject"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(
                  event.target.value as ContactFormValues["subject"],
                )
              }
              disabled={subjectsLoading || subjectsError}
              aria-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {subjectsLoading && <option>Loading subjects…</option>}
              {subjectsError && <option>Subjects unavailable</option>}
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
            {subjectsError && (
              <p className="text-[12px] text-red-600" role="alert">
                Could not load subjects. Please refresh and try again.
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
            >
              Your message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
              placeholder="Tell us a bit about what you're looking for. We'll get back to you within 24 hours."
              className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none resize-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
            />
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        disabled={mutation.isPending || subjectsLoading || subjectsError}
        className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
