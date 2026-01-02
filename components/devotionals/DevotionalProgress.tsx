import { List } from "lucide-react";

interface DevotionalProgressProps {
  totalDays: number;
  completedCount: number;
  title?: string;
  showIcon?: boolean;
  compact?: boolean;
}

export function DevotionalProgress({
  totalDays,
  completedCount,
  title = "Sua Jornada",
  showIcon = true,
  compact = false,
}: DevotionalProgressProps) {
  const progressPercentage = Math.round((completedCount / totalDays) * 100);

  return (
    <div className={compact ? "space-y-2" : "space-y-4 mb-8"}>
      <div className="flex items-center gap-3">
        {showIcon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <List size={24} />
          </div>
        )}
        <div className="flex-1">
          {!compact && (
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
          )}
          <div className="flex justify-between items-center text-sm text-muted">
            <span>
              {totalDays}{" "}
              {totalDays === 1 ? "dia disponível" : "dias disponíveis"}
            </span>
            <span className="font-medium text-primary">
              {progressPercentage}% concluído
            </span>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

