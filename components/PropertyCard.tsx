import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Maximize2, MapPin } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  /** Prefere exibir o preço desta finalidade (ex.: Locação na listagem /locacao) */
  preferredPurpose?: "Locação" | "Venda";
}

export default function PropertyCard({
  property,
  preferredPurpose,
}: PropertyCardProps) {
  const primaryPrice =
    (preferredPurpose &&
      property.prices.find((p) => p.label === preferredPurpose)) ||
    property.prices[0];

  // Miniaturas em /arquivos_imobiliaria/..._miniatura_* frequentemente retornam 404;
  // a galeria em /cdn/imovelImages/... costuma estar ok.
  const coverSrc = property.images?.[0] || property.cover;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
      {/* Imagem de Capa e Tags */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Image
          src={coverSrc}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white/95 backdrop-blur-xs">
            Cód: {property.code}
          </span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-col flex-1 p-5">
        {/* Localização */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span className="truncate">
            {property.address.neighborhood}, {property.address.city} -{" "}
            {property.address.state}
          </span>
        </div>

        {/* Título do Imóvel */}
        <h3 className="font-semibold text-neutral-900 text-base leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
          <Link
            href={`/imovel/${property.id}/${property.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {property.title}
          </Link>
        </h3>

        {/* Características Rápidas com Ícones */}
        <div className="grid grid-cols-4 gap-2 my-4 py-3 border-y border-neutral-100 text-neutral-600 text-xs">
          {property.features.bedrooms !== undefined && (
            <div
              className="flex flex-col items-center justify-center text-center gap-1"
              title={`${property.features.bedrooms} Dormitórios`}
            >
              <Bed className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-[11px]">
                {property.features.bedrooms} dorms
              </span>
            </div>
          )}

          {property.features.bathrooms !== undefined && (
            <div
              className="flex flex-col items-center justify-center text-center gap-1"
              title={`${property.features.bathrooms} Banheiros`}
            >
              <Bath className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-[11px]">
                {property.features.bathrooms} banh
              </span>
            </div>
          )}

          {property.features.parkingSpaces !== undefined && (
            <div
              className="flex flex-col items-center justify-center text-center gap-1"
              title={`${property.features.parkingSpaces} Vagas de Garagem`}
            >
              <Car className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-[11px]">
                {property.features.parkingSpaces} vagas
              </span>
            </div>
          )}

          {property.features.privateArea !== undefined && (
            <div
              className="flex flex-col items-center justify-center text-center gap-1"
              title={`Área Privativa: ${property.features.privateArea} m²`}
            >
              <Maximize2 className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-[11px]">
                {property.features.privateArea} m²
              </span>
            </div>
          )}
        </div>

        {/* Preço e Botão */}
        <div className="mt-auto flex items-end justify-between pt-1">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
              {primaryPrice.label}
            </span>
            <p className="text-lg font-bold text-neutral-900 tracking-tight">
              {primaryPrice.value}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
