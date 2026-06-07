import { Container } from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const teachers = [
  {
    name: "Ximena Argüello",
    image: "/images/teachers/2.jpg",
    credentials: "Universidad Central del Ecuador — Linguistics",
    experience: "13+ years",
    bio: "Students say class hours with Ximena pass by in a flash. She has been teaching Spanish since 2011 and is fluent in English, making her especially effective with beginners and those coming from an English-speaking background.",
    specialisations: ["Beginner-friendly", "Conversational Spanish", "DELE Preparation"],
  },
  {
    name: "Lucía Rivadeneira",
    image: "/images/teachers/3.jpg",
    credentials: "PUCE Quito — Modern Languages",
    experience: "10+ years",
    bio: "Lucía is a language nerd who loves to teach the nuts and bolts of Spanish. She excels at helping students understand grammar intuitively and speaks at a clear, easy-to-follow pace that students find ideal for building accuracy.",
    specialisations: ["Grammar Focus", "Intermediate to Advanced", "Business Spanish"],
  },
  {
    name: "Fernando Báez Guzmán",
    image: "/images/teachers/4.jpg",
    credentials: "Universidad de Cuenca — Spanish Literature",
    experience: "20+ years",
    bio: "Fernando is our Academic Director and master teacher. He brings structure, warmth, and deep expertise to every lesson. Students consistently rate him as the most effective and inspiring teacher they have encountered.",
    specialisations: ["All Levels", "Academic Spanish", "Advanced Conversation"],
  },
  {
    name: "Rosa Laura García Caiza",
    image: "/images/teachers/5.jpg",
    credentials: "Universidad Central del Ecuador — Education",
    experience: "33+ years",
    bio: "Laura has taught Spanish since 1991. She has a deep passion for sharing Ecuadorian culture with her students and considers herself not just a teacher but an ambassador of her culture and her language. Her warmth and enthusiasm are immediately apparent in every session.",
    specialisations: ["Culture & Language", "Beginners", "Travel Spanish"],
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    alt: "Spanish classroom in Quito",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    alt: "Students in a language class",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "School garden patio",
  },
  {
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    alt: "One-on-one Spanish lesson",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
    alt: "La Floresta neighbourhood, Quito",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    alt: "Students learning together",
  },
];

