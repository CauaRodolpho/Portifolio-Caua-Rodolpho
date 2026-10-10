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
  "O AuthFlow ampliou minha experiência com integração Full Stack. Com FlowView, FlowTask e Ateliê AnaCraft, pratiquei diferentes desafios de arquitetura, dados e experiência Front-End.":
    "AuthFlow expanded my experience with Full Stack integration. With FlowView, FlowTask, and Ateliê AnaCraft, I practiced different challenges in architecture, data, and Front-End experience.",
  "Aprendizado atual": "Current learning",
  "Atualmente curso Análise e Desenvolvimento de Sistemas na UNINTER e aprofundo meus conhecimentos em Angular, Design Thinking e inglês aplicado à tecnologia.":
    "I am currently studying Systems Analysis and Development at UNINTER while deepening my knowledge of Angular, Design Thinking, and English for technology.",
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
  Outras: "Other",
  "P03 · Registro de projetos": "P03 · Project log",
  "Missões em andamento": "Active missions",
  "AuthFlow é meu projeto Full Stack de destaque. FlowView, FlowTask e Ateliê AnaCraft mostram diferentes aplicações de Front-End, enquanto Chronos amplia meu contato com produtividade e integrações de IA.":
    "AuthFlow is my flagship Full Stack project. FlowView, FlowTask, and Ateliê AnaCraft showcase different Front-End applications, while Chronos expands my experience with productivity and AI integrations.",
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
  "AuthFlow, FlowView, FlowTask e Ateliê AnaCraft transformaram estudos em entregas reais.":
    "AuthFlow, FlowView, FlowTask, and Ateliê AnaCraft turned study into real deliverables.",
  "Angular e visão Full Stack": "Angular and a Full Stack perspective",
  "Graduação em ADS, aprofundamento em Angular e evolução contínua no inglês técnico.":
    "A Systems Analysis and Development degree, deeper Angular knowledge, and continuous progress in technical English.",
  "Primeira oportunidade Front-End Júnior": "First Junior Front-End opportunity",
  "Aplicar o aprendizado em produtos reais e evoluir junto a um time de tecnologia.":
    "Apply my knowledge to real products and grow alongside a technology team.",
  "P06 · Conquistas": "P06 · Achievements",
  "Cursos e certificações": "Courses and certifications",
  "Formações que registram minha evolução em JavaScript, React, Inteligência Artificial e desenvolvimento de projetos.":
    "Programs that document my growth in JavaScript, React, Artificial Intelligence, and project development.",
  "Certificação concluída": "Certification completed",
  "Concluída em": "Completed in",
  "Formação acadêmica": "Academic education",
  "Graduação que estou cursando atualmente.": "My current degree program.",
  "Tecnologia em Análise e Desenvolvimento de Sistemas":
    "Technology in Systems Analysis and Development",
  "Graduação voltada ao desenvolvimento de software, análise de sistemas e fundamentos de tecnologia.":
    "A degree focused on software development, systems analysis, and technology foundations.",
  "Formações em andamento": "Programs in progress",
  "Conhecimentos que estou desenvolvendo atualmente.": "Knowledge I am currently developing.",
  "Em andamento": "In progress",
  "Formação em React Front-End com aplicação de Inteligência Artificial.":
    "React Front-End training with applied Artificial Intelligence.",
  "Componentização e desenvolvimento de interfaces com React.":
    "Component architecture and interface development with React.",
  "Fundamentos, DOM, assincronicidade e consumo de APIs.":
    "Fundamentals, the DOM, asynchronous programming, and API consumption.",
  "Formação TypeScript Fullstack Developer": "TypeScript Fullstack Developer Program",
  "Formação GitHub Copilot": "GitHub Copilot Program",
  "Formação Angular Developer": "Angular Developer Program",
  "TypeScript, arquitetura de aplicações, front-end e fundamentos de back-end.":
    "TypeScript, application architecture, front-end development, and back-end foundations.",
  "Uso do GitHub Copilot como apoio ao desenvolvimento, revisão e produtividade.":
    "Using GitHub Copilot to support development, code review, and productivity.",
  "Imersão prática em desenvolvimento Front-End e construção de projetos.":
    "Practical immersion in Front-End development and project building.",
  "Arquitetura web e aplicação de Inteligência Artificial no desenvolvimento.":
    "Web architecture and the application of Artificial Intelligence in development.",
  "Desenvolvimento de projetos com foco em interface, animações e apresentação visual.":
    "Project development focused on interfaces, animations, and visual presentation.",
  "Processo de descoberta, definição de problemas e criação de soluções centradas no usuário.":
    "A process for discovery, problem definition, and creating user-centered solutions.",
  "Formação técnica": "Technical training",
  Inglês: "English",
  "Inglês para tecnologia": "English for technology",
  "Desenvolvimento de aplicações com Angular, TypeScript, componentes, serviços e rotas.":
    "Application development with Angular, TypeScript, components, services, and routing.",
  "Curso de inglês com desenvolvimento progressivo de leitura, escrita, compreensão auditiva e comunicação.":
    "English course with progressive development of reading, writing, listening comprehension, and communication.",
  "Inglês aplicado à tecnologia, com foco em listening, speaking, reading e writing para entrevistas e ambientes profissionais.":
    "English for technology focused on listening, speaking, reading, and writing for interviews and professional environments.",
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
  "Dashboards personalizáveis para acompanhar finanças, vendas e marketing.":
    "Customizable dashboards for tracking finance, sales, and marketing.",
  "Aplicação Front-End para criar painéis a partir de dados próprios, com gráficos, indicadores, tabelas, insights e exportações.":
    "Front-End application for creating dashboards from personal data, with charts, metrics, tables, insights, and exports.",
  "Aplicação organizada por domínio, com cálculos separados da interface, dados tipados e persistência versionada no navegador.":
    "Application organized by domain, with calculations separated from the interface, typed data, and versioned browser storage.",
  "Transformar registros próprios em indicadores úteis e personalizáveis sem exigir cadastro em um servidor.":
    "Turn personal records into useful, customizable metrics without requiring a server account.",
  "Modelagem de dados com TypeScript, regras de cálculo por domínio, importação e exportação de arquivos, persistência local e testes automatizados.":
    "TypeScript data modeling, domain-specific calculations, file import and export, local persistence, and automated tests.",
  "Restaurar backup JSON": "Restore JSON backups",
  "Importar arquivos Excel": "Import Excel files",
  "Sincronização opcional com API": "Optional API synchronization",
  "Painéis de Finanças, Vendas e Marketing": "Finance, Sales, and Marketing dashboards",
  "Criação e personalização de dashboards": "Dashboard creation and customization",
  "Importação CSV e exportação em CSV, JSON, PNG e PDF":
    "CSV import and export to CSV, JSON, PNG, and PDF",
  "Testes automatizados para cálculos e persistência":
    "Automated tests for calculations and persistence",
  "Gestão de projetos e tarefas com Kanban, revisão e perfis demonstrativos.":
    "Project and task management with Kanban, reviews, and demo profiles.",
  "Aplicação Front-End que simula o dia a dia de uma equipe de desenvolvimento, com acompanhamento de projetos, produtividade e entregas.":
    "A Front-End application simulating a development team's workflow, with project, productivity, and delivery tracking.",
  "Regras de permissões e revisão centralizadas no Front-End, com dados demonstrativos persistidos no navegador.":
    "Permission and review rules centralized in the Front-End, with demo data stored in the browser.",
  "Organizar tarefas de uma equipe e diferenciar o trabalho individual, a revisão do Tech Lead e o acesso administrativo.":
    "Organize team tasks and distinguish individual work, Tech Lead reviews, and administrative access.",
  "Fluxos por perfil, validação de backups com Zod, transições de status e adaptação de telas densas para dispositivos móveis.":
    "Role-based flows, backup validation with Zod, status transitions, and adapting dense screens for mobile devices.",
  "Criar API e autenticação": "Build an API and authentication",
  "Persistir dados em banco": "Persist data in a database",
  "Adicionar testes automatizados": "Add automated tests",
  "Quadro Kanban e acompanhamento de projetos": "Kanban board and project tracking",
  "Revisão de entregas conforme o perfil": "Delivery reviews based on user role",
  "Relatórios de produtividade e saúde do projeto": "Productivity and project health reports",
  "Importação e exportação de backup em JSON": "JSON backup import and export",
  "Loja demonstrativa de artesanato personalizado, do catálogo ao checkout.":
    "Demo store for personalized crafts, from product browsing to checkout.",
  "Aplicação Front-End de e-commerce com busca, favoritos, carrinho, personalização de produtos e confirmação de compra demonstrativa.":
    "Front-End e-commerce application with search, favorites, cart, product customization, and demo order confirmation.",
  "Rotas com React Router, Context API para carrinho e favoritos e persistência local no navegador.":
    "React Router pages, Context API for the cart and favorites, and local browser persistence.",
  "Apresentar um fluxo de compra personalizado para produtos artesanais em telas de computador e celular.":
    "Present a personalized shopping flow for handmade products on desktop and mobile.",
  "Estado compartilhado, carrinho que diferencia personalizações, filtros na URL, imagens responsivas e acessibilidade.":
    "Shared state, a cart that distinguishes customizations, URL filters, responsive images, and accessibility.",
  "Conectar API e banco de dados": "Connect an API and database",
  "Implementar autenticação": "Implement authentication",
  "Integrar pagamento e frete": "Integrate payments and shipping",
  "Catálogo, busca e filtros por categoria": "Catalog, search, and category filters",
  "Personalização de produtos e favoritos": "Product customization and favorites",
  "Carrinho que separa itens com opções diferentes":
    "Cart that keeps differently customized items separate",
  "Checkout demonstrativo com confirmação do pedido": "Demo checkout with order confirmation",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
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
