import { Container } from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ByLanguage } from "@/components/shared/by-language";
import { OurSchoolTeachers } from "@/features/marketing/pages/our-school/components/our-school-teachers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const schoolGallery = [
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80",
    alt: "Spanish class in session",
    label: "Classroom",
  },
  {
    src: "/images/programmes/3.jpg",
    alt: "Sunny patio and garden space",
    label: "Garden patio",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80",
    alt: "Teacher helping students in class",
    label: "Teachers in session",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    alt: "Students learning together around a table",
    label: "Small group study",
  },
  {
    src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80",
    alt: "Welcoming school exterior",
    label: "School exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80",
    alt: "La Floresta street scene in Quito",
    label: "La Floresta",
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
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 max-[900px]:grid-cols-1">
            <div>
              <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
                25 Years. 4,700 Students.
                <br />
                Lasting Connections.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
                We started with one teacher, a love of language, and a home in
                La Floresta. Twenty-five years later, we&apos;re still here, and
                we&apos;ve taught over 4,700 students from every corner of the
                world.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/online-classes/book"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                >
                  Start Learning Online{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
                <Link
                  href="/study-in-quito"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
                >
                  Study in Quito
                </Link>
              </div>
            </div>

            {/* Heritage illustration. SVG-r <text> Google anubad-i kore na —
                tai ES hate lekha */}
            <div className="max-[900px]:hidden shrink-0">
              <svg
                viewBox="0 0 292 252"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-140"
              >
                {/* Dashed halo behind card */}
                <circle
                  cx="91"
                  cy="126"
                  r="82"
                  fill="none"
                  stroke="#a3d635"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                  opacity="0.22"
                />

                {/* Main credential card */}
                <rect
                  x="10"
                  y="26"
                  width="162"
                  height="196"
                  rx="22"
                  fill="#f0f9d4"
                  stroke="#a3d635"
                  strokeWidth="1.5"
                />
                <rect
                  x="18"
                  y="34"
                  width="146"
                  height="180"
                  rx="15"
                  fill="none"
                  stroke="#a3d635"
                  strokeWidth="0.75"
                  opacity="0.45"
                />

                {/* Leaf motif top */}
                <path
                  d="M 91 52 C 84 42 74 42 73 47 C 72 52 78 59 91 62 C 104 59 110 52 109 47 C 108 42 98 42 91 52Z"
                  fill="#a3d635"
                  opacity="0.6"
                />
                <line
                  x1="91"
                  y1="62"
                  x2="91"
                  y2="74"
                  stroke="#a3d635"
                  strokeWidth="1.5"
                  opacity="0.5"
                />

                {/* Est. */}
                <text
                  x="91"
                  y="90"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="9"
                  fill="#7a8a6a"
                  letterSpacing="0.18em"
                >
                  <ByLanguage en="EST." es="DESDE" />
                </text>

                {/* 1999 */}
                <text
                  x="91"
                  y="126"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="44"
                  fontWeight="800"
                  fill="#1f3d1a"
                  letterSpacing="-0.04em"
                >
                  1999
                </text>

                {/* Divider */}
                <line
                  x1="28"
                  y1="135"
                  x2="154"
                  y2="135"
                  stroke="#a3d635"
                  strokeWidth="1"
                  opacity="0.55"
                />

                {/* VIDA VERDE */}
                <text
                  x="91"
                  y="155"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="12"
                  fontWeight="700"
                  fill="#1f3d1a"
                  letterSpacing="0.1em"
                >
                  VIDA VERDE
                </text>

                {/* Quito, Ecuador */}
                <text
                  x="91"
                  y="170"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="9.5"
                  fill="#7a8a6a"
                >
                  Quito, Ecuador
                </text>

                {/* Trust badge */}
                <rect
                  x="56"
                  y="181"
                  width="70"
                  height="26"
                  rx="13"
                  fill="#a3d635"
                />
                <text
                  x="91"
                  y="198"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="11"
                  fontWeight="700"
                  fill="#1f3d1a"
                >
                  <ByLanguage en="25+ Yrs" es="25+ años" />
                </text>

                {/* Stat badge 1. 25+ Years */}
                <rect
                  x="184"
                  y="26"
                  width="100"
                  height="60"
                  rx="18"
                  fill="white"
                  stroke="#a3d635"
                  strokeWidth="1.5"
                />
                <text
                  x="234"
                  y="52"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="24"
                  fontWeight="800"
                  fill="#1f3d1a"
                >
                  25+
                </text>
                <text
                  x="234"
                  y="68"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="10"
                  fill="#7a8a6a"
                >
                  <ByLanguage en="Years teaching" es="Años enseñando" />
                </text>

                {/* Stat badge 2. 4,700+ Students */}
                <rect
                  x="184"
                  y="102"
                  width="100"
                  height="60"
                  rx="18"
                  fill="#1f3d1a"
                />
                <text
                  x="234"
                  y="128"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="20"
                  fontWeight="800"
                  fill="#a3d635"
                >
                  <ByLanguage en="4,700+" es="4700+" />
                </text>
                <text
                  x="234"
                  y="146"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="10"
                  fill="white"
                  opacity="0.7"
                >
                  <ByLanguage en="Students taught" es="Estudiantes" />
                </text>

                {/* Stat badge 3. 50+ Countries */}
                <rect
                  x="184"
                  y="178"
                  width="100"
                  height="60"
                  rx="18"
                  fill="#f0f9d4"
                  stroke="#a3d635"
                  strokeWidth="1.5"
                />
                <text
                  x="234"
                  y="204"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="24"
                  fontWeight="800"
                  fill="#1f3d1a"
                >
                  50+
                </text>
                <text
                  x="234"
                  y="222"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontSize="10"
                  fill="#7a8a6a"
                >
                  <ByLanguage en="Countries" es="Países" />
                </text>

                {/* Decorative dots */}
                <circle cx="174" cy="18" r="3" fill="#a3d635" opacity="0.4" />
                <circle
                  cx="178"
                  cy="94"
                  r="2.5"
                  fill="#1f3d1a"
                  opacity="0.14"
                />
                <circle
                  cx="178"
                  cy="170"
                  r="2.5"
                  fill="#a3d635"
                  opacity="0.32"
                />
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
              <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
                Rosa&apos;s founding story, in her own words, is on its way.
                Check back soon to hear what inspired her to start Vida Verde in
                1999.
              </p>
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
                {/* Google "Conozca" (usted); baki site "tú" */}
                <span translate="no">
                  <ByLanguage en="Meet the Team" es="Conoce al equipo" />
                </span>
              </h2>
            </div>
            <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[44ch] text-pretty m-0">
              Our teachers are the heart of Vida Verde. Every one of them is an
              Ecuadorian native speaker with university-level training and years
              of experience. Here&apos;s who you&apos;ll be learning with.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <OurSchoolTeachers />
            <div className="col-span-full flex justify-center mt-10">
              <Link
                href="/online-classes/book"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
              >
                <span translate="no">
                  <ByLanguage
                    en="Start Learning with Us"
                    es="Comienza a aprender con nosotros"
                  />
                </span>{" "}
                <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* School Gallery */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="06 School Gallery"
        id="gallery"
      >
        <Container>
          <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
            <div className="flex flex-col gap-3.5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// School Gallery"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Life at Vida Verde
              </h2>
            </div>
            <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed max-w-[48ch] text-pretty m-0">
              A preview of the spaces and neighbourhood that shape the Vida
              Verde experience. Final school photos will be supplied by Vida
              Verde.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {schoolGallery.map((image, index) => (
              <figure
                key={image.label}
                className={[
                  "group relative overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg",
                  index === 0 || index === 5 ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div className="relative aspect-[4/3] h-full min-h-72">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-vv-ink/55 via-transparent to-transparent opacity-80" />
                </div>
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-vv-bg/90 px-3 py-1 text-[12px] font-semibold text-vv-ink shadow-sm">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
