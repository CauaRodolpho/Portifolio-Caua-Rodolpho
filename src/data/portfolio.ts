export const PROFILE = {
  name: "Cauã Rodolpho",
  role: "Desenvolvedor Front-End Júnior",
  status: "DISPONÍVEL PARA OPORTUNIDADES E PROJETOS",
  mission: "Evoluindo como Desenvolvedor Full Stack",
  summary:
    "Desenvolvedor Front-End com foco na criação de interfaces modernas, responsivas e de alta performance, utilizando React, Next.js, TypeScript e Tailwind CSS.",
} as const;

export const CONTACT_EMAIL = "cauarodolpho@gmail.com";

export function getGmailComposeUrl(language: "pt" | "en") {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: language === "pt" ? "Contato pelo portfólio" : "Portfolio contact",
    body:
      language === "pt"
        ? "Olá, Cauã! Gostaria de conversar sobre uma oportunidade ou projeto."
        : "Hello, Cauã! I would like to discuss an opportunity or project.",
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const NAV_ITEMS = [
  { id: "profile", label: "Início", code: "P01" },
  { id: "about", label: "Sobre", code: "P02" },
  { id: "projects", label: "Projetos", code: "P03" },
  { id: "skills", label: "Habilidades", code: "P04" },
  { id: "timeline", label: "Jornada", code: "P05" },
  { id: "certifications", label: "Certificações", code: "P06" },
  { id: "contact", label: "Contato", code: "P07" },
] as const;

export type SkillStatus = "Unlocked" | "Training" | "Learning" | "In Progress";

export const SKILLS: {
  name: string;
  level: number;
  status: SkillStatus;
  category: string;
  time: string;
  desc: string;
}[] = [
  {
    name: "HTML5",
    level: 95,
    status: "Unlocked",
    category: "Core",
    time: "8 meses",
    desc: "Semântica, acessibilidade e estrutura sólida.",
  },
  {
    name: "CSS3",
    level: 90,
    status: "Unlocked",
    category: "Core",
    time: "8 meses",
    desc: "Layout moderno, responsividade e motion.",
  },
  {
    name: "JavaScript (ES6+)",
    level: 80,
    status: "Unlocked",
    category: "Core",
    time: "6 meses",
    desc: "ES moderno, assincronia e manipulação de dados.",
  },
  {
    name: "TypeScript",
    level: 72,
    status: "Training",
    category: "Language",
    time: "2 meses",
    desc: "Tipagem estática, generics e segurança de contrato.",
  },
  {
    name: "React.js",
    level: 75,
    status: "Training",
    category: "Framework",
    time: "4 meses",
    desc: "Componentização, estado e composição de UI.",
  },
  {
    name: "Next.js",
    level: 65,
    status: "Learning",
    category: "Framework",
    time: "2 meses",
    desc: "Rotas, renderização híbrida e otimização.",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    status: "Training",
    category: "Styling",
    time: "2 meses",
    desc: "Design tokens e sistemas visuais consistentes.",
  },
  {
    name: "Styled Components",
    level: 65,
    status: "Training",
    category: "Styling",
    time: "4 meses",
    desc: "Estilização com escopo de componente.",
  },
  {
    name: "GSAP",
    level: 60,
    status: "Learning",
    category: "Motion",
    time: "4 meses",
    desc: "Timelines, ScrollTrigger e motion com propósito.",
  },
  {
    name: "Git & GitHub",
    level: 75,
    status: "Unlocked",
    category: "Tooling",
    time: "6 meses",
    desc: "Versionamento, branches e colaboração.",
  },
];

export type PortfolioProject = {
  kind: "Main Quest" | "Side Quest";
  title: string;
  tagline: string;
  description?: string;
  difficulty: string;
  status: string;
  tech: string[];
  architecture: string;
  problem: string;
  learnings: string;
  roadmap: string[];
  highlights?: string[];
  origin?: string;
  originLinks?: { label: string; url: string }[];
  demoAvailable?: boolean;
  featured?: boolean;
  image: string;
  imageFit?: "cover" | "contain";
  gradient: string;
  github: string;
  demo?: string;
  api?: string;
};

export const PROJECTS: PortfolioProject[] = [
  {
    kind: "Main Quest",
    title: "AuthFlow",
    tagline:
      "Autenticação e gestão de usuários com acesso demo, sessões JWT e painel CRUD integrado ao MongoDB.",
    description:
      "Aplicação Full Stack para autenticação e gerenciamento de usuários fictícios, com login, criação de conta, rotas protegidas e integração completa entre front-end, API e banco de dados.",
    difficulty: "S+",
    status: "Online",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Spline 3D",
      "Axios",
      "Node.js",
      "Express",
      "Prisma ORM",
      "MongoDB",
      "Zod",
      "JWT",
      "bcrypt",
      "Vercel",
    ],
    architecture:
      "Monorepo com front-end React/Vite e API Node/Express separados, contratos validados com Zod, persistência via Prisma e MongoDB e autenticação por JWT.",
    problem:
      "Centralizar autenticação e gerenciamento seguro de usuários fictícios em uma experiência demonstrativa completa.",
    learnings:
      "Integração Full Stack, hash de senhas com bcrypt, sessões JWT, proteção de rotas, CORS, validação de dados e deploy independente de front-end e API.",
    roadmap: ["Testes automatizados", "Recuperação de senha", "Controle de permissões"],
    highlights: [
      "Login, criação de conta e acesso demonstrativo",
      "Senhas protegidas com bcrypt e sessões JWT",
      "CRUD completo de usuários",
      "Pesquisa por nome, e-mail ou idade",
      "Edição e exclusão com confirmação",
      "Mensagens de sucesso, erro e sessão expirada",
      "Layout responsivo, animações e cena Spline 3D",
      "Front-end, API e MongoDB publicados na Vercel",
    ],
    origin:
      "Iniciado a partir de aulas gratuitas do DevClub sobre Front-End e Back-End e ampliado por mim com novo design, TypeScript, autenticação, acesso demo, JWT, bcrypt, Zod, proteção de rotas, dashboard, animações, Spline 3D, responsividade e deploy. Usei Inteligência Artificial como apoio em planejamento, revisão e resolução de problemas.",
    originLinks: [
      {
        label: "Aula base - Front-End",
        url: "https://www.youtube.com/watch?v=_gHr2Pe5LCY",
      },
      {
        label: "Aula base - Back-End",
        url: "https://www.youtube.com/watch?v=PyrMT0GA3sE",
      },
    ],
    demoAvailable: true,
    featured: true,
    image: "/projects/authflow.webp",
    imageFit: "contain",
    gradient: "linear-gradient(135deg, oklch(0.18 0.06 255), oklch(0.48 0.16 220))",
    github: "https://github.com/CauaRodolpho/authflow-fullstack",
    demo: "https://authflow-web-pink.vercel.app/",
    api: "https://authflow-api-wheat.vercel.app/health",
  },
  {
    kind: "Main Quest",
    title: "Chronos",
    tagline: "Aplicação web de produtividade e gestão inteligente de tempo integrada a IA.",
    difficulty: "S",
    status: "In Development",
    tech: ["React", "TypeScript", "Tailwind CSS", "IA APIs (LLM Keys)"],
    architecture:
      "Integração com serviços de IA, autenticação, fluxos assíncronos tipados e evolução planejada para proteger credenciais por uma camada de servidor.",
    problem: "Rotinas e produtividade sem apoio inteligente para organizar o tempo.",
    learnings:
      "Integração com LLMs, tratamento de estados assíncronos e importância de proteger credenciais fora do navegador.",
    roadmap: ["Refino de UX do chat", "Automação de rotinas", "Sincronização multi-dispositivo"],
    image: "/projects/chronos.webp",
    gradient: "linear-gradient(135deg, oklch(0.3 0.09 235), oklch(0.72 0.15 205))",
    github: "https://github.com/CauaRodolpho/Chronos.ia",
    demo: "https://chronosai-one.vercel.app/",
  },
  {
    kind: "Main Quest",
    title: "Nexus Cloud",
    tagline:
      "Plataforma de gerenciamento de serviços em nuvem com foco em System Design Front-end.",
    difficulty: "S",
    status: "In Development",
    tech: ["React", "TypeScript", "Tailwind CSS", "Component Architecture"],
    architecture:
      "Desacoplamento de camadas, componentes genéricos reutilizáveis e gerenciamento eficiente de estado.",
    problem: "Dashboards de infraestrutura em nuvem pouco escaláveis e difíceis de manter.",
    learnings:
      "Arquitetura modular escalável e layout responsivo para dashboards de alta performance.",
    roadmap: ["Seção de planos", "Prévia do dashboard", "Novas seções da Home"],
    image: "/projects/nexus-cloud.webp",
    gradient: "linear-gradient(135deg, oklch(0.3 0.1 255), oklch(0.7 0.14 225))",
    github: "https://github.com/CauaRodolpho/Nexus-Cloud",
    demo: "https://nexus-cloud-lyart.vercel.app/",
  },
  {
    kind: "Side Quest",
    title: "DevArt — Stranger Things",
    tagline: "Landing interativa com animações inspiradas na série, feita com GSAP.",
    difficulty: "B",
    status: "Completed",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    architecture: "Timeline de animação controlada por GSAP sobre uma estrutura estática.",
    problem: "Landing genérica sem narrativa visual ou motion.",
    learnings: "Coreografia de animação e composição visual temática.",
    roadmap: ["Versão mobile refinada"],
    image: "/projects/devart-stranger-things.webp",
    gradient: "linear-gradient(135deg, oklch(0.28 0.09 265), oklch(0.68 0.16 250))",
    github: "https://github.com/CauaRodolpho/DevArt-Strangers-things",
  },
  {
    kind: "Side Quest",
    title: "Pokedex",
    tagline: "Aplicação que consome a PokéAPI para listar e exibir dados de Pokémon.",
    difficulty: "A",
    status: "Completed",
    tech: ["HTML", "CSS", "PokéAPI"],
    architecture: "Consumo de API REST pública com renderização dinâmica de cards.",
    problem: "Explorar consumo de APIs REST externas com dados reais.",
    learnings: "Fetch de dados, paginação e exibição de listas dinâmicas.",
    roadmap: ["Busca e filtros avançados"],
    image: "/projects/pokedex.webp",
    gradient: "linear-gradient(135deg, oklch(0.32 0.08 210), oklch(0.75 0.13 195))",
    github: "https://github.com/CauaRodolpho/Pokedex",
  },
];

