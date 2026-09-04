"use client";

import { useState } from "react";

interface VideoEmbedProps {
  id: string;
  title: string;
  /** Optional caption shown under the player */
  caption?: string;
}

/**
 * Privacy-friendly, performance-friendly YouTube embed.
 * Renders only a thumbnail + play button until the user clicks, then swaps in
 * the youtube-nocookie iframe — so no YouTube scripts load on initial render.
 */
export function VideoEmbed({ id, title, caption }: VideoEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-surface-border)] bg-black">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/*
              alt="" is deliberate, not an oversight. The thumbnail is
              decorative: the button around it already carries
              aria-label="Play video: {title}", which is what a screen reader
              announces. Giving the image its own alt would either be ignored
              (aria-label wins the name computation) or read the title twice.
              Automated scanners that flag "image without alt text" here are
              reporting a false positive — per WCAG H67, a decorative image
              inside a labelled control takes an empty alt.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="var(--color-accent)" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-[var(--color-ink-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
