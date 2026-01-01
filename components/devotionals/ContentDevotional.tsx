import { Devotional } from "@/types/Tables";
import { Calendar, User, Clock } from "lucide-react";

interface ContentDevotionalProps {
  devotional: Devotional;
  authorName: string;
}

export function ContentDevotional({
  devotional,
  authorName,
}: ContentDevotionalProps) {
  // Lógica de apresentação encapsulada aqui
  const formattedDate = devotional.created_at
    ? new Date(devotional.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  // Cálculo de tempo de leitura (500 caracteres por minuto)
  const readingTime = Math.ceil((devotional.description?.length || 0) / 500);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho (Metadados + Título) */}
      <div className="mb-8 text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-primary" />
            {authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            {readingTime} min de leitura
          </span>
        </div>

        <h1 className="text-fluid-2xl md:text-4xl font-bold text-foreground leading-tight">
          {devotional.title}
        </h1>
      </div>

      {/* Texto Descritivo */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-2xl mb-12">
        <div className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap font-sans">
          {devotional.description}
        </div>
      </div>
    </div>
  );
}
