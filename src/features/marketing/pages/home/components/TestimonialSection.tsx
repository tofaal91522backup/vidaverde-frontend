import { Container } from "@/components/shared/Container";
import { SectionHeader } from "./SectionHeader";
import { TestimonialCarousel } from "./TestimonialCarousel";

const TestimonialSection = () => {
  return (
    <section className="testimonials" data-screen-label="06 Testimonials">
      <Container>
        <SectionHeader
          eyebrow="// What students say"
          title='"You leave a different person."'
          lede="Students from around the world describe Vida Verde as welcoming, friendly, and effective."
        />
        <TestimonialCarousel />
      </Container>
    </section>
  );
};

export default TestimonialSection;
