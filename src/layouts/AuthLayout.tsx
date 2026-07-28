// layouts/AuthLayout.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";


const logoImg = "/logo.jpg";

export const COLORS = {
  bg: "#F8FAFC",
  primary: "#4F84A9",
  secondary: "#9FB0BC",
  coral: "#F98782",
  sand: "#E2B291",
  beige: "#E7CFA2",
  text: "#1F2937",
  textMuted: "#6B7280",
  dark: "#2c4a5e",
};

/* ---------- Icônes ---------- */
export const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
  </svg>
);

export const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" />
  </svg>
);

export const IconEye: React.FC<{ open: boolean }> = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="1.8">
    {open ? (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ) : (
      <path
        d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M6.7 6.6C4.5 8 3 12 3 12s3.5 6 10 6c1.8 0 3.3-.4 4.6-1.1M17.4 17.4C19.4 15.9 21 12 21 12s-1-2-2.7-3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 6.5 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 6.5 29 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z" />
    <path fill="#4CAF50" d="M24 43.5c5 0 9.4-1.9 12.8-5l-5.9-5c-1.9 1.3-4.3 2-6.9 2-5.3 0-9.6-3.6-11.2-8.4l-6.5 5C9.6 39 16.2 43.5 24 43.5z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l5.9 5C40.9 35.4 43.5 30.2 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
  </svg>
);

export const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12 24 5.4 18.6 0 12 0z" />
  </svg>
);

/* ---------- Icônes pour le panneau gauche ---------- */
const IconChatSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.5 2 2 6 2 11c0 2.4 1 4.6 2.7 6.2L4 22l4.8-1.5c1 .3 2.1.5 3.2.5 5.5 0 10-4 10-9s-4.5-10-10-10z" />
  </svg>
);

const IconDocSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
  </svg>
);

const IconSparklesSm = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F98782" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

/* ---------- Inputs / Boutons réutilisables ---------- */

export const AuthInput: React.FC<{
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  toggle?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}> = ({ icon, placeholder, type = "text", toggle, value, onChange, name }) => (
  <div
    className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors focus-within:border-primary"
    style={{ borderColor: "#E5E9EC", background: "#FBFCFD" }}
  >
    {icon}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent outline-none text-[15px]"
      style={{ color: COLORS.text }}
    />
    {toggle}
  </div>
);

export const AuthPrimaryButton: React.FC<{
  label: string;
  gradient: [string, string];
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}> = ({ label, gradient, type = "button", disabled, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className="w-full py-3.5 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
    style={{
      background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
      boxShadow: "0 10px 24px -8px rgba(0,0,0,0.25)",
    }}
  >
    {label} <span>→</span>
  </button>
);

export const AuthSocialButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  dark?: boolean;
}> = ({ label, icon, dark }) => (
  <button
    className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 border transition-transform hover:scale-[1.01] active:scale-[0.99]"
    style={{
      background: dark ? COLORS.dark : "white",
      color: dark ? "white" : COLORS.text,
      borderColor: dark ? COLORS.dark : "#E5E9EC",
    }}
  >
    {icon} {label}
  </button>
);

