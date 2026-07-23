import { cn } from "@/utils/utils";
import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-white hover:opacity-90 shadow-lg shadow-[rgba(124,92,255,.25)]",

  secondary:
    "border border-[var(--border)] bg-white/5 text-[var(--text)] hover:bg-white/10",

  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",

  md: "h-11 px-6 text-sm",

  lg: "h-12 px-8 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}