"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-md hover:shadow-brand-500/25",
      secondary: "bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)]",
      ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
      danger: "bg-red-600 hover:bg-red-500 text-white",
      gradient: "bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-600/25",
    };
    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2.5",
      lg: "text-base px-6 py-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ className, children, hover = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6",
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────
type BadgeColor = "default" | "green" | "blue" | "yellow" | "red" | "purple" | "cyan";

export function Badge({ children, color = "default", className }: { children: React.ReactNode; color?: BadgeColor; className?: string }) {
  const colors: Record<BadgeColor, string> = {
    default: "bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
    green: "bg-green-500/10 text-green-400 border border-green-500/20",
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    red: "bg-red-500/10 text-red-400 border border-red-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colors[color], className)}>
      {children}
    </span>
  );
}

// ─── Score Ring ──────────────────────────────────────────────────────────────
export function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? "#34d399" : score >= 60 ? "#60a5fa" : score >= 40 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-secondary)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display" style={{ color }}>{score}</span>
        <span className="text-xs text-[var(--text-muted)]">/ 100</span>
      </div>
    </div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
export function ProgressBar({ value, label, color = "#6366f1" }: { value: number; label?: string; color?: string }) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[var(--text-secondary)]">{label}</span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
export function SectionHeader({ tag, title, subtitle }: { tag?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      {tag && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {tag}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]",
          "text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/50",
          "transition-all",
          error && "border-red-500/50 focus:ring-red-500/30",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────
export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }>(
  ({ label, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]",
          "text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/50",
          "transition-all resize-none",
          className
        )}
        {...props}
      />
    </div>
  )
);
Textarea.displayName = "Textarea";

