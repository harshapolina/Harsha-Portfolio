"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  prepareAboutStage,
  appendAboutSequence,
  appendAboutExit,
} from "./AboutSection";
import {
  prepareAchievementsStage,
  appendAchievementsSequence,
} from "./AchievementsSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experienceCards = [
  {
    id: "01",
    role: "Co-Founder",
    org: "Editco Media",
    period: "Present",
    title: "Building the agency I wanted to hire",
    body: "From blank canvas to client-ready products — AI systems, brand identity, and automation that actually move revenue. I lead strategy, ship the stack, and own the outcome.",
    tags: ["AI Products", "Branding", "Automation", "Leadership"],
    tone: "lemon",
  },
  {
    id: "02",
    role: "Full Stack Intern · SDE",
    org: "Mecntec · Product Engineering",
    period: "Apr 2026 — Present",
    title: "Shipping interfaces that feel inevitable",
    body: "React, Tailwind, REST, Supabase, Firebase — production UIs, AI-powered features, and clean deployments. Fast loops. Sharp debugging. Code that survives real users.",
    tags: ["React", "APIs", "AI Features", "Deploy"],
    tone: "white",
  },
  {
    id: "03",
    role: "Clubs & Council",
    org: "Campus Leadership",
    period: "Ongoing",
    title: "Leading rooms, not just roadmaps",
    body: "Serving in Media Council and General Council — turning ideas into coordinated teams with communication, ownership, and momentum under pressure.",
    tags: ["Media Council", "General Council"],
    tone: "ink",
  },
];

function cardClasses(tone) {
  if (tone === "lemon") {
    return {
      shell: "bg-lemon text-ink",
      muted: "text-ink/55",
      pill: "border-ink/20 text-ink/65",
      badge: "bg-ink text-lemon",
    };
  }
  if (tone === "white") {
    return {
      shell: "bg-paper text-ink",
      muted: "text-ink/50",
      pill: "border-ink/15 text-ink/55",
      badge: "bg-ink text-paper",
    };
  }
  return {
    shell: "bg-[#141414] text-paper border border-white/10",
    muted: "text-paper/50",
    pill: "border-lemon/30 text-lemon/80",
    badge: "bg-lemon text-ink",
  };
}

