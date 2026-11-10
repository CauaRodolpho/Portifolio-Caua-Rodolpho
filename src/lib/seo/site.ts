export const SITE_URL = "https://portifolio-caua-rodolpho-hazel.vercel.app/";
export const SITE_TITLE = "Cauã Rodolpho — Desenvolvedor Front-End Júnior";
export const SITE_DESCRIPTION =
  "Portfólio de Cauã Rodolpho, Desenvolvedor Front-End Júnior em evolução para Full Stack. Projetos com React, TypeScript, Node.js, APIs e foco em experiência de usuário.";
export const SOCIAL_IMAGE = `${SITE_URL}og-image.svg`;

export const PERSON_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cauã Rodolpho",
  jobTitle: "Desenvolvedor Front-End Júnior",
  url: SITE_URL,
  image: `${SITE_URL}profile-caua-rodolpho.webp`,
  sameAs: ["https://github.com/CauaRodolpho", "https://www.linkedin.com/in/cau%C3%A3-rodolpho/"],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "GSAP",
  ],
} as const;
