"use client";

import { useState } from "react";
import { Mail, Check, X } from "lucide-react";
import { cardConfig } from "@/config/card.config";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  isDark: boolean;
}

export function LeadModal({ isOpen, onClose, accentColor, isDark }: LeadModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const formspreeId = cardConfig.contact.formspreeId;
    if (!formspreeId) {
      alert("Formspree ID não configurado no .env.local");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xs rounded-3xl p-6 shadow-2xl border transition-all ${
          isDark ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-black"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-4">
          <h3 className="font-bold text-lg">Trocar Contato</h3>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            Deixe seu e-mail para receber novidades ou falar comigo.
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium">E-mail enviado com sucesso!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-indigo-500"
                  : "bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-indigo-500"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: accentColor }}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {loading ? "Enviando..." : "Enviar Contato"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}