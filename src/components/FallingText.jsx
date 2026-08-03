"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Matter from "matter-js";
import "./FallingText.css";

/**
 * React Bits FallingText — pill cards that fall, settle, and stay draggable.
 * Wheel scroll is preserved (Matter mousewheel listeners removed).
 */
const FallingText = ({
  className = "",
  text = "",
  items = null,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 0.56,
  mouseConstraintStiffness = 0.35,
  fontSize = "1rem",
  asCards = false,
  active = undefined,
  floorInset = 96,
  leftInset = 0,
  rightInset = 24,
  interactive = true,
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const rafRef = useRef(0);
  const [effectStarted, setEffectStarted] = useState(false);

  const useItems = Array.isArray(items) && items.length > 0;
  const cardMode = asCards || useItems;

  useEffect(() => {
    if (!textRef.current) return;

    if (useItems) {
      textRef.current.innerHTML = items
        .map((item) => {
          const tone = item.tone || "paper";
          const icon = item.icon
            ? `<span class="word-mark word-mark--icon">${item.icon}</span>`
            : `<span class="word-mark">${item.mark || item.label.slice(0, 1)}</span>`;
          return `<span class="word word--${tone}" data-label="${item.label}">${icon}<span class="word-label">${item.label}</span></span>`;
        })
        .join("");
      return;
    }

    const words = text.split(" ").filter(Boolean);
    textRef.current.innerHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
  }, [text, items, useItems, highlightWords, highlightClass]);

  useEffect(() => {
    if (typeof active === "boolean") {
      if (active) setEffectStarted(true);
      return;
    }

    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, active]);

  const startFromInteraction = useCallback(() => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  }, [effectStarted, trigger]);

  useEffect(() => {
    if (!effectStarted) return;
    if (!containerRef.current || !textRef.current || !canvasContainerRef.current)
      return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create({
      enableSleeping: true,
    });
    engine.world.gravity.y = gravity;
    engine.timing.timeScale = 0.9;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
      friction: 0.75,
      restitution: 0.1,
    };

    const floorY = height - floorInset;
    const playLeft = leftInset;
    const playRight = width - rightInset;
    const playWidth = Math.max(160, playRight - playLeft);
    const playCenterX = playLeft + playWidth / 2;

    const floor = Bodies.rectangle(
      playCenterX,
      floorY + 28,
      playWidth + 60,
      56,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      playLeft - 28,
      height / 2,
      56,
      height + 160,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      playRight + 28,
      height / 2,
      56,
      height + 160,
      boundaryOptions
    );

    const wordSpans = textRef.current.querySelectorAll(".word");
    const count = wordSpans.length;

    const wordBodies = [...wordSpans].map((elem, index) => {
      const rect = elem.getBoundingClientRect();
      const t = count <= 1 ? 0.5 : index / (count - 1);
      const spawnX =
        playLeft +
        playWidth * (0.28 + Math.random() * 0.44) +
        Math.sin(t * Math.PI * 3) * 12;
      const spawnY = -36 - index * 26 - Math.random() * 16;

      const body = Bodies.rectangle(spawnX, spawnY, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.3,
        frictionAir: 0.02,
        friction: 0.26,
        density: 0.0015,
        chamfer: { radius: Math.min(rect.height / 2, 20) },
        angle: ((Math.random() - 0.5) * Math.PI) / 5,
        sleepThreshold: 22,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.2,
        y: 1 + Math.random() * 1.5,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.zIndex = "2";
      elem.style.pointerEvents = "none";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
    });

    const worldBodies = [
      floor,
      leftWall,
      rightWall,
      ...wordBodies.map((wb) => wb.body),
    ];

    let mouseConstraint = null;
    if (interactive) {
      const mouse = Mouse.create(containerRef.current);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          damping: 0.18,
          render: { visible: false },
        },
      });
      render.mouse = mouse;

      // Keep page scroll working over the pile
      try {
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        mouse.element.removeEventListener("wheel", mouse.mousewheel);
      } catch {
        /* ignore */
      }

      // Cursor feedback while dragging
      Events.on(mouseConstraint, "startdrag", () => {
        containerRef.current?.classList.add("is-dragging");
      });
      Events.on(mouseConstraint, "enddrag", () => {
        containerRef.current?.classList.remove("is-dragging");
      });

      worldBodies.push(mouseConstraint);
    }

    World.add(engine.world, worldBodies);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Soft readable tilt — stay dynamic so cards can still be dragged
    const settleTimer = window.setTimeout(() => {
      wordBodies.forEach(({ body }) => {
        let a = body.angle % (Math.PI * 2);
        if (a > Math.PI) a -= Math.PI * 2;
        if (a < -Math.PI) a += Math.PI * 2;

        let target = a;
        if (Math.abs(a) > Math.PI / 2) {
          target = a > 0 ? a - Math.PI : a + Math.PI;
        }
        target = Math.max(-0.36, Math.min(0.36, target));
        if (Math.abs(target) < 0.05) {
          target = (Math.random() - 0.5) * 0.3;
        }

        Matter.Body.setAngle(body, target);
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Sleeping.set(body, false);
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 0.35,
          y: -0.2,
        });
      });
    }, 1400);

    const sync = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(sync);
    };
    rafRef.current = requestAnimationFrame(sync);

    return () => {
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(rafRef.current);
      if (mouseConstraint) {
        Events.off(mouseConstraint, "startdrag");
        Events.off(mouseConstraint, "enddrag");
      }
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas?.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    floorInset,
    leftInset,
    rightInset,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className} ${
        interactive ? "is-interactive" : "is-passive"
      }`}
      onClick={
        interactive && trigger === "click" ? startFromInteraction : undefined
      }
      onMouseEnter={
        interactive && trigger === "hover" ? startFromInteraction : undefined
      }
      style={{
        position: "relative",
        overflow: "hidden",
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <div
        ref={textRef}
        className={`falling-text-target ${cardMode ? "as-cards" : ""} ${
          effectStarted ? "is-falling" : ""
        }`}
        style={
          cardMode
            ? undefined
            : {
                fontSize,
                lineHeight: 1.4,
              }
        }
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
