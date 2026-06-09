import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resumeai-pro.vercel.app"),
  title: {
    default: "ResumeAI Pro — Free AI Resume Builder & ATS Checker",
    template: "%s | ResumeAI Pro",
  },
  description:
    "Build ATS-optimized resumes, check your ATS score, generate cover letters, and prepare for interviews — all free. Powered by AI.",
  keywords: [
    "resume builder",
    "ATS checker",
    "ATS score",
    "free resume builder",
    "cover letter generator",
    "AI resume",
    "resume analyzer",
    "interview preparation",
    "LinkedIn profile generator",
    "career roadmap",
    "job description keyword matcher",
  ],
  authors: [{ name: "Garvit Choudhary" }],
  creator: "Garvit Choudhary",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumeai-pro.vercel.app",
    title: "ResumeAI Pro — Free AI Resume Builder & ATS Checker",
    description:
      "Build ATS-optimized resumes, check your ATS score, generate cover letters, and prepare for interviews — all free.",
    siteName: "ResumeAI Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI Pro — Free AI Resume Builder & ATS Checker",
    description:
      "Build ATS-optimized resumes, check your ATS score, generate cover letters, and prepare for interviews — all free.",
    creator: "@garvitchoudhary",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
          crossOrigin="anonymous"
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontFamily: "var(--font-satoshi)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
