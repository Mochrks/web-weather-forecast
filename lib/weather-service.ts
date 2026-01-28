export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string; // 'Clear', 'Rain', 'Clouds', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist'
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

// Helper to map WMO Weather Codes to our app's conditions and icons
function mapWeatherCode(code: number): { condition: string; description: string; icon: string } {
  // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
  // 0: Clear sky
  if (code === 0) return { condition: 'Clear', description: 'Clear sky', icon: '01d' };
  
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  if (code === 1) return { condition: 'Clear', description: 'Mainly clear', icon: '02d' };
  if (code === 2) return { condition: 'Clouds', description: 'Partly cloudy', icon: '03d' };
  if (code === 3) return { condition: 'Clouds', description: 'Overcast', icon: '04d' };

  // 45, 48: Fog
  if ([45, 48].includes(code)) return { condition: 'Mist', description: 'Foggy', icon: '50d' };

  // 51, 53, 55: Drizzle
  if ([51, 53, 55].includes(code)) return { condition: 'Drizzle', description: 'Drizzle', icon: '09d' };

  // 56, 57: Freezing Drizzle
  if ([56, 57].includes(code)) return { condition: 'Snow', description: 'Freezing Drizzle', icon: '13d' };

  // 61, 63, 65: Rain
  if ([61, 63, 65].includes(code)) return { condition: 'Rain', description: 'Rain', icon: '10d' };

  // 66, 67: Freezing Rain
  if ([66, 67].includes(code)) return { condition: 'Snow', description: 'Freezing Rain', icon: '13d' };

  // 71, 73, 75: Snow fall
  if ([71, 73, 75].includes(code)) return { condition: 'Snow', description: 'Snow fall', icon: '13d' };

  // 77: Snow grains
  if (code === 77) return { condition: 'Snow', description: 'Snow grains', icon: '13d' };

  // 80, 81, 82: Rain showers
  if ([80, 81, 82].includes(code)) return { condition: 'Rain', description: 'Rain showers', icon: '09d' };

  // 85, 86: Snow showers
  if ([85, 86].includes(code)) return { condition: 'Snow', description: 'Snow showers', icon: '13d' };

  // 95, 96, 99: Thunderstorm
  if ([95, 96, 99].includes(code)) return { condition: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' };

  return { condition: 'Clear', description: 'Unknown', icon: '01d' };
}

export async function getWeather(city: string): Promise<WeatherData> {
  try {
    // 1. Geocoding: Get Lat/Lon for the city
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!geoRes.ok) throw new Error("Failed to fetch location data.");
    
    const geoData = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
       throw new Error("City not found. Please try again.");
    }

    const { latitude, longitude, name, country_code } = geoData.results[0];

    // 2. Weather: Get current weather for Lat/Lon
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m&timezone=auto`
    );

    if (!weatherRes.ok) throw new Error("Failed to fetch weather data.");

    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    // Map the WMO code to our simplified conditions
    const { condition, description, icon } = mapWeatherCode(current.weather_code);

    return {
      city: name,
      country: country_code || "Unknown",
      temperature: Math.round(current.temperature_2m),
      condition: condition,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      description: description,
      icon: icon // Using mapped icon code to keep compatibility with UI
    };

  } catch (error) {
    console.error("Weather Service Error:", error);
    throw error;
  }
}
