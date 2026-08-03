"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "../data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function setAchIndex(indexEl, n) {
  if (!indexEl) return;
  indexEl.textContent = String(n).padStart(2, "0");
}

/** Hide heading + cards until after the stack cover. Panel bg stays solid. */
export function prepareAchievementsStage(stage) {
  if (!stage) return;
  const copy = stage.querySelector("[data-ach-copy]");
  const meter = stage.querySelector("[data-ach-meter]");
  const track = stage.querySelector("[data-ach-track]");
  const indexEl = stage.querySelector("[data-ach-index]");
  const cards = gsap.utils.toArray(stage.querySelectorAll(".ach-card"));

  gsap.set(copy, { opacity: 0, y: 36 });
  gsap.set(meter, { opacity: 0, y: 16 });
  if (track) gsap.set(track, { x: 0, clearProps: "transform" });
  // Park fully below the viewport — no peek until each card’s scroll beat
  gsap.set(cards, {
    opacity: 1,
    y: () => window.innerHeight,
    scale: 1,
    clearProps: "clipPath,webkitClipPath",
  });
  gsap.set(stage.querySelector("[data-ach-progress]"), {
    scaleX: 0,
    transformOrigin: "left center",
  });
  setAchIndex(indexEl, 0);
}

/**
 * Scroll-scrubbed sequence:
 * heading → cards rise one-by-one and stay in a left→right row (no left slide).
 * Pass `at` (e.g. "wins-cover").
 */
export function appendAchievementsSequence(tl, stage, at = ">") {
  if (!tl || !stage) return tl;

  const copy = stage.querySelector("[data-ach-copy]");
  const meter = stage.querySelector("[data-ach-meter]");
  const progress = stage.querySelector("[data-ach-progress]");
  const track = stage.querySelector("[data-ach-track]");
  const indexEl = stage.querySelector("[data-ach-index]");
  const cards = gsap.utils.toArray(stage.querySelectorAll(".ach-card"));
  const total = Math.max(cards.length, 1);
  const enterDur = 1.45;
  const holdDur = 0.55;

  // Lock row in place — three cards fill rightward, never shift left
  if (track) gsap.set(track, { x: 0 });

  tl.addLabel("wins-content", at);

  tl.fromTo(
    copy,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "none",
      immediateRender: false,
    },
    "wins-content"
  );

  tl.fromTo(
    meter,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "none",
      immediateRender: false,
    },
    "wins-content+=0.15"
  );

  tl.to({}, { duration: 0.3 }, ">");

  const counter = { n: 0 };

  cards.forEach((card, i) => {
    const n = i + 1;
    const bar = n / total;
    const label = `wins-card-${i}`;

    tl.addLabel(label, ">");

    // Rise from fully below — only this card moves on its scroll beat
    tl.fromTo(
      card,
      { opacity: 1, y: () => window.innerHeight, scale: 1 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: enterDur,
        ease: "none",
        immediateRender: false,
      },
      label
    );

    if (indexEl) {
      tl.to(
        counter,
        {
          n,
          duration: enterDur,
          ease: "none",
          onUpdate: () => {
            setAchIndex(
              indexEl,
              Math.max(0, Math.min(total, Math.round(counter.n)))
            );
          },
        },
        label
      );
    }

    if (progress) {
      tl.to(
        progress,
        {
          scaleX: bar,
          duration: enterDur,
          ease: "none",
        },
        label
      );
    }

    // Beat between cards; after the 3rd is fully up, hold before Contact
    if (i < cards.length - 1) {
      tl.to({}, { duration: holdDur }, ">");
    } else {
      tl.to({}, { duration: 1.1 }, ">");
    }
  });

  tl.addLabel("wins-end");

  return tl;
}

