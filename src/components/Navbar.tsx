// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";


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

export interface NavLink {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavbarProps {
  logo?: string;
  navLinks?: NavLink[];
  showAuthButtons?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  className?: string;
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
                                         logo = "/logo.jpg", // 💡 تم وضع المسار المباشر للملف من مجلد public
                                         navLinks = [
                                           { label: "Features", href: "#features" },
                                           { label: "How it Works", href: "#how-it-works" },
                                           { label: "Pricing", href: "#pricing" },
                                           { label: "Contact", href: "#contact-footer" },
                                         ],
                                         showAuthButtons = true,
                                         onSignIn,
                                         onSignUp,
                                         className = "",
                                         transparent = false,
                                       }) => {
  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        transparent ? "bg-transparent" : "glass"
      } ${className}`}
      style={{
        borderColor: "rgba(159,176,188,0.25)",
        background: transparent ? "transparent" : "rgba(255,255,255,0.55)",
        backdropFilter: transparent ? "none" : "blur(16px)",
        WebkitBackdropFilter: transparent ? "none" : "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Clausio logo"
            className="w-14 h-14 rounded-full object-cover shadow-sm hover:scale-105 transition-transform duration-300"
          />
          <span
            className="font-serif text-xl font-semibold hidden sm:block"
            style={{ color: COLORS.text }}
          >
            Clausio
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.onClick}
              className="text-[15px] transition-colors duration-200 relative group"
              style={{ color: COLORS.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ background: COLORS.primary }}
              />
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        {showAuthButtons && (
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="outline" size="sm" className="btn-pop" onClick={onSignIn}>
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" className="btn-pop" onClick={onSignUp}>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
