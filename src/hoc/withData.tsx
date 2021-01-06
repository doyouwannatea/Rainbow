import React, { useContext } from 'react'

import { FetchingContext } from '../context'

import Error from '../components/Error'
import Loader from '../components/Loader'

type Props = {
    style?: React.CSSProperties
}

const withData = <P extends Object>(Child: React.ComponentType<P>): React.FC<P & Props> => (props) => {
    const { error, isLoading } = useContext(FetchingContext)
    const { style, ...other } = props

    if (error!.isError) {
        return <Error message={error!.message} />
    }

    if (isLoading) {
        return <Loader style={style} />
    }

    return <Child {...other as P} />
}

export default withData