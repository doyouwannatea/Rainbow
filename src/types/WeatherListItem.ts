import { IWeatherListItem } from './'

export default class WeatherListItem implements IWeatherListItem {
    static WEEK_DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    dtText: string
    day: string
    hours: string
    icon: string
    description: string
    temp: number
    humidity: number
    pressure: number
    dt: Date

    constructor(dayObj: any) {
        const { icon, description } = dayObj.weather[0]

        this.dtText = dayObj.dt_txt
        this.dt = new Date(dayObj.dt_txt)
        this.day = this.getWeekDay(this.dt)
        this.hours = this.getHours(this.dt)
        this.icon = icon
        this.description = description
        this.temp = Math.round(dayObj.main.temp)
        this.humidity = dayObj.main.humidity
        this.pressure = dayObj.main.pressure
    }

    private getWeekDay(dt: Date): string {
        return WeatherListItem.WEEK_DAYS[dt.getDay()]
    }

    private getHours(dt: Date): string {
        let hours = dt.getHours().toString()

        if (hours.length < 2) {
            hours = `0${hours}`
        }

        return hours + ':00'
    }
}