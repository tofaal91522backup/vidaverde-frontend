"use client";
import { ByLanguage } from "@/components/shared/by-language";
import { PartyPopper } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { useCaptureLead } from "@/features/marketing/queries/use-capture-lead";
import {
  LeadSchema,
  type LeadFormValues,
} from "@/features/marketing/schemas/lead.schema";
import type { PublicAcknowledgementResponse } from "@/features/marketing/types/public-api.types";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { getErrorMessage } from "@/utils/get-error-message";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NewsletterSignup() {
  const [response, setResponse] =
    useState<PublicAcknowledgementResponse | null>(null);
  const mutation = useCaptureLead({
    source: "blog_post",
    onSuccess: setResponse,
  });
  const { form, submitErrors } = useZodTanstackForm<LeadFormValues>({
    defaultValues: { first_name: "", email: "", gdpr_consent: false },
    schema: LeadSchema,
    mutation,
    fieldLabels: {
      first_name: "First name",
      email: "Email address",
      gdpr_consent: "Email consent",
    },
  });

  return (
    <section
      className="border-t border-vv-line bg-vv-bg-warm"
      data-screen-label="03 Newsletter"
      id="newsletter"
    >
      <Container>
        <div className="rounded-[30px] border border-vv-line bg-vv-bg p-8 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Newsletter"}
              </span>
              <h2 className="mt-4 text-[clamp(26px,2.8vw,40px)] font-semibold tracking-[-0.02em] leading-[1.1] m-0 text-balance">
                Spanish tips, straight to your inbox.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-vv-ink-2 m-0">
                New posts on learning Spanish, travelling Ecuador, and life at
                the school. A few times a month, never more.
              </p>
            </div>

            {response ? (
              <div className="flex flex-col items-start gap-3 rounded-[22px] border border-vv-accent bg-vv-accent/10 p-8">
                <PartyPopper
                  className="size-9 text-vv-accent-deep"
                  aria-hidden="true"
                />
                <h3 className="text-[20px] font-semibold text-vv-ink m-0">
                  You&apos;re on the list.
                </h3>
                <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                  {response.message}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  form.handleSubmit();
                }}
                className="flex flex-col gap-4"
              >
                <SubmitErrorSummary errors={submitErrors} />
                {mutation.isError && (
                  <p className="text-sm text-red-600" role="alert">
                    {getErrorMessage(mutation.error)}
                  </p>
                )}

                <div className="grid gap-4">
                  <form.Field name="first_name">
                    {(field) => (
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="newsletter-name"
                          className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
                        >
                          {/* Google "Nombre de pila" — shoja "Nombre" */}
                          <span translate="no">
                            <ByLanguage en="First Name" es="Nombre" />
                          </span>
                        </label>
                        <input
                          id="newsletter-name"
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          }
                          placeholder="Maria"
                          className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                        />
                      </div>
                    )}
                  </form.Field>
                  <form.Field name="email">
                    {(field) => (
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="newsletter-email"
                          className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
                        >
                          Email Address
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid
                          }
                          placeholder="maria@example.com"
                          className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name="gdpr_consent">
                  {(field) => (
                    <div className="flex items-start gap-2">
                      <input
                        id="newsletter-consent"
                        type="checkbox"
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.checked)
                        }
                        aria-invalid={
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid
                        }
                        className="mt-1 h-4 w-4 accent-vv-accent cursor-pointer"
                      />
                      <label
                        htmlFor="newsletter-consent"
                        className="text-[12px] text-vv-ink-2 leading-normal"
                      >
                        I agree to receive emails from Vida Verde.{" "}
                        <Link
                          href="/privacy"
                          className="underline hover:text-vv-ink"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  )}
                </form.Field>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="mt-1 w-fit inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {mutation.isPending ? (
                    "Subscribing…"
                  ) : (
                    <>
                      {/* Google "Suscribir" (infinitive) */}
                      <span translate="no">
                        <ByLanguage en="Subscribe" es="Suscríbete" />
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                    </>
                  )}
                </button>

                <p className="text-[12px] text-vv-ink-2 m-0">
                  No spam. One-click unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
