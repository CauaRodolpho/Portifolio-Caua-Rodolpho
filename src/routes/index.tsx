import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { BootSequence } from "@/components/portfolio/BootSequence";
import { HudNav } from "@/components/portfolio/HudNav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Timeline } from "@/components/portfolio/Timeline";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";

const SITE_URL = "https://caua-rodolpho.vercel.app/";
const TITLE = "Cauã Rodolpho — Desenvolvedor Front-End Júnior";
const DESC =
  "Portfólio de Cauã Rodolpho, Desenvolvedor Front-End Júnior em evolução para Full Stack. Conheça o AuthFlow, Chronos, Nexus Cloud e outros projetos em React, TypeScript e Node.js.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Cauã Rodolpho",
          jobTitle: "Desenvolvedor Front-End Júnior",
          url: SITE_URL,
          sameAs: [
            "https://github.com/CauaRodolpho",
            "https://www.linkedin.com/in/cau%C3%A3-rodolpho/",
          ],
          knowsAbout: [
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "MongoDB",
            "GSAP",
          ],
        }),
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
          <Projects />
          <Skills />
          <Timeline />
          <Achievements />
          <Contact />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
