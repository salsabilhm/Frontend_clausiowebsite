// components/Pagebanner.tsx
import React from "react";
import { COLORS } from "../layouts/AuthLayout";

interface PageBannerProps {
  badgeIcon?: React.ReactNode;
  badgeLabel?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageBanner: React.FC<PageBannerProps> = ({
                                                 badgeIcon,
                                                 badgeLabel,
                                                 title,
                                                 subtitle,
                                                 action,
                                               }) => {
  return (
    <div className="mb-6">
      {badgeLabel && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ background: `${COLORS.primary}12`, color: COLORS.primary }}
        >
          {badgeIcon}
          {badgeLabel}
        </div>
      )}

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm mt-1 max-w-2xl" style={{ color: COLORS.textMuted }}>
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
};

export default PageBanner;
