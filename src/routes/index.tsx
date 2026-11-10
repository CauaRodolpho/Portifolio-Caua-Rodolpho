import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { BootSequence } from "@/features/portfolio/boot/BootSequence";
import { HudNav } from "@/features/portfolio/navigation/HudNav";
import { Hero } from "@/features/portfolio/hero/Hero";
import { About } from "@/features/portfolio/about/About";
import {
  PERSON_STRUCTURED_DATA,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/lib/seo/site";

const Projects = lazy(() =>
  import("@/features/portfolio/projects/Projects").then((module) => ({
    default: module.Projects,
  })),
);
const Skills = lazy(() =>
  import("@/features/portfolio/skills/Skills").then((module) => ({
    default: module.Skills,
  })),
);
const Timeline = lazy(() =>
  import("@/features/portfolio/timeline/Timeline").then((module) => ({
    default: module.Timeline,
  })),
);
const Achievements = lazy(() =>
  import("@/features/portfolio/achievements/Achievements").then((module) => ({
    default: module.Achievements,
  })),
);
const Contact = lazy(() =>
  import("@/features/portfolio/contact/Contact").then((module) => ({
    default: module.Contact,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SOCIAL_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(PERSON_STRUCTURED_DATA),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const handleDone = useCallback(() => setBooted(true), []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {!booted && <BootSequence onDone={handleDone} />}
        <main
          className="relative min-h-screen transition-opacity duration-700"
          style={{ opacity: booted ? 1 : 0 }}
          aria-hidden={!booted}
          inert={!booted}
        >
          <div className="pointer-events-none fixed inset-0 scanlines opacity-[0.05]" />
          <HudNav />
          <Hero start={booted} />
          <About />
          <Suspense fallback={<SectionFallback />}>
            <Projects />
            <Skills />
            <Timeline />
            <Achievements />
            <Contact />
          </Suspense>
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function SectionFallback() {
  return (
    <div className="mx-auto min-h-48 w-full max-w-6xl px-6 py-24" aria-live="polite">
      <div className="h-1 w-24 animate-pulse rounded-full bg-primary/50" />
      <span className="sr-only">Carregando conteúdo do portfólio</span>
    </div>
  );
}
