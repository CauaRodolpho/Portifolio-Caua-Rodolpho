import { useRef } from "react";
import {
  SiAngular,
  SiClaude,
  SiCss,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiGooglegemini,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPnpm,
  SiPostman,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { LuBot } from "react-icons/lu";
import { VscVscode } from "react-icons/vsc";
import { Code2, Sparkles, Wrench } from "lucide-react";
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
  Vite: SiVite,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  Figma: SiFigma,
  Vercel: SiVercel,
  npm: SiNpm,
  pnpm: SiPnpm,
  Postman: SiPostman,
  Docker: SiDocker,
  "Styled Components": SiStyledcomponents,
  "GitHub Copilot": SiGithubcopilot,
  "ChatGPT / Codex": LuBot,
  Claude: SiClaude,
  Gemini: SiGooglegemini,
};

const AI_SKILL_NAMES = new Set(["GitHub Copilot", "ChatGPT / Codex", "Claude", "Gemini"]);
const WORKFLOW_SKILL_NAMES = new Set([
  "Vite",
  "Git",
  "GitHub",
  "VS Code",
  "Figma",
  "Vercel",
  "npm",
  "pnpm",
  "Postman",
  "Docker",
]);
const DEVELOPMENT_SKILLS = SKILLS.filter(
  (skill) => !AI_SKILL_NAMES.has(skill.name) && !WORKFLOW_SKILL_NAMES.has(skill.name),
);
const WORKFLOW_SKILLS = SKILLS.filter((skill) => WORKFLOW_SKILL_NAMES.has(skill.name));
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
              ? "Tecnologias e ferramentas que uso para transformar ideias em interfaces."
              : "Technologies and tools I use to turn ideas into interfaces."
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

          <Panel className="p-4 sm:p-6">
            <div data-reveal-item>
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Wrench className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {language === "pt" ? "Ferramentas e fluxo de trabalho" : "Tools and workflow"}
                    </h3>
                    <p className="hud-label mt-0.5">
                      {language === "pt"
                        ? "Ambiente de desenvolvimento"
                        : "Development environment"}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(WORKFLOW_SKILLS.length).padStart(2, "0")} TOOLS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
                {WORKFLOW_SKILLS.map((skill) => {
                  const Icon = ICONS[skill.name];
                  return (
                    <div
                      key={skill.name}
                      title={`${skill.name} — ${t(skill.desc)}`}
                      className="group/tool flex min-h-24 flex-col items-center justify-center gap-3 px-2 py-3 text-center transition duration-300 hover:-translate-y-1"
                    >
                      {Icon ? (
                        <Icon
                          className="size-8 text-primary transition duration-300 group-hover/tool:scale-115 group-hover/tool:drop-shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
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

          <Panel className="p-4 sm:p-6">
            <div data-reveal-item>
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Sparkles className="size-4" aria-hidden="true" />
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
