import Link from "next/link";
import {
  ChevronRight,
  KeyRound,
  Home,
  Building2,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossos Serviços | Casarin & Fornari Imóveis",
  description:
    "Conheça os serviços da Casarin & Fornari Imóveis: locação, venda, construção e incorporação, e o programa Jovem Aprendiz.",
};

const servicos = [
  {
    id: "locacao",
    title: "Locação de imóveis",
    icon: KeyRound,
    paragraphs: [
      "Somos referência no aluguel de imóveis comerciais e residenciais, atuando no mercado imobiliário há mais de 40 anos. Nossa equipe está preparada para encontrar o melhor custo-benefício para você alugar. São centenas de opções de imóveis para atender a sua necessidade e desejo. Na locação do seu imóvel, você conta com suporte de profissionais especializados, trabalho que inclui contrato, vistoria, assessoria, divulgação, além da garantia e pontualidade no pagamento.",
    ],
  },
  {
    id: "venda",
    title: "Venda de imóveis",
    icon: Home,
    paragraphs: [
      "Possuímos a maior carteira de imóveis à venda em Frederico Westphalen e região. Casas, apartamentos prontos e na planta, lotes urbanos e rurais, salas comerciais e pavilhões são algumas das opções disponíveis na imobiliária. Nosso time de corretores é especializado e com vasta experiência no mercado imobiliário para você realizar um bom negócio, com segurança e tranquilidade. Seja para comprar ou vender um imóvel, nossa equipe busca fechar a melhor negociação, com processos seguros e transparentes, construindo seu futuro junto com você.",
    ],
  },
  {
    id: "construcao",
    title: "Construção e Incorporação",
    icon: Building2,
    paragraphs: [
      "O conjunto de experiência, integridade nos negócios, alto padrão de execução e profissionais qualificados consolida a Casarin & Fornari como referência em engenharia e construção. Para nós, construir é um privilégio e a chance de criar algo importante para a sociedade. Por isso, somos determinados a criar empreendimentos que encantem e surpreendam os clientes.",
      "O padrão Casarin & Fornari também se mantém na administração de obras, garantindo a execução de projetos de arquitetura e engenharia com excelência.",
    ],
  },
  {
    id: "jovem-aprendiz",
    title: "Jovem Aprendiz",
    icon: GraduationCap,
    paragraphs: [
      "Através da nossa parceria com o Programa Jovem Aprendiz CIEE, contribuímos com a inserção de adolescentes e jovens no mercado de trabalho. Com o programa, colaboramos com a formação pessoal e profissional do jovem, desenvolvendo habilidades e competências, potencializando a construção dos projetos de vida e empregabilidade.",
    ],
  },
];

export default function NossosServicosPage() {
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
                Nossos Serviços
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Nossos serviços
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            A{" "}
            <strong className="font-semibold text-neutral-900">
              Casarin & Fornari Imóveis
            </strong>
            , Construções e Incorporações atua nos seguintes segmentos:
          </p>
        </div>

        <div className="space-y-12 max-w-3xl">
          {servicos.map(({ id, title, icon: Icon, paragraphs }) => (
            <article key={id} id={id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  {title}
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed pl-0 sm:pl-[3.25rem]">
                {paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
