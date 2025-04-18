import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="h-full backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-red-500/20 shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center overflow-hidden relative">
      {/* Background effect */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-500/5 rounded-full filter blur-3xl" />

      {/* Icon */}
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400/10 to-red-600/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-medium text-red-300 mb-2 relative z-10">
        {title}
      </h3>
      <p className="text-red-200/60 max-w-md mb-8 relative z-10">{message}</p>

      {/* Action button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-gradient-to-r from-red-500/30 to-red-600/30 hover:from-red-500/40 hover:to-red-600/40 text-white border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)] flex items-center gap-2 relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
