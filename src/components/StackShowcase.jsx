"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { stackCategories } from "../data/stack";

gsap.registerPlugin(useGSAP);

const tones = {
  ink: {
    card: "border-white/[0.08] bg-white/[0.04]",
    label: "text-lemon/90",
    title: "text-paper",
    body: "text-paper/45",
    badge: "border-white/10 text-paper/40",
    ghost: "text-white/[0.06]",
    chip: "border-white/10 bg-black/20 text-paper/90",
    chipIcon: "bg-white/[0.06]",
  },
  lemon: {
    card: "border-black/[0.08] bg-lemon text-ink",
    label: "text-ink/55",
    title: "text-ink",
    body: "text-ink/55",
    badge: "border-ink/15 text-ink/50",
    ghost: "text-ink/[0.07]",
    chip: "border-ink/12 bg-ink/[0.05] text-ink",
    chipIcon: "bg-ink/[0.06]",
  },
  ship: {
    card: "border-lemon/15 bg-white/[0.03]",
    label: "text-lemon/90",
    title: "text-paper",
    body: "text-paper/45",
    badge: "border-white/10 text-paper/40",
    ghost: "text-lemon/[0.08]",
    chip: "border-lemon/20 bg-lemon/[0.05] text-paper/90",
    chipIcon: "bg-lemon/[0.08]",
  },
};

function ToolChip({ label, icon, toneKey }) {
  const t = tones[toneKey];

  return (
    <div
      className={`flex h-10 items-center gap-2.5 rounded-xl border px-3 md:h-11 md:px-3.5 lg:h-12 lg:px-4 ${t.chip}`}
    >
      {icon ? (
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md md:h-6 md:w-6 ${t.chipIcon} [&_svg]:h-3.5 [&_svg]:w-3.5 md:[&_svg]:h-4 md:[&_svg]:w-4`}
          dangerouslySetInnerHTML={{ __html: icon }}
          aria-hidden
        />
      ) : null}
      <span className="min-w-0 truncate font-body text-[10px] font-medium md:text-[11px] lg:text-xs">
        {label}
      </span>
    </div>
  );
}

function PanelMeta({ category, toneKey, inline = false }) {
  const t = tones[toneKey];

  return (
    <div className={inline ? "shrink-0 md:w-[13rem] lg:w-[14rem]" : "pr-12"}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p
            className={`font-body text-[9px] font-medium uppercase tracking-[0.32em] ${t.label}`}
          >
            {category.label}
          </p>
          <h3
            className={`mt-0.5 font-display text-base font-bold tracking-tight md:text-[1.05rem] ${t.title}`}
          >
            {category.vibe}
          </h3>
        </div>
        {!inline ? (
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 font-body text-[8px] uppercase tracking-[0.2em] ${t.badge}`}
          >
            {String(category.items.length).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      {!inline ? (
        <p className={`mt-1 font-body text-[11px] leading-snug ${t.body}`}>
          {category.blurb}
        </p>
      ) : (
        <p className={`mt-1 font-body text-[11px] leading-snug ${t.body}`}>
          {category.blurb}
        </p>
      )}
    </div>
  );
}

function Panel({ category, toneKey, children, className = "", inline = false }) {
  const t = tones[toneKey];

  return (
    <article
      data-stack-card
      className={`relative overflow-hidden rounded-2xl border p-5 md:rounded-[1.35rem] md:p-6 lg:p-7 ${t.card} ${className}`}
    >
      <span
        className={`pointer-events-none absolute right-2 top-0 font-display text-[3rem] font-bold leading-none md:text-[3.5rem] ${t.ghost}`}
        aria-hidden
      >
        {category.index}
      </span>

      <div
        className={`relative z-[1] ${
          inline ? "flex flex-col gap-4 md:flex-row md:items-center md:gap-8 lg:gap-10" : ""
        }`}
      >
        <PanelMeta category={category} toneKey={toneKey} inline={inline} />
        <div className={inline ? "min-w-0 flex-1" : "mt-4"}>{children}</div>
      </div>
    </article>
  );
}

export default function StackShowcase() {
  const rootRef = useRef(null);
  const [build, design, ship] = stackCategories;
  const toolCount = stackCategories.reduce((n, c) => n + c.items.length, 0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray("[data-stack-card]");
      const header = rootRef.current?.querySelector("[data-stack-header]");

      gsap.set([header, ...cards], { opacity: 0, y: 16 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.to(header, { opacity: 1, y: 0, duration: 0.65 }).to(
        cards,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.35"
      );

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      if (rootRef.current) observer.observe(rootRef.current);
      return () => observer.disconnect();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      data-stack-showcase
      className="relative flex h-full w-full items-center overflow-hidden bg-ink text-paper"
      aria-labelledby="stack-showcase-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full px-8 py-[5.5rem] md:px-14 md:py-[6rem] lg:px-20 lg:py-[6.5rem] xl:px-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 md:gap-6 lg:gap-7">
          <header
            data-stack-header
            className="flex items-end justify-between gap-6 pb-1 md:pb-2"
          >
            <div className="min-w-0">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-lemon/90">
                02b — Toolkit
              </p>
              <h2
                id="stack-showcase-heading"
                className="mt-1 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-tight tracking-tight"
              >
                <span className="text-paper">Everything </span>
                <span className="text-lemon">I ship</span>
                <span className="text-paper"> with.</span>
              </h2>
            </div>
            <div className="shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-center md:px-5 md:py-3">
              <p className="font-display text-lg font-bold tabular-nums text-lemon md:text-xl">
                {toolCount}
              </p>
              <p className="font-body text-[8px] uppercase tracking-[0.26em] text-paper/35">
                tools
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
            {build ? (
              <Panel
                category={build}
                toneKey="ink"
                className="h-full md:col-span-7"
              >
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:gap-3.5">
                  {build.items.map((item) => (
                    <ToolChip
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      toneKey="ink"
                    />
                  ))}
                </div>
              </Panel>
            ) : null}

            {design ? (
              <Panel
                category={design}
                toneKey="lemon"
                className="h-full md:col-span-5"
              >
                <div className="grid grid-cols-2 gap-2.5 md:gap-3 lg:gap-3.5">
                  {design.items.map((item) => (
                    <ToolChip
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      toneKey="lemon"
                    />
                  ))}
                </div>
              </Panel>
            ) : null}
          </div>

          {ship ? (
            <Panel category={ship} toneKey="ship" inline>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6 md:gap-3 lg:gap-3.5">
                {ship.items.map((item) => (
                  <ToolChip
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    toneKey="ship"
                  />
                ))}
              </div>
            </Panel>
          ) : null}
        </div>
      </div>
    </section>
  );
}
