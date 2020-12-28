import { ITemperature, IWeatherData } from "."

export default class WeatherData implements IWeatherData {
    static WEEK_DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    dtText: string
    day: string
    icon: string
    description: string
    temp: ITemperature

    constructor(dayObj: any) {
        const { icon, description } = dayObj.weather[0]

        this.dtText = dayObj.dt_txt
        this.day = this.getWeekDay(this.dtText)
        this.icon = icon.slice(0, icon.length - 1) + 'd'
        this.description = description
        this.temp = {
            temp: Math.round(dayObj.main.temp),
            tempMin: Math.round(dayObj.main.temp_min),
            tempMax: Math.round(dayObj.main.temp_max)
        }
    }

    private getWeekDay(dt: string) {
        return WeatherData.WEEK_DAYS[new Date(dt).getDay()]
    }
}