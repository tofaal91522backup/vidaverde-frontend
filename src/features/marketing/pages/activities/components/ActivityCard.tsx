import { cn } from "@/lib/utils";
import type { Activity } from "@/features/marketing/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-vv-line cursor-pointer transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(15,20,16,0.35)]",
        activity.wide ? "col-span-2 aspect-video max-[640px]:col-span-1" : "aspect-3/4",
      )}
    >
      <Image
        className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-[1.03]"
        src={activity.image}
        alt={activity.alt}
        fill
        sizes={activity.wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
      />
      <div className="absolute inset-0 bg-linear-to-t from-vv-bg-deep/90 via-vv-bg-deep/35 to-transparent" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5 max-[640px]:p-4">
        <div className="flex items-center gap-2.5">
          <span className="font-code text-[10px] font-semibold uppercase tracking-widest text-vv-accent">
            {activity.tag}
          </span>
          <span className="font-code text-white/55 text-[11px]">{activity.duration}</span>
        </div>
        <h3 className="text-white text-[20px] font-semibold tracking-[-0.01em] leading-tight m-0 max-[640px]:text-[17px]">
          {activity.title}
        </h3>
        <p className="text-white/70 text-[14px] leading-[1.55] m-0 line-clamp-2 max-[640px]:hidden">
          {activity.description}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className={cn("text-[15px] font-semibold", activity.included ? "text-vv-accent" : "text-white")}>
            <b>{activity.price}</b>
            {activity.priceNote ? (
              <span className="font-normal text-[13px] ml-1 text-white/60">{activity.priceNote}</span>
            ) : null}
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full border border-white/24 bg-white/10 backdrop-blur-sm text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}
