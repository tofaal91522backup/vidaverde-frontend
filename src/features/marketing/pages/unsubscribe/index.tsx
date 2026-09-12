import { Container } from "@/components/shared/Container";
import type { UnsubscribeResult } from "./queries/get-public-unsubscribe";
import Link from "next/link";

/**
 * Ei page-e ichchhe kore **kono lead/newsletter form nai** — je mat্র
 * unsubscribe korlo take abar subscribe korte bola oshovyo, ar legal dik
 * thekeo thik na.
 */
export default function UnsubscribeIndex({
  result,
}: {
  result: UnsubscribeResult;
}) {
  return (
    <section className="min-h-[60vh] flex items-center" data-screen-label="Unsubscribe">
      <Container className="py-20 text-center">
        <div className="text-5xl mb-6">{result.ok ? "✅" : "⚠️"}</div>

        <h1 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-balance">
          {result.ok ? "You're unsubscribed" : "We couldn't unsubscribe you"}
        </h1>

        <p
          role={result.ok ? undefined : "alert"}
          className="text-vv-ink-2 text-[clamp(16px,1.3vw,19px)] leading-normal max-w-[52ch] mx-auto m-0"
        >
          {result.message}
        </p>

        {result.ok ? (
          <p className="mt-4 text-[14px] text-vv-ink-2">
            You will not receive any more marketing emails from us. Booking and
            class emails are separate and will still reach you.
          </p>
        ) : (
          <p className="mt-4 text-[14px] text-vv-ink-2">
            If you keep seeing this, reply to any of our emails and we will
            remove you by hand.
          </p>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
        >
          Back to Vida Verde
        </Link>
      </Container>
    </section>
  );
}
