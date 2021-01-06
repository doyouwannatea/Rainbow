import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
import { FetchingContext } from '../context'

const useStyles = makeStyles<Theme, MakeStylesProps>((theme) => ({
    root: {
        borderRadius: 0,
        marginBottom: 2,
        opacity: ({ isAnimationEnds }) => isAnimationEnds ? 1 : 0,
        animation: ({ isAnimationEnds }) => isAnimationEnds ? '' : 'bounceInLeft 800ms ease forwards',
        animationDelay: ({ index }) => `${index * 100}ms`
    },
    content: {
        position: 'relative',
        paddingRight: 105,
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
    index: number
    isAnimationEnds: boolean | undefined
}

type Props = {
    index: number
} & IWeatherListItem

const WeatherItem: React.FC<Props> = ({ day, icon, description, temp, index }) => {
    const { isAnimationEnds } = useContext(FetchingContext)
    const history = useHistory()
    const classes = useStyles({ index, isAnimationEnds })

    const clickHandler = () => {
        history.push(`/${index}`)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={clickHandler}>
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
                            {temp}°С
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default WeatherItem