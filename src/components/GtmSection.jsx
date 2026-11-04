"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { gtm } from "../data/gtm";
import { scrollToSection } from "../lib/scrollToSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function setIndexEl(el, n) {
  if (!el) return;
  el.textContent = String(n).padStart(2, "0");
}

function DetailModal({ service, index, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
      data-testid="gtm-modal"
    >
      <button
        type="button"
        aria-label="Close details"
        data-testid="gtm-modal-backdrop"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-ink/80 backdrop-blur-[6px]"
      />
      <article
        onClick={(e) => e.stopPropagation()}
        className="animate-contactIn relative z-[1] max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-[1.5rem] bg-paper p-6 text-ink shadow-[0_40px_120px_rgba(0,0,0,0.6)] ring-1 ring-ink/10 md:rounded-[2rem] md:p-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-ink px-2.5 py-1 font-display text-[10px] font-bold tracking-wide text-lemon">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-[9px] uppercase tracking-[0.24em] text-ink/45">
              {service.phase}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close details"
            data-testid="gtm-modal-close"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/15 text-lg leading-none text-ink/60 transition-colors duration-300 hover:bg-ink hover:text-lemon"
          >
            ×
          </button>
        </div>

        <h3 className="mt-5 font-display text-[1.6rem] font-bold leading-tight tracking-tight md:text-[1.9rem]">
          {service.title}
        </h3>
        <div className="mt-3 h-1.5 w-10 bg-lemon" aria-hidden />
        <p className="mt-4 font-body text-sm leading-relaxed text-ink/60">
          {service.blurb}
        </p>

        <p className="mt-6 font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/40">
          What you get
        </p>
        <ul className="mt-3 space-y-2.5">
          {service.delivers.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-lemon"
                aria-hidden
              />
              <span className="font-body text-[13px] leading-relaxed text-ink/75">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
          <p className="font-body text-[9px] uppercase tracking-[0.24em] text-ink/40">
            Run via Editco Media
          </p>
          <a
            href="#contact"
            data-testid="gtm-modal-contact"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.history.replaceState(null, "", "#contact");
              scrollToSection("contact", { behavior: "smooth" });
            }}
            className="inline-flex cursor-pointer items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-60"
          >
            Let&apos;s talk
            <span aria-hidden>→</span>
          </a>
        </div>
      </article>
    </div>
  );
}

