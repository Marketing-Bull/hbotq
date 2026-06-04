"use client";

import { useState } from "react";

interface TikTokEmbedProps {
  id: string;
  label?: string;
}

/**
 * Portrait TikTok embed with a click-to-load facade.
 * Shows a branded play card until clicked, then loads TikTok's player iframe —
 * so no TikTok scripts run on initial render.
 */
export function TikTokEmbed({ id, label }: TikTokEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <figure className="w-full">
      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-brand-800)]">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&description=0&music_info=0`}
            title={label ?? "TikTok video"}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play TikTok video${label ? `: ${label}` : ""}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
          >
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, var(--color-brand-500) 0, transparent 55%), radial-gradient(circle at 75% 80%, var(--color-accent) 0, transparent 50%)",
                opacity: 0.55,
              }}
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="var(--color-accent)" />
              </svg>
            </span>
            {label ? (
              <span className="relative px-5 text-sm font-semibold text-white">
                {label}
              </span>
            ) : null}
            <span className="relative text-[11px] uppercase tracking-[0.18em] text-white/70">
              Watch on TikTok
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
