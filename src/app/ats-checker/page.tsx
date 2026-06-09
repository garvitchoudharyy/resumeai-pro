"use client";
import { useState } from "react";
import { Target, CheckCircle, XCircle, AlertCircle, Zap, ArrowRight } from "lucide-react";
import { Button, Card, Textarea, ScoreRing, ProgressBar, Badge } from "@/components/ui/index";
import { calculateATSScore } from "@/lib/utils";
import { AdBanner, AdSidebar } from "@/components/ui/AdSlot";
import type { Metadata } from "next";

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateATSScore> | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!resumeText.trim() || !jobDesc.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(calculateATSScore(resumeText, jobDesc));
      setLoading(false);
    }, 1200);
  };

  const scoreLabel = !result ? "" : result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good" : result.score >= 40 ? "Average" : "Needs Work";
  const scoreColor = !result ? "default" : result.score >= 80 ? "green" : result.score >= 60 ? "blue" : result.score >= 40 ? "yellow" : "red";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Target className="w-3 h-3" /> ATS Score Checker
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Will Your Resume <span className="gradient-text">Pass the ATS?</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Paste your resume and job description below. Get an instant ATS compatibility score with actionable fixes.
          </p>
        </div>
         <AdBanner className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-400">1</span>
                </div>
                <h2 className="font-display font-semibold">Paste Your Resume Text</h2>
              </div>
              <Textarea
                placeholder="Paste your entire resume text here...&#10;&#10;Include your contact info, work experience, education, skills, etc."
                rows={10}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
              />
              <p className="text-xs text-[var(--text-muted)] mt-2">{resumeText.split(/\s+/).filter(Boolean).length} words</p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-400">2</span>
                </div>
                <h2 className="font-display font-semibold">Paste Job Description</h2>
              </div>
              <Textarea
                placeholder="Paste the full job description here...&#10;&#10;Include responsibilities, requirements, qualifications, etc."
                rows={10}
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
              />
            </Card>

            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={analyze}
              loading={loading}
              disabled={!resumeText.trim() || !jobDesc.trim()}
            >
              <Zap className="w-5 h-5" />
              Analyze ATS Score
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          {/* Results / Sidebar */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Score Card */}
                <Card className="text-center">
                  <h3 className="font-display font-semibold mb-6">Your ATS Score</h3>
                  <div className="flex justify-center mb-4">
                    <ScoreRing score={result.score} size={140} />
                  </div>
                  <Badge color={scoreColor as "green" | "blue" | "yellow" | "red"} className="text-sm px-4 py-1.5 mb-4">
                    {scoreLabel}
                  </Badge>
                  <p className="text-sm text-[var(--text-muted)]">
                    {result.score >= 80
                      ? "Great! Your resume is well-optimized for this role."
                      : result.score >= 60
                      ? "Good start. A few tweaks will boost your chances."
                      : "Your resume needs optimization to pass ATS filters."}
                  </p>
                </Card>

                {/* Matched Keywords */}
                <Card>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold">Matched Keywords ({result.matched.length})</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matched.map(kw => (
                      <span key={kw} className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                        {kw}
                      </span>
                    ))}
                    {result.matched.length === 0 && <p className="text-sm text-[var(--text-muted)]">No keyword matches found</p>}
                  </div>
                </Card>

                {/* Missing Keywords */}
                <Card>
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <h3 className="font-semibold">Missing Keywords ({result.missing.length})</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map(kw => (
                      <span key={kw} className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                        {kw}
                      </span>
                    ))}
                    {result.missing.length === 0 && <p className="text-sm text-[var(--text-muted)]">All key terms found!</p>}
                  </div>
                </Card>
                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <Card>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-semibold">Suggestions</h3>
                    </div>
                    <ul className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-brand-400 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </>
            ) : (
              <>
                <Card className="text-center py-12">
                  <Target className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4 opacity-30" />
                  <p className="text-[var(--text-muted)] font-medium">Paste your resume and job description, then click Analyze</p>
                </Card>
                {/* Tips */}
                <Card>
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-[var(--text-muted)]">ATS Tips</h3>
                  <ul className="space-y-3">
                    {[
                      "Use standard section headings like Experience, Education, Skills",
                      "Include exact keywords from the job posting",
                      "Avoid tables, graphics, and unusual fonts",
                      "Use .docx or plain text — not PDFs with images",
                      "Spell out abbreviations at least once",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            )}
            <AdSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
        
