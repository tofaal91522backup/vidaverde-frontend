import { Container } from "@/components/shared/Container";
import {
  faqs,
  homestayMosaic,
  homestayPillars,
  includedItems,
  pricingTiers,
} from "./data/marketing.data";
import { GallerySection } from "./components/GallerySection";
import { SectionHeader } from "./components/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function HomestayRoute() {
  return (
    <>
      <section className="hs-hero" data-screen-label="01 Homestay Hero">
        <Container>
          <div className="crumb">Home <span>/</span> Homestay</div>
          <h1>
            Homestay with
            <br />
            an Ecuadorian <em>familia.</em>
          </h1>
          <p className="lede">
            At Vida Verde, living at a homestay in Quito with a local family is
            one of the most powerful ways to make your Ecuadorian experience
            unforgettable.
          </p>
          <GallerySection images={homestayMosaic} />
        </Container>
      </section>
      <section className="hs-pillars" data-screen-label="02 Why Homestay">
        <Container>
          <div className="grid">
            <div>
              <span className="eyebrow">{"// Why a homestay"}</span>
              <div className="h-4" />
              <h2 className="h2">
                Total immersion,
                <br />
                actually.
              </h2>
              <p className="text-muted mt-[18px] max-w-[36ch]">
                Four reasons our students extend their stay by an average of 3
                weeks.
              </p>
            </div>
            <div className="pillar-list">
              {homestayPillars.map((pillar) => (
                <div className="pillar" key={pillar.number}>
                  <div className="num">{pillar.number}</div>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="hs-included" data-screen-label="03 What's Included">
        <Container>
          <span className="eyebrow">{"// What's included"}</span>
          <div className="h-[18px]" />
          <h2 className="h2">
            Everything you need.
            <br />
            Nothing extra to figure out.
          </h2>
          <div className="h-12" />
          <div className="grid">
            {includedItems.map((item) => (
              <article className="inc" key={item.title}>
                <div className="dot">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="hs-pricing" data-screen-label="04 Pricing">
        <Container>
          <SectionHeader
            eyebrow="// Pricing"
            title="Simple weekly rates."
            lede="Add a homestay to any course. Discounts kick in past 4 weeks."
          />
          <div className="grid">
            {pricingTiers.map((tier) => (
              <article className={tier.featured ? "tier feat" : "tier"} key={tier.title}>
                <h3>{tier.title}</h3>
                <div className="price">
                  {tier.price}
                  <span className="per"> {tier.period}</span>
                </div>
                <p className="text-muted m-0">{tier.description}</p>
                <ul>
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link
                  href="/#book"
                  className={tier.featured ? "vv-btn vv-btn-dark" : "vv-btn vv-btn-ghost"}
                >
                  {tier.cta} →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="hs-faq" data-screen-label="05 FAQ">
        <Container className="max-w-[880px]">
          <span className="eyebrow">{"// Common questions"}</span>
          <div className="h-4" />
          <h2 className="h2 mb-8">Things students ask first.</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem className="faq-item" key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="ans">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
