import React, { useContext, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Container, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { NavbarContext, FetchingContext, WeatherDataContext } from '../context'
import withData from '../hoc/withData'

import Chart from './Chart'

const useStyles = makeStyles((theme) => ({
    temp: {
        position: 'relative',
        marginRight: '2rem',
        '&>sup': {
            position: 'absolute',
            top: 0,
            right: '-1rem'
        }
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.light
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '&>*:first-child': {
            paddingRight: theme.spacing(2)
        }
    },
}))

type Params = {
    id: string
}

const DayPage = () => {
    const { weatherList } = useContext(WeatherDataContext)
    const { endAnimation } = useContext(FetchingContext)
    const { closeNavbar } = useContext(NavbarContext)
    const { id } = useParams<Params>()
    const classes = useStyles()

    useEffect(() => {
        closeNavbar!()
        endAnimation!()

        return () => {
            closeNavbar!()
        }
    }, [])

    const index = parseInt(id)

    if (weatherList![index] === undefined) return <Redirect to="/" />

    const { day, description, hours, icon, temp, humidity, pressure } = weatherList![index][0]

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <div className={classes.cardHeader}>
                    <Typography variant="h5" component="h2">
                        {day} {hours}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {description}
                    </Typography>
                </div>
                <Grid className={classes.center} container>
                    <Grid className={classes.center} item>
                        <Typography className={classes.temp} variant="h2" component="div">
                            {temp}
                            <Typography variant="caption" component="sup">
                                °C
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid className={classes.center} item>
                        <img className={classes.image} src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt={description} />
                    </Grid>
                </Grid>
                <Typography variant="subtitle1" component="div">
                    Влажность: {humidity}%
                    </Typography>
                <Typography variant="subtitle1" component="div">
                    Давление: {pressure} мм рт.
                </Typography>
            </Paper>
            <Chart weatherList={weatherList![index]} />
        </Container>
    )
}

export default withData(DayPage)