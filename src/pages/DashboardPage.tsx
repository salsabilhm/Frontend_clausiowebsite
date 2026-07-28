import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import { useData } from "../context/DataContext";
import { ProjectStatus } from "../types";

/* ---------- Icônes ---------- */
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const IconUploadCloud = ({ color = COLORS.dark }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11z" strokeLinejoin="round" />
    <path d="M12 12v5M9.5 14.5L12 12l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconFolder = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeLinejoin="round" />
  </svg>
);
const IconFileText = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLoader = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
  </svg>
);
const IconCheckCircle = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.4 2.4L16 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTrendUp = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
    <path d="M4 17l6-6 4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 8h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconWhatsapp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <path d="M12 2C6.5 2 2 6 2 11c0 2.4 1 4.6 2.7 6.2L4 22l4.8-1.5c1 .3 2.1.5 3.2.5 5.5 0 10-4 10-9s-4.5-10-10-10z" strokeLinejoin="round" />
  </svg>
);
const IconMic = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10v1a7 7 0 0 0 14 0v-1" strokeLinecap="round" />
  </svg>
);
const IconVideo = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="M16 10l6-3v10l-6-3" strokeLinejoin="round" />
  </svg>
);
const IconManual = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSparklesSm = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);
const IconUsers = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.4 2.9-5.8 6.5-5.8s6.5 2.4 6.5 5.8" strokeLinecap="round" />
  </svg>
);
const IconDoc = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h6" strokeLinejoin="round" />
  </svg>
);
const IconPdf = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" strokeLinejoin="round" />
    <path d="M9 13h6M9 17h4" strokeLinecap="round" />
  </svg>
);

/* ---------- Mappers: transforment les données "pures" (venant de useData())
   en éléments visuels (icônes, couleurs, styles) utilisés par l'UI ---------- */

const STAT_VISUALS: Record<string, { icon: React.ReactNode; iconBg: string }> = {
  "stat-total-projects": { icon: <IconFolder color={COLORS.primary} />, iconBg: `${COLORS.primary}1A` },
  "stat-active-projects": { icon: <IconFileText color={COLORS.coral} />, iconBg: `${COLORS.coral}1A` },
  "stat-completed-projects": { icon: <IconCheckCircle color="#16A34A" />, iconBg: "#16A34A1A" },
  "stat-draft-projects": { icon: <IconLoader color={COLORS.sand} />, iconBg: `${COLORS.sand}22` },
  "stat-ai-generations": { icon: <IconSparklesSm color={COLORS.coral} />, iconBg: `${COLORS.coral}1A` },
  "stat-total-clients": { icon: <IconUsers color={COLORS.primary} />, iconBg: `${COLORS.primary}1A` },
};

const STATUS_STYLES: Record<ProjectStatus, { dot: string; text: string }> = {
  Completed: { dot: "#16A34A", text: "#16A34A" },
  Processing: { dot: COLORS.primary, text: COLORS.primary },
  Draft: { dot: COLORS.sand, text: "#B87F3E" },
};

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  WhatsApp: <IconWhatsapp />,
  "Meeting Audio": <IconMic />,
  Video: <IconVideo />,
  Manual: <IconManual />,
  Upload: <IconUploadCloud color={COLORS.textMuted} />,
  AI: <IconSparklesSm color={COLORS.sand} />,
};

const ACTIVITY_VISUALS: Record<string, { icon: React.ReactNode; iconBg: string }> = {
  AI: { icon: <IconSparklesSm color={COLORS.sand} />, iconBg: `${COLORS.sand}22` },
  Upload: { icon: <IconPdf color="#16A34A" />, iconBg: "#16A34A1A" },
  Manual: { icon: <IconUsers color={COLORS.coral} />, iconBg: `${COLORS.coral}1A` },
};

const QUICK_ACTION_ICONS: Record<string, { icon: React.ReactNode; iconBg: string }> = {
  folder: { icon: <IconFolder color={COLORS.primary} />, iconBg: `${COLORS.primary}1A` },
  uploadCloud: { icon: <IconUploadCloud />, iconBg: `${COLORS.coral}1A` },
  sparkles: { icon: <IconSparklesSm color={COLORS.sand} />, iconBg: `${COLORS.sand}22` },
  users: { icon: <IconUsers color="#16A34A" />, iconBg: "#16A34A1A" },
};

// Couleur d'avatar client, dérivée simplement du nom (pour rester déterministe)
const CLIENT_COLORS = [COLORS.dark, "#C0392B", COLORS.sand, COLORS.primary, COLORS.coral];
const clientColorFor = (name: string) => {
  const idx = name.charCodeAt(0) % CLIENT_COLORS.length;
  return CLIENT_COLORS[idx];
};

