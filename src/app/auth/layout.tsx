import Image from "next/image";
import Link from "next/link";

/**
 * Auth page gular shared background.
 *
 * Duita stor: ekta CSS gradient akash, ar tar upor niche bosano megher chhobi.
 * Shudhu chhobi-ta full-bleed kore dile lomba screen-e kete jeto ar chowra
 * screen-e megh-ta patla hoye jeto — gradient-ta niche thakay je kono aspect
 * ratio-te akash-ta thik thake, chhobi-ta shudhu niche-r megh-ta ane.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Akash. Upore ghono neel, nichey megh-er shathe mesha halka */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,#6fb4e4_0%,#a9d3ef_38%,#d9ebf8_68%,#f2f8fd_100%)]"
      />

      {/* Megh. Uporer dhar-ta mask diye milie dewa hoy — na hole chhobir
          nijer akash ar gradient-er majhe ekta shoja line dekha jeto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[65vh] min-h-72"
      >
        <Image
          src="/images/auth-sky.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 42%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 42%)",
          }}
        />
      </div>

      {/* Logo-ta-i home-e ferar link — alada "Back to Home" button-er cheye
          porishkar, ar brand-ta protita auth page-e thake */}
      <header className="relative z-10 p-6 sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full py-1 pr-4 transition-opacity hover:opacity-80"
          aria-label="Vida Verde — back to home"
        >
          <Image
            src="/images/logo.png"
            alt="Vida Verde"
            width={82}
            height={82}
            className="h-10 w-auto"
            unoptimized
          />
          <span className="text-[17px] font-bold tracking-[-0.02em] text-vv-ink">
            Vida Verde
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16 pt-2">
        {children}
      </main>
    </div>
  );
}
