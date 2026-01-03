import Link from "next/link";
import NavLink from "@/components/navigation/NavLink";
import { LogOut } from "lucide-react";
import { Profile } from "@/types/Tables";

interface HeaderDesktopProps {
  profile: Profile | null;
  loading: boolean;
  pathname: string;
  onLogout: () => void;
}

export function HeaderDesktop({
  profile,
  loading,
  pathname,
  onLogout,
}: HeaderDesktopProps) {
  return (
    <>
      <nav className="hidden md:flex items-center gap-6">
        <NavLink href="/" active={pathname === "/"}>
          Início
        </NavLink>
        <NavLink
          href="/devotionals"
          active={pathname.startsWith("/devotionals")}
        >
          Devocionais
        </NavLink>
        <NavLink
          href="/devotionals/subscribed"
          active={pathname.startsWith("/devotionals/subscribed")}
        >
          Devocionais Inscritos
        </NavLink>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {loading ? (
          <div className="h-8 w-24 bg-surface animate-pulse rounded" />
        ) : profile ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted flex items-center gap-2">
              Olá,{" "}
              <span className="text-foreground font-medium">
                {profile.name}
              </span>
            </span>
            <button
              onClick={onLogout}
              className="text-muted hover:text-error transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              Começar
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
