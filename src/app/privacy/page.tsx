import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ResumeAI Pro privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-2">Privacy Policy</h1>
        <p className="text-[var(--text-muted)] mb-10">Last updated: December 2024</p>
        <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          {[
            { title: "1. Data We Collect", body: "ResumeAI Pro stores all resume data exclusively in your browser's localStorage. We do not transmit, store, or process your personal resume data on any server. No account or sign-up is required." },
            { title: "2. How Your Data Is Used", body: "All processing happens client-side in your browser. Your resume content, job descriptions, and generated documents never leave your device. We have no access to your resume data." },
            { title: "3. Analytics", body: "We may use privacy-friendly analytics (such as Vercel Analytics) to understand aggregate usage patterns like page views and feature usage. No personally identifiable information is collected." },
            { title: "4. Advertising", body: "We display Google AdSense advertisements to support the free service. Google may use cookies to serve relevant ads. You can opt out of personalized ads via Google's Ad Settings." },
            { title: "5. Cookies", body: "We use minimal cookies for theme preferences (dark/light mode) and AdSense. No tracking cookies are set by ResumeAI Pro itself." },
            { title: "6. Third-Party Services", body: "We use Vercel for hosting (subject to Vercel's privacy policy) and Google AdSense for advertising (subject to Google's privacy policy). We do not sell your data to any third parties." },
            { title: "7. Your Rights", body: "Since all your data is stored locally in your browser, you can delete it at any time by clearing your browser's localStorage. There is no account to delete." },
            { title: "8. Contact", body: "For privacy-related questions, please reach out via our GitHub repository or social media channels." },
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

