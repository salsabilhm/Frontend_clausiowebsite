// pages/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthShellWithNavbar,
  AuthInput,
  AuthPrimaryButton,
  AuthSocialButton,
  IconMail,
  IconLock,
  IconEye,
  IconGoogle,
  IconGithub,
  COLORS,
} from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error ?? "Invalid email or password.");
        setIsSubmitting(false);
        return;
      }

      navigate("/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShellWithNavbar
      active="signin"
      title="Welcome Back"
      subtitle="Sign in to continue managing your AI-generated project specifications."
      onToggle={(mode) => {
        window.location.href = mode === "signup" ? "/signup" : "/signin";
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-7 space-y-4">
          <AuthInput
            icon={<IconMail />}
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            icon={<IconLock />}
            placeholder="Your password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggle={
              <button onClick={() => setShowPassword((v) => !v)} type="button">
                <IconEye open={showPassword} />
              </button>
            }
          />
        </div>

        {error && (
          <p className="mt-3 text-[13px] font-medium" style={{ color: "#C0392B" }}>
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 text-sm">
          <label className="flex items-center gap-2" style={{ color: COLORS.textMuted }}>
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
          <a href="#" style={{ color: COLORS.primary }} className="font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="mt-6">
          <AuthPrimaryButton
            label={isSubmitting ? "Signing in..." : "Sign In"}
            gradient={[COLORS.dark, COLORS.primary]}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px" style={{ background: "#EEF1F3" }} />
        <span className="text-xs" style={{ color: COLORS.textMuted }}>
          OR
        </span>
        <div className="flex-1 h-px" style={{ background: "#EEF1F3" }} />
      </div>

      <div className="space-y-3">
        <AuthSocialButton label="Continue with Google" icon={<IconGoogle />} />
        <AuthSocialButton label="Continue with GitHub" icon={<IconGithub />} dark />
      </div>

      <p className="text-center text-sm mt-7" style={{ color: COLORS.textMuted }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: COLORS.coral }} className="font-medium hover:underline">
          Sign Up
        </a>
      </p>
    </AuthShellWithNavbar>
  );
};

export default SignIn;
