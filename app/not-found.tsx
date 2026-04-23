import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 hero-grid" />
      <div className="container-page relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <div className="mono text-accent">404 · Not found</div>
        <h1 className="mt-4 font-display text-[48px] font-semibold tracking-tight text-white md:text-[72px]">
          This capability doesn't exist yet.
        </h1>
        <p className="mt-4 max-w-md text-[14px] text-white/60">
          The page you tried to open isn't part of the BDN platform. Head back to the ecosystem, or
          browse active problems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-accent">Back to home</Link>
          <Link href="/problems" className="btn-ghost">Browse problems</Link>
        </div>
      </div>
    </section>
  );
}
