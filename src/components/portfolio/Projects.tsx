import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GitFork,
  Github,
  Layers,
  Route,
  Server,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import {
  getRepositoryByUrl,
  type GitHubRepository,
  useGitHubPortfolio,
} from "@/hooks/useGitHubPortfolio";
import { PROJECTS } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

function QuestCard({
  p,
  main,
  repository,
}: {
  p: (typeof PROJECTS)[number];
  main?: boolean;
  repository?: GitHubRepository;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const demoUrl = ("demo" in p ? p.demo : undefined) || repository?.homepage;
  const repositoryUrl = repository?.html_url ?? p.github;
  const updatedAt = repository
    ? new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date(repository.pushed_at))
    : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotationY: x * 6,
        rotationX: -y * 6,
        transformPerspective: 1200,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div data-reveal-item className={main ? "lg:col-span-2" : ""}>
      <Panel className="group h-full overflow-hidden hover:border-primary/50 hover:shadow-[0_0_50px_-20px_color-mix(in_oklab,var(--primary)_80%,transparent)]">
        <div ref={ref} style={{ transformStyle: "preserve-3d" }}>
          <div
            className={`relative overflow-hidden ${main ? "aspect-[16/9] sm:aspect-[21/8]" : "aspect-[16/9]"}`}
            style={{ background: p.gradient }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={`${t("Captura de tela do projeto")} ${p.title}`}
                loading="lazy"
                className={`absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03] ${
                  p.imageFit === "contain" ? "object-contain" : "object-cover"
                }`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" />
            <div className="absolute inset-0 grid-bg opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 scanlines opacity-25" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="rounded-md border border-white/25 bg-black/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {t(p.kind)}
              </span>
              <span className="rounded-md border border-white/25 bg-black/25 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                Rank {p.difficulty}
              </span>
            </div>
            <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md transition group-hover:bg-black/40">
              <ArrowUpRight className="size-4 text-white" />
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="font-display text-3xl font-bold text-white/95 sm:text-4xl">
                {p.title}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <p className="text-sm text-muted-foreground">{t(p.tagline)}</p>

            {p.description && (
              <p className="mt-3 max-w-4xl text-xs leading-relaxed text-muted-foreground">
                {t(p.description)}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.demoAvailable && (
                <span className="rounded-md border border-success/35 bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success">
                  {t("Acesso demo disponível")}
                </span>
              )}
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border/70 bg-surface/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {repository?.language && !p.tech.includes(repository.language) && (
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                  GitHub: {repository.language}
                </span>
              )}
            </div>

            {repository && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-3 text-primary" /> {repository.stargazers_count}{" "}
                  {t("estrelas")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GitFork className="size-3 text-primary" /> {repository.forks_count} forks
                </span>
                {updatedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3 text-primary" /> {t("Atualizado em")}{" "}
                    {updatedAt}
                  </span>
                )}
              </div>
            )}

            {p.highlights && (
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 sm:p-5">
                <div className="hud-label mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-primary" />{" "}
                  {t("Funcionalidades em destaque")}
                </div>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {p.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                      {t(highlight)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="hud-label flex items-center gap-1.5">
                  <Layers className="size-3 text-primary" /> {t("Arquitetura")}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t(p.architecture)}
                </dd>
              </div>
              <div>
                <dt className="hud-label flex items-center gap-1.5">
                  <Target className="size-3 text-primary" /> {t("Problema resolvido")}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t(p.problem)}
                </dd>
              </div>
              <div>
                <dt className="hud-label flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary" /> {t("Aprendizados")}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t(p.learnings)}
                </dd>
              </div>
              <div>
                <dt className="hud-label flex items-center gap-1.5">
                  <Route className="size-3 text-primary" /> Roadmap
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {p.roadmap.map((item) => t(item)).join(" · ")}
                </dd>
              </div>
            </dl>

            {p.origin && (
              <div className="mt-6 rounded-xl border border-border/70 bg-surface/45 p-4 sm:p-5">
                <div className="hud-label flex items-center gap-1.5">
                  <BookOpen className="size-3 text-primary" /> {t("Origem e evolução")}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(p.origin)}</p>
                {p.originLinks && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {p.originLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary transition-colors hover:text-foreground"
                      >
                        <ArrowUpRight className="size-3.5" /> {t(link.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-[11px] text-primary">Status: {t(p.status)}</span>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("Abrir demonstração do projeto")} ${p.title}`}
                    className={
                      p.featured
                        ? "inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-[11px] text-primary transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/15"
                        : "inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    <ArrowUpRight className="size-3.5" />
                    {p.featured ? t("Ver demonstração") : "Demo"}
                  </a>
                )}
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("Abrir repositório do projeto")} ${p.title} ${language === "pt" ? "no GitHub" : "on GitHub"}`}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="size-3.5" /> {p.featured ? t("Ver código") : t("Repositório")}
                </a>
                {p.api && (
                  <a
                    href={p.api}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("Consultar status da API do projeto")} ${p.title}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Server className="size-3.5" /> {t("Status da API")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function Projects() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { data: githubData, loading: githubLoading } = useGitHubPortfolio();
  const { t } = useLanguage();

  return (
    <div ref={root}>
      <Section id="projects">
        <SectionHeader
          code={t("P03 · Registro de projetos")}
          title={t("Missões em andamento")}
          subtitle={t(
            "AuthFlow é meu projeto Full Stack de destaque. FlowView, FlowTask e Ateliê AnaCraft mostram diferentes aplicações de Front-End, enquanto Chronos, Stranger Things e Pokedex completam meu portfólio.",
          )}
        />
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span
            className={`size-1.5 rounded-full ${githubData ? "bg-success" : "bg-muted-foreground"}`}
          />
          {githubData
            ? t("Projetos sincronizados com o GitHub")
            : githubLoading
              ? t("Sincronizando projetos...")
              : t("Dados locais ativos")}
        </div>
        <div data-reveal-group className="grid gap-4 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <QuestCard
              key={p.title}
              p={p}
              main={i === 0}
              repository={
                githubData ? getRepositoryByUrl(githubData.repositories, p.github) : undefined
              }
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
