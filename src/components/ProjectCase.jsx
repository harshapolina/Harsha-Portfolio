"use client";

import Image from "next/image";
import { goHomeToSection } from "../lib/scrollToSection";

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

function MetaCell({ label, children }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-body text-[10px] uppercase tracking-[0.24em] text-paper/40">
        {label}
      </p>
      <div className="mt-2 font-body text-sm leading-relaxed text-paper/85 md:text-[15px]">
        {children}
      </div>
    </div>
  );
}

function CaseImage({ image, index }) {
  if (!image?.src) return null;

  return (
    <figure className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[16/9] w-full bg-[#1a1a1a] md:aspect-[21/9]">
        <Image
          src={image.src}
          alt={image.alt || `Project still ${index + 1}`}
          fill
          priority={index === 0}
          quality={92}
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      {image.caption ? (
        <figcaption className="border-t border-white/8 px-4 py-3 font-body text-[12px] leading-relaxed text-paper/55 md:px-5 md:text-[13px]">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function ProjectCase({ project }) {
  const eyebrow = [project.category, project.discipline]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="relative min-h-screen bg-ink text-paper">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-lemon/12 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[360px] w-[360px] rounded-full bg-lemon/6 blur-[120px]"
        aria-hidden
      />
      <GridBg />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <button
          type="button"
          onClick={() => goHomeToSection("work")}
          className="group flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-lemon"
        >
          <span
            className="inline-block transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          >
            ←
          </span>
          Work
        </button>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-lemon transition-opacity hover:opacity-70"
          >
            Visit live
            <span aria-hidden>↗</span>
          </a>
        ) : (
          <span className="font-body text-xs uppercase tracking-[0.2em] text-paper/30">
            Link soon
          </span>
        )}
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <section className="animate-rise pt-2 md:pt-6">
          <p className="font-body text-[10px] uppercase tracking-[0.32em] text-lemon md:text-xs">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-paper/65 md:text-base">
            {project.summary}
          </p>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <MetaCell label="Role">{project.role}</MetaCell>
          <MetaCell label="When">{project.period}</MetaCell>
          <MetaCell label="Org">{project.org}</MetaCell>
          <MetaCell label="Stack">
            <span className="text-paper/85">
              {project.stack.join(" · ")}
            </span>
          </MetaCell>
        </section>

        {(() => {
          const shots = (project.images || []).filter((image) => image?.src);
          if (!shots.length) return null;
          return (
            <section className="mt-14 flex w-full flex-col gap-5 md:mt-16 md:gap-6">
              {shots.map((image, i) => (
                <CaseImage
                  key={`${image.src}-${i}`}
                  image={image}
                  index={i}
                />
              ))}
            </section>
          );
        })()}

        {(project.problem || project.method) && (
          <section className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-2 md:gap-12 md:pt-14">
            {project.problem ? (
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-lemon">
                  The problem
                </p>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-paper/75 md:text-base">
                  {project.problem}
                </p>
              </div>
            ) : null}
            {project.method ? (
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-lemon">
                  How we built it
                </p>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-paper/75 md:text-base">
                  {project.method}
                </p>
              </div>
            ) : null}
          </section>
        )}

        <section className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-12 md:gap-10 md:pt-14">
          <div className="md:col-span-4">
            <p className="font-body text-[10px] uppercase tracking-[0.28em] text-lemon">
              Stack
            </p>
            <p className="mt-1 font-display text-sm font-bold tabular-nums text-paper/30">
              01
            </p>
            {project.stackNotes?.length ? (
              <ul className="mt-5 space-y-5">
                {project.stackNotes.map((item) => (
                  <li key={item.name}>
                    <p className="font-display text-[15px] font-bold text-paper">
                      {item.name}
                    </p>
                    <p className="mt-1.5 font-body text-[13px] leading-relaxed text-paper/55">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-5 space-y-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-body text-[15px] text-paper/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:col-span-8">
            <p className="font-body text-[10px] uppercase tracking-[0.28em] text-lemon">
              What shipped
            </p>
            <p className="mt-1 font-display text-sm font-bold tabular-nums text-paper/30">
              02
            </p>
            <ul className="mt-5 space-y-4">
              {project.shipped.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[15px] leading-relaxed text-paper/80"
                >
                  <span
                    className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 bg-lemon"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 border-t border-white/10 pt-12 md:mt-16 md:pt-14">
          <p className="font-body text-[10px] uppercase tracking-[0.28em] text-lemon">
            Outcome
          </p>
          <p className="mt-1 font-display text-sm font-bold tabular-nums text-paper/30">
            03
          </p>
          <p className="mt-5 max-w-3xl font-display text-xl font-bold leading-snug tracking-tight text-paper md:text-2xl">
            {project.outcome}
          </p>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <button
            type="button"
            onClick={() => goHomeToSection("work")}
            className="font-body text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-lemon"
          >
            ← All projects
          </button>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-lemon px-5 py-2.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-85"
            >
              Visit live ↗
            </a>
          ) : null}
        </div>
      </div>
    </main>
  );
}
