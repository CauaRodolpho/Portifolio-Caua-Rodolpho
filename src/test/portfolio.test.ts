import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/portfolio";

describe("portfolio project data", () => {
  it("keeps the five projects shown by the carousel", () => {
    expect(PROJECTS).toHaveLength(5);
  });

  it("uses a unique title for every project", () => {
    const titles = PROJECTS.map((project) => project.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("provides valid GitHub links", () => {
    PROJECTS.forEach((project) => {
      expect(project.github).toMatch(/^https:\/\/github\.com\//);
    });
  });

  it("uses optimized WebP assets in every gallery", () => {
    PROJECTS.flatMap((project) => project.gallery ?? [])
      .filter((item) => item.src.startsWith("/"))
      .forEach((item) => {
        expect(item.src).toMatch(/\.webp$/);
      });
  });

  it("includes recruiter-facing technical context", () => {
    PROJECTS.forEach((project) => {
      expect(project.architecture.length).toBeGreaterThan(30);
      expect(project.problem.length).toBeGreaterThan(20);
      expect(project.learnings.length).toBeGreaterThan(20);
      expect(project.roadmap.length).toBeGreaterThan(0);
    });
  });
});