/* ---------- Page Dashboard ---------- */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardStats, recentProjects, recentActivity, quickActions } = useData();

  return (
    <DashboardLayout active="dashboard">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(79,132,169,0.1); }
          50% { box-shadow: 0 0 40px rgba(79,132,169,0.2); }
        }
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }

        .cursive-dash-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        .cursive-dash-accent {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.coral}, ${COLORS.primary});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .cursive-dash-sub {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .cursive-dash-stat {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .cursive-dash-label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .glass-dash {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .stat-card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -12px rgba(79,132,169,0.25);
        }
        .btn-glow {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-glow:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(79,132,169,0.3);
        }
        .project-row {
          transition: background 0.2s ease;
        }
        .project-row:hover {
          background: rgba(79,132,169,0.04);
        }
        .quick-action-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .quick-action-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px -12px rgba(79,132,169,0.2);
          border-color: ${COLORS.primary}40;
        }
        .bubble-float {
          animation: floatBubble 6s ease-in-out infinite;
        }
      `}</style>

      {/* Welcome banner avec style décoratif et background amélioré */}
      <div
        className="rounded-3xl p-8 lg:p-10 relative overflow-hidden mb-6 glass-dash"
        style={{
          background: `
            radial-gradient(60% 80% at 15% 20%, ${COLORS.primary}20 0%, rgba(255,255,255,0) 60%),
            radial-gradient(55% 90% at 90% 30%, ${COLORS.coral}20 0%, rgba(255,255,255,0) 60%),
            radial-gradient(40% 60% at 50% 80%, ${COLORS.sand}18 0%, rgba(255,255,255,0) 50%)
          `,
          borderColor: "rgba(255,255,255,0.6)",
        }}
      >
        {/* Éléments décoratifs flottants */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl" style={{ background: COLORS.coral, opacity: 0.15 }} />
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-3xl" style={{ background: COLORS.primary, opacity: 0.12 }} />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full blur-3xl" style={{ background: COLORS.beige, opacity: 0.1 }} />

        {/* Petites bulles décoratives */}
        <div className="absolute top-4 right-20 w-2 h-2 rounded-full bubble-float" style={{ background: COLORS.coral, opacity: 0.3 }} />
        <div className="absolute bottom-12 left-16 w-3 h-3 rounded-full bubble-float" style={{ background: COLORS.primary, opacity: 0.2, animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-12 w-1.5 h-1.5 rounded-full bubble-float" style={{ background: COLORS.sand, opacity: 0.25, animationDelay: "2s" }} />

        <span
          className="inline-flex items-center gap-2 text-[13px] font-medium rounded-full px-4 py-1.5 mb-6"
          style={{ background: "#16A34A18", color: "#16A34A" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#16A34A" }} />
          ✦ AI engine online
        </span>

        <h1 className="cursive-dash-title text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#151f27" }}>
          Welcome back to <span className="cursive-dash-accent">Clausio</span>
        </h1>
        <p className="cursive-dash-sub text-[15px] max-w-xl leading-relaxed mb-7" style={{ color: COLORS.textMuted }}>
          Manage your AI-powered project documentation in one place. Turn conversations into
          structured specs in minutes.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/projects/new")}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-semibold btn-glow"
            style={{ background: COLORS.dark }}
          >
            <IconPlus /> ✦ New Project
          </button>
          <button
            onClick={() => navigate("/ai-contract-generator")}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold border bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all"
            style={{ color: COLORS.text, borderColor: "#E5E9EC" }}
          >
            <IconUploadCloud /> Upload Conversation
          </button>
        </div>
      </div>

      {/* Stats — dashboardStats calculées en direct depuis useData() */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {dashboardStats.map((s) => {
          const visuals = STAT_VISUALS[s.id];
          return (
            <div
              key={s.id}
              className="rounded-2xl p-5 border bg-white/80 backdrop-blur-sm stat-card-hover glass-dash"
              style={{ borderColor: "rgba(233,237,240,0.6)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: visuals?.iconBg }}
                >
                  {visuals?.icon}
                </div>
                <span
                  className="inline-flex items-center gap-1 text-[12px] font-medium rounded-full px-2.5 py-1"
                  style={{
                    background: s.isLive ? `${COLORS.sand}22` : "#16A34A14",
                    color: s.isLive ? "#B87F3E" : "#16A34A",
                  }}
                >
                  {!s.isLive && <IconTrendUp />}
                  {s.trend}
                </span>
              </div>
              <div className="cursive-dash-stat text-2xl" style={{ color: "#151f27" }}>
                {s.value}
              </div>
              <div className="cursive-dash-sub text-[14px] mt-1" style={{ color: COLORS.textMuted }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent projects + activity */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Recent projects table — recentProjects calculés en direct depuis useData() */}
        <div className="lg:col-span-2 rounded-2xl border bg-white/80 backdrop-blur-sm glass-dash p-6" style={{ borderColor: "rgba(233,237,240,0.6)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="cursive-dash-title text-[17px] font-semibold" style={{ color: "#151f27" }}>
                Recent Projects
              </h2>
              <p className="cursive-dash-sub text-[13px]" style={{ color: COLORS.textMuted }}>
                Latest AI-generated specifications
              </p>
            </div>
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full border px-3.5 py-1.5 transition-all hover:scale-105 hover:bg-white/50"
              style={{ borderColor: "#E5E9EC", color: COLORS.text }}
            >
              View all <IconExternal />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
              <tr className="cursive-dash-label text-[11px] uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
              </thead>
              <tbody>
              {recentProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/document-editor?projectId=${p.id}`)}
                  className="border-t project-row cursor-pointer"
                  style={{ borderColor: "#F1F3F5" }}
                >
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${COLORS.primary}14` }}
                      >
                        <IconDoc color={COLORS.primary} />
                      </div>
                      <div>
                        <div className="cursive-dash-title text-[14px] font-medium" style={{ color: COLORS.text }}>
                          {p.name}
                        </div>
                        <div className="cursive-dash-sub text-[12px]" style={{ color: COLORS.textMuted }}>
                          {p.progress}% complete
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                        style={{ background: clientColorFor(p.clientName) }}
                      >
                        {p.clientName[0]}
                      </div>
                      <span className="cursive-dash-sub text-[14px]" style={{ color: COLORS.text }}>
                          {p.clientName}
                        </span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[12.5px] rounded-full px-2.5 py-1"
                        style={{ background: "#F1F3F5", color: COLORS.textMuted }}
                      >
                        {SOURCE_ICONS[p.source]}
                        {p.source}
                      </span>
                  </td>
                  <td className="py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium cursive-dash-sub"
                        style={{ color: STATUS_STYLES[p.status].text }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: STATUS_STYLES[p.status].dot }}
                        />
                        {p.status}
                      </span>
                  </td>
                </tr>
              ))}
              {recentProjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm" style={{ color: COLORS.textMuted }}>
                    No projects yet — create your first one to see it here.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent activity — recentActivity venant de useData() (mise à jour à chaque action) */}
        <div className="rounded-2xl border bg-white/80 backdrop-blur-sm glass-dash p-6" style={{ borderColor: "rgba(233,237,240,0.6)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="cursive-dash-title text-[17px] font-semibold" style={{ color: "#151f27" }}>
              Recent Activity
            </h2>
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-medium rounded-full px-2.5 py-1"
              style={{ background: "#16A34A14", color: "#16A34A" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#16A34A" }} />
              Live
            </span>
          </div>
          <p className="cursive-dash-sub text-[13px] -mt-3 mb-5" style={{ color: COLORS.textMuted }}>
            Live feed from your workspace
          </p>

          <div className="space-y-5">
            {recentActivity.slice(0, 4).map((a) => {
              const visuals = ACTIVITY_VISUALS[a.source];
              return (
                <div key={a.id} className="flex items-start gap-3 group transition-all hover:translate-x-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: visuals?.iconBg }}
                  >
                    {visuals?.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="cursive-dash-title text-[14px] font-medium" style={{ color: COLORS.text }}>
                      {a.title}
                    </div>
                    <div className="cursive-dash-sub text-[13px] truncate" style={{ color: COLORS.textMuted }}>
                      {a.description}
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: "#9AA5AB" }}>
                      {a.time}
                    </div>
                  </div>
                </div>
              );
            })}
            {recentActivity.length === 0 && (
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                No activity yet.
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/history")}
            className="w-full mt-6 rounded-xl py-2.5 text-sm font-semibold border transition-all hover:scale-[1.02] bg-white/50 hover:bg-white/70"
            style={{ borderColor: "#E5E9EC", color: COLORS.text }}
          >
            View all activity
          </button>
        </div>
      </div>

      {/* Quick actions — quickActions venant de useData() */}
      <div>
        <h2 className="cursive-dash-title text-[17px] font-semibold mb-4" style={{ color: "#151f27" }}>
          Quick Actions ✦
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((q) => {
            const visuals = QUICK_ACTION_ICONS[q.icon];
            return (
              <button
                key={q.id}
                onClick={() => navigate(q.route)}
                className="rounded-2xl border bg-white/80 backdrop-blur-sm p-5 flex flex-col items-start gap-4 text-left quick-action-card glass-dash"
                style={{ borderColor: "rgba(233,237,240,0.6)" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: visuals?.iconBg }}
                >
                  {visuals?.icon}
                </div>
                <span className="cursive-dash-title text-[14.5px] font-medium" style={{ color: COLORS.text }}>
                  {q.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
