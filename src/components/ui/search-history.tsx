"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export function SearchHistory({
  history,
  onSelect,
  onClear,
}: SearchHistoryProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!history.length) {
    return (
      <div className="w-full backdrop-blur-md bg-white/5 dark:bg-black/5 rounded-xl border border-white/10 dark:border-white/5 p-4 text-center">
        <p className="text-sm text-blue-200/50">Riwayat pencarian kosong</p>
      </div>
    );
  }

  return (
    <div className="w-full backdrop-blur-md bg-white/5 dark:bg-black/5 rounded-xl border border-white/10 dark:border-white/5 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-blue-100">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Riwayat Pencarian
          </div>
        </h3>
        {showConfirm ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-200/70">Hapus semua?</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onClear();
                setShowConfirm(false);
              }}
              className="h-7 px-2 text-xs bg-red-500/60 hover:bg-red-500/80 border-0"
            >
              Ya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(false)}
              className="h-7 px-2 text-xs bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 hover:bg-white/20"
            >
              Tidak
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirm(true)}
            className="h-7 px-2 text-xs text-blue-200/70 hover:text-blue-100 hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto premium-scrollbar pr-1">
        {history.map((city, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(city)}
            className="h-7 text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-100 border border-blue-500/20 rounded-lg backdrop-blur-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
}
