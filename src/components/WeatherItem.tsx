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

const useStyles = makeStyles({
    root: {
        borderRadius: 0
    },
    weatherIcon: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: '1rem',
        fontFamily: '"Weather&Time"',
        fontSize: '4em'
    },
    temp: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})

type Props = {
    day: string
    icon: string
}

const WeatherItem: React.FC<Props> = ({ day, icon }) => {
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
                                Rain
                            </Typography>
                        </Grid>
                        <Grid item className={classes.weatherIcon}>
                            {icon}
                        </Grid>
                        <Grid item className={classes.temp}>
                            <Typography variant="subtitle2" component="div">
                                -11°С
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                -21°С
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </CardActionArea>
        </Card>
    )
}

export default WeatherItem