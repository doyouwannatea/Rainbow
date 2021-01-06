import React, { useEffect, useState } from 'react'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { IError, IWeatherData } from '../types'
import WeatherService from '../apis/WeatherService'
import { AsideContext, DarkModeContext, FetchingContext, WeatherDataContext } from '../context'

import DayPage from './DayPage'
import Header from './Header'
import Navbar from './Navbar'
import WeatherList from './WeatherList'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [weatherData, setWeatherData] = useState<IWeatherData>({ weatherList: [], name: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimationEnds, setIsAnimationEnds] = useState(false)
  const [error, setError] = useState<IError>({ isError: false, message: '' })

  const { name, weatherList } = weatherData

  useEffect(() => {
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
      setIsAnimationEnds(false)
      document.querySelector('input')?.blur()
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

  const closeNavbar = () => {
    setIsOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState)
  }

  const endAnimation = () => setIsAnimationEnds(true)

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
      <AsideContext.Provider value={{ isOpen, toggleNavbar, closeNavbar }} >
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          <FetchingContext.Provider value={{ error, isLoading, endAnimation, isAnimationEnds }}>
            <WeatherDataContext.Provider value={{ setWeatherByCityName, currentPlace: name, weatherList }}>
              <CssBaseline />
              <Router>
                <Header />
                <Navbar />
                <Switch>
                  <Route path="/" component={WeatherList} exact />
                  <Route path="/:id" component={DayPage} exact />
                  <Route path="*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </Router>
            </WeatherDataContext.Provider>
          </FetchingContext.Provider>
        </DarkModeContext.Provider>
      </AsideContext.Provider>
    </ThemeProvider>
  )
}

export default App