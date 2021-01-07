import { WeatherListItem, IWeatherData } from '../types'
import weatherDataJSON from './weatherData.json'

class WeatherService {
    private static BASE_URL: string = 'https://community-open-weather-map.p.rapidapi.com/forecast?lang=ru&units=metric&'
    private static isDummyData = true

    private static async fetchWeather(query: string) {
        const res = await fetch(this.BASE_URL + query, {
            "headers": {
                "x-rapidapi-key": "eb194c61cdmsh690666316ffae94p1ca362jsn7379733fcfa0",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })

        if (res.ok) {
            const weatherData = await res.json()
            return weatherData
        }

        switch (res.status) {
            case 404: throw new Error('404')
            case 429: throw new Error('429')
            default: throw new Error()
        }
    }

    private static validateData(data: any): IWeatherData {
        const { list } = data

        const size = 8
        const days = []
        for (let i = 0; i < Math.ceil(list.length / size); i++) {
            days[i] = list.slice((i * size), (i * size) + size)
        }

        return {
            weatherList: days.map(day => {
                return day.map((dayObj: any) => new WeatherListItem(dayObj))
            }),
            name: data.city.name
        }
    }

    public static async fetchWeatherByCityName(city: string) {
        if (this.isDummyData) {
            console.log(weatherDataJSON)
            return this.validateData(weatherDataJSON)
        }
        const data = await this.fetchWeather(`q=${city}`)
        return this.validateData(data)
    }

    public static async fetchWeatherByCoords(lat: string | number, lon: string | number) {
        if (this.isDummyData) {
            console.log(weatherDataJSON)
            return this.validateData(weatherDataJSON)
        }
        const data = await this.fetchWeather(`lat=${lat}&lon=${lon}`)
        return this.validateData(data)
    }
}

export default WeatherService