import WeatherData from './WeatherData'

export interface ITemperature {
    temp: number
    tempMin: number
    tempMax: number
}

export interface IWeatherData {
    dt: string
    day: string
    icon: string
    main: string
    temp: ITemperature
}

export interface IError {
    isError: boolean
    message: string
}

export {
    WeatherData
}