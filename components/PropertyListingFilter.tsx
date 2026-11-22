"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ListFilter, RotateCcw, Search, X } from "lucide-react";
import { Property } from "@/types/property";

export type ListingFilterState = {
  code: string;
  category: string;
  city: string;
  priceMin: string;
  priceMax: string;
  amenities: string[];
  bedrooms: string;
  suites: string;
  bathrooms: string;
  parkingSpaces: string;
};

const BOOLEAN_AMENITIES = [
  "MOBILIADO(A)",
  "SEMIMOBILIADO",
  "LAVANDERIA",
  "LAVABO",
] as const;

const QUANTITY_FEATURES = [
  { key: "bedrooms" as const, label: "DORMITÓRIO(S)" },
  { key: "suites" as const, label: "SUÍTE(S)" },
  { key: "bathrooms" as const, label: "BANHEIRO(S)" },
  { key: "parkingSpaces" as const, label: "VAGA(S) DE GARAGEM" },
];

const EMPTY_FILTERS: ListingFilterState = {
  code: "",
  category: "",
  city: "",
  priceMin: "",
  priceMax: "",
  amenities: [],
  bedrooms: "",
  suites: "",
  bathrooms: "",
  parkingSpaces: "",
};

export type ListingPurpose = "Locação" | "Venda";

interface PropertyListingFilterProps {
  properties: Property[];
  /** Quando omitido, não filtra por finalidade (ex.: empreendimentos). */
  purpose?: ListingPurpose;
  onFilter: (filtered: Property[]) => void;
}

