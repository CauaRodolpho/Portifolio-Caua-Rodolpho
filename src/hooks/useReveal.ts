import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(
  root: RefObject<HTMLElement | null>,
  enabled = true,
  variant: "default" | "subtle" = "default",
) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {}, root);
    const revealItems = (items: Element[]) => {
      ctx.add(() =>
        gsap.fromTo(
          items,
          { y: 10, opacity: 0.6 },
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.045,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
        ),
      );
    };
    ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            clearProps: "opacity,transform,filter",
            scrollTrigger: { trigger: el, start: "top 92%" },
          },
        );
      });
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      if (variant === "subtle") {
        ScrollTrigger.batch(root.current?.querySelectorAll("[data-reveal-item]") ?? [], {
          start: "top 94%",
          once: true,
          batchMax: 6,
          onEnter: revealItems,
        });
        return;
      }
      groups.forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll("[data-reveal-item]"),
          { y: 40, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,transform,filter",
            scrollTrigger: { trigger: group, start: "top 92%" },
          },
        );
      });
      ScrollTrigger.refresh();
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [root, enabled, variant]);
}
