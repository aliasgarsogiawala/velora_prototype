"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sitewide scroll choreography, driven by data attributes:
//   data-reveal="up|down|left|right|skew|zoom"  — one-shot entrance when scrolled into view
//   data-stagger                                — children cascade in one after another
//   data-clip                                   — curtain wipe reveal (for imagery)
//   data-drift="<amount>"                       — horizontal drift scrubbed to scroll position
export default function ScrollFX() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const vars: gsap.TweenVars = { opacity: 0, duration: 1.1, ease: "power3.out" };
        if (kind === "up") Object.assign(vars, { y: 70 });
        if (kind === "down") Object.assign(vars, { y: -50 });
        if (kind === "left") Object.assign(vars, { x: -90 });
        if (kind === "right") Object.assign(vars, { x: 90 });
        if (kind === "skew") Object.assign(vars, { y: 90, skewY: 5, transformOrigin: "0% 100%", duration: 1.25 });
        if (kind === "zoom") Object.assign(vars, { scale: 0.85, y: 40 });
        gsap.from(el, { ...vars, scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 64,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.11,
          scrollTrigger: { trigger: group, start: "top 86%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 78%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const amp = parseFloat(el.dataset.drift || "8");
        gsap.fromTo(
          el,
          { xPercent: -amp },
          {
            xPercent: amp,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
