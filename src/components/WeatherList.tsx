import React, { useContext } from 'react'
import { FetchingContext, WeatherDataContext } from '../context'
import Error from './Error'
import Loader from './Loader'

import WeatherItem from './WeatherItem'

const WeatherList = () => {
    const { weatherList } = useContext(WeatherDataContext)
    const { error, isLoading } = useContext(FetchingContext)

    if (error!.isError) {
        return <Error message={error!.message} />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="weather-wrapper">
            {
                weatherList!.map((day, index) => (
                    <WeatherItem key={day.dtText} delay={index * 2} {...day} />
                ))
            }
        </div>
    )
}
export default WeatherList