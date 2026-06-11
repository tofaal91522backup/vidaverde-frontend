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
    <section
      className="overflow-hidden border-t border-vv-line bg-vv-bg"
      data-screen-label="Testimonials"
    >
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
          <div className="flex flex-col gap-3.5 max-w-160">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Testimonials"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Read Our Testimonials
            </h2>
          </div>
        </div>
      </Container>

      {/* Marquee. Full bleed, outside Container */}
      <div
        className="relative overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-linear-to-r before:from-vv-bg before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-linear-to-l after:from-vv-bg after:to-transparent"
        aria-label="Student testimonials"
        data-marquee
      >
        <div
          className="flex gap-5.5 w-max animate-[testimonial-marquee_36s_linear_infinite]"
          data-marquee-track
        >
          {marqueeTestimonials.map((testimonial, index) => (
            <article
              className="flex w-80 shrink-0 flex-col gap-4 rounded-2xl border border-vv-line bg-vv-bg-warm p-6 max-[640px]:w-72"
              key={`${testimonial.name}-${index}`}
              aria-hidden={index >= testimonials.length}
            >
              <Quote aria-hidden="true" className="h-5 w-5 text-vv-accent" />
              <blockquote className="text-[15px] leading-[1.65] text-vv-ink-2 m-0 line-clamp-5">
                {testimonial.quote}
              </blockquote>
              <footer className="font-code text-[12px] font-semibold text-vv-muted tracking-[0.06em] uppercase">
                {testimonial.name}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
