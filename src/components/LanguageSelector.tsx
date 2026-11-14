"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; layout?: number; includedLanguages?: string },
          elementId: string
        ) => void;
      };
    };
  }
}

export function LanguageSelector({ isDark }: { isDark: boolean }) {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "pt",
            includedLanguages: "en,es,pt,fr,de",
          },
          "google_translate_element"
        );
      }
    };

    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div className={`text-xs overflow-hidden rounded-lg border ${isDark ? "bg-zinc-800/70 border-zinc-700 text-zinc-300" : "bg-zinc-100 border-zinc-200 text-zinc-700"}`}>
      <div id="google_translate_element" className="scale-90 origin-left" />
    </div>
  );
}