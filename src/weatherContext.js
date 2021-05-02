import React from 'react';


const WeatherContext = React.createContext({
    location: {},
    current: {},
    setWeather: () => {}
})

export default WeatherContext
