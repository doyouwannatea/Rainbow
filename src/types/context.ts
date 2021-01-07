import { IError, IWeatherListItem } from './'

export interface IFetchingContext {
    isLoading: boolean
    isAnimationEnds: boolean
    error: IError
    endAnimation: () => void
}

export interface IDarkModeContext {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export interface INavbarContext {
    isOpen: boolean
    toggleNavbar: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    closeNavbar: () => void
}

export interface IWeatherDataContext {
    currentPlace: string
    weatherList: IWeatherListItem[][]
    setWeatherByCityName: (city: string) => (e: React.FormEvent) => void
}