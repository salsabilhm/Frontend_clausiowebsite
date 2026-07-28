// src/mock/users.ts
// ------------------------------------------------------------------
// Fake / Mock users used to simulate authentication before the
// backend is ready. Pure data only — no logic, no components.
// ------------------------------------------------------------------

export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  password: string; // ⚠️ plain text — for local/dev simulation ONLY, never in production
  // Optional: not every mock user has these set yet. A user without
  // them will simply see empty "Company" / "Role" fields on the
  // Profile page until they fill them in via updateProfile().
  company?: string;
  role?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "user-001",
    fullName: "salsabilhm",
    email: "salsabilhm@example.com",
    password: "12345678",
    company: "Clausio",
    role: "Frontend Developer",
  },
  {
    id: "user-002",
    fullName: "Sarah Haddad",
    email: "sarah@example.com",
    password: "12345678",
    company: "TechStart Inc.",
    role: "Project Manager",
  },
  {
    id: "user-003",
    fullName: "Nora Belkacem",
    email: "nora@example.com",
    password: "12345678",
    // No company/role set on purpose: shows the "not filled in yet"
    // case -- this user will only get them after using the Profile
    // page's Edit Profile / Save Changes flow.
  },
];
