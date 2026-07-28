
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../layouts/AuthLayout";


const logoImg = "/logo.jpg";

/* ---------- Icons ---------- */
const IconGrid = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

const IconFolder = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeLinejoin="round" />
  </svg>
);

const IconUsers = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.4 2.9-5.8 6.5-5.8s6.5 2.4 6.5 5.8" strokeLinecap="round" />
    <path d="M16.5 8.2a3 3 0 1 1 0 5.8" strokeLinecap="round" />
    <path d="M20 20c0-2.8-1.8-4.9-4.3-5.6" strokeLinecap="round" />
  </svg>
);

const IconSparkles = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

const IconFileText = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h8M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHistory = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
    <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Types ---------- */
export type SidebarPage =
  | "dashboard"
  | "projects"
  | "clients"
  | "ai-contract-generator"
  | "documents"
  | "profile"
  | "settings"
  | "upgrade"
  | "DocumentEditor"
  | "history";

export type AllPages = SidebarPage | "profile" | "upgrade";

const NAV_ITEMS: { key: SidebarPage; label: string; icon: React.ReactNode; href: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: <IconGrid />, href: "/dashboard" },
  { key: "projects", label: "Projects", icon: <IconFolder />, href: "/projects" },
  { key: "clients", label: "Clients", icon: <IconUsers />, href: "/clients" },
  { key: "ai-contract-generator", label: "AI Contract Generator", icon: <IconSparkles />, href: "/ai-contract-generator" },
  { key: "DocumentEditor", label: "Document Editor", icon: <IconFileText />, href: "/document-editor" },
  { key: "history", label: "History", icon: <IconHistory />, href: "/history" },
];

