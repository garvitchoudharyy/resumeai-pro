"use client";
import { useState } from "react";
import { Linkedin, Copy, Sparkles, User, Briefcase, Star } from "lucide-react";
import { Button, Card, Input, Textarea, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";
import toast from "react-hot-toast";

function generateHeadline(role: string, skills: string, industry: string): string {
  const skillList = skills.split(",").map(s => s.trim()).filter(Boolean).slice(0, 3);
  return `${role} | ${skillList.join(" · ")} ${industry ? `| ${industry}` : ""}`.trim();
}

function generateAbout(name: string, role: string, experience: string, skills: string, goal: string): string {
  const skillList = skills.split(",").map(s => s.trim()).filter(Boolean);
  return `👋 Hi, I'm ${name || "a passionate professional"} — a ${role} with ${experience || "several years"} of experience building impactful solutions.

🔧 What I bring to the table:
${skillList.slice(0, 5).map(s => `• ${s}`).join("\n") || "• Deep technical expertise\n• Strong problem-solving skills\n• Cross-functional collaboration"}

🚀 I'm passionate about ${goal || "creating technology that makes a real difference"}. I thrive in fast-paced environments where I can wear multiple hats and drive meaningful outcomes.

💡 Currently open to ${role} roles where I can leverage my expertise to solve complex challenges and mentor the next generation of talent.

📫 Let's connect — I'm always open to great conversations and opportunities!`;
}

const sections = [
  { id: "headline", label: "Headline", icon: Star },
  { id: "about", label: "About / Summary", icon: User },
  { id: "experience", label: "Experience Bullets", icon: Briefcase },
];

export default function LinkedInGeneratorPage() {
  const [form, setForm] = useState({ name: "", role: "", skills: "", experience: "", industry: "", goal: "", company: "", achievements: "" });
  const [active, setActive] = useState("headline");
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));
  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const headline = generateHeadline(form.role, form.skills, form.industry);
      const about = generateAbout(form.name, form.role, form.experience, form.skills, form.goal);
      const expBullets = `${form.role} at ${form.company || "Company"}

• ${form.achievements || "Led cross-functional teams to deliver high-impact projects on time and under budget"}
• Developed scalable solutions using ${form.skills.split(",")[0] || "industry-leading technologies"}, reducing operational costs by 30%
• Collaborated with stakeholders to define product roadmap and technical architecture
• Mentored junior team members, improving team velocity by 25%
• Drove adoption of best practices including code reviews, testing, and documentation`;

      setResults({ headline, about, experience: expBullets });
      setLoading(false);
    }, 900);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Linkedin className="w-3 h-3" /> LinkedIn Generator
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Optimize Your <span className="gradient-text">LinkedIn Profile</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Generate a magnetic headline, compelling summary, and impactful experience bullets.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <h2 className="font-display font-semibold text-lg mb-6">Your Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Jane Doe" value={form.name} onChange={e => update("name", e.target.value)} />
                <Input label="Job Title / Role *" placeholder="Software Engineer" value={form.role} onChange={e => update("role", e.target.value)} />
              </div>
              <Input label="Industry" placeholder="FinTech, Healthcare, SaaS..." value={form.industry} onChange={e => update("industry", e.target.value)} />
              <Input label="Current / Recent Company" placeholder="Google" value={form.company} onChange={e => update("company", e.target.value)} />
              <Input label="Years of Experience" placeholder="7 years" value={form.experience} onChange={e => update("experience", e.target.value)} />
              <Textarea
                label="Top Skills (comma separated)"
                placeholder="Python, Machine Learning, Team Leadership, AWS"
                rows={2}
                value={form.skills}
                onChange={e => update("skills", e.target.value)}
              />
              <Textarea
                label="Key Achievement (optional)"
                placeholder="Reduced infrastructure costs by $2M, Led team of 12 engineers..."
                rows={2}
                value={form.achievements}
                onChange={e => update("achievements", e.target.value)}
              />
              <Textarea
                label="Career Goal / Passion"
                placeholder="Building AI-powered products that scale to millions of users"
                rows={2}
                value={form.goal}
                onChange={e => update("goal", e.target.value)}
              />
              <Button variant="gradient" size="lg" className="w-full" onClick={generate} loading={loading} disabled={!form.role}>
                <Sparkles className="w-4 h-4" /> Generate LinkedIn Content
              </Button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {Object.keys(results).length > 0 ? (
              <>
                {/* Tab switcher */}
                <div className="flex gap-2">
                  {sections.map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${active === s.id ? "bg-brand-600 text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"}`}>
                      <s.icon className="w-3 h-3" />{s.label}
                    </button>
                  ))}
                </div>

                {sections.map(s => active === s.id && results[s.id] && (
                  <Card key={s.id}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{s.label}</h3>
                        <Badge color="cyan">Ready</Badge>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => copy(results[s.id])}>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 text-sm text-[var(--text-secondary)] whitespace-pre-line leading-relaxed border border-[var(--border)]">
                      {results[s.id]}
                    </div>
                    {s.id === "headline" && (
                      <p className="text-xs text-[var(--text-muted)] mt-2">✓ {results[s.id].length}/220 characters — LinkedIn headline limit</p>
                    )}
                  </Card>
                ))}

                {/* LinkedIn Tips */}
                <Card>
                  <h3 className="font-semibold text-sm mb-3 uppercase tracking-wide text-[var(--text-muted)]">LinkedIn Profile Tips</h3>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {[
                      "Use a professional headshot — profiles with photos get 21x more views",
                      "Add your current position even if job searching",
                      "Request recommendations from managers and colleagues",
                      "Follow companies you want to work for",
                      "Engage with posts in your industry weekly",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center py-24 text-center">
                <Linkedin className="w-16 h-16 text-[var(--text-muted)] opacity-20 mb-4" />
                <p className="text-[var(--text-muted)]">Fill your details and generate your LinkedIn content</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  
