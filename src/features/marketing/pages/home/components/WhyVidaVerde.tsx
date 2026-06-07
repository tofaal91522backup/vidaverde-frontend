import { Container } from "@/components/shared/Container";
import {
  Globe2,
  GraduationCap,
  Target,
  UserCheck,
} from "lucide-react";
import { featureBlocks } from "../data/marketing.data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const spanClasses: Record<string, string> = {
  "span-4": "xl:col-span-4",
  "span-6": "xl:col-span-6",
  "span-8": "xl:col-span-8",
};

const WhyVidaVerde = () => {
  const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

  return (
    <section className="bg-vv-bg-warm border-t border-vv-line" data-screen-label="02 Why">
      <Container>
        <SectionHeader
          eyebrow="// Why Vida Verde"
          title="More than an app. More than a freelance teacher."
          lede="Here's what makes learning with Vida Verde different."
        />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-12">
          {featureBlocks.map((feature, index) => {
            const Icon = whyIcons[index] ?? Globe2;
            const isDark = feature.tone === "dark";
            const isAccent = feature.tone === "accent";

            return (
              <article
                key={feature.number}
                className={cn(
                  "flex flex-col justify-between bg-vv-bg-warm gap-8 rounded-[22px] border p-8 min-h-72 max-[640px]:p-6",
                  (feature.span ? spanClasses[feature.span] : undefined) ?? "xl:col-span-4",
                  isDark && "bg-vv-bg-deep border-vv-bg-deep text-vv-bg",
                  isAccent && "bg-vv-accent border-vv-accent text-vv-accent-deep",
                  !isDark && !isAccent && "bg-vv-bg border-vv-line text-vv-ink",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                      isDark && "bg-vv-accent text-vv-accent-deep",
                      isAccent && "bg-vv-accent-deep text-vv-accent",
                      !isDark && !isAccent && "bg-vv-accent text-vv-accent-deep",
                    )}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div
                    className={cn(
                      "font-code text-[11px] font-medium tracking-[0.12em] uppercase",
                      isDark && "text-vv-bg/50",
                      isAccent && "text-vv-accent-deep/60",
                      !isDark && !isAccent && "text-vv-muted",
                    )}
                  >
                    {feature.number} / {feature.eyebrow}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "text-[22px] font-semibold tracking-[-0.02em] leading-tight m-0",
                      isDark && "text-vv-bg",
                      isAccent && "text-vv-accent-deep",
                      !isDark && !isAccent && "text-vv-ink",
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[15px] leading-[1.6] m-0",
                      isDark && "text-vv-bg/65",
                      isAccent && "text-vv-accent-deep/70",
                      !isDark && !isAccent && "text-vv-ink-2",
                    )}
                  >
                    {feature.description}
                  </p>
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
