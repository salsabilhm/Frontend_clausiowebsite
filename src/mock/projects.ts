// src/mock/projects.ts
// ------------------------------------------------------------------
// Fake / Mock data for the Projects page.
// Pure data only — no components, no hooks, no logic, no CSS.
// Will be replaced by a real API call (e.g. GET /api/projects) once
// the backend is ready. Shape matches the `Project` interface from
// "../types" (not a local/duplicate type), so it plugs directly into
// DataContext and ProjectCardData (= Pick<Project, ...>) still works
// unchanged for the Projects page cards.
// ------------------------------------------------------------------
import { COLORS } from "../layouts/AuthLayout";
import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "project-001",
    name: "E-commerce Platform",
    clientId: "client-001",
    clientName: "Ahmed Bensaid",
    clientColor: COLORS.dark,
    source: "WhatsApp",
    status: "Completed",
    progress: 100,
    updatedAgo: "2h ago",
    createdAt: "2026-07-18T09:00:00.000Z",
    updatedAt: "2026-07-24T14:00:00.000Z",
  },
  {
    id: "project-002",
    name: "Mobile Banking App",
    clientId: "client-002",
    clientName: "Sarah Zerrouki",
    clientColor: "#C0392B",
    source: "Meeting Audio",
    status: "Processing",
    progress: 62,
    updatedAgo: "5h ago",
    createdAt: "2026-07-15T10:30:00.000Z",
    updatedAt: "2026-07-24T11:00:00.000Z",
  },
  {
    id: "project-003",
    name: "Restaurant Website",
    clientId: "client-003",
    clientName: "Ali Meftah",
    clientColor: COLORS.sand,
    source: "Video",
    status: "Draft",
    progress: 20,
    updatedAgo: "1d ago",
    createdAt: "2026-07-20T08:00:00.000Z",
    updatedAt: "2026-07-23T16:00:00.000Z",
  },
  {
    id: "project-004",
    name: "SaaS Analytics Suite",
    clientId: "client-004",
    clientName: "Nora Belkacem",
    clientColor: COLORS.primary,
    source: "Meeting Audio",
    status: "Completed",
    progress: 100,
    updatedAgo: "1d ago",
    createdAt: "2026-07-10T09:00:00.000Z",
    updatedAt: "2026-07-23T13:00:00.000Z",
  },
  {
    id: "project-005",
    name: "Fintech Onboarding Flow",
    clientId: "client-005",
    clientName: "Yacine Haddad",
    clientColor: "#7A5AA8",
    source: "WhatsApp",
    status: "Processing",
    progress: 45,
    updatedAgo: "2d ago",
    createdAt: "2026-07-12T09:00:00.000Z",
    updatedAt: "2026-07-22T10:00:00.000Z",
  },
  {
    id: "project-006",
    name: "Healthcare Portal",
    clientId: "client-006",
    clientName: "Imane Cherif",
    clientColor: "#2E8B7A",
    source: "Video",
    status: "Draft",
    progress: 8,
    updatedAgo: "3d ago",
    createdAt: "2026-07-14T09:00:00.000Z",
    updatedAt: "2026-07-21T15:00:00.000Z",
  },
];
