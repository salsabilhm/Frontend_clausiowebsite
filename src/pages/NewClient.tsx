import React from "react";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";

/* ---------- Icônes ---------- */
const IconUserPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" strokeLinecap="round" />
    <path d="M18 8v6M15 11h6" strokeLinecap="round" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSparklesLg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);
const IconHandshake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.coral} strokeWidth="1.8">
    <path d="M2 12l5-4 4 3 3-3 8 5-3 3-3-2-4 4-4-3-3 3-3-3z" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

/* ---------- Field helpers ---------- */
const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="flex items-center gap-1.5 text-[13.5px] font-medium mb-2" style={{ color: COLORS.text }}>
    <span className="cursive-label">{children}</span>
  </label>
);

const inputStyle: React.CSSProperties = {
  borderColor: "#E5E9EC",
  background: "#FBFCFD",
  color: COLORS.text,
  transition: "all 0.3s ease",
};

const NewClient: React.FC = () => {
  return (
    <DashboardLayout active="clients">
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-6px) rotate(4deg); }
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

        .side-card {
          animation: fadeInUp 0.8s ease-out;
          animation-delay: 0.2s;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
        }
        .side-card:hover {
          box-shadow: 0 12px 50px rgba(79,132,169,0.1);
        }

        .input-field, .select-field, .textarea-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(251,252,253,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .input-field:focus, .select-field:focus, .textarea-field:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15, 0 4px 20px ${COLORS.primary}10;
          background: rgba(255,255,255,0.95);
          transform: translateY(-1px);
        }
        .input-field:hover, .select-field:hover, .textarea-field:hover {
          border-color: ${COLORS.primary}30;
        }
        .select-field { cursor: pointer; }

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

        .float-icon {
          animation: floatIcon 4s ease-in-out infinite;
        }
      `}</style>

      <PageBanner
        badgeIcon={<IconUserPlus />}
        badgeLabel="NEW CLIENT"
        title="Add a new client"
        subtitle="Store your client info to link projects and specifications."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form className="lg:col-span-2 rounded-2xl p-7 space-y-6 form-card" style={{ borderColor: "#E9EDF0" }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <input
                type="text"
                placeholder="Ahmed Bensaid"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <FieldLabel>Company</FieldLabel>
              <input
                type="text"
                placeholder="Bensaid Retail"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                placeholder="ahmed@company.com"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <input
                type="tel"
                placeholder="+213 555 000 000"
                className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Country</FieldLabel>
              <div className="relative">
                <select
                  className="select-field cursive-input w-full appearance-none rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                  defaultValue="Algeria"
                >
                  <option>Algeria</option>
                  <option>France</option>
                  <option>Morocco</option>
                  <option>Tunisia</option>
                  <option>Other</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <IconChevronDown />
                </span>
              </div>
            </div>
            <div>
              <FieldLabel>Project Type</FieldLabel>
              <div className="relative">
                <select
                  className="select-field cursive-input w-full appearance-none rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                  defaultValue="Web App"
                >
                  <option>Web App</option>
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
          </div>

          <div>
            <FieldLabel>Notes</FieldLabel>
            <textarea
              placeholder="Any relevant context about this client..."
              rows={4}
              className="textarea-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-create rounded-xl px-6 py-3 text-white text-sm font-semibold">
              ✦ Add Client
            </button>
            <a
              href="/clients"
              className="btn-cancel rounded-xl px-6 py-3 text-sm font-semibold border no-underline"
              style={{ borderColor: "#E5E9EC", color: COLORS.text }}
            >
              Cancel
            </a>
          </div>
        </form>

        {/* Sidebar */}
        <div className="space-y-6">
          <div
            className="side-card rounded-2xl p-6 relative overflow-hidden"
            style={{ borderColor: "rgba(233,237,240,0.6)" }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl" style={{ background: COLORS.coral, opacity: 0.1 }} />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-3xl" style={{ background: COLORS.primary, opacity: 0.08 }} />

            <div
              className="float-icon w-12 h-12 rounded-full flex items-center justify-center mb-4 relative"
              style={{
                background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
                boxShadow: `0 4px 20px ${COLORS.primary}30`,
              }}
            >
              <IconSparklesLg />
            </div>
            <h3 className="cursive-title text-[17px] font-semibold mb-2" style={{ color: "#151f27" }}>
              Why add a client?
            </h3>
            <p className="cursive-subtitle text-[14px] leading-relaxed mb-5" style={{ color: COLORS.textMuted }}>
              Linking a client lets Clausio auto-fill their details on every new
              project and specification you create.
            </p>

            <ul className="space-y-3 text-[14px]" style={{ color: COLORS.text }}>
              {["Faster project setup", "Consistent client details", "Full project history per client", "One-click specification export"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.primary }} />
                    <span className="cursive-label">{item}</span>
                  </li>
                )
              )}
            </ul>

            <div className="mt-5 pt-5 border-t" style={{ borderColor: "#E9EDF0" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${COLORS.primary}12` }}>
                  <IconHandshake />
                </div>
                <div>
                  <div className="cursive-label text-[12px] font-medium" style={{ color: COLORS.text }}>
                    Built for agencies
                  </div>
                  <div className="cursive-subtitle text-[11px]" style={{ color: COLORS.textMuted }}>
                    Manage every client relationship in one place
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewClient;
