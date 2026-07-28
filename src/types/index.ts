// src/types/index.ts
// ------------------------------------------------------------------
// Centralized Types for the entire application
// All types are defined here to ensure consistency across the app
// ------------------------------------------------------------------

// ============================================================
// USER & AUTH TYPES
// ============================================================

export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  company?: string;
  role?: string;
  avatar?: string | null;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  avatar?: string | null;
  company?: string;
  role?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  autoGenerateSpec: boolean;
  autoSave: boolean;
  defaultExportFormat: 'PDF' | 'DOCX' | 'Markdown';
  aiOutputLanguage: 'English' | 'Français' | 'Arabic';
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ============================================================
// PROJECT TYPES (with relation to Client)
// ============================================================

export type ProjectStatus = 'Completed' | 'Processing' | 'Draft';
export type ProjectSource = 'WhatsApp' | 'Meeting Audio' | 'Video' | 'Manual';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  clientColor?: string;
  status: ProjectStatus;
  progress: number;
  source: ProjectSource;
  updatedAgo?: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  budget?: number;
  deadline?: string;
  tags?: string[];
}

export interface ProjectCardData {
  name: string;
  client: string;
  clientColor: string;
  source: ProjectSource;
  status: ProjectStatus;
  progress: number;
  updatedAgo: string;
}

// ============================================================
// CLIENT TYPES (with relation to Projects)
// ============================================================

export interface Client {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  company: string;
  email: string;
  phone: string;
  projectsCount: number;
  projectIds?: string[];
  createdAt?: string;
  updatedAt?: string;
  address?: string;
  website?: string;
  notes?: string;
}

export type ClientCardData = Pick<
  Client,
  'name' | 'initials' | 'avatarColor' | 'company' | 'email' | 'phone' | 'projectsCount'
>;

// ============================================================
// CONTRACT / HISTORY TYPES (with relations)
// ============================================================

export type ContractStatus = 'draft' | 'completed' | 'archived';
export type ContractType = 'specification' | 'proposal' | 'contract';

export interface Contract {
  id: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  createdAt: Date;
  lastModified: Date;
  status: ContractStatus;
  version: string;
  type: ContractType;
  description: string;
  readingTime: number;
  wordCount: number;
  isFavorite: boolean;
  content?: string;
  sections?: ContractSection[];
  generatedBy?: string;
  template?: string;
}

export interface ContractSection {
  id: string;
  contractId?: string;
  title: string;
  content: string;
  order?: number;
  version?: number;
}

// ============================================================
// DASHBOARD TYPES
// ============================================================

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  trend: string;
  isLive?: boolean;
}

export type RecentProject = Pick<
  Project,
  'id' | 'name' | 'clientName' | 'status' | 'progress' | 'source' | 'createdAt' | 'updatedAt'
>;

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  user: string;
  userId?: string;
  source: 'AI' | 'Upload' | 'Manual';
  projectId?: string;
  clientId?: string;
  contractId?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: 'folder' | 'uploadCloud' | 'sparkles' | 'users' | 'settings' | 'fileText' | 'calendar' | 'plus' | 'search';
  route: string;
  permission?: string[];
}

// ============================================================
// AI CONTRACT GENERATOR TYPES
// ============================================================

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed';
  order?: number;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  projectId?: string;
  clientId?: string;
}

export interface AiGenerationOptions {
  language: 'English' | 'Français' | 'Arabic';
  format: 'PDF' | 'DOCX' | 'Markdown';
  includeSections: string[];
  tone?: 'formal' | 'casual' | 'technical';
  targetAudience?: 'internal' | 'client' | 'investor';
}

export interface AiGenerationResult {
  id: string;
  projectId: string;
  clientId: string;
  content: string;
  sections: ContractSection[];
  metadata: {
    generatedAt: Date;
    processingTime: number;
    model: string;
    version: string;
  };
  suggestions?: string[];
}

// ============================================================
// SETTINGS TYPES
// ============================================================

export interface WorkspaceSettings {
  autoGenerateSpec: boolean;
  autoSave: boolean;
  defaultExportFormat: 'PDF' | 'DOCX' | 'Markdown';
  aiOutputLanguage: 'English' | 'Français' | 'Arabic';
  defaultTemplate?: string;
  branding?: {
    companyName?: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  security?: {
    sessionTimeout?: number;
    require2FA?: boolean;
  };
  integrations?: {
    slack?: boolean;
    googleDrive?: boolean;
    dropbox?: boolean;
  };
}

// ============================================================
// API RESPONSE TYPES (for future backend integration)
// ============================================================

export type ApiData =
  | Project
  | Client
  | Contract
  | UserPreferences
  | WorkspaceSettings
  | Project[]
  | Client[]
  | Contract[]
  | Record<string, unknown>;

export interface ApiResponse<T = ApiData> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  metadata?: {
    timestamp: string;
    version: string;
  };
}

export interface PaginatedResponse<T = ApiData> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string | number | boolean>;
}

// ============================================================
// PROFILE TYPES (uses AuthUser and UserPreferences)
// ============================================================

