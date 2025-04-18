"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchForm } from "@/components/ui/search-form";
import { WeatherCard } from "@/components/ui/weather-card";
import { SearchHistory } from "@/components/ui/search-history";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WeatherData } from "@/types/weather";
import {
  getWeatherByCity,
  getSearchHistory,
  saveSearchHistory,
  clearSearchHistory,
} from "@/lib/weather-service";
import { ErrorState } from "@/components/ui/error-state";
import { useCustomToast, createErrorToast } from "@/components/ui/custom-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null
  );
  const [lastSearchedCity, setLastSearchedCity] = useState<string>("");
  const customToast = useCustomToast();

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      setSearchHistory(getSearchHistory());
    } catch (error) {
      console.error("Error loading search history:", error);
      // Reset history if there's an error
      setSearchHistory([]);
    }
  }, []);

  const handleSearch = useCallback(
    async (city: string) => {
      setLoading(true);
      setError(null);
      setLastSearchedCity(city);

      try {
        const data = await getWeatherByCity(city);

        if (!data) {
          throw new Error("Tidak ada data cuaca yang ditemukan");
        }

        setWeatherData(data);

        // Simpan di riwayat pencarian
        try {
          const newHistory = saveSearchHistory(city);
          setSearchHistory(newHistory);
        } catch (historyError) {
          console.error("Error saving search history:", historyError);
          // Menampilkan toast ringan untuk error history
          customToast.info({
            title: "Info",
            description: "Riwayat pencarian tidak dapat disimpan",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Search error:", error);
        setWeatherData(null);

        // Create appropriate error message using helper
        const errorInfo = createErrorToast(error);

        // Set error state for in-page display
        setError({
          title: errorInfo.title,
          message: errorInfo.description,
        });

        // Show toast notification
        customToast.error({
          title: errorInfo.title,
          description: errorInfo.description,
        });
      } finally {
        setLoading(false);
      }
    },
    [customToast]
  );

  const handleRetry = useCallback(() => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  }, [lastSearchedCity, handleSearch]);

  const handleSelectFromHistory = (city: string) => {
    if (loading) return; // Prevent double search while loading
    handleSearch(city);
  };

  const handleClearHistory = () => {
    try {
      clearSearchHistory();
      setSearchHistory([]);
      customToast.success({
        title: "Berhasil",
        description: "Riwayat pencarian berhasil dihapus",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error clearing history:", error);
      customToast.error({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus riwayat pencarian",
      });
    }
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-[#080B14]">
      {/* Background with particles effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141E39]/80 to-[#0A0F1F]" />
        {/* Animated grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-noise-pattern" />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-fuchsia-700 rounded-full mix-blend-screen filter blur-[130px] opacity-20 animate-blob animation-delay-4000" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto py-12 px-4 xl:px-0 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-6 pb-12 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <span className="text-xs font-medium text-blue-300">
              Premium Weather Platform
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 tracking-tight mb-4">
            CuacaKini
          </h1>
          <p className="text-lg md:text-xl text-blue-100/60 max-w-lg mx-auto font-light">
            Dapatkan informasi cuaca terkini dari seluruh dunia dengan akurasi
            tinggi dan real-time.
          </p>
        </header>

        {/* Bentogrid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Search Panel - Spans 4 columns on desktop */}
          <div className="md:col-span-4 lg:col-span-3 order-1">
            <div className="h-full backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 shadow-xl p-6 transition-transform hover:translate-y-[-2px]">
              <h2 className="text-xl font-medium text-white mb-6">Pencarian</h2>
              <SearchForm onSearch={handleSearch} isLoading={loading} />

              <div className="mt-8">
                <SearchHistory
                  history={searchHistory}
                  onSelect={handleSelectFromHistory}
                  onClear={handleClearHistory}
                />
              </div>
            </div>
          </div>

          {/* Weather Display - Spans 8 columns on desktop */}
          <div className="md:col-span-8 lg:col-span-9 order-2">
            {loading ? (
              <div className="h-full backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 shadow-xl p-6 transition-all hover:border-white/20">
                <WeatherCard data={null} isLoading={true} />
              </div>
            ) : error ? (
              <ErrorState
                title={error.title}
                message={error.message}
                onRetry={handleRetry}
              />
            ) : weatherData ? (
              <div className="h-full backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 shadow-xl p-6 transition-all hover:border-white/20">
                <WeatherCard data={weatherData} isLoading={false} />
              </div>
            ) : (
              <div className="h-full backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h3.5a2 2 0 002-2v-1a2 2 0 012-2h1.945M15 7.05L17.945 10M9 7.05L6.055 10"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m-8-8h16"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-blue-100 mb-2">
                  Mulai pencarian
                </h3>
                <p className="text-blue-200/60 max-w-md">
                  Masukkan nama kota untuk mendapatkan informasi cuaca terkini
                  dengan detail yang lengkap
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 p-6 transition-all hover:border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Data Realtime
            </h3>
            <p className="text-sm text-blue-100/60">
              Data cuaca yang selalu diperbarui secara realtime dari berbagai
              sumber terpercaya
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 p-6 transition-all hover:border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Cakupan Global
            </h3>
            <p className="text-sm text-blue-100/60">
              Informasi cuaca untuk ribuan kota di seluruh dunia dengan akurasi
              tinggi dan real-time.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 dark:bg-white/5 rounded-3xl border border-white/10 p-6 transition-all hover:border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">UI Premium</h3>
            <p className="text-sm text-blue-100/60">
              Tampilan website yang dirancang responsif diberbagai perangkat
              untuk pengalaman terbaik bagi pengguna
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-12 pb-6 text-center">
          <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>
          <p className="text-blue-100/40 text-sm">
            © {new Date().getFullYear()} CuacaKini. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
