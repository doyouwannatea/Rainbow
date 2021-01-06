import React, { useEffect } from 'react'
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { makeStyles, Paper, useTheme } from '@material-ui/core'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { IWeatherListItem } from '../types'

am4core.useTheme(am4themes_animated)

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '45vh'
    },
    paper: {
        padding: '1.5rem 1rem 1rem 1rem'
    }
})

type Props = {
    weatherList: IWeatherListItem[]
}

const Chart: React.FC<Props> = ({ weatherList }) => {
    const { palette: { type } } = useTheme()
    const classes = useStyles()

    useEffect(() => {
        const chart = am4core.create('chart', am4charts.XYChart)
        chart.data = weatherList

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
        dateAxis.renderer.grid.template.location = 0
        if (type === 'dark') {
            dateAxis.renderer.grid.template.stroke = am4core.color('#fff')
            dateAxis.renderer.labels.template.fill = am4core.color('#fff')
        }

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis!.tooltip!.disabled = true
        valueAxis.renderer.minWidth = 35
        if (type === 'dark') {
            valueAxis.renderer.grid.template.stroke = am4core.color('#fff')
            valueAxis.renderer.labels.template.fill = am4core.color('#fff')
        }

        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.dateX = 'dt'
        series.dataFields.valueY = 'temp'
        series.tooltipText = '{valueY.value}'
        if (type === 'dark') {
            series.stroke = am4core.color('#fff')
        }

        chart.cursor = new am4charts.XYCursor()
        chart.cursor.behavior = 'none';
        return () => {
            chart.dispose()
        }

    }, [type])

    return (
        <Paper className={classes.paper}>
            <div id="chart" className={classes.root}></div>
        </Paper>
    )
}

export default Chart