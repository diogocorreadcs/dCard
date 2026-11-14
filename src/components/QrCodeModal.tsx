"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check } from "lucide-react";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  accentColor: string;
  isDark: boolean;
}

export function QrCodeModal({
  isOpen,
  onClose,
  name,
  accentColor,
  isDark,
}: QrCodeModalProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xs rounded-3xl p-6 shadow-2xl border transition-all ${
          isDark
            ? "bg-zinc-900 border-zinc-800 text-zinc-100 shadow-black/80"
            : "bg-white border-zinc-200 text-zinc-900 shadow-zinc-300/50"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors cursor-pointer ${
            isDark
              ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-black"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-5">
          <h3 className="font-bold text-lg">QR Code do Cartão</h3>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            Escaneie para acessar o cartão de {name}
          </p>
        </div>

        <div className="flex justify-center p-4 bg-white rounded-2xl mx-auto w-fit shadow-inner">
          <QRCodeSVG
            value={pageUrl || "https://example.com"}
            size={170}
            fgColor="#09090b"
            bgColor="#ffffff"
            level="M"
          />
        </div>

        <button
          onClick={handleCopy}
          style={{ backgroundColor: accentColor }}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer active:scale-98"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Link Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar Link do Cartão
            </>
          )}
        </button>
      </div>
    </div>
  );
}