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

        if (res.ok) {
            const weatherData = await res.json()
            console.log(weatherData)
            return weatherData
        }

        switch (res.status) {
            case 404: throw new Error('404')
            case 429: throw new Error('429')
            default: throw new Error()
        }
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

    public static async fetchWeatherByCityName(city: string) {
        const data = await this.fetchWeather(`q=${city}`)
        return this.validateData(data)
    }

    public static async fetchWeatherByCoords(lat: string | number, lon: string | number) {
        const data = await this.fetchWeather(`lat=${lat}&lon=${lon}`)
        return this.validateData(data)
    }
}

export default WeatherService