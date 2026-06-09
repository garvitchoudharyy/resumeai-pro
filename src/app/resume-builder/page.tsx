"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { Plus, Trash2, Download, Eye, Save, ChevronDown, ChevronUp, Briefcase, GraduationCap, Code, Award, User, Loader2 } from "lucide-react";
import { Button, Card, Input, Textarea, Badge } from "@/components/ui/index";
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/utils";
import type { ResumeData, Experience, Education, Skill, Project, Certification } from "@/types/resume";
import { AdBanner } from "@/components/ui/AdSlot";
import toast from "react-hot-toast";

const defaultResume: ResumeData = {
  personal: { name: "", email: "", phone: "", location: "", linkedin: "", website: "", summary: "" },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  template: "modern",
};

function uid() { return Math.random().toString(36).slice(2, 9); }

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Code },
  { id: "certifications", label: "Certifications", icon: Award },
];

export default function ResumeBuilderPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [activeTab, setActiveTab] = useState("personal");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadFromLocalStorage<ResumeData>("resumeai_resume", defaultResume);
    setResume(saved);
  }, []);

const downloadPDF = async () => {
    setDownloading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");
      if (!previewRef.current) return;
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personal.name || "resume"}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF export failed. Please try again.");
    }
    setDownloading(false);
  };

  const updatePersonal = (field: string, value: string) =>
    setResume(r => ({ ...r, personal: { ...r.personal, [field]: value } }));

  const addExperience = () => setResume(r => ({
    ...r,
    experience: [...r.experience, { id: uid(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }],
  }));

  const updateExperience = (id: string, field: string, value: string | boolean) =>
    setResume(r => ({ ...r, experience: r.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const removeExperience = (id: string) =>
    setResume(r => ({ ...r, experience: r.experience.filter(e => e.id !== id) }));

  const addEducation = () => setResume(r => ({
    ...r,
    education: [...r.education, { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
  }));

  const updateEducation = (id: string, field: string, value: string) =>
    setResume(r => ({ ...r, education: r.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const removeEducation = (id: string) =>
    setResume(r => ({ ...r, education: r.education.filter(e => e.id !== id) }));

  const addSkill = () => setResume(r => ({
    ...r,
    skills: [...r.skills, { id: uid(), name: "", level: "Intermediate" }],
  }));

  const updateSkill = (id: string, field: string, value: string) =>
    setResume(r => ({ ...r, skills: r.skills.map(s => s.id === id ? { ...s, [field]: value } : s) }));

  const removeSkill = (id: string) =>
    setResume(r => ({ ...r, skills: r.skills.filter(s => s.id !== id) }));

  const addProject = () => setResume(r => ({
    ...r,
    projects: [...r.projects, { id: uid(), name: "", description: "", technologies: "", url: "" }],
  }));

  const updateProject = (id: string, field: string, value: string) =>
    setResume(r => ({ ...r, projects: r.projects.map(p => p.id === id ? { ...p, [field]: value } : p) }));
    const removeProject = (id: string) =>
    setResume(r => ({ ...r, projects: r.projects.filter(p => p.id !== id) }));

  const addCert = () => setResume(r => ({
    ...r,
    certifications: [...r.certifications, { id: uid(), name: "", issuer: "", date: "", url: "" }],
  }));

  const updateCert = (id: string, field: string, value: string) =>
    setResume(r => ({ ...r, certifications: r.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) }));

  const removeCert = (id: string) =>
    setResume(r => ({ ...r, certifications: r.certifications.filter(c => c.id !== id) }));

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-xl">Resume Builder</h1>
            <p className="text-xs text-[var(--text-muted)]">Auto-saved to browser</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setPreview(!preview)}>
              <Eye className="w-4 h-4" /> {preview ? "Edit" : "Preview"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => {}} loading={saving}>
              <Save className="w-4 h-4" /> Save
            </Button>
            <Button variant="gradient" size="sm" onClick={downloadPDF} loading={downloading}>
              <Download className="w-4 h-4" /> Download PDF
            </Button>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${preview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {/* Editor */}
          {!preview && (
            <div>
              {/* Tab Navigation */}
              <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === t.id
                        ? "bg-brand-600 text-white"
                        : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Personal Info */}
              {activeTab === "personal" && (
                <Card>
                  <h2 className="font-display font-semibold text-lg mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name *" placeholder="John Doe" value={resume.personal.name} onChange={e => updatePersonal("name", e.target.value)} />
                    <Input label="Email *" type="email" placeholder="john@example.com" value={resume.personal.email} onChange={e => updatePersonal("email", e.target.value)} />
                    <Input label="Phone" placeholder="+1 (555) 000-0000" value={resume.personal.phone} onChange={e => updatePersonal("phone", e.target.value)} />
                    <Input label="Location" placeholder="San Francisco, CA" value={resume.personal.location} onChange={e => updatePersonal("location", e.target.value)} />
                    <Input label="LinkedIn URL" placeholder="linkedin.com/in/johndoe" value={resume.personal.linkedin} onChange={e => updatePersonal("linkedin", e.target.value)} />
                    <Input label="Website / Portfolio" placeholder="johndoe.dev" value={resume.personal.website} onChange={e => updatePersonal("website", e.target.value)} />
                    <div className="sm:col-span-2">
                      <Textarea
                        label="Professional Summary"
                        placeholder="Results-driven software engineer with 5+ years of experience..."
                        value={resume.personal.summary}
                        onChange={e => updatePersonal("summary", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Experience */}
              {activeTab === "experience" && (
                <div className="space-y-4">
                  {resume.experience.map((exp, idx) => (
                    <ExperienceCard key={exp.id} exp={exp} idx={idx} onUpdate={updateExperience} onRemove={removeExperience} />
                  ))}
                   <Button variant="secondary" className="w-full border-dashed" onClick={addExperience}>
                    <Plus className="w-4 h-4" /> Add Experience
                  </Button>
                </div>
              )}

              {/* Education */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  {resume.education.map((edu, idx) => (
                    <Card key={edu.id}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-[var(--text-muted)]">Education #{idx + 1}</span>
                        <button onClick={() => removeEducation(edu.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Institution" placeholder="MIT" value={edu.institution} onChange={e => updateEducation(edu.id, "institution", e.target.value)} />
                        <Input label="Degree" placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateEducation(edu.id, "degree", e.target.value)} />
                        <Input label="Field of Study" placeholder="Computer Science" value={edu.field} onChange={e => updateEducation(edu.id, "field", e.target.value)} />
                        <Input label="GPA" placeholder="3.8 / 4.0" value={edu.gpa} onChange={e => updateEducation(edu.id, "gpa", e.target.value)} />
                        <Input label="Start Date" type="month" value={edu.startDate} onChange={e => updateEducation(edu.id, "startDate", e.target.value)} />
                        <Input label="End Date" type="month" value={edu.endDate} onChange={e => updateEducation(edu.id, "endDate", e.target.value)} />
                      </div>
                         </Card>
                  ))}
                  <Button variant="secondary" className="w-full border-dashed" onClick={addEducation}>
                    <Plus className="w-4 h-4" /> Add Education
                  </Button>
                </div>
              )}

              {/* Skills */}
              {activeTab === "skills" && (
                <Card>
                  <h2 className="font-display font-semibold text-lg mb-6">Skills</h2>
                  <div className="space-y-3">
                    {resume.skills.map(skill => (
                      <div key={skill.id} className="flex gap-3 items-center">
                        <Input placeholder="e.g. React, Python, Leadership" value={skill.name} onChange={e => updateSkill(skill.id, "name", e.target.value)} className="flex-1" />
                        <select
                          value={skill.level}
                          onChange={e => updateSkill(skill.id, "level", e.target.value)}
                          className="px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none"
                        >
                          {["Beginner","Intermediate","Advanced","Expert"].map(l => <option key={l}>{l}</option>)}
                        </select>
                        <button onClick={() => removeSkill(skill.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <Button variant="secondary" className="w-full border-dashed" onClick={addSkill}>
                      <Plus className="w-4 h-4" /> Add Skill
                    </Button>
                     </div>
                </Card>
              )}

              {/* Projects */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {resume.projects.map((proj, idx) => (
                    <Card key={proj.id}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-[var(--text-muted)]">Project #{idx + 1}</span>
                        <button onClick={() => removeProject(proj.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Project Name" value={proj.name} onChange={e => updateProject(proj.id, "name", e.target.value)} />
                        <Input label="URL" placeholder="github.com/user/project" value={proj.url} onChange={e => updateProject(proj.id, "url", e.target.value)} />
                        <div className="sm:col-span-2">
                          <Input label="Technologies Used" placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={e => updateProject(proj.id, "technologies", e.target.value)} />
                        </div>
                        <div className="sm:col-span-2">
                          <Textarea label="Description" rows={3} value={proj.description} onChange={e => updateProject(proj.id, "description", e.target.value)} />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="secondary" className="w-full border-dashed" onClick={addProject}>
                    <Plus className="w-4 h-4" /> Add Project
                  </Button>
                </div>
               )}

              {/* Certifications */}
              {activeTab === "certifications" && (
                <div className="space-y-4">
                  {resume.certifications.map((cert, idx) => (
                    <Card key={cert.id}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-[var(--text-muted)]">Certification #{idx + 1}</span>
                        <button onClick={() => removeCert(cert.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Certification Name" value={cert.name} onChange={e => updateCert(cert.id, "name", e.target.value)} />
                        <Input label="Issuing Organization" value={cert.issuer} onChange={e => updateCert(cert.id, "issuer", e.target.value)} />
                        <Input label="Date" type="month" value={cert.date} onChange={e => updateCert(cert.id, "date", e.target.value)} />
                        <Input label="Credential URL" value={cert.url} onChange={e => updateCert(cert.id, "url", e.target.value)} />
                      </div>
                    </Card>
                  ))}
                  <Button variant="secondary" className="w-full border-dashed" onClick={addCert}>
                    <Plus className="w-4 h-4" /> Add Certification
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {(preview || typeof window !== "undefined") && (
            <div className={preview ? "block" : "hidden lg:block"}>
              <div className="sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold">Live Preview</h2>
                  <Badge color="green">Auto-updating</Badge>
                </div>
                <div className="overflow-auto max-h-[80vh] rounded-2xl border border-[var(--border)] shadow-2xl">
                  <ResumePreview resume={resume} ref={previewRef} />
                </div>
                <div className="mt-4">
                  <Button variant="gradient" className="w-full" onClick={downloadPDF} loading={downloading}>
                    {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <AdBanner />
      </div>
    </div>
  );
}

function ExperienceCard({ exp, idx, onUpdate, onRemove }: {
  exp: Experience; idx: number;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)]">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {exp.position || `Experience #${idx + 1}`}
          {exp.company && <span className="text-[var(--text-muted)] font-normal">@ {exp.company}</span>}
        </button>
        <button onClick={() => onRemove(exp.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Job Title" placeholder="Senior Engineer" value={exp.position} onChange={e => onUpdate(exp.id, "position", e.target.value)} />
          <Input label="Company" placeholder="Acme Corp" value={exp.company} onChange={e => onUpdate(exp.id, "company", e.target.value)} />
          <Input label="Start Date" type="month" value={exp.startDate} onChange={e => onUpdate(exp.id, "startDate", e.target.value)} />
          <div>
            <Input label="End Date" type="month" value={exp.endDate} disabled={exp.current} onChange={e => onUpdate(exp.id, "endDate", e.target.value)} />
            <label className="flex items-center gap-2 mt-2 text-xs text-[var(--text-muted)] cursor-pointer">
              <input type="checkbox" checked={exp.current} onChange={e => onUpdate(exp.id, "current", e.target.checked)} className="rounded" />
              Currently working here
            </label>
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Description (use • for bullet points)"
              rows={4}
              placeholder="• Led development of microservices architecture serving 10M+ users&#10;• Reduced load time by 40% through performance optimization"
              value={exp.description}
              onChange={e => onUpdate(exp.id, "description", e.target.value)}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

const ResumePreview = forwardRef<HTMLDivElement, { resume: ResumeData }>(({ resume }, ref) => {
  const { personal, experience, education, skills, projects, certifications } = resume;
  return (
    <div ref={ref} style={{ fontFamily: "Georgia, serif", background: "#fff", color: "#111", padding: "40px", minHeight: "297mm", fontSize: "11px", lineHeight: 1.5 }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #4f46e5", paddingBottom: "16px", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1e1b4b", marginBottom: "4px", fontFamily: "Arial, sans-serif" }}>
          {personal.name || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "10px", color: "#52525b" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {personal.summary && (
        <Section title="Summary">
          <p style={{ color: "#374151", lineHeight: 1.6 }}>{personal.summary}</p>
        </Section>
      )}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: "12px" }}>{exp.position}</strong>
                <span style={{ fontSize: "10px", color: "#6b7280" }}>
                  {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div style={{ color: "#4f46e5", fontSize: "11px", marginBottom: "4px" }}>{exp.company}</div>
              <div style={{ color: "#374151", whiteSpace: "pre-line" }}>{exp.description}</div>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{edu.degree} {edu.field && `in ${edu.field}`}</strong>
                <div style={{ color: "#4f46e5" }}>{edu.institution}</div>
                {edu.gpa && <div style={{ color: "#6b7280", fontSize: "10px" }}>GPA: {edu.gpa}</div>}
              </div>
              <span style={{ color: "#6b7280", fontSize: "10px" }}>{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skills.map(s => (
              <span key={s.id} style={{ background: "#ede9fe", color: "#4f46e5", padding: "2px 8px", borderRadius: "12px", fontSize: "10px" }}>
                {s.name} {s.level !== "Intermediate" && `(${s.level})`}
              </span>
            ))}
          </div>
        </Section>
      )}
        {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{proj.name}</strong>
                {proj.url && <span style={{ color: "#4f46e5", fontSize: "10px" }}>{proj.url}</span>}
              </div>
              {proj.technologies && <div style={{ color: "#6b7280", fontSize: "10px", marginBottom: "2px" }}>Tech: {proj.technologies}</div>}
              <div style={{ color: "#374151" }}>{proj.description}</div>
            </div>
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map(cert => (
            <div key={cert.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <div>
                <strong>{cert.name}</strong>
                {cert.issuer && <span style={{ color: "#6b7280" }}> — {cert.issuer}</span>}
              </div>
              <span style={{ color: "#6b7280", fontSize: "10px" }}>{cert.date}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
});
ResumePreview.displayName = "ResumePreview";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4f46e5", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px", marginBottom: "10px", fontFamily: "Arial, sans-serif" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
    
