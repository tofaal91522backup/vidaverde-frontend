"use client";

import { Container } from "@/components/shared/Container";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const subjects = [
  "Online Classes",
  "Immersion Programme",
  "Homestay",
  "Travel Spanish",
  "Other",
];

export default function ContactRoute() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-vv-bg-warm border-b border-vv-line" data-screen-label="01 Contact Hero">
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Contact
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Start the Conversation.
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            We respond to all enquiries within 48 hours, Monday to Friday. For
            faster replies, WhatsApp us directly.
          </p>
        </Container>
      </section>

      <section
        className="border-t border-vv-line py-16"
        data-screen-label="02 Contact Body"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                  {"// Get in touch"}
                </span>
                <div className="h-4" />
                <h2 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.08] m-0">
                  Contact Details
                </h2>
              </div>

              <ul className="flex flex-col gap-5">
                {[
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "+593 998 037 473",
                    href: "https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+Spanish+classes.",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+593 998 037 473",
                    href: "tel:+593998037473",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@vidaverde.com",
                    href: "mailto:info@vidaverde.com",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "Mallorca N24-55 y Barcelona, La Floresta, Quito, Ecuador",
                    href: "https://maps.google.com/?q=Mallorca+N24-55+y+Barcelona+Quito+Ecuador",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-vv-line bg-vv-bg-warm text-vv-ink-2">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-vv-ink-2 mb-0.5">
                          {item.label}
                        </div>
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[15px] text-vv-ink hover:text-vv-accent-deep transition"
                        >
                          {item.value}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <a
                href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+Spanish+classes."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px w-fit"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us Now
              </a>

              {/* Map embed placeholder */}
              <div className="aspect-video w-full overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg-warm">
                <iframe
                  title="Vida Verde location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d998.6540793490783!2d-78.49268!3d-0.20500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0xf2b7a77b2e7c99a9!2sVida+Verde+Spanish+School!5e0!3m2!1sen!2sec!4v1600000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-[22px] border border-vv-line bg-vv-bg-warm p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="text-5xl">✉️</div>
                  <h3 className="text-[22px] font-semibold text-vv-ink">
                    Message sent!
                  </h3>
                  <p className="text-vv-ink-2 max-w-[36ch]">
                    We&apos;ll get back to you within 48 hours (usually much sooner). For urgent queries, WhatsApp us directly.
                  </p>
                  <a
                    href="https://wa.me/593998037473"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                  >
                    Open WhatsApp →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-vv-ink mb-1">
                      Send a Message
                    </h3>
                    <p className="text-[13px] text-vv-ink-2">
                      We respond within 48 hours, Monday to Friday.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your goals, level, or questions…"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none resize-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
