export function RelaxBreathe() {
  return (
    <section className="section bg-[var(--color-sand-100)]">
      <div className="container-page">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-500)] text-white p-10 lg:p-16 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-sand-300)]">
              While you treat
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold text-white">
              Just relax and breathe.
            </h2>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              Most of our patients are surprised by how comfortable a session
              is. Our chambers are roomy enough to read, stream a movie on the
              built-in viewing screen, or simply rest. Our team checks on you
              throughout — and your time is your time.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-white/90 text-sm">
              {[
                "Read, stream, or nap",
                "Two-way intercom with staff",
                "Climate-controlled chamber",
                "Trained technician on every session",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
