import { Container } from "@/components/shared/Container";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Vince Murphy",
    quote:
      "Vida Verde was an exceptional experience for me. The school was welcoming and friendly. The professors were very impressive, they quickly discovered what I knew, or rather what I didn´t know, and pushed me very hard to study and practice new material. The classes were well structured and fun, and my Spanish quickly improved.",
  },
  {
    name: "Jennifer Cumming",
    quote:
      "My name is Jennifer Cumming. I am a Canadian that travelled to Quito this year to study Spanish.",
  },
  {
    name: "Christian",
    quote:
      "I want to thank all of you for your valuable collaboration for 7 years! It is an honor for me to work with the best teachers.",
  },
  {
    name: "Franziska Denker",
    quote:
      "Like many students travelling to Ecuador I have chosen Quito as the ideal place to combine a Spanish language course with my volunteer work. I decided for a tuition at Vida Verde in order to enhance my knowledge in Spanish in a short time and to apply it in a proper manner at my volunteer foundation CENIT.",
  },
];

const marqueeTestimonials = [...testimonials, ...testimonials];

export function TextTestimonialsSection() {
  return (
    <section className="text-testimonials" data-screen-label="Testimonials">
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Testimonials"}</span>
            <h2 className="h2">Read Our Testimonials</h2>
          </div>
        </div>

        <div className="text-testimonial-marquee" aria-label="Student testimonials">
          <div className="text-testimonial-track">
            {marqueeTestimonials.map((testimonial, index) => (
              <article
                className="text-testimonial-card"
                key={`${testimonial.name}-${index}`}
                aria-hidden={index >= testimonials.length}
              >
                <Quote aria-hidden="true" />
                <blockquote>{testimonial.quote}</blockquote>
                <footer>{testimonial.name}</footer>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
