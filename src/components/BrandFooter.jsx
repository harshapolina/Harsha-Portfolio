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

function IconLinkedIn({ active }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6.5 9H4V20h2.5V9ZM5.25 4a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM20 20h-2.5v-5.6c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V20H11V9h2.4v1.5h.03c.33-.63 1.15-1.7 2.85-1.7 3.05 0 3.62 2 3.62 4.62V20Z" />
    </svg>
  );
}

function IconMail({ active }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.2"
        stroke="currentColor"
        strokeWidth={active ? 1.8 : 1.4}
      />
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth={active ? 1.8 : 1.4}
      />
      <circle
        cx="12"
        cy="12"
        r="3.6"
        stroke="currentColor"
        strokeWidth={active ? 1.8 : 1.4}
      />
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

function ContactStrip() {
  const [active, setActive] = useState("mail");
  const mode = modes.find((m) => m.id === active) || modes[1];

  return (
    <div className="flex flex-col items-center px-5 pb-6 pt-8 md:px-10 md:pb-7 md:pt-10">
      <p className="font-body text-[9px] uppercase tracking-[0.32em] text-ink/40 md:text-[10px]">
        Contact
      </p>

      <button
        type="button"
        onClick={() => openMode(mode)}
        className="mt-3 flex max-w-full cursor-pointer flex-col items-center outline-none"
        aria-label={`Open ${mode.label}`}
      >
        <TrueFocus
          sentence={SENTENCE}
          separator="|"
          manualMode
          activeIndex={mode.focusIndex}
          focusSpan={mode.focusSpan}
          compact
          blurAmount={3}
          borderColor="#0a0a0a"
          glowColor="rgba(10, 10, 10, 0.15)"
          animationDuration={0.35}
          className="font-display text-ink"
          wordClassName="font-display"
        />
        <span className="mt-2 font-body text-[9px] tracking-[0.2em] text-ink/40">
          {mode.label}
        </span>
      </button>

      <div
        className="mt-4 flex items-center justify-center gap-2.5"
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
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 md:h-10 md:w-10 ${
                isOn
                  ? "scale-105 bg-ink text-lemon shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                  : "text-ink/35 hover:text-ink/60"
              }`}
              aria-label={`Show ${m.label}`}
            >
              <Icon active={isOn} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BrandFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative z-[20] isolate bg-ink px-3 pb-3 pt-4 md:px-5 md:pb-4 md:pt-6"
    >
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[1.5rem] bg-lemon text-ink md:rounded-[2.25rem]">
        <ContactStrip />

        <div className="mx-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-ink/10 px-1 py-3.5 md:mx-10 lg:mx-14">
          <div className="flex items-center gap-4 font-body text-[10px] font-semibold uppercase tracking-[0.18em]">
            <a
              href="#achievements"
              className="transition-opacity hover:opacity-55"
            >
              Wins
            </a>
          </div>

          <div className="flex items-center gap-3 font-body text-[9px] uppercase tracking-[0.16em] text-ink/55">
            <span>© {year}</span>
            <span className="text-ink/75">Editco Media</span>
            <a href="#top" className="transition-opacity hover:opacity-70">
              Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
