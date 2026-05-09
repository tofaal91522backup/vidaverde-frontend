import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { CalendarDays, GraduationCap, Home, Leaf, MapPinned } from "lucide-react";
import Image from "next/image";
import { BookingCalendar } from "../../components/BookingCalendar";
import { CourseFilters } from "../../components/CourseFilters";
import { HeroSection } from "../../components/HeroSection";
import { LearnAboutSchoolSection } from "../../components/LearnAboutSchoolSection";
import { MarketingButton } from "../../components/MarketingButton";
import { SectionHeader } from "../../components/SectionHeader";
import { TestimonialCarousel } from "../../components/TestimonialCarousel";
import { VideoPreviewSection } from "../../components/VideoPreviewSection";
import { WelcomeSchoolSection } from "../../components/WelcomeSchoolSection";
import { featureBlocks, trustBadges } from "../../data/marketing.data";

const whyIcons = [GraduationCap, MapPinned, Home, CalendarDays, Leaf];

export function HomeRoute() {
  return (
    <>
      <HeroSection />
      <VideoPreviewSection />
      <div className="trust">
        <Container className="trust-inner">
          <div className="label">Trusted by students & programs from</div>
          <div className="badges">
            <div className="badge">
              <span className="stars">★★★★★</span> <span>{trustBadges[0]}</span>
            </div>
            {trustBadges.slice(1).map((badge) => (
              <div className="badge" key={badge}>
                {badge}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <LearnAboutSchoolSection />
      <WelcomeSchoolSection />
      <section data-screen-label="02 Why">
        <Container>
          <SectionHeader
            eyebrow="// Why Vida Verde"
            title={
              <>
                Built around the way
                <br />
                language is actually learned.
              </>
            }
            lede="Small classes, real conversations, and the streets of Quito as your second classroom."
          />
          <div className="features">
            {featureBlocks.map((feature, index) => {
              const Icon = whyIcons[index] ?? Leaf;

              return (
                <article
                  className={cn(
                    "feat",
                    feature.span,
                    feature.tone === "dark" && "dark",
                    feature.tone === "accent" && "accent",
                  )}
                  key={feature.number}
                >
                  <div className="feat-head">
                    <div className="feat-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <div className="num">
                      {feature.number} / {feature.eyebrow}
                    </div>
                  </div>
                  <div className="feat-copy">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
      <section
        className="bg-[var(--vv-bg-warm)]"
        data-screen-label="03 Courses"
      >
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

     
      <section className="testimonials" data-screen-label="06 Testimonials">
        <Container>
          <SectionHeader
            eyebrow="// What students say"
            title='"You leave a different person."'
            lede="Students from around the world describe Vida Verde as welcoming, friendly, and effective."
          />
          <TestimonialCarousel />
        </Container>
      </section>
    </>
  );
}
