import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#e8654a] disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#f0715a] to-[#e8544a] text-white shadow-md shadow-[#e8544a]/25 hover:shadow-lg hover:shadow-[#e8544a]/35 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "bg-white text-[#2c4a5e] border border-[#d9dee2] hover:border-[#2c4a5e]/40 hover:bg-[#2c4a5e]/[0.03]",
  ghost:
    "bg-transparent text-[#2c4a5e] hover:bg-[#2c4a5e]/[0.06]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[15px] px-6 py-2.5",
  lg: "text-base px-7 py-3.5",
};

const Button: React.FC<ButtonProps> = ({
                                         variant = "primary",
                                         size = "md",
                                         icon,
                                         iconPosition = "right",
                                         className = "",
                                         children,
                                         ...props
                                       }) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
    </button>
  );
};

export default Button;
