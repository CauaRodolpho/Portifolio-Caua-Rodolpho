import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_STATES = {
  below: { autoAlpha: 0, y: 56, filter: "blur(8px)" },
  visible: { autoAlpha: 1, y: 0, filter: "blur(0px)" },
  above: { autoAlpha: 0.38, y: -36, filter: "blur(3px)" },
} as const;

const SECTION_TWEEN = {
  duration: 0.8,
  ease: "power3.out",
  overwrite: "auto" as const,
};

/**
 * Controls the directional entrance and exit of a portfolio section.
 * The inner content is animated so section spacing and local animations remain intact.
 */
export function useSectionTransition(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    const content = section?.querySelector<HTMLElement>("[data-section-content]");

    if (!section || !content) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      gsap.set(content, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const viewportHeight = window.innerHeight;
      const bounds = section.getBoundingClientRect();

      if (bounds.top >= viewportHeight) {
        gsap.set(content, SECTION_STATES.below);
      } else if (bounds.bottom <= 0) {
        gsap.set(content, SECTION_STATES.above);
      } else {
        gsap.set(content, SECTION_STATES.visible);
      }

      const animateTo = (state: (typeof SECTION_STATES)[keyof typeof SECTION_STATES]) => {
        gsap.to(content, { ...state, ...SECTION_TWEEN });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: () => animateTo(SECTION_STATES.visible),
        onLeave: () => animateTo(SECTION_STATES.above),
        onEnterBack: () => animateTo(SECTION_STATES.visible),
        onLeaveBack: () => animateTo(SECTION_STATES.below),
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
