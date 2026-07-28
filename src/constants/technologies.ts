import {
  SiSharp,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiAngular,
  SiReact,
  SiDotnet,
  SiNestjs,
  SiReactivex,
  SiTailwindcss,
  SiBootstrap,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiRabbitmq,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
} from "react-icons/si";
import { Boxes, Database } from "lucide-react";
import type { TechBadge } from "../types";

/**
 * Shown when a technology has no Simple Icons logo. That is not only the
 * architecture concepts: Simple Icons carries no Microsoft brands either, so
 * SQL Server, Azure DevOps, Entity Framework, LINQ, gRPC, MassTransit and YARP
 * land here too. Also used by Projects when a name matches nothing at all.
 *
 * Careful: SiSolid exists but is SolidJS, not the SOLID principles.
 */
export const genericTechIcon = Boxes;

export const noelTechnologies: TechBadge[] = [
  // Programming Languages
  { name: "C#", bg: "bg-[#239120]", text: "text-black", icon: SiSharp },
  { name: "TYPESCRIPT", bg: "bg-[#3178c6]", text: "text-white", icon: SiTypescript },
  { name: "JAVASCRIPT", bg: "bg-[#f7df1e]", text: "text-black", icon: SiJavascript },
  { name: "SQL", bg: "bg-[#00758f]", text: "text-white", icon: Database },
  { name: "HTML5", bg: "bg-[#e34f26]", text: "text-black", icon: SiHtml5 },
  { name: "CSS3", bg: "bg-[#1572b6]", text: "text-white", icon: SiCss },

  // Frameworks & Libraries
  { name: "ANGULAR", bg: "bg-[#dd0031]", text: "text-white", icon: SiAngular },
  { name: "REACT", bg: "bg-[#61dafb]", text: "text-black", icon: SiReact },
  { name: ".NET CORE", bg: "bg-[#512bd4]", text: "text-white", icon: SiDotnet },
  { name: "NESTJS", bg: "bg-[#ea2845]", text: "text-black", icon: SiNestjs },
  { name: "RXJS", bg: "bg-[#e10098]", text: "text-white", icon: SiReactivex },
  { name: "TAILWIND CSS", bg: "bg-[#06b6d4]", text: "text-black", icon: SiTailwindcss },
  { name: "BOOTSTRAP", bg: "bg-[#7952b3]", text: "text-white", icon: SiBootstrap },

  // Databases & Backend Essentials
  { name: "SQL SERVER", bg: "bg-[#cc292b]", text: "text-white", icon: Database },
  { name: "POSTGRESQL", bg: "bg-[#336791]", text: "text-white", icon: SiPostgresql },
  { name: "ENTITY FRAMEWORK", bg: "bg-[#68217a]", text: "text-white", icon: Database },
  { name: "LINQ", bg: "bg-[#007acc]", text: "text-white", icon: Database },
  { name: "REDIS", bg: "bg-[#dc382d]", text: "text-white", icon: SiRedis },

  // Tools & DevOps
  { name: "AZURE DEVOPS", bg: "bg-[#0078d4]", text: "text-white", icon: Boxes },
  { name: "DOCKER", bg: "bg-[#2496ed]", text: "text-black", icon: SiDocker },
  { name: "RABBITMQ", bg: "bg-[#ff6600]", text: "text-black", icon: SiRabbitmq },
  { name: "MASSTRANSIT", bg: "bg-[#1e293b]", text: "text-teal-400", icon: Boxes },
  { name: "GRPC", bg: "bg-[#008080]", text: "text-white", icon: Boxes },
  { name: "YARP GATEWAY", bg: "bg-[#4b5563]", text: "text-white", icon: Boxes },
  { name: "GIT", bg: "bg-[#f05032]", text: "text-black", icon: SiGit },
  { name: "GITHUB", bg: "bg-[#181717]", text: "text-white", icon: SiGithub },
  { name: "GITLAB", bg: "bg-[#fc6d26]", text: "text-black", icon: SiGitlab },
  { name: "JIRA", bg: "bg-[#0052cc]", text: "text-white", icon: SiJira },

  // Architecture & Patterns
  { name: "CLEAN ARCHITECTURE", bg: "bg-[#10b981]", text: "text-black", icon: Boxes },
  { name: "MODULAR MONOLITH", bg: "bg-[#0f766e]", text: "text-white", icon: Boxes },
  { name: "SOLID", bg: "bg-[#4f46e5]", text: "text-white", icon: Boxes },
  { name: "MICROSERVICES", bg: "bg-[#0284c7]", text: "text-black", icon: Boxes },
];
