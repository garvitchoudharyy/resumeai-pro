"use client";
import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, RefreshCw, Sparkles, CheckCircle } from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";

const questionBank: Record<string, { q: string; hint: string }[]> = {
  behavioral: [
    { q: "Tell me about a time you faced a significant challenge at work. How did you handle it?", hint: "Use STAR method: Situation, Task, Action, Result" },
    { q: "Describe a situation where you had to work with a difficult team member.", hint: "Focus on your actions and what you learned" },
    { q: "Give an example of a goal you set and how you achieved it.", hint: "Be specific about metrics and timelines" },
    { q: "Tell me about a time you failed. What did you learn?", hint: "Show growth mindset — what changed after" },
    { q: "Describe a time you had to make a quick decision with limited information.", hint: "Highlight your decision-making framework" },
    { q: "How have you handled conflicting priorities under tight deadlines?", hint: "Show prioritization skills" },
  ],
  technical: [
    { q: "Explain a complex technical concept you've worked with to a non-technical stakeholder.", hint: "Use analogies and keep it simple" },
    { q: "How do you approach debugging a production issue at 3AM?", hint: "Show systematic troubleshooting skills" },
    { q: "Describe your experience with agile/scrum methodologies.", hint: "Mention specific sprints, retrospectives, ceremonies" },
    { q: "How do you ensure code quality in your team?", hint: "Mention code reviews, testing, CI/CD, documentation" },
    { q: "What's your approach to system design for a new feature?", hint: "Cover requirements, scalability, tradeoffs" },
    { q: "How do you stay current with new technologies?", hint: "Mention specific resources, side projects, communities" },
  ],
  leadership: [
    { q: "How do you motivate a team when morale is low?", hint: "Think about recognition, transparency, empowerment" },
    { q: "Describe your leadership style and how it adapts to different team members.", hint: "Show situational leadership awareness" },
    { q: "How do you handle underperforming team members?", hint: "Show empathy + accountability balance" },
    { q: "Tell me about a time you drove organizational change.", hint: "Focus on stakeholder management and outcomes" },
    { q: "How do you balance individual contributor work with leadership responsibilities?", hint: "Show time management and delegation" },
    { q: "Describe how you build trust with a new team.", hint: "Mention quick wins, listening, transparency" },
  ],
  situational: [
    { q: "If a key project deliverable is at risk, what steps would you take?", hint: "Show risk mitigation and communication skills" },
    { q: "How would you handle a stakeholder who constantly changes requirements?", hint: "Focus on process, not blame" },
    { q: "If you disagreed with your manager's technical decision, what would you do?", hint: "Show respect + assertiveness balance" },
    { q: "A colleague takes credit for your work. How do you respond?", hint: "Stay professional, address directly" },
    { q: "You're assigned a project with an unclear scope. How do you proceed?", hint: "Ask the right questions, create alignment" },
    { q: "How would you onboard a new team member during a critical project phase?", hint: "Show empathy and efficiency" },
  ],
};

const categories = [
  { id: "behavioral", label: "Behavioral", color: "blue" },
  { id: "technical", label: "Technical", color: "green" },
  { id: "leadership", label: "Leadership", color: "purple" },
  { id: "situational", label: "Situational", color: "yellow" },
];

export default function InterviewPrepPage() {
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("behavioral");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState<{ q: string; a: string }[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = questionBank[category] || [];
  const question = questions[currentQ % questions.length];

  const next = () => {
    if (answer.trim()) setSaved(s => [...s, { q: question.q, a: answer }]);
    setCurrentQ(c => (c + 1) % questions.length);
    setAnswer("");
    setShowAnswer(false);
  };

  const shuffle = () => {
    setCurrentQ(Math.floor(Math.random() * questions.length));
    setAnswer("");
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3 h-3" /> Interview Prep
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Ace Your <span className="gradient-text">Next Interview</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Practice with real interview questions across behavioral, technical, and leadership categories.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <div className="space-y-6">
          {/* Setup */}
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <Input label="Target Role (optional)" placeholder="e.g. Senior Software Engineer" value={role} onChange={e => setRole(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(c => (
                    <button key={c.id} onClick={() => { setCategory(c.id); setCurrentQ(0); setAnswer(""); setShowAnswer(false); }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${category === c.id ? "bg-brand-600 text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          {/* Question Card */}
          <Card className="border-brand-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Badge color="purple">Q {(currentQ % questions.length) + 1} / {questions.length}</Badge>
                <Badge color="blue">{categories.find(c => c.id === category)?.label}</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={shuffle}>
                <RefreshCw className="w-3.5 h-3.5" /> Random
              </Button>
            </div>

            <h2 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-6 leading-relaxed">
              {question?.q}
            </h2>

            {/* Hint */}
            <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center gap-2 text-sm text-brand-400 mb-4">
              {showAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showAnswer ? "Hide hint" : "Show hint"}
            </button>
            {showAnswer && (
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-brand-300">💡 {question?.hint}</p>
              </div>
            )}

            {/* Answer textarea */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Your Answer (practice out loud, then type key points)</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none"
                rows={6}
                placeholder="Type your answer here to save it for review..."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="gradient" className="flex-1" onClick={next}>
                <Sparkles className="w-4 h-4" />
                {answer.trim() ? "Save & Next Question" : "Next Question"}
              </Button>
            </div>
          </Card>

          {/* STAR Framework */}
          <Card>
            <h3 className="font-display font-semibold mb-5">The STAR Method</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { letter: "S", word: "Situation", desc: "Set the scene and context", color: "text-blue-400 bg-blue-500/10" },
                { letter: "T", word: "Task", desc: "Describe your responsibility", color: "text-green-400 bg-green-500/10" },
                { letter: "A", word: "Action", desc: "Explain what YOU did", color: "text-yellow-400 bg-yellow-500/10" },
                { letter: "R", word: "Result", desc: "Share the outcome + metrics", color: "text-purple-400 bg-purple-500/10" },
              ].map(s => (
                <div key={s.letter} className={`rounded-xl p-4 ${s.color.split(" ")[1]}`}>
                  <div className={`text-3xl font-display font-bold ${s.color.split(" ")[0]} mb-1`}>{s.letter}</div>
                  <div className="font-semibold text-sm mb-1">{s.word}</div>
                  <div className="text-xs text-[var(--text-muted)]">{s.desc}</div>
                </div>
              ))}
            </div>
          </Card>
          {/* Saved Answers */}
          {saved.length > 0 && (
            <Card>
              <h3 className="font-display font-semibold mb-4">Saved Answers ({saved.length})</h3>
              <div className="space-y-4">
                {saved.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">{item.q}</p>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] ml-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

