"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, MapPin, KeyRound, BedDouble, RotateCcw } from "lucide-react";
import { Property } from "@/types/property";

interface HomeSearchFilterProps {
  properties: Property[];
  onFilterChange?: (filtered: Property[]) => void;
}

export default function HomeSearchFilter({
  properties,
  onFilterChange,
}: HomeSearchFilterProps) {
  const router = useRouter();

  // Abas principais: 'locacao' | 'venda' | 'codigo'
  const [activeTab, setActiveTab] = useState<"locacao" | "venda" | "codigo">("locacao");

  // Filtros de busca
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("");
  const [propertyCode, setPropertyCode] = useState<string>("");
  const [codePurpose, setCodePurpose] = useState<string>("todos");

  // Obter tipos únicos dos imóveis
  const propertyTypes = useMemo(() => {
    const types = new Set<string>();
    properties.forEach((p) => {
      if (p.category) types.add(p.category);
    });
    // Adicionar tipos padrões comuns de mercado imobiliário se não presentes
    ["Apartamento", "Casa", "Terreno", "Comercial", "Sobrado"].forEach((t) => types.add(t));
    return Array.from(types);
  }, [properties]);

  // Obter bairros únicos
  const neighborhoods = useMemo(() => {
    const hoods = new Set<string>();
    properties.forEach((p) => {
      if (p.address?.neighborhood) hoods.add(p.address.neighborhood);
    });
    ["Centro", "Itapagé", "Barril", "Ipiranga", "Jardim Primavera"].forEach((b) => hoods.add(b));
    return Array.from(hoods);
  }, [properties]);

  // Aplicar filtro nos imóveis exibidos na tela
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "codigo") {
      const codeTrimmed = propertyCode.trim();
      if (!codeTrimmed) return;

      const found = properties.find(
        (p) => p.code.toLowerCase() === codeTrimmed.toLowerCase() || p.id === codeTrimmed
      );

      if (found) {
        router.push(`/imovel/${found.id}/${found.slug}`);
        return;
      }

      // Se não encontrar direto, filtra pela string
      if (onFilterChange) {
        const filtered = properties.filter((p) => p.code.includes(codeTrimmed));
        onFilterChange(filtered);
      }
      return;
    }

    if (onFilterChange) {
      const purposeTarget = activeTab === "locacao" ? "Locação" : "Venda";

      const filtered = properties.filter((p) => {
        // Filtro por finalidade
        const matchesPurpose = p.purpose.includes(purposeTarget as "Locação" | "Venda");
        if (!matchesPurpose) return false;

        // Filtro por tipo
        if (selectedType && p.category.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }

        // Filtro por bairro
        if (
          selectedNeighborhood &&
          !p.address.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())
        ) {
          return false;
        }

        // Filtro por quartos
        if (selectedBedrooms) {
          const minBeds = parseInt(selectedBedrooms, 10);
          if ((p.features.bedrooms || 0) < minBeds) {
            return false;
          }
        }

        return true;
      });

      onFilterChange(filtered);
    }
  };

  const handleReset = () => {
    setSelectedType("");
    setSelectedNeighborhood("");
    setSelectedBedrooms("");
    setPropertyCode("");
    setCodePurpose("todos");
    if (onFilterChange) {
      onFilterChange(properties);
    }
  };

  const hasActiveFilters =
    Boolean(selectedType || selectedNeighborhood || selectedBedrooms || propertyCode);

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-20 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden">
        {/* Abas Superiores (Locação, Venda, Código) */}
        <div className="flex border-b border-neutral-200/80 bg-neutral-50/70">
          <button
            type="button"
            onClick={() => {
              setActiveTab("locacao");
              // Filtra automaticamente por locação se trocar a aba
              if (onFilterChange) {
                onFilterChange(properties.filter((p) => p.purpose.includes("Locação")));
              }
            }}
            className={`flex-1 sm:flex-none sm:min-w-[140px] py-3.5 px-6 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "locacao"
                ? "bg-white text-red-600 border-b-2 border-red-600 shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Locação
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("venda");
              if (onFilterChange) {
                onFilterChange(properties.filter((p) => p.purpose.includes("Venda")));
              }
            }}
            className={`flex-1 sm:flex-none sm:min-w-[140px] py-3.5 px-6 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "venda"
                ? "bg-white text-red-600 border-b-2 border-red-600 shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
            }`}
          >
            <Home className="w-4 h-4" />
            Venda
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("codigo")}
            className={`flex-1 sm:flex-none sm:min-w-[140px] py-3.5 px-6 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "codigo"
                ? "bg-white text-red-600 border-b-2 border-red-600 shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
            }`}
          >
            <Search className="w-4 h-4" />
            Código
          </button>
        </div>

        {/* Formulário de Busca */}
        <form onSubmit={handleSearch} className="p-5 sm:p-6 bg-white">
          {activeTab !== "codigo" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Tipo de Imóvel */}
              <div>
                <label
                  htmlFor="property-type"
                  className="block text-xs font-medium text-neutral-600 mb-1.5"
                >
                  Tipo de imóvel
                </label>
                <div className="relative">
                  <select
                    id="property-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors cursor-pointer"
                  >
                    <option value="">Todos os tipos</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bairro / Localização */}
              <div>
                <label
                  htmlFor="neighborhood"
                  className="block text-xs font-medium text-neutral-600 mb-1.5"
                >
                  Bairro
                </label>
                <div className="relative">
                  <select
                    id="neighborhood"
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors cursor-pointer"
                  >
                    <option value="">Todos os bairros</option>
                    {neighborhoods.map((bairro) => (
                      <option key={bairro} value={bairro}>
                        {bairro}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dormitórios */}
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-xs font-medium text-neutral-600 mb-1.5"
                >
                  Dormitórios
                </label>
                <select
                  id="bedrooms"
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms(e.target.value)}
                  className="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors cursor-pointer"
                >
                  <option value="">Quantos quartos?</option>
                  <option value="1">1+ dormitório</option>
                  <option value="2">2+ dormitórios</option>
                  <option value="3">3+ dormitórios</option>
                  <option value="4">4+ dormitórios</option>
                </select>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2.5 rounded-xl border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                    title="Limpar filtros"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Aba Busca por Código */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label
                  htmlFor="code-purpose"
                  className="block text-xs font-medium text-neutral-600 mb-1.5"
                >
                  Finalidade
                </label>
                <select
                  id="code-purpose"
                  value={codePurpose}
                  onChange={(e) => setCodePurpose(e.target.value)}
                  className="w-full appearance-none bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors cursor-pointer"
                >
                  <option value="todos">Locação ou Venda</option>
                  <option value="locacao">Locação</option>
                  <option value="venda">Venda</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="property-code"
                  className="block text-xs font-medium text-neutral-600 mb-1.5"
                >
                  Código do imóvel
                </label>
                <input
                  id="property-code"
                  type="text"
                  placeholder="Ex: 4908"
                  value={propertyCode}
                  onChange={(e) => setPropertyCode(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Buscar Código
                </button>

                {propertyCode && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2.5 rounded-xl border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                    title="Limpar busca"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
