"use client";

import { useState } from "react";
import { Heart, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { subscribeToDevotional, getSubscriptionByDevotional } from "@/actions/UserSubscriptions";
import { useRouter } from "next/navigation";

interface SubscribeButtonProps {
  devotionalId: number;
  isSubscribedInitial?: boolean;
}

export function SubscribeButton({
  devotionalId,
  isSubscribedInitial = false,
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(isSubscribedInitial);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setIsLoading(true);

    const response = await subscribeToDevotional({
      devotional_id: devotionalId,
      current_day: 1,
      is_completed: false,
    });

    if (response.error) {
      toast.error("Erro ao inscrever-se", {
        description: response.error,
      });
      setIsLoading(false);
      router.push("/login");
      return;
    }

    setIsSubscribed(true);
    toast.success("Inscrito com sucesso!", {
      description: "Você começou a seguir este devocional.",
    });
    router.refresh();

    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded font-semibold border border-green-500/20 cursor-default">
        <CheckCircle size={16} className="fill-green-600 text-white" />
        <span className="text-sm">Inscrito</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 bg-surface border border-border text-foreground font-semibold py-2 px-4 rounded hover:bg-surface/80 hover:border-primary/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Heart size={16} />
      )}
      {isLoading ? "Inscrevendo..." : "Inscrever-se"}
    </button>
  );
}

