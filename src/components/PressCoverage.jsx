"use client";

import Link from "next/link";
import { bravePress } from "../data/press";

function GridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
      aria-hidden
    />
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PressCoverage() {
  const { program, product, headline, subline, stats, jury, clippings, coverage } =
    bravePress;

  return (
    <main className="relative min-h-screen bg-ink text-paper">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-lemon/15 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-lemon/8 blur-[120px]"
        aria-hidden
      />
      <GridBg />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link
          href="/#achievements"
          className="group flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-lemon"
        >
          <span
            className="inline-block transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          >
            ←
          </span>
          Portfolio
        </Link>
        <span className="font-display text-xs font-bold uppercase tracking-[0.28em] text-lemon/80">
          {program}
        </span>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <section className="animate-rise pt-4 md:pt-8">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-lemon md:text-xs">
            Press · Media · Coverage
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            {headline}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-paper/55 md:text-[15px]">
            {subline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-lemon/40 bg-lemon/10 px-4 py-1.5 font-display text-sm font-bold text-lemon">
              {product}
            </span>
            <span className="rounded-full border border-paper/15 px-4 py-1.5 font-body text-xs uppercase tracking-[0.16em] text-paper/50">
              NIAT TakeOver 2026
            </span>
          </div>
        </section>

        <section className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-paper/10 bg-paper/[0.03] px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-paper/40">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-lemon md:text-3xl">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.32em] text-paper/40">
                Print & E-Paper
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Newspaper clippings
              </h2>
            </div>
            <p className="hidden max-w-xs font-body text-xs leading-relaxed text-paper/40 md:block">
              Sakshi and national press — award stage, jury, and the BuildTrack
              story in print.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
            {clippings.map((clip) => (
              <figure
                key={clip.src}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-paper/10 bg-paper/[0.02] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-1 md:p-4"
              >
                <div className="relative h-[min(52vw,320px)] shrink-0 overflow-hidden rounded-xl bg-paper/5 sm:h-[360px] md:h-[400px]">
                  <img
                    src={clip.src}
                    alt={`${clip.outlet} newspaper clipping — ${clip.caption}`}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-4 flex min-h-[5.5rem] shrink-0 items-start justify-between gap-3 px-1">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-paper">
                      {clip.outlet}
                    </p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-paper/50">
                      {clip.caption}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-body text-[10px] uppercase tracking-[0.18em] text-paper/35">
                      {clip.locale}
                    </p>
                    <p className="mt-1 font-body text-[11px] text-paper/45">
                      {clip.date}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-8">
            <p className="font-body text-[10px] uppercase tracking-[0.32em] text-paper/40">
              Digital Coverage
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Read the full stories
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {coverage.map((item, i) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-[1.35rem] border border-paper/10 bg-paper/[0.03] p-5 transition-all duration-300 hover:border-lemon/35 hover:bg-lemon/[0.04] md:p-6"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-paper/15 px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.14em] text-paper/45 transition-colors group-hover:border-lemon/30 group-hover:text-lemon/80">
                    {item.type}
                  </span>
                  <span
                    className="text-paper/30 transition-all group-hover:text-lemon"
                    aria-hidden
                  >
                    <ExternalIcon />
                  </span>
                </div>
                <p className="mt-4 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-lemon/70">
                  {item.outlet}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-paper transition-colors group-hover:text-lemon md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-paper/50">
                  {item.excerpt}
                </p>
                <p className="mt-4 font-body text-[10px] uppercase tracking-[0.2em] text-paper/30">
                  {item.date}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[1.5rem] border border-paper/10 bg-gradient-to-br from-lemon/10 via-transparent to-transparent p-6 md:p-8">
          <p className="font-body text-[10px] uppercase tracking-[0.28em] text-paper/40">
            Jury & Recognition
          </p>
          <ul className="mt-4 space-y-2">
            {jury.map((name) => (
              <li
                key={name}
                className="font-display text-base font-semibold text-paper/85 md:text-lg"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-paper/50">
            Shark Tank–style pitch session at Kapil Kavuri Hub, Nanakramguda —
            150+ student teams, ₹2 Cr+ collective revenue in three months, and
            BuildTrack taking 1st place under BRAVE.
          </p>
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8">
          <Link
            href="/#achievements"
            className="inline-flex items-center gap-2 rounded-full border border-lemon/50 px-5 py-2.5 font-body text-xs uppercase tracking-[0.18em] text-lemon transition-colors hover:bg-lemon hover:text-ink"
          >
            Back to Wins
          </Link>
          <p className="font-body text-xs text-paper/35">
            BuildTrack · Editco Media · BRAVE 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
