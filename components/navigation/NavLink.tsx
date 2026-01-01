import Link from "next/link";

export default function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        active
          ? "text-primary font-semibold"
          : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
