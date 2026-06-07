import { Container } from "@/components/shared/Container";
import { ExternalLink, MapPinned, Navigation } from "lucide-react";

const mapLink = "https://maps.app.goo.gl/QuUXHJjnxJ88iPCz7";
const mapEmbed =
  "https://www.google.com/maps?q=Vida%20Verde%20Centro%20de%20Espa%C3%B1ol%20Quito%20Ecuador&output=embed";

export function MapLocationSection() {
  return (
    <section
      className="border-t border-vv-line bg-vv-bg"
      data-screen-label="Map Location"
    >
      <Container>
        <div className="grid items-center gap-12 grid-cols-[0.8fr_1.2fr] max-[760px]:grid-cols-1 max-[760px]:gap-8">
          {/* Copy */}
          <div
            className="flex flex-col gap-5"
            data-scroll-from="left"
            data-scroll-reveal="true"
          >
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Location"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Find us in Quito.
            </h2>
            <p className="text-vv-ink-2 text-[clamp(15px,1.2vw,17px)] leading-normal m-0 max-w-[44ch] text-pretty">
              Visit Vida Verde Centro de Español near La Floresta, with easy
              access to classes, homestays, cafes, and cultural activities.
            </p>
            <div className="flex items-start gap-2.5 text-vv-ink-2 text-[15px]">
              <MapPinned aria-hidden="true" className="h-5 w-5 mt-0.5 shrink-0 text-vv-accent" />
              <span>Mallorca N24-55 y Barcelona, Quito, Ecuador</span>
            </div>
            <a
              className="inline-flex w-fit items-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation aria-hidden="true" className="h-4 w-4" />
              View Location on Google Maps
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          {/* Map iframe */}
          <div
            className="overflow-hidden rounded-2xl border border-vv-line shadow-[0_20px_60px_-40px_rgba(15,20,16,0.3)] aspect-4/3 w-full max-[760px]:aspect-video"
            data-scroll-from="right"
            data-scroll-reveal="true"
          >
            <iframe
              title="Vida Verde Centro de Español location"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-full w-full border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
