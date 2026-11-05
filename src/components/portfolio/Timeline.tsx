import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Crosshair, LockKeyhole, Route } from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { TIMELINE } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const PATH =
  "M 500 70 C 500 150 720 145 720 255 C 720 365 280 365 280 485 C 280 605 720 595 720 715 C 720 835 280 825 280 945 C 280 1065 720 1055 720 1175 C 720 1295 280 1285 280 1405 C 280 1525 720 1515 720 1635 C 720 1755 280 1745 280 1865 C 280 1985 500 1995 500 2110";

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const routePath = useRef<SVGPathElement>(null);
  const routeProgress = useRef<SVGPathElement>(null);
  const routeMarker = useRef<SVGGElement>(null);
  const routeId = useId().replace(/:/g, "");
  const { language, t: tr } = useLanguage();
  const copy =
    language === "pt"
      ? {
          code: "P05 · Mapa de progressão",
          title: "Trilha de evolução",
          subtitle:
            "Cada checkpoint representa uma habilidade conquistada, um projeto construído e um novo desafio desbloqueado.",
          map: "Mapa da jornada",
          summary: "9 checkpoints alcançados · 1 próxima missão",
          progress: "Progresso em andamento",
          checkpoint: "Checkpoint",
          completed: "Concluído",
          current: "Em andamento",
          locked: "Bloqueado",
          continues: "A jornada continua",
        }
      : {
          code: "P05 · Progress map",
          title: "Growth trail",
          subtitle:
            "Each checkpoint represents a skill earned, a project built, and a new challenge unlocked.",
          map: "Journey map",
          summary: "9 checkpoints reached · 1 next mission",
          progress: "Progress in motion",
          checkpoint: "Checkpoint",
          completed: "Completed",
          current: "In progress",
          locked: "Locked",
          continues: "The journey continues",
        };

  useEffect(() => {
    const element = root.current;
    const path = routePath.current;
    const progress = routeProgress.current;
    const marker = routeMarker.current;
    if (!element || !path || !progress || !marker) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    gsap.set(progress, { strokeDasharray: length, strokeDashoffset: reducedMotion ? 0 : length });
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const travel = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "[data-journey-map]",
          start: "top 62%",
          end: "bottom 66%",
          scrub: 0.8,
        },
      });

      travel
        .to(progress, { strokeDashoffset: 0 }, 0)
        .to(marker, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] } }, 0);

      gsap.utils.toArray<HTMLElement>("[data-journey-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 42, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: card, start: "top 86%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-journey-node]").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: node, start: "top 78%" },
          },
        );
      });
    }, element);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root}>
      <Section id="timeline" className="overflow-hidden">
        <SectionHeader code={copy.code} title={copy.title} subtitle={copy.subtitle} />

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/[0.035] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <Route className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">{copy.map}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {copy.summary}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-success">
            {copy.progress}
          </span>
        </div>

        <div data-journey-map className="relative mx-auto max-w-5xl">
          <svg
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-full -translate-x-1/2 overflow-visible md:block"
            viewBox="0 0 1000 2180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id={`${routeId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id={`${routeId}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="78%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--success)" />
              </linearGradient>
            </defs>
            <path
              ref={routePath}
              d={PATH}
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
              strokeDasharray="10 15"
              vectorEffect="non-scaling-stroke"
              opacity="0.75"
            />
            <path
              ref={routeProgress}
              d={PATH}
              fill="none"
              stroke={`url(#${routeId}-gradient)`}
              strokeWidth="6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter={`url(#${routeId}-glow)`}
            />
            <g ref={routeMarker}>
              <circle
                r="22"
                fill="var(--background)"
                stroke="var(--primary)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="10" fill="var(--primary)" opacity="0.22" />
              <circle r="4" fill="var(--primary)" />
            </g>
          </svg>

          <div
            className="absolute bottom-8 left-6 top-8 w-px bg-border md:hidden"
            aria-hidden="true"
          >
            <div className="h-full w-px bg-gradient-to-b from-primary via-accent to-success" />
          </div>

          <ol className="relative space-y-8 md:space-y-12">
            {TIMELINE.map((item, index) => {
              const future = item.level === "Next";
              const current = item.level === "Current";
              const even = index % 2 === 0;
              const status = future ? copy.locked : current ? copy.current : copy.completed;
              return (
                <li
                  key={item.title}
                  className={`relative min-h-48 pl-16 md:grid md:min-h-[204px] md:grid-cols-[1fr_84px_1fr] md:items-center md:pl-0 ${
                    even ? "md:[&>article]:col-start-1" : "md:[&>article]:col-start-3"
                  }`}
                >
                  <div
                    data-journey-node
                    className={`absolute left-6 top-8 z-20 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-background md:left-1/2 md:top-1/2 md:-translate-y-1/2 ${
                      future
                        ? "border-border text-muted-foreground"
                        : current
                          ? "border-primary text-primary shadow-[0_0_26px_-4px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
                          : "border-primary/70 text-primary shadow-[0_0_18px_-5px_color-mix(in_oklab,var(--primary)_65%,transparent)]"
                    }`}
                    aria-hidden="true"
                  >
                    {future ? (
                      <LockKeyhole className="size-4" />
                    ) : current ? (
                      <Crosshair className="size-5 animate-pulse" />
                    ) : (
                      <Check className="size-5" />
                    )}
                  </div>

                  <article data-journey-card className="md:row-start-1">
                    <Panel
                      className={`group relative p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                        current
                          ? "border-primary/45 shadow-[0_18px_70px_-45px_color-mix(in_oklab,var(--primary)_65%,transparent)]"
                          : future
                            ? "border-dashed opacity-80"
                            : "hover:border-primary/45"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                          {copy.checkpoint} {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] ${future ? "border-border text-muted-foreground" : current ? "border-primary/35 bg-primary/10 text-primary" : "border-success/30 bg-success/10 text-success"}`}
                        >
                          {status}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-semibold sm:text-xl">
                        {tr(item.title)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {tr(item.desc)}
                      </p>
                      <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
                        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary/85">
                          {tr(item.period)}
                        </p>
                      </div>
                    </Panel>
                  </article>
                </li>
              );
            })}
          </ol>

          <div className="relative z-20 mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-primary/35 bg-background px-5 py-3 shadow-glow">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              {copy.continues}
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}
