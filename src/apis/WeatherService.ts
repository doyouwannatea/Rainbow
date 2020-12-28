import { IWeatherData, WeatherData } from '../types';

class WeatherService {
    private static BASE_URL: string = 'https://community-open-weather-map.p.rapidapi.com/forecast?lang=ru&units=metric&'

    private static async fetchWeather(query: string) {
        const res = await fetch(this.BASE_URL + query, {
            "headers": {
                "x-rapidapi-key": "656624af09msh62ed6a9b860a0f8p16a3bfjsndbdea8d9fdf6",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })

        const weatherData = await res.json()
        console.log(weatherData)
        if (weatherData.message === 'city not found') {
            throw new Error('404')
        }
        if (weatherData.message === 'You have exceeded the rate limit per minute for your plan, BASIC, by the API provider') {
            throw new Error('429')
        }

        return weatherData
    }

    private static validateData(data: any): IWeatherData[] {
        const { list } = data

        const days = [
            list[0],
            list[8],
            list[16],
            list[24],
            list[32],
        ]

        return days.map(dayObj => new WeatherData(dayObj))
    }

    public static async fetchWeatherByCity(city: string) {
        const data = await this.fetchWeather(`q=${city}`)
        return this.validateData(data)
    }

    public static async fetchWeatherByCoords(lat: string | number, lon: string | number) {
        const data = await this.fetchWeather(`lat=${lat}&lon=${lon}`)
        return this.validateData(data)
    }
}

export default WeatherService