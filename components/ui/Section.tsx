import { cn } from "@/lib/cn";

export function Section({
  label,
  title,
  intro,
  cta,
  children,
  className,
  id,
}: {
  label?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  cta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="container-page">
        {(label || title || intro || cta) && (
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {label && <div className="section-label mb-3">{label}</div>}
              {title && (
                <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-[40px] md:leading-[1.1]">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-4 text-[15px] leading-relaxed text-white/60">{intro}</p>}
            </div>
            {cta && <div className="flex-shrink-0">{cta}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
