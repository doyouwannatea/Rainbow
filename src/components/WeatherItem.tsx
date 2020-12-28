import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@material-ui/core"
import { IWeatherData } from '../types'

const useStyles = makeStyles({
    root: {
        borderRadius: 0,
        marginBottom: 1
    },
    weatherIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',
    },
    weatherIcon: {
        width: 70,
        height: 70,
    },
    temp: {
        minWidth: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 'auto',
        '& > div': {
            fontWeight: 100
        }
    }
})


type Props = {} & IWeatherData

const WeatherItem: React.FC<Props> = ({ day, icon, description, temp }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Grid container>
                        <Grid item className={classes.weatherIconWrapper}>
                            <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt={description} className={classes.weatherIcon} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" component="div">
                                {day}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {description}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.temp}>
                            <Typography variant="h4" component="div">
                                {temp.temp}°С
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default WeatherItem