import WeatherData from './WeatherData'

export interface ITemperature {
    temp: number
    tempMin: number
    tempMax: number
}

export interface IWeatherData {
    dtText: string
    day: string
    icon: string
    description: string
    temp: ITemperature
}

export interface IError {
    isError: boolean
    message: string
}

export {
    WeatherData
}