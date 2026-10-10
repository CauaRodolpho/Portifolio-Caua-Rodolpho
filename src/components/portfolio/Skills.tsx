import { useRef } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiGit,
  SiStyledcomponents,
  SiGithubcopilot,
  SiClaude,
  SiGooglegemini,
} from "react-icons/si";
import { LuBot } from "react-icons/lu";
import type { IconType } from "react-icons";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { SKILLS, type SkillStatus } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

const ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  "JavaScript (ES6+)": SiJavascript,
  TypeScript: SiTypescript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  GSAP: SiGreensock,
  "Node.js": SiNodedotjs,
  "Git & GitHub": SiGit,
  "Styled Components": SiStyledcomponents,
  "GitHub Copilot": SiGithubcopilot,
  "ChatGPT / Codex": LuBot,
  Claude: SiClaude,
  Gemini: SiGooglegemini,
};

const STATUS_STYLE: Record<SkillStatus, string> = {
  Unlocked: "text-success border-success/40 bg-success/10",
  Training: "text-primary border-primary/40 bg-primary/10",
  Learning: "text-accent border-accent/40 bg-accent/10",
  "In Progress": "text-muted-foreground border-border bg-muted/40",
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  Unlocked: "Consolidado",
  Training: "Praticando",
  Learning: "Estudando",
  "In Progress": "Em progresso",
};

function formatStudyDuration(startedAt: string, language: "pt" | "en") {
  const [startYear, startMonth] = startedAt.split("-").map(Number);
  const now = new Date();
  const totalMonths = Math.max(
    0,
    (now.getUTCFullYear() - startYear) * 12 + now.getUTCMonth() - (startMonth - 1),
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (language === "en") {
    const parts = [
      years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "",
      months > 0 ? `${months} ${months === 1 ? "month" : "months"}` : "",
    ].filter(Boolean);
    return parts.join(" and ") || "Less than 1 month";
  }

  const parts = [
    years > 0 ? `${years} ${years === 1 ? "ano" : "anos"}` : "",
    months > 0 ? `${months} ${months === 1 ? "mês" : "meses"}` : "",
  ].filter(Boolean);
  return parts.join(" e ") || "Menos de 1 mês";
}

export function Skills() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { language, t } = useLanguage();

  return (
    <div ref={root}>
      <Section id="skills">
        <SectionHeader
          code={t("P04 · Árvore de habilidades")}
          title={t("Painel de habilidades")}
          subtitle={t(
            "Cada tecnologia é um nó da árvore: nível, tempo de treino e status de domínio.",
          )}
        />

        <div data-reveal-group className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => {
            const Icon = ICONS[s.name];
            return (
              <Panel
                key={s.name}
                className="group p-5 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_36px_-14px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
              >
                <div data-reveal-item>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-border/70 bg-surface/60 text-primary transition-transform duration-300 group-hover:scale-110">
                        {Icon ? <Icon className="size-5" aria-hidden /> : null}
                      </span>
                      <div>
                        <div className="font-display text-base font-semibold">{s.name}</div>
                        <div className="hud-label mt-0.5">{s.category}</div>
                      </div>
                    </div>
                    <span
                      className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLE[s.status]}`}
                    >
                      {t(STATUS_LABEL[s.status])}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t(s.desc)}</p>

                  <div className="mt-4 border-t border-border/60 pt-3 font-mono text-[11px] text-muted-foreground">
                    {s.startedAt
                      ? `${formatStudyDuration(s.startedAt, language)} ${t("de estudo e prática")}`
                      : t("Ferramenta de IA para apoio ao desenvolvimento")}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
