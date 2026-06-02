import { MapLocationSection } from "../../components/MapLocationSection";
import { PopularProgramsSection } from "../../components/PopularProgramsSection";
import { SchoolIntroVideoSection } from "../../components/SchoolIntroVideoSection";
import { TeachersSection } from "../../components/TeachersSection";
import { HeroSection } from "./components/HeroSection";
import { LearnAboutSchoolSection } from "./components/LearnAboutSchoolSection";
import { LeadCaptureSection } from "./components/LeadCaptureSection";
import ProgramsSection from "./components/ProgramsSection";
import TestimonialSection from "./components/TestimonialSection";
import TrustSection from "./components/TrustSection";
import { VideoPreviewSection } from "./components/VideoPreviewSection";
import { WelcomeSchoolSection } from "./components/WelcomeSchoolSection";
import WhyVidaVerde from "./components/WhyVidaVerde";

export default function HomeRoute() {
  return (
    <>
      <HeroSection />
      <VideoPreviewSection />
      <TrustSection />
      <LearnAboutSchoolSection />
      <WelcomeSchoolSection />
      <WhyVidaVerde />
      <ProgramsSection />
      <TestimonialSection />
      <SchoolIntroVideoSection />
      <PopularProgramsSection />
      <TeachersSection />
      <LeadCaptureSection />
      <MapLocationSection />
    </>
  );
}
