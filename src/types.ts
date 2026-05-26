export type Lang = "en" | "id";
export type Theme = "dark" | "light";

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
}
