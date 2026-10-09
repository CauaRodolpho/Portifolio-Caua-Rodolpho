import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

const STORAGE_KEY = "portfolio:language";

const translations: Record<string, string> = {
  Início: "Home",
  Sobre: "About",
  Projetos: "Projects",
  Habilidades: "Skills",
  Jornada: "Journey",
  Certificações: "Certifications",
  Contato: "Contact",
  "Desenvolvedor Front-End Júnior": "Junior Front-End Developer",
  "React · TypeScript · Experiências digitais": "React · TypeScript · Digital experiences",
  "Desenvolvedor Front-End com foco na criação de interfaces modernas, responsivas e de alta performance, utilizando React, Next.js, TypeScript e Tailwind CSS.":
    "Front-End Developer focused on creating modern, responsive, high-performance interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
  "Busco minha primeira oportunidade para contribuir com produtos reais e evoluir junto a um time de tecnologia.":
    "I am seeking my first opportunity to contribute to real products and grow alongside a technology team.",
  "Ver projetos": "View projects",
  "Baixar currículo": "Download résumé",
  "Resumo de habilidades": "Skills overview",
  Praticando: "Practicing",
  Estudando: "Learning",
  "Ver todas as habilidades": "View all skills",
  "Projetos em destaque": "Featured projects",
  "Autenticação e gestão Full Stack": "Full Stack authentication and user management",
  "Produtividade integrada à IA": "AI-powered productivity",
  "Dashboards personalizáveis": "Customizable dashboards",
  "Explorar projetos": "Explore projects",
  "Disponível para oportunidades": "Available for opportunities",
  Localização: "Location",
  "Foco atual": "Current focus",
  "Continue explorando": "Keep exploring",
  "LOG 01 · Origem": "LOG 01 · Origin",
  "A história por trás do código": "The story behind the code",
  "Uma trajetória construída com curiosidade, prática constante e projetos que mostram cada etapa da minha evolução.":
    "A journey built through curiosity, consistent practice, and projects that reflect every stage of my growth.",
  "Minha jornada em prática": "My journey in practice",
  "Base do Front-End": "Front-End foundation",
  "Comecei com HTML, CSS e JavaScript, desenvolvendo páginas responsivas e aprendendo sobre estrutura semântica, estilização, DOM, eventos e consumo de APIs.":
    "I started with HTML, CSS, and JavaScript, building responsive pages and learning semantic structure, styling, the DOM, events, and API consumption.",
  "Interfaces com React": "Interfaces with React",
  "Avancei para React, TypeScript e Tailwind CSS, praticando componentização, tipagem, gerenciamento de estados e organização de interfaces modernas e acessíveis.":
    "I progressed to React, TypeScript, and Tailwind CSS, practicing component architecture, typing, state management, and the organization of modern, accessible interfaces.",
  "Projetos que marcaram a evolução": "Projects that shaped my growth",
  "O Chronos e o Nexus Cloud fortaleceram minha base em interfaces, TypeScript e arquitetura Front-End. Com o AuthFlow, avancei para uma aplicação Full Stack com autenticação, API, banco de dados e deploy completo.":
    "Chronos and Nexus Cloud strengthened my foundation in interfaces, TypeScript, and Front-End architecture. With AuthFlow, I advanced to a Full Stack application with authentication, an API, a database, and a complete deployment.",
  "Aprendizado atual": "Current learning",
  "Atualmente estou aprofundando meus conhecimentos na Formação TypeScript Fullstack Developer e em Design Thinking, buscando desenvolver soluções mais completas e centradas nas necessidades do usuário.":
    "I am currently deepening my knowledge through the TypeScript Fullstack Developer program and Design Thinking, aiming to build more complete, user-centered solutions.",
  "Direção profissional": "Professional direction",
  "Meu foco atual é consolidar minha base em Front-End e conquistar minha primeira oportunidade na área. No longo prazo, quero evoluir como Desenvolvedor Full Stack, ampliando meus conhecimentos em back-end, APIs e bancos de dados.":
    "My current focus is to consolidate my Front-End foundation and earn my first opportunity in the field. In the long term, I aim to grow as a Full Stack Developer by expanding my knowledge of back-end development, APIs, and databases.",
  "Espaço reservado para a foto de Cauã Rodolpho": "Reserved space for Cauã Rodolpho's photo",
  "Disponível para oportunidades e projetos freelance":
    "Available for opportunities and freelance projects",
  "Transformo estudo, curiosidade e prática em interfaces úteis, modernas e bem construídas.":
    "I turn study, curiosity, and practice into useful, modern, well-crafted interfaces.",
  "Linguagens no GitHub": "Languages on GitHub",
  "Abrir perfil de Cauã Rodolpho no GitHub": "Open Cauã Rodolpho's GitHub profile",
  Perfil: "Profile",
  "Sincronizado com repositórios públicos": "Synced with public repositories",
  "Consultando GitHub...": "Checking GitHub...",
  "Exibindo dados locais de segurança": "Showing local fallback data",
  "Indicadores do perfil": "Profile metrics",
  "Repositórios públicos": "Public repositories",
  Seguidores: "Followers",
  "Projetos analisados": "Projects analyzed",
  "Fonte dos dados": "Data source",
  "Projetos principais": "Main projects",
  Tecnologias: "Technologies",
  Objetivo: "Goal",
  "1ª vaga": "First role",
  "1a+": "1y+",
  "1a": "1y",
  "8 meses": "8 months",
  "6 meses": "6 months",
  "4 meses": "4 months",
  "2 meses": "2 months",
  Outras: "Other",
  "P03 · Registro de projetos": "P03 · Project log",
  "Missões em andamento": "Active missions",
  "AuthFlow é meu projeto Full Stack de destaque. FlowView, FlowTask e Ateliê AnaCraft mostram diferentes aplicações de Front-End, enquanto Chronos, Stranger Things e Pokedex completam meu portfólio.":
    "AuthFlow is my flagship Full Stack project. FlowView, FlowTask, and Ateliê AnaCraft showcase different Front-End applications, while Chronos, Stranger Things, and Pokedex complete my portfolio.",
  "Projetos sincronizados com o GitHub": "Projects synced with GitHub",
  "Sincronizando projetos...": "Syncing projects...",
  "Dados locais ativos": "Local data active",
  "Captura de tela do projeto": "Project screenshot",
  "Acesso demo disponível": "Demo access available",
  estrelas: "stars",
  "Atualizado em": "Updated",
  "Funcionalidades em destaque": "Featured capabilities",
  Arquitetura: "Architecture",
  "Problema resolvido": "Problem solved",
  Aprendizados: "Key learnings",
  "Origem e evolução": "Origin and evolution",
  "Aula base - Front-End": "Front-End foundation lesson",
  "Aula base - Back-End": "Back-End foundation lesson",
  "Ver projeto": "View project",
  "Ver demonstração": "View demo",
  "Ver código": "View code",
  Repositório: "Repository",
  "Status da API": "API status",
  "Abrir demonstração do projeto": "Open project demo",
  "Abrir repositório do projeto": "Open project repository",
  "Consultar status da API do projeto": "Check project API status",
  "Main Quest": "Main Quest",
  "Side Quest": "Side Quest",
  Online: "Online",
  "In Development": "In Development",
  Completed: "Completed",
  "Autenticação e gestão de usuários com acesso demo, sessões JWT e painel CRUD integrado ao MongoDB.":
    "User authentication and management with demo access, JWT sessions, and a CRUD dashboard integrated with MongoDB.",
  "Aplicação Full Stack para autenticação e gerenciamento de usuários fictícios, com login, criação de conta, rotas protegidas e integração completa entre front-end, API e banco de dados.":
    "Full Stack application for authentication and management of fictional users, featuring login, account creation, protected routes, and complete integration across the front end, API, and database.",
  "Monorepo com front-end React/Vite e API Node/Express separados, contratos validados com Zod, persistência via Prisma e MongoDB e autenticação por JWT.":
    "Monorepo with separate React/Vite front end and Node/Express API, Zod-validated contracts, Prisma and MongoDB persistence, and JWT authentication.",
  "Centralizar autenticação e gerenciamento seguro de usuários fictícios em uma experiência demonstrativa completa.":
    "Centralize authentication and secure management of fictional users in a complete demonstration experience.",
  "Integração Full Stack, hash de senhas com bcrypt, sessões JWT, proteção de rotas, CORS, validação de dados e deploy independente de front-end e API.":
    "Full Stack integration, bcrypt password hashing, JWT sessions, route protection, CORS, data validation, and independent front-end and API deployments.",
  "Testes automatizados": "Automated tests",
  "Recuperação de senha": "Password recovery",
  "Controle de permissões": "Role-based permissions",
  "Login, criação de conta e acesso demonstrativo": "Login, account creation, and demo access",
  "Senhas protegidas com bcrypt e sessões JWT": "Passwords protected with bcrypt and JWT sessions",
  "CRUD completo de usuários": "Complete user CRUD",
  "Pesquisa por nome, e-mail ou idade": "Search by name, email, or age",
  "Edição e exclusão com confirmação": "Edit and delete with confirmation",
  "Mensagens de sucesso, erro e sessão expirada": "Success, error, and expired-session messages",
  "Layout responsivo, animações e cena Spline 3D":
    "Responsive layout, animations, and a Spline 3D scene",
  "Front-end, API e MongoDB publicados na Vercel": "Front end, API, and MongoDB deployed on Vercel",
  "Iniciado a partir de aulas gratuitas do DevClub sobre Front-End e Back-End e ampliado por mim com novo design, TypeScript, autenticação, acesso demo, JWT, bcrypt, Zod, proteção de rotas, dashboard, animações, Spline 3D, responsividade e deploy. Usei Inteligência Artificial como apoio em planejamento, revisão e resolução de problemas.":
    "Started from free DevClub Front-End and Back-End lessons, then substantially expanded by me with a new design, TypeScript, authentication, demo access, JWT, bcrypt, Zod, protected routes, a dashboard, animations, Spline 3D, responsiveness, and deployment. I used Artificial Intelligence as a support tool for planning, review, and problem-solving.",
  "Aplicação web de produtividade e gestão inteligente de tempo integrada a IA.":
    "Web application for productivity and intelligent time management powered by AI.",
  "Integração com serviços de IA, autenticação, fluxos assíncronos tipados e evolução planejada para proteger credenciais por uma camada de servidor.":
    "Integration with AI services, authentication, typed asynchronous flows, and a planned server layer to protect credentials.",
  "Rotinas e produtividade sem apoio inteligente para organizar o tempo.":
    "Routines and productivity without intelligent support for organizing time.",
  "Integração com LLMs, tratamento de estados assíncronos e importância de proteger credenciais fora do navegador.":
    "LLM integration, asynchronous state handling, and the importance of keeping credentials outside the browser.",
  "Refino de UX do chat": "Chat UX refinement",
  "Automação de rotinas": "Routine automation",
  "Sincronização multi-dispositivo": "Cross-device synchronization",
  "Plataforma de gerenciamento de serviços em nuvem com foco em System Design Front-end.":
    "Cloud service management platform focused on Front-End System Design.",
  "Desacoplamento de camadas, componentes genéricos reutilizáveis e gerenciamento eficiente de estado.":
    "Decoupled layers, reusable generic components, and efficient state management.",
  "Dashboards de infraestrutura em nuvem pouco escaláveis e difíceis de manter.":
    "Cloud infrastructure dashboards that are hard to scale and maintain.",
  "Arquitetura modular escalável e layout responsivo para dashboards de alta performance.":
    "Scalable modular architecture and responsive layouts for high-performance dashboards.",
  "Novas seções da Home": "New home page sections",
  "Seção de planos": "Plans section",
  "Prévia do dashboard": "Dashboard preview",
  "Landing interativa com animações inspiradas na série, feita com GSAP.":
    "Interactive landing page with series-inspired animations built with GSAP.",
  "Timeline de animação controlada por GSAP sobre uma estrutura estática.":
    "GSAP-controlled animation timeline over a static structure.",
  "Landing genérica sem narrativa visual ou motion.":
    "A generic landing page without visual storytelling or motion.",
  "Coreografia de animação e composição visual temática.":
    "Animation choreography and themed visual composition.",
  "Versão mobile refinada": "Refined mobile version",
  "Aplicação que consome a PokéAPI para listar e exibir dados de Pokémon.":
    "Application that consumes the PokéAPI to list and display Pokémon data.",
  "Consumo de API REST pública com renderização dinâmica de cards.":
    "Public REST API consumption with dynamic card rendering.",
  "Explorar consumo de APIs REST externas com dados reais.":
    "Explore external REST APIs using real data.",
  "Fetch de dados, paginação e exibição de listas dinâmicas.":
    "Data fetching, pagination, and dynamic list rendering.",
  "Busca e filtros avançados": "Advanced search and filters",
  "P04 · Árvore de habilidades": "P04 · Skill tree",
  "Painel de habilidades": "Skills dashboard",
  "Cada tecnologia é um nó da árvore: nível, tempo de treino e status de domínio.":
    "Each technology is a node in the tree: level, practice time, and proficiency status.",
  Consolidado: "Consolidated",
  "Em progresso": "In progress",
  "Semântica, acessibilidade e estrutura sólida.": "Semantics, accessibility, and solid structure.",
  "Layout moderno, responsividade e motion.": "Modern layout, responsiveness, and motion.",
  "ES moderno, assincronia e manipulação de dados.":
    "Modern JavaScript, asynchronous flows, and data handling.",
  "Tipagem estática, generics e segurança de contrato.":
    "Static typing, generics, and contract safety.",
  "Componentização, estado e composição de UI.":
    "Component architecture, state, and UI composition.",
  "Rotas, renderização híbrida e otimização.": "Routing, hybrid rendering, and optimization.",
  "Design tokens e sistemas visuais consistentes.": "Design tokens and consistent visual systems.",
  "Estilização com escopo de componente.": "Component-scoped styling.",
  "Timelines, ScrollTrigger e motion com propósito.":
    "Timelines, ScrollTrigger, and purposeful motion.",
  "Versionamento, branches e colaboração.": "Version control, branches, and collaboration.",
  "de estudo e prática": "of study and practice",
  "P05 · Progressão": "P05 · Progression",
  "Linha de evolução": "Growth timeline",
  "Minha evolução dos fundamentos aos projetos atuais, construindo o caminho para a primeira oportunidade como Desenvolvedor Front-End.":
    "My progress from the fundamentals to current projects, building the path toward my first opportunity as a Front-End Developer.",
  "Próxima missão": "Next mission",
  "Nível atual": "Current level",
  Etapa: "Stage",
  Fundamentos: "Fundamentals",
  "HTML, CSS, semântica, responsividade e acessibilidade.":
    "HTML, CSS, semantics, responsiveness, and accessibility.",
  "JavaScript e APIs": "JavaScript and APIs",
  "DOM, eventos, assincronicidade e consumo de APIs REST.":
    "DOM, events, asynchronous programming, and REST API consumption.",
  "React e TypeScript": "React and TypeScript",
  "Componentização, estados e construção de interfaces tipadas.":
    "Component architecture, state, and typed interface development.",
  "Projetos práticos": "Practical projects",
  "Pokedex, DevArt e AuthFlow transformaram estudos em entregas reais.":
    "Pokedex, DevArt, and AuthFlow turned study into real deliverables.",
  "TypeScript e visão Full Stack": "TypeScript and a Full Stack perspective",
  "Aprofundamento técnico aliado ao Design Thinking para criar soluções centradas no usuário.":
    "Technical depth combined with Design Thinking to create user-centered solutions.",
  "Primeira oportunidade Front-End Júnior": "First Junior Front-End opportunity",
  "Aplicar o aprendizado em produtos reais e evoluir junto a um time de tecnologia.":
    "Apply my knowledge to real products and grow alongside a technology team.",
  "P06 · Conquistas": "P06 · Achievements",
  "Cursos e certificações": "Courses and certifications",
  "Formações que registram minha evolução em JavaScript, React, Inteligência Artificial e desenvolvimento de projetos.":
    "Programs that document my growth in JavaScript, React, Artificial Intelligence, and project development.",
  "Certificação concluída": "Certification completed",
  "Formações em andamento": "Programs in progress",
  "Conhecimentos que estou desenvolvendo atualmente.": "Knowledge I am currently developing.",
  "Em andamento": "In progress",
  "Formação em React Front-End com aplicação de Inteligência Artificial.":
    "React Front-End training with applied Artificial Intelligence.",
  "Componentização e desenvolvimento de interfaces com React.":
    "Component architecture and interface development with React.",
  "Fundamentos, DOM, assincronicidade e consumo de APIs.":
    "Fundamentals, the DOM, asynchronous programming, and API consumption.",
  "Imersão prática de 16 horas concluída em maio de 2026.":
    "Practical immersion completed in May 2026.",
  "Imersão de 4 horas concluída em julho de 2026.": "Immersion completed in July 2026.",
  "Projeto prático inspirado em Stranger Things, concluído em fevereiro de 2026.":
    "Practical project inspired by Stranger Things, completed in February 2026.",
  "Processo de descoberta, definição de problemas e criação de soluções centradas no usuário.":
    "A process for discovery, problem definition, and creating user-centered solutions.",
  "Aprofundamento em TypeScript, arquitetura de aplicações, front-end e fundamentos de back-end.":
    "In-depth TypeScript, application architecture, front-end development, and back-end fundamentals.",
  "P07 · Comunicação": "P07 · Communication",
  "Canal de comunicação aberto": "Open communication channel",
  "Aberto a oportunidades Front-End, colaborações e novos projetos freelance.":
    "Open to Front-End opportunities, collaborations, and new freelance projects.",
  "aceitando missões": "accepting missions",
  "Vamos construir algo que": "Let's build something that",
  dure: "lasts",
  "Disponível para oportunidades e projetos freelance. Desenvolvo landing pages, sites institucionais e interfaces responsivas, transformando ideias em experiências digitais modernas e funcionais.":
    "Available for opportunities and freelance projects. I build landing pages, company websites, and responsive interfaces, turning ideas into modern, functional digital experiences.",
  "Serviços freelance disponíveis": "Available freelance services",
  "Sites institucionais": "Company websites",
  "Interfaces React": "React interfaces",
  "Solicitar orçamento": "Request a quote",
  Currículo: "Résumé",
  "Baixar PDF": "Download PDF",
  "all systems nominal": "all systems nominal",
  "SISTEMA INICIALIZADO": "SYSTEM INITIALIZED",
  "Carregando projetos e habilidades...": "Loading projects and skills...",
  "Conexão estabelecida.": "Connection established.",
  "Bem-vindo ao portfólio de Cauã Rodolpho.": "Welcome to Cauã Rodolpho's portfolio.",
  "Pular introdução": "Skip intro",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
  "Dashboards personalizáveis para acompanhar finanças, vendas e marketing.": "Customizable dashboards for tracking finance, sales, and marketing.",
  "Aplicação Front-End para criar painéis a partir de dados próprios, com gráficos, indicadores, tabelas, insights e exportações.": "Front-End application for creating dashboards from personal data, with charts, metrics, tables, insights, and exports.",
  "Aplicação organizada por domínio, com cálculos separados da interface, dados tipados e persistência versionada no navegador.": "Application organized by domain, with calculations separated from the interface, typed data, and versioned browser storage.",
  "Transformar registros próprios em indicadores úteis e personalizáveis sem exigir cadastro em um servidor.": "Turn personal records into useful, customizable metrics without requiring a server account.",
  "Modelagem de dados com TypeScript, regras de cálculo por domínio, importação e exportação de arquivos, persistência local e testes automatizados.": "TypeScript data modeling, domain-specific calculations, file import and export, local persistence, and automated tests.",
  "Restaurar backup JSON": "Restore JSON backups",
  "Importar arquivos Excel": "Import Excel files",
  "Sincronização opcional com API": "Optional API synchronization",
  "Painéis de Finanças, Vendas e Marketing": "Finance, Sales, and Marketing dashboards",
  "Criação e personalização de dashboards": "Dashboard creation and customization",
  "Importação CSV e exportação em CSV, JSON, PNG e PDF": "CSV import and export to CSV, JSON, PNG, and PDF",
  "Testes automatizados para cálculos e persistência": "Automated tests for calculations and persistence",
  "Gestão de projetos e tarefas com Kanban, revisão e perfis demonstrativos.": "Project and task management with Kanban, reviews, and demo profiles.",
  "Aplicação Front-End que simula o dia a dia de uma equipe de desenvolvimento, com acompanhamento de projetos, produtividade e entregas.": "A Front-End application simulating a development team's workflow, with project, productivity, and delivery tracking.",
  "Regras de permissões e revisão centralizadas no Front-End, com dados demonstrativos persistidos no navegador.": "Permission and review rules centralized in the Front-End, with demo data stored in the browser.",
  "Organizar tarefas de uma equipe e diferenciar o trabalho individual, a revisão do Tech Lead e o acesso administrativo.": "Organize team tasks and distinguish individual work, Tech Lead reviews, and administrative access.",
  "Fluxos por perfil, validação de backups com Zod, transições de status e adaptação de telas densas para dispositivos móveis.": "Role-based flows, backup validation with Zod, status transitions, and adapting dense screens for mobile devices.",
  "Criar API e autenticação": "Build an API and authentication",
  "Persistir dados em banco": "Persist data in a database",
  "Adicionar testes automatizados": "Add automated tests",
  "Quadro Kanban e acompanhamento de projetos": "Kanban board and project tracking",
  "Revisão de entregas conforme o perfil": "Delivery reviews based on user role",
  "Relatórios de produtividade e saúde do projeto": "Productivity and project health reports",
  "Importação e exportação de backup em JSON": "JSON backup import and export",
  "Loja demonstrativa de artesanato personalizado, do catálogo ao checkout.": "Demo store for personalized crafts, from product browsing to checkout.",
  "Aplicação Front-End de e-commerce com busca, favoritos, carrinho, personalização de produtos e confirmação de compra demonstrativa.": "Front-End e-commerce application with search, favorites, cart, product customization, and demo order confirmation.",
  "Rotas com React Router, Context API para carrinho e favoritos e persistência local no navegador.": "React Router pages, Context API for the cart and favorites, and local browser persistence.",
  "Apresentar um fluxo de compra personalizado para produtos artesanais em telas de computador e celular.": "Present a personalized shopping flow for handmade products on desktop and mobile.",
  "Estado compartilhado, carrinho que diferencia personalizações, filtros na URL, imagens responsivas e acessibilidade.": "Shared state, a cart that distinguishes customizations, URL filters, responsive images, and accessibility.",
  "Conectar API e banco de dados": "Connect an API and database",
  "Implementar autenticação": "Implement authentication",
  "Integrar pagamento e frete": "Integrate payments and shipping",
  "Catálogo, busca e filtros por categoria": "Catalog, search, and category filters",
  "Personalização de produtos e favoritos": "Product customization and favorites",
  "Carrinho que separa itens com opções diferentes": "Cart that keeps differently customized items separate",
  "Checkout demonstrativo com confirmação do pedido": "Demo checkout with order confirmation",

};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title =
      language === "pt"
        ? "Cauã Rodolpho — Desenvolvedor Front-End Júnior"
        : "Cauã Rodolpho — Junior Front-End Developer";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content =
        language === "pt"
          ? "Portfólio de Cauã Rodolpho, Desenvolvedor Front-End Júnior em evolução para Full Stack."
          : "Portfolio of Cauã Rodolpho, a Junior Front-End Developer growing toward Full Stack development.";
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "pt" ? "en" : "pt")),
      t: (text) => (language === "en" ? (translations[text] ?? text) : text),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
