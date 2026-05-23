import { Container } from "@/components/shared/Container";
import {
    CalendarDays,
    GraduationCap,
    Home,
    Leaf,
    MapPinned,
} from "lucide-react";
import { featureBlocks } from "../data/marketing.data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const WhyVidaVerde = () => {
  const whyIcons = [GraduationCap, MapPinned, Home, CalendarDays, Leaf];

  return (
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
  );
};

export default WhyVidaVerde;
