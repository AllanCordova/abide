import Link from "next/link";

export function MobileLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base font-medium py-2 px-2 rounded-md transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted hover:bg-background hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
