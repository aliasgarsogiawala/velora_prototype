"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHARD_COUNT = 26;

// Deterministic pseudo-random so server and client render identical shards.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// The coral ball in the hero. While the hero is pinned, scrolling charges the
// ball up until it detonates into shards and a shockwave, then the page continues.
export default function HeroBall() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = stage.current;
      const hero = el?.closest(".hero");
      if (!el || !hero) return;

      const ball = el.querySelector(".circle-link");
      const wave = el.querySelector(".shockwave");
      const shards = el.querySelectorAll(".shard");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=120%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Charge: the ball swells and the hero quiets down around it.
      tl.to(ball, { scale: 3.1, rotation: -14, duration: 0.42, ease: "power2.in" }, 0)
        .to(hero.querySelector(".hero-meta"), { opacity: 0, duration: 0.25 }, 0)
        .to(hero.querySelector(".hero-bottom p"), { opacity: 0, x: -30, duration: 0.35 }, 0.05)
        .to(hero.querySelector(".hero-title"), { yPercent: -7, duration: 0.6, ease: "none" }, 0);

      // Detonate: core collapses, shockwave rings out.
      tl.to(ball, { scale: 0, opacity: 0, duration: 0.06, ease: "power4.in" }, 0.42)
        .fromTo(
          wave,
          { xPercent: -50, yPercent: -50, scale: 0.4, opacity: 0 },
          { opacity: 0.9, duration: 0.03, ease: "none" },
          0.42,
        )
        .to(wave, { scale: 11, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.45);

      // Debris flies outward, tumbling and burning out.
      shards.forEach((shard, i) => {
        const angle = (i / shards.length) * Math.PI * 2 + rand(i, 1) * 0.7;
        const dist = 220 + rand(i, 2) * 480;
        tl.fromTo(
          shard,
          { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0, opacity: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            scale: 0.4 + rand(i, 3),
            rotation: rand(i, 5) * 360 - 180,
            opacity: 0,
            duration: 0.45 + rand(i, 4) * 0.1,
            ease: "power2.out",
          },
          0.43,
        );
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="ball-stage" ref={stage}>
      <span className="shockwave" aria-hidden="true" />
      {Array.from({ length: SHARD_COUNT }, (_, i) => (
        <span
          key={i}
          className="shard"
          aria-hidden="true"
          style={{ width: 6 + rand(i, 9) * 12, height: 6 + rand(i, 9) * 12 }}
        />
      ))}
      <Link className="circle-link" href="/journeys">
        Explore<br />journeys <span className="arrow" aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
