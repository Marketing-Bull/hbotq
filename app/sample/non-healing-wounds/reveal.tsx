"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "scale" | "fade";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Reduced motion shows the content immediately (see `visible` below), so
    // there is nothing to observe.
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  const visible = prefersReducedMotion || inView;

  const transform = (() => {
    if (visible) return "translate3d(0,0,0) scale(1)";
    if (variant === "up") return "translate3d(0,18px,0) scale(1)";
    if (variant === "scale") return "translate3d(0,0,0) scale(0.97)";
    return "translate3d(0,0,0) scale(1)";
  })();

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform,
    transition: `opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
    willChange: visible ? undefined : "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
