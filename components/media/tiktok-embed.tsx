"use client";

import { useState } from "react";

interface TikTokEmbedProps {
  id: string;
  label?: string;
}

/**
 * Portrait TikTok embed with a click-to-load facade.
 *
 * Facade matches the channel's actual thumbnail aesthetic:
 * white/off-white background with teal + dark serif typography —
 * exactly how @hyperbaricqueens thumbnails look on TikTok.
 * Loads the player iframe only on click.
 */
export function TikTokEmbed({ id, label }: TikTokEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <figure className="w-full">
      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border border-[var(--color-surface-border)]">
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
            className="group absolute inset-0 flex flex-col items-center justify-center text-center bg-[#f7f5f2]"
          >
            {/* Thumbnail text — mirrors the channel's actual teal/dark serif style */}
            {label ? (
              <div className="px-6 py-4 flex-1 flex items-center justify-center">
                <p
                  className="leading-tight"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)",
                    color: "#1a2424",
                    lineHeight: 1.15,
                  }}
                >
                  {label
                    .split(" ")
                    .reduce<{ teal: boolean; words: string[] }[]>((acc, word, i) => {
                      // Every other "word group" alternates teal — matches the brand style
                      // where accent words alternate with dark words
                      const isTeal = i % 3 === 1;
                      const last = acc[acc.length - 1];
                      if (last && last.teal === isTeal) {
                        last.words.push(word);
                      } else {
                        acc.push({ teal: isTeal, words: [word] });
                      }
                      return acc;
                    }, [])
                    .map((group, i) => (
                      <span
                        key={i}
                        style={{
                          color: group.teal ? "#7ab5b6" : "#1a2424",
                          display: "block",
                          fontSize: group.teal ? "1.6em" : "1em",
                          fontWeight: group.teal ? 700 : 600,
                          fontStyle: group.teal ? "normal" : "normal",
                        }}
                      >
                        {group.words.join(" ")}
                      </span>
                    ))}
                </p>
              </div>
            ) : null}

            {/* Play button */}
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a2424]/90 shadow-lg transition-transform group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="white" />
                </svg>
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-[#7ab5b6] font-semibold"
              >
                Watch on TikTok
              </span>
            </div>

            {/* Bottom brand watermark */}
            <div className="absolute bottom-0 inset-x-0 py-2 px-4 bg-gradient-to-t from-[#f7f5f2] to-transparent">
              <p
                className="text-center text-[#7ab5b6] opacity-60"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.05em",
                }}
              >
                Queens hyperbaric wellness
              </p>
            </div>
          </button>
        )}
      </div>
    </figure>
  );
}
