"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Static placeholder geometry for no-JS rendering; buildRoad() replaces it with
// a path in real pixel coordinates so dashes, dots and the traveler stay 1:1.
const ROAD =
  "M 500 0 C 500 50, 260 40, 260 100 C 260 160, 740 240, 740 300 C 740 360, 260 440, 260 500 C 260 560, 740 640, 740 700 C 740 760, 260 840, 260 900 C 260 960, 740 1040, 740 1100 C 740 1150, 500 1150, 500 1200";

const MILESTONES = [
  { year: "2016", title: "A night train north", copy: "Two friends miss a connection in Oslo and take the slow train instead. It becomes the best travel day of their lives — and a question: why does no one design for this?" },
  { year: "2018", title: "Velora is born", copy: "A two-desk studio opens with one promise: journeys built around feelings, not checklists." },
  { year: "2020", title: "The quiet years", copy: "When the world stops moving, we redesign everything around slowness — fewer places, longer stays, deeper access." },
  { year: "2022", title: "A growing atlas", copy: "Forty countries, three hundred trusted local partners, and a waiting list we never advertised." },
  { year: "2024", title: "The signature collection", copy: "Our four defining journeys launch — Europe, the fjords, Britain and the Alps — each one rehearsed in person, twice." },
  { year: "2026", title: "Your chapter", copy: "Ten years of wandering later, the road arrives at its favourite destination: you." },
];

export default function StoryRoad() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
      const section = root.current;
      const stage = section?.querySelector<HTMLElement>(".road-wrap");
      const svg = section?.querySelector<SVGSVGElement>(".road-svg");
      const base = section?.querySelector<SVGPathElement>(".road-base");
      const draw = section?.querySelector<SVGPathElement>(".road-draw");
      const traveler = section?.querySelector(".traveler");
      if (!section || !stage || !svg || !base || !draw || !traveler) return;

      // Serpentine through the milestone dots (26% / 74%), in pixel space.
      const buildRoad = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const rowH = H / MILESTONES.length;
        const pts: [number, number][] = MILESTONES.map((_, i) => [
          (i % 2 ? 0.74 : 0.26) * W,
          (i + 0.5) * rowH,
        ]);
        pts.push([W / 2, H]);
        let [px, py] = [W / 2, 0];
        let d = `M ${px} ${py}`;
        for (const [x, y] of pts) {
          const bend = (y - py) * 0.55;
          d += ` C ${px} ${py + bend}, ${x} ${y - bend}, ${x} ${y}`;
          [px, py] = [x, y];
        }
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        base.setAttribute("d", d);
        draw.setAttribute("d", d);
        const len = draw.getTotalLength();
        gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });
      };

      buildRoad();
      ScrollTrigger.addEventListener("refreshInit", buildRoad);

      // Road draws itself and the traveler rides it, both scrubbed to scroll.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 85%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(draw, { strokeDashoffset: 0, duration: 1 }, 0)
        .to(traveler, { autoAlpha: 1, duration: 0.01 }, 0)
        .to(traveler, { motionPath: { path: draw, align: draw, alignOrigin: [0.5, 0.5] }, duration: 1 }, 0);

      // Each stop pops as the road reaches it.
      section.querySelectorAll(".milestone-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: dot, start: "top 62%" },
        });
      });

      return () => ScrollTrigger.removeEventListener("refreshInit", buildRoad);
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="story-road wrap" ref={root}>
      <div className="road-wrap">
        <svg className="road-svg" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
          <path className="road-base" d={ROAD} vectorEffect="non-scaling-stroke" />
          <path className="road-draw" d={ROAD} vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="traveler" aria-hidden="true" />
        <ol className="milestones">
          {MILESTONES.map((m, i) => (
            <li key={m.year} className={i % 2 ? "stop-right" : "stop-left"}>
              <span className="milestone-dot" aria-hidden="true" />
              <div className="milestone-card" data-reveal={i % 2 ? "right" : "left"}>
                <span className="milestone-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
