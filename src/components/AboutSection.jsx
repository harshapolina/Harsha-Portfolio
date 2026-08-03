"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * 3 on top, 2 below — soft pile.
 * Colors: ink / paper / lemon only (site palette).
 * Fonts: Syne (display) + DM Sans (body).
 */
const cards = [
  {
    id: "01",
    eyebrow: "editco media",
    title: "FOUNDER ENERGY",
    body: "Built the agency I wanted to hire — AI products, brand systems, and automation that move real revenue.",
    tags: ["Strategy", "Brand", "Ship"],
    mark: "✦",
    vibe: "zero → one",
    left: 24,
    top: 34,
    rotate: -3,
    z: 2,
    tone: "ink",
  },
  {
    id: "02",
    eyebrow: "engineering",
    title: "FULL-STACK BRAIN",
    body: "UI to APIs to deploy. Interfaces that feel fast, smooth, and alive — no half-builds, no fluff.",
    tags: ["React", "Python", "Build"],
    mark: "</>",
    vibe: "ship daily",
    left: 50,
    top: 30,
    rotate: 1.5,
    z: 4,
    tone: "paper",
  },
  {
    id: "03",
    eyebrow: "craft",
    title: "DESIGN TASTE",
    body: "Clean systems. Soft motion. Zero visual noise. Cozy gen-z energy with grown-up polish.",
    tags: ["Systems", "Motion", "Vibe"],
    mark: "◈",
    vibe: "no noise",
    left: 76,
    top: 34,
    rotate: 3,
    z: 3,
    tone: "lemon",
  },
  {
    id: "04",
    eyebrow: "future stack",
    title: "AI THAT SHIPS",
    body: "Not just prompting — wiring agents and automations into products that solve real problems.",
    tags: ["Automation", "Agents", "Impact"],
    mark: "◎",
    vibe: "ai native",
    left: 36,
    top: 68,
    rotate: -2,
    z: 5,
    tone: "lemon",
  },
  {
    id: "05",
    eyebrow: "campus",
    title: "COUNCIL MODE",
    body: "Serving in Media Council and General Council — leading rooms, owning outcomes, building momentum.",
    tags: ["Media Council", "General Council"],
    mark: "◆",
    vibe: "lead + own",
    left: 64,
    top: 70,
    rotate: 2.5,
    z: 6,
    tone: "paper",
  },
];

function toneStyles(tone) {
  if (tone === "ink") {
    return {
      // Lifted charcoal + lemon ring so it never melts into the page
      shell:
        "bg-[#161616] text-paper ring-1 ring-lemon/35 border border-white/10",
      muted: "text-paper/70",
      soft: "text-paper/50",
      chip: "border-paper/25 bg-paper/10 text-paper/85",
      vibe: "border-lemon/50 bg-lemon/15 text-lemon",
      markBg: "bg-lemon text-ink",
      stripe: "#fff44f",
      watermark: "text-paper/[0.08]",
      star: "text-lemon",
      shadow:
        "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,244,79,0.18), 0 0 40px rgba(255,244,79,0.08)",
    };
  }
  if (tone === "lemon") {
    return {
      shell: "bg-lemon text-ink ring-1 ring-ink/10",
      muted: "text-ink/70",
      soft: "text-ink/50",
      chip: "border-ink/15 bg-ink/[0.06] text-ink/80",
      vibe: "border-ink/20 bg-ink/[0.06] text-ink/70",
      markBg: "bg-ink text-lemon",
      stripe: "#0a0a0a",
      watermark: "text-ink/[0.08]",
      star: "text-ink/70",
      shadow: "0 22px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(10,10,10,0.08)",
    };
  }
  return {
    shell: "bg-paper text-ink ring-1 ring-ink/10",
    muted: "text-ink/65",
    soft: "text-ink/45",
    chip: "border-ink/12 bg-ink/[0.04] text-ink/75",
    vibe: "border-ink/15 bg-ink/[0.04] text-ink/60",
    markBg: "bg-ink text-lemon",
    stripe: "#fff44f",
    watermark: "text-ink/[0.06]",
    star: "text-ink/55",
    shadow: "0 22px 50px rgba(0,0,0,0.32), 0 0 0 1px rgba(10,10,10,0.06)",
  };
}

