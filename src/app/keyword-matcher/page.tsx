"use client";
import { useState } from "react";
import { Key, CheckCircle, XCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Button, Card, Textarea, ProgressBar } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";

interface MatchResult {
  score: number;
  matched: { word: string; count: number }[];
  missing: string[];
  total: number;
}

function matchKeywords(resume: string, job: string): MatchResult {
  const stopWords = new Set(["the","a","an","in","on","at","to","for","of","and","or","with","that","this","is","are","was","were","will","be","have","has","do","does","we","our","you","your","their","they"]);
  const extract = (text: string) =>
    [...new Set(text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w)))];

  const jobKeywords = extract(job);
  const resumeWords = resume.toLowerCase();

  const matched: { word: string; count: number }[] = [];
  const missing: string[] = [];

  jobKeywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    const matches = resume.match(regex);
    if (matches) {
      matched.push({ word: kw, count: matches.length });
    } else {
      missing.push(kw);
    }
  });

  const score = Math.round((matched.length / Math.max(jobKeywords.length, 1)) * 100);
  return { score, matched, missing: missing.slice(0, 20), total: jobKeywords.length };
}

export default function KeywordMatcherPage() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!resume.trim() || !job.trim()) return;
    setLoading(true);
    setTimeout(() => { setResult(matchKeywords(resume, job)); setLoading(false); }, 700);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Key className="w-3 h-3" /> Keyword Matcher
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Match Your Resume to <span className="gradient-text">Any Job</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            See exactly which keywords are matching — and which are missing — compared to the job description.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <h2 className="font-display font-semibold mb-4">Your Resume</h2>
            <Textarea placeholder="Paste your resume text..." rows={14} value={resume} onChange={e => setResume(e.target.value)} />
          </Card>
          <Card>
            <h2 className="font-display font-semibold mb-4">Job Description</h2>
            <Textarea placeholder="Paste the job description..." rows={14} value={job} onChange={e => setJob(e.target.value)} />
          </Card>
        </div>
        <Button variant="gradient" size="lg" className="w-full mb-8" onClick={analyze} loading={loading} disabled={!resume.trim() || !job.trim()}>
          <TrendingUp className="w-5 h-5" /> Analyze Keyword Match
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {/* Score */}
            <Card className="text-center">
              <h3 className="font-semibold mb-3">Match Score</h3>
              <div className="text-5xl font-display font-bold gradient-text mb-1">{result.score}%</div>
              <p className="text-xs text-[var(--text-muted)] mb-4">{result.matched.length} / {result.total} keywords matched</p>
              <ProgressBar value={result.score} color={result.score >= 70 ? "#34d399" : result.score >= 50 ? "#60a5fa" : "#f87171"} />
            </Card>

            {/* Matched */}
            <Card className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">Matched Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {result.matched.sort((a, b) => b.count - a.count).map(kw => (
                  <span key={kw.word} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                    {kw.word}
                    <span className="bg-green-500/20 rounded px-1">{kw.count}×</span>
                  </span>
                ))}
                {result.matched.length === 0 && <p className="text-sm text-[var(--text-muted)]">No matches found — try tailoring your resume</p>}
              </div>
            </Card>
          </div>
        )}

        {result && result.missing.length > 0 && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold">Missing Keywords — Add These to Your Resume</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {result.missing.map(kw => (
                <span key={kw} className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">{kw}</span>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-brand-400" /> How to add these keywords naturally
              </h4>
              <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>• Incorporate them into your professional summary</li>
                <li>• Add a dedicated Skills section with the missing terms</li>
                <li>• Weave them into your work experience bullet points</li>
                <li>• Only include keywords that genuinely reflect your skills</li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
