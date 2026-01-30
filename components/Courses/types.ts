export type CourseCategory = "Tecnologia" | "Inovação" | "Negócios";

export type CourseMode = "remoto" | "live" | "multimídia";

export type CourseItem = {
  title: string;
  tags: string[];
};

export type CoursesMock = {
  header: {
    title: string;
    subtitle: string;
  };
  categories: {
    key: CourseCategory;
    label: string;
  }[];
  itemsByCategory: Record<CourseCategory, CourseItem[]>;
};