/* ---------- Panneau Gauche (Illustration) ---------- */
const AuthVisualPanel: React.FC = () => {
  return (
    <div
      className="relative hidden lg:flex flex-col justify-between h-full overflow-hidden rounded-3xl p-10"
      style={{
        background:
          "linear-gradient(160deg, #FCEEEA 0%, #FBF6F1 45%, #F5F8FA 100%)",
      }}
    >
      <style>{`
        @keyframes floatCard {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-12px) rotate(0.6deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(249,135,130,0.3), 0 0 40px rgba(249,135,130,0.1); }
          50% { text-shadow: 0 0 30px rgba(249,135,130,0.5), 0 0 60px rgba(249,135,130,0.2); }
        }

        .auth-float-1 { animation: floatCard 6s ease-in-out infinite; }
        .auth-float-2 { animation: floatCard 7s ease-in-out infinite; animation-delay: .6s; }
        .auth-float-3 { animation: floatCard 5.5s ease-in-out infinite; animation-delay: 1.2s; }
        .auth-dot { animation: floatDot 4s ease-in-out infinite; }

        .cursive-auth-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        .cursive-auth-accent {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.03em;
          background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.coral}, ${COLORS.primary});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 4s linear infinite;
        }
        .cursive-auth-sub {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Particules décoratives */}
      {[
        { top: "6%", left: "58%", size: 6, color: COLORS.coral, delay: "0s" },
        { top: "14%", left: "10%", size: 5, color: COLORS.sand, delay: ".4s" },
        { top: "32%", left: "88%", size: 6, color: COLORS.secondary, delay: ".8s" },
        { top: "50%", left: "4%", size: 5, color: COLORS.beige, delay: "1.2s" },
        { top: "70%", left: "82%", size: 4, color: COLORS.coral, delay: "1.6s" },
        { top: "86%", left: "20%", size: 5, color: COLORS.primary, delay: "2s" },
        { top: "44%", left: "46%", size: 4, color: COLORS.sand, delay: "2.4s" },
      ].map((d, i) => (
        <span
          key={i}
          className="auth-dot absolute rounded-full pointer-events-none"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Mockups flottants */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm h-64">
          <div
            className="auth-float-3 absolute top-2 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" }}
          >
            <IconSparklesSm />
          </div>

          <div
            className="auth-float-1 absolute top-6 left-0 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl w-56"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: COLORS.dark }}
            >
              <IconChatSm />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2 rounded-full" style={{ background: "#E4E8EB", width: "80%" }} />
              <div className="h-2 rounded-full" style={{ background: "#E4E8EB", width: "55%" }} />
            </div>
          </div>

          <div
            className="auth-float-2 absolute top-24 left-10 rounded-2xl px-5 py-4 shadow-xl w-60"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: COLORS.primary }}
              >
                <IconDocSm />
              </div>
              <div className="h-2 rounded-full flex-1" style={{ background: "#E4E8EB" }} />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 rounded-full" style={{ background: "#E4E8EB", width: "100%" }} />
              <div className="h-2 rounded-full" style={{ background: "#E4E8EB", width: "90%" }} />
              <div className="h-2 rounded-full" style={{ background: COLORS.coral, opacity: 0.6, width: "60%" }} />
            </div>
          </div>

          <div
            className="auth-float-2 absolute bottom-0 right-2 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl w-52"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
          >
            <div className="h-2 rounded-full flex-1" style={{ background: COLORS.coral, opacity: 0.5 }} />
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: COLORS.coral }}
            >
              <IconDocSm />
            </div>
          </div>
        </div>
      </div>

      {/* Texte bas */}
      <div className="relative z-10 max-w-sm">
        <h2 className="cursive-auth-title text-3xl leading-tight" style={{ color: "#151f27" }}>
          From{" "}
          <span className="cursive-auth-accent">conversations</span>{" "}
          to complete specifications.
        </h2>
        <p className="cursive-auth-sub mt-3 text-[15px] leading-relaxed" style={{ color: COLORS.textMuted }}>
          Clausio structures meetings, voice notes, and chats into elegant
          Cahier des Charges — automatically.
        </p>
      </div>
    </div>
  );
};

/* ---------- Wrapper de page avec Navbar et 2 colonnes ---------- */
export const AuthShellWithNavbar: React.FC<{
  active: "signin" | "signup";
  onToggle?: (mode: "signin" | "signup") => void;
  children: React.ReactNode;
  logoSrc?: string;
  title?: string;
  subtitle?: string;
}> = ({ active, onToggle, children, logoSrc, title, subtitle }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const defaultTitle = active === "signin" ? "Welcome Back 🎉" : "Create your Account ✨";
  const defaultSubtitle =
    active === "signin"
      ? "Sign in to continue managing your AI-generated project specifications."
      : "Start transforming client conversations into professional project specifications.";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/${href}`);
    }
  };

  const navLinks = [
    { label: "Features", href: "#features", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#features") },
    { label: "How it Works", href: "#how-it-works", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#how-it-works") },
    { label: "Pricing", href: "#pricing", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#pricing") },
    { label: "Contact", href: "#contact-footer", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#contact-footer") },
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: COLORS.bg,
        backgroundImage: `radial-gradient(55% 45% at 12% 8%, ${COLORS.primary}26 0%, rgba(255,255,255,0) 60%), radial-gradient(50% 40% at 90% 15%, ${COLORS.coral}26 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 50% at 100% 60%, ${COLORS.sand}26 0%, rgba(255,255,255,0) 55%), radial-gradient(50% 45% at 0% 90%, ${COLORS.secondary}26 0%, rgba(255,255,255,0) 60%)`,
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar
        logo={logoSrc || logoImg}
        navLinks={navLinks}
        showAuthButtons={false}
        transparent={true}
      />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 lg:p-6">
        <div className="w-full max-w-6xl h-[640px] grid lg:grid-cols-2 gap-6">
          <AuthVisualPanel />

          <div
            className="flex items-center justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-6">
                <div
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border"
                  style={{ borderColor: "#E5E9EC" }}
                >
                  <button
                    onClick={() => onToggle?.("signin")}
                    className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: active === "signin" ? COLORS.coral : "transparent",
                      color: active === "signin" ? "white" : COLORS.textMuted,
                      boxShadow: active === "signin" ? "0 4px 12px -4px rgba(249,135,130,0.4)" : "none",
                    }}
                  >
                    ✦ Sign In
                  </button>
                  <button
                    onClick={() => onToggle?.("signup")}
                    className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: active === "signup" ? COLORS.coral : "transparent",
                      color: active === "signup" ? "white" : COLORS.textMuted,
                      boxShadow: active === "signup" ? "0 4px 12px -4px rgba(249,135,130,0.4)" : "none",
                    }}
                  >
                    ✦ Sign Up
                  </button>
                </div>
              </div>

              {/* Carte du formulaire */}
              <div
                className="rounded-3xl p-9 shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <h1 className="font-serif text-2xl cursive-auth-title" style={{ color: "#151f27" }}>
                  {title || defaultTitle}
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {subtitle || defaultSubtitle}
                </p>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShellWithNavbar;