function settlePose(pose) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w < 768) {
    return {
      ...pose,
      left: 50 + (pose.left - 50) * 0.58,
      top: 52 + (pose.top - 50) * 0.62,
      rotate: pose.rotate * 0.65,
    };
  }
  if (w < 1024) {
    return {
      ...pose,
      left: 50 + (pose.left - 50) * 0.82,
      top: 50 + (pose.top - 50) * 0.85,
      rotate: pose.rotate * 0.85,
    };
  }
  return pose;
}

function applyCardPose(card, pose, extras = {}) {
  const p = settlePose(pose);
  gsap.set(card, {
    left: `${p.left}%`,
    top: `${p.top}%`,
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    rotation: p.rotate,
    transformOrigin: "50% 50%",
    zIndex: p.z,
    force3D: true,
    ...extras,
  });
}

/** Initial states for the about stage (embedded or standalone). */
export function prepareAboutStage(stage) {
  if (!stage) return;
  const aboutEl = stage.querySelector(".ab-about");
  const meEl = stage.querySelector(".ab-me");
  const paraEl = stage.querySelector(".ab-para");
  const glassEl = stage.querySelector(".ab-glass");
  const kickerEl = stage.querySelector(".ab-kicker");
  const titleWrap = stage.querySelector(".ab-title-wrap");
  const stackWrap = stage.querySelector(".ab-stack-wrap");
  const cardEls = gsap.utils.toArray(stage.querySelectorAll(".ab-card"));

  gsap.set(kickerEl, { opacity: 0, y: 12 });
  gsap.set(aboutEl, {
    y: () => window.innerHeight * 0.7,
    scale: 0.92,
    opacity: 1,
    filter: "blur(14px)",
    force3D: true,
  });
  // Park Me off-screen to the right until About has fully landed
  gsap.set(meEl, {
    x: () => Math.min(window.innerWidth * 0.7, 560),
    y: 10,
    scale: 0.9,
    rotate: 4,
    autoAlpha: 0,
    filter: "blur(10px)",
    force3D: true,
  });
  gsap.set(paraEl, { y: 14, opacity: 0, filter: "blur(4px)" });
  gsap.set(glassEl, { opacity: 0 });
  gsap.set(titleWrap, { filter: "blur(0px)", scale: 1, opacity: 1 });
  gsap.set(stackWrap, { opacity: 0 });

  cardEls.forEach((card, i) => {
    const pose = cards[i];
    if (!pose) return;
    applyCardPose(card, pose, {
      y: 140 + i * 28,
      rotation: settlePose(pose).rotate + (i % 2 === 0 ? 6 : -6),
      scale: 0.92,
      opacity: 0,
    });
  });
}

