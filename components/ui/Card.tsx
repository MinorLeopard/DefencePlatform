import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  as: Component = "div",
  hover = true,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
  hover?: boolean;
  interactive?: boolean;
}) {
  return (
    <Component
      className={cn(
        "relative rounded-xl border border-line bg-ink-900/60 backdrop-blur-sm",
        hover && "transition-colors hover:border-line-strong hover:bg-ink-850/80",
        interactive && "cursor-pointer",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 md:p-6", className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-5 pb-5 md:px-6 md:pb-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-t border-line px-5 py-3.5 md:px-6", className)}>{children}</div>;
}
