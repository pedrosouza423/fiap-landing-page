import type { CoursesMock } from "./types";

export const coursesMock: CoursesMock = {
  header: {
    title: "Cursos",
    subtitle: "Cursos de Curta Duração",
  },
  categories: [
    { key: "Tecnologia", label: "Tecnologia" },
    { key: "Inovação", label: "Inovação" },
    { key: "Negócios", label: "Negócios" },
  ],
  itemsByCategory: {
    Tecnologia: [
      { title: "Big Data Ecosystem", tags: ["remoto", "live"] },
      { title: "Creating Dashboards for BI", tags: ["remoto", "live", "multimídia"] },
      { title: "Big Data Science - Machine Learning & Data Mining", tags: ["remoto", "live"] },
      { title: "Storytelling", tags: ["remoto", "live", "multimídia"] },
    ],
    Inovação: [
      { title: "UX", tags: ["remoto", "live"] },
      { title: "UX Writing", tags: ["remoto"] },
      { title: "Chatbots", tags: ["remoto", "live", "multimídia"] },
    ],
    Negócios: [
      { title: "Agile Culture", tags: ["live"] },
      { title: "DPO Data Protection Officer", tags: ["remoto", "live"] },
      { title: "IT Business Partner", tags: ["remoto", "live", "multimídia"] },
      { title: "Perícia Forense Computacional", tags: ["remoto", "live", "multimídia"] },
      { title: "Growth Hacking", tags: ["remoto"] },
    ],
  },
};
