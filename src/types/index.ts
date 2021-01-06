import WeatherListItem from './WeatherListItem'

export interface IWeatherListItem {
    dtText: string
    dt: Date
    day: string
    hours: string
    icon: string
    description: string
    temp: number
    humidity?: number
    pressure?: number
}

export interface IWeatherData {
    weatherList: IWeatherListItem[][]
    name: string
}

export interface IError {
    isError: boolean
    message: string
}

export {
    WeatherListItem
}