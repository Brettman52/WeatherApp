import React from 'react';

const WeatherContext = React.createContext({
    location: {
        name: "",
        region: "",
        country: "",
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
    searchInit: false,
    setWeather: () => {},
    setCachedWeather: () => {},
})

export default WeatherContext
