<div align="center">
  <img src="public/favicon.svg" width="82" alt="Símbolo CR do portfólio de Cauã Rodolpho" />

# Cauã Rodolpho — Portfólio

**Desenvolvedor Front-End Júnior em evolução para Full Stack**

Portfólio pessoal com projetos reais, integração com GitHub, identidade visual inspirada em interfaces de games e suporte aos idiomas português e inglês.

[Ver portfólio](https://caua-rodolpho.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/cau%C3%A3-rodolpho/) · [GitHub](https://github.com/CauaRodolpho)

</div>

---

## Sobre o projeto

Este portfólio apresenta minha evolução como desenvolvedor, minhas principais habilidades, certificações e projetos.

O design combina uma estética cyber/HUD, inspirada de forma sutil em interfaces de games, com uma apresentação profissional, responsiva e acessível.

Além do conteúdo local, o site consulta dados públicos do GitHub para exibir informações reais dos repositórios, como linguagens, estrelas, forks e datas de atualização.

## Principais recursos

* Tema claro e escuro com vídeos de fundo específicos para cada modo.
* Tradução completa entre português e inglês.
* Integração com a API pública do GitHub.
* Cards de projetos com demonstração, código-fonte e detalhes técnicos.
* Download do currículo em português ou inglês.
* Contato direto por Gmail, LinkedIn e WhatsApp.
* Animações desenvolvidas com GSAP.
* Suporte à preferência de movimento reduzido.
* Layout responsivo para celular, tablet e desktop.
* SEO básico, dados estruturados e metadados para compartilhamento.

## Tecnologias

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=06121d)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![TanStack](https://img.shields.io/badge/TanStack_Start-React-FF4154?style=for-the-badge\&logo=reactquery\&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animações-88CE02?style=for-the-badge\&logoColor=07130a)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

### Stack principal

* React 19 e TypeScript.
* TanStack Start e TanStack Router.
* Tailwind CSS 4.
* GSAP e ScrollTrigger.
* Lucide React e React Icons.
* GitHub REST API.
* Vite e Nitro.

## Projetos apresentados

| Projeto                      | Descrição                                                                                    | Links                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **AuthFlow**                 | Aplicação Full Stack de autenticação e gestão de usuários com JWT, bcrypt, Prisma e MongoDB. | [Demo](https://authflow-web-pink.vercel.app/) · [Código](https://github.com/CauaRodolpho/authflow-fullstack) |
| **Chronos**                  | Aplicação de produtividade e gestão de tempo integrada a serviços de IA.                     | [Demo](https://chronosai-one.vercel.app/) · [Código](https://github.com/CauaRodolpho/Chronos.ia)             |
| **Nexus Cloud**              | Plataforma de serviços em nuvem com arquitetura modular de Front-End.                        | [Demo](https://nexus-cloud-lyart.vercel.app/) · [Código](https://github.com/CauaRodolpho/Nexus-Cloud)        |
| **DevArt — Stranger Things** | Landing page temática e interativa com animações controladas por GSAP.                       | [Código](https://github.com/CauaRodolpho/DevArt-Strangers-things)                                            |
| **Pokedex**                  | Aplicação que consome a PokéAPI para renderizar informações de Pokémon.                      | [Código](https://github.com/CauaRodolpho/Pokedex)                                                            |

## Como executar localmente

### Requisitos

* Node.js 20 ou superior.
* npm.

### Instalação

```bash
git clone https://github.com/CauaRodolpho/Portifolio.git
cd Portifolio
npm install
npm run dev
```

Depois, abra http://localhost:5173 no navegador.

### Comandos disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

* `npm run dev`: inicia o ambiente de desenvolvimento.
* `npm run build`: gera o build de produção.
* `npm run preview`: visualiza o build localmente.
* `npm run lint`: analisa a qualidade do código.
* `npm run format`: formata os arquivos com Prettier.

## Estrutura principal

```text
src/
├── components/
│   ├── portfolio/
│   ├── language-provider.tsx
│   └── theme-provider.tsx
├── data/
│   └── portfolio.ts
├── hooks/
│   ├── useGitHubPortfolio.ts
│   └── useReveal.ts
├── lib/
├── routes/
└── styles/
    └── globals.css
```

Os arquivos públicos, como vídeos, imagens dos projetos, foto e currículos, ficam na pasta `public/`.

## Qualidade e acessibilidade

* TypeScript em modo estrito.
* ESLint e Prettier configurados.
* Fallback local caso a API do GitHub fique indisponível.
* Imagens otimizadas em WebP.
* Links externos protegidos com `noopener noreferrer`.
* Animações reduzidas quando o sistema utiliza `prefers-reduced-motion`.
* Navegação e textos adaptados aos idiomas português e inglês.

## Deploy

O projeto está preparado para build com Vite e TanStack Start e publicação na Vercel.

Quando o repositório estiver conectado à Vercel, alterações enviadas para a branch principal poderão acionar automaticamente um novo deploy.

## Contato

* **E-mail:** [cauarodolpho@gmail.com](mailto:cauarodolpho@gmail.com)
* **LinkedIn:** [linkedin.com/in/cauã-rodolpho](https://www.linkedin.com/in/cau%C3%A3-rodolpho/)
* **GitHub:** [github.com/CauaRodolpho](https://github.com/CauaRodolpho)

---

<div align="center">
  Desenvolvido por <strong>Cauã Rodolpho</strong>.
</div>
