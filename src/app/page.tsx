"use client";

import { useState, useEffect } from "react";
import {
  UserPlus,
  QrCode,
  BadgeCheck,
  MapPin,
  ArrowUpRight,
  Building2,
  Share2,
  Printer,
  Briefcase,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { cardConfig } from "@/config/card.config";
import { downloadVCard } from "@/utils/vcard";
import { IconResolver } from "@/components/IconResolver";
import { QrCodeModal } from "@/components/QrCodeModal";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { useDominantColor } from "@/utils/useDominantColor";

export default function HomePage() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [clickStats, setClickStats] = useState<Record<string, number>>({});
  const [totalVisits, setTotalVisits] = useState(0);

  const { theme, profile, contact, links, projects, widgets, footer } = cardConfig;
  const isDark = theme.mode === "dark";

  const dynamicAccentColor = useDominantColor(profile.avatarUrl, theme.defaultAccent);

  useEffect(() => {
    const savedStats = localStorage.getItem("dcard_click_stats");
    if (savedStats) {
      try {
        setClickStats(JSON.parse(savedStats));
      } catch {
        setClickStats({});
      }
    }

    const visits = Number(localStorage.getItem("dcard_total_visits") || "0") + 1;
    localStorage.setItem("dcard_total_visits", visits.toString());
    setTotalVisits(visits);
  }, []);

  const handleLinkClick = (id: string) => {
    setClickStats((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("dcard_click_stats", JSON.stringify(updated));
      return updated;
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `Confira o cartão digital de ${profile.name} (${profile.role})`,
          url: window.location.href,
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      setIsQrOpen(true);
    }
  };

  return (
    <main
      className={`min-h-[100dvh] flex flex-col items-center justify-center p-3 sm:p-6 transition-colors ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-100 text-zinc-900"
      }`}
    >
      <div
        className={`relative w-full max-w-md rounded-[2rem] border p-6 sm:p-8 shadow-2xl transition-all ${
          isDark
            ? "bg-zinc-900/90 border-zinc-800/80 shadow-black/60 backdrop-blur-xl"
            : "bg-white border-zinc-200/80 shadow-zinc-300/40 backdrop-blur-xl"
        }`}
      >
        <div className="absolute top-5 right-5 flex items-center gap-1.5">
          <Link
            href="/print"
            aria-label="Gerar folha para impressão"
            title="Versão para Impressão"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
              isDark
                ? "bg-zinc-800/70 border-zinc-700/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200/70"
            }`}
          >
            <Printer className="w-4 h-4" />
          </Link>
          <button
            onClick={handleNativeShare}
            aria-label="Compartilhar Cartão"
            title="Compartilhar"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
              isDark
                ? "bg-zinc-800/70 border-zinc-700/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200/70"
            }`}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsQrOpen(true)}
            aria-label="Abrir QR Code"
            title="QR Code"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
              isDark
                ? "bg-zinc-800/70 border-zinc-700/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200/70"
            }`}
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mt-12">
          <div
            className="p-1 rounded-full mb-4 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${dynamicAccentColor}, transparent)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              crossOrigin="anonymous"
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 ${
                isDark ? "border-zinc-900" : "border-white"
              }`}
            />
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
            {profile.verified && (
              <BadgeCheck
                className="w-5 h-5 shrink-0"
                style={{ color: dynamicAccentColor }}
              />
            )}
          </div>

          <p
            className="text-sm font-semibold mt-1"
            style={{ color: dynamicAccentColor }}
          >
            {profile.role}
          </p>

          {(profile.company || profile.location) && (
            <div
              className={`flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-medium ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              {profile.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
              )}
            </div>
          )}

          <p
            className={`mt-4 text-sm leading-relaxed max-w-xs ${
              isDark ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            {profile.bio}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => downloadVCard(cardConfig)}
            style={{ backgroundColor: dynamicAccentColor }}
            className="w-full py-3.5 px-5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 hover:opacity-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            {contact.saveButtonText}
          </button>
        </div>

        {projects && projects.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Briefcase className="w-4 h-4" style={{ color: dynamicAccentColor }} />
              <h2 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Projetos em Destaque
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((proj, idx) => (
                <a
                  key={idx}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 rounded-2xl border transition-all block ${
                    isDark
                      ? "bg-zinc-800/20 border-zinc-800 hover:bg-zinc-800/60 hover:border-zinc-700"
                      : "bg-zinc-50/80 border-zinc-200/80 hover:bg-zinc-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                    {proj.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-2.5">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link.id)}
              style={
                link.highlight
                  ? { borderColor: `${dynamicAccentColor}66` }
                  : undefined
              }
              className={`group flex items-center justify-between w-full p-3.5 rounded-2xl border text-sm font-medium transition-all active:scale-98 ${
                isDark
                  ? "bg-zinc-800/40 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200"
                  : "bg-zinc-50 border-zinc-200/80 hover:bg-zinc-100 text-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-xl transition-colors ${
                    isDark ? "bg-zinc-800" : "bg-white shadow-xs"
                  }`}
                  style={
                    link.highlight ? { color: dynamicAccentColor } : undefined
                  }
                >
                  <IconResolver name={link.icon} className="w-4 h-4" />
                </span>
                <span>{link.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {clickStats[link.id] ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-700/50 text-zinc-300">
                    {clickStats[link.id]}
                  </span>
                ) : null}
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isDark ? "text-zinc-500" : "text-zinc-400"
                  }`}
                />
              </div>
            </a>
          ))}
        </div>

        <SpotifyEmbed url={widgets.spotifyUrl} isDark={isDark} />

        <div className="mt-8 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
          <span className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
            {footer.showBranding ? footer.text : ""}
          </span>
          {totalVisits > 0 && (
            <div className={`flex items-center gap-1 text-xs ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              <Eye className="w-3.5 h-3.5" />
              <span>{totalVisits} visitas</span>
            </div>
          )}
        </div>
      </div>

      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        name={profile.name}
        accentColor={dynamicAccentColor}
        isDark={isDark}
      />
    </main>
  );
}