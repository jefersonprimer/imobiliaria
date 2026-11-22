import Link from "next/link";
import {
  ChevronRight,
  Compass,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Users,
  Award,
  Focus,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Empresa | Casarin & Fornari Imóveis",
  description:
    "Conheça a história, a missão, a visão e os valores da Casarin & Fornari Imóveis — qualidade, inovação e comprometimento no mercado imobiliário.",
};

const valores = [
  { label: "Honestidade", icon: ShieldCheck },
  { label: "Profissionalismo", icon: Award },
  { label: "Valorização humana", icon: HeartHandshake },
  { label: "Trabalho em equipe", icon: Users },
  { label: "Foco na qualidade", icon: Focus },
];

export default function QuemSomosPage() {
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
                Sobre a Empresa
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Sobre a Empresa
          </h1>
          <div className="mt-6 space-y-5 text-sm sm:text-base text-neutral-600 leading-relaxed">
            <p>
              Somos a{" "}
              <strong className="font-semibold text-neutral-900">
                Casarin & Fornari Imóveis
              </strong>
              , Construções e Incorporações e estamos há mais de 45 anos no
              mercado imobiliário atuando com qualidade, inovação e
              comprometimento. Com o slogan{" "}
              <em className="text-neutral-800">
                “Uma empresa comprometida com o desenvolvimento”
              </em>
              , a Casarin & Fornari carrega em seu DNA o compromisso de criar,
              projetar e construir o futuro em conjunto com a sociedade, através
              de empreendimentos que prezam pela qualidade de vida da nossa
              comunidade.
            </p>
            <p>
              Nossas atividades se iniciaram em 1979, no município de Francisco
              Beltrão – PR já com a implantação de loteamentos, desenvolvendo a
              região. Na década de 1980, a empresa transferiu-se para Frederico
              Westphalen-RS e, em 1994, entrou no ramo de construção civil,
              participando ativamente no progresso e desenvolvimento do
              município.
            </p>
            <p>
              A história da Casarin & Fornari está entrelaçada com a história de
              FW, no desenvolvimento socioeconômico, na criação de
              empreendimentos e nos serviços de venda, locação e administração
              de imóveis. A Casarin & Fornari está na sua história!
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-red-600">
              <Compass className="w-5 h-5" />
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Missão
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Desenvolver soluções imobiliárias com qualidade e segurança,
              buscando satisfazer as necessidades dos nossos clientes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-red-600">
              <Eye className="w-5 h-5" />
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Visão
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Ser referência no mercado imobiliário, como uma empresa sólida,
              confiável e comprometida com o desenvolvimento e com seus
              clientes.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight mb-6">
            Valores
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm sm:text-base text-neutral-700"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
