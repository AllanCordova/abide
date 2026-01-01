import Link from "next/link";
import { List, PlayCircle } from "lucide-react";
import { DevotionalDay } from "@/types/Tables";
import { DayVerse } from "./DayVerse";

interface DevotionalDaysContentProps {
  days: DevotionalDay[];
  slug: string;
}

export function DevotionalDaysContent({
  days,
  slug,
}: DevotionalDaysContentProps) {
  if (!days || days.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <List size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Sua Jornada</h2>
          <p className="text-sm text-muted">
            {days.length}{" "}
            {days.length === 1 ? "dia disponível" : "dias disponíveis"} para
            leitura
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {days.map((day, index) => (
          <Link
            href={`/devotionals/${slug}/read/${day.id}`}
            key={day.id}
            className="group block"
          >
            <div className="flex flex-col p-4 md:p-5 bg-surface border border-border rounded-xl hover:border-primary/50 hover:bg-surface/80 transition-all duration-200 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-sm font-bold text-muted group-hover:text-primary group-hover:border-primary transition-colors">
                    {index + 1}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {day.title || `Dia ${index + 1}`}
                    </h4>

                    {day.content_body && (
                      <p className="text-sm text-muted line-clamp-1 mt-0.5">
                        {day.content_body}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-muted group-hover:text-primary transition-colors">
                  <PlayCircle size={20} />
                </div>
              </div>

              <DayVerse dayId={day.id} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
