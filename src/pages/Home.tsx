// pages/Home.tsx
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ============================================================
   PALETTE (source unique)
   ============================================================ */
const COLORS = {
  bg: "#F8FAFC",
  primary: "#4F84A9",
  secondary: "#9FB0BC",
  coral: "#F98782",
  sand: "#E2B291",
  beige: "#E7CFA2",
  text: "#1F2937",
  textMuted: "#6B7280",
};

/* ============================================================
   Reveal au scroll — fade + slide, sans toucher au contenu
   ============================================================ */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "none";
}> = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    direction === "up"
      ? "opacity-0 translate-y-8"
      : direction === "right"
        ? "opacity-0 translate-x-10"
        : "opacity-0";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 translate-x-0" : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------- Icons inline ---------- */
const IconMic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10v1a7 7 0 0 0 14 0v-1" strokeLinecap="round" />
    <path d="M12 18v3M9 21h6" strokeLinecap="round" />
  </svg>
);
const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSparkles = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);
const IconEdit = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 20h9" strokeLinecap="round" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h6" strokeLinejoin="round" />
  </svg>
);
const IconCloud = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11z" strokeLinejoin="round" />
  </svg>
);
const IconUpload = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M12 16V4M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCpu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" strokeLinecap="round" />
  </svg>
);
const IconDoc = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 2v6h6M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c4a5e" strokeWidth="2.5">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Data ---------- */
const FEATURES = [
  { icon: <IconMic />, title: "Meeting Transcription", description: "Convert meetings into structured, searchable documentation automatically." },
  { icon: <IconChat />, title: "WhatsApp Integration", description: "Import conversations directly from WhatsApp Business exports." },
  { icon: <IconSparkles />, title: "AI Specification Generator", description: "Generate complete project specifications from raw input in one click." },
  { icon: <IconEdit />, title: "Fully Editable Output", description: "Refine every section of the generated specification before you send it." },
  { icon: <IconFile />, title: "PDF Export", description: "Deliver polished, client-ready documents in a single click." },
  { icon: <IconCloud />, title: "Cloud Sync", description: "Keep every project spec backed up and accessible from anywhere." },
];

const STEPS = [
  { number: "01", icon: <IconUpload />, title: "Upload", items: ["Audio recordings", "Video files", "WhatsApp exports"] },
  { number: "02", icon: <IconCpu />, title: "AI Processing", items: ["Speech-to-text", "Information extraction", "Requirement analysis"] },
  { number: "03", icon: <IconDoc />, title: "Professional Specification", items: ["Fully editable", "Exportable to PDF", "Client-ready"] },
];

const STATS = [
  { value: "95%", label: "Time Saved" },
  { value: "3x", label: "Faster Documentation" },
  { value: "100%", label: "Editable Output" },
  { value: "24/7", label: "AI Assistance" },
];

