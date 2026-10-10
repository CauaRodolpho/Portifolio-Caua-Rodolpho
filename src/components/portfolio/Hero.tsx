import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Code2,
  Download,
  Layers3,
  Mail,
  MapPin,
  Radar,
  Sparkles,
  Star,
} from "lucide-react";
import { useGitHubPortfolio } from "@/hooks/useGitHubPortfolio";
import { PROFILE } from "@/data/portfolio";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../language-provider";

const SKILL_SNAPSHOT = [
  { name: "React", status: "Praticando" },
  { name: "TypeScript", status: "Praticando" },
  { name: "Next.js", status: "Estudando" },
  { name: "Tailwind CSS", status: "Praticando" },
  { name: "GSAP", status: "Estudando" },
] as const;

const FEATURED_PROJECTS = [
  {
    name: "AuthFlow",
    repository: "authflow-fullstack",
    description: "Autenticação e gestão Full Stack",
  },
  { name: "Chronos", repository: "Chronos.ia", description: "Produtividade integrada à IA" },
  { name: "FlowView", repository: "FlowView", description: "Dashboards personalizáveis" },
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
  const { data: githubData } = useGitHubPortfolio();
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const resumeHref =
    language === "pt" ? "/curriculo-caua-rodolpho.pdf" : "/caua-rodolpho-resume-en.pdf";
  const resumeFilename =
    language === "pt" ? "curriculo-caua-rodolpho.pdf" : "caua-rodolpho-resume-en.pdf";
  const isDark = theme === "dark";
  const heroVideo = isDark ? "/hero-hologram.mp4" : "/hero-hologram-light.mp4";
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
      gsap.to(glow, { opacity: 0.82, duration: 0.25 });
    };
    const hideGlow = () => gsap.to(glow, { opacity: 0, duration: 0.3 });
    const pressGlow = () => gsap.to(glow, { scale: 0.78, duration: 0.12 });
    const releaseGlow = () => gsap.to(glow, { scale: 1, duration: 0.25, ease: "back.out(2)" });

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerenter", showGlow);
    section.addEventListener("pointerleave", hideGlow);
    section.addEventListener("pointerdown", pressGlow);
    section.addEventListener("pointerup", releaseGlow);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerenter", showGlow);
      section.removeEventListener("pointerleave", hideGlow);
      section.removeEventListener("pointerdown", pressGlow);
      section.removeEventListener("pointerup", releaseGlow);
      gsap.killTweensOf(glow);
    };
  }, []);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out", clearProps: "opacity,transform,filter" },
      });

      timeline
        .fromTo("[data-hero-eyebrow]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(
          "[data-hero-name] [data-char]",
          { opacity: 0, y: 24, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.025 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-role], [data-hero-desc]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-panel]",
          { opacity: 0, y: 20, filter: "blur(7px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.12 },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-status]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        );

      gsap.to("[data-orbit-slow]", { rotate: 360, duration: 42, repeat: -1, ease: "none" });
      gsap.to("[data-orbit-fast]", { rotate: -360, duration: 24, repeat: -1, ease: "none" });
    }, root);

    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={root}
      id="profile"
      className="relative min-h-[820px] scroll-mt-28 overflow-hidden bg-slate-100 px-4 pb-8 pt-28 text-slate-950 dark:bg-[#020a12] dark:text-white sm:px-6 lg:min-h-screen lg:pt-32"
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

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.78)_0%,rgba(248,250,252,0.28)_34%,rgba(248,250,252,0.08)_58%,rgba(248,250,252,0.9)_100%)] dark:bg-[linear-gradient(180deg,rgba(1,8,15,0.72)_0%,rgba(1,9,16,0.34)_34%,rgba(1,8,15,0.18)_58%,rgba(1,8,15,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(248,250,252,0.08)_52%,rgba(226,232,240,0.72)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_12%,rgba(1,8,15,0.2)_52%,rgba(1,8,15,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10 dark:opacity-25" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-5 dark:opacity-20" />

      <div ref={cursorGlow} className="hero-cursor-glow" aria-hidden="true" />

      <div className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 opacity-60">
        <div className="relative size-[min(72vw,720px)]">
          <div
            data-orbit-slow
            className="absolute inset-0 rounded-full border border-cyan-300/15"
            style={{ borderStyle: "dashed" }}
          />
          <div
            data-orbit-fast
            className="absolute inset-[13%] rounded-full border border-cyan-300/10"
          />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[680px] w-full max-w-7xl flex-col lg:min-h-[calc(100vh-10rem)]">
        <div className="relative z-20 mx-auto max-w-3xl text-center">
          <div
            data-hero-eyebrow
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-700/25 bg-white/70 px-4 py-2 backdrop-blur-xl dark:border-cyan-300/30 dark:bg-[#03121d]/65"
          >
            <Code2 className="size-3.5 text-cyan-700 dark:text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-900 dark:text-cyan-200 sm:text-xs">
              {t("Desenvolvedor Front-End Júnior")}
            </span>
          </div>

          <h1
            data-hero-name
            className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
          >
            <span
              className="block"
              style={{
                textShadow: isDark
                  ? "0 2px 28px rgba(80, 220, 255, 0.48), 0 2px 5px #00101a"
                  : "0 2px 24px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.9)",
              }}
            >
              {splitChars("Cauã Rodolpho")}
            </span>
          </h1>

          <p
            data-hero-role
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-900 dark:text-cyan-200 sm:text-xs"
          >
            {t("React · TypeScript · Experiências digitais")}
          </p>

          <p
            data-hero-desc
            className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-800 dark:font-normal dark:text-slate-200 sm:text-base"
          >
            {t(PROFILE.summary)}{" "}
            {t(
              "Busco minha primeira oportunidade para contribuir com produtos reais e evoluir junto a um time de tecnologia.",
            )}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-700/25 bg-white/75 px-5 py-3 text-sm font-medium text-slate-950 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-700/50 hover:bg-white/90 dark:border-cyan-200/30 dark:bg-[#03121d]/65 dark:text-white dark:hover:border-cyan-200/60 dark:hover:bg-cyan-300/10"
            >
              <Download className="size-4 text-cyan-700 dark:text-cyan-300" />
              {t("Baixar currículo")}
            </a>
            <a
              data-hero-cta
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-700/25 bg-white/75 px-5 py-3 text-sm font-medium text-slate-950 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-700/50 hover:bg-white/90 dark:border-cyan-200/30 dark:bg-[#03121d]/65 dark:text-white dark:hover:border-cyan-200/60 dark:hover:bg-cyan-300/10"
            >
              <Mail className="size-4 text-cyan-700 dark:text-cyan-300" />
              {t("Contato")}
            </a>
          </div>
        </div>

        <aside
          data-hero-panel
          aria-label={t("Resumo de habilidades")}
          className="absolute left-0 top-[42%] hidden w-64 rounded-2xl border border-cyan-300/25 bg-[#03121d]/68 p-5 shadow-[0_20px_70px_-35px_rgba(34,211,238,0.8)] backdrop-blur-xl lg:block"
        >
          <div className="flex items-center gap-2 border-b border-cyan-200/15 pb-3">
            <Code2 className="size-4 text-cyan-300" />
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">
              {t("Habilidades")}
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {SKILL_SNAPSHOT.map((skill) => (
              <li key={skill.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-100">{skill.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300/80">
                  {t(skill.status)}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#skills"
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200"
          >
            {t("Ver todas as habilidades")} <ArrowRight className="size-3.5" />
          </a>
        </aside>

        <aside
          data-hero-panel
          aria-label={t("Projetos em destaque")}
          className="absolute right-0 top-[38%] hidden w-72 rounded-2xl border border-cyan-300/25 bg-[#03121d]/68 p-5 shadow-[0_20px_70px_-35px_rgba(34,211,238,0.8)] backdrop-blur-xl lg:block"
        >
          <div className="flex items-center gap-2 border-b border-cyan-200/15 pb-3">
            <Layers3 className="size-4 text-cyan-300" />
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">
              {t("Projetos")}
            </h2>
          </div>
          <ul className="mt-3 space-y-2">
            {FEATURED_PROJECTS.map((project) => {
              const repository = githubData?.repositories.find(
                (item) => item.name.toLowerCase() === project.repository.toLowerCase(),
              );
              return (
                <li
                  key={project.name}
                  className="rounded-xl border border-cyan-200/10 bg-black/20 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{project.name}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-cyan-300">
                      {repository ? (
                        <>
                          <Star className="size-3" /> {repository.stargazers_count}
                        </>
                      ) : (
                        <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_currentColor]" />
                      )}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10px] text-slate-400">
                    {language === "pt" && repository?.description
                      ? repository.description
                      : t(project.description)}
                  </p>
                </li>
              );
            })}
          </ul>
          <a
            href="#projects"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200"
          >
            {t("Explorar projetos")} <ArrowRight className="size-3.5" />
          </a>
        </aside>

        <div className="mt-auto pt-44 sm:pt-52 lg:pt-0">
          <div
            data-hero-status
            className="mx-auto grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-200/10 shadow-[0_20px_70px_-40px_rgba(34,211,238,0.8)] backdrop-blur-xl sm:grid-cols-3"
          >
            <div className="bg-[#03121d]/75 px-4 py-3.5">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">
                Status
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-100">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_currentColor]" />
                {t("Disponível para oportunidades")}
              </div>
            </div>
            <div className="bg-[#03121d]/75 px-4 py-3.5">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">
                {t("Localização")}
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-100">
                <MapPin className="size-3.5 text-cyan-300" /> Barueri - SP
              </div>
            </div>
            <div className="bg-[#03121d]/75 px-4 py-3.5">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">
                {t("Foco atual")}
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-100">
                <Radar className="size-3.5 text-cyan-300" /> React + TypeScript
              </div>
            </div>
          </div>

          <a
            href="#about"
            className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-cyan-200/15 bg-[#03121d]/50 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 backdrop-blur-md transition-colors hover:border-cyan-200/40 hover:text-cyan-200"
          >
            <Sparkles className="size-3.5 text-cyan-300" />
            {t("Continue explorando")}
          </a>
        </div>
      </div>
    </section>
  );
}
