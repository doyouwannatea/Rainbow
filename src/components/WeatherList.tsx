import React from 'react'

import WeatherItem from './WeatherItem'

const WeatherList = () => {
    const makeCards = () => {
        const cards = []
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const daysIcons = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

        for (let i = 0; i < 7; i++) {
            cards.push(<WeatherItem key={i} icon={daysIcons[i]} day={days[i]}/>)
        }

        return cards
    }

    return (
        <>
            {
                makeCards()
            }
        </>
    )
}
export default WeatherList