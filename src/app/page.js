"use client";

import TextPressure from "../components/TextPressure";
import ExperienceStack from "../components/ExperienceStack";
import WikSection from "../components/WikSection";
import { AboutSurface } from "../components/AboutSection";
import { AchievementsSurface } from "../components/AchievementsSection";
import BrandFooter from "../components/BrandFooter";
import { profile } from "../data/profile";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#wik", label: "W'IK?" },
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Wins" },
  { href: "#contact", label: "Contact" },
];

function GridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <main className="bg-ink text-paper">
      <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-[0.2em] text-paper transition-colors hover:text-lemon"
        >
          HARSHA
        </a>
        <div className="hidden items-center gap-5 font-body text-xs uppercase tracking-[0.18em] text-paper/70 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-lemon"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="border border-lemon/60 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-lemon transition-colors hover:bg-lemon hover:text-ink"
        >
          Contact
        </a>
      </nav>

      {/* Sticky hero only lives inside this wrapper — stops before footer */}
      <div className="relative bg-ink">
        <section
          id="top"
          className="stack-panel sticky top-0 z-[1] flex min-h-screen flex-col justify-center overflow-hidden bg-ink"
        >
          <div
            className="lemon-glow pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lemon/25 blur-[120px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-lemon/10 blur-[100px]"
            aria-hidden
          />
          <GridBg />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="relative h-[180px] w-full sm:h-[240px] md:h-[300px] lg:h-[340px]">
              <TextPressure
                text="Harsha"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#fff44f"
                minFontSize={36}
              />
            </div>
            <p className="mt-8 max-w-2xl font-body text-sm text-paper/50 md:text-base">
              {profile.role}
            </p>
          </div>
        </section>

        <ExperienceStack
          about={<AboutSurface />}
          wins={<AchievementsSurface />}
        >
          <WikSection />
        </ExperienceStack>
      </div>

      <BrandFooter />
    </main>
  );
}
