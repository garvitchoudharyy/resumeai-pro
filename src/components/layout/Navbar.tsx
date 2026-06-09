"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  FileText,
  Target,
  Search,
  Mail,
  Linkedin,
  MessageSquare,
  Key,
  LayoutTemplate,
  Map,
  ChevronDown,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  { href: "/resume-builder", label: "Resume Builder", icon: FileText, color: "text-blue-400" },
  { href: "/ats-checker", label: "ATS Score Checker", icon: Target, color: "text-green-400" },
  { href: "/resume-analyzer", label: "Resume Analyzer", icon: Search, color: "text-purple-400" },
  { href: "/cover-letter", label: "Cover Letter", icon: Mail, color: "text-pink-400" },
  { href: "/linkedin-generator", label: "LinkedIn Generator", icon: Linkedin, color: "text-cyan-400" },
  { href: "/interview-prep", label: "Interview Prep", icon: MessageSquare, color: "text-yellow-400" },
  { href: "/keyword-matcher", label: "Keyword Matcher", icon: Key, color: "text-orange-400" },
  { href: "/templates", label: "Templates", icon: LayoutTemplate, color: "text-red-400" },
  { href: "/career-roadmap", label: "Career Roadmap", icon: Map, color: "text-indigo-400" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center glow-purple">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-cyan rounded-full animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Resume<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]"
              )}>
                <Zap className="w-4 h-4" />
                Tools
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", toolsOpen && "rotate-180")} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 pt-2 w-[520px]">
                  <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/20 border border-[var(--glass-border)]">
                    <div className="grid grid-cols-3 gap-1">
                      {tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all",
                            "hover:bg-[var(--bg-secondary)]",
                            pathname === tool.href && "bg-[var(--bg-secondary)]"
                          )}
                        >
                          <tool.icon className={cn("w-4 h-4 flex-shrink-0", tool.color)} />
                          <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs font-medium">
                            {tool.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]"
            )}>
              Blog
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[var(--text-secondary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
              </button>
            )}

            <Link
              href="/resume-builder"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all glow-purple"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Build Resume
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--border)] mt-2 pt-4">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <tool.icon className={cn("w-4 h-4", tool.color)} />
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{tool.label}</span>
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors col-span-2"
              >
                <span className="text-sm font-medium text-[var(--text-secondary)]">Blog</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

