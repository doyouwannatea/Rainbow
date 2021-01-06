import React, { useContext } from 'react'

import { WeatherDataContext } from '../context'
import withData from '../hoc/withData'

import WeatherItem from './WeatherItem'

const WeatherList = () => {
    const { weatherList } = useContext(WeatherDataContext)

    return (
        <div className="weather-wrapper">
            {
                weatherList!.map((day, index) => (
                    <WeatherItem key={day[0].dtText} index={index} {...day[0]} />
                ))
            }
        </div>
    )
}
export default withData(WeatherList)