import React, { useEffect, useState } from 'react'

import Header from "./Header"
import WeatherList from "./WeatherList"
import Navbar from "./Navbar"

import WeatherService from '../apis/WeatherService'

import { IError, IWeatherData } from '../types'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkCheme] = useState(false)
  const [weatherData, setWeatherData] = useState<IWeatherData>({ weatherList: [], name: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<IError>({ isError: false, message: '' })

  useEffect(() => {
    resetError()
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        WeatherService.fetchWeatherByCoords(coords.latitude, coords.longitude)
          .then(setWeatherData)
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

  const resetWeatherData = () => {
    setWeatherData({
      name: '',
      weatherList: []
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
    resetWeatherData()
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
    resetWeatherData()
  }

  const setWeatherByCityName = (city: string) => (e: React.FormEvent) => {
    e.preventDefault()
    if (city.length > 0) {
      resetError()
      setIsLoading(true)
      WeatherService.fetchWeatherByCityName(city)
        .then(setWeatherData)
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

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        isOpen={isOpen}
        toggleNavbar={toggleNavbar}
        isDarkMode={isDarkMode}
        toggleCheme={toggleCheme}
      />
      <Header
        toggleNavbar={toggleNavbar}
        setWeatherByCityName={setWeatherByCityName}
        currentPlace={weatherData.name}
      />
      <WeatherList
        weatherList={weatherData.weatherList}
        error={error}
        isLoading={isLoading}
      />
    </ThemeProvider>
  )
}

export default App