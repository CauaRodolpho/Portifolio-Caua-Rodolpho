import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(root: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
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
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [root, enabled]);
}
