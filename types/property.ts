export interface PropertyPrice {
  label: "Venda" | "Locação" | string;
  value: string;
  numericValue?: number | null;
}

export interface PropertyAddress {
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  googleMapsUrl?: string;
}

export interface PropertyFeatures {
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  privateArea?: number; // em m²
  totalArea?: number; // em m²
}

export interface Property {
  id: string;
  code: string;
  slug: string;
  title: string;
  category: "Apartamento" | "Casa" | "Terreno" | "Comercial" | string;
  purpose: ("Locação" | "Venda")[];
  purposeLabel: string;
  prices: PropertyPrice[];
  condoPrice?: string | null;
  iptuPrice?: string | null;
  address: PropertyAddress;
  features: PropertyFeatures;
  amenities: string[];
  description: string;
  cover: string;
  images: string[];
  featured?: boolean;
}
