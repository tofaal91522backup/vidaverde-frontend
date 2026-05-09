import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { MapLocationSection } from "@/features/marketing/components/MapLocationSection";
import { PopularProgramsSection } from "@/features/marketing/components/PopularProgramsSection";
import { ScrollAnimations } from "@/features/marketing/components/ScrollAnimations";
import { SchoolIntroVideoSection } from "@/features/marketing/components/SchoolIntroVideoSection";
import { TeachersSection } from "@/features/marketing/components/TeachersSection";
import { TextTestimonialsSection } from "@/features/marketing/components/TextTestimonialsSection";
import { WhatsAppFloat } from "@/features/marketing/components/WhatsAppFloat";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main>
        {children}
        <SchoolIntroVideoSection />
        <PopularProgramsSection />
        <TeachersSection />
        {/* <TextTestimonialsSection /> */}
        <MapLocationSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
