import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TechBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "rounded-md border border-border bg-surface/50 px-2 py-1 font-mono text-[9px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
