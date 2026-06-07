import { Container } from "@/components/shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { onlineClassesFaqs } from "../data/online-classes.data";

export function OnlineClassesFAQ() {
  return (
    <section
      className="border-t border-vv-line"
      data-screen-label="05 FAQ"
      id="faq"
    >
      <Container className="max-w-220">
        <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
          {"// Common questions"}
        </span>
        <div className="h-4" />
        <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-8 text-balance">
          Questions before you book?
        </h2>
        <Accordion type="single" collapsible>
          {onlineClassesFaqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-vv-ink-2">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
