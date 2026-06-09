import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { AdBanner } from "@/components/ui/AdSlot";

const articles: Record<string, { title: string; date: string; readTime: string; category: string; content: string }> = {
  "how-to-beat-ats-systems-2024": {
    title: "How to Beat ATS Systems in 2025: The Complete Guide",
    date: "December 10, 2024",
    readTime: "8 min read",
    category: "ATS Optimization",
    content: `## What is an Applicant Tracking System (ATS)?

An Applicant Tracking System is software used by 99% of Fortune 500 companies and the majority of mid-size employers to manage job applications. When you submit your resume online, it almost certainly goes through an ATS before a human ever sees it.

The ATS parses your resume, scores it against the job description, and ranks it among other candidates. Resumes that don't meet the threshold are automatically rejected — often without any human review.

## Why 75% of Resumes Never Get Read

The harsh reality: three out of four resumes are eliminated by ATS before reaching a hiring manager. This happens for several reasons:

- **Wrong file format**: Some ATS systems struggle with PDFs containing graphics or tables
- **Missing keywords**: If your resume doesn't contain terms from the job description, it scores low
- **Unusual formatting**: Two-column layouts, headers, and footers can confuse parsers
- **Non-standard section names**: "My Career History" instead of "Work Experience"

## 7 Proven Strategies to Beat ATS

### 1. Mirror the Job Description Language

This is the single most important ATS optimization strategy. Read the job posting carefully and use the exact same language. If the job says "cross-functional collaboration," use those exact words — not "worked with different teams."

### 2. Use Standard Section Headers

Stick to conventional section names:
- Work Experience (not "Career History" or "Professional Journey")
- Education (not "Academic Background")
- Skills (not "Core Competencies" or "Areas of Expertise")

### 3. Submit in the Right Format

Plain .docx files typically parse best. PDF is usually fine unless the PDF was created from a scanned image. Avoid resumes built in Canva or other design tools that produce image-based PDFs.

### 4. Avoid Tables, Graphics, and Columns

Multi-column layouts look great to humans but break ATS parsers. The text gets read in the wrong order or skipped entirely. Use a simple single-column layout.

### 5. Include Your Contact Information as Plain Text

Don't put your name and contact info in the document header — many ATS systems skip headers entirely. Place contact information in the main body of the document.

### 6. Use Both Spelled-Out and Abbreviated Terms

If the job mentions "Search Engine Optimization," use "Search Engine Optimization (SEO)" at least once so the ATS matches both versions.

### 7. Quantify Your Achievements

ATS systems and human reviewers alike respond to numbers. "Increased sales by 34%" is stronger than "grew the sales team." Numbers stand out and signal impact.

## The ATS Score: What Does It Mean?

Most ATS systems score resumes from 0-100 based on keyword density, required skills match, education requirements, and years of experience. Aim for a score above 80% for competitive positions.

Use our free ATS Score Checker to instantly see your score against any job description.

## Quick ATS Checklist

- [ ] Used standard section names
- [ ] Included keywords from the job posting
- [ ] Single-column layout
- [ ] Plain text contact info (not in header)
- [ ] No graphics, charts, or images
- [ ] Submitted as .docx or plain-text PDF
- [ ] Quantified at least 3-5 achievements
- [ ] Listed both full names and abbreviations of key terms

Following these strategies can dramatically improve your ATS pass rate and get your resume in front of more human eyes.`,
  },
  "resume-keywords-guide": {
    title: "The Ultimate Guide to Resume Keywords That Get You Hired",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Keywords",
    content: `## Why Keywords Are the Foundation of Your Resume

In today's job market, your resume has two audiences: the ATS algorithm and the human recruiter. Both are looking for keywords — specific terms that signal you're qualified for the role.

The right keywords transform a generic resume into a targeted job application. The wrong approach (stuffing keywords randomly) can backfire with both ATS and human reviewers.

## Types of Resume Keywords

### Hard Skills Keywords
Technical, measurable abilities: Python, SQL, AWS, Salesforce, Google Analytics, PMP certification, financial modeling, etc.

### Soft Skills Keywords
Interpersonal and professional abilities: leadership, cross-functional collaboration, stakeholder management, agile methodology, strategic thinking.

### Industry Keywords
Terms specific to your field: SaaS, B2B, fintech, HIPAA compliance, microservices, CI/CD, etc.

### Action Keywords
Power verbs that demonstrate impact: architected, spearheaded, orchestrated, transformed, scaled, optimized.

## How to Find the Right Keywords

### Step 1: Analyze 5-10 Job Postings
Read multiple job descriptions for roles you're targeting. Note which terms appear repeatedly — those are must-have keywords.

### Step 2: Prioritize Required vs. Preferred
"Required: 5+ years experience with React" is a must-include keyword. "Nice to have: TypeScript experience" is lower priority.

### Step 3: Use Exact Phrasing
"Project management" and "managing projects" aren't the same to an ATS. Use the exact phrase from the job description.

### Step 4: Check LinkedIn Job Descriptions
LinkedIn's job description tool shows you which skills are commonly requested. Filter by your target role to see the most in-demand keywords.

## Where to Place Keywords

**Professional Summary**: Include 3-4 core keywords naturally in your opening paragraph.

**Skills Section**: Create a dedicated skills section with keyword-rich terms organized by category.

**Work Experience**: Weave keywords into your bullet points contextually — not as a list dump.

**Job Titles**: If your actual title differs from the industry standard, consider including the standard title in parentheses.

## The Keyword Density Sweet Spot

Don't stuff keywords artificially. A keyword should appear 1-3 times naturally throughout your resume. For highly important skills, appearing in both the summary and skills section is appropriate.

Use our Keyword Matcher tool to see exactly how your keyword density compares to the job description you're targeting.`,
  },
};

// Fill remaining slugs with placeholder content
const slugs = ["cover-letter-mistakes-to-avoid", "linkedin-profile-optimization", "behavioral-interview-questions", "career-change-resume-guide"];
slugs.forEach(slug => {
  if (!articles[slug]) {
    articles[slug] = {
      title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      date: "November 2024",
      readTime: "6 min read",
      category: "Career Advice",
      content: `This comprehensive guide covers everything you need to know about this important career topic. Check back soon for the full article, or explore our other guides and free tools in the meantime.`,
    };
  }
});

export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const lines = article.content.split("\n");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Tag className="w-3 h-3 inline mr-1" />{article.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
          </div>
        </div>

        <AdBanner className="mb-8" />

        <div className="prose-custom">
          {lines.map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-display font-bold mt-8 mb-4 text-[var(--text-primary)]">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-display font-semibold mt-6 mb-3 text-[var(--text-primary)]">{line.slice(4)}</h3>;
            if (line.startsWith("- [ ] ")) return <li key={i} className="flex items-center gap-2 text-[var(--text-secondary)] my-1"><input type="checkbox" readOnly /><span>{line.slice(6)}</span></li>;
            if (line.startsWith("- ")) return <li key={i} className="ml-4 text-[var(--text-secondary)] my-1 list-disc">{line.slice(2)}</li>;
            if (line.startsWith("**") && line.endsWith("**")) {
              const parts = line.split("**").filter(Boolean);
              return <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-4">{parts.map((p, j) => j % 2 === 0 ? p : <strong key={j} className="text-[var(--text-primary)] font-semibold">{p}</strong>)}</p>;
            }
            if (line.trim() === "") return <div key={i} className="my-3" />;
            return <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-4">{line}</p>;
          })}
        </div>

        <AdBanner className="mt-12" />
      </div>
    </div>
  );
}

