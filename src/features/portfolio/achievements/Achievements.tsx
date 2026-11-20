import { useRef } from "react";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { ACHIEVEMENTS, COURSES_IN_PROGRESS, EDUCATION } from "@/data/portfolio";
import { useLanguage } from "@/components/language-provider";

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
  useReveal(root, true, "subtle");
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
            <span className="flex size-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
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
                <div className="h-full border-b border-border/60 px-1 py-4 sm:px-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <GraduationCap className="size-4" aria-hidden="true" />
                    </span>
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
                      <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                        {t(education.period)}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                        {t("Em andamento")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
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

          <div data-reveal-group className="grid gap-x-8 sm:grid-cols-2">
            {COURSES_IN_PROGRESS.map((course) => (
              <div key={course.title} data-reveal-item>
                <div className="h-full border-b border-border/60 px-1 py-4 sm:px-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BookOpen className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                        {t(course.category)} · {course.institution}
                      </span>
                      <h4 className="font-display text-sm font-semibold">{t(course.title)}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {t(course.desc)}
                      </p>
                      <span className="mt-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                        {t("Em andamento")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h3 className="mb-4 flex items-center gap-3 font-display text-base font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
              <Award className="size-4" aria-hidden="true" />
            </span>
            {language === "pt" ? "Certificações concluídas" : "Completed certifications"}
          </h3>
          <div data-reveal-group className="grid gap-x-8 sm:grid-cols-2">
            {[...ACHIEVEMENTS]
              .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
              .map((a) => {
                return (
                  <div key={a.title} data-reveal-item>
                    <div className="h-full border-b border-border/60 px-1 py-4 sm:px-3">
                      <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
                          <Award className="size-4" />
                        </span>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-success">
                            {a.institution}
                          </span>
                          <h4 className="font-display text-sm font-semibold">{t(a.title)}</h4>
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
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Section>
    </div>
  );
}
