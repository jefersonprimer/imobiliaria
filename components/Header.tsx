"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Locação", href: "/locacao" },
  { name: "Venda", href: "/venda" },
  { name: "Empreendimentos", href: "/empreendimentos" },
  { name: "Sobre a Empresa", href: "/quemsomos" },
  { name: "Nossos Serviços", href: "/nossosservicos" },
  { name: "Financiamento", href: "/financiamento" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-neutral-700 rounded-md"
          >
            <Image
              src="/logo-name.png"
              alt="Casarin & Fornari Imóveis"
              width={180}
              height={56}
              priority
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navigationLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-[13px] tracking-tight font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="lg:hidden border-t border-neutral-800/80 bg-neutral-950 px-5 py-4 space-y-1 shadow-xl animate-in fade-in duration-150"
        >
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
