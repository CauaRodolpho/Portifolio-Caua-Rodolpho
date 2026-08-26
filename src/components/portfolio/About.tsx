import { useRef } from "react";
import {
  BriefcaseBusiness,
  BookOpen,
  Code2,
  Github,
  Layers3,
  Mail,
  MapPin,
  Quote,
  Rocket,
  Target,
} from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { getLanguageDistribution, useGitHubPortfolio } from "@/hooks/useGitHubPortfolio";
import { CONTACT_EMAIL, getGmailComposeUrl, STATS, LANGUAGES } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

const STORY = [
  {
    title: "Base do Front-End",
    icon: Code2,
    text: "Comecei com HTML, CSS e JavaScript, desenvolvendo páginas responsivas e aprendendo sobre estrutura semântica, estilização, DOM, eventos e consumo de APIs.",
  },
  {
    title: "Interfaces com React",
    icon: Layers3,
    text: "Avancei para React, TypeScript e Tailwind CSS, praticando componentização, tipagem, gerenciamento de estados e organização de interfaces modernas e acessíveis.",
  },
  {
    title: "Projetos que marcaram a evolução",
    icon: Rocket,
    text: "O Chronos e o Nexus Cloud fortaleceram minha base em interfaces, TypeScript e arquitetura Front-End. Com o AuthFlow, avancei para uma aplicação Full Stack com autenticação, API, banco de dados e deploy completo.",
  },
  {
    title: "Aprendizado atual",
    icon: BookOpen,
    text: "Atualmente estou aprofundando meus conhecimentos na Formação TypeScript Fullstack Developer e em Design Thinking, buscando desenvolver soluções mais completas e centradas nas necessidades do usuário.",
  },
  {
    title: "Direção profissional",
    icon: Target,
    text: "Meu foco atual é consolidar minha base em Front-End e conquistar minha primeira oportunidade na área. No longo prazo, quero evoluir como Desenvolvedor Full Stack, ampliando meus conhecimentos em back-end, APIs e bancos de dados.",
  },
] as const;

export function About() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { data: githubData, loading: githubLoading } = useGitHubPortfolio();
  const { language, t } = useLanguage();
  const githubLanguages = githubData ? getLanguageDistribution(githubData.languageBytes) : [];
  const languages = githubLanguages.length > 0 ? githubLanguages : LANGUAGES;
  const stats = githubData
    ? [
        { label: t("Repositórios públicos"), value: String(githubData.profile.public_repos) },
        { label: t("Seguidores"), value: String(githubData.profile.followers) },
        { label: t("Projetos analisados"), value: String(githubData.repositories.length) },
        { label: t("Fonte dos dados"), value: "GitHub" },
      ]
    : STATS;

  return (
    <div ref={root}>
      <Section id="about">
        <SectionHeader
          code={t("LOG 01 · Origem")}
          title={t("A história por trás do código")}
          subtitle={t(
            "Uma trajetória construída com curiosidade, prática constante e projetos que mostram cada etapa da minha evolução.",
          )}
        />

        <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <Panel className="overflow-hidden p-7 sm:p-9">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />
            <div className="relative">
              <div className="hud-label mb-7 flex items-center gap-2 text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
                {t("Minha jornada em prática")}
              </div>

              <div data-reveal-group className="relative space-y-8">
                <div className="absolute bottom-5 left-[17px] top-5 w-px bg-gradient-to-b from-primary via-primary/45 to-transparent" />
                {STORY.map((item) => (
                  <article key={item.title} data-reveal-item className="relative pl-14">
                    <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-background text-primary shadow-[0_0_22px_-10px_currentColor]">
                      <item.icon className="size-4" />
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {t(item.text)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Panel>

          <div className="space-y-4">
            <Panel className="overflow-hidden p-6">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
              <div className="relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex aspect-[4/5] w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/45 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_65%),linear-gradient(145deg,var(--surface-elevated),var(--background))] shadow-[0_0_32px_-15px_color-mix(in_oklab,var(--primary)_80%,transparent)] sm:w-28">
                    <img
                      src="/profile-caua-rodolpho.webp"
                      alt={
                        language === "pt"
                          ? "Foto profissional de Cauã Rodolpho"
                          : "Professional portrait of Cauã Rodolpho"
                      }
                      width="719"
                      height="1080"
                      loading="lazy"
                      className="size-full object-cover object-center saturate-[0.96] contrast-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020a12]/35 via-transparent to-cyan-200/[0.04]" />
                    <div className="pointer-events-none absolute inset-0 grid-bg opacity-10 mix-blend-screen" />
                    <div className="pointer-events-none absolute inset-[3px] rounded-[13px] border border-cyan-200/10" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="hud-label">Profile module</div>
                    <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                      Cauã Rodolpho
                    </h3>
                    <p className="mt-1 text-sm text-primary">
                      {t("Desenvolvedor Front-End Júnior")}
                    </p>
                    <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-primary" /> Barueri - SP
                      </li>
                      <li className="flex items-start gap-2">
                        <BriefcaseBusiness className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{t("Disponível para oportunidades e projetos freelance")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="size-3.5 text-primary" />
                        <a
                          href={getGmailComposeUrl(language)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate transition-colors hover:text-foreground"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <blockquote className="mt-5 flex gap-3 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                  <Quote className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    {t(
                      "Transformo estudo, curiosidade e prática em interfaces úteis, modernas e bem construídas.",
                    )}
                  </span>
                </blockquote>
              </div>
            </Panel>

            <Panel className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="hud-label">{t("Linguagens no GitHub")}</div>
                <a
                  href="https://github.com/CauaRodolpho"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t("Abrir perfil de Cauã Rodolpho no GitHub")}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary transition-colors hover:text-foreground"
                >
                  <Github className="size-3.5" /> {t("Perfil")}
                </a>
              </div>
              <div data-reveal-group className="mt-5 space-y-4">
                {languages.map((language) => (
                  <div key={language.name} data-reveal-item>
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-foreground">{t(language.name)}</span>
                      <span className="text-muted-foreground">{language.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${language.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                {githubData
                  ? t("Sincronizado com repositórios públicos")
                  : githubLoading
                    ? t("Consultando GitHub...")
                    : t("Exibindo dados locais de segurança")}
              </p>
            </Panel>

            <Panel className="p-6">
              <div className="hud-label">{t("Indicadores do perfil")}</div>
              <div data-reveal-group className="mt-5 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} data-reveal-item>
                    <div className="font-display text-xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="hud-label mt-0.5">{t(stat.label)}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Section>
    </div>
  );
}