export default function OurSchoolRoute() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vv-bg-warm border-b border-vv-line" data-screen-label="01 Our School Hero">
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Our School
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            25 Years. 4,700 Students.
            <br />
            Lasting Connections.
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            Vida Verde is an AECEE-certified Spanish school in La Floresta,
            Quito — founded in 1999 by Rosa Proaño, rooted in a love of
            language, culture, and Ecuador.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Start Learning Online →
            </Link>
            <Link
              href="/study-in-quito"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Study in Quito
            </Link>
          </div>
        </Container>
      </section>

      {/* Rosa's Story */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="02 Rosa Story"
        id="story"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg">
              <Image
                src="/images/teachers/1.jpg"
                alt="Rosa Proaño, founder of Vida Verde Spanish School"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Rosa's Story"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Teaching Spanish Since 1999
              </h2>
              <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-vv-ink-2">
                <p>
                  I started Vida Verde in 1999 with a simple belief: that
                  learning a language is most powerful when it happens inside
                  a culture, not just a classroom. La Floresta, our
                  neighbourhood in Quito, has always felt like the perfect
                  place for that — bohemian, walkable, full of life.
                </p>
                <p>
                  Over 25 years, I have watched students arrive not knowing a
                  word of Spanish and leave able to laugh with their host
                  family, navigate the markets, and connect with Ecuador in a
                  way that stays with them long after they return home. That
                  transformation — that moment when language stops being an
                  obstacle and becomes a door — is why I do this.
                </p>
                <p>
                  Vida Verde has always been a family school. Our teachers
                  are not just qualified — they genuinely care. When a
                  student struggles, we notice. When they breakthrough, we
                  celebrate. Every student who comes through our doors,
                  online or in person, becomes part of our community.
                </p>
                <p>
                  As a certified member of the AECEE — Ecuador&apos;s standard of
                  excellence in Spanish education — we hold ourselves to the
                  highest professional standards. But behind every
                  certificate is something simpler: a commitment to showing
                  you the Ecuador we love, through the language that opens it
                  up.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AECEE Certification */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="03 AECEE"
        id="certification"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Certification"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                AECEE Certified
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                The AECEE (Asociación Ecuatoriana de Centros de Español) is
                Ecuador&apos;s professional association for Spanish language
                schools. Certification means Vida Verde meets rigorous
                standards for teacher qualifications, curriculum structure,
                student safety, and professional practice.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                For students, AECEE certification is a signal that the school
                is accountable — not a freelancer marketplace, not a hobbyist
                operation, but a professional institution that has been
                independently evaluated and approved.
              </p>
              <a
                href="https://www.aecee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg w-fit"
              >
                Visit AECEE website →
              </a>
            </div>
            <div className="rounded-[22px] border border-vv-line bg-vv-bg-warm p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "25+", label: "Years teaching" },
                  { num: "4,700+", label: "Students taught" },
                  { num: "AECEE", label: "Certified school" },
                  { num: "100%", label: "Native speakers" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <div className="text-[32px] font-bold tracking-tight text-vv-ink">
                      {stat.num}
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* La Floresta */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="04 La Floresta"
        id="location"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-video w-full overflow-hidden rounded-[22px] border border-vv-line">
              <Image
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1000&q=80"
                alt="La Floresta neighbourhood, Quito"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Our Neighbourhood"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                La Floresta, Quito
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                La Floresta is one of Quito&apos;s most vibrant and characterful
                neighbourhoods — bohemian, safe, walkable, and rich in
                independent cafés, galleries, and restaurants. It sits close
                to Quito&apos;s cultural heart and is consistently regarded as one
                of the city&apos;s most liveable areas.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                For immersion students, La Floresta is a classroom extension.
                Host families are within 10 minutes&apos; walk. The markets,
                parks, and street life give you Spanish to practise the
                moment you leave the building.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Safe & walkable", "Close to cultural sites", "10 min from host families", "Vibrant café culture"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-vv-line bg-vv-bg px-3 py-1 text-[12px] font-medium text-vv-ink-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Teachers */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="05 Teachers"
        id="teachers"
      >
        <Container>
          <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
            <div className="flex flex-col gap-3.5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Our Teachers"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                The Team
              </h2>
            </div>
            <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[44ch] text-pretty m-0">
              Every Vida Verde teacher is a university-trained Ecuadorian native
              speaker with a genuine passion for their craft.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {teachers.map((teacher) => (
              <article
                key={teacher.name}
                className="grid overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg md:grid-cols-[180px_1fr]"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-vv-bg-warm md:aspect-auto md:min-h-60">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 180px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink">
                      {teacher.name}
                    </h3>
                    <div className="mt-1 text-[12px] text-vv-ink-2">
                      {teacher.credentials} · {teacher.experience}
                    </div>
                  </div>
                  <p className="flex-1 text-[13px] leading-[1.6] text-vv-ink-2">
                    {teacher.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.specialisations.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-vv-line bg-vv-bg-warm px-2 py-0.5 text-[11px] text-vv-ink-2"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="06 Gallery"
        id="gallery"
      >
        <Container>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// School Gallery"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-8 text-balance">
            Life at Vida Verde
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div
                key={img.alt}
                className={`relative overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg ${i === 0 ? "aspect-video col-span-2 lg:col-span-2" : "aspect-square"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="07 CTA"
      >
        <Container className="text-center">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Ready to start?"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Join the Vida Verde Community
          </h2>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[50ch] mx-auto">
            Whether you learn online or in person, you become part of a
            25-year tradition of connection, growth, and discovery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Book Your First Lesson →
            </Link>
            <Link
              href="/study-in-quito"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Explore Immersion Programs
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
