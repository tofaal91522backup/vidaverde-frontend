import { Container } from "@/components/shared/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type LegalListItem = { term?: string; text: string };

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: LegalListItem[] }
  | { type: "link"; label: string; href: string }
  | { type: "contact" };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalContent = {
  title: string;
  breadcrumb: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

const EMAIL = "info@vidaverde.com";
const WHATSAPP_LABEL = "+593 99 803 7473";
const WHATSAPP_HREF = "https://wa.me/593998037473";

function ContactBlock() {
  return (
    <div className="rounded-[18px] border border-vv-line bg-vv-bg-warm p-5">
      <div className="text-[14px] font-semibold text-vv-ink">
        Vida Verde Centro de Español
      </div>
      <div className="mt-1 text-[14px] leading-[1.7] text-vv-ink-2">
        La Floresta, Quito, Ecuador
      </div>
      <div className="mt-2 flex flex-col gap-1 text-[14px] leading-[1.7]">
        <a
          href={`mailto:${EMAIL}`}
          className="text-vv-ink-2 underline underline-offset-2 transition hover:text-vv-ink"
        >
          {EMAIL}
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-vv-ink-2 underline underline-offset-2 transition hover:text-vv-ink"
        >
          WhatsApp {WHATSAPP_LABEL}
        </a>
      </div>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p className="text-[15px] leading-[1.75] text-vv-ink-2 m-0">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
        {block.items.map((item) => (
          <li
            key={item.text}
            className="flex gap-3 text-[15px] leading-[1.7] text-vv-ink-2"
          >
            <span
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-vv-accent"
              aria-hidden="true"
            />
            <span>
              {item.term ? (
                <strong className="font-semibold text-vv-ink">
                  {item.term}
                </strong>
              ) : null}
              {item.term ? " " : null}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "link") {
    return (
      <Link
        href={block.href}
        className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-vv-ink underline underline-offset-4 transition hover:text-vv-accent-deep"
      >
        {block.label}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    );
  }

  return <ContactBlock />;
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Legal Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span>{" "}
            {content.breadcrumb}
          </div>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Legal"}
          </span>
          <h1 className="mt-4 text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            {content.title}
          </h1>
          <p className="font-code text-[13px] text-vv-muted tracking-[0.04em] m-0">
            Last updated: {content.updated}
          </p>
          <div className="mt-6 flex flex-col gap-4 max-w-[70ch]">
            {content.intro.map((text) => (
              <p
                key={text}
                className="text-vv-ink-2 text-[clamp(15px,1.2vw,17px)] leading-[1.75] text-pretty m-0"
              >
                {text}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-vv-bg" data-screen-label="02 Legal Body">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
            {/* Table of contents */}
            <aside className="max-lg:hidden">
              <nav
                aria-label="On this page"
                className="sticky top-24 flex flex-col gap-3"
              >
                <div className="font-code text-[10px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                  On this page
                </div>
                <ol className="flex flex-col gap-2 list-none p-0 m-0">
                  {content.sections.map((section, i) => (
                    <li key={section.id} className="flex gap-2.5">
                      <span className="font-code text-[11px] text-vv-muted-2 pt-[3px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="text-[13px] leading-snug text-vv-ink-2 transition hover:text-vv-ink"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Sections */}
            <div className="flex flex-col gap-10 max-w-[72ch]">
              {content.sections.map((section, i) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="flex flex-col gap-4 scroll-mt-24"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-code text-[11px] font-medium text-vv-muted-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.02em] leading-[1.15] text-vv-ink m-0">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {section.blocks.map((block, bi) => (
                      <Block key={bi} block={block} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
