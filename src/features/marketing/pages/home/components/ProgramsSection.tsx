import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { ChevronRight } from "lucide-react";
import { CourseFilters } from "./CourseFilters";
import { SectionHeader } from "./SectionHeader";

const ProgramsSection = () => {
  return (
    <section className="bg-vv-bg-warm" data-screen-label="03 Courses">
      <Container>
        <SectionHeader
          eyebrow="// Programs"
          title="Find a course that fits."
          action={
            <MarketingButton href="/courses" tone="ghost">
              All courses{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </MarketingButton>
          }
        />
        <CourseFilters />
      </Container>
    </section>
  );
};

export default ProgramsSection;
