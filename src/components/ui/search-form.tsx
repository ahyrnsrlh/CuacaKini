"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [city, setCity] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      toast({
        title: "Kota tidak boleh kosong",
        description: "Silahkan masukkan nama kota yang ingin dicari",
        variant: "destructive",
      });
      return;
    }

    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-3">
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-600/30 opacity-30 blur-sm group-hover:opacity-100 transition duration-1000"></div>
        <Input
          type="text"
          placeholder="Masukkan nama kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-white/5 dark:bg-black/10 backdrop-blur-lg border-white/10 dark:border-white/5 placeholder:text-blue-200/50 dark:placeholder:text-blue-200/30 text-white relative rounded-lg h-11 px-4"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-10 w-full bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/90 hover:to-indigo-500/90 text-white font-medium rounded-lg backdrop-blur-sm border-0 transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Mencari...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Cari</span>
          </div>
        )}
      </Button>
    </form>
  );
}
