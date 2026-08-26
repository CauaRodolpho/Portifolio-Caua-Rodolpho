import { useRef } from "react";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { TIMELINE } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { language, t: tr } = useLanguage();

  return (
    <div ref={root}>
      <Section id="timeline">
        <SectionHeader
          code={tr("P05 · Progressão")}
          title={tr("Linha de evolução")}
          subtitle={tr(
            "Minha evolução dos fundamentos aos projetos atuais, construindo o caminho para a primeira oportunidade como Desenvolvedor Front-End.",
          )}
        />

        <div data-reveal-group className="relative pl-8 sm:pl-10">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent/50 to-transparent sm:left-[15px]" />
          <ol className="space-y-4">
            {TIMELINE.map((t, i) => {
              const future = t.level === "Next";
              const current = t.level === "Current";
              return (
                <li key={t.title} data-reveal-item className="relative">
                  <span
                    className={`absolute -left-8 top-6 flex size-[23px] items-center justify-center rounded-full border sm:-left-10 ${
                      future
                        ? "border-border bg-surface"
                        : current
                          ? "border-primary bg-primary/15 shadow-[0_0_20px_-2px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
                          : "border-primary/60 bg-background shadow-[0_0_14px_-2px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${future ? "bg-muted-foreground" : "bg-primary"}`}
                    />
                  </span>
                  <Panel className="p-5 hover:border-primary/50 sm:p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                        {future
                          ? tr("Próxima missão")
                          : current
                            ? tr("Nível atual")
                            : language === "pt"
                              ? t.level.replace("Level", "Nível")
                              : t.level}
                      </span>
                      <span className="hud-label">
                        {tr("Etapa")} {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold">{tr(t.title)}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{tr(t.desc)}</p>
                  </Panel>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>
    </div>
  );
}