interface SidebarProps {
  active?: SidebarPage | "profile" | "upgrade";
}

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const navigate = useNavigate();

  const isActive = (key: SidebarPage): boolean => {
    return active !== undefined && active !== "profile" && active !== "upgrade" && active === key;
  };

  const handleUpgradeClick = () => {
    navigate("/upgrade");
  };

  const handleNavClick = (href: string) => {
    navigate(href);
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className="hidden lg:flex flex-col justify-between w-64 shrink-0 h-screen sticky top-0 border-r"
        style={{
          borderColor: "rgba(233,237,240,0.4)",
          background: `
            radial-gradient(80% 60% at 0% 20%, ${COLORS.primary}08 0%, rgba(255,255,255,0) 60%),
            radial-gradient(70% 50% at 100% 80%, ${COLORS.coral}06 0%, rgba(255,255,255,0) 50%),
            #FBFCFD
          `,
          backdropFilter: "blur(20px)",
        }}
      >
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulseDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
          }
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .cursive-sidebar-logo {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-style: italic;
            letter-spacing: 0.03em;
          }
          .cursive-sidebar-label {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-style: italic;
            letter-spacing: 0.02em;
            font-weight: 500;
          }
          .cursive-sidebar-sub {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-style: italic;
            font-weight: 300;
            letter-spacing: 0.04em;
          }

          .nav-item {
            transition: all 0.25s ease;
            position: relative;
          }
          .nav-item:hover {
            background: rgba(79,132,169,0.08);
            transform: translateX(4px);
          }
          .nav-item-active {
            background: rgba(79,132,169,0.12);
            box-shadow: inset 0 0 20px rgba(79,132,169,0.05);
          }
          .nav-item-active:hover {
            background: rgba(79,132,169,0.16);
          }
          .nav-icon {
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .nav-item:hover .nav-icon {
            transform: scale(1.1);
          }
          .nav-item-active .nav-icon {
            transform: scale(1.05);
          }

          .pro-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: linear-gradient(140deg, ${COLORS.dark} 0%, ${COLORS.primary} 100%);
            cursor: pointer;
          }
          .pro-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px -8px rgba(79,132,169,0.4);
          }
          .pro-btn {
            transition: all 0.25s ease;
            cursor: pointer;
          }
          .pro-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 20px rgba(255,255,255,0.2);
          }

          .logo-dot {
            animation: pulseDot 2s ease-in-out infinite;
          }
          .logo-img {
            transition: transform 0.5s ease;
          }
          .logo-img:hover {
            transform: rotate(-5deg) scale(1.05);
          }

          /* Mobile bottom navigation */
          .mobile-nav {
            animation: slideUp 0.3s ease-out;
          }
          .mobile-nav-item {
            transition: all 0.2s ease;
            border-radius: 12px;
            padding: 8px 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            font-size: 10px;
            color: ${COLORS.textMuted};
            text-decoration: none;
          }
          .mobile-nav-item:hover {
            background: rgba(79,132,169,0.08);
          }
          .mobile-nav-item.active {
            color: ${COLORS.primary};
            background: rgba(79,132,169,0.12);
          }
          .mobile-nav-item .nav-label {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-style: italic;
            font-size: 9px;
            letter-spacing: 0.02em;
          }
        `}</style>

        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 h-20 border-b" style={{ borderColor: "rgba(233,237,240,0.4)" }}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md logo-img" style={{ background: COLORS.dark }}>
              <img src={logoImg} alt="Clausio" className="w-full h-full object-cover" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full logo-dot" style={{ background: COLORS.coral, boxShadow: `0 0 12px ${COLORS.coral}60` }} />
            </div>
            <div className="leading-tight">
              <div className="cursive-sidebar-logo text-xl" style={{ color: "#151f27" }}>
                Clausio
              </div>
              <div className="cursive-sidebar-sub text-[11px]" style={{ color: COLORS.textMuted }}>
                ✦ AI Documentation
              </div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="px-3 py-5 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActiveItem = isActive(item.key);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[14.5px] font-medium transition-all ${
                    isActiveItem ? "nav-item-active" : ""
                  }`}
                  style={{
                    color: isActiveItem ? COLORS.dark : COLORS.textMuted,
                  }}
                >
                  {isActiveItem && (
                    <span
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${COLORS.coral}, ${COLORS.primary})`,
                        boxShadow: `0 0 20px ${COLORS.coral}40`,
                      }}
                    />
                  )}
                  <span
                    className={`nav-icon ${isActiveItem ? "nav-item-active" : ""}`}
                    style={{
                      color: isActiveItem ? COLORS.primary : COLORS.textMuted,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="cursive-sidebar-label">{item.label}</span>
                  {isActiveItem && (
                    <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${COLORS.coral}15`, color: COLORS.coral }}>
                      ✦
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Pro Plan Card Desktop */}
        <div className="p-4 hidden lg:block">
          <div
            className="pro-card rounded-2xl p-5 text-white relative overflow-hidden"
            style={{ background: `linear-gradient(140deg, ${COLORS.dark} 0%, ${COLORS.primary} 100%)` }}
            onClick={handleUpgradeClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleUpgradeClick();
              }
            }}
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl" style={{ background: COLORS.coral, opacity: 0.2 }} />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-2xl" style={{ background: COLORS.beige, opacity: 0.15 }} />

            <span className="inline-block text-[10px] font-semibold tracking-wider bg-white/15 rounded-full px-3 py-1 mb-3 backdrop-blur-sm">
              ✦ PRO PLAN
            </span>
            <p className="cursive-sidebar-label text-[15px] font-semibold mb-1.5">Unlock unlimited AI specs</p>
            <p className="cursive-sidebar-sub text-[13px] text-white/80 leading-relaxed mb-4">
              Upgrade for advanced insights and higher limits.
            </p>
            <button
              className="pro-btn w-full bg-white/95 backdrop-blur-sm rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={{ color: COLORS.dark }}
              onClick={(e) => {
                e.stopPropagation();
                handleUpgradeClick();
              }}
            >
              ✦ Upgrade now
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - 3 columns (visible sur mobile uniquement) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t mobile-nav" style={{ borderColor: "rgba(233,237,240,0.4)" }}>
        {/* Ligne 1: 3 premiers items */}
        <div className="grid grid-cols-3 gap-1 px-2 py-2 max-w-md mx-auto">
          {NAV_ITEMS.slice(0, 3).map((item) => {
            const isActiveItem = isActive(item.key);
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`mobile-nav-item ${isActiveItem ? "active" : ""}`}
              >
                <span style={{ color: isActiveItem ? COLORS.primary : COLORS.textMuted }}>
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </div>
        {/* Ligne 2: 3 derniers items */}
        <div className="grid grid-cols-3 gap-1 px-2 pb-2 max-w-md mx-auto">
          {NAV_ITEMS.slice(3, 6).map((item) => {
            const isActiveItem = isActive(item.key);
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`mobile-nav-item ${isActiveItem ? "active" : ""}`}
              >
                <span style={{ color: isActiveItem ? COLORS.primary : COLORS.textMuted }}>
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </div>
        {/* Pro Plan button on mobile */}
        <div className="px-2 pb-3 max-w-md mx-auto">
          <button
            onClick={handleUpgradeClick}
            className="w-full py-2 rounded-xl text-white text-xs font-semibold transition-all"
            style={{
              background: `linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary})`,
              boxShadow: `0 4px 16px ${COLORS.primary}25`,
            }}
          >
            ✦ Upgrade to Pro
          </button>
        </div>
      </div>
    </>
  );
};

export { IconChevronDown };
export default Sidebar;
