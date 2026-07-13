"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHARD_COUNT = 28;
const GLITTER_COUNT = 54;

// Deterministic pseudo-random so server and client render identical particles.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Full-screen detonation overlay for the hero. Scrolling charges the coral ball
// (rendered separately in the hero layout) until it collapses and a solid coral
// blast floods the whole screen — glitter twinkling and a line of text over it —
// then it clears to reveal the page beyond.
export default function HeroBall() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = layer.current;
      const hero = el?.closest(".hero");
      if (!el || !hero) return;

      const ball = hero.querySelector(".circle-link");
      const wave = el.querySelector(".shockwave");
      const text = el.querySelector(".blast-text");
      const shards = el.querySelectorAll(".shard");
      const glitter = el.querySelectorAll(".glitter");

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
      tl.to(ball, { scale: 3.4, rotation: -16, duration: 0.4, ease: "power2.in" }, 0)
        .to(hero.querySelector(".hero-meta"), { opacity: 0, duration: 0.25 }, 0)
        .to(hero.querySelector(".hero-bottom p"), { opacity: 0, x: -30, duration: 0.35 }, 0.05)
        .to(hero.querySelector(".hero-title"), { yPercent: -7, duration: 0.55, ease: "none" }, 0);

      // Detonate: core collapses, a solid coral blast floods the whole screen.
      tl.to(ball, { scale: 0, opacity: 0, duration: 0.05, ease: "power4.in" }, 0.4);

      tl.fromTo(
        wave,
        { xPercent: -50, yPercent: -50, scale: 0, opacity: 1 },
        { scale: 40, duration: 0.26, ease: "power2.out" },
        0.42,
      )
        .to(wave, { opacity: 1, duration: 0.14 }, 0.68) // hold: entire screen solid coral
        .to(wave, { opacity: 0, duration: 0.2, ease: "power1.in" }, 0.82);

      // Debris bursts outward just before the coral engulfs the frame.
      shards.forEach((shard, i) => {
        const angle = (i / shards.length) * Math.PI * 2 + rand(i, 1) * 0.7;
        const dist = 300 + rand(i, 2) * 620;
        tl.fromTo(
          shard,
          { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0, opacity: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            scale: 0.5 + rand(i, 3) * 1.1,
            rotation: rand(i, 5) * 360 - 180,
            opacity: 0,
            duration: 0.4 + rand(i, 4) * 0.1,
            ease: "power2.out",
          },
          0.4,
        );
      });

      // Glitter twinkles across the coral while it is held solid.
      glitter.forEach((g, i) => {
        const at = 0.58 + rand(i, 6) * 0.24;
        tl.fromTo(
          g,
          { scale: 0, opacity: 0 },
          { scale: 1.2 + rand(i, 7), opacity: 1, duration: 0.05, ease: "power1.out" },
          at,
        ).to(g, { scale: 0.4, opacity: 0, duration: 0.09, ease: "power1.in" }, at + 0.05);
      });

      // The payoff line rises through the solid coral, then clears with it.
      tl.fromTo(
        text,
        { xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.62,
      ).to(text, { opacity: 0, yPercent: -60, duration: 0.14, ease: "power1.in" }, 0.84);

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="blast-layer" ref={layer} aria-hidden="true">
      <span className="shockwave" />
      {Array.from({ length: SHARD_COUNT }, (_, i) => (
        <span
          key={`s${i}`}
          className="shard"
          style={{ width: 7 + rand(i, 9) * 13, height: 7 + rand(i, 9) * 13 }}
        />
      ))}
      {Array.from({ length: GLITTER_COUNT }, (_, i) => {
        const size = 2 + rand(i, 11) * 5;
        return (
          <span
            key={`g${i}`}
            className="glitter"
            style={{
              width: size,
              height: size,
              left: `${6 + rand(i, 12) * 88}%`,
              top: `${8 + rand(i, 13) * 82}%`,
            }}
          />
        );
      })}
      <p className="blast-text">Where wonder finds you.</p>
    </div>
  );
}
