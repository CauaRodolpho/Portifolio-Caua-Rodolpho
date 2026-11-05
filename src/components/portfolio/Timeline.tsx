import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  Code2,
  Crosshair,
  Database,
  Flame,
  LockKeyhole,
  Navigation,
  Route,
  Server,
} from "lucide-react";
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
  const routePulse = useRef<SVGPathElement>(null);
  const routeMarker = useRef<SVGGElement>(null);
  const mobileProgress = useRef<HTMLDivElement>(null);
  const mobileMarker = useRef<HTMLDivElement>(null);
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
    const pulse = routePulse.current;
    const marker = routeMarker.current;
    const mobileLine = mobileProgress.current;
    const mobileDot = mobileMarker.current;
    if (!element || !path || !progress || !pulse || !marker || !mobileLine || !mobileDot) return;

    const length = path.getTotalLength();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-journey-card]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-journey-step]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-journey-node]");
      const mm = gsap.matchMedia();

      const paintSteps = (progressValue: number) => {
        const activeIndex = Math.min(steps.length - 1, Math.floor(progressValue * steps.length));
        steps.forEach((step, index) => {
          const isFinalLocked = step.dataset.future === "true";
          const state = isFinalLocked
            ? "locked"
            : index < activeIndex
              ? "reached"
              : index === activeIndex
                ? "active"
                : "waiting";
          step.dataset.trailState = state;
        });
      };

      gsap.set([progress, pulse], { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(mobileLine, { scaleY: 0, transformOrigin: "top" });
      paintSteps(0);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hoverCleanups: Array<() => void> = [];
        const travel = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-journey-map]",
            start: "top 62%",
            end: "bottom 66%",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => paintSteps(self.progress),
            onLeaveBack: () => paintSteps(0),
          },
        });

        travel
          .to(progress, { strokeDashoffset: 0 }, 0)
          .to(pulse, { strokeDashoffset: -length }, 0)
          .to(
            marker,
            {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
            },
            0,
          )
          .to(mobileLine, { scaleY: 1 }, 0)
          .to(
            mobileDot,
            {
              y: () =>
                Math.max(
                  0,
                  (element.querySelector<HTMLElement>("[data-journey-map]")?.offsetHeight ?? 0) -
                    96,
                ),
            },
            0,
          );

        cards.forEach((card) => {
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
              scrollTrigger: {
                trigger: card,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: "back.out(1.8)",
              scrollTrigger: {
                trigger: node,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        cards.forEach((card) => {
          const xTo = gsap.quickTo(card, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            const bounds = card.getBoundingClientRect();
            xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
            yTo(((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          hoverCleanups.push(() => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          });
        });

        return () => hoverCleanups.forEach((cleanup) => cleanup());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([progress, mobileLine], { strokeDashoffset: 0, scaleY: 1 });
        gsap.set(cards, { opacity: 1, clearProps: "transform" });
        paintSteps(1);
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
            <path
              ref={routePulse}
              d={PATH}
              fill="none"
              stroke="var(--background)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 28"
              vectorEffect="non-scaling-stroke"
              opacity="0.9"
            />
            <g ref={routeMarker}>
              <path
                d="m3 11 19-9-9 19-2-8-8-2Z"
                transform="translate(-12 -12) rotate(45 12 12) scale(1.15)"
                fill="var(--background)"
                stroke="var(--primary)"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter={`url(#${routeId}-glow)`}
              />
            </g>
          </svg>

          <div
            className="absolute bottom-8 left-6 top-8 w-px bg-border md:hidden"
            aria-hidden="true"
          >
            <div
              ref={mobileProgress}
              className="h-full w-px bg-gradient-to-b from-primary via-accent to-success shadow-[0_0_12px_var(--primary)]"
            />
            <div
              ref={mobileMarker}
              className="absolute -left-[11px] top-0 z-30 flex size-6 items-center justify-center text-primary drop-shadow-[0_0_8px_var(--primary)]"
            >
              <Navigation className="size-6 rotate-[135deg] fill-background stroke-[2.25]" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            <Code2 className="absolute left-[7%] top-[9%] size-5 text-primary/20" />
            <Database className="absolute right-[8%] top-[34%] size-5 text-accent/20" />
            <Server className="absolute left-[9%] top-[66%] size-5 text-primary/20" />
            <Flame className="absolute right-[9%] top-[88%] size-5 text-success/25" />
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
                  data-journey-step
                  data-future={future}
                  data-trail-state={future ? "locked" : "waiting"}
                  className={`group relative min-h-48 pl-16 md:grid md:min-h-[204px] md:grid-cols-[1fr_84px_1fr] md:items-center md:pl-0 ${
                    even ? "md:[&>article]:col-start-1" : "md:[&>article]:col-start-3"
                  }`}
                >
                  <div
                    data-journey-node
                    className={`absolute left-6 top-8 z-20 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-background transition-[border-color,color,box-shadow,transform] duration-500 group-data-[trail-state=waiting]:scale-90 group-data-[trail-state=waiting]:border-border group-data-[trail-state=waiting]:text-muted-foreground group-data-[trail-state=active]:scale-110 group-data-[trail-state=active]:border-primary group-data-[trail-state=active]:text-primary group-data-[trail-state=active]:shadow-glow md:left-1/2 md:top-1/2 md:-translate-y-1/2 ${
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

                  <article
                    data-journey-card
                    className="md:row-start-1 transition-[filter,opacity] duration-500 group-data-[trail-state=waiting]:opacity-55 group-data-[trail-state=waiting]:grayscale-[.35] group-data-[trail-state=locked]:opacity-45"
                  >
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
