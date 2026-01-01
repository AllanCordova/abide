export default function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all"
    >
      {icon}
    </a>
  );
}
