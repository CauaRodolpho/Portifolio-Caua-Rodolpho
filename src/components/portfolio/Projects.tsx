import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Github,
  Layers,
  Maximize2,
  Route,
  Server,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { getRepositoryByUrl, useGitHubPortfolio } from "@/hooks/useGitHubPortfolio";
import { PROJECTS } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

type Project = (typeof PROJECTS)[number];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const { language, t } = useLanguage();
  const demoUrl = "demo" in project ? project.demo : undefined;
  const slides = useMemo(
    () => [
      ...(
        project.gallery ??
        (project.image
          ? [{ src: project.image, label: language === "pt" ? "Interface" : "Interface" }]
          : [])
      ).map((image) => ({ type: "image" as const, ...image })),
      { type: "architecture", label: language === "pt" ? "Arquitetura" : "Architecture" },
      { type: "features", label: language === "pt" ? "Funcionalidades" : "Features" },
    ],
    [language, project.gallery, project.image],
  );
  const activeSlide = slides[slide];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setSlide((value) => (value + 1) % slides.length);
      if (event.key === "ArrowLeft")
        setSlide((value) => (value - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKeyDown);
    dialog.current?.focus();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        dialog.current,
        { y: 28, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" },
      );
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, slides.length]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
      role="presentation"
      onMouseDown={(event) => event.currentTarget === event.target && onClose()}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="hud-panel hud-corner relative max-h-[94vh] w-full max-w-6xl overflow-x-hidden overflow-y-auto border-primary/35 bg-background shadow-[0_30px_120px_-30px_color-mix(in_oklab,var(--primary)_55%,transparent)] outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={language === "pt" ? "Fechar especificações" : "Close specifications"}
          className="sticky right-4 top-4 z-30 ml-auto mr-4 mt-4 flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition hover:border-primary/50 hover:text-primary"
        >
          <X className="size-5" />
        </button>

        <div className="grid gap-8 px-5 pb-8 pt-1 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40">
              <div className="relative aspect-[16/10]" style={{ background: project.gradient }}>
                {activeSlide.type === "image" && (
                  <>
                    <img
                      src={activeSlide.src}
                      alt={`${activeSlide.label} — ${project.title}`}
                      className={`absolute inset-0 size-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                  </>
                )}
                {activeSlide.type === "architecture" && (
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/75">
                      <Layers className="size-4" /> {activeSlide.label}
                    </div>
                    <p className="max-w-xl text-lg font-medium leading-relaxed text-white sm:text-2xl">
                      {t(project.architecture)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 7).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/25 bg-black/20 px-3 py-1 font-mono text-[10px] text-white backdrop-blur"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activeSlide.type === "features" && (
                  <div className="absolute inset-0 flex flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/75">
                      <CheckCircle2 className="size-4" /> {activeSlide.label}
                    </div>
                    <div className="my-auto grid gap-3 sm:grid-cols-2">
                      {(project.highlights ?? [project.problem, project.learnings])
                        .slice(0, 6)
                        .map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-white/20 bg-black/20 p-3 text-xs leading-relaxed text-white/90 backdrop-blur-sm sm:text-sm"
                          >
                            {t(item)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSlide((value) => (value - 1 + slides.length) % slides.length)}
                aria-label={language === "pt" ? "Visual anterior" : "Previous visual"}
                className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setSlide((value) => (value + 1) % slides.length)}
                aria-label={language === "pt" ? "Próximo visual" : "Next visual"}
                className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div
              className="mt-3 flex justify-center gap-2"
              role="tablist"
              aria-label={language === "pt" ? "Visuais do projeto" : "Project visuals"}
            >
              {slides.map((item, index) => (
                <button
                  key={`${item.type}-${item.label}`}
                  type="button"
                  onClick={() => setSlide(index)}
                  aria-label={item.label}
                  aria-selected={slide === index}
                  className={`h-1.5 rounded-full transition-all ${slide === index ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              {t(project.kind)} · Rank {project.difficulty}
            </span>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-3xl font-bold sm:text-4xl"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(project.description ?? project.tagline)}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Info
                icon={<Target className="size-3.5" />}
                label={t("Problema resolvido")}
                text={t(project.problem)}
              />
              <Info
                icon={<Sparkles className="size-3.5" />}
                label={t("Aprendizados")}
                text={t(project.learnings)}
              />
            </div>
            {project.origin && (
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
                <div className="hud-label flex items-center gap-2">
                  <BookOpen className="size-3.5 text-primary" />{" "}
                  {language === "pt" ? "Como foi criado" : "How it was built"}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t(project.origin)}
                </p>
              </div>
            )}
            <div className="mt-5">
              <div className="hud-label mb-2 flex items-center gap-2">
                <Layers className="size-3.5 text-primary" /> Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface/50 px-2 py-1 font-mono text-[9px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-border bg-surface/30 p-4">
              <div className="hud-label flex items-center gap-2">
                <Route className="size-3.5 text-primary" /> Roadmap
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {project.roadmap.map((item) => t(item)).join(" · ")}
              </p>
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-7">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/45 bg-primary/10 px-4 py-2.5 font-mono text-xs text-primary transition hover:-translate-y-0.5 hover:bg-primary/15"
                >
                  <ArrowUpRight className="size-4" />{" "}
                  {language === "pt" ? "Ver demonstração" : "View demo"}
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 font-mono text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Github className="size-4" /> {language === "pt" ? "Ver código" : "View code"}
              </a>
              {project.api && (
                <a
                  href={project.api}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-2.5 font-mono text-xs text-muted-foreground transition hover:text-foreground"
                >
                  <Server className="size-4" /> API
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Info({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/35 p-4">
      <div className="hud-label flex items-center gap-2 text-primary">
        {icon} {label}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

export function Projects() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [compact, setCompact] = useState(false);
  const dragStart = useRef<number | null>(null);
  const { data: githubData, loading: githubLoading } = useGitHubPortfolio();
  const { language, t } = useLanguage();

  const positionOf = useCallback(
    (index: number) => {
      let value = index - active;
      if (value > PROJECTS.length / 2) value -= PROJECTS.length;
      if (value < -PROJECTS.length / 2) value += PROJECTS.length;
      return value;
    },
    [active],
  );
  const move = useCallback(
    (direction: number) =>
      setActive((value) => (value + direction + PROJECTS.length) % PROJECTS.length),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const position = positionOf(index);
      const distance = Math.abs(position);
      const visible = distance <= (compact ? 1 : 2);
      gsap.to(card, {
        xPercent: -50 + (compact ? position * 86 : position * 66),
        scale: position === 0 ? 1 : compact ? 0.8 : Math.max(0.66, 0.84 - (distance - 1) * 0.12),
        rotationY: compact ? 0 : position * -18,
        z: compact ? 0 : distance * -150,
        opacity: visible ? (position === 0 ? 1 : compact ? 0.42 : distance === 1 ? 0.58 : 0.18) : 0,
        filter: position === 0 ? "blur(0px)" : `blur(${distance * 1.5}px)`,
        zIndex: 20 - distance,
        pointerEvents: visible ? "auto" : "none",
        duration: reduced ? 0 : 0.72,
        ease: "power3.inOut",
      });
    });
  }, [active, compact, positionOf]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selected) return;
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, selected]);

  const activeProject = PROJECTS[active];
  const repository = githubData
    ? getRepositoryByUrl(githubData.repositories, activeProject.github)
    : undefined;
  const demoUrl =
    ("demo" in activeProject ? activeProject.demo : undefined) || repository?.homepage;

  return (
    <>
      <Section id="projects" className="overflow-hidden">
        <SectionHeader
          code={language === "pt" ? "P03 · Arquivo de projetos" : "P03 · Project archive"}
          title={language === "pt" ? "Projetos em órbita" : "Projects in orbit"}
          subtitle={
            language === "pt"
              ? "Navegue pelas aplicações, selecione uma missão e abra as especificações para conhecer as decisões, funcionalidades e aprendizados por trás de cada projeto."
              : "Navigate through the applications, select a mission and open its specifications to explore the decisions, features and lessons behind each project."
          }
        />
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span
              className={`size-1.5 rounded-full ${githubData ? "bg-success" : "bg-muted-foreground"}`}
            />
            {githubData
              ? t("Projetos sincronizados com o GitHub")
              : githubLoading
                ? t("Sincronizando projetos...")
                : t("Dados locais ativos")}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
            {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className="relative h-[460px] perspective-[1400px] sm:h-[510px] lg:h-[540px]"
          onPointerDown={(event) => {
            dragStart.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (dragStart.current === null) return;
            const distance = event.clientX - dragStart.current;
            if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
            dragStart.current = null;
          }}
        >
          {PROJECTS.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={item.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="absolute left-1/2 top-0 w-[88%] max-w-[760px] -translate-x-1/2 cursor-pointer will-change-transform sm:w-[72%]"
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => !isActive && setActive(index)}
                aria-hidden={!isActive}
              >
                <Panel
                  className={`group overflow-hidden transition-colors ${isActive ? "border-primary/45 shadow-[0_28px_100px_-45px_color-mix(in_oklab,var(--primary)_70%,transparent)]" : "border-border/70"}`}
                >
                  <div
                    className="relative aspect-[16/8.2] overflow-hidden"
                    style={{ background: item.gradient }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className={`absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.025] ${item.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
                    <div className="absolute inset-0 grid-bg opacity-25 mix-blend-overlay" />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-md border border-white/25 bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur">
                        {t(item.kind)}
                      </span>
                      <span className="rounded-md border border-white/25 bg-black/30 px-2 py-1 font-mono text-[9px] text-white backdrop-blur">
                        Rank {item.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-display text-2xl font-bold text-white sm:text-4xl">
                          {item.title}
                        </p>
                        <p className="mt-1 hidden max-w-xl text-xs text-white/70 sm:block">
                          {t(item.tagline)}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 font-mono text-[9px] text-white backdrop-blur">
                        {t(item.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {t(item.description ?? item.tagline)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.slice(0, compact ? 4 : 7).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface/50 px-2 py-0.5 font-mono text-[9px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {isActive && (
                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelected(item);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-primary/45 bg-primary/10 px-3 py-2 font-mono text-[10px] text-primary transition hover:-translate-y-0.5 hover:bg-primary/15 sm:text-xs"
                        >
                          <Maximize2 className="size-3.5" />{" "}
                          {language === "pt" ? "Ver especificações" : "View specifications"}
                        </button>
                        {demoUrl && (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition hover:text-foreground sm:text-xs"
                          >
                            <ArrowUpRight className="size-3.5" /> Demo
                          </a>
                        )}
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition hover:text-foreground sm:text-xs"
                        >
                          <Github className="size-3.5" /> GitHub
                        </a>
                      </div>
                    )}
                  </div>
                </Panel>
              </div>
            );
          })}
        </div>
        <div className="relative z-30 mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={language === "pt" ? "Projeto anterior" : "Previous project"}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition hover:-translate-x-0.5 hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div
            className="flex gap-2"
            role="tablist"
            aria-label={language === "pt" ? "Selecionar projeto" : "Select project"}
          >
            {PROJECTS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={item.title}
                aria-selected={index === active}
                className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={language === "pt" ? "Próximo projeto" : "Next project"}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition hover:translate-x-0.5 hover:border-primary/50 hover:text-primary"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </Section>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
