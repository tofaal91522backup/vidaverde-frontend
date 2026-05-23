import { Container } from "@/components/shared/Container";
import { ActivityTabs } from "./components/ActivityTabs";
import { weeklySchedule } from "./data/marketing.data";
import Link from "next/link";

export default function ActivitiesRoute() {
  return (
    <>
      <section className="ac-hero" data-screen-label="01 Activities Hero">
        <Container>
          <div className="crumb">Home <span>/</span> Activities</div>
          <h1>
            Cultural <em>Spanish</em>
            <br />
            activities.
          </h1>
          <p className="lede">
            Over more than 20 years of helping students learn Spanish in Quito,
            Vida Verde has developed activities that showcase the city through
            the eyes of a local teacher.
          </p>
          <ActivityTabs />
        </Container>
      </section>
      <section className="weekly-schedule" data-screen-label="02 Weekly Schedule">
        <Container>
          <span className="eyebrow">{"// A typical week"}</span>
          <div className="h-4" />
          <h2 className="h2">What every Vida Verde week looks like.</h2>
          <p className="sub">
            Mornings are class. Afternoons and weekends are how you actually
            learn.
          </p>
          <div className="schedule-table">
            <div className="schedule-row">
              <div>Day</div>
              <div>Time</div>
              <div>Activity</div>
              <div>Type</div>
            </div>
            {weeklySchedule.map((item) => (
              <div className="schedule-row" key={item.day}>
                <div className="day">{item.day}</div>
                <div className="time">{item.time}</div>
                <div className="activity">
                  <b>{item.title}</b> · {item.description}
                </div>
                <div>
                  <span className={item.optional ? "badge opt" : "badge"}>
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section data-screen-label="03 Escape CTA">
        <Container>
          <div className="escape-banner">
            <span className="eyebrow text-[var(--vv-accent)]">
              {"// Custom itineraries"}
            </span>
            <div className="h-[14px]" />
            <h2 className="h2">
              Experience Quito
              <br />
              while learning Spanish.
            </h2>
            <p>
              Activities are available Monday through Friday. Most students
              take regular Spanish classes in the morning and leave for Quito
              cultural Spanish classes around 1:30 pm.
            </p>
            <Link href="/#book" className="vv-btn vv-btn-primary">
              Plan a custom track →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
