"use client";

import { useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { unsubscribeToDevotionalDay } from "@/actions/DaySubscriptions";
import { useRouter } from "next/navigation";

interface UnsubscribeDayButtonProps {
  dayId: number;
  devotionalId: number;
  subscriptionId?: number | null;
  isSubscribedInitial?: boolean;
}

export function UnsubscribeDayButton({
  dayId,
  devotionalId,
  isSubscribedInitial = true,
}: UnsubscribeDayButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(isSubscribedInitial);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnsubscribe = async () => {
    setIsLoading(true);

    const response = await unsubscribeToDevotionalDay(dayId, devotionalId);

    if (response.error) {
      toast.error("Erro ao cancelar leitura", {
        description: response.error,
      });
      setIsLoading(false);
      router.push("/login");
      return;
    }

    setIsSubscribed(false);
    toast.success("Leitura cancelada!", {
      description: "Você desmarcou a conclusão deste dia.",
    });
    router.refresh();

    setIsLoading(false);
  };

  if (!isSubscribed) {
    return null;
  }

  return (
    <button
      onClick={handleUnsubscribe}
      disabled={isLoading}
      className="flex items-center gap-2 bg-surface border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface/80 hover:border-red-500/50 transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <XCircle size={20} className="text-red-500" />
      )}
      {isLoading ? "Cancelando..." : "Desmarcar Leitura"}
    </button>
  );
}