function AchievementsStage() {
  const items = profile.featuredAchievements;

  return (
    <section
      data-achievements-stage
      className="relative h-full w-full overflow-hidden bg-ink text-paper"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lemon/12 blur-[130px]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full flex-col md:flex-row">
        <aside className="relative z-10 flex w-full shrink-0 flex-col justify-center px-6 pb-4 pt-24 md:w-[36%] md:max-w-md md:justify-between md:px-10 md:pb-14 md:pt-28">
          <div data-ach-copy style={{ opacity: 0 }}>
            <span
              className="mb-4 inline-block font-display text-4xl leading-none text-paper/85"
              aria-hidden
            >
              ”
            </span>

            <p className="mb-4 font-body text-[10px] uppercase tracking-[0.35em] text-lemon md:text-xs">
              05 — Achievements
            </p>

            <h2 className="font-display text-[clamp(1.85rem,3.8vw,3.1rem)] font-bold leading-[1.12] tracking-tight text-paper">
              Wins that shaped the work.
            </h2>

            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-paper/50 md:mt-5 md:text-[15px]">
              Startup heat. National AI. A real agency. Three receipts, one
              story.
            </p>
          </div>

          <div data-ach-meter className="mt-6 max-w-[11rem] md:mt-0" style={{ opacity: 0 }}>
            <div className="mb-2 flex items-baseline justify-between font-display text-xs tabular-nums text-paper/40">
              <span
                data-ach-index
                className="inline-block text-lemon will-change-transform"
              >
                00
              </span>
              <span>/ {String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="h-px overflow-hidden bg-paper/15">
              <div
                data-ach-progress
                className="h-full origin-left bg-lemon will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </aside>

        <div className="relative z-10 flex min-h-0 flex-1 items-center overflow-hidden px-6 pb-10 pt-2 md:px-4 md:pb-8 md:pt-20">
          {/* Fixed L→R row — cards rise on scroll only (parked off-screen below) */}
          <div
            data-ach-track
            className="flex w-full items-stretch justify-start gap-4 overflow-hidden md:gap-5"
          >
            {items.map((item, i) => (
              <article
                key={item.id}
                className="ach-card relative flex h-[min(48vh,340px)] min-w-0 flex-1 basis-0 flex-col overflow-hidden rounded-[1.75rem] bg-lemon text-ink shadow-[0_28px_70px_rgba(0,0,0,0.32)] will-change-transform md:h-[min(58vh,460px)] md:max-w-[280px]"
              >
                <div className="flex justify-center px-5 pt-6">
                  <span className="inline-flex items-center rounded-full border border-ink/25 px-3.5 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-ink/80">
                    {item.badge}
                  </span>
                </div>

                <div className="min-h-[20%] flex-1" aria-hidden />

                <div className="relative z-[1] px-5 pb-6 md:px-6 md:pb-7">
                  <p className="font-body text-[10px] uppercase tracking-[0.22em] text-ink/45">
                    Achievement {String(i + 1).padStart(2, "0")} · {item.mark}
                  </p>

                  <h3 className="mt-2 font-display text-[1.35rem] font-bold leading-snug tracking-tight md:text-[1.5rem]">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-body text-[13px] leading-relaxed text-ink/65">
                    {item.line}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-ink/15 px-2.5 py-1 font-body text-[10px] tracking-wide text-ink/70"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 font-body text-[12px] leading-relaxed text-ink/55">
                    <span className="text-ink/75">{item.learning}</span>
                  </p>
                </div>

                <span
                  className="pointer-events-none absolute bottom-2 right-3 font-display text-6xl font-bold text-ink/[0.06]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Embedded in ExperienceStack — parent owns the scroll timeline. */
export function AchievementsSurface() {
  return (
    <div className="h-full w-full bg-ink">
      <AchievementsStage />
    </div>
  );
}

/** Standalone fallback (unused when stacked). */
export default function AchievementsSection() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      if (!wrap || !stage) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-ach-copy], [data-ach-meter], .ach-card", {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        prepareAchievementsStage(stage);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        appendAchievementsSequence(tl, stage);
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      id="achievements"
      className="relative z-[4]"
      style={{ height: "260vh" }}
    >
      <div ref={stageRef} className="h-screen w-full">
        <AchievementsStage />
      </div>
    </div>
  );
}
