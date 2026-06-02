import { OnlineClassesHero } from "./components/OnlineClassesHero";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { PricingSection } from "./components/PricingSection";
import { OnlineTeachersSection } from "./components/OnlineTeachersSection";
import { OnlineClassesFAQ } from "./components/OnlineClassesFAQ";
import { OnlineClassesBottomCTA } from "./components/OnlineClassesBottomCTA";

export default function CoursesRoute() {
  return (
    <>
      <OnlineClassesHero />
      <HowItWorksSection />
      <PricingSection />
      <OnlineTeachersSection />
      <OnlineClassesFAQ />
      <OnlineClassesBottomCTA />
    </>
  );
}
