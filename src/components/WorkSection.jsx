"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects, work } from "../data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkSection() {
  const rootRef = useRef(null);
  const indexRef = useRef(null);
  const progressRef = useRef(null);
  const items = featuredProjects;
  const total = items.length;
  const liveCount = items.filter((p) => p.href).length;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const cards = gsap.utils.toArray("[data-work-card]");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (progressRef.current) {
          progressRef.current.style.transform = "scaleX(1)";
        }
        if (indexRef.current) {
          indexRef.current.textContent = String(total).padStart(2, "0");
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-work-head]", { opacity: 0, y: 24 });
        gsap.set(cards, { opacity: 0, y: 28 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              once: true,
            },
          })
          .to("[data-work-head]", { opacity: 1, y: 0, duration: 0.75 })
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: { each: 0.05, from: "start" },
            },
            "-=0.4"
          );

        let lastActive = -1;
        const syncFocus = () => {
          const mid = window.innerHeight * 0.45;
          let best = 0;
          let bestDist = Infinity;

          cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const dist = Math.abs(center - mid);
            if (dist < bestDist) {
              bestDist = dist;
              best = i;
            }
          });

          if (best === lastActive) return;
          lastActive = best;

          const progress = total > 1 ? best / (total - 1) : 1;
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${progress})`;
          }
          if (indexRef.current) {
            indexRef.current.textContent = String(best + 1).padStart(2, "0");
          }
        };

        const st = ScrollTrigger.create({
          trigger: "[data-work-grid]",
          start: "top 70%",
          end: "bottom 40%",
          onUpdate: syncFocus,
          onEnter: syncFocus,
          onEnterBack: syncFocus,
        });

        requestAnimationFrame(syncFocus);

        return () => {
          st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [total] }
  );

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative z-[17] scroll-mt-24 overflow-hidden bg-ink text-paper"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(88%,72rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-lemon/50 to-transparent"
        aria-hidden
      />
      <div
        className="lemon-glow pointer-events-none absolute -right-28 top-1/3 h-[380px] w-[380px] rounded-full bg-lemon/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:py-32">
        <header
          data-work-head
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="inline-flex bg-lemon px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
              {work.badge}
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.35rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
              Things I&apos;ve{" "}
              <span className="text-lemon">shipped.</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-paper/60 md:text-[15px]">
              {work.blurb}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-right md:px-5 md:py-3">
              <p className="font-display text-lg font-bold tabular-nums text-lemon md:text-xl">
                <span ref={indexRef}>01</span>
                <span className="text-paper/25">
                  {" "}
                  / {String(total).padStart(2, "0")}
                </span>
              </p>
              <p className="font-body text-[8px] uppercase tracking-[0.26em] text-paper/45">
                {liveCount} live
              </p>
            </div>
            <p className="max-w-[14rem] text-right font-body text-[10px] uppercase tracking-[0.22em] text-paper/40">
              {work.scrollHint}
            </p>
          </div>
        </header>

        <div className="mt-8 h-px w-full overflow-hidden bg-white/[0.08]">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-lemon"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div
          data-work-grid
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {items.map((project, i) => {
            const wide = Boolean(project.wide);

            return (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                data-work-card
                className={`group relative flex min-h-[232px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-[#141414] p-6 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-lemon/40 hover:bg-[#1a1a1a] md:min-h-[248px] md:rounded-[1.25rem] md:p-7 ${
                  wide ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="relative z-[1]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body text-[11px] font-medium tabular-nums tracking-[0.14em] text-lemon">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.href ? (
                        <span className="rounded-full bg-lemon px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
                          Live
                        </span>
                      ) : null}
                      <span className="font-body text-[11px] text-paper/55">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-paper/55">
                    {project.tag}
                  </p>
                  <h3 className="mt-2 font-display text-[1.4rem] font-bold tracking-tight text-paper md:text-[1.6rem]">
                    {project.title}
                  </h3>
                  <div
                    className="mt-3 h-1 w-8 bg-lemon transition-[width] duration-300 ease-out group-hover:w-12"
                    aria-hidden
                  />
                  <p
                    className={`mt-4 max-w-xl font-body text-[14px] leading-relaxed text-paper/80 md:text-[15px] ${
                      wide ? "line-clamp-3" : "line-clamp-2"
                    }`}
                  >
                    {project.blurb}
                  </p>
                </div>

                <div className="relative z-[1] mt-7 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex min-w-0 flex-wrap gap-1.5">
                    {project.stack.slice(0, wide ? 4 : 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/12 bg-white/[0.04] px-2 py-1 font-body text-[11px] text-paper/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 group-hover:text-lemon">
                    Case →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 font-body text-[11px] uppercase tracking-[0.22em] text-paper/40">
          {work.note}
        </p>
      </div>
    </section>
  );
}
