export interface WeatherData {
  kota?: string; // For backward compatibility
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  waktu?: string;
  suhu?: number;
  kondisi?: string;
  deskripsi?: string;
  icon?: string;
  kelembaban?: number;
  kecepatan_angin?: number;
  tekanan?: number;

  // New structure for WeatherAPI.com
  weather?: {
    main: string;
    description: string;
    icon: string;
  };
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind?: {
    speed: number;
    deg: number;
  };
  clouds?: {
    all: number;
  };
  sys?: {
    country: string;
  };
}

export interface WeatherError {
  message: string;
  code?: number;
}
