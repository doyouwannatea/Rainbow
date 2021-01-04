import React from 'react'
import { IFetchingContext } from '../types/context'

export const FetchingContext = React.createContext<Partial<IFetchingContext>>({})