import Link from "next/link";
import { MobileLink } from "@/components/navigation/MobileLink";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { Profile } from "@/types/Tables";

interface HeaderMobileProps {
  isOpen: boolean;
  profile: Profile | null;
  loading: boolean;
  pathname: string;
  onClose: () => void;
  onLogout: () => void;
}

export function HeaderMobile({
  isOpen,
  profile,
  loading,
  pathname,
  onClose,
  onLogout,
}: HeaderMobileProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-border shadow-2xl animate-in slide-in-from-top-2 p-4 flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        <MobileLink href="/" onClick={onClose} active={pathname === "/"}>
          Início
        </MobileLink>
        <MobileLink
          href="/devotionals"
          onClick={onClose}
          active={pathname.startsWith("/devotionals")}
        >
          Devocionais
        </MobileLink>
        <MobileLink
          href="/devotionals/subscribed"
          onClick={onClose}
          active={pathname.startsWith("/devotionals/subscribed")}
        >
          Devocionais Inscritos
        </MobileLink>
      </nav>

      <hr className="border-border" />

      {loading ? (
        <div className="h-10 bg-background animate-pulse rounded" />
      ) : profile ? (
        <>
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-foreground">{profile.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 text-error font-medium py-2 w-full hover:bg-error/10 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Sair da conta
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 border border-border rounded-lg text-muted hover:text-foreground"
          >
            <LogIn size={18} /> Entrar
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover"
          >
            <UserPlus size={18} /> Criar Conta
          </Link>
        </div>
      )}
    </div>
  );
}
