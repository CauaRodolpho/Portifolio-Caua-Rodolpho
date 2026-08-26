import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../language-provider";
import { NAV_ITEMS } from "@/data/portfolio";

export function HudNav() {
  const ref = useRef<HTMLElement>(null);
  const { theme, toggle } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [active, setActive] = useState<string>("profile");

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      gsap.from(ref.current, {
        y: -24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });
    }

    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      ref={ref}
      aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94%,940px)]"
    >
      <div className="hud-panel hud-corner flex items-center justify-between gap-2 px-3 py-2">
        <a
          href="#profile"
          className="group flex items-center gap-2 rounded-lg px-2 py-1.5"
          aria-label={t("Início")}
        >
          <span className="relative flex size-6 items-center justify-center rounded-md border border-primary/40 font-display text-[10px] font-bold text-primary">
            CR
            <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            sys.caua
          </span>
        </a>

        <ul className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block whitespace-nowrap rounded-lg px-3 py-1.5 text-xs sm:text-[13px] transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{t(item.label)}</span>
                  <span
                    className={`absolute inset-0 rounded-lg bg-primary/10 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-primary transition-all duration-300 ${
                      isActive ? "w-8 shadow-[0_0_10px_currentColor]" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={
              language === "pt"
                ? "Switch portfolio to English"
                : "Traduzir portfólio para português"
            }
            title={language === "pt" ? "Switch to English" : "Mudar para português"}
            className="flex h-8 items-center gap-1 rounded-lg border border-border/60 px-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Languages className="size-3.5" />
            <span>{language === "pt" ? "EN" : "PT"}</span>
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={language === "pt" ? "Alternar tema" : "Toggle theme"}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
