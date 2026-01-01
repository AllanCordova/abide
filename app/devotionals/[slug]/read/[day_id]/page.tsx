import { getDevotionalDayById } from "@/actions/DevotionalDays";
import { getVersesByDay } from "@/actions/Verse";
import { getSubscribed } from "@/actions/DaySubscriptions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, HelpCircle } from "lucide-react";
import { Verse, DaySubscriptions } from "@/types/Tables";
import { CompleteButton } from "@/components/devotionals/devotional_days/CompleteButton";

interface ReadingPageProps {
  params: Promise<{
    slug: string;
    day_id: number;
  }>;
}

export default async function ShowDevotionalDay({ params }: ReadingPageProps) {
  const { slug, day_id } = await params;

  const { data: day, error } = await getDevotionalDayById(day_id);

  if (error || !day) {
    return notFound();
  }

  const verseResponse = await getVersesByDay(day.id);
  const verses = Array.isArray(verseResponse.data) ? verseResponse.data : [];
  let isCompleted = false;

  const response = await getSubscribed(day.devotional_id, day.id);

  if (response.error) {
    console.log(response.error);
  }

  const completedDay: DaySubscriptions = response.data;

  if (completedDay) {
    isCompleted = completedDay.is_completed;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href={`/devotionals/${slug}`}
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Voltar para o plano</span>
            <span className="sm:hidden">Voltar</span>
          </Link>

          <span className="text-sm font-semibold text-foreground">
            Dia {day.day_number}
          </span>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-10 animate-in fade-in duration-700">
        <div className="mb-10 text-center space-y-2">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Dia {day.day_number}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {day.title}
          </h1>
        </div>

        {/* --- VERSÍCULOS --- */}
        {verses.length > 0 && (
          <div className="mb-10 space-y-4">
            {verses.map((verse: Verse) => (
              <div
                key={verse.id}
                className="bg-surface border border-border rounded-xl p-6 md:p-8 relative overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                <div className="flex gap-4">
                  <BookOpen
                    className="text-primary/40 shrink-0 mt-1"
                    size={24}
                  />
                  <div className="space-y-3">
                    <p className="text-lg md:text-xl font-serif text-foreground/90 leading-relaxed italic">
                      "{verse.text_content}"
                    </p>
                    <p className="text-sm font-bold text-primary uppercase tracking-wide">
                      {verse.book_name} {verse.chapter}:{verse.verse_start}
                      {verse.verse_end ? `-${verse.verse_end}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- CONTEÚDO --- */}
        <article className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap font-sans mb-12">
          {day.content_body}
        </article>

        {/* --- REFLEXÃO --- */}
        {day.question_prompt && (
          <div className="bg-surface/50 border border-border border-dashed rounded-2xl p-6 md:p-8 mb-10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                <HelpCircle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Para Refletir
                </h3>
                <p className="text-muted leading-relaxed">
                  {day.question_prompt}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- BOTÃO DE AÇÃO (CLIENT COMPONENT) --- */}
        <div className="border-t border-border pt-8 flex justify-center">
          <CompleteButton
            dayId={day.id}
            devotionalId={day.devotional_id}
            isCompletedInitial={isCompleted}
          />
        </div>
      </main>
    </div>
  );
}
