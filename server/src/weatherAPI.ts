import axios, { AxiosResponse } from 'axios';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://archive-api.open-meteo.com/v1/archive';


export default async function getAverageTemperature(city: string, date: string): Promise<number> {

    const geoResponse:AxiosResponse<any,any> = await axios.get(GEOCODING_URL, {
        params: {
            name: city,
            count: 1,  // Only retrieve the first result
        },
    });

    const geoData:any = geoResponse.data;

    // Check if the geocoding API returned valid results
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City '${city}' not found.`);
    }

    const { latitude, longitude }= geoData.results[0];

    // Make a request to the weather API to get the weather data for the city on the specified date
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
    
    // Check if the weather data contains the necessary temperature data
    if(weatherData.daily.temperature_2m_min[0]==null){
        console.log("No data about weather")
    }
    const tempMax:number = weatherData.daily.temperature_2m_max[0];
    const tempMin:number = weatherData.daily.temperature_2m_min[0];

    const averageTemp:number = (tempMax + tempMin) / 2;
    
    return averageTemp;

}
