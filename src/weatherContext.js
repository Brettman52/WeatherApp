import React from 'react';

const WeatherContext = React.createContext({
    location: {
        name:{},
        region:{},
        country:{}
    },

  })
  
  export default WeatherContext