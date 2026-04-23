export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatINR(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n % 1e7 === 0 ? 0 : 2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n % 1e5 === 0 ? 0 : 2)} L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
  return `₹${n}`;
}

export function formatUSD(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
}

export function formatRelative(isoOrDaysAgo: string | number): string {
  if (typeof isoOrDaysAgo === "number") {
    if (isoOrDaysAgo < 1) return "today";
    if (isoOrDaysAgo < 2) return "yesterday";
    if (isoOrDaysAgo < 30) return `${Math.floor(isoOrDaysAgo)}d ago`;
    if (isoOrDaysAgo < 365) return `${Math.floor(isoOrDaysAgo / 30)}mo ago`;
    return `${(isoOrDaysAgo / 365).toFixed(1)}y ago`;
  }
  const then = new Date(isoOrDaysAgo).getTime();
  const now = Date.now();
  const days = (now - then) / (1000 * 60 * 60 * 24);
  return formatRelative(days);
}
