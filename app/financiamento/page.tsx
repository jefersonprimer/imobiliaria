import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financiamento | Casarin & Fornari Imóveis",
  description:
    "Simule o financiamento do seu imóvel com Caixa, Banrisul ou Banco do Brasil. Tire suas dúvidas com a Casarin & Fornari.",
};

const bancos = [
  {
    name: "Caixa Econômica Federal",
    logo: "https://marcoslimaimoveis.com.br/images/financing/caixa.png",
    url: "https://simuladorhabitacao.caixa.gov.br/home",
  },
  {
    name: "Banrisul",
    logo: "https://marcoslimaimoveis.com.br/images/financing/banrisul.png",
    url: "https://www.banrisul.com.br/brz/link/brzwswhn.html?secao_id=1083",
  },
  {
    name: "Banco do Brasil",
    logo: "https://marcoslimaimoveis.com.br/images/financing/bancodobrasil.png",
    url: "https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx",
  },
];

const WHATSAPP_URL = "https://web.whatsapp.com/send/?phone=55996187401";

export default function FinanciamentoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-900 transition-colors"
              >
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li>
              <span className="font-medium text-neutral-900" aria-current="page">
                Financiamento
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Financiamento
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Escolha um banco e faça a sua simulação de financiamento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl">
          {bancos.map((banco) => (
            <a
              key={banco.name}
              href={banco.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-8 hover:border-red-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <div className="relative h-14 w-full">
                <Image
                  src={banco.logo}
                  alt={`Logo ${banco.name}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 group-hover:text-red-600 transition-colors">
                Simular
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-neutral-200 max-w-4xl">
          <p className="text-sm sm:text-base text-neutral-600 mb-4">
            Dúvidas? Entre em contato
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
