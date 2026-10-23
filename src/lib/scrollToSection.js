import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORAGE_KEY = "hp-scroll-to";

/** Scroll past GSAP pin scrubbers to a real page section (press, contact, etc). */
export function scrollToSection(id, { behavior = "smooth", offset = 72 } = {}) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return false;

  ScrollTrigger.refresh();
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });

  window.setTimeout(() => {
    ScrollTrigger.refresh();
    const again = el.getBoundingClientRect().top + window.pageYOffset - offset;
    if (Math.abs(again - window.pageYOffset) > 40) {
      window.scrollTo({ top: Math.max(0, again), behavior: "auto" });
    }
  }, behavior === "smooth" ? 560 : 120);

  return true;
}

/** Hard-return to home and land on a section (avoids blank /#press client nav). */
export function goHomeToSection(id) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  window.location.assign(`/?to=${encodeURIComponent(id)}`);
}

export function consumeHomeScrollTarget() {
  if (typeof window === "undefined") return null;

  let stored = null;
  try {
    stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("to");
  const fromHash = window.location.hash?.replace("#", "") || null;

  return stored || fromQuery || fromHash || null;
}

/** Retry scroll until the section exists and GSAP pin heights settle. */
export function scrollHomeTargetWhenReady(id, { attempts = [150, 450, 900, 1600] } = {}) {
  if (!id || typeof window === "undefined") return () => {};

  const timers = attempts.map((ms) =>
    window.setTimeout(() => {
      scrollToSection(id, { behavior: "auto" });
      if (window.location.search.includes("to=")) {
        window.history.replaceState(null, "", `/${id === "top" ? "" : `#${id}`}`);
      }
    }, ms)
  );

  return () => timers.forEach((t) => window.clearTimeout(t));
}
