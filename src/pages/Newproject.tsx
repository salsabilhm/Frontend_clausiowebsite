import React from "react";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";

/* ---------- Icônes ---------- */
const IconSparkleBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);
const IconSparklesLg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconDollar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <path d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.3-5 3 2.2 2.7 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3" strokeLinecap="round" />
  </svg>
);
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
  </svg>
);
const IconFlag = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <path d="M5 3v18" strokeLinecap="round" />
    <path d="M5 4h11l-2.5 4L16 12H5" strokeLinejoin="round" />
  </svg>
);
const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.coral} strokeWidth="1.8">
    <path d="M12 2s-2 4-2 8c0 3 1 5 2 6s2-3 2-6c0-4-2-8-2-8z" strokeLinejoin="round" />
    <path d="M8 14s-3 1-5 5c2-1 4-2 5-5z" strokeLinejoin="round" />
    <path d="M16 14s3 1 5 5c-2-1-4-2-5-5z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="1.5" />
  </svg>
);

/* ---------- Small field components ---------- */
const FieldLabel: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <label className="flex items-center gap-1.5 text-[13.5px] font-medium mb-2" style={{ color: COLORS.text }}>
    {icon}
    <span className="cursive-label">{children}</span>
  </label>
);

const inputStyle: React.CSSProperties = {
  borderColor: "#E5E9EC",
  background: "#FBFCFD",
  color: COLORS.text,
  transition: "all 0.3s ease",
};

