// src/mock/dashboard.ts
// ------------------------------------------------------------------
// Fake / Mock Data for the Dashboard page.
// This file contains ONLY data (no components, no API calls,
// no hooks, no business logic, no CSS).
// It simulates the future backend response and will be replaced
// by real API calls once the backend is ready — the dashboard
// UI itself will not need to change.
// ------------------------------------------------------------------

/* ============================================================
   1. TYPES
   ============================================================ */
import { RecentActivity, QuickAction } from "../types";

export const initialRecentActivity: RecentActivity[] = [
  {
    id: "activity-1",
    title: "Specification generated",
    description: "E-commerce Platform · 12 sections",
    date: new Date().toISOString().slice(0, 10),
    time: "2 min ago",
    user: "You",
    source: "AI",
  },
  {
    id: "activity-2",
    title: "Client added",
    description: "Nora Belkacem · Fintech",
    date: new Date().toISOString().slice(0, 10),
    time: "1 hr ago",
    user: "You",
    source: "Manual",
  },
  {
    id: "activity-3",
    title: "AI improved document",
    description: "Restaurant Website · +14 refinements",
    date: new Date().toISOString().slice(0, 10),
    time: "3 hr ago",
    user: "You",
    source: "AI",
  },
  {
    id: "activity-4",
    title: "PDF exported",
    description: "Mobile Banking App · v2.pdf",
    date: new Date().toISOString().slice(0, 10),
    time: "Yesterday",
    user: "You",
    source: "Upload",
  },
];

export const quickActionsList: QuickAction[] = [
  {
    id: "qa-new-project",
    title: "New Project",
    description: "Start a new project from scratch",
    icon: "folder",
    route: "/projects/new",
  },
  {
    id: "qa-upload-file",
    title: "Upload File",
    description: "Upload a conversation or document",
    icon: "uploadCloud",
    route: "/ai-contract-generator",
  },
  {
    id: "qa-ai-assistant",
    title: "Ask AI Assistant",
    description: "Generate a spec with AI",
    icon: "sparkles",
    route: "/ai-contract-generator",
  },
  {
    id: "qa-add-client",
    title: "Add Client",
    description: "Create a new client profile",
    icon: "users",
    route: "/clients/new",
  },
];

