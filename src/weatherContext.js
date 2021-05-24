import React from 'react';

const WeatherContext = React.createContext({
    location: {
        name: "",
        region: ""
    },
    current: {
        last_updated: "",
        temp_f: "",
        condition: {
            text: "",
            icon: ""
        }
    },
    forecast: {
        forecastday: [
            {
                date: "",
                day: {
                    maxtemp_f: "",
                    mintemp_f: "",
                    condition: {
                        icon: ""
                    }
                }
            }, {
                date: "",
                day: {
                    maxtemp_f: "",
                    mintemp_f: "",
                    condition: {
                        icon: ""
                    }
                }
            }, {
                date: "",
                day: {
                    maxtemp_f: "",
                    mintemp_f: "",
                    condition: {
                        icon: ""
                    }
                }
            }
        ]
    },
    setWeather: () => {},
    searchInit: () => {},
    setCachedWeather: () => {}
})

export default WeatherContext
