import { useRef } from "react";
import {
  SiAngular,
  SiClaude,
  SiCss,
  SiGit,
  SiGithubcopilot,
  SiGooglegemini,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { LuBot } from "react-icons/lu";
import { Code2, Sparkles } from "lucide-react";
import type { IconType } from "react-icons";
import { Panel, Section, SectionHeader } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { SKILLS } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

const ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  "JavaScript (ES6+)": SiJavascript,
  TypeScript: SiTypescript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  Angular: SiAngular,
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

const AI_SKILL_NAMES = new Set(["GitHub Copilot", "ChatGPT / Codex", "Claude", "Gemini"]);
const DEVELOPMENT_SKILLS = SKILLS.filter((skill) => !AI_SKILL_NAMES.has(skill.name));
const AI_SKILLS = SKILLS.filter((skill) => AI_SKILL_NAMES.has(skill.name));

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
          subtitle={
            language === "pt"
              ? "Tecnologias que uso para transformar ideias em interfaces, com minhas ferramentas de IA em destaque."
              : "Technologies I use to turn ideas into interfaces, with my AI tools in the spotlight."
          }
        />

        <div data-reveal-group className="flex flex-col gap-4">
          <Panel className="p-4 sm:p-6">
            <div data-reveal-item>
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Code2 className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {language === "pt" ? "Desenvolvimento" : "Development"}
                    </h3>
                    <p className="hud-label mt-0.5">
                      {language === "pt" ? "Stack principal" : "Core stack"}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(DEVELOPMENT_SKILLS.length).padStart(2, "0")} TECH
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
                {DEVELOPMENT_SKILLS.map((skill) => {
                  const Icon = ICONS[skill.name];
                  return (
                    <div
                      key={skill.name}
                      title={`${skill.name} — ${t(skill.desc)}`}
                      className="group/skill flex min-h-24 flex-col items-center justify-center gap-3 px-2 py-3 text-center transition duration-300 hover:-translate-y-1"
                    >
                      {Icon ? (
                        <Icon
                          className="size-8 text-primary transition duration-300 group-hover/skill:scale-115 group-hover/skill:drop-shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>

          <Panel className="relative overflow-hidden border-primary/35 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_52%)] p-4 shadow-[0_0_60px_-36px_color-mix(in_oklab,var(--primary)_80%,transparent)] sm:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl" />
            <div data-reveal-item className="relative">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-primary/20 pb-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex size-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary shadow-[0_0_24px_-9px_color-mix(in_oklab,var(--primary)_90%,transparent)]">
                    <Sparkles className="size-5" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 size-2 rounded-full bg-success shadow-[0_0_8px_currentColor]" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {language === "pt" ? "Ferramentas de IA" : "AI tools"}
                    </h3>
                    <p className="hud-label mt-0.5">
                      {language === "pt" ? "Apoio ao desenvolvimento" : "Development support"}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                  AI
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {AI_SKILLS.map((skill) => {
                  const Icon = ICONS[skill.name];
                  return (
                    <div
                      key={skill.name}
                      title={`${skill.name} — ${t(skill.desc)}`}
                      className="group/ai flex min-h-24 flex-col items-center justify-center gap-3 px-2 py-3 text-center transition duration-300 hover:-translate-y-1"
                    >
                      {Icon ? (
                        <Icon
                          className="size-8 text-primary transition duration-300 group-hover/ai:scale-115 group-hover/ai:drop-shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>
        </div>
      </Section>
    </div>
  );
}
