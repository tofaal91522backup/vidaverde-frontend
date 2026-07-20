import { LegalPage } from "@/features/marketing/components/LegalPage";
import { privacyContent } from "./data/privacy.data";

export default function PrivacyRoute() {
  return <LegalPage content={privacyContent} />;
}
