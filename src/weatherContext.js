import React from 'react';


const WeatherContext = React.createContext({
    location: {},
    current: {},
    forecast: {},
    initiated: false,
    setWeather: () => {},
    searchInit: () =>{},
})

export default WeatherContext
