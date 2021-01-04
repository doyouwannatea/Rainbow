import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Theme,
} from "@material-ui/core"

import { IWeatherListItem } from '../types'

const useStyles = makeStyles<Theme, MakeStylesProps>((theme) => ({
    root: {
        borderRadius: 0,
        marginBottom: 2,
        opacity: 0,
        animation: 'bounceInLeft 800ms ease forwards',
        animationDelay: ({ delay }) => `${delay * 50}ms`
    },
    content: {
        position: 'relative',
        paddingRight: 100,
    },
    weatherIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',
    },
    weatherIcon: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.light
    },
    temp: {
        minWidth: 50,
        fontWeight: 100,
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        }
    },
    gridContainer: {
        flexWrap: 'nowrap'
    },
    description: {
        lineHeight: 1,
        opacity: 0.9,
        fontWeight: 100
    }
}))

type MakeStylesProps = {
    delay: number
}

type Props = {
    delay: number
} & IWeatherListItem

const WeatherItem: React.FC<Props> = ({ day, icon, description, temp, delay }) => {
    const classes = useStyles({ delay })

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.content}>
                    <Grid className={classes.gridContainer} container>
                        <Grid item className={classes.weatherIconWrapper}>
                            <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt={description} className={classes.weatherIcon} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title} variant="h5" component="div">
                                {day}
                            </Typography>
                            <Typography className={classes.description} variant="subtitle1" component="div">
                                {description}
                            </Typography>
                        </Grid>
                        <Typography className={classes.temp} variant="h4" component="div">
                            {temp.temp}°С
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default WeatherItem