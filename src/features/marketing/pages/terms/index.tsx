import { LegalPage } from "@/features/marketing/components/LegalPage";
import { termsContent } from "./data/terms.data";

export default function TermsRoute() {
  return <LegalPage content={termsContent} />;
}
