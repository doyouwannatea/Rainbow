import { IError, IWeatherListItem } from './'

export interface IFetchingContext {
    isLoading: boolean
    error: IError
}

export interface IDarkModeContext {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export interface IAsideContext {
    isOpen: boolean
    toggleNavbar: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export interface IWeatherDataContext {
    currentPlace: string
    weatherList: IWeatherListItem[]
    setWeatherByCityName: (city: string) => (e: React.FormEvent) => void
}