/** Append About → Me → para → blur → cards one-by-one into 3+2 pile. */
export function appendAboutSequence(tl, stage) {
  if (!tl || !stage) return tl;

  const aboutEl = stage.querySelector(".ab-about");
  const meEl = stage.querySelector(".ab-me");
  const paraEl = stage.querySelector(".ab-para");
  const glassEl = stage.querySelector(".ab-glass");
  const kickerEl = stage.querySelector(".ab-kicker");
  const titleWrap = stage.querySelector(".ab-title-wrap");
  const stackWrap = stage.querySelector(".ab-stack-wrap");
  const cardEls = gsap.utils.toArray(stage.querySelectorAll(".ab-card"));

  tl.addLabel("about-start");

  tl.to(
    kickerEl,
    { opacity: 1, y: 0, duration: 1.2, ease: "sine.out" },
    ">"
  );

  // 1) About — long soft rise from below (fully lands before Me)
  tl.fromTo(
    aboutEl,
    {
      y: () => window.innerHeight * 0.7,
      scale: 0.92,
      opacity: 1,
      filter: "blur(14px)",
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 2.8,
      ease: "power3.out",
      immediateRender: false,
      force3D: true,
    },
    "<+=0.15"
  );
  tl.addLabel("about-landed");

  // Soft breath only — then Me
  tl.to({}, { duration: 0.2 });

  // 2) Me — cinematic slide from right after About is home
  tl.fromTo(
    meEl,
    {
      x: () => Math.min(window.innerWidth * 0.7, 560),
      y: 10,
      scale: 0.9,
      rotate: 4,
      autoAlpha: 1,
      filter: "blur(10px)",
    },
    {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 2.5,
      ease: "power3.out",
      immediateRender: false,
      force3D: true,
    },
    ">"
  );

  tl.to(
    paraEl,
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "sine.out",
    },
    "-=0.35"
  );

  tl.to(glassEl, { opacity: 0.4, duration: 1.5, ease: "none" }, ">");
  tl.to(
    titleWrap,
    {
      filter: "blur(6px)",
      scale: 1.02,
      opacity: 0.48,
      duration: 1.5,
      ease: "none",
    },
    "<"
  );
  tl.to(kickerEl, { opacity: 0.25, duration: 1, ease: "none" }, "<");

  tl.set(stackWrap, { opacity: 1 });

  // One after another — soft land into 3+2
  cardEls.forEach((card, i) => {
    const pose = settlePose(cards[i]);
    if (!pose) return;

    tl.set(card, {
      left: `${pose.left}%`,
      top: `${pose.top}%`,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      zIndex: pose.z,
    });

    tl.fromTo(
      card,
      {
        y: 120,
        x: i % 2 === 0 ? -12 : 12,
        xPercent: -50,
        yPercent: -50,
        rotation: pose.rotate + (i % 2 === 0 ? 5 : -5),
        scale: 0.94,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        xPercent: -50,
        yPercent: -50,
        rotation: pose.rotate,
        scale: 1,
        opacity: 1,
        duration: 1.15,
        ease: "none",
        immediateRender: false,
      },
      i === 0 ? ">" : "<+=0.16"
    );
  });

  tl.addLabel("about-end");

  return tl;
}

/** Soft exit before Wins — short, no dead scroll. */
export function appendAboutExit(tl, stage, position = ">") {
  if (!tl || !stage) return tl;

  const cardEls = gsap.utils.toArray(stage.querySelectorAll(".ab-card"));
  const glassEl = stage.querySelector(".ab-glass");
  const titleWrap = stage.querySelector(".ab-title-wrap");
  const kickerEl = stage.querySelector(".ab-kicker");
  const stackWrap = stage.querySelector(".ab-stack-wrap");

  tl.addLabel("about-exit", position);

  tl.to(
    cardEls,
    {
      y: -28,
      scale: 0.96,
      opacity: 0,
      duration: 1.2,
      stagger: 0.06,
      ease: "power1.inOut",
    },
    "about-exit"
  );

  tl.to(
    [stackWrap, titleWrap, kickerEl],
    { opacity: 0, duration: 0.9, ease: "sine.inOut" },
    "about-exit+=0.15"
  );

  tl.to(
    glassEl,
    { opacity: 0.65, duration: 1, ease: "sine.inOut" },
    "about-exit"
  );

  tl.addLabel("about-gone", "about-exit+=1.25");

  return tl;
}