export default function ExperienceStack({
  children,
  about = null,
  wins = null,
}) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const nextRef = useRef(null);
  const aboutRef = useRef(null);
  const winsRef = useRef(null);
  const progressRef = useRef(null);
  const indexRef = useRef(null);
  const dotsRef = useRef([]);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      const next = nextRef.current;
      const aboutPanel = aboutRef.current;
      const winsPanel = winsRef.current;
      const cards = gsap.utils.toArray(".exp-card");
      if (!wrap || !stage || cards.length < 2) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { clearProps: "all", x: 0 });
        if (next) gsap.set(next, { yPercent: 0 });
        if (aboutPanel) gsap.set(aboutPanel, { yPercent: 0 });
        if (winsPanel) gsap.set(winsPanel, { yPercent: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const parkX = () => stage.offsetWidth + 48;

        gsap.set(cards[0], { x: 0, scale: 1, zIndex: 1, force3D: true });
        gsap.set(cards.slice(1), {
          x: parkX,
          scale: 1,
          zIndex: (i) => i + 2,
          force3D: true,
        });

        if (next) gsap.set(next, { yPercent: 100, force3D: true });
        if (aboutPanel) gsap.set(aboutPanel, { yPercent: 100, force3D: true });
        if (winsPanel) gsap.set(winsPanel, { yPercent: 100, force3D: true });

        const aboutStage = aboutPanel?.querySelector("[data-about-stage]");
        if (aboutStage) prepareAboutStage(aboutStage);

        const winsStage = winsPanel?.querySelector(
          "[data-achievements-stage]"
        );
        if (winsStage) prepareAchievementsStage(winsStage);

        let lastActive = 0;
        let fallFired = false;

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 0.85 },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            // Soft scrub = buttery catch-up (less stiff / “stuck” feel)
            scrub: 0.95,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (tl.scrollTrigger?.progress === 0) {
                gsap.set(cards[0], { x: 0, scale: 1 });
                gsap.set(cards.slice(1), { x: parkX(), scale: 1 });
                if (next) gsap.set(next, { yPercent: 100 });
                if (aboutPanel) gsap.set(aboutPanel, { yPercent: 100 });
                if (winsPanel) {
                  gsap.set(winsPanel, { yPercent: 100 });
                  const ws = winsPanel.querySelector(
                    "[data-achievements-stage]"
                  );
                  if (ws) prepareAchievementsStage(ws);
                }
                fallFired = false;
              }
            },
            onUpdate: () => {
              // Experience card UI tied to early timeline time only
              const expEnd = Math.max((cards.length - 1) * 0.72 + 0.85, 1);
              const cardPhase = gsap.utils.clamp(0, 1, tl.time() / expEnd);
              const active = Math.min(
                cards.length - 1,
                Math.round(cardPhase * (cards.length - 1))
              );

              if (active !== lastActive) {
                lastActive = active;
                if (indexRef.current) {
                  indexRef.current.textContent = String(active + 1).padStart(
                    2,
                    "0"
                  );
                }
                dotsRef.current.forEach((dot, idx) => {
                  if (!dot) return;
                  const on = idx === active;
                  dot.style.width = on ? "2rem" : "0.375rem";
                  dot.style.background = on
                    ? "#fff44f"
                    : "rgba(255,255,255,0.25)";
                });
              }

              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${Math.min(cardPhase, 1)})`;
              }
            },
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) return;
          // Slight overlap so chapters don’t “land and wait”
          const at = (i - 1) * 0.72;
          const peek = () => Math.min(32, stage.offsetWidth * 0.07);

          cards.slice(0, i).forEach((behind, bi) => {
            const depth = i - bi;
            tl.to(
              behind,
              {
                x: () => -peek() * depth,
                scale: 1 - depth * 0.03,
                duration: 0.85,
              },
              at
            );
          });

          tl.fromTo(
            card,
            { x: parkX, scale: 1 },
            { x: 0, scale: 1, duration: 0.85 },
            at
          );
        });

        // Let the council card settle before the next section
        tl.to({}, { duration: 0.85 });
        tl.addLabel("wik-start");

        if (next) {
          tl.to(
            next,
            {
              yPercent: 0,
              duration: 1.35,
              ease: "none",
              onUpdate: function onWikSlide() {
                if (!fallFired && this.progress() > 0.42) {
                  fallFired = true;
                  window.dispatchEvent(new CustomEvent("wik-fall"));
                }
              },
            },
            "wik-start"
          );
        }

        tl.addLabel("wik-up");

        if (aboutPanel) {
          tl.addLabel("about-stack");
          tl.to(
            aboutPanel,
            {
              yPercent: 0,
              duration: 1.55,
              ease: "none",
            },
            // Tiny breath only — no long dead scroll on W'IK
            "wik-up+=0.18"
          );
          tl.addLabel("about-cover");

          const stageEl = aboutPanel.querySelector("[data-about-stage]");
          if (stageEl) {
            prepareAboutStage(stageEl);
            appendAboutSequence(tl, stageEl);
          }
        }

        if (winsPanel) {
          const winsStageEl = winsPanel.querySelector(
            "[data-achievements-stage]"
          );
          if (winsStageEl) prepareAchievementsStage(winsStageEl);

          // 1) Stack cover — Wins slides up over About
          tl.addLabel("wins-stack");
          tl.fromTo(
            winsPanel,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 1.25,
              ease: "none",
              immediateRender: false,
            },
            ">"
          );

          // About soft-exits while Wins covers
          const aboutStageEl = aboutPanel?.querySelector("[data-about-stage]");
          if (aboutStageEl) {
            appendAboutExit(tl, aboutStageEl, "wins-stack");
          }

          tl.addLabel("wins-cover", "wins-stack+=1.25");

          // 2) Heading, then 3) each card — only AFTER cover finishes
          if (winsStageEl) {
            appendAchievementsSequence(tl, winsStageEl, "wins-cover");
          }

          // Keep panel parked; each card already ends revealed from its own tween
          tl.set(winsPanel, { yPercent: 0 }, "wins-end");
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    {
      scope: wrapRef,
      dependencies: [Boolean(about), Boolean(children), Boolean(wins)],
    }
  );

  // Tall enough for all wins cards, short tail into Contact
  const stackHeight = wins
    ? "2400vh"
    : about
      ? "1400vh"
      : children
        ? "360vh"
        : "220vh";

  return (
    <div
      ref={wrapRef}
      id="experience"
      className="relative z-[2]"
      style={{ height: stackHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <section className="absolute inset-0 z-[1] flex flex-col overflow-hidden bg-ink">
          <div
            className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-lemon/10 blur-[120px]"
            aria-hidden
          />
          <p
            className="pointer-events-none absolute right-[-4%] top-[8%] select-none font-display text-[28vw] font-bold leading-none text-paper/[0.06]"
            aria-hidden
          >
            EXP
          </p>

          <header className="relative z-10 mx-auto flex w-full max-w-7xl shrink-0 items-end justify-between gap-6 px-6 pb-3 pt-20 md:px-10 md:pb-4 md:pt-24">
            <div className="min-w-0">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-lemon md:text-xs">
                01 — Places
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-paper md:text-5xl lg:text-6xl">
                Experience
              </h2>
              <p className="mt-1.5 max-w-sm font-body text-xs text-paper/45 md:text-sm">
                Scroll — chapters slide in from the right and stack.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 md:gap-6">
              <div className="flex items-baseline gap-1.5 font-display">
                <span
                  ref={indexRef}
                  className="text-2xl font-bold tabular-nums text-lemon md:text-4xl"
                >
                  01
                </span>
                <span className="text-xs text-paper/30 md:text-sm">/ 03</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {experienceCards.map((card, i) => (
                  <span
                    key={card.id}
                    ref={(el) => {
                      dotsRef.current[i] = el;
                    }}
                    className="h-1.5 rounded-full"
                    style={{
                      width: i === 0 ? "2rem" : "0.375rem",
                      background:
                        i === 0 ? "#fff44f" : "rgba(255,255,255,0.25)",
                      transition: "width 0.35s ease, background 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-5 md:px-10">
            <div
              ref={stageRef}
              className="exp-stage relative w-full max-w-lg overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
              style={{ height: "100%", maxHeight: "420px" }}
            >
              {experienceCards.map((card, index) => {
                const c = cardClasses(card.tone);
                return (
                  <article
                    key={card.id}
                    className={`exp-card absolute inset-0 flex flex-col justify-between rounded-[1.5rem] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] will-change-transform md:rounded-[2rem] md:p-8 ${c.shell}`}
                    style={{ zIndex: index + 1 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full md:h-11 md:w-11 ${c.badge}`}
                      >
                        <span className="font-display text-xs font-bold md:text-sm">
                          {card.id}
                        </span>
                      </div>
                      <span
                        className={`pt-1 font-body text-[9px] uppercase tracking-[0.24em] md:text-[10px] ${c.muted}`}
                      >
                        {card.period}
                      </span>
                    </div>

                    <div>
                      <p
                        className={`font-body text-[9px] uppercase tracking-[0.28em] md:text-[10px] ${c.muted}`}
                      >
                        {card.role}
                        <span className="mx-1.5 opacity-40">·</span>
                        {card.org}
                      </p>

                      <h3 className="mt-2 font-display text-xl font-bold leading-[1.1] tracking-tight md:text-3xl">
                        {card.title}
                      </h3>

                      <p
                        className={`mt-2 line-clamp-3 font-body text-xs leading-relaxed md:mt-3 md:line-clamp-4 md:text-sm ${c.muted}`}
                      >
                        {card.body}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`border px-2.5 py-1 font-body text-[10px] tracking-wide md:px-3 md:text-[11px] ${c.pill}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl shrink-0 px-6 pb-5 pt-2 md:px-10 md:pb-6">
            <div className="flex items-center gap-4">
              <p className="shrink-0 font-body text-[9px] uppercase tracking-[0.28em] text-paper/35">
                Scroll
              </p>
              <div className="h-px flex-1 overflow-hidden bg-paper/10">
                <div
                  ref={progressRef}
                  className="h-full origin-left bg-lemon"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <p className="shrink-0 font-body text-[9px] uppercase tracking-[0.28em] text-lemon">
                03 chapters
              </p>
            </div>
          </div>
        </section>

        {children ? (
          <div
            ref={nextRef}
            data-wik-panel
            id="wik"
            className="absolute inset-0 z-[5] overflow-hidden will-change-transform stack-panel"
          >
            {children}
          </div>
        ) : null}

        {about ? (
          <div
            ref={aboutRef}
            data-about-panel
            id="about"
            className="absolute inset-0 z-[8] overflow-visible will-change-transform stack-panel"
          >
            {about}
          </div>
        ) : null}

        {wins ? (
          <div
            ref={winsRef}
            data-wins-panel
            id="achievements"
            className="absolute inset-0 z-[12] h-full w-full overflow-hidden bg-ink will-change-transform stack-panel"
          >
            {wins}
          </div>
        ) : null}

      </div>
    </div>
  );
}
