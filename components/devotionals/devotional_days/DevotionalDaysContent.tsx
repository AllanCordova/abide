import Link from "next/link";
import { PlayCircle, CheckCircle, Lock } from "lucide-react";
import { DaySubscriptions, DevotionalDay } from "@/types/Tables";
import { DayVerse } from "./DayVerse";
import { DevotionalProgress } from "@/components/devotionals/DevotionalProgress";

interface DevotionalDaysContentProps {
  days: DevotionalDay[];
  completedDays: DaySubscriptions[];
  slug: string;
}

export function DevotionalDaysContent({
  days,
  completedDays = [],
  slug,
}: DevotionalDaysContentProps) {
  if (!days || days.length === 0) return null;

  const completedCount = completedDays.filter((d) => d.is_completed).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <DevotionalProgress
        totalDays={days.length}
        completedCount={completedCount}
      />

      <div className="grid grid-cols-1 gap-4">
        {days.map((day, index) => {
          const isCompleted = completedDays.some(
            (cd) => cd.day_id === day.id && cd.is_completed
          );

          return (
            <Link
              href={`/devotionals/${slug}/read/${day.id}`}
              key={day.id}
              className="group block"
            >
              <div
                className={`
                  flex flex-col p-4 md:p-5 rounded-xl transition-all duration-200 h-full border
                  ${
                    isCompleted
                      ? "bg-green-500/5 border-green-500/30 hover:bg-green-500/10"
                      : "bg-surface border-border hover:border-primary/50 hover:bg-surface/80"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                    <div
                      className={`
                        shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors border
                        ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-background border-border text-muted group-hover:text-primary group-hover:border-primary"
                        }
                      `}
                    >
                      {isCompleted ? <CheckCircle size={18} /> : index + 1}
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <h4
                        className={`font-semibold transition-colors truncate ${
                          isCompleted
                            ? "text-green-700 dark:text-green-400"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {day.title || `Dia ${index + 1}`}
                      </h4>

                      {day.content_body && (
                        <p className="text-sm text-muted line-clamp-1 mt-0.5">
                          {day.content_body}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`shrink-0 transition-colors ${
                      isCompleted
                        ? "text-green-500"
                        : "text-muted group-hover:text-primary"
                    }`}
                  >
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider bg-green-500/10 px-2 py-1 rounded-md">
                        Concluído
                      </div>
                    ) : (
                      <PlayCircle size={24} />
                    )}
                  </div>
                </div>

                <DayVerse key={day.id} dayId={day.id} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
