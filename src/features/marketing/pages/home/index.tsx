// import { MapLocationSection } from "../../components/MapLocationSection";
import { TeachersSection } from "../../components/TeachersSection";
import { CourseSelectorSection } from "./components/CourseSelectorSection";
import { HeroSection } from "./components/HeroSection";
import { LearnAboutSchoolSection } from "./components/LearnAboutSchoolSection";
import { LeadCaptureSection } from "./components/LeadCaptureSection";
import TestimonialSection from "./components/TestimonialSection";
import TrustSection from "./components/TrustSection";
import WhyVidaVerde from "./components/WhyVidaVerde";

export default function HomeRoute() {
  return (
    <>
      <HeroSection />
      {/* <TrustSection /> */}
      <WhyVidaVerde />
      <CourseSelectorSection />
      <TestimonialSection />
      <TeachersSection />
      <LearnAboutSchoolSection />
      <LeadCaptureSection />
      {/* <MapLocationSection /> */}
    </>
  );
}
