export type Language = "en" | "es";
export type Theme = "light" | "dark";

export interface PersonalInfo {
  name: string;
  titles: Record<Language, string[]>;
  specialty: Record<Language, string>;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  summary: Record<Language, string[]>;
}

export interface SkillGroup {
  category: Record<Language, string>;
  skills: string[];
}

export interface Experience {
  role: Record<Language, string>;
  company: string;
  period: string;
  highlights: Record<Language, string[]>;
}

/**
 * `status` is a union rather than free text so it maps straight onto the colour
 * rule: "production" renders emerald, "development" amber. See DESIGN.md.
 * `technologies` should match names in constants/technologies.ts to pick up the
 * official brand colour; anything unknown falls back to a neutral chip.
 */
export interface Project {
  name: string;
  description: Record<Language, string>;
  technologies: string[];
  /** Optional: personal projects often have no date worth showing. */
  period?: string;
  status: "production" | "development";
  repoUrl?: string;
  demoUrl?: string;
}

export interface Education {
  degree: Record<Language, string>;
  institution: string;
  period: string;
  status: Record<Language, string>;
}

export interface Certification {
  title: string;
  institution?: string;
  period: string;
  url?: string;
  status?: Record<Language, string>;
}

export interface TechBadge {
  name: string;
  bg: string;
  text: string;
  dotBg: string;
}

export interface LanguageProficiency {
  name: string;
  level: string;
}
