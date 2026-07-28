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
