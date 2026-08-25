import { programs } from "@/features/marketing/pages/study-in-quito/data/programs.data";
import { ProgramDetail } from "@/features/marketing/pages/study-in-quito/ProgramDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: `${program.title} | Vida Verde Spanish School`,
    description: program.tagline,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();
  return <ProgramDetail program={program} />;
}
