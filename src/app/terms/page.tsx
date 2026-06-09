import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ResumeAI Pro terms of service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-2">Terms of Service</h1>
        <p className="text-[var(--text-muted)] mb-10">Last updated: December 2024</p>
        <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          {[
            { title: "1. Acceptance of Terms", body: "By using ResumeAI Pro, you agree to these Terms of Service. If you do not agree, please do not use the service. We reserve the right to update these terms at any time." },
            { title: "2. Free Service", body: "ResumeAI Pro is provided free of charge. We reserve the right to introduce premium features in the future, but core tools will remain free." },
            { title: "3. Your Content", body: "You retain full ownership of all content you create using ResumeAI Pro. Since data is stored locally in your browser, you are responsible for backing up your work." },
            { title: "4. Acceptable Use", body: "You agree not to use ResumeAI Pro for any unlawful purpose, to misrepresent your qualifications on resumes, or to attempt to reverse engineer or abuse the service." },
            { title: "5. No Warranty", body: "ResumeAI Pro is provided 'as is' without warranty of any kind. We do not guarantee that the service will be error-free or that ATS scores reflect real-world results." },
            { title: "6. Limitation of Liability", body: "ResumeAI Pro and Garvit Choudhary shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service." },
            { title: "7. Intellectual Property", body: "The ResumeAI Pro brand, design, and code are the intellectual property of Garvit Choudhary. You may not copy or redistribute the application without permission." },
            { title: "8. Governing Law", body: "These terms are governed by applicable laws. Any disputes shall be resolved through good-faith negotiation before any formal proceedings." },
          ].map(s => (
            <div key={s.title}>
              <h2 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-3">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

