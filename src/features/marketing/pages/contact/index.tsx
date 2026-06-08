"use client";

import { Container } from "@/components/shared/Container";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const subjects = [
  "Online Classes",
  "Immersion Programme in Quito",
  "Travel Spanish",
  "Homestay",
  "Something else",
];

const WHATSAPP_HREF =
  "https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+Spanish+classes.";

export default function ContactRoute() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Contact Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Contact
          </div>
          <div className="grid lg:grid-cols-[1fr_auto]  gap-10 max-[900px]:grid-cols-1">
            <div>
              <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
                Let&apos;s Talk.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
                Have a question about our programmes, pricing, or whether Vida
                Verde is right for you? We&apos;re happy to help, in English or
                Spanish.
              </p>
            </div>

            {/* Contact icons illustration */}
            <div className="max-[900px]:hidden shrink-0">
              <svg
                viewBox="0 0 306 230"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-120"
              >
                {/* Card 1 — WhatsApp */}
                <rect x="0" y="18" width="88" height="194" rx="20" fill="#a3d635" />
                {/* Chat bubble icon */}
                <rect x="18" y="38" width="52" height="42" rx="12" fill="#1f3d1a" opacity="0.18" />
                <rect x="18" y="38" width="52" height="42" rx="12" fill="white" opacity="0.85" />
                <path d="M 24 80 L 18 94 L 34 80 Z" fill="white" opacity="0.85" />
                <rect x="26" y="48" width="30" height="5" rx="2.5" fill="#1f3d1a" opacity="0.28" />
                <rect x="26" y="58" width="24" height="5" rx="2.5" fill="#1f3d1a" opacity="0.28" />
                <rect x="26" y="68" width="18" height="5" rx="2.5" fill="#1f3d1a" opacity="0.28" />
                {/* Label */}
                <text x="44" y="112" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#1f3d1a">WhatsApp</text>
                <text x="44" y="128" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#1f3d1a" opacity="0.65">+593 998 037 473</text>
                {/* Badge */}
                <rect x="10" y="152" width="68" height="26" rx="13" fill="#1f3d1a" opacity="0.12" />
                <text x="44" y="169" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9.5" fontWeight="600" fill="#1f3d1a" opacity="0.8">Replies fast</text>
                {/* Online dot */}
                <circle cx="44" cy="202" r="6" fill="#1f3d1a" opacity="0.15" />
                <circle cx="44" cy="202" r="4" fill="#1f3d1a" opacity="0.5" />

                {/* Card 2 — Email */}
                <rect x="109" y="0" width="88" height="215" rx="20" fill="#f0f9d4" stroke="#a3d635" strokeWidth="1.5" />
                {/* Envelope icon */}
                <rect x="127" y="30" width="52" height="38" rx="7" fill="none" stroke="#1f3d1a" strokeWidth="2.2" />
                <polyline points="127,32 153,56 179,32" stroke="#1f3d1a" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
                {/* Label */}
                <text x="153" y="106" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#1f3d1a">Email</text>
                <text x="153" y="122" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8.5" fill="#1f3d1a" opacity="0.6">info@vidaverde.com</text>
                {/* Badge */}
                <rect x="119" y="148" width="68" height="26" rx="13" fill="#a3d635" opacity="0.4" />
                <text x="153" y="165" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9.5" fontWeight="600" fill="#1f3d1a">24hr response</text>
                {/* Stars */}
                {[0,1,2,3,4].map((i) => (
                  <text key={i} x={127 + i * 11} y="198" fontFamily="system-ui,sans-serif" fontSize="12" fill="#f59e0b">★</text>
                ))}

                {/* Card 3 — Location */}
                <rect x="218" y="18" width="88" height="194" rx="20" fill="#1f3d1a" />
                {/* Map pin icon */}
                <path d="M 262 36 C 250 36 240 46 240 58 C 240 72 262 92 262 92 C 262 92 284 72 284 58 C 284 46 274 36 262 36Z" fill="#a3d635" />
                <circle cx="262" cy="58" r="9" fill="#1f3d1a" />
                {/* Label */}
                <text x="262" y="112" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="white">Location</text>
                <text x="262" y="128" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="white" opacity="0.65">La Floresta</text>
                <text x="262" y="142" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="white" opacity="0.65">Quito, Ecuador</text>
                {/* Badge */}
                <rect x="228" y="162" width="68" height="26" rx="13" fill="white" opacity="0.1" />
                <text x="262" y="179" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="white" opacity="0.6">Online classes</text>
                {/* Globe dots */}
                <circle cx="262" cy="206" r="7" fill="white" opacity="0.08" />
                <circle cx="262" cy="206" r="4" fill="#a3d635" opacity="0.4" />

                {/* Scattered dots */}
                <circle cx="94" cy="14" r="3" fill="#a3d635" opacity="0.45" />
                <circle cx="100" cy="220" r="2.5" fill="#1f3d1a" opacity="0.18" />
                <circle cx="204" cy="8" r="2" fill="#a3d635" opacity="0.4" />
                <circle cx="210" cy="220" r="3" fill="#1f3d1a" opacity="0.15" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* Form + Contact Info */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="02 Contact Form"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                  {"// Get in touch"}
                </span>
                <div className="h-4" />
                <h2 className="text-[24px] font-semibold tracking-[-0.02em] leading-[1.08] m-0">
                  Contact Details
                </h2>
              </div>

              <ul className="flex flex-col gap-5">
                {[
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "+593 998 037 473",
                    href: WHATSAPP_HREF,
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
                    value: "La Floresta, Quito, Ecuador",
                    href: "https://maps.google.com/?q=La+Floresta+Quito+Ecuador",
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
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-[15px] text-vv-ink hover:text-vv-accent-deep transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="text-[13px] text-vv-muted border-l-2 border-vv-line pl-4 m-0">
                We respond to all enquiries within 24 hours, Monday to Friday.
              </p>
            </div>

            {/* Contact form */}
            <div className="rounded-[22px] border border-vv-line bg-vv-bg-warm p-8">
              {submitted ? (
                <div className="flex flex-col items-start gap-4 py-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-vv-accent text-vv-accent-deep text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-[22px] font-semibold text-vv-ink m-0">
                    Message sent!
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                    Thanks for getting in touch. We&apos;ll reply to{" "}
                    <strong className="text-vv-ink font-semibold">
                      {email}
                    </strong>{" "}
                    within 24 hours. In the meantime, feel free to explore our
                    programmes.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Link
                      href="/online-classes"
                      className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                    >
                      Explore Online Classes →
                    </Link>
                    <Link
                      href="/study-in-quito"
                      className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
                    >
                      Study in Quito
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold text-vv-ink m-0 mb-1">
                      Send a Message
                    </h3>
                    <p className="text-[13px] text-vv-ink-2 m-0">
                      We respond within 24 hours, Monday to Friday.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Your email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      What&apos;s this about?
                    </label>
                    <select
                      name="subject"
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none focus:border-vv-accent transition-colors"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2">
                      Your message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us a bit about what you're looking for. We'll get back to you within 24 hours."
                      className="rounded-lg border border-vv-line bg-vv-bg px-4 py-3 text-[15px] text-vv-ink outline-none resize-none placeholder:text-vv-ink-2/50 focus:border-vv-accent transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="03 WhatsApp CTA"
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-[52ch]">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// WhatsApp"}
              </span>
              <h2 className="text-[clamp(26px,2.5vw,38px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0">
                Prefer to Chat?
              </h2>
              <p className="text-[16px] leading-[1.7] text-vv-ink-2 m-0">
                WhatsApp is the fastest way to reach us. Send us a message and
                we&apos;ll reply as soon as we can.
              </p>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us →
            </a>
          </div>
        </Container>
      </section>

      {/* Location */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="04 Location"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Location"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Find Us
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                We&apos;re based in La Floresta, one of Quito&apos;s most
                welcoming neighbourhoods. Our online classes can be taken from
                anywhere in the world.
              </p>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-vv-line bg-vv-bg-warm text-vv-ink-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-vv-ink-2 mb-1">
                    Address
                  </div>
                  <p className="text-[14px] text-vv-muted m-0 leading-snug border-l-2 border-vv-line pl-3">
                    {/* [VIDA VERDE TO SUPPLY — full street address] */}
                    {/* <br /> */}
                    La Floresta, Quito, Ecuador
                  </p>
                </div>
              </div>
            </div>

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
        </Container>
      </section>
    </>
  );
}
