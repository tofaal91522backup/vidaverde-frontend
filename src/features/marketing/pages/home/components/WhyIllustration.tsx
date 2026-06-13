import { GraduationCap } from "lucide-react";
import Image from "next/image";

function WhyIllustration() {
  return (
    <div
      className="relative flex items-center justify-center py-10 lg:py-0 min-h-100"
      aria-hidden="true"
    >
      {/* Concentric rings + stat cards */}
      <div className="relative h-80 w-80 xl:h-96 xl:w-96">
        <div className="absolute left-4 top-8 h-8 w-8 rounded-full border border-vv-accent/35 bg-vv-bg/70" />
        <div className="absolute right-5 top-24 h-4 w-4 rounded-full bg-vv-accent/30" />
        <div className="absolute bottom-8 right-14 h-10 w-10 rounded-full border border-vv-line/60 bg-vv-bg/60" />
        <div className="absolute bottom-[6.5rem] left-3 h-3 w-3 rounded-full bg-vv-ink/15" />

        <Image
          src="/images/whysvg/book_simple_icon_1.png"
          width={520}
          height={520}
          alt=""
          className="absolute -left-24 -bottom-14 h-[7.5rem] w-[10.5rem] -rotate-[9deg] object-contain opacity-[0.22] xl:-left-36 xl:-bottom-20 xl:h-36 xl:w-[13rem]"
          unoptimized
        />
        <Image
          src="/images/whysvg/hola_comment_fixed.png"
          width={520}
          height={520}
          alt=""
          className="absolute -right-[6.5rem] -top-10 h-24 w-[8.5rem] rotate-[8deg] object-contain opacity-[0.28] xl:-right-40 xl:-top-16 xl:h-[7.5rem] xl:w-[10.5rem]"
          unoptimized
        />
        <Image
          src="/images/whysvg/pencil_simple_icon.png"
          width={520}
          height={520}
          alt=""
          className="absolute -left-[12rem] -top-28 h-48 w-72 rotate-[24deg] object-contain opacity-[0.22] xl:-left-[16rem] xl:-top-36 xl:h-[14.5rem] xl:w-[21.5rem]"
          unoptimized
        />

        <div className="absolute inset-0 rounded-full border border-vv-line/30" />
        <div className="absolute inset-6 rounded-full border border-vv-line/50" />
        <div className="absolute inset-14 rounded-full bg-vv-accent/8 border border-vv-accent/20" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-vv-accent flex items-center justify-center shadow-md">
            <GraduationCap className="h-8 w-8 text-vv-accent-deep" />
          </div>
        </div>

        {/* Top */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-vv-bg rounded-2xl border border-vv-line px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="text-[22px] font-bold text-vv-ink tracking-tight leading-none">
            1999
          </div>
          <div className="font-code text-[9px] text-vv-muted uppercase tracking-widest mt-1">
            Founded
          </div>
        </div>

        {/* Right */}
        <div className="absolute -right-7 top-1/2 -translate-y-1/2 bg-vv-bg-deep rounded-2xl px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="text-[22px] font-bold text-vv-bg tracking-tight leading-none">
            4,700+
          </div>
          <div className="font-code text-[9px] text-vv-bg/55 uppercase tracking-widest mt-1">
            Students
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-vv-accent rounded-2xl px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="font-code text-[13px] font-bold text-vv-accent-deep tracking-wider">
            AECEE
          </div>
          <div className="font-code text-[9px] text-vv-accent-deep/65 uppercase tracking-widest mt-1">
            Certified
          </div>
        </div>

        {/* Left */}
        <div className="absolute -left-7 top-1/2 -translate-y-1/2 bg-vv-bg rounded-2xl border border-vv-line px-4 py-3 shadow-sm text-center min-w-19">
          <div className="text-[22px] font-bold text-vv-ink tracking-tight leading-none">
            50+
          </div>
          <div className="font-code text-[9px] text-vv-muted uppercase tracking-widest mt-1">
            Countries
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyIllustration;
