import UnsubscribeIndex from "@/features/marketing/pages/unsubscribe";
import { getPublicUnsubscribe } from "@/features/marketing/pages/unsubscribe/queries/get-public-unsubscribe";

export const metadata = {
  title: "Unsubscribe | Vida Verde",
  // Email link — search result-e ashar kono karon nai
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await getPublicUnsubscribe(token);

  return <UnsubscribeIndex result={result} />;
}
