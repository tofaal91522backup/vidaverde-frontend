import { Container } from "@/components/shared/Container";
import { Facebook, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teachers = [
  {
    name: "Ximena Argüello",
    image:
    "/images/teachers/2.jpg",
    description:
    "Students say class hours with Ximena pass by in a flash. She has been teaching Spanish since 2011, and is fluent in English.",
    facebook: "https://www.facebook.com/vidaverdespanishschool/",
    twitter: "https://twitter.com/VidaVerdeQuito",
  },
  {
    name: "Lucía Rivadeneira",
    image:
    "/images/teachers/3.jpg",
    description:
    "Lucía Rivadeneira is a language nerd who loves to teach the nuts and bolts of Spanish.",
    facebook: "https://www.facebook.com/vidaverdespanishschool/",
    twitter: "https://twitter.com/VidaVerdeQuito",
  },
  {
    name: "Fernando Báez Guzmán",
    image:
      "/images/teachers/4.jpg",
    description: "Fernando is our Academic Director and master teacher.",
    facebook: "https://www.facebook.com/vidaverdespanishschool/",
    twitter: "https://twitter.com/VidaVerdeQuito",
  },
  {
    name: "Rosa Laura García Caiza",
    image:
      "/images/teachers/5.jpg",
    description:
      "Laura has taught Spanish since 1991. She has a passion for sharing Ecuadorian culture with her students and considers herself not just a teacher but an ambassador of her culture and her language.",
    facebook: "https://www.facebook.com/vidaverdespanishschool/",
    twitter: "https://twitter.com/VidaVerdeQuito",
  },
];

export function TeachersSection() {
  return (
    <section className="border-t border-[var(--vv-line)] bg-[var(--vv-bg)]">
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Our Team"}</span>
            <h2 className="h2">Meet Our Teachers</h2>
          </div>
          <p className="lede max-w-[42ch]">
            All of our teachers are University trained, native Ecuadorians with
            years of experience! They’re dedicated to supporting you and
            inspiring you as you learn Spanish here in Quito.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: (typeof teachers)[number] }) {
  return (
    <article className="teacher-card group grid overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--vv-accent)] md:grid-cols-[220px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--vv-bg-warm)] md:aspect-auto md:min-h-[260px]">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="flex min-h-[260px] flex-col gap-4 p-6 md:p-7">
        <div>
          <div className="eyebrow mb-3">Teacher</div>
          <h3 className="text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--vv-ink)]">
            {teacher.name}
          </h3>
        </div>

        <p className="flex-1 text-[15px] leading-[1.6] text-[var(--vv-ink-2)]">
          {teacher.description}
        </p>

        <div className="flex gap-2 border-t border-[var(--vv-line)] pt-4">
          <SocialLink href={teacher.facebook} label={`${teacher.name} Facebook`}>
            <Facebook aria-hidden="true" />
          </SocialLink>
          <SocialLink href={teacher.twitter} label={`${teacher.name} Twitter`}>
            <Twitter aria-hidden="true" />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid size-10 place-items-center rounded-full border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] text-[var(--vv-ink-2)] transition hover:border-[var(--vv-accent)] hover:bg-[var(--vv-accent)] hover:text-[var(--vv-accent-deep)] [&_svg]:size-4"
    >
      {children}
    </Link>
  );
}
