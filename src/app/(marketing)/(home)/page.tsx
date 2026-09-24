import HomeRoute from "@/features/marketing/pages/home";
import { getLowestPackagePrice } from "@/features/marketing/queries/get-lowest-package-price";

// Metadata-r dam `/public/packages/` theke; ghontay ekbar notun kore
export const revalidate = 3600;

export async function generateMetadata() {
  const price = await getLowestPackagePrice();
  return {
    title: "Learn Spanish Online with a Real Teacher | Vida Verde",
    description: `Expert Ecuadorian Spanish teachers. One-on-one online classes via Google Meet, teaching since 1999. ${price ? `Lessons from ${price}.` : "Book your first lesson today."}`,
  };
}

export default function Page() {
  return <HomeRoute />;
}
