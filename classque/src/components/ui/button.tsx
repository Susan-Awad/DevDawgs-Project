import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-[#6A3636] text-white hover:bg-[#5A3636]",
    ghost: "bg-white/80 text-gray-500 hover:text-red-500"
  };
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    icon: "h-8 w-8"
  };

  return (
    <button
    className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    {...props}
    >
      {children}
    </button>
  );
};