/* ---------- Page Home ---------- */
const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        color: COLORS.text,
        backgroundColor: COLORS.bg,
        backgroundImage:
          `radial-gradient(55% 45% at 12% 8%, ${COLORS.primary}26 0%, rgba(255,255,255,0) 60%), radial-gradient(50% 40% at 90% 15%, ${COLORS.coral}26 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 50% at 100% 60%, ${COLORS.sand}26 0%, rgba(255,255,255,0) 55%), radial-gradient(50% 45% at 0% 90%, ${COLORS.secondary}26 0%, rgba(255,255,255,0) 60%)`,
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        @keyframes floatY {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-16px) rotate(1.2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatSlow {
          0%   { transform: translateY(0px) translateX(0px); }
          50%  { transform: translateY(-10px) translateX(6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cursiveWave {
          0%, 100% { transform: rotate(-1deg) scale(1); }
          50% { transform: rotate(1deg) scale(1.02); }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(249,135,130,0.3), 0 0 40px rgba(249,135,130,0.1); }
          50% { text-shadow: 0 0 30px rgba(249,135,130,0.5), 0 0 60px rgba(249,135,130,0.2); }
        }

        .nav-animate { animation: fadeInDown 0.7s ease-out both; }
        .hero-float { animation: floatY 6s ease-in-out infinite; }
        .hero-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .glow-orb { animation: softPulse 5s ease-in-out infinite; }

        /* === STYLE D'ÉCRITURE DÉCORATIF === */
        .cursive-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 10px rgba(79, 132, 169, 0.15);
        }
        .cursive-subtitle {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.05em;
        }
        .cursive-accent {
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
        .cursive-accent-2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: ${COLORS.coral};
          text-shadow: 0 0 30px rgba(249,135,130,0.2);
          animation: glowPulse 3s ease-in-out infinite;
        }
        .cursive-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #151f27 0%, ${COLORS.primary} 50%, #6a5a8e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cursive-step {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 700;
          color: ${COLORS.sand};
          text-shadow: 0 2px 10px rgba(226, 178, 145, 0.3);
        }
        .cursive-stat {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 700;
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.coral});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }
        .cursive-quote {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
          color: #fff;
          text-shadow: 0 2px 20px rgba(0,0,0,0.2);
        }
        .cursive-label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .glass {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(79, 132, 169, 0.28);
          border-color: rgba(79, 132, 169, 0.35);
        }
        .btn-pop { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .btn-pop:hover { transform: scale(1.045); }
        .badge-pop { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .badge-pop:hover { transform: translateY(-2px); border-color: rgba(79, 132, 169, 0.4); }
        .stat-card { transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; }
        .stat-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px -14px rgba(31, 41, 55, 0.18); }

        @media (prefers-reduced-motion: reduce) {
          .nav-animate, .hero-float, .hero-float-slow, .glow-orb { animation: none !important; }
          .glass-card, .btn-pop, .badge-pop, .stat-card { transition: none !important; }
        }
      `}</style>

      {/* Navbar Component */}
      <Navbar className="nav-animate" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="glow-orb pointer-events-none absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: COLORS.coral, opacity: 0.22 }} />
        <div className="glow-orb pointer-events-none absolute top-10 right-0 w-[380px] h-[380px] rounded-full blur-3xl" style={{ background: COLORS.primary, opacity: 0.2, animationDelay: "1.2s" }} />
        <div className="glow-orb pointer-events-none absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: COLORS.beige, opacity: 0.25, animationDelay: "2.4s" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 shadow-sm glass badge-pop cursive-label"
              style={{
                color: COLORS.textMuted,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
              }}
            >
              <span style={{ color: COLORS.coral }}>✦</span> AI-Powered Project Documentation
            </span>

            <h1
              className="cursive-title text-5xl lg:text-[3.8rem] leading-[1.1] mt-6"
              style={{
                color: "#151f27",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
            >
              Transform client{" "}
              <span className="cursive-accent">
                conversations
              </span>{" "}
              into professional project specifications
            </h1>

            <p
              className="cursive-subtitle text-lg mt-6 max-w-xl leading-relaxed"
              style={{ color: COLORS.textMuted, opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}
            >
              Clausio uses artificial intelligence to convert meetings, voice recordings,
              videos, and WhatsApp conversations into structured, editable project
              specifications — in minutes.
            </p>

            <div
              className="flex flex-wrap items-center gap-5 mt-9"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
              }}
            >
              <Button variant="primary" size="lg" icon={<IconArrowRight />} className="btn-pop">Start for Free</Button>
              <button className="btn-pop inline-flex items-center gap-2 font-medium transition-colors" style={{ color: COLORS.text }}>
                <span className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: "#d9dee2" }}>
                  <IconPlay />
                </span>
                Watch Demo
              </button>
            </div>

            <div
              className="flex flex-wrap gap-6 mt-8 text-sm"
              style={{ color: COLORS.textMuted, opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.6s" }}
            >
              {["No credit card required", "Free plan available", "Powered by AI"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <IconCheck /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div
            className="relative h-[420px] hidden lg:flex items-center justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateX(0) scale(1)" : "translateX(48px) scale(0.96)",
              transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s",
            }}
          >
            <div className="hero-float-slow pointer-events-none absolute top-6 left-4 w-16 h-16 rounded-2xl glass" style={{ boxShadow: "0 12px 30px -10px rgba(79,132,169,0.35)" }} />
            <div className="hero-float-slow pointer-events-none absolute bottom-10 right-2 w-12 h-12 rounded-full glass" style={{ animationDelay: "1.5s", boxShadow: "0 12px 30px -10px rgba(249,135,130,0.35)" }} />
            <div className="hero-float-slow pointer-events-none absolute top-1/3 right-8 w-8 h-8 rounded-lg" style={{ background: COLORS.beige, opacity: 0.7, animationDelay: "0.8s" }} />

            {/* ✅ تم التعديل للاستدعاء المباشر من مجلد public */}
            <img
              src="/hero-image.png"
              alt="Clausio - illustration"
              className="hero-float max-h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <Reveal>
          <span className="cursive-label text-xs font-semibold tracking-wide uppercase" style={{ color: COLORS.primary }}>✦ Features</span>
          <h2 className="cursive-heading text-4xl lg:text-[2.8rem] mt-3 mb-3 max-w-2xl">
            Everything you need to document your projects
          </h2>
          <p className="cursive-subtitle text-lg max-w-xl mb-12" style={{ color: COLORS.textMuted }}>
            A complete toolkit that turns raw conversations into deliverable specifications.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="glass-card rounded-2xl h-full">
                <Card icon={f.icon} title={f.title} description={f.description} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24" style={{ backgroundColor: "#F1F5F8" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal className="inline-block">
            <span className="cursive-label text-xs font-semibold tracking-wide uppercase" style={{ color: COLORS.primary }}>✦ How it Works</span>
            <h2 className="cursive-heading text-4xl lg:text-[2.8rem] mt-3 mb-14">
              From conversation to specification in{" "}
              <span className="cursive-accent-2">
                three steps
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="glass-card rounded-2xl p-8 relative h-full" style={{ borderColor: "rgba(159,176,188,0.3)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #2c4a5e)` }}>
                      {step.icon}
                    </div>
                    <span className="cursive-step text-3xl">{step.number}</span>
                  </div>
                  <h3 className="cursive-title text-xl mb-4" style={{ color: COLORS.text }}>{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px]" style={{ color: COLORS.textMuted }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.coral }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - id="about" pour que le footer y accède */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        <Reveal>
          <span className="cursive-label text-xs font-semibold tracking-wide uppercase" style={{ color: COLORS.primary }}>✦ Why Clausio</span>
          <h2 className="cursive-heading text-4xl lg:text-[2.8rem] mt-3 mb-14">Built for teams that ship faster</h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="stat-card glass-card rounded-2xl py-10 px-4" style={{ borderColor: "rgba(159,176,188,0.3)" }}>
                <div className="cursive-stat text-4xl mb-2">{s.value}</div>
                <div className="cursive-subtitle text-[15px]" style={{ color: COLORS.textMuted }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA - id="pricing" pour que la navbar y accède */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <Reveal>
          <div className="rounded-3xl px-8 py-16 text-center relative overflow-hidden" style={{ background: `linear-gradient(120deg, #2c4a5e 0%, ${COLORS.primary} 55%, #6a5a8e 100%)` }}>
            <div className="glow-orb pointer-events-none absolute -top-16 -right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: COLORS.coral, opacity: 0.35 }} />
            <div className="glow-orb pointer-events-none absolute -bottom-16 -left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: COLORS.beige, opacity: 0.25, animationDelay: "2s" }} />
            <h2 className="relative cursive-quote text-4xl lg:text-5xl mb-5 max-w-2xl mx-auto leading-tight">
              Ready to automate your <span className="italic">project documentation</span>?
            </h2>
            <p className="relative cursive-subtitle text-white/85 text-lg max-w-xl mx-auto mb-9">
              Join freelancers and agencies using Clausio to save time and deliver
              professional project specifications faster.
            </p>
            <div className="relative">
              <Button variant="primary" size="lg" icon={<IconArrowRight />} className="btn-pop">Start for Free</Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
