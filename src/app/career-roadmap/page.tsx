"use client";
import { useState } from "react";
import { Map, ArrowRight, CheckCircle, Clock, Target, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";

interface RoadmapStep {
  phase: string;
  timeframe: string;
  goals: string[];
  skills: string[];
  milestones: string[];
  color: string;
}

const roadmapData: Record<string, RoadmapStep[]> = {
  "software engineer": [
    { phase: "Foundation", timeframe: "0–6 months", color: "#6366f1", goals: ["Master core programming fundamentals", "Build 3 portfolio projects", "Learn version control (Git)"], skills: ["Python or JavaScript", "Data Structures & Algorithms", "Git & GitHub", "Basic SQL"], milestones: ["Complete first open source contribution", "Build a full-stack web app"] },
    { phase: "Growth", timeframe: "6–18 months", color: "#8b5cf6", goals: ["Land first software role", "Contribute to production code", "Join engineering community"], skills: ["React or Vue.js", "Node.js / Backend framework", "REST APIs", "Testing basics"], milestones: ["First job offer accepted", "Deploy to production", "Pass coding interview"] },
    { phase: "Expertise", timeframe: "18 months–3 years", color: "#ec4899", goals: ["Become a mid-level engineer", "Mentor junior developers", "Lead a feature end-to-end"], skills: ["System Design", "Cloud (AWS/GCP/Azure)", "CI/CD pipelines", "Performance optimization"], milestones: ["Promoted to mid-level", "Led a project independently", "Published technical blog post"] },
    { phase: "Leadership", timeframe: "3–5 years", color: "#f59e0b", goals: ["Senior engineer or tech lead", "Architect systems at scale", "Drive technical decisions"], skills: ["Architecture patterns", "Team leadership", "Code review culture", "Cross-functional communication"], milestones: ["Senior title achieved", "Mentored 3+ engineers", "Drove major technical initiative"] },
  ],
  "product manager": [
    { phase: "Foundation", timeframe: "0–6 months", color: "#6366f1", goals: ["Understand product lifecycle", "Learn user research methods", "Study PM frameworks"], skills: ["User story writing", "Wireframing (Figma)", "Metrics & Analytics", "Stakeholder communication"], milestones: ["Complete PM certification", "Conduct first user interviews"] },
    { phase: "Associate PM", timeframe: "6–18 months", color: "#8b5cf6", goals: ["Land first PM role", "Own a product feature", "Build data fluency"], skills: ["SQL basics", "A/B testing", "Roadmap prioritization", "JIRA / Linear"], milestones: ["First product shipped", "Improved key metric by 10%+", "Led sprint ceremonies"] },
    { phase: "PM", timeframe: "18 months–3 years", color: "#ec4899", goals: ["Manage full product area", "Drive OKRs", "Build cross-functional trust"], skills: ["PRD writing", "Go-to-market strategy", "Competitive analysis", "Executive presentations"], milestones: ["Launched major product", "Grew user base 2x", "Promoted to PM"] },
    { phase: "Senior PM+", timeframe: "3–5 years", color: "#f59e0b", goals: ["Own product strategy", "Mentor PMs", "Influence company direction"], skills: ["Product strategy", "P&L understanding", "Org design", "Public speaking"], milestones: ["Senior PM or Group PM", "Led 0→1 product", "Built PM team"] },
  ],
  "data scientist": [
    { phase: "Foundation", timeframe: "0–6 months", color: "#6366f1", goals: ["Master statistics fundamentals", "Learn Python for data", "Complete online courses"], skills: ["Python (Pandas, NumPy)", "Statistics & Probability", "SQL", "Matplotlib / Seaborn"], milestones: ["Complete Kaggle competition", "Build analysis portfolio on GitHub"] },
    { phase: "Junior DS", timeframe: "6–18 months", color: "#8b5cf6", goals: ["Land first data role", "Build real ML models", "Communicate data insights"], skills: ["Scikit-learn", "Machine Learning basics", "Jupyter Notebooks", "Data visualization"], milestones: ["First data job offer", "Model in production", "Presented findings to stakeholders"] },
    { phase: "Data Scientist", timeframe: "18 months–3 years", color: "#ec4899", goals: ["Own end-to-end ML pipelines", "Drive business decisions with data", "Deep-dive a specialty"], skills: ["Deep Learning (PyTorch/TF)", "MLOps basics", "Experiment design", "Feature engineering"], milestones: ["Led high-impact data project", "Model improved KPI by 15%+", "Mentored analyst"] },
    { phase: "Senior DS / Lead", timeframe: "3–5 years", color: "#f59e0b", goals: ["Data strategy ownership", "Lead data science team", "Build AI/ML culture"], skills: ["MLOps & model monitoring", "Research & publication", "Business strategy", "Team management"], milestones: ["Senior or Staff DS title", "Published ML paper or talk", "Built data platform"] },
  ],
};

const defaultRoadmap = roadmapData["software engineer"];

export default function CareerRoadmapPage() {
  const [role, setRole] = useState("");
  const [current, setCurrent] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const key = Object.keys(roadmapData).find(k => role.toLowerCase().includes(k)) || "software engineer";
      setRoadmap(roadmapData[key]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Map className="w-3 h-3" /> Career Roadmap
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Your Personalized <span className="gradient-text">Career Roadmap</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Get a step-by-step roadmap to reach your career goal with skills, milestones, and timelines.
          </p>
        </div>

        <AdBanner className="mb-8" />

        <Card className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input
              label="Target Role / Career Goal *"
              placeholder="e.g. Software Engineer, Product Manager, Data Scientist"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
            <Input
              label="Current Experience Level"
              placeholder="e.g. Student, 2 years as analyst, career changer"
              value={current}
              onChange={e => setCurrent(e.target.value)}
            />
          </div>
          <Button variant="gradient" size="lg" className="w-full" onClick={generate} loading={loading} disabled={!role.trim()}>
            <Sparkles className="w-5 h-5" /> Generate My Career Roadmap
          </Button>
        </Card>

        {roadmap && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">
                Roadmap for: <span className="gradient-text capitalize">{role}</span>
              </h2>
              <p className="text-[var(--text-muted)]">4 phases · ~5 year journey to senior level</p>
            </div>

            {roadmap.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector line */}
                {idx < roadmap.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-6 z-10" style={{ background: step.color, opacity: 0.3 }} />
                )}

                <Card className="border-l-4" style={{ borderLeftColor: step.color }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: step.color }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display font-bold text-xl">{step.phase}</h3>
                        <Badge color="blue">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.timeframe}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Goals */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4" style={{ color: step.color }} />
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-muted)]">Goals</h4>
                      </div>
                      <ul className="space-y-2">
                        {step.goals.map((g, i) => (
                          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                            <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4" style={{ color: step.color }} />
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-muted)]">Key Skills</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {step.skills.map(s => (
                          <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium border" style={{ borderColor: `${step.color}40`, color: step.color, background: `${step.color}10` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4" style={{ color: step.color }} />
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-[var(--text-muted)]">Milestones</h4>
                      </div>
                      <ul className="space-y-2">
                        {step.milestones.map((m, i) => (
                          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-400" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            ))}

            <Card className="text-center border-dashed">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-display font-bold text-xl mb-2">Senior Level Achieved!</h3>
              <p className="text-[var(--text-muted)]">The journey continues — tech lead, staff engineer, director...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

