// src/mock/settings.ts
// ------------------------------------------------------------------
// Fake / Mock data for Settings and Upgrade pages.
// Pure data only — no components, no hooks, no logic, no CSS.
// Will be replaced by a real API call (e.g. GET /api/settings) once
// the backend is ready.
// ------------------------------------------------------------------

import { UserPreferences, WorkspaceSettings } from "../types";

// ============================================================
// TYPES (defined locally to avoid conflicts)
// ============================================================

export interface PlanFeature {
  label: string;
  included: boolean;
  tooltip?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  icon: string; // icon name for mapping
  limits: {
    projects: number | 'unlimited';
    teamMembers: number | 'unlimited';
    aiGenerations: number | 'unlimited';
    storage: string;
    support: 'email' | 'priority' | '24/7';
  };
}

export type BillingCycle = 'monthly' | 'yearly';

export interface UserSubscription {
  planId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  billingCycle: BillingCycle;
  autoRenew: boolean;
  paymentMethod?: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  version: string;
  lastUpdated: Date;
  features: {
    aiGeneration: boolean;
    documentEditor: boolean;
    teamCollaboration: boolean;
    analytics: boolean;
  };
}

export interface BillingRecord {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  plan: string;
  description: string;
  invoiceUrl?: string;
}

// ============================================================
// DEFAULT USER PREFERENCES
// ============================================================

export const defaultPreferences: UserPreferences = {
  autoGenerateSpec: true,
  autoSave: true,
  defaultExportFormat: "PDF",
  aiOutputLanguage: "English",
  theme: "light",
  notifications: true,
};

// ============================================================
// DEFAULT WORKSPACE SETTINGS
// ============================================================

export const defaultWorkspaceSettings: WorkspaceSettings = {
  autoGenerateSpec: true,
  autoSave: true,
  defaultExportFormat: "PDF",
  aiOutputLanguage: "English",
  defaultTemplate: "Standard",
  branding: {
    companyName: "Clausio",
    logo: "", // ✅ Changed from null to empty string
    primaryColor: "#4F84A9",
    secondaryColor: "#2C4A6B",
  },
  security: {
    sessionTimeout: 30,
    require2FA: false,
  },
  integrations: {
    slack: false,
    googleDrive: false,
    dropbox: false,
  },
};

// ============================================================
// PLANS DATA
// ============================================================

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    currency: "$",
    period: "per month",
    description: "Perfect for individuals and small projects.",
    icon: "sparkle",
    popular: false,
    limits: {
      projects: 5,
      teamMembers: 1,
      aiGenerations: 5,
      storage: "5 GB",
      support: "email",
    },
    features: [
      { label: "5 AI-generated specs per month", included: true },
      { label: "Basic project management", included: true },
      { label: "PDF export", included: true },
      { label: "Email support", included: true },
      { label: "Advanced analytics", included: false },
      { label: "Team collaboration", included: false },
      { label: "Priority support", included: false },
      { label: "Custom AI training", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    currency: "$",
    period: "per month",
    description: "Best for professionals and growing teams.",
    icon: "crown",
    popular: true,
    limits: {
      projects: 'unlimited',
      teamMembers: 5,
      aiGenerations: 'unlimited',
      storage: "50 GB",
      support: "priority",
    },
    features: [
      { label: "Unlimited AI-generated specs", included: true },
      { label: "Advanced project management", included: true },
      { label: "All export formats (PDF, DOCX, Markdown)", included: true },
      { label: "Priority email support", included: true },
      { label: "Advanced analytics & insights", included: true },
      { label: "Team collaboration (up to 5 members)", included: true },
      { label: "Priority support 24/7", included: true },
      { label: "Custom AI training", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    currency: "$",
    period: "per month",
    description: "For large teams with custom needs.",
    icon: "building",
    popular: false,
    limits: {
      projects: 'unlimited',
      teamMembers: 'unlimited',
      aiGenerations: 'unlimited',
      storage: "500 GB",
      support: "24/7",
    },
    features: [
      { label: "Unlimited AI-generated specs", included: true },
      { label: "Enterprise project management", included: true },
      { label: "All export formats", included: true },
      { label: "Priority support 24/7", included: true },
      { label: "Advanced analytics & insights", included: true },
      { label: "Unlimited team collaboration", included: true },
      { label: "Custom AI training", included: true },
      { label: "Dedicated account manager", included: true },
    ],
  },
];

// ============================================================
// USER SUBSCRIPTION DATA
// ============================================================

export const defaultSubscription: UserSubscription = {
  planId: "starter",
  status: "active",
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  billingCycle: "monthly",
  autoRenew: true,
  paymentMethod: "Credit Card",
};

// ============================================================
// SYSTEM SETTINGS
// ============================================================

export const systemSettings: SystemSettings = {
  maintenanceMode: false,
  version: "2.1.0",
  lastUpdated: new Date(),
  features: {
    aiGeneration: true,
    documentEditor: true,
    teamCollaboration: true,
    analytics: true,
  },
};

// ============================================================
// BILLING HISTORY
// ============================================================

export const billingHistory: BillingRecord[] = [
  {
    id: "bill-001",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    amount: 49,
    currency: "$",
    status: "paid",
    plan: "Pro",
    description: "Pro Plan - Monthly Subscription",
    invoiceUrl: "#",
  },
  {
    id: "bill-002",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    amount: 49,
    currency: "$",
    status: "paid",
    plan: "Pro",
    description: "Pro Plan - Monthly Subscription",
    invoiceUrl: "#",
  },
  {
    id: "bill-003",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    amount: 19,
    currency: "$",
    status: "paid",
    plan: "Starter",
    description: "Starter Plan - Monthly Subscription",
    invoiceUrl: "#",
  },
];
