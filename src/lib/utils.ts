import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function calculateATSScore(resumeText: string, jobDescription: string): {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
} {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // Extract keywords from job description
  const stopWords = new Set(["the", "a", "an", "in", "on", "at", "to", "for", "of", "and", "or", "with", "that", "this", "is", "are", "was", "were", "be", "been", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should"]);
  
  const jobWords = jobLower
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));

  const jobKeywords = [...new Set(jobWords)].slice(0, 30);
  
  const matched: string[] = [];
  const missing: string[] = [];

  jobKeywords.forEach(kw => {
    if (resumeLower.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const keywordScore = matched.length / Math.max(jobKeywords.length, 1);
  
  // Additional checks
  const hasEmail = /\S+@\S+\.\S+/.test(resumeText);
  const hasPhone = /[\d\-\(\)\+\s]{10,}/.test(resumeText);
  const hasLinkedIn = /linkedin/i.test(resumeText);
  const hasBullets = resumeText.includes("•") || resumeText.includes("-") || resumeText.includes("*");
  const wordCount = resumeText.split(/\s+/).length;
  const goodLength = wordCount >= 300 && wordCount <= 700;

let bonus = 0;
  if (hasEmail) bonus += 5;
  if (hasPhone) bonus += 5;
  if (hasLinkedIn) bonus += 3;
  if (hasBullets) bonus += 5;
  if (goodLength) bonus += 7;

  const score = Math.min(100, Math.round(keywordScore * 75 + bonus));

  const suggestions: string[] = [];
  if (!hasEmail) suggestions.push("Add your email address");
  if (!hasPhone) suggestions.push("Include a phone number");
  if (!hasLinkedIn) suggestions.push("Add your LinkedIn profile URL");
  if (!hasBullets) suggestions.push("Use bullet points to list achievements");
  if (wordCount < 300) suggestions.push("Expand your resume — aim for 400-600 words");
  if (missing.length > 0) suggestions.push(`Add missing keywords: ${missing.slice(0, 5).join(", ")}`);

  return { score, matched, missing: missing.slice(0, 10), suggestions };
}

export function extractKeywords(text: string): string[] {
  const stopWords = new Set(["the", "a", "an", "in", "on", "at", "to", "for", "of", "and", "or", "with"]);
  return [...new Set(
    text.toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w))
  )].slice(0, 20);
}
