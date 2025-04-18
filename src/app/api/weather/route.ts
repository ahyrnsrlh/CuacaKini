import { NextResponse } from "next/server";

// Use environment variable for API key
const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function GET(request: Request) {
  try {
    // Get the city from the URL query parameter
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!OPEN_WEATHER_API_KEY) {
      console.error("Weather API key is missing in environment variables");
      return NextResponse.json(
        { error: "Weather service configuration error" },
        { status: 500 }
      );
    }

    console.log(`API route: Fetching weather for city "${city}"`);

    // Make the request to OpenWeatherMap API
    const apiUrl = `${OPEN_WEATHER_API_URL}?q=${encodeURIComponent(
      city
    )}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=id`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache the response
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error: ${response.status} - ${errorText}`);

      // If city not found, return a specific error
      if (response.status === 404) {
        return NextResponse.json(
          { error: `City "${city}" not found` },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: `Weather service error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Map the OpenWeatherMap response to our application format
    const mappedData = {
      kota: data.name,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      timezone: data.timezone,
      waktu: new Date().toISOString(),
      suhu: data.main.temp,
      kondisi: data.weather[0].main,
      deskripsi: data.weather[0].description,
      icon: data.weather[0].icon,
      kelembaban: data.main.humidity,
      kecepatan_angin: data.wind.speed,
      tekanan: data.main.pressure,
    };

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
