"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  as: Tag = "div",
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return null;
    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const scroller =
        scrollContainerRef?.current != null
          ? scrollContainerRef.current
          : window;

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        }
      );

      const wordElements = el.querySelectorAll(".word");
      if (!wordElements.length) return;

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity, filter" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
        typeof children === "string" ? children : null,
      ],
    }
  );

  return (
    <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      {splitText ? (
        <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
      ) : (
        <div className={`scroll-reveal-text ${textClassName}`}>{children}</div>
      )}
    </Tag>
  );
}
