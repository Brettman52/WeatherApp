import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'
import WeatherSelector from './WeatherSelector'
import Card from '@material-ui/core/Card'
import Day from './Day'

const Town = styled.h2 `  
`;

const Region = styled.div `
    margin-left: 10px;
`;

const AreaContainer = styled.div `
   position: relative;
   top: 1vh;
   margin-left: 10px;
   font-size: 18px;
`;

const ForecastContainer = styled(Card)`
      && {
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 25vh;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    min-width: 200px;
    }
`;

const ForecastHeader = styled.div `
    text-align: center;
    padding-bottom: 5px;
    font-size: 20px;
    border-bottom: 1px solid black;;
    margin-bottom: 15px;
    margin-left: 10%;
    margin-right: 10%;
`;

const DayContainer = styled.div `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;

    //Persist weather data in context/state on refresh
    UNSAFE_componentWillMount() {
        const savedWeatherData = sessionStorage.getItem("data");
        const cachedWeather = JSON.parse(savedWeatherData);

        if (!cachedWeather) {
            return;
        } else {
            this
                .context
                .setWeather(cachedWeather);
        }
    }

    render() {
        const townName = this.context.location.name;
        const regionName = this.context.location.region;
        const weatherRow = this
            .context
            .forecast
            .forecastday
            .map((_, i) => <Day key={i} id={i}/>)

        return (
            <div>
                <AreaContainer>
                    <Town>
                        {townName},
                        <Region>{regionName}</Region>
                    </Town>
                </AreaContainer>
                <WeatherSelector/>
                <ForecastContainer>
                    <ForecastHeader>
                        3-Day Outlook
                    </ForecastHeader>
                    <DayContainer>
                        {weatherRow}
                    </DayContainer>
                </ForecastContainer>
            </div>
        )
    }
}
