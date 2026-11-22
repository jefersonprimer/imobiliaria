"use client";

import React, { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import HomeSearchFilter from "@/components/HomeSearchFilter";
import propertiesData from "@/data/data.json";
import { Property } from "@/types/property";
import { ShieldCheck, Home as HomeIcon, Award, SearchX } from "lucide-react";

export default function Home() {
  const allProperties = propertiesData as Property[];
  const [displayedProperties, setDisplayedProperties] =
    useState<Property[]>(allProperties);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-neutral-950 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d91c24_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Seu sonho, nosso compromisso
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Casarin e Fornari é o portal exclusivo de venda e aluguel de
            imóveis. Temos uma grande variedade de casas, apartamentos, imóveis
            comerciais e muito mais. Encontre sua próxima casa na Casarin e
            Fornari.
          </p>
        </div>
      </section>

      {/* Caixa de Filtros da Home (Mesmo padrão do Marcos Lima) */}
      <HomeSearchFilter
        properties={allProperties}
        onFilterChange={(filtered) => setDisplayedProperties(filtered)}
      />

      {/* Grid de Imóveis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-neutral-200/80 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-red-600">
              Imóveis Selecionados
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Destaques para você
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Exibindo <strong>{displayedProperties.length}</strong> de{" "}
            <strong>{allProperties.length}</strong> imóveis
          </p>
        </div>

        {/* Lista de Imóveis ou Estado Vazio */}
        {displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto space-y-3">
            <SearchX className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-semibold text-neutral-900 text-base">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-xs text-neutral-500">
              Não encontramos imóveis para os filtros selecionados. Tente
              alterar os critérios ou limpar a busca.
            </p>
            <button
              type="button"
              onClick={() => setDisplayedProperties(allProperties)}
              className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 underline cursor-pointer"
            >
              Ver todos os imóveis
            </button>
          </div>
        )}
      </section>

      {/* Diferenciais da Imobiliária */}
      <section className="bg-white border-y border-neutral-200/80 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-base mb-1">
                Segurança Jurídica
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Documentação analisada rigorosamente para garantir uma
                negociação 100% segura para ambas as partes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600 shrink-0">
              <HomeIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-base mb-1">
                Avaliação Precisa
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Conhecimento aprofundado do mercado imobiliário regional para
                definir o valor real e justo do seu imóvel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-base mb-1">
                Atendimento Personalizado
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Equipe dedicada a entender suas necessidades e encontrar o
                imóvel que se encaixa no seu momento de vida.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
