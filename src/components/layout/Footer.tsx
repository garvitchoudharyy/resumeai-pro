import Link from "next/link";
import { Sparkles, Heart, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Tools: [
    { href: "/resume-builder", label: "Resume Builder" },
    { href: "/ats-checker", label: "ATS Checker" },
    { href: "/resume-analyzer", label: "Resume Analyzer" },
    { href: "/cover-letter", label: "Cover Letter" },
    { href: "/linkedin-generator", label: "LinkedIn Generator" },
  ],
  Resources: [
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/keyword-matcher", label: "Keyword Matcher" },
    { href: "/templates", label: "Templates" },
    { href: "/career-roadmap", label: "Career Roadmap" },
    { href: "/blog", label: "Blog" },
  ],
  Company: [
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Resume<span className="gradient-text">AI</span> Pro
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-xs">
              The most powerful free AI resume builder. Land your dream job with
              ATS-optimized resumes, cover letters, and interview prep.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border)] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border)] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border)] flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} ResumeAI Pro. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />{" "}
            by{" "}
            <span className="font-semibold gradient-text">Garvit Choudhary</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

