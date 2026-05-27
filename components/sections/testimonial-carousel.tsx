"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "@/lib/data/testimonials";
import { TestimonialCard } from "@/components/cards/testimonial-card";

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section bg-[var(--color-brand-700)] text-white">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-sand-300)]">
              Patient Stories
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold text-white">
              People healing in Queens
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10"
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="grow-0 shrink-0 basis-full md:basis-1/2 lg:basis-1/3 pr-4 text-[var(--color-ink)]"
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                selected === i ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
