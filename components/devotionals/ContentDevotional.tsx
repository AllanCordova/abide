import { Devotional, DevotionalDay } from "@/types/Tables";
import { Calendar, User, Clock } from "lucide-react";

interface ContentDevotionalProps {
  devotional: Devotional;
  authorName: string;
  day: DevotionalDay[];
}

export function ContentDevotional({
  devotional,
  authorName,
  day,
}: ContentDevotionalProps) {
  const formattedDate = devotional.created_at
    ? new Date(devotional.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-3xl mx-auto">
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
            {day.length} dias de palavra com Deus!
          </span>
        </div>

        <h1 className="text-fluid-2xl md:text-4xl font-bold text-foreground leading-tight">
          {devotional.title}
        </h1>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-2xl mb-12">
        <div className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap font-sans">
          {devotional.description}
        </div>
      </div>
    </div>
  );
}
