import { Container } from "@/components/shared/Container";
import Link from "next/link";
import { AnimatedBookButton } from "../../home/components/HeroSection";

export function OnlineClassesHero() {
  return (
    <section
      className="bg-vv-bg-warm border-b border-vv-line"
      data-screen-label="01 Online Classes Hero"
    >
      <Container>
        <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
          Home <span className="mx-1 text-vv-line-2">/</span> Online Classes
        </div>
        <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
          One-on-One Spanish Classes.
          <br />
          Real Teacher. Anywhere in the World.
        </h1>
        <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
          Personalised lessons with expert Ecuadorian native speakers — via
          Google Meet, at a time that works for you. All levels welcome.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <AnimatedBookButton />
          <Link
            href="#teachers"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
          >
            Choose Your Teacher
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-[14px] text-vv-ink-2">
          {[
            "AECEE Certified",
            "Est. 1999",
            "4,700+ Students",
            "All Levels Welcome",
            "Classes via Google Meet",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-vv-accent" aria-hidden="true">
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#edgeFade)" opacity="0.18">
            {/* ── Dot grid ── */}
            {Array.from({ length: 18 }, (_, row) =>
              Array.from({ length: 28 }, (_, col) => (
                <circle
                  key={`dot-${row}-${col}`}
                  cx={col * 46 + 10}
                  cy={row * 40 + 10}
                  r="1"
                  fill="#FFA605"
                  opacity="0.35"
                />
              )),
            )}

            {/* ── Large arc  top right ── */}
            <path
              className="sk-line sk-pulse"
              d="M 900 -60 Q 1150 200 1050 480"
              stroke="#32C2D8"
              strokeWidth="0.8"
              style={{ animationDelay: "0.2s", animationDuration: "3s" }}
            />
            <path
              className="sk-line sk-pulse"
              d="M 950 -80 Q 1200 220 1100 500"
              stroke="#32C2D8"
              strokeWidth="0.5"
              style={{ animationDelay: "0.4s", animationDuration: "3.2s" }}
            />

            {/* ── Circuit traces  horizontal ── */}
            <path
              className="sk-line"
              d="M 580 180 L 720 180 L 740 200 L 860 200"
              stroke="#FFA605"
              strokeWidth="0.9"
              style={{ animationDelay: "0.6s" }}
            />
            <path
              className="sk-line"
              d="M 860 200 L 900 200 L 920 180 L 1060 180"
              stroke="#FFA605"
              strokeWidth="0.6"
              style={{ animationDelay: "1s" }}
            />

            {/* ── Circuit traces  vertical branch ── */}
            <path
              className="sk-line"
              d="M 740 200 L 740 320 L 760 340 L 760 420"
              stroke="#FFA605"
              strokeWidth="0.7"
              style={{ animationDelay: "1.2s" }}
            />
            <path
              className="sk-line"
              d="M 760 340 L 840 340 L 860 360 L 980 360"
              stroke="#FFA605"
              strokeWidth="0.6"
              style={{ animationDelay: "1.4s" }}
            />

            {/* ── Diagonal sketch strokes ── */}
            <path
              className="sk-line sk-pulse"
              d="M 620 80 L 700 180"
              stroke="white"
              strokeWidth="0.5"
              style={{ animationDelay: "0.8s" }}
            />
            <path
              className="sk-line sk-pulse"
              d="M 640 80 L 720 180"
              stroke="white"
              strokeWidth="0.3"
              style={{ animationDelay: "0.9s" }}
            />

            {/* ── Hexagon outline  floating ── */}
            <g
              className="sk-float"
              style={{
                transformOrigin: "1000px 150px",
                animationDuration: "7s",
              }}
            >
              <path
                d="M 1000 110 L 1035 130 L 1035 170 L 1000 190 L 965 170 L 965 130 Z"
                fill="none"
                stroke="#32C2D8"
                strokeWidth="0.8"
                opacity="0.5"
              />
              <path
                d="M 1000 120 L 1028 136 L 1028 168 L 1000 184 L 972 168 L 972 136 Z"
                fill="none"
                stroke="#32C2D8"
                strokeWidth="0.4"
                opacity="0.3"
              />
            </g>

            {/* ── Small hex  bottom right ── */}
            <g
              className="sk-float"
              style={{
                transformOrigin: "1100px 430px",
                animationDuration: "9s",
                animationDelay: "1s",
              }}
            >
              <path
                d="M 1100 405 L 1122 417 L 1122 443 L 1100 455 L 1078 443 L 1078 417 Z"
                fill="none"
                stroke="#FFA605"
                strokeWidth="0.7"
                opacity="0.4"
              />
            </g>

            {/* ── Cross / plus marks ── */}
            {[
              [660, 320],
              [820, 260],
              [950, 310],
              [1080, 240],
            ].map(([x, y], idx) => (
              <g key={`cross-${idx}`} opacity="0.4">
                <line
                  x1={x - 6}
                  y1={y}
                  x2={x + 6}
                  y2={y}
                  stroke="white"
                  strokeWidth="0.6"
                />
                <line
                  x1={x}
                  y1={y - 6}
                  x2={x}
                  y2={y + 6}
                  stroke="white"
                  strokeWidth="0.6"
                />
              </g>
            ))}

            {/* ── Animated nodes on circuit intersections ── */}
            {[
              { cx: 740, cy: 200, color: "#FFA605", delay: "1.3s" },
              { cx: 860, cy: 200, color: "#FFA605", delay: "1.5s" },
              { cx: 760, cy: 340, color: "#FFA605", delay: "1.7s" },
              { cx: 980, cy: 360, color: "#32C2D8", delay: "1.9s" },
              { cx: 720, cy: 180, color: "#FFA605", delay: "1.1s" },
            ].map((n, i) => (
              <g key={`node-${i}`}>
                <circle
                  className="sk-node"
                  cx={n.cx}
                  cy={n.cy}
                  r="3"
                  fill={n.color}
                  style={{ animationDelay: n.delay }}
                />
                {/* Outer ring */}
                <circle
                  className="sk-node sk-pulse"
                  cx={n.cx}
                  cy={n.cy}
                  r="7"
                  fill="none"
                  stroke={n.color}
                  strokeWidth="0.6"
                  style={{ animationDelay: n.delay }}
                />
              </g>
            ))}

            {/* ── Scattered small squares ── */}
            {[
              [610, 400, 8],
              [870, 450, 6],
              [1040, 390, 10],
              [690, 480, 7],
            ].map(([x, y, s], i) => (
              <rect
                key={`sq-${i}`}
                x={x - s / 2}
                y={y - s / 2}
                width={s}
                height={s}
                fill="none"
                stroke="#32C2D8"
                strokeWidth="0.6"
                opacity="0.35"
                transform={`rotate(15, ${x}, ${y})`}
              />
            ))}

            {/* ── Long horizontal rule ── */}
            <line
              x1="580"
              y1="560"
              x2="1150"
              y2="560"
              stroke="white"
              strokeWidth="0.4"
              strokeDasharray="4 8"
              opacity="0.2"
            />
          </g>
        </svg>
      </Container>
    </section>
  );
}
