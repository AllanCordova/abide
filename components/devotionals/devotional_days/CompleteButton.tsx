"use client";

import { useState } from "react";
import { CheckCircle, Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { toSubscribe } from "@/actions/DaySubscriptions";
import { useRouter } from "next/navigation";

interface CompleteButtonProps {
  dayId: number;
  devotionalId: number;
  isCompletedInitial: boolean;
}

export function CompleteButton({
  dayId,
  devotionalId,
  isCompletedInitial,
}: CompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(isCompletedInitial);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    setIsLoading(true);

    const response = await toSubscribe({
      day_id: dayId,
      devotional_id: devotionalId,
      is_completed: true,
    });

    if (response.error) {
      toast.error("Erro ao concluir", {
        description: response.error,
      });
      setIsLoading(false);
    }

    setIsCompleted(true);
    toast.success("Leitura concluída!", {
      description: "Continue firme na sua jornada.",
      icon: <PartyPopper className="text-primary" />,
    });
    router.refresh();

    setIsLoading(false);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-300">
        <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-6 py-3 rounded-full font-bold border border-green-500/20 cursor-default">
          <CheckCircle size={20} className="fill-green-600 text-white" />
          <span>Leitura Concluída</span>
        </div>
        <p className="text-xs text-muted">Você já finalizou este dia.</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleComplete}
      disabled={isLoading}
      className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <CheckCircle size={20} />
      )}
      {isLoading ? "Salvando..." : "Concluir Leitura"}
    </button>
  );
}
