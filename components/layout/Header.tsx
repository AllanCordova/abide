"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { useUserSession } from "@/hooks/useUserSession";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile, loading, handleLogout } = useUserSession();
  const pathname = usePathname();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const onLogoutClick = async () => {
    const success = await handleLogout();
    if (success) closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={closeMenu}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            ABIDE
          </span>
        </Link>

        <HeaderDesktop
          profile={profile}
          loading={loading}
          pathname={pathname}
          onLogout={onLogoutClick}
        />

        <button
          className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <HeaderMobile
        isOpen={isMobileMenuOpen}
        profile={profile}
        loading={loading}
        pathname={pathname}
        onClose={closeMenu}
        onLogout={onLogoutClick}
      />
    </header>
  );
}
