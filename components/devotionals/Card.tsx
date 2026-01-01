import { Devotional } from "@/types/Tables";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { getProfileById } from "@/lib/auth";

interface DevotionalCardProps {
  data: Devotional;
}

export async function DevotionalCard({ data }: DevotionalCardProps) {
  const { title, description, slug, created_at, image_url } = data;

  const response = await getProfileById(data.author_id);

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("pt-BR")
    : null;

  const authorName = response.data.name;

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-lg hover:border-primary/50 transition-colors duration-300 group overflow-hidden">
      {image_url && (
        <div className="relative w-full h-48 bg-muted/10">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-fluid flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3 text-fluid-sm text-muted">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1 text-primary/80">
            <User size={14} /> {authorName}
          </span>
        </div>

        <Link href={`/devotionals/${slug}`}>
          <h3 className="text-fluid-lg font-poppins font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>
        </Link>

        <p className="text-fluid-base text-muted mb-6 line-clamp-3">
          {description}
        </p>

        <Link
          href={`/devotionals/${slug}`}
          className="mt-auto inline-flex justify-center items-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded hover:bg-primary-hover transition-colors"
        >
          Ler Devocional
        </Link>
      </div>
    </div>
  );
}
