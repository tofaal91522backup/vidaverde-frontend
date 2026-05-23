import { Container } from "@/components/shared/Container";
import { trustBadges } from "../data/marketing.data";

const TrustSection = () => {
  return (
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
  );
};

export default TrustSection;
