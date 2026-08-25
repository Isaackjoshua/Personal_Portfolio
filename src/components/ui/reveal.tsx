"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds. Stagger sibling reveals with 0.06–0.1 steps. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * `useReducedMotion()` resolves to false during SSR and to the real preference
 * on the client, so anything it feeds into the rendered markup will mismatch on
 * hydration for anyone who prefers reduced motion. The `hidden` variant IS the
 * rendered markup — framer serialises it into the inline style attribute — so it
 * must stay constant. Only `transition`, which never reaches the server HTML,
 * may vary by preference.
 */
const offset = {
  bottom: { x: 0, y: 18 },
  left: { x: -18, y: 0 },
  right: { x: 18, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset[from], filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        // Reduced motion collapses the travel to an imperceptible snap rather
        // than changing what was rendered.
        duration: reduced ? 0.01 : 0.55,
        delay: reduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wrap a list to stagger its children. Children must be <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : stagger },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0.01 : 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
