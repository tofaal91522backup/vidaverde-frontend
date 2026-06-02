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
      className="border-t border-[var(--vv-line)] py-16"
      data-screen-label="05 FAQ"
      id="faq"
    >
      <Container className="max-w-[880px]">
        <span className="eyebrow">{"// Common questions"}</span>
        <div className="h-4" />
        <h2 className="h2 mb-8">Questions before you book?</h2>
        <Accordion type="single" collapsible>
          {onlineClassesFaqs.map((faq) => (
            <AccordionItem
              className="faq-item"
              key={faq.question}
              value={faq.question}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="ans">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
