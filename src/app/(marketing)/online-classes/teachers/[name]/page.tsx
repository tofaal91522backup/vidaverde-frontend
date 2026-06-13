import TeacherProfilePage, {
  getOnlineTeacherBySlug,
  getOnlineTeacherSlugs,
} from "@/features/marketing/pages/courses/teacher-profile";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

export function generateStaticParams() {
  return getOnlineTeacherSlugs().map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const teacher = getOnlineTeacherBySlug(name);

  if (!teacher) {
    return {
      title: "Teacher Profile | Vida Verde",
    };
  }

  return {
    title: `Learn Spanish with ${teacher.firstName} | Vida Verde`,
    description: teacher.bio,
  };
}

export default async function Page({ params }: PageProps) {
  const { name } = await params;

  return <TeacherProfilePage slug={name} />;
}
