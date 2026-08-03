"use client";

import { useState } from "react";
import { profile } from "../data/profile";
import TrueFocus from "./TrueFocus";

const PARTS = ["harsha", "polina", "1@gmail.com"];
const SENTENCE = PARTS.join("|");

const modes = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.contact.linkedin,
    focusIndex: 0,
    focusSpan: 2, // harshapolina
  },
  {
    id: "mail",
    label: "Email",
    href: `mailto:${profile.contact.email}`,
    focusIndex: 0,
    focusSpan: 3,
  },
  {
    id: "ig",
    label: "Instagram",
    href: profile.contact.instagram,
    focusIndex: 0,
    focusSpan: 1,
  },
];

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="currentColor" aria-hidden>
      <path d="M6.5 9H4V20h2.5V9ZM5.25 4a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM20 20h-2.5v-5.6c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V20H11V9h2.4v1.5h.03c.33-.63 1.15-1.7 2.85-1.7 3.05 0 3.62 2 3.62 4.62V20Z" />
    </svg>
  );
}

function IconMail({ active }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth={active ? 1.8 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconIg({ active }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

const icons = { linkedin: IconLinkedIn, mail: IconMail, ig: IconIg };

function openMode(mode) {
  if (!mode?.href) return;
  window.open(
    mode.href,
    mode.id === "mail" ? "_self" : "_blank",
    "noopener,noreferrer"
  );
}

export function ContactSurface() {
  const [active, setActive] = useState("mail");
  const mode = modes.find((m) => m.id === active) || modes[1];

  return (
    <section
      data-contact-stage
      className="relative w-full overflow-hidden bg-[#f4f2ee] px-6 py-14 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(255,244,79,0.14), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ink/35 md:text-xs">
          06 — contact
        </p>

        <button
          type="button"
          onClick={() => openMode(mode)}
          className="mt-8 flex max-w-full cursor-pointer flex-col items-center outline-none md:mt-10"
          aria-label={`Open ${mode.label}`}
        >
          <TrueFocus
            sentence={SENTENCE}
            separator="|"
            manualMode
            activeIndex={mode.focusIndex}
            focusSpan={mode.focusSpan}
            compact
            blurAmount={3.5}
            borderColor="#0a0a0a"
            glowColor="rgba(10, 10, 10, 0.25)"
            animationDuration={0.4}
            className="font-display text-ink"
            wordClassName="font-display"
          />
          <span className="mt-4 font-body text-[10px] tracking-[0.2em] text-ink/40 md:text-[11px]">
            {mode.label}
          </span>
        </button>

        <div
          className="mt-8 flex items-center justify-center gap-4 md:mt-10 md:gap-6"
          role="tablist"
          aria-label="Contact tray"
        >
          {modes.map((m) => {
            const Icon = icons[m.id];
            const isOn = active === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isOn}
                onMouseEnter={() => setActive(m.id)}
                onFocus={() => setActive(m.id)}
                onClick={() => setActive(m.id)}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 md:h-12 md:w-12 ${
                  isOn
                    ? "scale-105 bg-ink text-lemon shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
                    : "text-ink/30 hover:text-ink/55"
                }`}
                aria-label={`Show ${m.label}`}
              >
                <Icon active={isOn} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactSurface;
