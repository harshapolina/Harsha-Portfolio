"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import "./TrueFocus.css";

const TrueFocus = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  /** Controlled focus index — when set, drives the frame (tray / parent) */
  activeIndex = null,
  /** How many consecutive words the frame should cover from activeIndex */
  focusSpan = 1,
  compact = false,
  className = "",
  wordClassName = "",
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const controlled = typeof activeIndex === "number";
  const focusStart = controlled ? activeIndex : currentIndex;

  useEffect(() => {
    if (controlled || manualMode) return;

    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000
    );

    return () => clearInterval(interval);
  }, [
    controlled,
    manualMode,
    animationDuration,
    pauseBetweenAnimations,
    words.length,
  ]);

  const updateRect = useCallback(() => {
    if (focusStart === null || focusStart === -1) return;
    if (!containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const span = Math.max(1, focusSpan);
    const start = Math.max(0, focusStart);
    const end = Math.min(words.length - 1, start + span - 1);

    const first = wordRefs.current[start];
    const last = wordRefs.current[end];
    if (!first || !last) return;

    const a = first.getBoundingClientRect();
    const b = last.getBoundingClientRect();
    const next = {
      x: a.left - parentRect.left,
      y: Math.min(a.top, b.top) - parentRect.top,
      width: b.right - a.left,
      height: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top),
    };

    setFocusRect((prev) =>
      prev.x === next.x &&
      prev.y === next.y &&
      prev.width === next.width &&
      prev.height === next.height
        ? prev
        : next
    );
  }, [focusStart, focusSpan, words.length]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    document.fonts?.ready?.then(updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect, sentence]);

  const handleMouseEnter = (index) => {
    if (controlled) return;
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (controlled) return;
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  const isWordActive = (index) => {
    if (focusStart === null || focusStart < 0) return false;
    const span = Math.max(1, focusSpan);
    return index >= focusStart && index < focusStart + span;
  };

  return (
    <div
      className={`focus-container${compact ? " compact" : ""} ${className}`.trim()}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = isWordActive(index);
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${
              isActive && !manualMode && !controlled ? "active" : ""
            } ${wordClassName}`.trim()}
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.35,
              color: isActive ? undefined : undefined,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: focusStart >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
