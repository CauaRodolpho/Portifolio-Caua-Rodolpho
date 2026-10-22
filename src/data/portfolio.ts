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
  startedAt?: string;
  desc: string;
}[] = [
  {
    name: "HTML5",
    level: 95,
    status: "Unlocked",
    category: "Core",
    startedAt: "2025-12-01",
    desc: "Semântica, acessibilidade e estrutura sólida.",
  },
  {
    name: "CSS3",
    level: 90,
    status: "Unlocked",
    category: "Core",
    startedAt: "2025-12-01",
    desc: "Layout moderno, responsividade e motion.",
  },
  {
    name: "JavaScript (ES6+)",
    level: 80,
    status: "Unlocked",
    category: "Core",
    startedAt: "2026-02-01",
    desc: "ES moderno, assincronia e manipulação de dados.",
  },
  {
    name: "TypeScript",
    level: 72,
    status: "Training",
    category: "Language",
    startedAt: "2026-06-01",
    desc: "Tipagem estática, generics e segurança de contrato.",
  },
  {
    name: "React.js",
    level: 75,
    status: "Training",
    category: "Framework",
    startedAt: "2026-04-01",
    desc: "Componentização, estado e composição de UI.",
  },
  {
    name: "Next.js",
    level: 65,
    status: "Learning",
    category: "Framework",
    startedAt: "2026-06-01",
    desc: "Rotas, renderização híbrida e otimização.",
  },
  {
    name: "Angular",
    level: 35,
    status: "Learning",
    category: "Framework",
    startedAt: "2026-10-01",
    desc: "Componentes, templates, serviços e arquitetura de aplicações.",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    status: "Training",
    category: "Styling",
    startedAt: "2026-06-01",
    desc: "Design tokens e sistemas visuais consistentes.",
  },
  {
    name: "Styled Components",
    level: 65,
    status: "Training",
    category: "Styling",
    startedAt: "2026-04-01",
    desc: "Estilização com escopo de componente.",
  },
  {
    name: "GSAP",
    level: 60,
    status: "Learning",
    category: "Motion",
    startedAt: "2026-04-01",
    desc: "Timelines, ScrollTrigger e motion com propósito.",
  },
  {
    name: "Vite",
    level: 75,
    status: "Training",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Ambiente de desenvolvimento e builds rápidos para aplicações web.",
  },
  {
    name: "Git",
    level: 75,
    status: "Unlocked",
    category: "Ferramentas e fluxo de trabalho",
    startedAt: "2026-02-01",
    desc: "Versionamento, branches e organização do histórico do código.",
  },
  {
    name: "GitHub",
    level: 75,
    status: "Unlocked",
    category: "Ferramentas e fluxo de trabalho",
    startedAt: "2026-02-01",
    desc: "Repositórios, colaboração e acompanhamento de projetos.",
  },
  {
    name: "VS Code",
    level: 90,
    status: "Unlocked",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Editor principal para desenvolvimento, depuração e produtividade.",
  },
  {
    name: "Figma",
    level: 55,
    status: "Learning",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Leitura de layouts, prototipação e colaboração visual.",
  },
  {
    name: "Vercel",
    level: 75,
    status: "Training",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Deploy, previews e acompanhamento de aplicações web.",
  },
  {
    name: "npm",
    level: 70,
    status: "Training",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Gerenciamento de pacotes e scripts de projetos JavaScript.",
  },
  {
    name: "pnpm",
    level: 70,
    status: "Training",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Instalação eficiente de dependências e gestão de workspaces.",
  },
  {
    name: "Postman",
    level: 55,
    status: "Learning",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Testes, documentação e validação de APIs.",
  },
  {
    name: "Docker",
    level: 45,
    status: "Learning",
    category: "Ferramentas e fluxo de trabalho",
    desc: "Ambientes isolados e serviços locais reproduzíveis.",
  },
  {
    name: "GitHub Copilot",
    level: 70,
    status: "Training",
    category: "Ferramentas de IA",
    desc: "Assistência de código, sugestões e apoio à produtividade.",
  },
  {
    name: "ChatGPT / Codex",
    level: 75,
    status: "Training",
    category: "Ferramentas de IA",
    desc: "Planejamento, implementação, revisão e resolução de problemas.",
  },
  {
    name: "Claude",
    level: 65,
    status: "Training",
    category: "Ferramentas de IA",
    desc: "Análise de código, documentação e apoio na tomada de decisões.",
  },
  {
    name: "Gemini",
    level: 65,
    status: "Training",
    category: "Ferramentas de IA",
    desc: "Pesquisa, ideação e apoio em tarefas de desenvolvimento.",
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
  image?: string;
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
    highlights: [
      "Organização de tarefas e rotinas",
      "Gestão inteligente de tempo",
      "Integração com serviços de Inteligência Artificial",
      "Interface responsiva para acompanhamento da produtividade",
    ],
    image: "/projects/chronos.webp",
    gradient: "linear-gradient(135deg, oklch(0.3 0.09 235), oklch(0.72 0.15 205))",
    github: "https://github.com/CauaRodolpho/Chronos.ia",
    demo: "https://chronosai-one.vercel.app/",
  },
  {
    kind: "Main Quest",
    title: "FlowView",
    tagline: "Dashboards personalizáveis para acompanhar finanças, vendas e marketing.",
    description:
      "Aplicação Front-End para criar painéis a partir de dados próprios, com gráficos, indicadores, tabelas, insights e exportações.",
    difficulty: "S",
    status: "Online",
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Recharts", "LocalStorage"],
    architecture:
      "Aplicação organizada por domínio, com cálculos separados da interface, dados tipados e persistência versionada no navegador.",
    problem:
      "Transformar registros próprios em indicadores úteis e personalizáveis sem exigir cadastro em um servidor.",
    learnings:
      "Modelagem de dados com TypeScript, regras de cálculo por domínio, importação e exportação de arquivos, persistência local e testes automatizados.",
    roadmap: ["Restaurar backup JSON", "Importar arquivos Excel", "Sincronização opcional com API"],
    highlights: [
      "Painéis de Finanças, Vendas e Marketing",
      "Criação e personalização de dashboards",
      "Importação CSV e exportação em CSV, JSON, PNG e PDF",
      "Testes automatizados para cálculos e persistência",
    ],
    image: "https://raw.githubusercontent.com/CauaRodolpho/FlowView/main/docs/flowview-preview.jpg",
    gradient: "linear-gradient(135deg, oklch(0.2 0.11 265), oklch(0.58 0.18 225))",
    github: "https://github.com/CauaRodolpho/FlowView",
    demo: "https://flowview-two.vercel.app/",
  },
  {
    kind: "Main Quest",
    title: "FlowTask",
    tagline: "Gestão de projetos e tarefas com Kanban, revisão e perfis demonstrativos.",
    description:
      "Aplicação Front-End que simula o dia a dia de uma equipe de desenvolvimento, com acompanhamento de projetos, produtividade e entregas.",
    difficulty: "S",
    status: "Online",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Radix UI",
      "Zod",
      "GSAP",
      "LocalStorage",
    ],
    architecture:
      "Regras de permissões e revisão centralizadas no Front-End, com dados demonstrativos persistidos no navegador.",
    problem:
      "Organizar tarefas de uma equipe e diferenciar o trabalho individual, a revisão do Tech Lead e o acesso administrativo.",
    learnings:
      "Fluxos por perfil, validação de backups com Zod, transições de status e adaptação de telas densas para dispositivos móveis.",
    roadmap: [
      "Criar API e autenticação",
      "Persistir dados em banco",
      "Adicionar testes automatizados",
    ],
    highlights: [
      "Quadro Kanban e acompanhamento de projetos",
      "Revisão de entregas conforme o perfil",
      "Relatórios de produtividade e saúde do projeto",
      "Importação e exportação de backup em JSON",
    ],
    image: "/projects/flowtask.webp",
    gradient: "linear-gradient(135deg, oklch(0.2 0.11 265), oklch(0.58 0.18 225))",
    github: "https://github.com/CauaRodolpho/FlowStack",
    demo: "https://flowstack-ivory.vercel.app/",
  },
  {
    kind: "Main Quest",
    title: "Ateliê AnaCraft",
    tagline: "Loja demonstrativa de artesanato personalizado, do catálogo ao checkout.",
    description:
      "Aplicação Front-End de e-commerce com busca, favoritos, carrinho, personalização de produtos e confirmação de compra demonstrativa.",
    difficulty: "S",
    status: "Online",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Context API",
      "GSAP",
      "LocalStorage",
    ],
    architecture:
      "Rotas com React Router, Context API para carrinho e favoritos e persistência local no navegador.",
    problem:
      "Apresentar um fluxo de compra personalizado para produtos artesanais em telas de computador e celular.",
    learnings:
      "Estado compartilhado, carrinho que diferencia personalizações, filtros na URL, imagens responsivas e acessibilidade.",
    roadmap: [
      "Conectar API e banco de dados",
      "Implementar autenticação",
      "Integrar pagamento e frete",
    ],
    highlights: [
      "Catálogo, busca e filtros por categoria",
      "Personalização de produtos e favoritos",
      "Carrinho que separa itens com opções diferentes",
      "Checkout demonstrativo com confirmação do pedido",
    ],
    image:
      "https://raw.githubusercontent.com/CauaRodolpho/Loja-Atelie/main/docs/images/home-desktop.webp",
    gradient: "linear-gradient(135deg, oklch(0.2 0.11 345), oklch(0.65 0.16 20))",
    github: "https://github.com/CauaRodolpho/Loja-Atelie",
    demo: "https://loja-atelie-phi.vercel.app/",
  },
];

