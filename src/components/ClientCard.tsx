import React from "react";
import { COLORS } from "../layouts/AuthLayout";

export interface ClientCardData {
  name: string;
  initials: string;
  avatarColor: string;
  company: string;
  email: string;
  phone: string;
  projectsCount?: number;
}

const IconBuilding = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="4" y="3" width="10" height="18" rx="1" />
    <path d="M14 8h6v13h-6M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01" strokeLinecap="round" />
  </svg>
);
const IconMailSm = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPhoneSm = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.3 21 3 14.7 3 6a2 2 0 0 1 1-2z" strokeLinejoin="round" />
  </svg>
);
const IconDots = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2">
    <circle cx="12" cy="5" r="1.2" />
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="12" cy="19" r="1.2" />
  </svg>
);

const ClientCard: React.FC<{ client: ClientCardData }> = ({ client }) => {
  return (
    <div
      className="client-card rounded-2xl p-6 relative"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(233,237,240,0.6)",
        boxShadow: "0 8px 40px rgba(79,132,169,0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(79,132,169,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(79,132,169,0.06)";
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-[15px] flex-shrink-0"
          style={{ background: client.avatarColor }}
        >
          {client.initials}
        </div>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
          type="button"
        >
          <IconDots />
        </button>
      </div>

      <h3 className="font-serif text-[16.5px] mb-0.5" style={{ color: "#151f27" }}>
        {client.name}
      </h3>
      <p className="flex items-center gap-1.5 text-[13px] mb-4" style={{ color: COLORS.textMuted }}>
        <IconBuilding /> {client.company}
      </p>

      <div className="space-y-2 pt-4 border-t" style={{ borderColor: "#EEF1F3" }}>
        <p className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.text }}>
          <IconMailSm /> {client.email}
        </p>
        <p className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.text }}>
          <IconPhoneSm /> {client.phone}
        </p>
      </div>

      {typeof client.projectsCount === "number" && (
        <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#EEF1F3" }}>
          <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
            Projects
          </span>
          <span
            className="text-[12px] font-semibold rounded-full px-2.5 py-1"
            style={{ background: `${COLORS.primary}14`, color: COLORS.primary }}
          >
            {client.projectsCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ClientCard;
