import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "../language-provider";

const LINES = [
  "SISTEMA INICIALIZADO",
  "Carregando projetos e habilidades...",
  "Conexão estabelecida.",
  "Bem-vindo ao portfólio de Cauã Rodolpho.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from("[data-boot-logo]", {
        opacity: 0,
        scale: 0.85,
        filter: "blur(12px)",
        duration: 0.55,
        ease: "power3.out",
      }).from(
        "[data-boot-ring]",
        { scale: 0.4, opacity: 0, duration: 0.65, ease: "expo.out" },
        "-=0.4",
      );

      LINES.forEach((_, i) => {
        tl.call(() => setVisible(i + 1), undefined, 0.5 + i * 0.2);
      });

      tl.to("[data-boot-bar-fill]", { scaleX: 1, duration: 1.2, ease: "power1.inOut" }, 0.5).to(
        "[data-boot-root]",
        { opacity: 0, filter: "blur(10px)", duration: 0.35, ease: "power2.inOut" },
        "+=0.1",
      );
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      data-boot-root
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <button
        type="button"
        onClick={onDone}
        className="absolute right-5 top-5 rounded-lg border border-border/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        {t("Pular introdução")}
      </button>

      <div className="relative flex w-[min(90%,520px)] flex-col items-center">
        <div className="relative mb-10 flex size-32 items-center justify-center">
          <div
            data-boot-ring
            className="absolute inset-0 rounded-full border border-primary/40 animate-[spin_6s_linear_infinite]"
            style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
          />
          <div
            data-boot-ring
            className="absolute inset-4 rounded-full border border-accent/40 animate-[spin_9s_linear_infinite_reverse]"
            style={{ borderBottomColor: "transparent" }}
          />
          <div
            data-boot-logo
            className="font-display text-2xl font-bold tracking-tight text-gradient"
          >
            CR
          </div>
        </div>

        <div className="w-full font-mono text-xs sm:text-sm space-y-1.5 min-h-[168px]">
          {LINES.slice(0, visible).map((l, i) => (
            <div key={l} className="flex items-center gap-2 animate-fade-in">
              <span className="text-primary">›</span>
              <span
                className={i === LINES.length - 1 ? "text-foreground" : "text-muted-foreground"}
              >
                {t(l)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 h-px w-full overflow-hidden bg-border">
          <div
            data-boot-bar-fill
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>
    </div>
  );
}
