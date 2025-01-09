import axios from "axios";
const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (lat, lon) => {
  try {
    const request = axios.get(baseUrl, {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: "metric",
      },
    });
    return request.then((response) => response.data);
  } catch (e) {
    console.error(`Error fetching weather data ${e}`);
  }
};

export default { getWeather };
