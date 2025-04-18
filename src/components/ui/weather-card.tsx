import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

export function WeatherCard({ data, isLoading }: WeatherCardProps) {
  if (isLoading) {
    return <WeatherCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  const iconUrl = data.icon
    ? `https://openweathermap.org/img/wn/${data.icon}@4x.png`
    : "https://openweathermap.org/img/wn/01d@4x.png";

  return (
    <div className="w-full space-y-6 premium-scrollbar overflow-auto">
      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
            {data.kota}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-400/70"></div>
            <span className="text-sm text-blue-200/80">
              {data.timezone || "Timezone tidak tersedia"}
            </span>
          </div>
          <p className="text-lg text-blue-100 mb-1">
            {data.kondisi || "Kondisi tidak tersedia"}
          </p>
          <p className="text-sm text-blue-200/70">
            {data.deskripsi || "Deskripsi tidak tersedia"}
          </p>
          <p className="text-sm text-blue-200/70 mt-1">
            {data.waktu || "Waktu tidak tersedia"}
          </p>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-2xl"></div>
            <img
              src={iconUrl}
              alt={data.deskripsi || "Kondisi cuaca"}
              className="h-24 w-24 md:h-32 md:w-32 relative z-10 drop-shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://openweathermap.org/img/wn/01d@4x.png";
              }}
            />
          </div>
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-bold text-white drop-shadow-md">
              {Math.round(data.suhu)}°
            </span>
            <span className="text-lg text-blue-200/80 pl-1">C</span>
          </div>
        </div>
      </div>

      {/* Weather Grid Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Kelembaban */}
        <div className="bentogrid-panel p-4 flex flex-col">
          <span className="text-xs text-blue-200/60 mb-2">Kelembaban</span>
          <div className="flex items-end justify-between">
            <span className="text-xl font-semibold text-white">
              {data.kelembaban || 0}%
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.25 10c0 2.485-1.387 4.725-3.5 6.227A7.34 7.34 0 0112 17.75a7.34 7.34 0 01-3.75-1.523A7.403 7.403 0 014.75 10C4.75 5 12 2 12 2s7.25 3 7.25 8z"
              />
            </svg>
          </div>
        </div>

        {/* Angin */}
        <div className="bentogrid-panel p-4 flex flex-col">
          <span className="text-xs text-blue-200/60 mb-2">Kecepatan Angin</span>
          <div className="flex items-end justify-between">
            <span className="text-xl font-semibold text-white">
              {data.kecepatan_angin || 0} m/s
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 13h8M8 17h8M8 9h8"
              />
            </svg>
          </div>
        </div>

        {/* Tekanan */}
        <div className="bentogrid-panel p-4 flex flex-col">
          <span className="text-xs text-blue-200/60 mb-2">Tekanan</span>
          <div className="flex items-end justify-between">
            <span className="text-xl font-semibold text-white">
              {data.tekanan || 0} hPa
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300/80"
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
        </div>

        {/* Koordinat */}
        <div className="bentogrid-panel p-4 flex flex-col">
          <span className="text-xs text-blue-200/60 mb-2">Koordinat</span>
          <div className="flex items-end justify-between">
            <span className="text-xl font-semibold text-white">
              {data.latitude?.toFixed(2) || 0},{" "}
              {data.longitude?.toFixed(2) || 0}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Data Source Mention */}
      <div className="pt-4 text-right">
        <span className="text-xs text-blue-200/40">
          Data dari OpenWeatherMap API
        </span>
      </div>
    </div>
  );
}

function WeatherCardSkeleton() {
  return (
    <div className="w-full space-y-6 premium-scrollbar overflow-auto">
      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col w-full md:w-auto">
          <Skeleton className="h-10 w-48 bg-white/10 rounded-lg mb-2" />
          <Skeleton className="h-4 w-32 bg-white/10 rounded-md mb-3" />
          <Skeleton className="h-6 w-36 bg-white/10 rounded-md mb-1" />
          <Skeleton className="h-4 w-40 bg-white/10 rounded-md mb-1" />
          <Skeleton className="h-4 w-40 bg-white/10 rounded-md" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 bg-white/10 rounded-full" />
          <Skeleton className="h-14 w-20 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Weather Grid Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bentogrid-panel p-4 flex flex-col">
            <Skeleton className="h-3 w-20 bg-white/10 rounded-md mb-2" />
            <div className="flex items-end justify-between">
              <Skeleton className="h-8 w-16 bg-white/10 rounded-lg" />
              <Skeleton className="h-5 w-5 bg-white/10 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Data Source Mention */}
      <div className="pt-4 text-right">
        <Skeleton className="h-3 w-40 bg-white/10 rounded-md ml-auto" />
      </div>
    </div>
  );
}
