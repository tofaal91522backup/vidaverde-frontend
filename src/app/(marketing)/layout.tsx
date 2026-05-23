import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { ScrollAnimations } from "@/features/marketing/components/ScrollAnimations";
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
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
