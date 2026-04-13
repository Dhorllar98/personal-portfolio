import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description: "My corner of the internet, built deliberately using AI-assisted development with Claude Code. A production-ready full-stack portfolio applying backend engineering principles — clean architecture, JWT authentication, rate-limited APIs, and a markdown blog — with a React frontend and ASP.NET Core 9 backend backed by Supabase.",
    tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "ASP.NET Core 9", "Supabase", "Claude Code"],
    github: "https://github.com/Dhorllar98/personal-portfolio",
    demo: "#",
  },
  {
    title: "Clinical Task Management API",
    description: "A clean-architecture ASP.NET Core Web API for clinical trial management with JWT authentication and EF Core. Covers trials, sites, and user management with structured domain separation across Domain, Application, Infrastructure, and API layers.",
    tags: ["C#", "ASP.NET Core 9", "EF Core", "JWT", "Clean Architecture"],
    github: "https://github.com/Dhorllar98/clinical-task-management-api",
    demo: "#",
  },
  {
    title: "Fashion & Lifestyle v1",
    description: "A full-stack custom clothing platform with a design catalogue, measurements system, order placement, and real-time order tracking. React frontend consuming an ASP.NET Core backend — deployed live on Vercel and Render.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "ASP.NET Core 9", "C#"],
    github: "https://github.com/Dhorllar98/fashion-and-lifestyle-v1",
    demo: "https://fashion-and-lifestyle-v1.vercel.app",
  },
  {
    title: "QR Attendance API",
    description: "A team-built QR code attendance tracking API handling session management, QR code generation, and attendance recording. Contributed backend architecture and core API endpoints as part of a collaborative development program.",
    tags: ["C#", "ASP.NET Core", "REST API", "QR Code"],
    github: "https://github.com/conclase-cohort-8/qr-attendance-api",
    demo: "#",
  },
]