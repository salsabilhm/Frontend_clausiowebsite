import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { useAuth } from "../context/AuthContext";

/* ---------- Icons ---------- */
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 21v-8H7v8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3v5h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCancel = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCamera = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Types ---------- */
interface ProfileData {
  fullName: string;
  email: string;
  company: string;
  role: string;
  password: string;
  newPassword: string;
  avatar: string | null;
}

const EMPTY_PROFILE: ProfileData = {
  fullName: "",
  email: "",
  company: "",
  role: "",
  password: "••••••••",
  newPassword: "",
  avatar: null,
};

/* ---------- Page Profile ---------- */
const Profile: React.FC = () => {
  // Real user data now comes from AuthContext instead of being hardcoded.
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE);
  const [tempProfile, setTempProfile] = useState<ProfileData>(EMPTY_PROFILE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local form state whenever the authenticated user changes
  // (first load, after login, after another tab updates the profile, etc.)
  useEffect(() => {
    if (!user) return;
    const fromUser: ProfileData = {
      fullName: user.fullName,
      email: user.email,
      company: user.company ?? "",
      role: user.role ?? "",
      password: "••••••••",
      newPassword: "",
      avatar: user.avatar ?? null,
    };
    setProfile(fromUser);
    setTempProfile(fromUser);
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Leaving edit mode -> persist the changes through AuthContext.
      // NOTE: "password" / "newPassword" are not part of AuthUser and
      // are not sent to updateProfile -- AuthContext currently has no
      // dedicated password-change action, so those two fields stay
      // local/cosmetic until that's added.
      updateProfile({
        fullName: tempProfile.fullName,
        email: tempProfile.email,
        company: tempProfile.company,
        role: tempProfile.role,
        avatar: tempProfile.avatar,
      });
      setProfile(tempProfile);
    } else {
      setTempProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setTempProfile({
      ...tempProfile,
      [field]: value,
    });
  };

  const inputStyle = {
    borderColor: "#E5E9EC",
    background: "#FBFCFD",
    color: COLORS.text,
    transition: "all 0.3s ease",
  };

  return (
    <DashboardLayout active="profile">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,132,169,0.2); }
          50% { box-shadow: 0 0 20px 4px rgba(79,132,169,0.08); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
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
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
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

        .profile-card {
          animation: fadeInUp 0.6s ease-out;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
        }
        .profile-card:hover {
          box-shadow: 0 12px 50px rgba(79,132,169,0.1);
        }

        .avatar-wrapper {
          animation: floatAvatar 4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .avatar-wrapper:hover {
          transform: scale(1.05);
        }

        .avatar-overlay {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .avatar-wrapper:hover .avatar-overlay {
          opacity: 1;
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

        .btn-edit {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
        }
        .btn-edit:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 8px 35px ${COLORS.primary}35;
        }

        .btn-save {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
        }
        .btn-save:hover {
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

        .field-display {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
          background: rgba(249,250,251,0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }
        .field-display:hover {
          border-color: ${COLORS.primary}15;
          background: rgba(255,255,255,0.95);
        }

        .password-field {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }
      `}</style>

      <PageBanner
        badgeIcon={<IconUser />}
        badgeLabel="PROFILE"
        title="Your Profile"
        subtitle="Manage your personal information and workspace preferences."
        action={
          <button
            onClick={handleEditToggle}
            className="btn-edit inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-semibold no-underline"
          >
            {isEditing ? <IconSave /> : <IconEdit />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        }
      />

      <div className="profile-card rounded-2xl overflow-hidden">
        {/* Avatar Section */}
        <div className="relative p-8 sm:p-10 border-b" style={{ borderColor: "#E9EDF0" }}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="avatar-wrapper relative group">
              <div
                onClick={handleAvatarClick}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1a2b3c] to-[#2c4a6b] flex items-center justify-center text-white text-4xl font-medium shadow-xl shadow-[#2c4a6b]/20 cursor-pointer relative"
              >
                {tempProfile.avatar ? (
                  <img
                    src={tempProfile.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  (tempProfile.fullName || "?")
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                )}
                <div className="avatar-overlay absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0">
                  <IconCamera />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {isEditing && (
                <span
                  className="text-xs mt-2 block text-center cursive-subtitle"
                  style={{ color: COLORS.textMuted }}
                >
                  Click to change photo
                </span>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="cursive-title text-2xl font-semibold" style={{ color: "#151f27" }}>
                {tempProfile.fullName || "Unnamed User"}
              </h2>
              <p className="cursive-subtitle text-sm" style={{ color: COLORS.textMuted }}>
                {tempProfile.role || "No role set"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                />
              ) : (
                <div
                  className="field-display cursive-input w-full rounded-xl px-4 py-3 text-[14.5px]"
                  style={{ color: COLORS.text }}
                >
                  {profile.fullName || "—"}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                />
              ) : (
                <div
                  className="field-display cursive-input w-full rounded-xl px-4 py-3 text-[14.5px]"
                  style={{ color: COLORS.text }}
                >
                  {profile.email || "—"}
                </div>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                Company
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                />
              ) : (
                <div
                  className="field-display cursive-input w-full rounded-xl px-4 py-3 text-[14.5px]"
                  style={{ color: COLORS.text }}
                >
                  {profile.company || "—"}
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                Role
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="input-field cursive-input w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                />
              ) : (
                <div
                  className="field-display cursive-input w-full rounded-xl px-4 py-3 text-[14.5px]"
                  style={{ color: COLORS.text }}
                >
                  {profile.role || "—"}
                </div>
              )}
            </div>

            {/* Password (cosmetic only -- see note in handleEditToggle) */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                Password
              </label>
              {isEditing ? (
                <input
                  type="password"
                  value={tempProfile.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="input-field password-field w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                  placeholder="Enter current password"
                />
              ) : (
                <div
                  className="field-display password-field w-full rounded-xl px-4 py-3 text-[14.5px] flex items-center gap-2"
                  style={{ color: COLORS.text }}
                >
                  <IconLock />
                  {profile.password}
                </div>
              )}
            </div>

            {/* New Password (cosmetic only -- see note in handleEditToggle) */}
            <div>
              <label className="cursive-label block mb-2" style={{ color: COLORS.text }}>
                New Password
              </label>
              {isEditing ? (
                <input
                  type="password"
                  value={tempProfile.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  className="input-field password-field w-full rounded-xl border px-4 py-3 text-[14.5px] outline-none"
                  style={inputStyle}
                  placeholder="Enter new password"
                />
              ) : (
                <div
                  className="field-display password-field w-full rounded-xl px-4 py-3 text-[14.5px]"
                  style={{ color: COLORS.textMuted }}
                >
                  {profile.newPassword || "Not changed"}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t" style={{ borderColor: "#E9EDF0" }}>
              <button
                onClick={handleEditToggle}
                className="btn-save flex-1 rounded-xl px-6 py-3 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <IconSave /> Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="btn-cancel flex-1 rounded-xl px-6 py-3 text-sm font-semibold border flex items-center justify-center gap-2"
                style={{ borderColor: "#E5E9EC", color: COLORS.text }}
              >
                <IconCancel /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
