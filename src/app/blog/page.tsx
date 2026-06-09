import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import { AdBanner } from "@/components/ui/AdSlot";

export const metadata: Metadata = {
  title: "Blog — Career Tips, Resume Advice & Interview Guides",
  description: "Expert career advice, resume writing tips, ATS optimization guides, and interview preparation strategies to help you land your dream job.",
};

const posts = [
  {
    slug: "how-to-beat-ats-systems-2024",
    title: "How to Beat ATS Systems in 2025: The Complete Guide",
    excerpt: "Applicant Tracking Systems reject 75% of resumes before a human ever sees them. Here's exactly how to optimize your resume to pass every ATS filter.",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    category: "ATS Optimization",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    slug: "resume-keywords-guide",
    title: "The Ultimate Guide to Resume Keywords That Get You Hired",
    excerpt: "Keywords are the bridge between your resume and a recruiter's search. Learn how to identify, place, and optimize keywords for maximum impact.",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Keywords",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    slug: "cover-letter-mistakes-to-avoid",
    title: "10 Cover Letter Mistakes That Cost You the Interview",
    excerpt: "Most cover letters get deleted in 10 seconds. Avoid these common mistakes and write letters that actually get read — and responded to.",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    category: "Cover Letters",
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    slug: "linkedin-profile-optimization",
    title: "LinkedIn Profile Optimization: Get Found by Recruiters",
    excerpt: "Recruiters search LinkedIn 200+ million times daily. Here's how to optimize every section of your profile to appear in their searches.",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    category: "LinkedIn",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    slug: "behavioral-interview-questions",
    title: "50 Behavioral Interview Questions (With Sample Answers)",
    excerpt: "Master the STAR method and ace behavioral interviews with this comprehensive guide featuring 50 questions across every category.",
    date: "Nov 15, 2024",
    readTime: "12 min read",
    category: "Interview Prep",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    slug: "career-change-resume-guide",
    title: "Career Change Resume: How to Pivot Without Starting Over",
    excerpt: "Changing careers doesn't mean starting from zero. Learn how to reframe your existing experience to break into a new industry.",
    date: "Nov 8, 2024",
    readTime: "9 min read",
    category: "Career Change",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <BookOpen className="w-3 h-3" /> Career Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Career Tips & <span className="gradient-text">Job Search Guides</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Expert advice on resumes, interviews, LinkedIn, and career growth — updated weekly.
          </p>
        </div>

        <AdBanner className="mb-8" />

        {/* Featured Post */}
        <Link href={`/blog/${featured.slug}`} className="block mb-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 card-hover group">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${featured.color}`}>{featured.category}</span>
              <span className="text-xs text-[var(--text-muted)] px-2 py-1 rounded-full bg-brand-500/10 text-brand-400 font-semibold">Featured</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 group-hover:text-brand-400 transition-colors">
              {featured.title}
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-5 text-lg">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                <span>{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-brand-400 group-hover:gap-2 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 h-full card-hover">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${post.color}`}>
                    <Tag className="w-3 h-3 inline mr-1" />{post.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-brand-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

