import React from 'react'
import { IError, IWeatherListItem } from '../types'
import Error from './Error'
import Loader from './Loader'

import WeatherItem from './WeatherItem'

type Props = {
    weatherList: IWeatherListItem[]
    isLoading: boolean
    error: IError
}

const WeatherList: React.FC<Props> = ({ weatherList, error, isLoading }) => {

    if (error.isError) {
        return <Error message={error.message} />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="weather-wrapper">
            {
                weatherList.map((day, index) => (
                    <WeatherItem key={day.dtText} delay={index} {...day} />
                ))
            }
        </div>
    )
}
export default WeatherList