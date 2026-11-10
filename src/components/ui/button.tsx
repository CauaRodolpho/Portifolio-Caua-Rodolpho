import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function IconButton({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export function ActionLink({
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "border border-primary/45 bg-primary/10 text-primary hover:-translate-y-0.5 hover:bg-primary/15",
        variant === "secondary" &&
          "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        variant === "ghost" && "px-2 text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
