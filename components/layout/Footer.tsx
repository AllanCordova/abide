import Link from "next/link";
import { BookOpen, Instagram, Twitter, Mail, Heart } from "lucide-react";
import SocialLink from "../utils/SocialLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      {/* --- Parte Principal (Grid) --- */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Marca e Missão */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                ABIDE
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Uma plataforma dedicada ao seu crescimento espiritual diário.
              Permaneça na palavra, encontre paz e fortaleça sua fé através de
              devocionais constantes.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
              Plataforma
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/devotionals"
                  className="hover:text-primary transition-colors"
                >
                  Devocionais Diários
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className="hover:text-primary transition-colors"
                >
                  Planos de Leitura
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Legal e Suporte */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a
                  href="mailto:suporte@abide.com"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Barra Inferior (Copyright) --- */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Texto Copy */}
          <div className="text-sm text-muted flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center md:text-left">
            <span>
              &copy; {currentYear} Abide App. Todos os direitos reservados.
            </span>
            <span className="hidden md:inline text-border">|</span>
            <span className="flex items-center gap-1">
              Feito para edificação.
            </span>
          </div>

          {/* Redes Sociais */}
          <div className="flex items-center gap-4">
            <SocialLink
              href="#"
              icon={<Instagram size={18} />}
              label="Instagram"
            />
            <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink
              href="mailto:contato@abide.com"
              icon={<Mail size={18} />}
              label="Email"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
