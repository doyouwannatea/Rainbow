import WeatherListItem from './WeatherListItem'

export interface ITemperature {
    temp: number
    tempMin: number
    tempMax: number
}

export interface IWeatherListItem {
    dtText: string
    day: string
    icon: string
    description: string
    temp: ITemperature
}

export interface IWeatherData {
    weatherList: IWeatherListItem[]
    name: string
}

export interface IError {
    isError: boolean
    message: string
}

export {
    WeatherListItem
}