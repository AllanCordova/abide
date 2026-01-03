"use client";

import { useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { unsubscribeToDevotional } from "@/actions/UserSubscriptions";
import { useRouter } from "next/navigation";

interface UnsubscribeButtonProps {
  subscriptionId: number;
  isSubscribedInitial?: boolean;
}

export function UnsubscribeButton({
  subscriptionId,
  isSubscribedInitial = true,
}: UnsubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(isSubscribedInitial);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnsubscribe = async () => {
    setIsLoading(true);

    const response = await unsubscribeToDevotional(subscriptionId);

    if (response.error) {
      toast.error("Erro ao cancelar inscrição", {
        description: response.error,
      });
      setIsLoading(false);
      router.push("/login");
      return;
    }

    setIsSubscribed(false);
    toast.success("Inscrição cancelada!", {
      description: "Você deixou de seguir este devocional.",
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
      className="w-full flex items-center justify-center gap-2 bg-surface border border-border text-foreground font-semibold py-2 px-4 rounded hover:bg-surface/80 hover:border-red-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <XCircle size={16} className="text-red-500" />
      )}
      {isLoading ? "Cancelando..." : "Cancelar inscrição"}
    </button>
  );
}
