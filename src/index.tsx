// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import Counter from './apis/send'
import './index.css'

const enterSiteTime = Date.now()
const API_KEY = '8B6B7D2D-BAAF-44B9-A2FB-0DEB94754714'
const PAGE_NAME = 'Weather view page'
const counter = new Counter()

counter.init(
    API_KEY,
    String(Math.random()).substr(2, 12),
    PAGE_NAME
)

window.counter = counter

window.addEventListener('unload', e => {
    counter.send('userOnSiteTime', Date.now() - enterSiteTime)
    counter.send('burgerMenuClicks', counter.getCounterValue('burgerMenuClicks'))
    counter.send('forecastsViewed', counter.getCounterValue('forecastsViewed'))
    counter.sendBatchRequest()
})

ReactDOM.render(<App />, document.getElementById('root'))