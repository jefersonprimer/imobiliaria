"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  ZoomIn,
} from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  cover: string;
}

export default function PropertyGallery({
  images,
  title,
  cover,
}: PropertyGalleryProps) {
  // Garante que a cover sempre esteja na lista
  const allImages = (() => {
    const list = images.length > 0 ? images : [cover];
    if (!list.includes(cover) && cover) return [cover, ...list];
    return list;
  })();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  }, [allImages.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));
  }, [allImages.length]);

  // Scroll thumbnail into view when activeIndex changes
  useEffect(() => {
    if (!lightboxOpen) return;
    const container = thumbnailRef.current;
    if (!container) return;
    const thumb = container.children[activeIndex] as HTMLElement | undefined;
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex, lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, prev, next, closeLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const heroImage = allImages[0];
  const gridImages = allImages.slice(1, 5);
  const remaining = allImages.length - 5;

  return (
    <>
      {/* ── GRID HERO ── */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[340px] sm:h-[420px] md:h-[500px] mb-10 rounded-2xl overflow-hidden">
        {/* Imagem principal – ocupa 2 colunas e 2 linhas */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-4 md:col-span-2 row-span-2 relative group cursor-zoom-in focus:outline-none"
          aria-label="Abrir galeria de fotos"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Overlay escuro suave no hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="inline-flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              <ZoomIn className="w-3.5 h-3.5" />
              Ampliar
            </span>
          </div>
        </button>

        {/* 4 imagens secundárias no grid direito */}
        {gridImages.map((imgUrl, idx) => {
          const isLast = idx === 3;
          const hasMore = isLast && remaining > 0;

          return (
            <button
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="hidden md:block relative group cursor-zoom-in focus:outline-none overflow-hidden"
              aria-label={`Foto ${idx + 2} de ${allImages.length}`}
            >
              <Image
                src={imgUrl}
                alt={`${title} – foto ${idx + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Badge "Ver todas" na última miniatura */}
              {hasMore && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 backdrop-blur-[2px]">
                  <Images className="w-6 h-6 text-white mb-1.5" />
                  <span className="text-white font-semibold text-sm">
                    +{remaining + 1} fotos
                  </span>
                </div>
              )}
            </button>
          );
        })}

        {/* Se houver menos de 4 imagens secundárias, preenche slots vazios */}
        {Array.from({ length: Math.max(0, 4 - gridImages.length) }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden md:block bg-neutral-100"
            />
          )
        )}
      </div>

      {/* Botão mobile "Ver todas as fotos" */}
      {allImages.length > 1 && (
        <div className="md:hidden flex justify-center -mt-6 mb-8">
          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-lg hover:bg-neutral-700 transition-colors"
          >
            <Images className="w-4 h-4" />
            Ver todas as {allImages.length} fotos
          </button>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/70 text-sm font-medium">
              {activeIndex + 1} / {allImages.length}
            </span>
            <span className="text-white text-sm font-semibold truncate max-w-xs text-center">
              {title}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar galeria"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Imagem principal */}
          <div className="relative flex-1 flex items-center justify-center min-h-0 px-12">
            {/* Seta esquerda */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Imagem */}
            <div className="relative w-full h-full max-w-5xl">
              <Image
                key={activeIndex}
                src={allImages[activeIndex]}
                alt={`${title} – foto ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Seta direita */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="shrink-0 px-4 pb-4 pt-3">
            <div
              ref={thumbnailRef}
              className="flex gap-2 overflow-x-auto scrollbar-none pb-1 justify-start"
              style={{ scrollbarWidth: "none" }}
            >
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 focus:outline-none ${
                    idx === activeIndex
                      ? "border-white scale-105 shadow-lg"
                      : "border-transparent opacity-55 hover:opacity-85 hover:border-white/40"
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                  aria-pressed={idx === activeIndex}
                >
                  <Image
                    src={imgUrl}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
