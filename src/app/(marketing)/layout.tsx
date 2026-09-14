import Footer from "@/components/layout/footer/Footer";
import { MarketingNavProvider } from "@/components/layout/navbar/marketing-nav-provider";
import { MobileTabBar } from "@/components/layout/navbar/mobile-tab-bar";
import Navbar from "@/components/layout/navbar/Navbar";
import { ScrollAnimations } from "@/features/marketing/components/ScrollAnimations";
import { WhatsAppFloat } from "@/features/marketing/components/WhatsAppFloat";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingNavProvider>
      <ScrollAnimations />
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* Bar-ta `fixed`, tai footer-er sesh-ta dhaka pore jeto — ei spacer-ta
          sheta-r jaiga rakhe */}
      <div className="hidden h-16 max-[640px]:block" aria-hidden="true" />
      <MobileTabBar />
      <WhatsAppFloat />
    </MarketingNavProvider>
  );
}
