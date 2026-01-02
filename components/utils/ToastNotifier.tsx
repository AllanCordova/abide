"use client";

import { useEffect, ReactNode } from "react";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastNotifierProps {
  message: string;
  description?: string;
  type?: ToastType;
  icon?: ReactNode;
}

export function ToastNotifier({
  message,
  description,
  type = "success",
  icon,
}: ToastNotifierProps) {
  useEffect(() => {
    if (!message) return;

    const toastOptions = {
      description: description,
      icon: icon,
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "info":
        toast.info(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  }, [message, description, type, icon]);

  return null;
}
