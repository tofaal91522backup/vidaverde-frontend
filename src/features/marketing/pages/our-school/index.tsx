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
    specialisations: [
      "Beginner-friendly",
      "Conversational Spanish",
      "DELE Preparation",
    ],
  },
  {
    name: "Lucía Rivadeneira",
    image: "/images/teachers/3.jpg",
    credentials: "PUCE Quito — Modern Languages",
    experience: "10+ years",
    bio: "Lucía is a language nerd who loves to teach the nuts and bolts of Spanish. She excels at helping students understand grammar intuitively and speaks at a clear, easy-to-follow pace that students find ideal for building accuracy.",
    specialisations: [
      "Grammar Focus",
      "Intermediate to Advanced",
      "Business Spanish",
    ],
  },
  {
    name: "Fernando Báez Guzmán",
    image: "/images/teachers/4.jpg",
    credentials: "Universidad de Cuenca — Spanish Literature",
    experience: "20+ years",
    bio: "Fernando is our Academic Director and master teacher. He brings structure, warmth, and deep expertise to every lesson. Students consistently rate him as the most effective and inspiring teacher they have encountered.",
    specialisations: [
      "All Levels",
      "Academic Spanish",
      "Advanced Conversation",
    ],
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
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Our School Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Our School
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 max-[900px]:grid-cols-1">
            <div>
              <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
                A Family School.
                <br />
                25 Years of Spanish.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
                We started with one teacher, a love of language, and a home in
                La Floresta. Twenty-five years later, we&apos;re still here,
                and we&apos;ve taught over 4,700 students from every corner of
                the world.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/online-classes/book"
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
            </div>

            {/* Heritage illustration */}
            <div className="max-[900px]:hidden shrink-0">
              <svg
                viewBox="0 0 292 252"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-110"
              >
                {/* Dashed halo behind card */}
                <circle cx="91" cy="126" r="82" fill="none" stroke="#a3d635" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.22" />

                {/* Main credential card */}
                <rect x="10" y="26" width="162" height="196" rx="22" fill="#f0f9d4" stroke="#a3d635" strokeWidth="1.5" />
                <rect x="18" y="34" width="146" height="180" rx="15" fill="none" stroke="#a3d635" strokeWidth="0.75" opacity="0.45" />

                {/* Leaf motif top */}
                <path d="M 91 52 C 84 42 74 42 73 47 C 72 52 78 59 91 62 C 104 59 110 52 109 47 C 108 42 98 42 91 52Z" fill="#a3d635" opacity="0.6" />
                <line x1="91" y1="62" x2="91" y2="74" stroke="#a3d635" strokeWidth="1.5" opacity="0.5" />

                {/* Est. */}
                <text x="91" y="90" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#7a8a6a" letterSpacing="0.18em">EST.</text>

                {/* 1999 */}
                <text x="91" y="126" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="44" fontWeight="800" fill="#1f3d1a" letterSpacing="-0.04em">1999</text>

                {/* Divider */}
                <line x1="28" y1="135" x2="154" y2="135" stroke="#a3d635" strokeWidth="1" opacity="0.55" />

                {/* VIDA VERDE */}
                <text x="91" y="155" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill="#1f3d1a" letterSpacing="0.1em">VIDA VERDE</text>

                {/* Quito, Ecuador */}
                <text x="91" y="170" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9.5" fill="#7a8a6a">Quito, Ecuador</text>

                {/* AECEE badge */}
                <rect x="56" y="181" width="70" height="26" rx="13" fill="#a3d635" />
                <text x="91" y="198" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#1f3d1a">AECEE ✓</text>

                {/* Stat badge 1 — 25+ Years */}
                <rect x="184" y="26" width="100" height="60" rx="18" fill="white" stroke="#a3d635" strokeWidth="1.5" />
                <text x="234" y="52" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="24" fontWeight="800" fill="#1f3d1a">25+</text>
                <text x="234" y="68" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#7a8a6a">Years teaching</text>

                {/* Stat badge 2 — 4,700+ Students */}
                <rect x="184" y="102" width="100" height="60" rx="18" fill="#1f3d1a" />
                <text x="234" y="128" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="20" fontWeight="800" fill="#a3d635">4,700+</text>
                <text x="234" y="146" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="white" opacity="0.7">Students taught</text>

                {/* Stat badge 3 — 50+ Countries */}
                <rect x="184" y="178" width="100" height="60" rx="18" fill="#f0f9d4" stroke="#a3d635" strokeWidth="1.5" />
                <text x="234" y="204" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="24" fontWeight="800" fill="#1f3d1a">50+</text>
                <text x="234" y="222" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#7a8a6a">Countries</text>

                {/* Decorative dots */}
                <circle cx="174" cy="18" r="3" fill="#a3d635" opacity="0.4" />
                <circle cx="178" cy="94" r="2.5" fill="#1f3d1a" opacity="0.14" />
                <circle cx="178" cy="170" r="2.5" fill="#a3d635" opacity="0.32" />
                <circle cx="174" cy="246" r="3" fill="#1f3d1a" opacity="0.12" />
                <circle cx="8" cy="90" r="2" fill="#a3d635" opacity="0.28" />
                <circle cx="8" cy="164" r="2.5" fill="#1f3d1a" opacity="0.12" />
              </svg>
            </div>
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
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="relative mx-auto aspect-square w-full max-w-130 overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg">
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
                Our Story
              </h2>
              <p className="text-vv-muted text-[13px] border-l-2 border-vv-line pl-4 m-0">
                Rosa&apos;s founding story in her own words, to be supplied by
                Vida Verde. Suggested prompts: Why did you start Vida Verde in
                1999? What does La Floresta mean to you? What moment are you
                most proud of?
              </p>
              <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
                I started Vida Verde in 1999 with a simple belief: that learning
                a language is most powerful when it happens inside a culture, not
                just a classroom. La Floresta, our neighbourhood in Quito, has
                always felt like the perfect place for that. Bohemian, walkable,
                full of life.
              </p>
              <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
                Over 25 years, I have watched students arrive not knowing a word
                of Spanish and leave able to laugh with their host family,
                navigate the markets, and connect with Ecuador in a way that
                stays with them long after they return home.
              </p>
              <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
                Vida Verde has always been a family school. Our teachers are not
                just qualified. They genuinely care. Every student who comes
                through our doors, online or in person, becomes part of our
                community.
              </p>
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
                AECEE Certification
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                Vida Verde is a certified member of the AECEE — the Association
                of Centres of Spanish as a Foreign Language. AECEE certification
                is awarded only to schools that meet rigorous standards of
                teaching quality, curriculum structure, and student experience.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                For students, it means a guarantee: when you study with an
                AECEE-certified school, you know the teaching is professional,
                the methods are sound, and the experience is accountable.
              </p>
              <a
                href="https://www.aecee.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg w-fit"
              >
                Learn more about AECEE →
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
                className="object-cover object-top"
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
                La Floresta is one of Quito&apos;s most beloved neighbourhoods —
                bohemian, walkable, and full of life. It&apos;s home to
                independent cafés, art galleries, local markets, and some of the
                best food in the city.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                It&apos;s also one of the safest neighbourhoods in Quito for
                students and visitors, just 10 minutes from the historic centre
                and well connected to the rest of the city.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                When you study with Vida Verde, you&apos;re not just learning
                Spanish in a classroom. You&apos;re learning it in one of the
                most interesting places in Ecuador.
              </p>
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
                Meet the Team
              </h2>
            </div>
            <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[44ch] text-pretty m-0">
              Our teachers are the heart of Vida Verde. Every one of them is an
              Ecuadorian native speaker with university-level training and years
              of experience. Here&apos;s who you&apos;ll be learning with.
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
            <div className="col-span-full flex justify-center mt-10">
              <Link
                href="/online-classes/book"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
              >
                Start Learning with Us →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
