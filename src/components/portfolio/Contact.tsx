import { useRef } from "react";
import { Github, Linkedin, Mail, MessageCircle, FileText, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { CONTACT_EMAIL, getGmailComposeUrl, PROFILE } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

const CHANNELS = [
  {
    label: "LinkedIn",
    value: "in/cauã-rodolpho",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/cauã-rodolpho/",
  },
  {
    label: "GitHub",
    value: "@CauaRodolpho",
    icon: Github,
    href: "https://github.com/CauaRodolpho",
  },
  {
    label: "Gmail",
    value: CONTACT_EMAIL,
    icon: Mail,
    href: "",
  },
  {
    label: "WhatsApp",
    value: "Solicitar orçamento",
    icon: MessageCircle,
    href: "https://wa.me/5516996247033?text=Olá%20Cauã!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.",
  },
  {
    label: "Currículo",
    value: "Baixar PDF",
    icon: FileText,
    href: "/curriculo-caua-rodolpho.pdf",
    download: "curriculo-caua-rodolpho.pdf",
  },
];

const SERVICES = ["Landing Pages", "Sites institucionais", "Interfaces React"] as const;

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { language, t } = useLanguage();
  const resumeHref =
    language === "pt" ? "/curriculo-caua-rodolpho.pdf" : "/caua-rodolpho-resume-en.pdf";
  const resumeFilename =
    language === "pt" ? "curriculo-caua-rodolpho.pdf" : "caua-rodolpho-resume-en.pdf";

  return (
    <div ref={root}>
      <Section id="contact" className="pb-16">
        <SectionHeader
          code={t("P07 · Comunicação")}
          title={t("Canal de comunicação aberto")}
          subtitle={t("Aberto a oportunidades Front-End, colaborações e novos projetos freelance.")}
        />

        <Panel className="overflow-hidden p-7 sm:p-10">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-success shadow-[0_0_10px_currentColor]" />
                <span className="hud-label">
                  status:{" "}
                  {language === "pt" ? PROFILE.status : "AVAILABLE FOR OPPORTUNITIES AND PROJECTS"}{" "}
                  · {t("aceitando missões")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                {t("Vamos construir algo que")} <span className="text-gradient">{t("dure")}</span>.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t(
                  "Disponível para oportunidades e projetos freelance. Desenvolvo landing pages, sites institucionais e interfaces responsivas, transformando ideias em experiências digitais modernas e funcionais.",
                )}
              </p>
              <div
                className="mt-5 flex flex-wrap gap-2"
                aria-label={t("Serviços freelance disponíveis")}
              >
                {SERVICES.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary"
                  >
                    {t(service)}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal-group className="grid gap-2 sm:grid-cols-2">
              {CHANNELS.map((c) => {
                const isResume = c.label === "Currículo";
                const isGmail = c.label === "Gmail";
                const href = isResume
                  ? resumeHref
                  : isGmail
                    ? getGmailComposeUrl(language)
                    : c.href;
                return (
                  <a
                    key={c.label}
                    data-reveal-item
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    download={isResume ? resumeFilename : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_26px_-12px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
                  >
                    <c.icon className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="hud-label block">{t(c.label)}</span>
                      <span className="block truncate text-xs text-foreground">{t(c.value)}</span>
                    </span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </Panel>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6">
          <span className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name} · {t(PROFILE.role)}
          </span>
          <span className="hud-label">system v2.0 · all systems nominal</span>
        </footer>
      </Section>
    </div>
  );
}
