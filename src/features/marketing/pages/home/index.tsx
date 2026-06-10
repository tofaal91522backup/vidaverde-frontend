
import { TeachersSection } from "../../components/TeachersSection";
import { CourseSelectorSection } from "./components/CourseSelectorSection";
import { HeroSection } from "./components/HeroSection";
import { LeadCaptureSection } from "./components/LeadCaptureSection";
import { LearnAboutSchoolSection } from "./components/LearnAboutSchoolSection";
import TestimonialSection from "./components/TestimonialSection";
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
