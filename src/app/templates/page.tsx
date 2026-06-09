"use client";
import { useState } from "react";
import Link from "next/link";
import { LayoutTemplate, Download, Eye, Star, Filter } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui/index";
import { AdBanner } from "@/components/ui/AdSlot";

const templates = [
  { id: "modern", name: "Modern Pro", category: "Tech", ats: 98, color: "#6366f1", desc: "Clean, minimal layout perfect for software engineers and designers", popular: true },
  { id: "executive", name: "Executive", category: "Management", ats: 96, color: "#0891b2", desc: "Bold, commanding design for senior leaders and executives" },
  { id: "creative", name: "Creative Edge", category: "Design", ats: 89, color: "#ec4899", desc: "Distinctive layout for creative professionals and marketers" },
  { id: "minimal", name: "Minimal Clean", category: "All Roles", ats: 99, color: "#10b981", desc: "Ultra-clean one-column layout, maximizes ATS compatibility", popular: true },
  { id: "academic", name: "Academic CV", category: "Research", ats: 97, color: "#8b5cf6", desc: "Structured format for academics, researchers, and PhDs" },
  { id: "startup", name: "Startup Ninja", category: "Startup", ats: 95, color: "#f59e0b", desc: "Dynamic layout showcasing impact and agility for startup roles" },
  { id: "finance", name: "Finance Classic", category: "Finance", ats: 98, color: "#064e3b", desc: "Traditional, trustworthy layout for finance and banking roles" },
  { id: "healthcare", name: "Healthcare Pro", category: "Healthcare", ats: 97, color: "#0284c7", desc: "Clear, organized format for healthcare and medical professionals" },
  { id: "sales", name: "Sales Champion", category: "Sales", ats: 95, color: "#dc2626", desc: "Numbers-forward layout to showcase sales metrics and wins" },
];

const categories = ["All", "Tech", "Management", "Design", "Research", "Finance", "Healthcare", "Startup", "Sales", "All Roles"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? templates : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <LayoutTemplate className="w-3 h-3" /> Template Gallery
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Professional <span className="gradient-text">Resume Templates</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            Choose from 9 ATS-optimized templates designed by hiring managers and recruiters.
          </p>
        </div>

        <AdBanner className="mb-8" />

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === c ? "bg-brand-600 text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(template => (
            <div key={template.id} className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-hover">
              {/* Template preview mockup */}
              <div className="relative h-56 p-4" style={{ background: `linear-gradient(135deg, ${template.color}15, ${template.color}05)` }}>
                {template.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge color="yellow">
                      <Star className="w-3 h-3 mr-1" /> Popular
                    </Badge>
                  </div>
                )}
                {/* Mini resume mockup */}
                <div className="bg-white rounded-xl shadow-lg p-3 h-full overflow-hidden">
                  <div style={{ borderBottom: `2px solid ${template.color}`, paddingBottom: "6px", marginBottom: "6px" }}>
                    <div className="h-3 rounded bg-gray-800 mb-1 w-1/2" />
                    <div className="h-1.5 rounded bg-gray-300 w-3/4" />
                  </div>
                  {[85, 90, 70, 95, 60].map((w, i) => (
                    <div key={i} className="flex gap-1 mb-1">
                      <div className="h-1.5 rounded flex-shrink-0" style={{ width: "30%", background: i % 3 === 0 ? template.color : "#e5e7eb" }} />
                      <div className="h-1.5 rounded bg-gray-200 flex-1" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                  <div className="mt-2 h-1.5 rounded w-1/3 mb-1" style={{ background: template.color }} />
                  {[70, 50, 80].map((w, i) => (
                    <div key={i} className="h-1.5 rounded bg-gray-200 mb-1" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold">{template.name}</h3>
                  <Badge color="green">{template.ats}% ATS</Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">{template.desc}</p>
                <div className="flex gap-2">
                  <Link href="/resume-builder" className="flex-1">
                    <Button variant="gradient" size="sm" className="w-full">
                      <Download className="w-3.5 h-3.5" /> Use Template
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <Filter className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl mb-2">All templates are 100% free</h3>
            <p className="text-[var(--text-muted)] mb-6">No watermarks, no paywalls. Download as many as you need.</p>
            <Link href="/resume-builder">
              <Button variant="gradient" size="lg">Start Building Your Resume</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

