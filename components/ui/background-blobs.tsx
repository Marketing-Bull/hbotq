"use client";

/**
 * Background decorative blobs — pure CSS, no JS animation overhead.
 * Uses CSS @keyframes via inline style + Tailwind for positioning.
 * All aria-hidden so screen readers skip them entirely.
 */

export function BlobsHero() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Large teal orb — top left */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-brand-400) 0%, transparent 70%)",
          animation: "blob-drift-1 18s ease-in-out infinite",
        }}
      />
      {/* Accent coral orb — top right */}
      <div
        className="absolute -top-16 right-0 w-[420px] h-[420px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)",
          animation: "blob-drift-2 22s ease-in-out infinite",
        }}
      />
      {/* Small teal orb — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--color-brand-300) 0%, transparent 70%)",
          animation: "blob-drift-3 15s ease-in-out infinite",
        }}
      />
      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--color-brand-600) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

export function BlobsSection({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          opacity: isDark ? 0.12 : 0.08,
          background: `radial-gradient(circle, ${isDark ? "var(--color-brand-200)" : "var(--color-brand-500)"} 0%, transparent 70%)`,
          animation: "blob-drift-2 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -left-16 bottom-0 w-[280px] h-[280px] rounded-full"
        style={{
          opacity: isDark ? 0.10 : 0.06,
          background: `radial-gradient(circle, ${isDark ? "var(--color-accent)" : "var(--color-accent)"} 0%, transparent 70%)`,
          animation: "blob-drift-1 24s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function BlobsDark() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Rays from top-center */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[600px] opacity-10"
        style={{
          background:
            "conic-gradient(from 260deg at 50% 0%, transparent 0deg, var(--color-brand-300) 8deg, transparent 16deg, transparent 180deg, var(--color-brand-200) 188deg, transparent 196deg)",
        }}
      />
      {/* Bottom-left glow */}
      <div
        className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, var(--color-brand-400) 0%, transparent 65%)",
          animation: "blob-drift-3 19s ease-in-out infinite",
        }}
      />
      {/* Top-right accent */}
      <div
        className="absolute -top-12 right-0 w-[360px] h-[360px] rounded-full opacity-12"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
          animation: "blob-drift-1 26s ease-in-out infinite",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
