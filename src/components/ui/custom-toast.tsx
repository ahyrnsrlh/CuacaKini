import { useToast } from "@/components/ui/use-toast";
import { XCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { ToastActionElement } from "@/components/ui/toast";

// Definisi tipe untuk toast
type ToastType = "error" | "warning" | "info" | "success";

// Interface dengan action menggunakan ToastActionElement
interface ToastOptions {
  title?: string;
  description: string;
  action?: ToastActionElement;
  duration?: number;
}

const iconMap = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

const colorMap = {
  error: {
    background: "bg-gradient-to-r from-red-500/20 to-red-600/20",
    border: "border-red-500/20",
    icon: "text-red-500",
    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.1)]",
  },
  warning: {
    background: "bg-gradient-to-r from-amber-500/20 to-amber-600/20",
    border: "border-amber-500/20",
    icon: "text-amber-500",
    shadow: "shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  },
  info: {
    background: "bg-gradient-to-r from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/20",
    icon: "text-blue-500",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
  },
  success: {
    background: "bg-gradient-to-r from-green-500/20 to-green-600/20",
    border: "border-green-500/20",
    icon: "text-green-500",
    shadow: "shadow-[0_0_15px_rgba(34,197,94,0.1)]",
  },
};

export function useCustomToast() {
  const { toast } = useToast();

  const showToast = (type: ToastType, options: ToastOptions) => {
    const Icon = iconMap[type];
    const colors = colorMap[type];

    return toast({
      title: options.title,
      description: (
        <div className="flex items-start">
          <Icon
            className={`mr-2 h-5 w-5 ${colors.icon} flex-shrink-0 mt-0.5`}
          />
          <span>{options.description}</span>
        </div>
      ),
      action: options.action,
      className: `${colors.background} backdrop-blur-md border ${colors.border} ${colors.shadow}`,
      duration: options.duration || 5000,
    });
  };

  return {
    error: (options: ToastOptions) => showToast("error", options),
    warning: (options: ToastOptions) => showToast("warning", options),
    info: (options: ToastOptions) => showToast("info", options),
    success: (options: ToastOptions) => showToast("success", options),
  };
}

export function createErrorToast(error: unknown) {
  let title = "Error";
  let description = "Terjadi kesalahan yang tidak diketahui";

  if (error instanceof Error) {
    description = error.message;

    // Custom error handling based on error message
    if (error.message.includes("Failed to fetch")) {
      title = "Koneksi Gagal";
      description =
        "Tidak dapat terhubung ke server. Silakan periksa koneksi internet Anda dan coba lagi.";
    } else if (
      error.message.includes("tidak ditemukan") ||
      error.message.includes("not found")
    ) {
      title = "Kota Tidak Ditemukan";
      description =
        "Kota yang Anda cari tidak ditemukan. Pastikan ejaan kota sudah benar.";
    } else if (
      error.message.includes("timeout") ||
      error.message.includes("timed out")
    ) {
      title = "Waktu Habis";
      description =
        "Permintaan memakan waktu terlalu lama. Silakan coba lagi nanti.";
    } else if (error.message.includes("Invalid API key")) {
      title = "Masalah Autentikasi";
      description =
        "Terjadi masalah dengan API key. Silakan hubungi tim dukungan.";
    }
  }

  return { title, description };
}
