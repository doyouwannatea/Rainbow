import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '35vh'
    }
})

type Props = {
    style?: React.CSSProperties
}

const Loader: React.FC<Props> = ({ style }) => {
    const classes = useStyles()

    return (
        <div style={style} className={classes.wrapper}>
            <CircularProgress />
        </div>
    )
}

export default Loader