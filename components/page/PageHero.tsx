export function PageHero({
  label,
  title,
  intro,
  stats,
}: {
  label: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  stats?: { label: string; value: string | number }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)]" />
      <div className="container-page relative z-10 py-16 md:py-24">
        <div className="mono mb-5 text-accent">{label}</div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-[56px] md:leading-[1.04] max-w-3xl text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/65">{intro}</p>
        {stats && (
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 max-w-3xl md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-4">
                <div className="font-display text-[22px] font-semibold text-white">{s.value}</div>
                <div className="mono mt-1 text-[9.5px]">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
