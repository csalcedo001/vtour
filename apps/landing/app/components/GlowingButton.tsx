import React, { ButtonHTMLAttributes } from "react";
interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactElement;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  isLoading,
  icon,
  ...rest
}) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-[#61C8F1] to-[#A8F7A8] opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <button
        className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-black px-7 py-4 leading-none"
        {...rest}
      >
        <span className="flex items-center space-x-5">
          {icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-[#61C8F1] ${
                isLoading ? "relative z-10 animate-spin" : "animate-tiltstrong"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          )}
          <span className="text-gray-100 transition duration-200 group-hover:text-[#61C8F1]">
            {children}
          </span>
        </span>
      </button>
    </div>
  );
};

export default GlowingButton;
