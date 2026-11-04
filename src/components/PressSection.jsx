"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { bravePress } from "../data/press";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const outlets = [
  {
    name: "Deccan Chronicle",
    logo: "/press/logos/deccan-chronicle.png",
    href: "https://www.deccanchronicle.com/technology/in-other-news/niat-students-ai-construction-platform-wins-international-industry-trip-1971956",
    tone: "light",
  },
  {
    name: "City Air News",
    logo: "/press/logos/city-air-news.png",
    href: "https://www.cityairnews.com/content/ai-construction-platform-developed-by-niat-students-wins-heart-of-mivi-and-sids-farm-founders-wins-international-industry-trip-to-learn",
    tone: "light",
  },
  {
    name: "Construction World",
    logo: "/press/logos/construction-world.png",
    href: "https://www.constructionworld.in/latest-construction-news/real-estate-news/niat-students-develop-ai-platform-for-construction-sector/94641",
    tone: "light",
  },
  {
    name: "Financial Express",
    logo: "/press/logos/financial-express.png",
    href: "https://www.financialexpress.com/jobs-career/education-more-than-jobs-how-indias-gen-z-is-powering-the-next-wave-of-tech-innovation-3894638/",
    tone: "light",
  },
  {
    name: "DailyHunt",
    logo: "/press/logos/dailyhunt.png",
    href: "https://m.dailyhunt.in/news/india/english/buddhad5362415489870-epaper-dh31d3f0c246f548c6bb96d6fa2b081a50/-newsid-dh31d3f0c246f548c6bb96d6fa2b081a50_685a3ce7aab34fa0be74cfd63373cea3",
    tone: "dark",
  },
];

export default function PressSection() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        gsap.from("[data-press-reveal]", {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        });

        gsap.from("[data-press-frame]", {
          y: 40,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-press-frame]",
            start: "top 88%",
            once: true,
          },
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="press"
      className="relative z-[18] scroll-mt-24 overflow-hidden bg-ink text-paper"
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

      {/* Same content width as Experience / GTM / Contact */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <span
            data-press-reveal
            className="inline-flex bg-lemon px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-ink"
          >
            Featured in
          </span>

          <h2
            data-press-reveal
            className="mt-7 font-display text-[clamp(2.35rem,6.5vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight"
          >
            From stage to{" "}
            <span className="bg-lemon px-2 text-ink md:px-2.5">ink</span>
            <br />
            <span className="text-paper/90">and national feeds.</span>
          </h2>

          <p
            data-press-reveal
            className="mt-6 max-w-xl font-body text-sm leading-relaxed text-paper/50 md:text-[15px]"
          >
            Some of the products I&apos;ve built have been covered by leading
            publications across technology, business, and construction — after
            NIAT TakeOver 2026 put BuildTrack in the room.
          </p>

          <p
            data-press-reveal
            className="mt-5 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-lemon md:text-[11px]"
          >
            {outlets.length}+ publications · featured across technology,
            business &amp; industry media
          </p>
        </div>

        <div
          data-press-reveal
          className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:mt-12 md:gap-4 lg:grid-cols-5"
        >
          {outlets.map((outlet) => (
            <a
              key={outlet.name}
              href={outlet.href}
              target="_blank"
              rel="noopener noreferrer"
              title={outlet.name}
              className={`group flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl px-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,244,79,0.18)] md:h-16 md:rounded-2xl md:px-4 ${
                outlet.tone === "dark" ? "bg-[#1a1a1a]" : "bg-paper"
              }`}
            >
              <img
                src={outlet.logo}
                alt={outlet.name}
                className="max-h-[68%] max-w-[90%] object-contain"
                draggable={false}
              />
            </a>
          ))}
        </div>

        <div
          data-press-frame
          className="relative mt-10 w-full overflow-hidden rounded-sm border-[3px] border-lemon md:mt-14 md:border-4"
        >
          <div className="relative aspect-[16/9] w-full md:aspect-[2.05/1]">
            <img
              src="/press/takeover-award.jpg"
              alt="NIAT TakeOver 2026 — BuildTrack team receiving the award on stage"
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
              draggable={false}
            />
          </div>
        </div>

        <div
          data-press-reveal
          className="mt-8 flex w-full flex-wrap items-center justify-between gap-4 border-t border-lemon/40 pt-6"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.24em] text-paper/40">
            {bravePress.program}
            <span className="mx-2 text-lemon/70">·</span>
            {bravePress.product}
          </p>
          <Link
            href="/press"
            className="inline-flex cursor-pointer items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-paper md:text-xs"
          >
            Read every clipping
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
