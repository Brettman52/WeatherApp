import React from 'react';

const WeatherContext = React.createContext({
    weather: {
        location: {
            name: "",
            region: "",
            country: ""
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
        }
    },
    searchInit: false,
    searching: false,
    error: null,
    onSearch: () => {},
    
})

export default WeatherContext