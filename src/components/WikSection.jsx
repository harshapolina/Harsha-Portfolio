"use client";

import { useEffect, useRef, useState } from "react";
import FallingText from "./FallingText";
import { fallingStackItems } from "../data/stack";

export default function WikSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [fallActive, setFallActive] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const startFall = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      window.setTimeout(() => setFallActive(true), 220);
    };

    window.addEventListener("wik-fall", startFall);

    const target = stageRef.current || sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          startFall();
        }
      },
      { threshold: [0.25, 0.4, 0.6] }
    );

    if (target) observer.observe(target);

    if (typeof window !== "undefined" && window.location.hash === "#wik") {
      window.setTimeout(startFall, 350);
    }

    return () => {
      window.removeEventListener("wik-fall", startFall);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-ink md:flex-row"
      aria-labelledby="wik-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div
        className="lemon-glow pointer-events-none absolute right-[6%] top-[22%] h-[440px] w-[440px] rounded-full bg-lemon/22 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-lemon/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-20 flex w-full flex-col justify-end px-6 pb-16 pt-28 md:w-[36%] md:max-w-lg md:justify-end md:px-12 md:pb-20 md:pt-24 lg:px-16">
        <p className="mb-3 font-body text-[10px] uppercase tracking-[0.35em] text-lemon md:text-xs">
          02 — Stack
        </p>
        <h2
          id="wik-heading"
          className="font-display text-[20vw] font-bold leading-[0.84] tracking-tight text-paper md:text-[7vw] lg:text-[6.5rem]"
        >
          W&apos;IK?
        </h2>
        <p className="mt-5 max-w-[19rem] font-body text-sm leading-relaxed text-paper/55 md:mt-6 md:max-w-sm md:text-[0.95rem]">
          Design systems, frontend, backend, and Gen AI — the full stack I ship
          with. Scroll for the full toolkit.
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative z-10 min-h-[52vh] flex-1 md:min-h-full"
      >
        <div className="absolute inset-x-3 top-[5%] bottom-[8%] md:inset-x-0 md:left-[10%] md:right-[2%] md:top-[6%] md:bottom-[8%]">
          <FallingText
            items={fallingStackItems}
            asCards
            trigger="auto"
            active={fallActive}
            interactive
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.95}
            mouseConstraintStiffness={0.45}
            floorInset={20}
            leftInset={8}
            rightInset={12}
          />
        </div>
      </div>
    </section>
  );
}
