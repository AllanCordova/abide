"use client";

import { MoreVertical, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscribeButton } from "./SubscribeButton";
import { UnsubscribeButton } from "./UnsubscribeButton";

interface DevotionalActionsProps {
  devotionalId: number;
  subscriptionId?: number | null; // Se vier null/undefined, o usuário NÃO está inscrito
}

export function DevotionalActions({
  devotionalId,
  subscriptionId,
}: DevotionalActionsProps) {
  const isSubscribed = !!subscriptionId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg border border-white/10"
        >
          <MoreVertical className="h-5 w-5 text-white" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Opção de Compartilhar */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/devotionals/${devotionalId}`
            );
            toast.success("Link copiado!");
          }}
          className="cursor-pointer"
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>Compartilhar</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Renderiza SubscribeButton ou UnsubscribeButton condicionalmente */}
        <div className="p-2">
          {isSubscribed && subscriptionId ? (
            <UnsubscribeButton
              subscriptionId={subscriptionId}
              isSubscribedInitial={isSubscribed}
            />
          ) : (
            <SubscribeButton
              devotionalId={devotionalId}
              isSubscribedInitial={isSubscribed}
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
