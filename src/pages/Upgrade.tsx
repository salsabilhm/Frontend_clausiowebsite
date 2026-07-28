// src/pages/Upgrade.tsx
import React, { useState } from "react";
import { COLORS } from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Dashboardlayout ";
import PageBanner from "../components/Pagebanner ";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

/* ---------- Icons ---------- */
const IconUpgrade = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8v6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCrown = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 16l2-10 5 4 5-4 2 10H5z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
  </svg>
);

const IconBuilding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M8 6h8M8 10h8M8 14h4M16 14h2M8 18h2M14 18h2" strokeLinecap="round" />
  </svg>
);

/* ---------- Types ---------- */
type BillingCycle = "monthly" | "yearly";

/* ---------- Page Upgrade ---------- */
const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  // ✅ استخدام SettingsContext
  const { plans, subscription, upgradePlan, getCurrentPlan } = useSettings();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(subscription.billingCycle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("pro");

  // ✅ الحصول على الخطة المختارة
  const getSelectedPlan = () => {
    return plans.find(plan => plan.id === selectedPlanId) || plans[1] || plans[0];
  };

  // ✅ تحديث الأسعار بناءً على دورة الفوترة
  const getPlanPrice = (plan: typeof plans[0]) => {
    if (billingCycle === "monthly") {
      return plan.price;
    }
    // خصم 20% للخطة السنوية
    return Math.round(plan.price * 12 * 0.8);
  };

  const handleSubscribe = (planId: string) => {
    setSelectedPlanId(planId);
    // ✅ تخزين دورة الفوترة المختارة
    setIsModalOpen(true);
  };

  const handleConfirmSubscribe = () => {
    // ✅ استخدام upgradePlan من Context
    upgradePlan(selectedPlanId, billingCycle);
    setIsModalOpen(false);
    // ✅ توجيه المستخدم إلى لوحة التحكم
    navigate("/dashboard");
  };

  // ✅ أيقونات الخطط
  const getPlanIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkle":
        return <IconSparkle />;
      case "crown":
        return <IconCrown />;
      case "building":
        return <IconBuilding />;
      default:
        return <IconSparkle />;
    }
  };

  const currentPlan = getSelectedPlan();
  const isCurrentPlan = (planId: string) => subscription.planId === planId;

  return (
    <DashboardLayout active="settings">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,132,169,0.3); }
          50% { box-shadow: 0 0 30px 8px rgba(79,132,169,0.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
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
        }
        .cursive-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .plan-card {
          animation: fadeInUp 0.6s ease-out;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(233,237,240,0.6);
          box-shadow: 0 8px 40px rgba(79,132,169,0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 60px rgba(79,132,169,0.12);
        }
        .plan-card-popular {
          border: 2px solid ${COLORS.primary};
          box-shadow: 0 8px 40px ${COLORS.primary}20;
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .plan-card-popular:hover {
          box-shadow: 0 16px 60px ${COLORS.primary}30;
        }
        .plan-card-current {
          border: 2px solid ${COLORS.coral};
          background: rgba(255,255,255,0.95);
        }

        .current-badge {
          background: ${COLORS.coral};
          color: white;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.06em;
        }

        .popular-badge {
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.dark});
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.06em;
        }

        .plan-price {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .feature-checked {
          color: ${COLORS.primary};
        }
        .feature-unchecked {
          color: #D1D5DB;
        }

        .billing-toggle {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(233,237,240,0.6);
          padding: 0.25rem;
          border-radius: 9999px;
          display: inline-flex;
          transition: all 0.3s ease;
        }
        .billing-option {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 0.875rem;
        }
        .billing-option-active {
          background: ${COLORS.primary};
          color: white;
          box-shadow: 0 4px 15px ${COLORS.primary}30;
        }
        .billing-option:not(.billing-option-active):hover {
          color: ${COLORS.primary};
        }

        .save-badge {
          background: ${COLORS.coral}15;
          color: ${COLORS.coral};
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 0.65rem;
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
        }

        .btn-subscribe {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, ${COLORS.dark}, ${COLORS.primary});
          box-shadow: 0 4px 20px ${COLORS.primary}25;
        }
        .btn-subscribe:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 8px 35px ${COLORS.primary}35;
        }
        .btn-subscribe:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-current {
          background: ${COLORS.coral};
          box-shadow: 0 4px 20px ${COLORS.coral}25;
        }
        .btn-current:hover {
          background: ${COLORS.coral};
          box-shadow: 0 8px 35px ${COLORS.coral}35;
        }

        .modal-overlay {
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: fadeInUp 0.3s ease-out;
        }
        .modal-content {
          animation: fadeInUp 0.4s ease-out;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(233,237,240,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .plan-card-delay-1 { animation-delay: 0.1s; }
        .plan-card-delay-2 { animation-delay: 0.2s; }
        .plan-card-delay-3 { animation-delay: 0.3s; }
      `}</style>

      <PageBanner
        badgeIcon={<IconUpgrade />}
        badgeLabel="UPGRADE"
        title="Choose Your Plan"
        subtitle="Upgrade your workspace to unlock advanced AI capabilities and higher limits."
      />

      {/* Billing Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="billing-toggle">
          <button
            className={`billing-option ${billingCycle === "monthly" ? "billing-option-active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`billing-option ${billingCycle === "yearly" ? "billing-option-active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
          </button>
        </div>
        {billingCycle === "yearly" && (
          <span className="save-badge px-3 py-1.5">
            ✦ Save up to 20%
          </span>
        )}
        <span className="cursive-text text-sm" style={{ color: COLORS.textMuted }}>
          Current Plan: <strong style={{ color: COLORS.primary }}>{getCurrentPlan()?.name || "Starter"}</strong>
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isPopular = plan.popular;
          const isCurrent = isCurrentPlan(plan.id);
          const price = getPlanPrice(plan);
          const delayClass = index === 0 ? "plan-card-delay-1" : index === 1 ? "plan-card-delay-2" : "plan-card-delay-3";

          return (
            <div
              key={plan.id}
              className={`plan-card rounded-2xl p-6 flex flex-col ${delayClass} ${isPopular ? "plan-card-popular" : ""} ${isCurrent ? "plan-card-current" : ""}`}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {isPopular && (
                  <div className="popular-badge text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                    ✦ Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="current-badge text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                    ✓ Current Plan
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${COLORS.primary}15`, color: COLORS.primary }}
                >
                  {getPlanIcon(plan.icon)}
                </div>
                <h3 className="cursive-title text-lg font-semibold" style={{ color: "#151f27" }}>
                  {plan.name}
                </h3>
              </div>

              <p className="cursive-subtitle text-sm" style={{ color: COLORS.textMuted }}>
                {plan.description}
              </p>

              <div className="mt-4 pb-4 border-b" style={{ borderColor: "#E9EDF0" }}>
                <span className="plan-price text-3xl" style={{ color: "#151f27" }}>
                  {plan.currency}{price}
                </span>
                <span className="text-sm" style={{ color: COLORS.textMuted }}>
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
                {billingCycle === "yearly" && (
                  <span className="block text-xs mt-1" style={{ color: COLORS.coral }}>
                    Save {Math.round((1 - price / (plan.price * 12)) * 100)}%
                  </span>
                )}
              </div>

              {/* Limits */}
              <div className="mt-3 text-xs" style={{ color: COLORS.textMuted }}>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <span className="cursive-label">Projects</span>
                  <span className="font-medium" style={{ color: COLORS.text }}>
                    {plan.limits.projects === 'unlimited' ? '♾️ Unlimited' : plan.limits.projects}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <span className="cursive-label">Team Members</span>
                  <span className="font-medium" style={{ color: COLORS.text }}>
                    {plan.limits.teamMembers === 'unlimited' ? '♾️ Unlimited' : plan.limits.teamMembers}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <span className="cursive-label">AI Generations</span>
                  <span className="font-medium" style={{ color: COLORS.text }}>
                    {plan.limits.aiGenerations === 'unlimited' ? '♾️ Unlimited' : plan.limits.aiGenerations}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="cursive-label">Storage</span>
                  <span className="font-medium" style={{ color: COLORS.text }}>
                    {plan.limits.storage}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-4 space-y-2 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm">
                    <span className={feature.included ? "feature-checked" : "feature-unchecked"}>
                      {feature.included ? <IconCheck /> : <IconClose />}
                    </span>
                    <span
                      className={feature.included ? "cursive-label" : "cursive-label opacity-50"}
                      style={{ color: feature.included ? COLORS.text : COLORS.textMuted }}
                    >
                      {feature.label}
                      {feature.tooltip && (
                        <span className="ml-1 text-xs opacity-50" title={feature.tooltip}>
                          ⓘ
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrent}
                className={`btn-subscribe w-full rounded-xl px-6 py-3.5 text-white text-sm font-semibold mt-6 ${
                  isPopular ? "relative overflow-hidden" : ""
                } ${isCurrent ? "btn-current" : ""}`}
              >
                {isCurrent && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                )}
                {isCurrent ? "✓ Current Plan" : isPopular ? "Subscribe Now" : "Get Started"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-content rounded-3xl p-8 max-w-md w-full">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: `${COLORS.primary}15` }}
              >
                <IconCrown />
              </div>
              <h2 className="cursive-title text-2xl font-semibold" style={{ color: "#151f27" }}>
                Confirm Subscription
              </h2>
              <p className="cursive-subtitle text-sm mt-2" style={{ color: COLORS.textMuted }}>
                You are about to upgrade to the <strong className="cursive-label" style={{ color: COLORS.primary }}>{currentPlan?.name}</strong>.
                Your workspace will be upgraded immediately.
              </p>

              <div className="mt-6 p-4 rounded-xl" style={{ background: `${COLORS.primary}08` }}>
                <div className="flex justify-between items-center">
                  <span className="cursive-label text-sm" style={{ color: COLORS.text }}>
                    Plan
                  </span>
                  <span className="cursive-title text-sm font-semibold" style={{ color: "#151f27" }}>
                    {currentPlan?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="cursive-label text-sm" style={{ color: COLORS.text }}>
                    Billing
                  </span>
                  <span className="cursive-title text-sm font-semibold" style={{ color: "#151f27" }}>
                    {billingCycle === "monthly" ? "Monthly" : "Yearly"}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t" style={{ borderColor: "rgba(233,237,240,0.4)" }}>
                  <span className="cursive-label text-sm" style={{ color: COLORS.text }}>
                    Total
                  </span>
                  <span className="cursive-title text-lg font-bold" style={{ color: COLORS.primary }}>
                    {currentPlan?.currency}{getPlanPrice(currentPlan!)}
                    <span className="text-sm font-normal" style={{ color: COLORS.textMuted }}>
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleConfirmSubscribe}
                  className="btn-subscribe flex-1 rounded-xl px-6 py-3 text-white text-sm font-semibold"
                >
                  Confirm & Upgrade
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl px-6 py-3 text-sm font-semibold border transition-all duration-300 hover:bg-gray-50"
                  style={{ borderColor: "#E5E9EC", color: COLORS.text }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Upgrade;
