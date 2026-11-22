"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertyListingFilter from "@/components/PropertyListingFilter";
import propertiesData from "@/data/data.json";
import { Property } from "@/types/property";
import { ChevronRight, SearchX } from "lucide-react";

export default function VendaPage() {
  const saleProperties = useMemo(
    () =>
      (propertiesData as Property[]).filter((p) => p.purpose.includes("Venda")),
    []
  );

  const [displayedProperties, setDisplayedProperties] =
    useState<Property[]>(saleProperties);

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
                Venda
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <PropertyListingFilter
            properties={saleProperties}
            purpose="Venda"
            onFilter={setDisplayedProperties}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-end justify-between mb-6 gap-4">
              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                Resultados
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                Exibindo <strong>{displayedProperties.length}</strong> de{" "}
                <strong>{saleProperties.length}</strong> imóveis
              </p>
            </div>

            {displayedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    preferredPurpose="Venda"
                  />
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
                  onClick={() => setDisplayedProperties(saleProperties)}
                  className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 underline cursor-pointer"
                >
                  Ver todos os imóveis à venda
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
