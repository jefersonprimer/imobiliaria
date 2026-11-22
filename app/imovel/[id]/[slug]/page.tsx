import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  CheckCircle2,
  Phone,
  Share2,
  ChevronLeft,
} from "lucide-react";
import propertiesData from "@/data/data.json";
import { Property } from "@/types/property";
import PropertyGallery from "@/components/PropertyGallery";

interface PropertyPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return (propertiesData as Property[]).map((p) => ({
    id: p.id,
    slug: p.slug,
  }));
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  const property = (propertiesData as Property[]).find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const primaryPrice = property.prices[0];
  const secondaryPrice = property.prices[1];

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no imóvel Cód: ${property.code} (${property.title}) no valor de ${primaryPrice.value}. Poderia me passar mais informações?`,
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=5555996187401&text=${whatsappMessage}`;

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação / Voltar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-red-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar para imóveis
          </Link>
          <span className="text-xs text-neutral-400 font-mono">
            Código:{" "}
            <strong className="text-neutral-700">{property.code}</strong>
          </span>
        </div>

        {/* Título & Localização */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-red-600 text-white">
                {property.purposeLabel}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-neutral-200 text-neutral-700">
                {property.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {property.title}
            </h1>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 mt-1.5">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              {property.address.street}
              {property.address.complement &&
                ` - ${property.address.complement}`}
              , {property.address.neighborhood}, {property.address.city} -{" "}
              {property.address.state}
            </p>
          </div>

          {/* Bloco de Preço */}
          <div className="lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-none border-neutral-200">
            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
              {primaryPrice.label}
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-950">
              {primaryPrice.value}
            </div>
            {secondaryPrice && (
              <span className="text-xs text-neutral-500 block mt-0.5">
                {secondaryPrice.label}:{" "}
                <strong className="text-neutral-700">
                  {secondaryPrice.value}
                </strong>
              </span>
            )}
            <div className="flex items-center lg:justify-end gap-3 text-xs text-neutral-500 mt-1">
              {property.condoPrice && <span>Cond.: {property.condoPrice}</span>}
              {property.iptuPrice && <span>IPTU: {property.iptuPrice}</span>}
            </div>
          </div>
        </div>

        {/* Galeria de Fotos */}
        <PropertyGallery
          images={property.images}
          title={property.title}
          cover={property.cover}
        />

        {/* Grid Principal: Detalhes + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Informações detalhadas */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cards de Características */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Características Principais
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-700">
                {property.features.bedrooms !== undefined && (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                    <Bed className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <span className="block text-xs text-neutral-500">
                        Dormitórios
                      </span>
                      <strong className="text-sm font-semibold text-neutral-900">
                        {property.features.bedrooms} ({property.features.suites}{" "}
                        suítes)
                      </strong>
                    </div>
                  </div>
                )}

                {property.features.bathrooms !== undefined && (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                    <Bath className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <span className="block text-xs text-neutral-500">
                        Banheiros
                      </span>
                      <strong className="text-sm font-semibold text-neutral-900">
                        {property.features.bathrooms} banheiros
                      </strong>
                    </div>
                  </div>
                )}

                {property.features.parkingSpaces !== undefined && (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                    <Car className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <span className="block text-xs text-neutral-500">
                        Garagem
                      </span>
                      <strong className="text-sm font-semibold text-neutral-900">
                        {property.features.parkingSpaces} vagas
                      </strong>
                    </div>
                  </div>
                )}

                {property.features.privateArea !== undefined && (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <span className="block text-xs text-neutral-500">
                        Área Privativa
                      </span>
                      <strong className="text-sm font-semibold text-neutral-900">
                        {property.features.privateArea} m²
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Sobre este Imóvel
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Comodidades */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Comodidades & Infraestrutura
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar de Contato */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-lg space-y-5">
              <h3 className="font-semibold text-neutral-900 text-lg">
                Ficou interessado?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Fale agora com os corretores da Casarin & Fornari e tire suas
                dúvidas ou agende uma visita presencial.
              </p>

              {/* Botão WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all hover:scale-[1.02]"
              >
                <svg
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>

              {/* Botões de ligação direta */}
              <div className="pt-2 border-t border-neutral-100 space-y-2">
                <span className="text-xs text-neutral-400 block mb-1">
                  Ou ligue diretamente:
                </span>
                <a
                  href="tel:+5555996187401"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <span>(55) 99618-7401</span>
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                </a>
                <a
                  href="tel:+5555997100310"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <span>(55) 99710-0310</span>
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
