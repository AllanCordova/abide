import { getVersesByDay } from "@/actions/Verse";
import { TableRow } from "@/types/Tables"; // Ou o tipo correto dos seus versos
import { Quote } from "lucide-react";

interface DayVerseProps {
  dayId: number;
}

export async function DayVerse({ dayId }: DayVerseProps) {
  // 1. O componente busca seus próprios dados
  const { data, success } = await getVersesByDay(dayId);

  // Se der erro ou não tiver versos, não mostra nada (para não poluir o card)
  if (!success || !data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  const verses = data as TableRow<"verses">[];
  const verse = verses[0];

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted italic leading-relaxed">
            "{verse.text_content}"
          </p>
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-wide">
            {verse.book_name} {verse.chapter}:{verse.verse_start}
            {verse.verse_end ? `-${verse.verse_end}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
