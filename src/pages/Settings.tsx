// src/pages/Settings.tsx
import React from "react";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { useSettings } from "../context/SettingsContext";

/* ---------- Icons ---------- */
const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3.2" />
    <path
      d="M19.4 13.5a1.9 1.9 0 0 0 .4 2.1l.1.1a2.3 2.3 0 1 1-3.2 3.2v-.1a1.9 1.9 0 0 0-2.1-.4 1.9 1.9 0 0 0-1.2 1.7V21a2.3 2.3 0 0 1-4.6 0v-.2a1.9 1.9 0 0 0-1.2-1.7 1.9 1.9 0 0 0-2.1.4l-.1.1a2.3 2.3 0 1 1-3.2-3.2l.1-.1a1.9 1.9 0 0 0 .4-2.1 1.9 1.9 0 0 0-1.7-1.2H2a2.3 2.3 0 0 1 0-4.6h.2a1.9 1.9 0 0 0 1.7-1.2 1.9 1.9 0 0 0-.4-2.1l-.1-.1A2.3 2.3 0 1 1 6.6 3.4l.1.1a1.9 1.9 0 0 0 2.1.4H9a1.9 1.9 0 0 0 1.2-1.7V2a2.3 2.3 0 0 1 4.6 0v.2a1.9 1.9 0 0 0 1.2 1.7 1.9 1.9 0 0 0 2.1-.4l.1-.1a2.3 2.3 0 1 1 3.2 3.2l-.1.1a1.9 1.9 0 0 0-.4 2.1V9a1.9 1.9 0 0 0 1.7 1.2h.2a2.3 2.3 0 0 1 0 4.6h-.2a1.9 1.9 0 0 0-1.7 1.2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconAutoGenerate = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1.8">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAutoSave = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1.8">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 21v-8H7v8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3v5h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconExport = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1.8">
    <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLanguage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" strokeLinecap="round" />
    <path d="M12 3a14.5 14.5 0 0 0 0 18 14.5 14.5 0 0 0 0-18z" strokeLinecap="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Types ---------- */
type ExportFormat = "PDF" | "DOCX" | "Markdown";
type AILanguage = "English" | "Français" | "Arabic";

