"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "banner";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`adsense-wrapper ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <div className="w-full max-w-4xl">
        <AdSlot slot="1234567890" format="leaderboard" />
      </div>
    </div>
  );
}

export function AdSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdSlot slot="0987654321" format="rectangle" />
    </div>
  );
}

