import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AuthShellWithNavbar,
  AuthInput,
  AuthPrimaryButton,
  AuthSocialButton,
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconGoogle,
  IconGithub,
  COLORS,
} from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validation basique
    if (!agreed) {
      setError("You must agree to the Terms & Privacy Policy.");
      return;
    }

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Attente de la création du compte (await)
      const result = await signup({ fullName, email, password, confirmPassword });

      if (!result.success) {
        setError(result.error ?? "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);

      // 3. Connexion automatique immédiate avec await
      const loginResult = await login(email, password);

      if (loginResult.success) {
        navigate("/dashboard");
      } else {
        navigate("/signin");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShellWithNavbar
      active="signup"
      title="Create your Account"
      subtitle="Start transforming client conversations into professional project specifications."
      onToggle={(mode) => {
        navigate(mode === "signup" ? "/signup" : "/signin");
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-7 space-y-4">
          <AuthInput
            icon={<IconUser />}
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <AuthInput
            icon={<IconMail />}
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            icon={<IconLock />}
            placeholder="Create a password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggle={
              <button onClick={() => setShowPassword((v) => !v)} type="button">
                <IconEye open={showPassword} />
              </button>
            }
          />
          <AuthInput
            icon={<IconLock />}
            placeholder="Confirm password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggle={
              <button onClick={() => setShowConfirm((v) => !v)} type="button">
                <IconEye open={showConfirm} />
              </button>
            }
          />
        </div>

        {error && (
          <p className="mt-3 text-[13px] font-medium" style={{ color: "#C0392B" }}>
            {error}
          </p>
        )}
        {success && (
          <p className="mt-3 text-[13px] font-medium" style={{ color: "#16A34A" }}>
            Account created! Redirecting you to your dashboard...
          </p>
        )}

        <label className="flex items-start gap-2 mt-4 text-sm" style={{ color: COLORS.textMuted }}>
          <input
            type="checkbox"
            className="rounded mt-0.5"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <a href="#" style={{ color: COLORS.primary }} className="font-medium hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" style={{ color: COLORS.primary }} className="font-medium hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <div className="mt-6">
          <AuthPrimaryButton
            label={isSubmitting ? "Creating account..." : "Create Account"}
            gradient={[COLORS.coral, "#e26b62"]}
            type="submit"
            disabled={isSubmitting || success}
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
        Already have an account?{" "}
        <Link to="/signin" style={{ color: COLORS.coral }} className="font-medium hover:underline">
          Sign In
        </Link>
      </p>
    </AuthShellWithNavbar>
  );
};

export default SignUp;