export const TIMELINE = [
  {
    level: "Level 1",
    title: "Fundamentos",
    desc: "HTML, CSS, semântica, responsividade e acessibilidade.",
    period: "2024 — 2025",
  },
  {
    level: "Level 2",
    title: "Formação JavaScript Developer",
    desc: "Conclusão da formação da DIO com foco em DOM, eventos, assincronicidade, orientação a objetos e consumo de APIs REST.",
    period: "Fevereiro de 2026",
  },
  {
    level: "Level 3",
    title: "Formação React Developer - DIO",
    desc: "Aprofundamento em componentes, estados, consumo de APIs e construção de interfaces modernas com React.",
    period: "Junho de 2026",
  },
  {
    level: "Level 4",
    title: "Santander 2026 - AI React Front-End",
    desc: "Bootcamp da DIO com React, TypeScript e aplicação de Inteligência Artificial em um projeto prático.",
    period: "Agosto de 2026",
  },
  {
    level: "Level 5",
    title: "Formação TypeScript Fullstack Developer",
    desc: "Conclusão da formação em TypeScript, arquitetura de aplicações e fundamentos de desenvolvimento front-end e back-end.",
    period: "Setembro de 2026",
  },
  {
    level: "Level 6",
    title: "Projetos práticos",
    desc: "AuthFlow, FlowView, FlowTask e Ateliê AnaCraft transformaram estudos em entregas reais.",
    period: "2026",
  },
  {
    level: "Level 7",
    title: "IA como ferramenta de desenvolvimento",
    desc: "Conclusão da Formação GitHub Copilot e evolução no uso de GitHub Copilot, ChatGPT/Codex, Claude e Gemini para estudar, planejar, revisar código e resolver problemas.",
    period: "Outubro de 2026",
  },
  {
    level: "Level 8",
    title: "Formação Angular Developer",
    desc: "Conclusão da formação da DIO com 37 horas de estudos em Angular, TypeScript, componentes, serviços, rotas e arquitetura de aplicações.",
    period: "Outubro de 2026",
  },
  {
    level: "Current",
    title: "Node.js e visão Full Stack",
    desc: "Graduação em ADS, Formação Node.js Fundamentals e evolução contínua no inglês técnico.",
    period: "Em andamento",
  },
  {
    level: "Next",
    title: "Primeira oportunidade Front-End Júnior",
    desc: "Aplicar o aprendizado em produtos reais e evoluir junto a um time de tecnologia.",
    period: "Próximo objetivo",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Santander 2026 - AI React Front-End",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-08",
    desc: "Formação em React Front-End com aplicação de Inteligência Artificial.",
  },
  {
    title: "Formação React Developer - DIO",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-06",
    desc: "Componentização e desenvolvimento de interfaces com React.",
  },
  {
    title: "Formação JavaScript Developer - DIO",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-02",
    desc: "Fundamentos, DOM, assincronicidade e consumo de APIs.",
  },
  {
    title: "Formação TypeScript Fullstack Developer",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-09",
    desc: "TypeScript, arquitetura de aplicações, front-end e fundamentos de back-end.",
  },
  {
    title: "Formação GitHub Copilot",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-10",
    desc: "Uso do GitHub Copilot como apoio ao desenvolvimento, revisão e produtividade.",
  },
  {
    title: "Formação Angular Developer",
    state: "Unlocked",
    institution: "DIO",
    completedAt: "2026-10",
    desc: "Formação de 37 horas em Angular, TypeScript, componentes, serviços, rotas e arquitetura de aplicações.",
  },
  {
    title: "Imersão Dev do Futuro - Dev em Dobro",
    state: "Unlocked",
    institution: "Dev em Dobro",
    completedAt: "2026-05",
    desc: "Imersão prática em desenvolvimento Front-End e construção de projetos.",
  },
  {
    title: "Imersão Arquitetura Web com IA - Alura",
    state: "Unlocked",
    institution: "Alura",
    completedAt: "2026-07",
    desc: "Arquitetura web e aplicação de Inteligência Artificial no desenvolvimento.",
  },
  {
    title: "DevArt: Projetos de Alto Valor",
    state: "Unlocked",
    institution: "Dev em Dobro",
    completedAt: "2026-02",
    desc: "Desenvolvimento de projetos com foco em interface, animações e apresentação visual.",
  },
] as const;

export const EDUCATION = [
  {
    title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    institution: "UNINTER",
    state: "Training",
    period: "Outubro de 2026 — previsão de conclusão em 2029",
    desc: "Graduação voltada ao desenvolvimento de software, análise de sistemas e fundamentos de tecnologia.",
  },
] as const;

export const COURSES_IN_PROGRESS = [
  {
    title: "Formação Node.js Fundamentals",
    state: "Training",
    institution: "DIO",
    category: "Back-end",
    desc: "Fundamentos de Node.js, criação de APIs, módulos, desenvolvimento assíncrono e organização de aplicações back-end.",
  },
  {
    title: "New U-best",
    state: "Training",
    institution: "UNINTER",
    category: "Inglês",
    desc: "Curso de inglês com desenvolvimento progressivo de leitura, escrita, compreensão auditiva e comunicação.",
  },
  {
    title: "English4Tech",
    state: "Training",
    institution: "DIO",
    category: "Inglês para tecnologia",
    desc: "Inglês aplicado à tecnologia, com foco em listening, speaking, reading e writing para entrevistas e ambientes profissionais.",
  },
] as const;

export const STATS = [
  { label: "Projetos principais", value: "5" },
  { label: "Certificações", value: "9" },
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
