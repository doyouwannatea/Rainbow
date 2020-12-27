import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Divider,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography
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
        marginLeft: 'auto',
        marginRight: '1rem',
    },
    weatherIcon: {
        width: 75,
        height: 75
    },
    temp: {
        minWidth: 40,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})


type Props = {} & IWeatherData
    
const WeatherItem: React.FC<Props> = ({ day, icon, main, temp }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h5" component="div">
                                {day}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {main}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.weatherIconWrapper}>
                            <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt={main} className={classes.weatherIcon} />
                        </Grid>
                        <Grid item className={classes.temp}>
                            <Typography variant="subtitle2" component="div">
                                {temp.tempMin}°С
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                {temp.tempMax}°С
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default WeatherItem