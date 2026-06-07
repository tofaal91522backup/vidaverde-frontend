import { Container } from "@/components/shared/Container";
import { ActivityTabs } from "./components/ActivityTabs";
import { weeklySchedule } from "./data/marketing.data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const btnPrimary =
  "inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px";

export default function ActivitiesRoute() {
  return (
    <>
      {/* Hero */}
      <section className="bg-vv-bg-warm border-b border-vv-line" data-screen-label="01 Activities Hero">
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Activities
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Cultural <em className="not-italic text-vv-accent">Spanish</em>
            <br />
            activities.
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            Over more than 20 years of helping students learn Spanish in Quito,
            Vida Verde has developed activities that showcase the city through
            the eyes of a local teacher.
          </p>
          <ActivityTabs />
        </Container>
      </section>

      {/* Weekly Schedule */}
      <section className="border-t border-vv-line" data-screen-label="02 Weekly Schedule">
        <Container>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// A typical week"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-3 text-balance">
            What every Vida Verde week looks like.
          </h2>
          <p className="text-vv-ink-2 text-[17px] leading-normal m-0 mb-10">
            Mornings are class. Afternoons and weekends are how you actually learn.
          </p>

          {/* Schedule table */}
          <div className="rounded-2xl border border-vv-line overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[80px_110px_1fr_100px] bg-vv-ink text-vv-bg px-6 py-3 text-[11px] font-code font-semibold tracking-widest uppercase max-[640px]:grid-cols-[60px_1fr_80px]">
              <div>Day</div>
              <div className="max-[640px]:hidden">Time</div>
              <div>Activity</div>
              <div>Type</div>
            </div>
            {weeklySchedule.map((item, index) => (
              <div
                key={item.day}
                className={cn(
                  "grid grid-cols-[80px_110px_1fr_100px] items-center px-6 py-4 text-[14px] border-t border-vv-line max-[640px]:grid-cols-[60px_1fr_80px]",
                  index % 2 === 0 ? "bg-vv-bg" : "bg-vv-bg-warm",
                )}
              >
                <div className="font-code font-semibold text-[12px] text-vv-muted uppercase tracking-[0.08em]">
                  {item.day}
                </div>
                <div className="text-vv-ink-2 text-[13px] font-code max-[640px]:hidden">{item.time}</div>
                <div className="text-vv-ink">
                  <b className="font-semibold">{item.title}</b>
                  <span className="text-vv-ink-2"> · {item.description}</span>
                </div>
                <div>
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold font-code uppercase tracking-[0.06em]",
                      item.optional
                        ? "bg-vv-muted-2/20 text-vv-muted-2"
                        : "bg-vv-accent/15 text-vv-accent-deep",
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Escape CTA */}
      <section data-screen-label="03 Escape CTA">
        <Container>
          <div className="rounded-3xl bg-vv-ink px-12 py-12 text-center max-[640px]:rounded-2xl max-[640px]:px-7 max-[640px]:py-8">
            <span className="font-code text-vv-accent text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Custom itineraries"}
            </span>
            <div className="h-4" />
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-vv-bg text-balance">
              Experience Quito
              <br />
              while learning Spanish.
            </h2>
            <p className="text-vv-bg/70 text-[clamp(15px,1.2vw,17px)] leading-normal m-0 mb-8 max-w-[52ch] mx-auto">
              Activities are available Monday through Friday. Most students take
              regular Spanish classes in the morning and leave for Quito cultural
              Spanish classes around 1:30 pm.
            </p>
            <Link href="/#book" className={btnPrimary}>
              Plan a custom track →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
