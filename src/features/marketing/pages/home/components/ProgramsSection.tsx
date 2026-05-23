import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { CourseFilters } from "./CourseFilters";
import { SectionHeader } from "./SectionHeader";

const ProgramsSection = () => {
  return (
    <section className="bg-[var(--vv-bg-warm)]" data-screen-label="03 Courses">
      <Container>
        <SectionHeader
          eyebrow="// Programs"
          title="Find a course that fits."
          action={
            <MarketingButton href="/courses" tone="ghost">
              All courses →
            </MarketingButton>
          }
        />
        <CourseFilters />
      </Container>
    </section>
  );
};

export default ProgramsSection;
