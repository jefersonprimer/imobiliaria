"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Consentimento de Cookies"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] text-zinc-800">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-900">
              Preferências de privacidade
            </p>
            <p className="text-[12px] text-zinc-500 leading-relaxed">
              Utilizamos cookies para otimizar sua navegação e personalizar conteúdos
              de acordo com a LGPD.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-1"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleDecline}
            className="text-[11px] font-medium text-zinc-500 hover:text-zinc-800 px-3 py-1.5 rounded-md transition-colors"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="text-[11px] font-medium bg-zinc-900 text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-md transition-colors shadow-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
