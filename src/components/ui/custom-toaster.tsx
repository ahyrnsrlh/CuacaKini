"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function CustomToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`${props.className || ""} backdrop-blur-md`}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-sm font-medium text-white">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm opacity-90 text-white/80">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white/70 hover:text-white" />
          </Toast>
        );
      })}
      <ToastViewport className="p-6 md:p-6" />
    </ToastProvider>
  );
}
