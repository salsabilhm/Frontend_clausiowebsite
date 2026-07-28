import React from "react";

interface CardProps {
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  iconBg?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
                                     icon,
                                     eyebrow,
                                     title,
                                     description,
                                     iconBg = "bg-[#faf1ef]",
                                     className = "",
                                   }) => {
  return (
    <div
      className={`group bg-white rounded-2xl border border-[#e8ebed] p-8 transition-all duration-300 hover:border-[#2c4a5e]/20 hover:shadow-xl hover:shadow-[#2c4a5e]/5 hover:-translate-y-1 ${className}`}
    >
      {icon && (
        <div
          className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-6 text-[#e8544a]`}
        >
          {icon}
        </div>
      )}
      {eyebrow && (
        <span className="text-xs font-semibold tracking-wide text-[#d9a74a]">
          {eyebrow}
        </span>
      )}
      <h3 className="font-serif text-xl text-[#1c2b35] mt-1 mb-2">{title}</h3>
      <p className="text-[#5b6a73] text-[15px] leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;
