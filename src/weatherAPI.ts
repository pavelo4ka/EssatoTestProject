import axios from 'axios';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://archive-api.open-meteo.com/v1/archive';


export default async function getAverageTemperature(city: string, date: string): Promise<number | string> {
    const geoResponse = await axios.get(GEOCODING_URL, {
        params: {
            name: city,
            count: 1,
        },
    });

    const geoData = geoResponse.data;

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City '${city}' not found.`);
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherResponse = await axios.get(WEATHER_URL, {
        params: {
            latitude,
            longitude,
            start_date: date,
            end_date: date,
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
        },
    });

    const weatherData = weatherResponse.data;

    if (!weatherData.daily || !weatherData.daily.temperature_2m_max || !weatherData.daily.temperature_2m_min) {
        throw new Error(`Failed to retrieve data for city '${city}' on date ${date}`);
    }

    const tempMax = weatherData.daily.temperature_2m_max[0];
    const tempMin = weatherData.daily.temperature_2m_min[0];

    const averageTemp = (tempMax + tempMin) / 2;
    return averageTemp;

}
