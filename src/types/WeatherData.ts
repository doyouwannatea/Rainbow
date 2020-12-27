import { ITemperature, IWeatherData } from "."

export default class WeatherData implements IWeatherData {
    static WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    dt: string
    day: string
    icon: string
    main: string
    temp: ITemperature

    constructor(dayObj: any) {
        this.dt = dayObj.dt_txt
        this.day = this.getWeekDay(this.dt)
        this.icon = dayObj.weather[0].icon
        this.main = dayObj.weather[0].main
        this.temp = {
            temp: Math.round(dayObj.main.feels_like),
            tempMin: Math.round(dayObj.main.temp_min),
            tempMax: Math.round(dayObj.main.temp_max)
        }
    }

    private getWeekDay(dt: string) {
        return WeatherData.WEEK_DAYS[new Date(dt).getDay()]
    }
}