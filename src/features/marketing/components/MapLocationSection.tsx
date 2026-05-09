import { Container } from "@/components/shared/Container";
import { ExternalLink, MapPinned, Navigation } from "lucide-react";

const mapLink = "https://maps.app.goo.gl/QuUXHJjnxJ88iPCz7";
const mapEmbed =
  "https://www.google.com/maps?q=Vida%20Verde%20Centro%20de%20Espa%C3%B1ol%20Quito%20Ecuador&output=embed";

export function MapLocationSection() {
  return (
    <section className="map-location" data-screen-label="Map Location">
      <Container>
        <div className="map-location-grid">
          <div className="map-location-copy">
            <span className="eyebrow">{"// Location"}</span>
            <h2 className="h2">Find us in Quito.</h2>
            <p className="lede">
              Visit Vida Verde Centro de Español near La Floresta, with easy
              access to classes, homestays, cafes, and cultural activities.
            </p>
            <div className="map-location-address">
              <MapPinned aria-hidden="true" />
              <span>Mallorca N24-55 y Barcelona, Quito, Ecuador</span>
            </div>
            <a
              className="vv-btn vv-btn-primary"
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation aria-hidden="true" />
              View Location on Google Maps
              <ExternalLink aria-hidden="true" />
            </a>
          </div>

          <div className="map-location-card">
            <iframe
              title="Vida Verde Centro de Español location"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
