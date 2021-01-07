# Rainbow

`Rainbow` - это приложение для просмотра погоды, построенное на основе [React.js](https://ru.reactjs.org/). UI был разработан с помощью библиотеки [Material-UI](https://material-ui.com/ru/), данные взяты из сервиса [OpenWeather](https://openweathermap.org/).

## Технологии

* [OpenWeather API](https://openweathermap.org/)
* Material-UI
* amCharts
* React
* React Router
* Typescript
* Context API

## Запуск

1) git clone <https://github.com/doyouwannatea/Rainbow>
2) cd Rainbow/
3) npm i
4) npm start

## P.S.

В проекте используется базовая подписка OpenWeather. Базовая подписка включает в себя 500 запросов на сервер и 10 запросов в минуту,
так что в случае, если подписка закончится, то можно включить тестовые данные.  
Для включения тестовых данных в файле `WeatherService.ts` переключить `isDummyData` в значение `true`.
