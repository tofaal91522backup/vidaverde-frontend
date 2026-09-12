import TeacherProfilePage from "@/features/marketing/pages/courses/teacher-profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spanish Teacher Profile | Vida Verde",
  description:
    "Meet Vida Verde's native Spanish teachers and book an online lesson.",
};

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

/** Public API exposes teacher UUIDs, not stable slugs. */
export default async function Page({ params }: PageProps) {
  const { name } = await params;

  return <TeacherProfilePage id={name} />;
}
