import { WeatherData } from "../types/weather";

const SEARCH_HISTORY_KEY = "search_history";
// Get API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherByCity(
  city: string
): Promise<WeatherData | null> {
  try {
    console.log(`Fetching weather data for city: ${city}`);

    // Use API route as proxy to avoid CORS issues
    const apiUrl = `/api/weather?city=${encodeURIComponent(city)}`;
    console.log(`API URL: ${apiUrl}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = "Error fetching weather data";
      try {
        const errorText = await response.text();
        console.error(`Error response: ${errorText}`);
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage =
            errorJson.error ||
            `Failed to fetch weather data: ${response.status}`;
        } catch {
          errorMessage = `Failed to fetch weather data: ${response.status}`;
        }
      } catch (e) {
        console.error("Could not read error response:", e);
      }
      console.error(errorMessage);
      return null;
    }

    // API route already returns data in the format our app expects
    const data = await response.json();
    console.log("Received data:", data);

    // Save to search history
    saveSearchHistory(city);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Request timed out after 15 seconds");
      } else {
        console.error("Error fetching weather data:", error.message);
      }
    } else {
      console.error("Unknown error fetching weather data");
    }
    return null;
  }
}

// Save searched city to localStorage
export function saveSearchHistory(city: string): string[] {
  try {
    const history: string[] = getSearchHistory();
    // Add city if not already in history
    if (!history.includes(city)) {
      history.unshift(city);
      // Keep only the 5 most recent searches
      const limitedHistory = history.slice(0, 5);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(limitedHistory));
      return limitedHistory;
    }
    return history;
  } catch (error) {
    console.error("Error saving search history:", error);
    return [];
  }
}

// Get search history from localStorage
export function getSearchHistory(): string[] {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting search history:", error);
    return [];
  }
}

// Clear all search history
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing search history:", error);
  }
}
