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
import { Section, SectionHeader } from "@/components/ui/portfolio";
import { SKILLS } from "@/data/portfolio";
import { useLanguage } from "@/components/language-provider";

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
  const { language, t } = useLanguage();
  const pt = language === "pt";
  const rows = [
    { title: pt ? "Desenvolvimento" : "Development", items: DEVELOPMENT_SKILLS, icon: Code2, right: true },
    { title: pt ? "Ferramentas e fluxo de trabalho" : "Tools and workflow", items: WORKFLOW_SKILLS, icon: Wrench, right: false },
    { title: pt ? "Ferramentas de IA" : "AI tools", items: AI_SKILLS, icon: Sparkles, right: true },
  ];

  return (
    <Section id="skills">
      <SectionHeader
        code={t("P04 · Árvore de habilidades")}
        title={t("Painel de habilidades")}
        subtitle={pt ? "Tecnologias e ferramentas que uso para transformar ideias em interfaces." : "Technologies and tools I use to turn ideas into interfaces."}
      />
      <style>{`
        @keyframes stack-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .stack-track { animation: stack-loop var(--stack-duration) linear infinite; }
        .stack-track[data-right="true"] { animation-direction: reverse; }
        .stack-window:hover .stack-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .stack-track { animation: none; width: 100%; }
          .stack-window .stack-copy { display: none; }
          .stack-window .stack-list { flex-wrap: wrap; }

        }
      `}</style>
      <div className="space-y-8">
        {rows.map(({ title, items, icon: RowIcon, right }) => (
          <div key={title}>
            <h3 className="mb-3 flex items-center gap-3 border-t border-border/60 pt-4 text-base font-semibold sm:text-lg">
              <RowIcon className="size-4 text-primary" aria-hidden="true" />
              {title}
            </h3>
            <div className="stack-window relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border/60 bg-surface/40">
              <div
                className="stack-track flex w-max"
                data-right={right}

                style={{ "--stack-duration": `${Math.max(items.length, 8) * 5}s` } as React.CSSProperties}
              >
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className={copy === 1 ? "stack-copy flex shrink-0" : "stack-list flex shrink-0"}>
                    {[...items, ...items, ...items, ...items].map((item, index) => {
                      const Icon = ICONS[item.name];
                      const duplicate = index >= items.length;
                      return (
                        <li
                          key={`${item.name}-${index}`}
                          aria-hidden={duplicate || undefined}
                          title={t(item.desc)}
                          className={`${duplicate ? "stack-copy " : ""}flex min-h-24 w-52 shrink-0 items-center gap-4 border-r border-border/60 px-5 py-5 text-sm sm:min-h-28 sm:w-60 sm:text-base font-medium transition-colors duration-300 hover:bg-sky-500/15 hover:text-sky-400`}
                        >
                          <span className="grid size-11 shrink-0 sm:size-12 place-items-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                            {Icon && <Icon className="size-5 sm:size-6" aria-hidden="true" />}
                          </span>
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
