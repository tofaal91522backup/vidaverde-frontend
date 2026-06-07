import { Container } from "@/components/shared/Container";
import { trustBadges } from "../data/marketing.data";

const TrustSection = () => {
  return (
    <div className="bg-vv-bg border-b border-vv-line py-5">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 max-[640px]:justify-start max-[640px]:gap-x-6 max-[640px]:gap-y-2.5">
          {trustBadges.map((badge, i) => (
            <div key={badge} className="flex items-center gap-2.5">
              {i > 0 && (
                <span className="hidden sm:block h-3.5 w-px bg-vv-line" aria-hidden="true" />
              )}
              <span className="text-[13px] font-semibold text-vv-ink-2 tracking-[-0.01em]">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrustSection;