function parseMoneyInput(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(/\./g, "").replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

function hasAmenity(property: Property, label: string): boolean {
  const target = label.toLowerCase().replace(/\(a\)|\(s\)/gi, "").trim();
  return property.amenities.some((a) => {
    const current = a.toLowerCase().replace(/\(a\)|\(s\)/gi, "").trim();
    return current.includes(target) || target.includes(current);
  });
}

function getPurposePrice(property: Property, purpose?: ListingPurpose) {
  if (purpose) {
    return (
      property.prices.find((p) => p.label === purpose) || property.prices[0]
    );
  }
  return property.prices[0];
}

export function applyListingFilters(
  properties: Property[],
  filters: ListingFilterState,
  purpose?: ListingPurpose
): Property[] {
  const min = parseMoneyInput(filters.priceMin);
  const max = parseMoneyInput(filters.priceMax);
  const code = filters.code.trim().toLowerCase();

  return properties.filter((p) => {
    if (purpose && !p.purpose.includes(purpose)) return false;

    if (code && !p.code.toLowerCase().includes(code) && p.id !== code) {
      return false;
    }

    if (filters.category && p.category !== filters.category) {
      return false;
    }

    if (filters.city && p.address.city !== filters.city) {
      return false;
    }

    const price = getPurposePrice(p, purpose);
    const numeric = price?.numericValue ?? null;
    if (min !== null && (numeric === null || numeric < min)) return false;
    if (max !== null && (numeric === null || numeric > max)) return false;

    for (const amenity of filters.amenities) {
      if (!hasAmenity(p, amenity)) return false;
    }

    const qtyChecks: Array<[keyof Property["features"], string]> = [
      ["bedrooms", filters.bedrooms],
      ["suites", filters.suites],
      ["bathrooms", filters.bathrooms],
      ["parkingSpaces", filters.parkingSpaces],
    ];

    for (const [featureKey, raw] of qtyChecks) {
      if (!raw) continue;
      const needed = Number(raw);
      if (!Number.isFinite(needed)) continue;
      if ((p.features[featureKey] || 0) < needed) return false;
    }

    return true;
  });
}

function countActiveFilters(filters: ListingFilterState): number {
  let count = 0;
  if (filters.code) count += 1;
  if (filters.category) count += 1;
  if (filters.city) count += 1;
  if (filters.priceMin) count += 1;
  if (filters.priceMax) count += 1;
  count += filters.amenities.length;
  if (filters.bedrooms) count += 1;
  if (filters.suites) count += 1;
  if (filters.bathrooms) count += 1;
  if (filters.parkingSpaces) count += 1;
  return count;
}

export default function PropertyListingFilter({
  properties,
  purpose,
  onFilter,
}: PropertyListingFilterProps) {
  const [filters, setFilters] = useState<ListingFilterState>(EMPTY_FILTERS);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  const categories = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [properties]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.address?.city) set.add(p.address.city);
    });
    return Array.from(set).sort();
  }, [properties]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const update = <K extends keyof ListingFilterState>(
    key: K,
    value: ListingFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (label: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(label);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== label)
          : [...prev.amenities, label],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(applyListingFilters(properties, filters, purpose));
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    onFilter(properties);
  };

  const activeCount = countActiveFilters(filters);
  const hasActiveFilters = activeCount > 0;

  const fieldClass =
    "w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors";

  const renderFilterFields = (idPrefix: string) => (
    <>
      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-code`}
          className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
        >
          Código do imóvel
        </label>
        <input
          id={`${idPrefix}-code`}
          type="text"
          inputMode="numeric"
          placeholder="Ex: 1823"
          value={filters.code}
          onChange={(e) => update("code", e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-type`}
          className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
        >
          Tipo de imóvel
        </label>
        <select
          id={`${idPrefix}-type`}
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className={`${fieldClass} cursor-pointer`}
        >
          <option value="">TODOS</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-city`}
          className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
        >
          Cidade
        </label>
        <select
          id={`${idPrefix}-city`}
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          className={`${fieldClass} cursor-pointer`}
        >
          <option value="">TODAS</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor={`${idPrefix}-price-min`}
            className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
          >
            Valor mínimo
          </label>
          <input
            id={`${idPrefix}-price-min`}
            type="text"
            inputMode="decimal"
            placeholder="R$ 0"
            value={filters.priceMin}
            onChange={(e) => update("priceMin", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor={`${idPrefix}-price-max`}
            className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
          >
            Valor máximo
          </label>
          <input
            id={`${idPrefix}-price-max`}
            type="text"
            inputMode="decimal"
            placeholder="R$ 0"
            value={filters.priceMax}
            onChange={(e) => update("priceMax", e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-3 pt-1 border-t border-neutral-100">
        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 pt-2">
          Características
        </h3>

        <div className="space-y-2">
          {BOOLEAN_AMENITIES.map((label) => (
            <label
              key={label}
              className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(label)}
                onChange={() => toggleAmenity(label)}
                className="size-3.5 rounded border-neutral-300 text-red-600 focus:ring-red-500/30 cursor-pointer"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="space-y-3 pt-1">
          {QUANTITY_FEATURES.map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <label
                htmlFor={`${idPrefix}-${key}`}
                className="block text-[11px] font-medium text-neutral-600"
              >
                {label}
              </label>
              <select
                id={`${idPrefix}-${key}`}
                value={filters[key]}
                onChange={(e) => update(key, e.target.value)}
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const sheet =
    mounted &&
    createPortal(
      <div
        className={`lg:hidden fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: true } : {})}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Fechar filtros"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-300 cursor-pointer ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex shrink-0 flex-col items-center border-b border-neutral-100 px-5 pb-3 pt-3">
            <div className="mb-3 h-1 w-10 rounded-full bg-neutral-300" aria-hidden />
            <div className="flex w-full items-center justify-between gap-3">
              <h2
                id={titleId}
                className="text-sm font-semibold text-neutral-900"
              >
                Filtros
              </h2>
              <div className="flex items-center gap-1">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Limpar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar"
                  className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-4">
              {renderFilterFields("sheet")}
            </div>

            <div className="shrink-0 border-t border-neutral-100 bg-white px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Filtrar imóveis
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden w-full">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-xs transition-colors hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer"
        >
          <ListFilter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <span className="inline-flex min-w-5 items-center justify-center rounded-md bg-red-600 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-full lg:w-72 xl:w-80 shrink-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-neutral-200/80 rounded-2xl shadow-xs p-5 space-y-5 sticky top-24"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-neutral-900">Busca</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar
              </button>
            )}
          </div>

          {renderFilterFields("desktop")}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Filtrar imóveis
          </button>
        </form>
      </aside>

      {sheet}
    </>
  );
}