export interface ProfileData {
  fullName: string;
  email: string;
  company: string;
  role: string;
  password: string;
  newPassword: string;
  avatar: string | null;
  preferences?: UserPreferences;
  phone?: string;
  location?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// ============================================================
// NAVIGATION TYPES
// ============================================================

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
  children?: NavItem[];
  permission?: string[];
  badge?: number;
}

export type AuthMode = 'signin' | 'signup';

// ============================================================
// FILE & UPLOAD TYPES (with relations)
// ============================================================

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  createdAt: Date;
  projectId?: string;
  clientId?: string;
  uploadedBy: string;
  metadata?: {
    duration?: number;
    pages?: number;
    wordCount?: number;
  };
}

// ============================================================
// NOTIFICATION TYPES (with relations)
// ============================================================

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
  createdAt: Date;
  userId?: string;
  action?: {
    label: string;
    route: string;
  };
  metadata?: {
    projectId?: string;
    clientId?: string;
    contractId?: string;
    source?: string;
  };
  priority?: 'low' | 'medium' | 'high';
}

// ============================================================
// STATS & ANALYTICS TYPES
// ============================================================

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  draftProjects: number;
  byStatus: Record<ProjectStatus, number>;
  bySource: Record<ProjectSource, number>;
  averageProgress: number;
  completionRate: number;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  averageProjectsPerClient: number;
  topClients: {
    clientId: string;
    clientName: string;
    projectCount: number;
  }[];
}

export interface ContractStats {
  totalContracts: number;
  byType: Record<ContractType, number>;
  byStatus: Record<ContractStatus, number>;
  averageReadingTime: number;
  totalWordCount: number;
}

// ============================================================
// ACTIVITY LOG TYPES
// ============================================================

export interface ActivityLog {
  id: string;
  userId: string;
  userFullName: string;
  action: string;
  entityType: 'project' | 'client' | 'contract' | 'user' | 'settings';
  entityId?: string;
  entityName?: string;
  details: Record<string, string | number | boolean>;
  timestamp: Date;
  ipAddress?: string;
}

// ============================================================
// SEARCH & FILTER TYPES
// ============================================================

export interface SearchFilters {
  query?: string;
  status?: string[];
  type?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface SearchResult<T = Record<string, unknown>> {
  items: T[];
  total: number;
  query: string;
  filters: SearchFilters;
}

// ============================================================
// EXPORT TYPES (for export features)
// ============================================================

export interface ExportOptions {
  format: 'PDF' | 'DOCX' | 'Markdown' | 'JSON' | 'CSV';
  includeMetadata: boolean;
  includeSections?: string[];
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
}

export interface ExportResult {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  format: string;
  generatedAt: Date;
  expiresAt?: Date;
}

// ============================================================
// UTILITY TYPES (to help with common operations)
// ============================================================

export type EntityType = 'project' | 'client' | 'contract' | 'user';

export type EntityMap = {
  project: Project;
  client: Client;
  contract: Contract;
  user: AuthUser;
};

export type EntityId<T extends EntityType> = EntityMap[T]['id'];

export type EntityName<T extends EntityType> = EntityMap[T] extends { name: string }
  ? string
  : EntityMap[T] extends { fullName: string }
    ? string
    : never;

export type WithTimestamps = {
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type WithId = {
  id: string;
};

export type Maybe<T> = T | null | undefined;

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: string;
  direction: SortDirection;
}

export interface FilterOption {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
  value: string | number | boolean | Date;
}

export interface QueryOptions {
  sort?: SortOption[];
  filter?: FilterOption[];
  limit?: number;
  offset?: number;
  include?: string[];
}

// ============================================================
// THEME TYPES
// ============================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// ============================================================
// FORM TYPES
// ============================================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string | number }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => boolean;
    message?: string;
  };
}

export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================
// ROUTE TYPES
// ============================================================

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  protected?: boolean;
  permissions?: string[];
  title?: string;
  children?: RouteConfig[];
}

// ============================================================
// SOCKET / REALTIME TYPES
// ============================================================

export interface WebSocketEvent<T = unknown> {
  event: string;
  data: T;
  timestamp: Date;
}

export interface RealtimeUpdate {
  type: 'create' | 'update' | 'delete';
  entity: EntityType;
  id: string;
  data?: Record<string, unknown>;
}

// ============================================================
// ANALYTICS / TRACKING TYPES
// ============================================================

export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, string | number | boolean>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface PageViewEvent {
  path: string;
  title: string;
  referrer?: string;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

// ============================================================
// SETTINGS & PLANS TYPES
// ============================================================

export type BillingCycle = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "inactive" | "cancelled" | "expired";
export type SupportLevel = "email" | "priority" | "24/7";

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
  icon: string;
  limits: {
    projects: number | 'unlimited';
    teamMembers: number | 'unlimited';
    aiGenerations: number | 'unlimited';
    storage: string;
    support: SupportLevel;
  };
}

export interface UserSubscription {
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  billingCycle: BillingCycle;
  autoRenew: boolean;
  paymentMethod?: string;
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
