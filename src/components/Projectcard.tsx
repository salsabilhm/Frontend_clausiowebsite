import React from "react";
import { COLORS } from "../layouts/AuthLayout";

export type ProjectStatus = "Completed" | "Processing" | "Draft";

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; dot: string; glow: string }> = {
  Completed: {
    bg: "#16A34A14",
    text: "#16A34A",
    dot: "#16A34A",
    glow: "0 0 20px rgba(22,163,74,0.2)"
  },
  Processing: {
    bg: `${COLORS.primary}14`,
    text: COLORS.primary,
    dot: COLORS.primary,
    glow: `0 0 20px ${COLORS.primary}25`
  },
  Draft: {
    bg: `${COLORS.sand}22`,
    text: "#B87F3E",
    dot: COLORS.sand,
    glow: `0 0 20px ${COLORS.sand}25`
  },
};

const IconFileText = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMore = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
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
const IconSparkle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  WhatsApp: <IconWhatsapp />,
  "Meeting Audio": <IconMic />,
  Video: <IconVideo />,
};

export interface ProjectCardData {
  name: string;
  client: string;
  clientColor: string;
  source: string;
  status: ProjectStatus;
  progress: number;
  updatedAgo: string;
}

const ProjectCard: React.FC<{ project: ProjectCardData }> = ({ project }) => {
  const statusStyle = STATUS_STYLES[project.status];

  return (
    <div
      className="group rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(233,237,240,0.6)",
        boxShadow: "0 4px 20px rgba(79,132,169,0.04)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 50px rgba(79,132,169,0.12)";
        e.currentTarget.style.borderColor = `${COLORS.primary}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,132,169,0.04)";
        e.currentTarget.style.borderColor = "rgba(233,237,240,0.6)";
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(3deg); }
        }

        .card-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatIcon 4s ease-in-out infinite;
          background: ${COLORS.primary}10;
        }
        .group:hover .card-icon {
          transform: scale(1.1) rotate(-5deg);
          background: ${COLORS.primary}18;
          box-shadow: 0 8px 30px ${COLORS.primary}20;
        }

        .card-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }
        .group:hover .card-title {
          color: ${COLORS.primary};
        }

        .card-client {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        .card-source {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
        .card-status {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.04em;
        }
        .card-progress-label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .card-progress-value {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .card-time {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .status-badge {
          transition: all 0.3s ease;
          box-shadow: ${statusStyle.glow};
        }
        .status-badge:hover {
          transform: scale(1.05);
        }
        .status-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        .progress-bar {
          background: rgba(238,241,243,0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 9999px;
          height: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.coral});
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
        .group:hover .progress-bar-fill {
          background: linear-gradient(90deg, ${COLORS.coral}, ${COLORS.primary});
        }

        .client-avatar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .group:hover .client-avatar {
          transform: scale(1.15) rotate(-5deg);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .more-btn {
          transition: all 0.3s ease;
          padding: 4px;
          border-radius: 50%;
        }
        .more-btn:hover {
          background: ${COLORS.primary}10;
          transform: rotate(90deg);
          color: ${COLORS.primary};
        }

        .card-sparkle {
          opacity: 0;
          transition: all 0.4s ease;
        }
        .group:hover .card-sparkle {
          opacity: 1;
          transform: translateX(4px);
        }
      `}</style>

      <div className="flex items-center justify-between mb-5">
        <div className="card-icon w-11 h-11 rounded-full flex items-center justify-center">
          <IconFileText />
        </div>
        <span
          className="status-badge inline-flex items-center gap-1.5 text-[12.5px] font-medium rounded-full px-3 py-1"
          style={{ background: statusStyle.bg, color: statusStyle.text }}
        >
          <span className="status-dot w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.dot }} />
          <span className="card-status">{project.status}</span>
        </span>
      </div>

      <h3 className="card-title text-[16px] font-semibold mb-2" style={{ color: "#151f27" }}>
        {project.name}
        <span className="card-sparkle inline-block ml-1" style={{ color: COLORS.coral }}>
          <IconSparkle />
        </span>
      </h3>

      <div className="flex items-center gap-2 mb-5 text-[13.5px]" style={{ color: COLORS.textMuted }}>
        <div
          className="client-avatar w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-semibold"
          style={{ background: project.clientColor }}
        >
          {project.client[0]}
        </div>
        <span className="card-client">{project.client}</span>
        <span>·</span>
        <span className="card-source inline-flex items-center gap-1.5">
          {SOURCE_ICONS[project.source]}
          {project.source}
        </span>
      </div>

      <div className="flex items-center justify-between text-[13px] mb-2" style={{ color: COLORS.textMuted }}>
        <span className="card-progress-label">Progress</span>
        <span className="card-progress-value" style={{ color: COLORS.text }}>
          {project.progress}%
        </span>
      </div>
      <div className="progress-bar mb-5">
        <div
          className="progress-bar-fill"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="card-time inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: COLORS.textMuted }}>
          <IconClock />
          {project.updatedAgo}
        </span>
        <button className="more-btn" style={{ color: COLORS.textMuted }}>
          <IconMore />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