/* ---------- Page Settings ---------- */
const Settings: React.FC = () => {
  // ✅ استخدام SettingsContext
  const { preferences, updatePreferences } = useSettings();

  // ✅ استخراج القيم من preferences
  const { autoGenerateSpec, autoSave, defaultExportFormat, aiOutputLanguage } = preferences;

  const [isDropdownOpen, setIsDropdownOpen] = React.useState<{
    exportFormat: boolean;
    aiLanguage: boolean;
  }>({
    exportFormat: false,
    aiLanguage: false,
  });

  // ✅ تحديث الإعدادات عبر Context
  const toggleSwitch = (key: keyof Pick<typeof preferences, "autoGenerateSpec" | "autoSave">) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  const handleExportFormatChange = (format: ExportFormat) => {
    updatePreferences({ defaultExportFormat: format });
    setIsDropdownOpen({ ...isDropdownOpen, exportFormat: false });
  };

  const handleAILanguageChange = (language: AILanguage) => {
    updatePreferences({ aiOutputLanguage: language });
    setIsDropdownOpen({ ...isDropdownOpen, aiLanguage: false });
  };

  const toggleDropdown = (key: "exportFormat" | "aiLanguage") => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      [key]: !isDropdownOpen[key],
    });
  };

  const inputStyle = {
    borderColor: "#E5E9EC",
    background: "#FBFCFD",
    color: COLORS.text,
    transition: "all 0.3s ease",
  };

  return (
    <DashboardLayout active="settings">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,132,169,0.2); }
          50% { box-shadow: 0 0 20px 4px rgba(79,132,169,0.08); }
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
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
        .cursive-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .settings-card {
          animation: fadeInUp 0.6s ease-out;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .settings-card:hover {
          box-shadow: 0 12px 50px rgba(79,132,169,0.1);
          transform: translateY(-2px);
          border-color: ${COLORS.primary}20;
        }

        .settings-card-delay-1 {
          animation-delay: 0.1s;
        }
        .settings-card-delay-2 {
          animation-delay: 0.2s;
        }
        .settings-card-delay-3 {
          animation-delay: 0.3s;
        }
        .settings-card-delay-4 {
          animation-delay: 0.4s;
        }

        .icon-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${COLORS.primary}10;
        }
        .settings-card:hover .icon-wrapper {
          transform: scale(1.05) rotate(-3deg);
          background: ${COLORS.primary}20;
        }

        .toggle {
          position: relative;
          width: 48px;
          height: 28px;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .toggle-track {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #E5E9EC;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .toggle.active .toggle-track {
          background: ${COLORS.primary};
          box-shadow: 0 0 20px ${COLORS.primary}30;
        }
        .toggle.active .toggle-thumb {
          transform: translateX(20px);
          box-shadow: 0 2px 12px ${COLORS.primary}40;
        }
        .toggle:hover .toggle-track {
          box-shadow: 0 0 0 4px ${COLORS.primary}15;
        }
        .toggle.active:hover .toggle-track {
          box-shadow: 0 0 0 4px ${COLORS.primary}25;
        }

        .select-wrapper {
          position: relative;
          cursor: pointer;
          min-width: 140px;
        }
        .select-trigger {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(251,252,253,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          cursor: pointer;
          padding-right: 2.5rem;
        }
        .select-trigger:hover {
          border-color: ${COLORS.primary}30;
          background: rgba(255,255,255,0.95);
        }
        .select-trigger:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15;
          background: rgba(255,255,255,0.95);
          transform: translateY(-1px);
        }
        .select-dropdown {
          animation: slideDown 0.2s ease-out;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(233,237,240,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .select-option {
          transition: all 0.2s ease;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
          cursor: pointer;
        }
        .select-option:hover {
          background: ${COLORS.primary}10;
          color: ${COLORS.primary};
          transform: translateX(4px);
        }
        .select-option-active {
          background: ${COLORS.primary}10;
          color: ${COLORS.primary};
          font-weight: 500;
        }
        .select-chevron {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .select-chevron.open {
          transform: rotate(180deg);
          color: ${COLORS.primary};
        }
      `}</style>

      <PageBanner
        badgeIcon={<IconSettings />}
        badgeLabel="SETTINGS"
        title="Workspace Settings"
        subtitle="Configure your AI workspace preferences and default behaviors."
      />

      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1 - Auto Generate Specification */}
        <div className="settings-card settings-card-delay-1 rounded-2xl p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="icon-wrapper w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconAutoGenerate />
              </div>
              <div>
                <h3 className="cursive-title text-[15px] font-semibold" style={{ color: "#151f27" }}>
                  Auto Generate Specification
                </h3>
                <p className="cursive-text text-[13px] mt-1 leading-relaxed" style={{ color: COLORS.textMuted }}>
                  Automatically generate a structured project specification immediately after a conversation, meeting, audio recording, video, or WhatsApp export is processed by the AI. When disabled, the user must manually click the Generate button.
                </p>
              </div>
            </div>
            <div
              className={`toggle ${autoGenerateSpec ? "active" : ""}`}
              onClick={() => toggleSwitch("autoGenerateSpec")}
              role="button"
              aria-label="Toggle auto generate"
            >
              <div className="toggle-track" />
              <div className="toggle-thumb" />
            </div>
          </div>
        </div>

        {/* Card 2 - Auto Save */}
        <div className="settings-card settings-card-delay-2 rounded-2xl p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="icon-wrapper w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconAutoSave />
              </div>
              <div>
                <h3 className="cursive-title text-[15px] font-semibold" style={{ color: "#151f27" }}>
                  Auto Save
                </h3>
                <p className="cursive-text text-[13px] mt-1 leading-relaxed" style={{ color: COLORS.textMuted }}>
                  Automatically save all document edits while working inside the AI editor. Changes are stored in real time without requiring manual saving.
                </p>
              </div>
            </div>
            <div
              className={`toggle ${autoSave ? "active" : ""}`}
              onClick={() => toggleSwitch("autoSave")}
              role="button"
              aria-label="Toggle auto save"
            >
              <div className="toggle-track" />
              <div className="toggle-thumb" />
            </div>
          </div>
        </div>

        {/* Card 3 - Default Export Format */}
        <div className="settings-card settings-card-delay-3 rounded-2xl p-6 flex flex-col">
          <div className="flex items-start gap-4">
            <div className="icon-wrapper w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconExport />
            </div>
            <div className="flex-1">
              <h3 className="cursive-title text-[15px] font-semibold" style={{ color: "#151f27" }}>
                Default Export Format
              </h3>
              <p className="cursive-text text-[13px] mt-1 leading-relaxed" style={{ color: COLORS.textMuted }}>
                Choose the default file format used when exporting generated specifications.
              </p>
              <div className="mt-4 select-wrapper">
                <button
                  className="select-trigger w-full rounded-xl border px-4 py-2.5 text-[14px] outline-none flex items-center justify-between"
                  style={inputStyle}
                  onClick={() => toggleDropdown("exportFormat")}
                >
                  <span className="cursive-text">{defaultExportFormat}</span>
                  <span className={`select-chevron ${isDropdownOpen.exportFormat ? "open" : ""}`}>
                    <IconChevronDown />
                  </span>
                </button>
                {isDropdownOpen.exportFormat && (
                  <div className="select-dropdown absolute top-full left-0 right-0 mt-1.5 rounded-xl py-1.5 overflow-hidden z-10">
                    {(["PDF", "DOCX", "Markdown"] as ExportFormat[]).map((format) => (
                      <div
                        key={format}
                        className={`select-option px-4 py-2.5 text-[14px] ${
                          defaultExportFormat === format ? "select-option-active" : ""
                        }`}
                        onClick={() => handleExportFormatChange(format)}
                      >
                        {format}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 - AI Output Language */}
        <div className="settings-card settings-card-delay-4 rounded-2xl p-6 flex flex-col">
          <div className="flex items-start gap-4">
            <div className="icon-wrapper w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconLanguage />
            </div>
            <div className="flex-1">
              <h3 className="cursive-title text-[15px] font-semibold" style={{ color: "#151f27" }}>
                AI Output Language
              </h3>
              <p className="cursive-text text-[13px] mt-1 leading-relaxed" style={{ color: COLORS.textMuted }}>
                Select the language used by the AI when generating project specifications and documentation.
              </p>
              <div className="mt-4 select-wrapper">
                <button
                  className="select-trigger w-full rounded-xl border px-4 py-2.5 text-[14px] outline-none flex items-center justify-between"
                  style={inputStyle}
                  onClick={() => toggleDropdown("aiLanguage")}
                >
                  <span className="cursive-text">{aiOutputLanguage}</span>
                  <span className={`select-chevron ${isDropdownOpen.aiLanguage ? "open" : ""}`}>
                    <IconChevronDown />
                  </span>
                </button>
                {isDropdownOpen.aiLanguage && (
                  <div className="select-dropdown absolute top-full left-0 right-0 mt-1.5 rounded-xl py-1.5 overflow-hidden z-10">
                    {(["English", "Français", "Arabic"] as AILanguage[]).map((language) => (
                      <div
                        key={language}
                        className={`select-option px-4 py-2.5 text-[14px] ${
                          aiOutputLanguage === language ? "select-option-active" : ""
                        }`}
                        onClick={() => handleAILanguageChange(language)}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
