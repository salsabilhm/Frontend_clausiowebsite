import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

/* ---------- Icons ---------- */
const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const IconBell = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 20a2 2 0 0 0 4 0" strokeLinecap="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Types ---------- */
interface NavbarDashboardProps {
  onSearch?: (query: string) => void;
}

/* ---------- Component ---------- */
const NavbarDashboard: React.FC<NavbarDashboardProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  // Real signed-in user + logout action, instead of hardcoded props.
  const { user, logout } = useAuth();

  const userName = user?.fullName || "Guest";
  const userRole = user?.role || user?.company || "Member";
  const userInitials =
    user?.fullName
      ?.split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    logout();
    navigate("/signin");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 h-20 flex items-center gap-4 px-6 lg:px-10 border-b"
      style={{
        borderColor: "rgba(233,237,240,0.3)",
        background: `
          radial-gradient(ellipse 70% 100% at 0% 0%, ${COLORS.primary}08 0%, rgba(255,255,255,0) 60%),
          radial-gradient(ellipse 60% 100% at 100% 0%, ${COLORS.coral}06 0%, rgba(255,255,255,0) 60%),
          rgba(248,250,252,0.92)
        `,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        @keyframes floatSearch {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.01); }
        }
        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,135,130,0.3); }
          50% { box-shadow: 0 0 20px 4px rgba(249,135,130,0.1); }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .search-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatSearch 4s ease-in-out infinite;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .search-wrapper:focus-within {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primary}15, 0 8px 30px ${COLORS.primary}10;
          transform: translateY(-2px) scale(1.01);
          background: rgba(255,255,255,0.95);
        }
        .search-wrapper:hover {
          border-color: ${COLORS.primary}30;
        }
        .search-input {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
        .search-input::placeholder {
          color: ${COLORS.textMuted};
          opacity: 0.7;
          font-style: italic;
        }

        .btn-notification {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: glowPulse 3s ease-in-out infinite;
        }
        .btn-notification:hover {
          transform: scale(1.08) rotate(-3deg);
          border-color: ${COLORS.primary}30;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 8px 30px ${COLORS.primary}15;
        }

        .notification-dot {
          animation: pulseDot 2s ease-in-out infinite;
          box-shadow: 0 0 20px ${COLORS.coral}60;
        }

        .user-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0.25rem 0.5rem 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid transparent;
          position: relative;
          cursor: pointer;
        }
        .user-wrapper:hover {
          background: rgba(255,255,255,0.9);
          border-color: ${COLORS.primary}20;
          transform: translateX(3px) scale(1.02);
          box-shadow: 0 8px 30px ${COLORS.primary}10;
        }
        .user-wrapper:hover .user-avatar {
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 8px 25px ${COLORS.coral}40;
        }
        .user-wrapper:hover .chevron-icon {
          transform: rotate(180deg);
          color: ${COLORS.primary};
        }

        .user-avatar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.coral}, ${COLORS.primary});
          box-shadow: 0 4px 15px ${COLORS.coral}30;
          border: 2px solid rgba(255,255,255,0.5);
          flex-shrink: 0;
        }

        .user-name {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
          background: linear-gradient(90deg, ${COLORS.text}, ${COLORS.primary}, ${COLORS.text});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 4s linear infinite;
        }

        .user-role {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: ${COLORS.textMuted};
          opacity: 0.8;
        }

        .chevron-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-search {
          transition: all 0.3s ease;
          color: ${COLORS.textMuted};
        }
        .search-wrapper:focus-within .icon-search {
          color: ${COLORS.primary};
          transform: scale(1.1);
        }

        .icon-bell {
          transition: all 0.3s ease;
        }
        .btn-notification:hover .icon-bell {
          color: ${COLORS.primary};
          transform: scale(1.1) rotate(5deg);
        }

        .sparkle-text {
          font-size: 10px;
          font-weight: 500;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: ${COLORS.primary}12;
          color: ${COLORS.primary};
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          display: inline-block;
          animation: shimmerText 3s linear infinite;
          background-size: 200% auto;
          background-image: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.coral}, ${COLORS.primary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dropdown-menu {
          animation: slideDown 0.2s ease-out;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(233,237,240,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .dropdown-item {
          transition: all 0.2s ease;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
        }
        .dropdown-item:hover {
          background: ${COLORS.primary}08;
          color: ${COLORS.primary};
          transform: translateX(4px);
        }
        .dropdown-item-danger:hover {
          background: rgba(239,68,68,0.08);
          color: #ef4444;
        }
      `}</style>

      {/* Search Bar */}
      <div
        className="search-wrapper flex items-center gap-2.5 flex-1 max-w-md rounded-full px-4 py-2.5 border"
        style={{ borderColor: "#E5E9EC" }}
      >
        <span className="icon-search">
          <IconSearch />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search projects, clients, specs..."
          className="search-input flex-1 bg-transparent outline-none text-[14px]"
          style={{ color: COLORS.text }}
        />
      </div>

      <div className="flex-1" />

      {/* Notification */}
      <button
        className="btn-notification relative w-10 h-10 rounded-full flex items-center justify-center border"
        style={{ borderColor: "#E5E9EC" }}
        aria-label="Notifications"
      >
        <span className="icon-bell">
          <IconBell />
        </span>
        <span
          className="notification-dot absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
          style={{ background: COLORS.coral }}
        />
      </button>

      {/* User Profile with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="user-wrapper flex items-center gap-2.5"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="User menu"
        >
          <div className="user-avatar w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {userInitials}
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <div className="user-name text-[14px] font-medium">
              {userName}
              <span className="sparkle-text ml-1">✦</span>
            </div>
            <div className="user-role text-[11px] uppercase tracking-wider">
              {userRole}
            </div>
          </div>
          <span className="chevron-icon">
            <IconChevronDown />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu absolute right-0 mt-2 w-56 rounded-2xl py-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100/60">
              <div
                className="font-medium text-[#1a2b3c]"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                {userName}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{userRole}</div>
            </div>

            <button
              onClick={handleProfileClick}
              className="dropdown-item w-full text-left px-4 py-2.5 text-sm text-gray-600 flex items-center gap-3"
            >
              <IconUser />
              Your Profile
            </button>

            <button
              onClick={handleSettingsClick}
              className="dropdown-item w-full text-left px-4 py-2.5 text-sm text-gray-600 flex items-center gap-3"
            >
              <IconSettings />
              Settings
            </button>

            <div className="border-t border-gray-100/60 mt-1 pt-1">
              <button
                onClick={handleLogoutClick}
                className="dropdown-item dropdown-item-danger w-full text-left px-4 py-2.5 text-sm flex items-center gap-3"
              >
                <IconLogout />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarDashboard;
