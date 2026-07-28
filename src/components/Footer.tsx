// components/Footer.tsx
import React, { useState } from "react";

const logoImg = "/src/assets/logo.jpg";

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

export interface FooterProps {
  logo?: string;
  companyName?: string;
  year?: number;
  links?: Array<{ label: string; href: string }>;
}

/* ---------- Icons ---------- */
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({
                                         logo = logoImg,
                                         companyName = "Clausio",
                                         year = new Date().getFullYear(),
                                         links = [
                                           { label: "Features", href: "#features" },
                                           { label: "How it Works", href: "#how-it-works" },
                                           { label: "About", href: "#about" },
                                           { label: "Contact", href: "#contact-footer" },
                                           { label: "Privacy", href: "#" },
                                           { label: "Terms", href: "#" },
                                         ],
                                       }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail('');
        setMessage('');
      }, 3000);
      console.log('Email:', email, 'Message:', message);
    }
  };

  return (
    <footer
      id="contact-footer"
      className="border-t"
      style={{
        background: `
          linear-gradient(180deg, #FBFCFD 0%, #F1F5F8 100%)
        `,
        borderColor: "rgba(233,237,240,0.4)",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .footer-logo {
          transition: transform 0.5s ease;
        }
        .footer-logo:hover {
          transform: rotate(-5deg) scale(1.05);
        }

        .footer-link {
          position: relative;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: ${COLORS.primary};
          transition: width 0.3s ease;
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .footer-link:hover {
          color: ${COLORS.primary} !important;
          transform: translateX(4px);
        }

        .footer-divider {
          background: linear-gradient(90deg, transparent, ${COLORS.primary}20, transparent);
          height: 1px;
        }

        .footer-badge {
          background: linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.coral}10);
          border: 1px solid ${COLORS.primary}15;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          color: ${COLORS.primary};
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .footer-badge .sparkle {
          animation: glow 2s ease-in-out infinite;
        }

        .footer-bottom-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-bottom-text .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${COLORS.primary}30;
        }

        /* Email form styles */
        .contact-input {
          transition: all 0.3s ease;
          border: 1.5px solid #e2e8f0;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(4px);
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          width: 100%;
          outline: none;
          font-family: inherit;
        }
        .contact-input:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px rgba(79,132,169,0.1);
          background: white;
        }
        .contact-input::placeholder {
          color: #94a3b8;
        }
        .contact-textarea {
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
        }
        .contact-btn {
          transition: all 0.3s ease;
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.dark});
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          width: 100%;
        }
        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79,132,169,0.3);
        }
        .contact-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .sent-message {
          animation: fadeIn 0.5s ease;
          color: #166534;
          background: #dcfce7;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .social-icon {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-4">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Company Info - 5 columns */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="w-12 h-12 rounded-full object-cover footer-logo shadow-sm"
                style={{ boxShadow: `0 4px 12px ${COLORS.primary}20` }}
              />
              <div>
                <span className="text-xl font-semibold" style={{ color: COLORS.dark }}>
                  {companyName}
                </span>
                <span className="footer-badge ml-2">
                  <span className="sparkle">✦</span> AI-Powered
                </span>
              </div>
            </div>
            <p className="text-[14.5px] max-w-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
              AI-powered project documentation for freelancers, agencies and product teams.
              Transform conversations into professional specifications instantly.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
                Trusted by 500+ teams
              </span>
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b" }}>★</span>
                ))}
              </span>
            </div>
          </div>

          {/* Quick Links - 4 columns */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: COLORS.text }}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link text-[14px]"
                  style={{ color: COLORS.textMuted }}
                >
                  <IconChevronRight />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: COLORS.text }}>
              Contact Us
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="contact-input"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your problem or question..."
                className="contact-input contact-textarea"
                required
              />
              {sent ? (
                <div className="sent-message">
                  <span>✓</span> Message sent successfully!
                </div>
              ) : (
                <button type="submit" className="contact-btn" disabled={!email || !message}>
                  <IconSend /> Send Message
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <span className="footer-bottom-text" style={{ color: "#8a949b" }}>
            © {year} {companyName}. All rights reserved.
            <span className="dot" />
            <span className="flex items-center gap-1">
              <span className="sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
              Crafted with care
            </span>
          </span>
          <span className="flex items-center gap-4 text-xs" style={{ color: "#8a949b" }}>
            <span>Privacy Policy</span>
            <span className="dot" />
            <span>Terms of Service</span>
            <span className="dot" />
            <span>Cookie Policy</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
