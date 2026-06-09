"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles, FileText, Target, Search, Mail, Linkedin,
  MessageSquare, Key, LayoutTemplate, Map, ArrowRight,
  CheckCircle, Users, Star, TrendingUp, Zap, Shield,
  ChevronRight, BookOpen,
} from "lucide-react";
import { AdBanner } from "@/components/ui/AdSlot";

const tools = [
  { href: "/resume-builder", label: "Resume Builder", desc: "Create stunning ATS-optimized resumes in minutes", icon: FileText, color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10", text: "text-blue-400" },
  { href: "/ats-checker", label: "ATS Score Checker", desc: "Check how well your resume passes ATS filters", icon: Target, color: "from-green-500 to-emerald-500", bg: "bg-green-500/10", text: "text-green-400" },
  { href: "/resume-analyzer", label: "Resume Analyzer", desc: "Get deep insights and improvement suggestions", icon: Search, color: "from-purple-500 to-violet-500", bg: "bg-purple-500/10", text: "text-purple-400" },
  { href: "/cover-letter", label: "Cover Letter Generator", desc: "AI-powered personalized cover letters instantly", icon: Mail, color: "from-pink-500 to-rose-500", bg: "bg-pink-500/10", text: "text-pink-400" },
  { href: "/linkedin-generator", label: "LinkedIn Generator", desc: "Optimize your LinkedIn profile to attract recruiters", icon: Linkedin, color: "from-cyan-500 to-blue-500", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  { href: "/interview-prep", label: "Interview Prep", desc: "Practice with AI-generated interview questions", icon: MessageSquare, color: "from-yellow-500 to-orange-500", bg: "bg-yellow-500/10", text: "text-yellow-400" },
  { href: "/keyword-matcher", label: "Keyword Matcher", desc: "Match your resume keywords to job descriptions", icon: Key, color: "from-orange-500 to-red-500", bg: "bg-orange-500/10", text: "text-orange-400" },
  { href: "/templates", label: "Template Gallery", desc: "Professional templates for every industry", icon: LayoutTemplate, color: "from-red-500 to-pink-500", bg: "bg-red-500/10", text: "text-red-400" },
    { href: "/career-roadmap", label: "Career Roadmap", desc: "Plan your career path with AI guidance", icon: Map, color: "from-indigo-500 to-purple-500", bg: "bg-indigo-500/10", text: "text-indigo-400" },
];

const stats = [
  { value: "2.4M+", label: "Resumes Created" },
  { value: "94%", label: "ATS Pass Rate" },
  { value: "3x", label: "More Interviews" },
  { value: "Free", label: "Forever" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Build a complete resume in under 5 minutes with smart autofill" },
  { icon: Shield, title: "ATS Optimized", desc: "Every resume is tested against 50+ ATS systems automatically" },
  { icon: Star, title: "Expert Templates", desc: "20+ premium templates designed by hiring managers" },
  { icon: TrendingUp, title: "Track Performance", desc: "See how your resume performs with real-time analytics" },
];

const marqueeItems = [
  "✦ ATS Score Checker", "✦ Cover Letter AI", "✦ Resume Builder", "✦ LinkedIn Optimizer",
  "✦ Interview Prep", "✦ Keyword Matcher", "✦ Career Roadmap", "✦ Template Gallery",
];

const testimonials = [
  { name: "Priya S.", role: "Software Engineer @ Google", text: "Got 3x more interview calls after optimizing my resume with ResumeAI. The ATS checker is a game changer!", stars: 5 },
  { name: "Marcus T.", role: "Product Manager @ Meta", text: "The cover letter generator saved me hours. Landed my dream job in 2 weeks!", stars: 5 },
  { name: "Aisha K.", role: "Data Scientist @ Amazon", text: "Best free resume tool I've used. The keyword matcher helped me tailor every application perfectly.", stars: 5 },
];
export default function HomePage() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Smarter", "Faster", "Better", "Fearlessly"];

  useEffect(() => {
    const t = setInterval(() => setActiveWord(w => (w + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="dot-grid absolute inset-0" />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Free Forever · No Signup Required
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6 animate-slide-up">
            Build Your Resume
            <br />
            <span className="relative">
              <span className="gradient-text">{words[activeWord]}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 rounded" />
            </span>
          </h1>

          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in animation-delay-200">
            The most powerful free AI resume suite. ATS optimization, cover letters,
            interview prep, and more — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-400">
            <Link href="/resume-builder" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-lg transition-all shadow-2xl shadow-brand-600/30 glow-purple">
              <Sparkles className="w-5 h-5" />
              Build My Resume — Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/ats-checker" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold text-lg transition-all">
              <Target className="w-5 h-5 text-green-400" />
              Check ATS Score
            </Link>
          </div>

             {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
            {["No credit card", "No signup", "Instant download", "GDPR safe"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="glass rounded-2xl p-5 text-center">
                <div className="text-3xl font-display font-bold gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[var(--border)] py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 text-sm font-semibold text-[var(--text-muted)]">{item}</span>
          ))}
        </div>
      </div>
        {/* Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdBanner />
      </div>

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" /> 9 Powerful Tools
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Everything You Need to
              <br />
              <span className="gradient-text">Land Your Dream Job</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
              Our complete career suite gives you every advantage — all free, no strings attached.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-brand-500/30 transition-all card-hover overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4`}>
                  <tool.icon className={`w-6 h-6 ${tool.text}`} />
                </div>
                 <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-brand-400 transition-colors">
                  {tool.label}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{tool.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:gap-2 transition-all">
                  Try Free <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why <span className="gradient-text">ResumeAI Pro</span>?</h2>
            <p className="text-[var(--text-muted)] text-lg">Built by engineers who've been through hundreds of interviews</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Users className="w-3 h-3" /> Loved by Job Seekers
            </div>
            <h2 className="text-4xl font-display font-bold">Real Results, Real People</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="glass rounded-2xl p-6 card-hover">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Blog CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-brand-400 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4">Career Tips & Insights</h2>
          <p className="text-[var(--text-muted)] mb-8">Expert advice on resumes, interviews, and career growth</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] transition-all font-semibold">
            Read the Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 border border-brand-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-purple-600/10" />
            <div className="relative">
              <Sparkles className="w-14 h-14 text-brand-400 mx-auto mb-6 animate-float-slow" />
              <h2 className="text-4xl font-display font-bold mb-4">
                Ready to Land Your<br /><span className="gradient-text">Dream Job?</span>
              </h2>
              <p className="text-[var(--text-muted)] text-lg mb-8">
                Join 2.4 million job seekers who built their winning resume with ResumeAI Pro.
              </p>
              <Link href="/resume-builder" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-lg transition-all shadow-2xl shadow-brand-600/30 glow-purple">
                <Sparkles className="w-5 h-5" />
                Start Building — It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <AdBanner />
      </div>
    </div>
  );
}
      
          
