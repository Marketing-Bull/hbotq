"use client";

import { useEffect, useRef, useState } from "react";

function useReveal<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function PulsingOxygenDiagram() {
  // Pre-compute the 28 plasma O2 positions so animation delays can be stable.
  const dots = Array.from({ length: 28 }).map((_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const r = 30 + (i % 3) * 18;
    const x = 100 + Math.cos(angle * 1.3 + i) * r;
    const y = 80 + Math.sin(angle * 1.7 + i) * (r * 0.7);
    const delay = (i % 6) * 0.25;
    return { x, y, delay };
  });

  return (
    <svg
      viewBox="0 0 520 280"
      role="img"
      aria-label="Oxygen carried in plasma vs hemoglobin at sea level vs treatment pressure"
      className="w-full h-auto"
    >
      <style>{`
        @keyframes plasmaPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.6); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot { animation: none !important; }
        }
        .pulse-dot {
          transform-origin: center;
          transform-box: fill-box;
          animation: plasmaPulse 2.6s ease-in-out infinite;
        }
      `}</style>

      {/* Left column — at sea level */}
      <g transform="translate(30,20)">
        <text x="0" y="0" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="2" fill="#7A4A2E">
          AT SEA LEVEL
        </text>
        <text x="0" y="22" fontFamily="Fraunces, serif" fontSize="22" fill="#1A2424">
          1.0 ATA
        </text>
        <g transform="translate(0,60)">
          <ellipse cx="100" cy="80" rx="100" ry="70" fill="none" stroke="#1A2424" strokeWidth="1.2" />
          {[[50,50],[110,40],[165,75],[70,105],[130,110],[40,85]].map(([x,y],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#C53030" opacity="0.85" />
              <circle cx={x-5} cy={y-4} r="2" fill="#fff" />
            </g>
          ))}
          {[[85,70],[140,90]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.2" fill="#0E5C5E" />
          ))}
        </g>
      </g>

      {/* Arrow */}
      <g transform="translate(240,140)">
        <line x1="0" y1="0" x2="28" y2="0" stroke="#1A2424" strokeWidth="1.5" />
        <path d="M22 -5 L30 0 L22 5" fill="none" stroke="#1A2424" strokeWidth="1.5" />
      </g>

      {/* Right column — at treatment pressure */}
      <g transform="translate(290,20)">
        <text x="0" y="0" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="2" fill="#7A4A2E">
          IN THE CHAMBER
        </text>
        <text x="0" y="22" fontFamily="Fraunces, serif" fontSize="22" fill="#1A2424">
          2.4 ATA
        </text>
        <g transform="translate(0,60)">
          <ellipse cx="100" cy="80" rx="100" ry="70" fill="none" stroke="#1A2424" strokeWidth="1.2" />
          {[[50,50],[110,40],[165,75],[70,105],[130,110],[40,85]].map(([x,y],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#C53030" opacity="0.85" />
              <circle cx={x-5} cy={y-4} r="2" fill="#fff" />
            </g>
          ))}
          {dots.map((d, i) => (
            <circle
              key={i}
              className="pulse-dot"
              cx={d.x}
              cy={d.y}
              r="2.2"
              fill="#0E5C5E"
              style={{ animationDelay: `${d.delay}s` }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

export function AnimatedHealingCurve() {
  const { ref, visible } = useReveal<SVGSVGElement>();
  // Approximate path lengths so the dash animation looks right without measuring.
  const hbotLen = 720;
  const stdLen = 620;

  return (
    <figure className="mt-12">
      <figcaption className="text-[10px] uppercase tracking-[0.22em] text-[#E8DDC7] mb-3">
        Fig. 3 · Wound closure trajectory · weeks 0–8
      </figcaption>
      <svg
        ref={ref}
        viewBox="0 0 600 200"
        role="img"
        aria-label="Wound closure curve over weeks of treatment"
        className="w-full h-auto"
      >
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="170" stroke="#E8DDC7" strokeWidth="1" />
        <line x1="40" y1="170" x2="580" y2="170" stroke="#E8DDC7" strokeWidth="1" />

        <text x="10" y="30" fontFamily="Inter" fontSize="9" fill="#E8DDC7">100%</text>
        <text x="10" y="173" fontFamily="Inter" fontSize="9" fill="#E8DDC7">0%</text>

        {[0,2,4,6,8].map((w,i)=>(
          <g key={w}>
            <line x1={40+i*135} y1="170" x2={40+i*135} y2="175" stroke="#E8DDC7" />
            <text x={40+i*135} y="190" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#E8DDC7">
              wk {w}
            </text>
          </g>
        ))}

        {/* HBOT curve */}
        <path
          d="M 40 160 Q 175 152, 310 100 T 580 30"
          fill="none"
          stroke="#F5EFE4"
          strokeWidth="3"
          strokeDasharray={hbotLen}
          strokeDashoffset={visible ? 0 : hbotLen}
          style={{ transition: "stroke-dashoffset 1800ms cubic-bezier(0.22, 0.61, 0.36, 1) 200ms" }}
        />
        <text
          x="500"
          y="48"
          fontFamily="Fraunces"
          fontSize="13"
          fill="#F5EFE4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 600ms ease 1400ms",
          }}
        >
          With HBOT
        </text>

        {/* Standard care curve */}
        <path
          d="M 40 160 Q 200 158, 360 145 T 580 130"
          fill="none"
          stroke="#E8DDC7"
          strokeWidth="2"
          strokeDasharray={`4 4, ${stdLen}`}
          strokeDashoffset={visible ? 0 : stdLen}
          style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(0.22, 0.61, 0.36, 1) 400ms" }}
        />
        <text
          x="475"
          y="142"
          fontFamily="Inter"
          fontSize="10"
          fill="#E8DDC7"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 600ms ease 1700ms" }}
        >
          Standard care
        </text>
      </svg>
      <p className="mt-3 text-xs text-[#E8DDC7]/70 leading-relaxed">
        Illustrative only · individual results vary based on wound type,
        comorbidities, and adherence to the full care plan.
      </p>
    </figure>
  );
}
