import { useEffect, useState } from "react";

const GITHUB_USERNAME = "CauaRodolpho";
const CACHE_KEY = "portfolio:github:v3";
const CACHE_DURATION = 6 * 60 * 60 * 1000;

export type GitHubProfile = {
  login: string;
  html_url: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  default_branch: string;
  open_graph_image_url?: string;
};

export type GitHubPortfolioData = {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  languageBytes: Record<string, number>;
  fetchedAt: number;
};

type GitHubPortfolioState = {
  data: GitHubPortfolioData | null;
  loading: boolean;
  error: string | null;
};

let inFlightRequest: Promise<GitHubPortfolioData> | null = null;

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub respondeu com status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function readCache(): GitHubPortfolioData | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as GitHubPortfolioData;
    if (Date.now() - cached.fetchedAt > CACHE_DURATION) return null;
    return cached;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubPortfolioData) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // O portfólio continua funcional quando o armazenamento estiver indisponível.
  }
}

async function fetchGitHubPortfolio(): Promise<GitHubPortfolioData> {
  const [profile, repositories] = await Promise.all([
    getJson<GitHubProfile>(`https://api.github.com/users/${GITHUB_USERNAME}`),
    getJson<GitHubRepository[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    ),
  ]);

  const sourceRepositories = repositories
    .filter((repository) => !repository.fork && !repository.archived)
    .slice(0, 12);

  const languageResponses = await Promise.allSettled(
    sourceRepositories.map((repository) =>
      getJson<Record<string, number>>(repository.languages_url),
    ),
  );

  const languageBytes = languageResponses.reduce<Record<string, number>>((total, response) => {
    if (response.status !== "fulfilled") return total;
    Object.entries(response.value).forEach(([language, bytes]) => {
      total[language] = (total[language] ?? 0) + bytes;
    });
    return total;
  }, {});

  return {
    profile,
    repositories: sourceRepositories,
    languageBytes,
    fetchedAt: Date.now(),
  };
}

function loadGitHubPortfolio() {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  if (!inFlightRequest) {
    inFlightRequest = fetchGitHubPortfolio().finally(() => {
      inFlightRequest = null;
    });
  }
  return inFlightRequest;
}

export function useGitHubPortfolio(): GitHubPortfolioState {
  const [state, setState] = useState<GitHubPortfolioState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    loadGitHubPortfolio()
      .then((data) => {
        if (!active) return;
        writeCache(data);
        setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Não foi possível consultar o GitHub",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

export function getRepositoryByUrl(repositories: GitHubRepository[], githubUrl: string) {
  const repositoryName = githubUrl.split("/").filter(Boolean).at(-1)?.toLowerCase();
  return repositories.find((repository) => repository.name.toLowerCase() === repositoryName);
}

export function getLanguageDistribution(languageBytes: Record<string, number>) {
  const entries = Object.entries(languageBytes).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) return [];

  const primary = entries.slice(0, 5).map(([name, bytes]) => ({
    name,
    pct: Math.max(1, Math.round((bytes / total) * 100)),
  }));
  const otherBytes = entries.slice(5).reduce((sum, [, bytes]) => sum + bytes, 0);
  if (otherBytes > 0) {
    primary.push({ name: "Outras", pct: Math.max(1, Math.round((otherBytes / total) * 100)) });
  }
  return primary;
}

export function getGitHubOpenGraphImage(repository: GitHubRepository) {
  const imageVersion = Date.parse(repository.updated_at) || Date.parse(repository.pushed_at);
  if (repository.open_graph_image_url) {
    const separator = repository.open_graph_image_url.includes("?") ? "&" : "?";
    return `${repository.open_graph_image_url}${separator}v=${imageVersion}`;
  }
  return `https://opengraph.githubassets.com/${imageVersion}/${repository.full_name}`;
}
