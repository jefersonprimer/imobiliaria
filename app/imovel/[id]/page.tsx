import { redirect, notFound } from "next/navigation";
import propertiesData from "@/data/data.json";
import { Property } from "@/types/property";

interface PropertyDirectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return (propertiesData as Property[]).map((p) => ({ id: p.id }));
}

export default async function PropertyDirectPage({ params }: PropertyDirectPageProps) {
  const { id } = await params;
  const property = (propertiesData as Property[]).find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  redirect(`/imovel/${property.id}/${property.slug}`);
}
