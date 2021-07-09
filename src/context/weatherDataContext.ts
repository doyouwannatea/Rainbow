import React from 'react'
import { IWeatherDataContext } from '../types/context'

export const WeatherDataContext = React.createContext<Partial<IWeatherDataContext>>({})
