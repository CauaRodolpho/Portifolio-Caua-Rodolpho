import {
  SiAngular,
  SiAnthropic,
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
import { LuBot, LuHeart } from "react-icons/lu";
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
  Anthropic: SiAnthropic,
  Lovable: LuHeart,
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
const AI_SKILLS = [
  ...SKILLS.filter((skill) => AI_SKILL_NAMES.has(skill.name)),
  { name: "Anthropic", desc: "Anthropic" },
  { name: "Lovable", desc: "Lovable" },
];

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
        .stack-window {
          --stack-fade: clamp(12px, 4vw, 64px);
          mask-image: linear-gradient(to right, transparent, black var(--stack-fade), black calc(100% - var(--stack-fade)), transparent);
        }
        .stack-window:hover .stack-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .stack-window { mask-image: none; }
          .stack-card, .stack-icon { transition: none; }
          .stack-track { animation: none; width: 100%; }
          .stack-window .stack-copy { display: none; }
          .stack-window .stack-list { flex-wrap: wrap; }
        }
      `}</style>
      <div className="space-y-7">
        {rows.map(({ title, items, icon: RowIcon, right }) => (
          <div key={title}>
            <h3 className="mb-3 flex items-center gap-3 border-t border-border/60 pt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary sm:text-xs">
              <RowIcon className="size-4 text-primary" aria-hidden="true" />
              {title}
            </h3>
            <div className="stack-window relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border/40 bg-surface/20">
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
                          className={`${duplicate ? "stack-copy " : ""}stack-card group flex min-h-16 w-40 shrink-0 items-center gap-2.5 border-r border-border/40 px-3.5 py-3 font-mono text-xs font-medium leading-snug transition-colors duration-200 hover:bg-primary/10 hover:text-primary sm:min-h-20 sm:w-52 sm:gap-3 sm:px-5 sm:text-sm`}
                        >
                          <span className="stack-icon grid size-8 shrink-0 place-items-center rounded-full border border-primary/20 text-primary transition-colors duration-200 group-hover:border-primary/50 group-hover:bg-primary/15 sm:size-9">
                            {Icon && <Icon className="size-4 sm:size-[18px]" aria-hidden="true" />}
                          </span>
                          <span>{item.name}</span>
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