const NewProject: React.FC = () => {
  return (
    <DashboardLayout active="projects">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatRocket {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        .cursive-subtitle {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .cursive-label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.04em;
        }
        .cursive-input {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
        .cursive-input::placeholder {
          font-style: italic;
          opacity: 0.6;
        }

        .form-card {
          animation: fadeInUp 0.6s ease-out;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
        }
        .form-card:hover {
          box-shadow: 0 12px 50px rgba(79,132,169,0.1);
        }

        .ai-sidebar {
          animation: fadeInUp 0.8s ease-out;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
          animation-delay: 0.2s;
        }
        .ai-sidebar:hover {
          box-shadow: 0 12px 50px rgba(79,132,169,0.1);
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(251,252,253,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .input-field:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15, 0 4px 20px ${COLORS.primary}10;
          background: rgba(255,255,255,0.95);
          transform: translateY(-1px);
        }
        .input-field:hover {
          border-color: ${COLORS.primary}30;
        }

        .select-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: rgba(251,252,253,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .select-field:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15;
        }
        .select-field:hover {
          border-color: ${COLORS.primary}30;
        }

        .textarea-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(251,252,253,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .textarea-field:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15;
          background: rgba(255,255,255,0.95);
        }
        .textarea-field:hover {
          border-color: ${COLORS.primary}30;
        }

        .btn-create {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
        }
        .btn-create:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 8px 35px ${COLORS.primary}35;
        }

        .btn-cancel {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .btn-cancel:hover {
          transform: scale(1.04);
          border-color: ${COLORS.textMuted}40;
          background: rgba(255,255,255,0.95);
        }

        .rocket-icon {
          animation: floatRocket 4s ease-in-out infinite;
        }

        .ai-list-item {
          transition: all 0.3s ease;
          padding: 0.25rem 0;
        }
        .ai-list-item:hover {
          transform: translateX(4px);
          color: ${COLORS.primary};
        }
        .ai-list-item:hover .ai-dot {
          transform: scale(1.3);
          background: ${COLORS.coral};
        }

        .ai-dot {
          transition: all 0.3s ease;
        }
      `}</style>

      <PageBanner
        badgeIcon={<IconSparkleBadge />}
        badgeLabel="NEW"
        title="Create a new project"
        subtitle="Set up a project to attach conversations and generate its specification."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form className="lg:col-span-2 rounded-2xl p-7 space-y-6 form-card" style={{ borderColor: "#E9EDF0" }}>
          <div>
            <FieldLabel>Project Name</FieldLabel>
            <input
              type="text"
              placeholder="E-commerce Platform"
              className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <FieldLabel>Client</FieldLabel>
            <div className="relative">
              <select
                className="select-field cursive-input w-full appearance-none rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
                defaultValue="Ahmed Bensaid"
              >
                <option>Ahmed Bensaid</option>
                <option>Sarah Meziane</option>
                <option>Ali Kaddour</option>
                <option>Nora Belkacem</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <IconChevronDown />
              </span>
            </div>
          </div>

          <div>
            <FieldLabel>Category</FieldLabel>
            <div className="relative">
              <select
                className="select-field cursive-input w-full appearance-none rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
                defaultValue="Web Application"
              >
                <option>Web Application</option>
                <option>Mobile App</option>
                <option>E-commerce</option>
                <option>Fintech</option>
                <option>Other</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <IconChevronDown />
              </span>
            </div>
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              placeholder="Briefly describe the project scope and goals..."
              rows={4}
              className="textarea-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <FieldLabel icon={<IconDollar />}>Budget</FieldLabel>
              <input
                type="text"
                placeholder="$ 15,000"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <FieldLabel icon={<IconCalendar />}>Deadline</FieldLabel>
              <input
                type="date"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <FieldLabel icon={<IconFlag />}>Priority</FieldLabel>
              <div className="relative">
                <select
                  className="select-field cursive-input w-full appearance-none rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                  defaultValue="High"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <IconChevronDown />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-create rounded-xl px-6 py-3 text-white text-sm font-semibold">
              ✦ Create Project
            </button>
            <a
              href="/projects"
              className="btn-cancel rounded-xl px-6 py-3 text-sm font-semibold border no-underline"
              style={{ borderColor: "#E5E9EC", color: COLORS.text }}
            >
              Cancel
            </a>
          </div>
        </form>

        {/* Powered by AI sidebar */}
        <div className="space-y-6">
          <div
            className="ai-sidebar rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(233,237,240,0.6)",
              boxShadow: "0 8px 40px rgba(79,132,169,0.06)",
            }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl" style={{ background: COLORS.coral, opacity: 0.1 }} />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-3xl" style={{ background: COLORS.primary, opacity: 0.08 }} />

            <div
              className="rocket-icon w-12 h-12 rounded-full flex items-center justify-center mb-4 relative"
              style={{
                background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
                boxShadow: `0 4px 20px ${COLORS.primary}30`,
              }}
            >
              <IconSparklesLg />
            </div>
            <h3 className="cursive-title text-[17px] font-semibold mb-2" style={{ color: "#151f27" }}>
              Powered by AI ✦
            </h3>
            <p className="cursive-subtitle text-[14px] leading-relaxed mb-5" style={{ color: COLORS.textMuted }}>
              After creating, upload a conversation and Clausio will draft the full
              specification for you.
            </p>

            <ul className="space-y-3 text-[14px]" style={{ color: COLORS.text }}>
              {["Meeting transcripts", "WhatsApp exports", "Voice recordings", "Video meetings"].map((item) => (
                <li key={item} className="ai-list-item flex items-center gap-2.5">
                  <span className="ai-dot w-1.5 h-1.5 rounded-full transition-all" style={{ background: COLORS.primary }} />
                  <span className="cursive-label">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t" style={{ borderColor: "#E9EDF0" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${COLORS.primary}12` }}>
                  <IconRocket />
                </div>
                <div>
                  <div className="cursive-label text-[12px] font-medium" style={{ color: COLORS.text }}>
                    AI Assistant ready
                  </div>
                  <div className="cursive-subtitle text-[11px]" style={{ color: COLORS.textMuted }}>
                    Upload any conversation to start
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick tips */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(233,237,240,0.4)",
            }}
          >
            <h4 className="cursive-label text-[12px] uppercase tracking-wider mb-3" style={{ color: COLORS.textMuted }}>
              ✦ Quick Tips
            </h4>
            <ul className="space-y-2 text-[13px] cursive-subtitle" style={{ color: COLORS.textMuted }}>
              <li className="flex items-start gap-2">
                <span style={{ color: COLORS.coral }}>✦</span>
                Use a clear project name for better organization
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: COLORS.coral }}>✦</span>
                Add client details to personalize the specification
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: COLORS.coral }}>✦</span>
                Set a deadline to track progress effectively
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewProject;
