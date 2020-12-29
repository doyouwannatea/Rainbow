import React, { useEffect, useState } from 'react'

import Header from "./Header"
import WeatherList from "./WeatherList"
import Navbar from "./Navbar"

import WeatherService from '../apis/WeatherService'

import { IError, IWeatherData } from '../types'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkCheme, setIsDarkCheme] = useState(false)
  const [weatherList, setWeatherList] = useState<IWeatherData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<IError>({ isError: false, message: '' })

  useEffect(() => {
    resetError()
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        WeatherService.fetchWeatherByCoords(coords.latitude, coords.longitude)
          .then(setWeatherList)
          .catch(catchWeatherAPIError)
          .finally(() => setIsLoading(false))
      }, catchPositionError)
    } else {
      onError('Геолокация недоступна, введите город вручную.')
    }
  }, [])

  const onError = (message: string) => {
    setError({
      isError: true,
      message
    })
  }

  const resetError = () => {
    setError({
      isError: false,
      message: ''
    })
  }

  const catchPositionError = (err: GeolocationPositionError) => {
    switch (err.code) {
      case 1:
        onError('Геолокация выключена, введите местоположение вручную.')
        break
      case 2:
        onError('Не удалось получить геолокацию.')
        break
      default:
        onError('Ошибка сети или сервера.')
        break
    }
  }

  const catchWeatherAPIError = (err: Error) => {
    switch (err.message) {
      case '404':
        onError('Город не найден.')
        break
      case '429':
        onError('Слишком много запросов в минуту.')
        break
      default:
        onError('Ошибка сети или сервера.')
        break
    }
  }

  const setWeatherByCityName = (city: string) => (e: React.FormEvent) => {
    e.preventDefault()
    if (city.length > 0) {
      resetError()
      setIsLoading(true)
      WeatherService.fetchWeatherByCityName(city)
        .then(setWeatherList)
        .catch(catchWeatherAPIError)
        .finally(() => setIsLoading(false))
    }
  }

  const toggleNavbar = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }

  const toggleCheme = () => {
    setIsDarkCheme(prevCheme => !prevCheme)
  }

  return (
    <div className="app">
      <Navbar
        isOpen={isOpen}
        toggleNavbar={toggleNavbar}
        isDarkCheme={isDarkCheme}
        toggleCheme={toggleCheme}
      />
      <Header
        toggleNavbar={toggleNavbar}
        setWeatherByCityName={setWeatherByCityName}
      />
      <WeatherList
        weatherList={weatherList}
        error={error}
        isLoading={isLoading}
      />
    </div>
  )
}

export default App