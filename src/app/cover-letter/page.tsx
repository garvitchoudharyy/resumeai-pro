"use client";
import { useState } from "react";
import { Mail, Copy, Download, Sparkles, RefreshCw } from "lucide-react";
import { Button, Card, Input, Textarea, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";
import toast from "react-hot-toast";

const tones = ["Professional", "Enthusiastic", "Concise", "Creative"];

function generateCoverLetter(name: string, company: string, role: string, skills: string, experience: string, tone: string): string {
  const toneIntro: Record<string, string> = {
    Professional: `I am writing to express my strong interest in the ${role} position at ${company}.`,
    Enthusiastic: `I was thrilled to discover the ${role} opening at ${company} — a company whose work I deeply admire!`,
    Concise: `I'm applying for the ${role} role at ${company}. Here's why I'm the right fit:`,
    Creative: `What if your next ${role} was someone who brings both technical excellence and creative thinking? That's exactly what I offer ${company}.`,
  };

  return `${name ? `Dear Hiring Manager at ${company},` : "Dear Hiring Manager,"}

${toneIntro[tone] || toneIntro["Professional"]}

With ${experience || "several years"} of hands-on experience, I have developed strong expertise in ${skills || "relevant technologies and methodologies"}. Throughout my career, I have consistently delivered results that align with organizational goals and exceeded expectations.

At my previous role, I led initiatives that improved team productivity and drove measurable outcomes. I am particularly proud of my ability to collaborate cross-functionally, communicate technical concepts to non-technical stakeholders, and adapt quickly to evolving priorities.

What excites me most about ${company} is your commitment to innovation and impact. I believe my background in ${skills || "this domain"} positions me to contribute meaningfully from day one — whether it's optimizing existing processes, building new solutions, or mentoring teammates.

I would welcome the opportunity to discuss how my experience aligns with your team's needs. Thank you for your time and consideration. I look forward to hearing from you.

Warm regards,
${name || "Your Name"}`;
}

export default function CoverLetterPage() {
  const [form, setForm] = useState({ name: "", company: "", role: "", skills: "", experience: "" });
  const [tone, setTone] = useState("Professional");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));
  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLetter(generateCoverLetter(form.name, form.company, form.role, form.skills, form.experience, tone));
      setLoading(false);
    }, 900);
  };

  const copy = () => {
    navigator.clipboard.writeText(letter);
    toast.success("Copied to clipboard!");
  };

  const download = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${form.company || "draft"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail className="w-3 h-3" /> Cover Letter Generator
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Write a <span className="gradient-text">Winning Cover Letter</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Fill in the details and get a personalized, professional cover letter in seconds.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <h2 className="font-display font-semibold text-lg mb-6">Your Details</h2>
            <div className="space-y-4">
              <Input label="Your Full Name" placeholder="Jane Doe" value={form.name} onChange={e => update("name", e.target.value)} />
              <Input label="Company Name *" placeholder="Google" value={form.company} onChange={e => update("company", e.target.value)} />
              <Input label="Role / Position *" placeholder="Senior Product Manager" value={form.role} onChange={e => update("role", e.target.value)} />
              <Input label="Years of Experience" placeholder="5 years" value={form.experience} onChange={e => update("experience", e.target.value)} />
              <Textarea
                label="Key Skills (comma separated)"
                placeholder="React, Node.js, Leadership, Agile, System Design"
                rows={3}
                value={form.skills}
                onChange={e => update("skills", e.target.value)}
              />

              {/* Tone Selector */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${
                        tone === t
                          ? "border-brand-500 bg-brand-500/10 text-brand-400"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="gradient" size="lg" className="w-full" onClick={generate} loading={loading} disabled={!form.company || !form.role}>
                <Sparkles className="w-4 h-4" /> Generate Cover Letter
              </Button>
            </div>
          </Card>

          {/* Output */}
          <div className="space-y-4">
            {letter ? (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-semibold">Your Cover Letter</h2>
                    <Badge color="green">Ready</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={generate} loading={loading}>
                      <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                    </Button>
                    <Button variant="secondary" size="sm" onClick={copy}>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                    <Button variant="secondary" size="sm" onClick={download}>
                      <Download className="w-3.5 h-3.5" /> .txt
                    </Button>
                  </div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded-xl p-5 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line font-body border border-[var(--border)]" style={{ fontFamily: "Georgia, serif" }}>
                  {letter}
                </div>
              </Card>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center py-24 text-center">
                <Mail className="w-16 h-16 text-[var(--text-muted)] opacity-20 mb-4" />
                <p className="text-[var(--text-muted)] mb-2">Fill in your details and click generate</p>
                <p className="text-xs text-[var(--text-muted)]">Your cover letter will appear here</p>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <h3 className="font-semibold text-sm mb-3 text-[var(--text-muted)] uppercase tracking-wide">Cover Letter Tips</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {[
                  "Keep it to one page (3-4 paragraphs)",
                  "Customize for each application",
                  "Mirror keywords from the job description",
                  "Open with a strong hook, not 'I am applying for...'",
                  "Close with a clear call-to-action",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
                
