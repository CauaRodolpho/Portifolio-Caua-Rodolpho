import { useRef } from "react";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import { Section, SectionHeader, Panel } from "./Panel";
import { useReveal } from "@/hooks/useReveal";
import { ACHIEVEMENTS, COURSES_IN_PROGRESS, EDUCATION } from "@/data/portfolio";
import { useLanguage } from "../language-provider";

function formatCompletionDate(value: string, language: "pt" | "en") {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function Achievements() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { language, t } = useLanguage();

  return (
    <div ref={root}>
      <Section id="certifications">
        <SectionHeader
          code={t("P06 · Conquistas")}
          title={t("Cursos e certificações")}
          subtitle={t(
            "Formações que registram minha evolução em JavaScript, React, Inteligência Artificial e desenvolvimento de projetos.",
          )}
        />

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
              <GraduationCap className="size-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold">{t("Formação acadêmica")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("Graduação que estou cursando atualmente.")}
              </p>
            </div>
          </div>

          <div data-reveal-group className="grid gap-3">
            {EDUCATION.map((education) => (
              <div key={education.title} data-reveal-item>
                <Panel className="border-accent/30 p-5 transition-all hover:-translate-y-1 hover:border-accent/60">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 size-2 shrink-0 animate-pulse rounded-full bg-accent shadow-[0_0_12px_currentColor]" />
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        {education.institution}
                      </span>
                      <h4 className="mt-1 font-display text-sm font-semibold">
                        {t(education.title)}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {t(education.desc)}
                      </p>
                      <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        {t("Em andamento")}
                      </span>
                    </div>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal-group className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            return (
              <div key={a.title} data-reveal-item>
                <Panel className="h-full p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-success/40 bg-success/10 text-success">
                      <Award className="size-4" />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-success">
                        {a.institution}
                      </span>
                      <h3 className="font-display text-sm font-semibold">{t(a.title)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {t(a.desc)}
                      </p>
                      <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {"completedAt" in a
                          ? `${t("Concluída em")} ${formatCompletionDate(a.completedAt, language)}`
                          : t("Certificação concluída")}
                      </span>
                    </div>
                  </div>
                </Panel>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
              <BookOpen className="size-4" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold">
                {t("Formações em andamento")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("Conhecimentos que estou desenvolvendo atualmente.")}
              </p>
            </div>
          </div>

          <div data-reveal-group className="grid gap-3 sm:grid-cols-2">
            {COURSES_IN_PROGRESS.map((course) => (
              <div key={course.title} data-reveal-item>
                <Panel className="h-full border-primary/30 p-5 transition-all hover:-translate-y-1 hover:border-primary/60">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 size-2 shrink-0 animate-pulse rounded-full bg-primary shadow-[0_0_12px_currentColor]" />
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                        {t(course.category)} · {course.institution}
                      </span>
                      <h4 className="font-display text-sm font-semibold">{t(course.title)}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {t(course.desc)}
                      </p>
                      <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                        {t("Em andamento")}
                      </span>
                    </div>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
