import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  corners = true,
}: {
  children: ReactNode;
  className?: string;
  corners?: boolean;
}) {
  return <div className={cn("hud-panel", corners && "hud-corner", className)}>{children}</div>;
}

export function SectionHeader({
  code,
  title,
  subtitle,
}: {
  code: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div data-reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_currentColor]" />
        <span className="hud-label">{code}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 px-6 py-24 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
