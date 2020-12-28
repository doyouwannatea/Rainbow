import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '35vh'
    }
}))

const Loader = () => {
    const classes = useStyles()
    
    return (
        <div className={classes.wrapper}>
            <CircularProgress />
        </div>
    )
}

export default Loader