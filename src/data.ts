import type { Project } from "./types";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Portal",
    description:
      "Academic portal for FMIPA Untan. Letter tracking, diploma verification, academic calendar & live student stats - all in one place.",
    tech: ["React", "TypeScript", "Vite", "CSS", "Vercel"],
    link: "https://portalmipa.vercel.app/",
  },
  {
    id: "2",
    name: "Sekar",
    description:
      "Real-time room availability system for FMIPA Untan. Check any classroom, free or occupied, based on today's live schedule.",
    tech: ["HTML", "CSS", "JavaScript", "Material Icons", "Vercel"],
    link: "https://sekarfmipa.vercel.app/",
  },
  {
    id: "3",
    name: "Asma",
    description:
      "A lightweight web app for managing student letters at FMIPA Untan. Upload, track, and organize documents - all synced in one clean interface.",
    tech: ["HTML", "CSS", "JavaScript", "Google Sheets", "Vercel"],
    link: "https://asmamipa.vercel.app/",
  },
];
