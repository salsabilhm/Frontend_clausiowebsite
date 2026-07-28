// src/mock/clients.ts
// ------------------------------------------------------------------
// Fake / Mock data for the Clients page.
// Pure data only — no components, no hooks, no logic, no CSS.
// Will be replaced by a real API call (e.g. GET /api/clients) once
// the backend is ready. Shape matches the `Client` interface from
// "../types" (the single source of truth for this app), not a
// local/duplicate type — so DataContext, the Clients page, and any
// card component can all consume the same objects.
// ------------------------------------------------------------------
import { COLORS } from "../layouts/AuthLayout";
import { Client } from "../types";

export const clients: Client[] = [
  {
    id: "client-001",
    name: "Ahmed Bensaid",
    initials: "AB",
    avatarColor: COLORS.dark,
    company: "Bensaid Retail",
    email: "ahmed@bensaid.dz",
    phone: "+213 555 123 456",
    projectsCount: 3,
    projectIds: ["project-001"],
  },
  {
    id: "client-002",
    name: "Sarah Zerrouki",
    initials: "SZ",
    avatarColor: COLORS.coral,
    company: "Zeta Finance",
    email: "sarah@zeta.io",
    phone: "+213 660 998 001",
    projectsCount: 1,
    projectIds: ["project-002"],
  },
  {
    id: "client-003",
    name: "Ali Meftah",
    initials: "AM",
    avatarColor: COLORS.sand,
    company: "MeftahFood",
    email: "ali@meftah.com",
    phone: "+213 770 543 210",
    projectsCount: 2,
    projectIds: ["project-003"],
  },
  {
    id: "client-004",
    name: "Nora Belkacem",
    initials: "NB",
    avatarColor: COLORS.primary,
    company: "Belkacem Studio",
    email: "nora@belkacem.dz",
    phone: "+213 661 220 300",
    projectsCount: 1,
    projectIds: ["project-004"],
  },
  {
    id: "client-005",
    name: "Yacine Haddad",
    initials: "YH",
    avatarColor: "#7A5AA8",
    company: "Haddad Fintech",
    email: "yacine@haddadfin.com",
    phone: "+213 550 111 222",
    projectsCount: 4,
    projectIds: ["project-005"],
  },
  {
    id: "client-006",
    name: "Imane Cherif",
    initials: "IC",
    avatarColor: "#2E8B7A",
    company: "Cherif Health",
    email: "imane@cherifhealth.dz",
    phone: "+213 792 456 789",
    projectsCount: 2,
    projectIds: ["project-006"],
  },
];