export const TIMELINE = [
  {
    level: "Level 1",
    title: "Fundamentos",
    desc: "HTML, CSS, semântica, responsividade e acessibilidade.",
  },
  {
    level: "Level 2",
    title: "JavaScript e APIs",
    desc: "DOM, eventos, assincronicidade e consumo de APIs REST.",
  },
  {
    level: "Level 3",
    title: "React e TypeScript",
    desc: "Componentização, estados e construção de interfaces tipadas.",
  },
  {
    level: "Level 4",
    title: "Projetos práticos",
    desc: "Pokedex, DevArt e AuthFlow transformaram estudos em entregas reais.",
  },
  {
    level: "Current",
    title: "TypeScript e visão Full Stack",
    desc: "Aprofundamento técnico aliado ao Design Thinking para criar soluções centradas no usuário.",
  },
  {
    level: "Next",
    title: "Primeira oportunidade Front-End Júnior",
    desc: "Aplicar o aprendizado em produtos reais e evoluir junto a um time de tecnologia.",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Santander 2026 - AI React Front-End",
    state: "Unlocked",
    desc: "Formação em React Front-End com aplicação de Inteligência Artificial.",
  },
  {
    title: "Formação React Developer - DIO",
    state: "Unlocked",
    desc: "Componentização e desenvolvimento de interfaces com React.",
  },
  {
    title: "Formação JavaScript Developer - DIO",
    state: "Unlocked",
    desc: "Fundamentos, DOM, assincronicidade e consumo de APIs.",
  },
  {
    title: "Imersão Dev do Futuro - Dev em Dobro",
    state: "Unlocked",
    desc: "Imersão prática de 16 horas concluída em maio de 2026.",
  },
  {
    title: "Imersão Arquitetura Web com IA - Alura",
    state: "Unlocked",
    desc: "Imersão de 4 horas concluída em julho de 2026.",
  },
  {
    title: "DevArt: Projetos de Alto Valor",
    state: "Unlocked",
    desc: "Projeto prático inspirado em Stranger Things, concluído em fevereiro de 2026.",
  },
] as const;

export const COURSES_IN_PROGRESS = [
  {
    title: "Design Thinking",
    state: "Training",
    desc: "Processo de descoberta, definição de problemas e criação de soluções centradas no usuário.",
  },
  {
    title: "Formação TypeScript Fullstack Developer",
    state: "Training",
    desc: "Aprofundamento em TypeScript, arquitetura de aplicações, front-end e fundamentos de back-end.",
  },
] as const;

export const STATS = [
  { label: "Projetos principais", value: "3" },
  { label: "Certificações", value: "6" },
  { label: "Tecnologias", value: "10" },
  { label: "Objetivo", value: "1ª vaga" },
];

export const LANGUAGES = [
  { name: "TypeScript", pct: 42 },
  { name: "JavaScript", pct: 26 },
  { name: "CSS", pct: 18 },
  { name: "HTML", pct: 9 },
  { name: "Other", pct: 5 },
];
