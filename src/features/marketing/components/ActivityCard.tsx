import { cn } from "@/lib/utils";
import type { Activity } from "@/features/marketing/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className={cn("act-card", activity.wide && "wide")}>
      <Image
        className="photo"
        src={activity.image}
        alt={activity.alt}
        width={activity.wide ? 1400 : 1000}
        height={activity.wide ? 600 : 625}
      />
      <div className="body">
        <div className="top">
          <span className="tag">{activity.tag}</span>
          <span className="duration">{activity.duration}</span>
        </div>
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
        <div className="foot">
          <div className={cn("price", activity.included && "free")}>
            <b>{activity.price}</b>{" "}
            {activity.priceNote ? <span>{activity.priceNote}</span> : null}
          </div>
          <div className="arrow">
            <ArrowUpRight aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}