function AboutCard({ card }) {
  const t = toneStyles(card.tone);

  return (
    <article
      className={`ab-card absolute flex h-[300px] w-[200px] flex-col overflow-hidden rounded-[1.75rem] will-change-transform sm:h-[330px] sm:w-[228px] md:h-[360px] md:w-[248px] md:rounded-[2rem] lg:h-[380px] lg:w-[260px] ${t.shell}`}
      style={{
        zIndex: card.z,
        left: `${card.left}%`,
        top: `${card.top}%`,
        boxShadow: t.shadow,
      }}
    >
      <div className="h-1.5 w-full shrink-0" style={{ background: t.stripe }} />

      <div className="relative flex min-h-0 flex-1 flex-col justify-between px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6 md:px-7 md:pb-8 md:pt-7">
        <span
          className={`pointer-events-none absolute -right-1 bottom-6 select-none font-display text-[4.5rem] font-bold leading-none opacity-90 md:bottom-8 md:text-[5.25rem] ${t.watermark}`}
          aria-hidden
        >
          {card.id}
        </span>

        <div className="relative z-[1]">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`font-body text-[10px] font-medium uppercase tracking-[0.28em] md:text-[11px] ${t.soft}`}
            >
              {card.eyebrow}
            </span>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold md:h-10 md:w-10 md:text-sm ${t.markBg}`}
            >
              {card.mark}
            </span>
          </div>

          <div
            className={`mt-3 flex gap-1 text-[11px] tracking-widest md:mt-3.5 md:text-xs ${t.star}`}
            aria-hidden
          >
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>

          <h3 className="mt-3 font-display text-[1.2rem] font-bold uppercase leading-[1.05] tracking-tight sm:text-[1.3rem] md:mt-3.5 md:text-[1.4rem]">
            {card.title}
          </h3>
          <p
            className={`mt-2.5 line-clamp-3 font-body text-[12.5px] leading-[1.5] md:mt-3 md:text-[13.5px] md:leading-relaxed ${t.muted}`}
          >
            {card.body}
          </p>
        </div>

        <div className="relative z-[1] mt-5 space-y-2.5 pb-1 md:mt-6">
          <p
            className={`inline-flex rounded-full border px-3 py-1 font-body text-[9px] font-medium uppercase tracking-[0.18em] md:text-[10px] ${t.vibe}`}
          >
            {card.vibe}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-1 font-body text-[10px] font-medium tracking-wide md:text-[11px] ${t.chip}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function AboutStage() {
  return (
    <section
      data-about-stage
      className="relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden bg-ink"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div
        className="lemon-glow pointer-events-none absolute left-1/2 top-[40%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lemon/12 blur-[140px]"
        aria-hidden
      />

      <div
        className="ab-glass pointer-events-none absolute inset-0 z-[5] bg-ink/20 backdrop-blur-[7px]"
        aria-hidden
      />

      <div className="ab-title-wrap relative z-[4] flex w-full max-w-5xl flex-col items-center px-6 text-center will-change-transform md:px-10">
        <p className="ab-kicker mb-5 font-body text-[10px] font-medium uppercase tracking-[0.38em] text-lemon md:text-xs">
          03 — about me
        </p>

        <h2 className="flex flex-wrap items-baseline justify-center gap-x-3 font-display text-[18vw] font-bold leading-[0.86] tracking-tight md:gap-x-5 md:text-[9vw] lg:text-[7.5rem]">
          <span className="ab-about inline-block text-paper will-change-transform">
            About
          </span>
          <span className="ab-me inline-block text-lemon will-change-transform">
            Me
          </span>
        </h2>

        <p className="ab-para mt-8 max-w-lg font-body text-sm leading-relaxed text-paper/65 md:mt-10 md:text-base">
          i&apos;m harsha — founder at editco media, cs kid at niat, and the one
          who turns messy ideas into products that feel inevitable. design that
          breathes. code that ships. ai that actually works.
        </p>
      </div>

      {/* Generous inset from nav, sides, and next section */}
      <div className="ab-stack-wrap pointer-events-none absolute inset-x-0 bottom-[12%] top-[16%] z-20 flex items-center justify-center px-6 sm:px-10 md:bottom-[14%] md:top-[14%] md:px-16 lg:px-24">
        <div className="relative h-full max-h-[560px] w-full max-w-[820px] md:max-h-[600px] md:max-w-[900px] lg:max-w-[940px]">
          {cards.map((card) => (
            <AboutCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Embedded: fills parent stack panel; parent owns scroll timeline. */
export function AboutSurface() {
  return (
    <div className="h-full w-full">
      <AboutStage />
    </div>
  );
}

/** Standalone fallback with its own pin (unused when stacked). */
export default function AboutSection() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      if (!wrap || !stage) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".ab-about, .ab-me, .ab-para, .ab-card, .ab-glass, .ab-kicker, .ab-stack-wrap",
          {
            clearProps: "all",
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "none",
          }
        );
        gsap.utils.toArray(".ab-card").forEach((card, i) => {
          applyCardPose(card, cards[i], { opacity: 1, scale: 1 });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        prepareAboutStage(stage);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=900%",
            pin: stage,
            scrub: 1.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        appendAboutSequence(tl, stage);

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
      id="about"
      className="relative z-[3]"
      style={{ height: "1000vh" }}
    >
      <div ref={stageRef} className="h-screen w-full">
        <AboutStage />
      </div>
    </div>
  );
}
