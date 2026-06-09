import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-display font-bold gradient-text mb-4">404</div>
        <h1 className="text-3xl font-display font-bold mb-3">Page Not Found</h1>
        <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/resume-builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] font-semibold transition-all"
          >
            <Search className="w-4 h-4" /> Build Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

