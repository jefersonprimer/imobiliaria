import Link from "next/link";
import Image from "next/image";
import { Phone, Clock } from "lucide-react";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const currentYear = await getCurrentYear();

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Coluna 1: Marca & Apresentação */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/logo-name.png"
                alt="Casarin & Fornari Imóveis"
                width={190}
                height={60}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Soluções completas e atendimento personalizado para compra, venda e locação de imóveis com transparência, segurança e tranquilidade.
            </p>

            {/* Redes Sociais */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/CasarinFornari/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Casarin & Fornari"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#0866FF] hover:border-[#0866FF]/40 hover:bg-neutral-800 transition-all"
                title="Facebook"
              >
                <svg
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <title>Facebook</title>
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send?phone=%2B5555996187401&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3OTU0NDIyMjIsInBob25lIjoiKzU1NTU5OTYxODc0MDEiLCJjb250ZXh0IjoiQWZqTFdCQ1IzMFVoWmFMSENkR1BJVXZqTXFJNjljNFQ5WElsNDNpNkE2Q19DMEVLdUh5T3pNSkF4Wl9uaEoyblprWW9PNmg1alc4bXduTlkxRDNHLUFKcDJoaDBxQ1N4cWNmeTVKZ25oTnpsbEp4WFZzM1ZVMGJmMEs5bTdBdk00VFJ4alFFdUVMQ2VvdVRqd3daMDdWLTRWQSIsInNvdXJjZSI6IkZCX1BhZ2UiLCJhcHAiOiJmYWNlYm9vayIsImVudHJ5X3BvaW50IjoicGFnZV9jdGEifQ.lCQjy5HftiQbXBEeW7tmon1PpiFcqpl_SjVJiwpAXqmDJsIVyLPFYwhMrfDQZ1FoZWC21UWlMSRL0JMT0ibgbA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Casarin & Fornari"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-neutral-800 transition-all"
                title="WhatsApp"
              >
                <svg
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/casarinfornari_imoveis/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Casarin & Fornari"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FF0069] hover:border-[#FF0069]/40 hover:bg-neutral-800 transition-all"
                title="Instagram"
              >
                <svg
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <title>Instagram</title>
                  <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/locacao" className="hover:text-white transition-colors">
                  Locação
                </Link>
              </li>
              <li>
                <Link href="/venda" className="hover:text-white transition-colors">
                  Venda
                </Link>
              </li>
              <li>
                <Link href="/empreendimentos" className="hover:text-white transition-colors">
                  Empreendimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/quemsomos" className="hover:text-white transition-colors">
                  Sobre a Empresa
                </Link>
              </li>
              <li>
                <Link href="/nossosservicos" className="hover:text-white transition-colors">
                  Nossos Serviços
                </Link>
              </li>
              <li>
                <Link href="/financiamento" className="hover:text-white transition-colors">
                  Financiamento
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Contato */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=%2B5555996187401&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3OTU0NDIyMjIsInBob25lIjoiKzU1NTU5OTYxODc0MDEiLCJjb250ZXh0IjoiQWZqTFdCQ1IzMFVoWmFMSENkR1BJVXZqTXFJNjljNFQ5WElsNDNpNkE2Q19DMEVLdUh5T3pNSkF4Wl9uaEoyblprWW9PNmg1alc4bXduTlkxRDNHLUFKcDJoaDBxQ1N4cWNmeTVKZ25oTnpsbEp4WFZzM1ZVMGJmMEs5bTdBdk00VFJ4alFFdUVMQ2VvdVRqd3daMDdWLTRWQSIsInNvdXJjZSI6IkZCX1BhZ2UiLCJhcHAiOiJmYWNlYm9vayIsImVudHJ5X3BvaW50IjoicGFnZV9jdGEifQ.lCQjy5HftiQbXBEeW7tmon1PpiFcqpl_SjVJiwpAXqmDJsIVyLPFYwhMrfDQZ1FoZWC21UWlMSRL0JMT0ibgbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (55) 99618-7401
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=5555997100310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (55) 99710-0310
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 text-neutral-400 text-xs">
                <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
                <span>
                  Seg. a Sex. 08:30 - 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória & Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {currentYear} Casarin & Fornari Imóveis. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/termos" className="hover:text-neutral-300 transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-neutral-300 transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
