"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { cardConfig } from "@/config/card.config";

export default function PrintPage() {
  const [pageUrl, setPageUrl] = useState("");
  const { profile } = cardConfig;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.origin);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const cardsCount = Array.from({ length: 10 }); // Gera 10 cartões para a folha A4

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold bg-white border border-zinc-300 px-4 py-2.5 rounded-xl shadow-sm hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Cartão
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir Folha (A4)
        </button>
      </div>

      <div className="w-full max-w-[210mm] bg-white p-6 rounded-2xl shadow-xl print:shadow-none print:p-0 print:m-0">
        <div className="grid grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
          {cardsCount.map((_, index) => (
            <div
              key={index}
              className="border border-dashed border-zinc-400 p-4 rounded-xl flex items-center justify-between gap-4 bg-white break-inside-avoid print:border-zinc-300 print:p-3"
              style={{ height: "45mm" }}
            >
              <div className="flex flex-col justify-between h-full py-1">
                <div>
                  <h2 className="font-bold text-sm text-zinc-900 leading-tight">
                    {profile.name}
                  </h2>
                  <p className="text-[11px] font-medium text-indigo-600 mt-0.5">
                    {profile.role}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 max-w-[140px]">
                    {profile.bio}
                  </p>
                </div>
                <span className="text-[9px] text-zinc-400 font-mono">
                  {pageUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                <QRCodeSVG
                  value={pageUrl || "https://example.com"}
                  size={75}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  level="M"
                />
                <span className="text-[8px] text-zinc-500 mt-1 font-semibold uppercase tracking-wider">
                  Escaneie
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}