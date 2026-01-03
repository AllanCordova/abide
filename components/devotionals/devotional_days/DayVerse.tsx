import { getVersesByDay } from "@/actions/Verse";
import { assertSuccess } from "@/lib/api-helpers";

interface DayVerseProps {
  dayId: number;
}

export async function DayVerse({ dayId }: DayVerseProps) {
  const verse = assertSuccess(await getVersesByDay(dayId));

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted italic leading-relaxed">
            {verse.text_content}
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
