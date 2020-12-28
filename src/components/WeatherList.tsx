import React from 'react'
import { IError, IWeatherData } from '../types'
import Error from './Error'
import Loader from './Loader'

import WeatherItem from './WeatherItem'

type Props = {
    weatherList: IWeatherData[]
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
                weatherList.map(day => <WeatherItem key={day.dtText} {...day} />)
            }
        </div>
    )
}
export default WeatherList