export default function GtmSection() {
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(null);
  const progressRef = useRef(null);
  const [open, setOpen] = useState(null);

  const { services, note } = gtm;
  const total = services.length;

  useGSAP(
    () => {
      const pin = pinRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!pin || !viewport || !track) return;

      const cards = gsap.utils.toArray(track.children);
      if (!cards.length) return;

      const ghostSetters = cards.map((card) => {
        const ghost = card.querySelector(".gtm-ghost");
        return ghost ? gsap.quickSetter(ghost, "x", "px") : () => {};
      });

      const getMaxX = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      // Center the active card in the viewport (Emergent sandwich layout)
      const syncPad = () => {
        const cardW = cards[0]?.offsetWidth || 350;
        const pad = Math.max(24, (viewport.clientWidth - cardW) / 2);
        track.style.paddingLeft = `${pad}px`;
        track.style.paddingRight = `${pad}px`;
      };
      syncPad();
      window.addEventListener("resize", syncPad);

      let lastActive = -1;

      const syncUi = () => {
        const maxX = getMaxX();
        const x = parseFloat(gsap.getProperty(track, "x")) || 0;
        const progress = maxX
          ? gsap.utils.clamp(0, 1, -x / maxX)
          : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

        const index = Math.max(
          1,
          Math.min(total, Math.round(1 + progress * (total - 1)))
        );
        setIndexEl(indexRef.current, index);

        // Sandwich: big background numbers drift opposite to the rail
        const bounds = viewport.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          ghostSetters[i]((rect.left + rect.width / 2 - center) * 0.12);
        });

        const active = Math.max(
          0,
          Math.min(total - 1, Math.round(progress * (total - 1)))
        );
        if (active !== lastActive) {
          lastActive = active;
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: i === active ? 1 : 0.45,
              scale: i === active ? 1 : 0.94,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
            card.classList.toggle("is-active", i === active);
          });
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        viewport.style.overflowX = "auto";
        viewport.style.scrollSnapType = "x mandatory";
        cards.forEach((card) => {
          card.style.scrollSnapAlign = "center";
        });
        setIndexEl(indexRef.current, 1);
        if (progressRef.current) {
          progressRef.current.style.transform = "scaleX(1)";
        }
        return () => {
          viewport.style.overflowX = "";
          viewport.style.scrollSnapType = "";
          cards.forEach((card) => {
            card.style.scrollSnapAlign = "";
          });
        };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            opacity: i === 0 ? 1 : 0.45,
            scale: i === 0 ? 1 : 0.94,
            force3D: true,
          });
        });
        lastActive = 0;
        cards[0].classList.add("is-active");

        // Hold → glide all 8 cards → hold. Contact only after 08 finishes.
        // Slightly slower than Emergent so every card (07/08) is readable.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: syncUi,
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () =>
              `+=${Math.round(getMaxX() * 1.85 + window.innerHeight * 1.35)}`,
            pin: true,
            scrub: 0.95,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.55 });
        tl.to(
          track,
          {
            x: () => -getMaxX(),
            duration: 1,
          },
          ">"
        );
        tl.to({}, { duration: 0.55 }, ">");

        requestAnimationFrame(() => syncUi());
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => {
        window.removeEventListener("resize", syncPad);
        mm.revert();
      };
    },
    { scope: pinRef, dependencies: [total] }
  );

  return (
    <>
      <section
        id="gtm"
        data-testid="gtm-section"
        className="relative z-[18] scroll-mt-24 bg-ink text-paper"
      >
        <div ref={pinRef} className="relative h-screen">
          <div className="relative h-full overflow-hidden bg-ink">
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
              className="lemon-glow pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-lemon/10 blur-[120px]"
              aria-hidden
            />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-6 pt-20 md:px-10 md:pb-8 md:pt-24">
              <header className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="inline-flex bg-lemon px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
                    {gtm.badge}
                  </span>
                  <h2 className="mt-6 font-display text-[clamp(2.35rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
                    {gtm.headlineLead}
                    <br />
                    <span className="bg-lemon px-2 text-ink md:px-2.5">
                      {gtm.headlineAccent}
                    </span>
                    <span className="text-paper/90">{gtm.headlineTrail}</span>
                  </h2>
                  <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-paper/50 md:text-[15px]">
                    {gtm.blurb}
                  </p>
                </div>

                <div className="w-44 shrink-0">
                  <div className="flex items-baseline justify-between font-display text-xs tabular-nums text-paper/40">
                    <span
                      ref={indexRef}
                      data-testid="gtm-index"
                      className="text-lg font-bold text-lemon"
                    >
                      01
                    </span>
                    <span>/ {String(total).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-2 h-px overflow-hidden bg-paper/15">
                    <div
                      ref={progressRef}
                      data-testid="gtm-progress"
                      className="h-full w-full origin-left bg-lemon"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                  <p className="mt-2.5 font-body text-[9px] uppercase tracking-[0.24em] text-paper/35">
                    Scroll — cards glide sideways
                  </p>
                </div>
              </header>

              <div
                ref={viewportRef}
                className="mt-8 flex min-h-0 flex-1 items-center overflow-hidden md:mt-9"
              >
                <div
                  ref={trackRef}
                  data-testid="gtm-track"
                  className="flex h-full max-h-[420px] min-h-[260px] w-max items-stretch gap-4 will-change-transform md:gap-5"
                >
                  {services.map((service, i) => {
                    const isLast = i === total - 1;
                    return (
                      <article
                        key={service.title}
                        data-testid="gtm-service-item"
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        aria-label={`${service.title} — see what you get`}
                        onClick={() => setOpen(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setOpen(i);
                          }
                        }}
                        className={`gtm-card group relative flex h-full w-[264px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left outline-none transition-[border-color,box-shadow] duration-300 focus-visible:border-lemon sm:w-[300px] md:w-[320px] md:p-6 lg:w-[350px] ${
                          isLast
                            ? "border-transparent bg-lemon text-ink shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_22px_60px_rgba(255,244,79,0.28)]"
                            : "border-ink/[0.08] bg-paper text-ink shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:border-lemon/60"
                        }`}
                      >
                        <span
                          className={`gtm-ghost pointer-events-none absolute -bottom-2 -right-1 select-none font-display text-[5rem] font-bold leading-none transition-colors duration-300 group-hover:opacity-100 md:text-[6rem] ${
                            isLast ? "text-ink/[0.08]" : "text-ink/[0.06]"
                          }`}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="relative z-[1] flex items-center justify-between">
                          <span className="rounded-full bg-ink px-2.5 py-1 font-display text-[10px] font-bold tracking-wide text-lemon">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="font-body text-[9px] uppercase tracking-[0.24em] text-ink/45">
                            {service.phase}
                          </p>
                        </div>

                        <div className="relative z-[1]">
                          <h3 className="font-display text-[1.15rem] font-bold leading-tight tracking-tight text-ink md:text-[1.25rem]">
                            {service.title}
                          </h3>
                          <p className="mt-2 font-body text-[12.5px] leading-relaxed text-ink/60 md:text-[13px]">
                            {service.blurb}
                          </p>
                          <p className="mt-3 font-body text-[9px] uppercase tracking-[0.24em] text-ink/35 transition-colors duration-300 group-hover:text-ink/60">
                            Click for details →
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-lemon/40 pt-5 md:mt-8 md:pt-6">
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-paper/40">
                  {note}
                </p>
                <a
                  href="#contact"
                  data-testid="gtm-contact-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.replaceState(null, "", "#contact");
                    scrollToSection("contact", { behavior: "smooth" });
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-lemon transition-colors hover:text-paper md:text-xs"
                >
                  Let&apos;s talk
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open !== null && services[open] ? (
        <DetailModal
          service={services[open]}
          index={open}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
