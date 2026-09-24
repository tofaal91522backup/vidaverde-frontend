import CoursesRoute from "@/features/marketing/pages/courses";
import { getLowestPackagePrice } from "@/features/marketing/queries/get-lowest-package-price";

// Metadata-r dam `/public/packages/` theke; ghontay ekbar notun kore
export const revalidate = 3600;

export async function generateMetadata() {
  const price = await getLowestPackagePrice();
  return {
    title: "Online Spanish Classes | Native Teachers | Vida Verde",
    description: `Personalised online Spanish lessons with certified native Ecuadorian teachers. Flexible scheduling, all levels.${price ? ` Start from ${price}.` : ""} Includes a level assessment.`,
  };
}

export default function Page() {
  return <CoursesRoute />;
}
