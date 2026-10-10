import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowRight,
  CircleDot,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  SiGreensock,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { CONTACT_EMAIL, PROFILE, PROJECTS } from "@/data/portfolio";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../language-provider";

const FEATURED_PROJECT_NAMES = ["AuthFlow", "FlowView", "FlowTask", "Ateliê AnaCraft"];

const CORE_SKILLS = [
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "GSAP", Icon: SiGreensock },
  { name: "Node.js", Icon: SiNodedotjs },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/CauaRodolpho", Icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cau%C3%A3-rodolpho/",
    Icon: Linkedin,
  },
  { label: "E-mail", href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
] as const;

function splitChars(text: string) {
  return text.split("").map((character, index) => (
    <span key={`${character}-${index}`} data-char className="inline-block will-change-transform">
      {character === " " ? "\u00A0" : character}
    </span>
  ));
}

export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const featuredProjects = FEATURED_PROJECT_NAMES.map((name) =>
    PROJECTS.find((project) => project.title === name),
  ).filter((project): project is (typeof PROJECTS)[number] => Boolean(project));
  const activeProject = featuredProjects[activeProjectIndex] ?? featuredProjects[0];
  const resumeHref =
    language === "pt" ? "/curriculo-caua-rodolpho.pdf" : "/caua-rodolpho-resume-en.pdf";
  const resumeFilename =
    language === "pt" ? "curriculo-caua-rodolpho.pdf" : "caua-rodolpho-resume-en.pdf";
  const isDark = theme === "dark";
  const heroVideo = isDark ? "/Video%20Hero%20Dark.mp4" : "/Video%20Hero%20Light.mp4";
  const heroPoster = isDark ? "/hero-hologram-poster.jpg" : "/hero-hologram-light-poster.jpg";

  useEffect(() => {
    const section = root.current;
    const glow = cursorGlow.current;
    if (!section || !glow) return;

    const supportsCursorEffect = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!supportsCursorEffect.matches) return;

    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });
    const moveX = gsap.quickTo(glow, "x", { duration: 0.18, ease: "power3.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.18, ease: "power3.out" });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      moveX(event.clientX - bounds.left);
      moveY(event.clientY - bounds.top);
    };
    const showGlow = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      gsap.set(glow, { x: event.clientX - bounds.left, y: event.clientY - bounds.top });
      gsap.to(glow, { opacity: 0.72, duration: 0.25 });
    };
    const hideGlow = () => gsap.to(glow, { opacity: 0, duration: 0.3 });

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerenter", showGlow);
    section.addEventListener("pointerleave", hideGlow);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerenter", showGlow);
      section.removeEventListener("pointerleave", hideGlow);
      gsap.killTweensOf(glow);
    };
  }, []);

  useEffect(() => {
    if (!start || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", clearProps: "opacity,transform,filter" } })
        .fromTo("[data-hero-eyebrow]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(
          "[data-hero-name] [data-char]",
          { opacity: 0, y: 28, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.48, stagger: 0.022 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-copy], [data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-panel]",
          { opacity: 0, y: 22, filter: "blur(7px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.62, stagger: 0.12 },
          "-=0.25",
        );
    }, root);

    return () => ctx.revert();
  }, [start]);

  if (!activeProject) return null;

  return (
    <section
      ref={root}
      id="profile"
      className="relative min-h-screen scroll-mt-28 overflow-hidden bg-slate-100 px-4 pb-8 pt-28 text-slate-950 dark:bg-[#020a12] dark:text-white sm:px-6 lg:min-h-[940px] lg:pb-6 lg:pt-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroPoster}')` }}
        aria-hidden="true"
      />
      <video
        key={heroVideo}
        className="absolute inset-0 size-full object-cover object-center motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.94)_0%,rgba(248,250,252,0.64)_28%,rgba(248,250,252,0.05)_53%,rgba(248,250,252,0.68)_79%,rgba(248,250,252,0.92)_100%)] dark:bg-[linear-gradient(90deg,rgba(1,8,15,0.95)_0%,rgba(1,8,15,0.74)_27%,rgba(1,8,15,0.04)_52%,rgba(1,8,15,0.68)_78%,rgba(1,8,15,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.5)_0%,transparent_25%,transparent_58%,rgba(241,245,249,0.96)_100%)] dark:bg-[linear-gradient(180deg,rgba(1,8,15,0.5)_0%,transparent_25%,transparent_58%,rgba(1,8,15,0.97)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10 dark:opacity-25" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-5 dark:opacity-20" />
      <div ref={cursorGlow} className="hero-cursor-glow" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-[1500px] flex-col lg:min-h-[780px]">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.72fr)] lg:gap-[20%] xl:gap-[28%]">
          <div className="relative z-10 max-w-xl lg:pb-20">
            <div
              data-hero-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-cyan-700/25 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl dark:border-cyan-300/30 dark:bg-[#03121d]/68"
            >
              <Code2 className="size-3.5 text-cyan-700 dark:text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-900 dark:text-cyan-100 sm:text-xs">
                {t("Desenvolvedor Front-End Júnior")}
              </span>
            </div>

            <h1
              data-hero-name
              className="mt-5 text-5xl font-semibold leading-[0.84] tracking-[-0.065em] text-slate-950 dark:text-white sm:text-7xl lg:text-[clamp(4.6rem,6vw,7rem)]"
            >
              <span className="block">{splitChars("Cauã")}</span>
              <span className="text-gradient block pb-2">{splitChars("Rodolpho")}</span>
            </h1>

            <p
              data-hero-copy
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-800 dark:text-cyan-200 sm:text-xs"
            >
              {t("React · TypeScript · Experiências digitais")}
            </p>
            <p
              data-hero-copy
              className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-slate-700 dark:font-normal dark:text-slate-200 sm:text-base"
            >
              {t(PROFILE.summary)}{" "}
              {t(
                "Busco minha primeira oportunidade para contribuir com produtos reais e evoluir junto a um time de tecnologia.",
              )}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                data-hero-cta
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#021018] shadow-[0_0_32px_-8px_rgba(80,220,255,0.9)] transition-all hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                {t("Ver projetos")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                data-hero-cta
                href={resumeHref}
                download={resumeFilename}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-800/25 bg-white/75 px-5 py-3 text-sm font-medium backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-700/50 dark:border-cyan-200/30 dark:bg-[#03121d]/70 dark:hover:border-cyan-200/60"
              >
                <Download className="size-4 text-cyan-700 dark:text-cyan-300" />
                {t("Baixar currículo")}
              </a>
              <a
                data-hero-cta
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-800/25 bg-white/75 px-5 py-3 text-sm font-medium backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-700/50 dark:border-cyan-200/30 dark:bg-[#03121d]/70 dark:hover:border-cyan-200/60"
              >
                <Mail className="size-4 text-cyan-700 dark:text-cyan-300" />
                {t("Contato")}
              </a>
            </div>
          </div>

          <aside
            data-hero-panel
            aria-label={t("Projetos em destaque")}
            className="relative z-10 overflow-hidden rounded-2xl border border-cyan-700/20 bg-white/80 p-3 shadow-[0_24px_80px_-42px_rgba(8,145,178,0.8)] backdrop-blur-2xl dark:border-cyan-300/25 dark:bg-[#03121d]/78 sm:p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
                  {String(activeProjectIndex + 1).padStart(2, "0")} /{" "}
                  {String(featuredProjects.length).padStart(2, "0")}
                </span>
                <h2 className="mt-1 text-sm font-semibold sm:text-base">
                  {t("Projetos em destaque")}
                </h2>
              </div>
              <a
                href="#projects"
                className="inline-flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                {language === "pt" ? "Ver todos" : "View all"}
                <ArrowRight className="size-3.5" />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_70px]">
              <a
                href={activeProject.demo ?? activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="group relative min-h-[310px] overflow-hidden rounded-xl border border-cyan-800/15 bg-slate-950 sm:min-h-[380px]"
                aria-label={`${t("Abrir demonstração do projeto")} ${activeProject.title}`}
              >
                {activeProject.image && (
                  <img
                    key={activeProject.title}
                    src={activeProject.image}
                    alt={`${t("Captura de tela do projeto")} ${activeProject.title}`}
                    className={`absolute inset-0 size-full opacity-75 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90 ${activeProject.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a12] via-[#020a12]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300">
                        {activeProject.kind}
                      </span>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                        {activeProject.title}
                      </h3>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                      <ExternalLink className="size-4" />
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300">
                    {t(activeProject.tagline)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeProject.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-cyan-200/15 bg-black/30 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-cyan-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>

              <div
                className="grid grid-cols-4 gap-2 sm:grid-cols-1"
                aria-label={language === "pt" ? "Selecionar projeto" : "Select project"}
              >
                {featuredProjects.map((project, index) => {
                  const isActive = index === activeProjectIndex;
                  return (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => setActiveProjectIndex(index)}
                      aria-label={`${language === "pt" ? "Mostrar" : "Show"} ${project.title}`}
                      aria-pressed={isActive}
                      className={`group relative min-h-16 overflow-hidden rounded-lg border transition sm:min-h-0 ${isActive ? "border-cyan-400 shadow-[0_0_18px_-7px_rgba(34,211,238,1)]" : "border-cyan-800/15 opacity-60 hover:opacity-100 dark:border-cyan-200/15"}`}
                    >
                      {project.image && (
                        <img
                          src={project.image}
                          alt=""
                          className="absolute inset-0 size-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute inset-0 bg-slate-950/45" />
                      <span className="absolute left-1.5 top-1.5 font-mono text-[8px] text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <div className="relative z-10 mt-10 grid gap-4 lg:mt-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.6fr)]">
          <section
            data-hero-panel
            aria-label={language === "pt" ? "Habilidades principais" : "Core skills"}
            className="rounded-2xl border border-cyan-700/20 bg-white/80 p-4 shadow-[0_18px_60px_-42px_rgba(8,145,178,0.8)] backdrop-blur-2xl dark:border-cyan-300/20 dark:bg-[#03121d]/76"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-cyan-700 dark:text-cyan-300" />
                <h2 className="font-mono text-[10px] uppercase tracking-[0.24em]">
                  {language === "pt" ? "Habilidades principais" : "Core skills"}
                </h2>
              </div>
              <a
                href="#skills"
                className="text-xs text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                {t("Ver todas as habilidades")}
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {CORE_SKILLS.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-cyan-800/10 bg-slate-950/[0.03] px-2 text-center dark:border-cyan-100/10 dark:bg-black/20"
                >
                  <Icon className="size-6 text-cyan-700 dark:text-cyan-300" aria-hidden="true" />
                  <span className="text-[10px] font-medium sm:text-xs">{name}</span>
                </div>
              ))}
            </div>
          </section>

          <aside
            data-hero-panel
            aria-label={language === "pt" ? "Mais sobre mim" : "More about me"}
            className="rounded-2xl border border-cyan-700/20 bg-white/80 p-4 shadow-[0_18px_60px_-42px_rgba(8,145,178,0.8)] backdrop-blur-2xl dark:border-cyan-300/20 dark:bg-[#03121d]/76"
          >
            <div className="flex items-center gap-2 border-b border-cyan-800/10 pb-3 dark:border-cyan-100/10">
              <UserRound className="size-4 text-cyan-700 dark:text-cyan-300" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.24em]">
                {language === "pt" ? "Mais sobre mim" : "More about me"}
              </h2>
            </div>
            <dl className="mt-3 grid gap-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500 dark:text-slate-400">
                  {language === "pt" ? "Idade" : "Age"}
                </dt>
                <dd>19 {language === "pt" ? "anos" : "years"}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <MapPin className="size-3.5" />
                  {t("Localização")}
                </dt>
                <dd>Barueri - SP</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500 dark:text-slate-400">Status</dt>
                <dd className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <CircleDot className="size-3 animate-pulse motion-reduce:animate-none" />
                  {language === "pt" ? "Disponível" : "Available"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="relative z-10 mt-5 flex flex-col items-center justify-between gap-4 text-slate-600 dark:text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg border border-cyan-800/15 bg-white/60 transition hover:-translate-y-0.5 hover:border-cyan-600/40 hover:text-cyan-700 dark:border-cyan-200/15 dark:bg-[#03121d]/60 dark:hover:border-cyan-200/40 dark:hover:text-cyan-200"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <a
            href="#about"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] transition hover:text-cyan-700 dark:hover:text-cyan-200"
          >
            {language === "pt" ? "Scroll para explorar" : "Scroll to explore"}
            <ArrowDown className="size-3.5 animate-bounce motion-reduce:animate-none" />
          </a>
          <p className="hidden max-w-xs text-right font-mono text-[9px] uppercase tracking-[0.18em] xl:block">
            {language === "pt"
              ? "Transformando ideias em interfaces reais."
              : "Turning ideas into real interfaces."}
          </p>
        </div>
      </div>
    </section>
  );
}
