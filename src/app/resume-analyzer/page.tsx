"use client";
import { useState } from "react";
import { Search, TrendingUp, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react";
import { Button, Card, Textarea, ProgressBar, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";

interface AnalysisResult {
  overall: number;
  categories: { name: string; score: number; color: string; tips: string[] }[];
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  actionVerbs: string[];
  weakWords: string[];
  quantified: number;
}

const ACTION_VERBS = ["led","built","created","designed","developed","managed","increased","reduced","improved","launched","delivered","optimized","implemented","streamlined","achieved","generated","drove","collaborated","mentored","architected","scaled","transformed","automated"];
const WEAK_WORDS = ["responsible for","helped","assisted","worked on","involved in","participated in","duties included","tasked with"];

function analyzeResume(text: string): AnalysisResult {
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const lower = text.toLowerCase();

  const foundActionVerbs = ACTION_VERBS.filter(v => lower.includes(v));
  const foundWeakWords = WEAK_WORDS.filter(w => lower.includes(w));
  const numbers = (text.match(/\d+[%$xX]?|\$\d+/g) || []).length;

  const hasEmail = /\S+@\S+/.test(text);
  const hasPhone = /\d{3}[\-\.\s]\d{3}/.test(text);
  const hasLinkedIn = /linkedin/i.test(text);

  const completeness = Math.min(100, Math.round(
    (hasEmail ? 15 : 0) + (hasPhone ? 15 : 0) + (hasLinkedIn ? 10 : 0) +
    (words.length > 200 ? 20 : words.length / 10) +
    (text.includes("Experience") || text.includes("EXPERIENCE") ? 20 : 0) +
    (text.includes("Education") || text.includes("EDUCATION") ? 20 : 0)
  ));

  const impact = Math.min(100, Math.round(
    foundActionVerbs.length * 8 + numbers * 5 - foundWeakWords.length * 10 + 30
  ));

  const readability = Math.min(100, Math.round(
    100 - Math.abs((words.length / Math.max(sentences.length, 1)) - 15) * 3
  ));

  const formatting = Math.min(100, Math.round(
    (text.includes("•") || text.includes("-") ? 30 : 0) +
    (words.length >= 300 && words.length <= 700 ? 30 : 15) +
    (sentences.length > 5 ? 20 : 10) + 20
  ));

  const overall = Math.round((completeness + impact + readability + formatting) / 4);

  return {
    overall,
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence: Math.round(words.length / Math.max(sentences.length, 1)),
    actionVerbs: foundActionVerbs,
    weakWords: foundWeakWords,
    quantified: numbers,
    categories: [
      { name: "Completeness", score: completeness, color: "#60a5fa", tips: ["Add email and phone", "Include LinkedIn URL", "Write a professional summary"] },
      { name: "Impact & Strength", score: impact, color: "#34d399", tips: ["Use strong action verbs", "Quantify achievements with numbers", "Remove weak phrases like 'responsible for'"] },
      { name: "Readability", score: readability, color: "#a78bfa", tips: ["Keep sentences concise (10-20 words)", "Use bullet points", "Avoid jargon"] },
      { name: "Formatting", score: formatting, color: "#f472b6", tips: ["Use bullet points consistently", "Keep to 1-2 pages", "Use standard section headers"] },
    ],
  };
}

export default function ResumeAnalyzerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => { setResult(analyzeResume(text)); setLoading(false); }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Search className="w-3 h-3" /> Resume Analyzer
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Deep-Dive <span className="gradient-text">Resume Analysis</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Get a detailed breakdown of your resume&apos;s strengths and weaknesses across 4 key dimensions.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card>
              <h2 className="font-display font-semibold mb-4">Paste Your Resume</h2>
              <Textarea
                placeholder="Paste your full resume text here..."
                rows={16}
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[var(--text-muted)]">{text.split(/\s+/).filter(Boolean).length} words</span>
                <Button variant="gradient" onClick={analyze} loading={loading} disabled={!text.trim()}>
                  <BarChart2 className="w-4 h-4" /> Analyze Resume
                </Button>
              </div>
            </Card>

            {result && (
              <Card>
                <h3 className="font-semibold mb-4">Document Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Words", value: result.wordCount },
                    { label: "Sentences", value: result.sentenceCount },
                    { label: "Numbers/Metrics", value: result.quantified },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-[var(--bg-secondary)]">
                      <div className="text-2xl font-display font-bold gradient-text">{s.value}</div>
                      <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                {/* Overall Score */}
                <Card className="text-center">
                  <h3 className="font-display font-semibold mb-4">Overall Score</h3>
                  <div className="text-6xl font-display font-bold gradient-text mb-2">{result.overall}</div>
                  <div className="text-[var(--text-muted)] mb-4">out of 100</div>
                  <Badge color={result.overall >= 75 ? "green" : result.overall >= 55 ? "blue" : "yellow"} className="text-sm">
                    {result.overall >= 75 ? "Strong Resume" : result.overall >= 55 ? "Good Resume" : "Needs Improvement"}
                  </Badge>
                </Card>

                {/* Category Scores */}
                <Card>
                  <h3 className="font-semibold mb-5">Score Breakdown</h3>
                  <div className="space-y-4">
                    {result.categories.map(cat => (
                      <ProgressBar key={cat.name} label={cat.name} value={cat.score} color={cat.color} />
                    ))}
                  </div>
                </Card>

                  {/* Action Verbs */}
                {result.actionVerbs.length > 0 && (
                  <Card>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <h3 className="font-semibold text-sm">Strong Action Verbs Found</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.actionVerbs.map(v => (
                        <span key={v} className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium capitalize">{v}</span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Weak Words */}
                {result.weakWords.length > 0 && (
                  <Card>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <h3 className="font-semibold text-sm">Weak Phrases to Replace</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.weakWords.map(v => (
                        <span key={v} className="px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-medium">{v}</span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Tips */}
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-brand-400" />
                    <h3 className="font-semibold text-sm">Improvement Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.categories.flatMap(c => c.tips).slice(0, 6).map((tip, i) => (
                      <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center py-24 text-center">
                <Search className="w-16 h-16 text-[var(--text-muted)] opacity-20 mb-4" />
                <p className="text-[var(--text-muted)]">Paste your resume and click Analyze to see your detailed report</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
                
  
