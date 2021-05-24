import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'
import moment from 'moment'
import WeatherSelector from './WeatherSelector'
import Card from '@material-ui/core/Card';

const Wrap = styled.div `
    margin-left: auto;
    margin-right: auto;
    min-width: 250px;
`;

const AreaContainer = styled.div `
   position: relative;
   top: 1vh;
   margin-left: 10px;
   font-size: 18px;
`;

const WeatherContainer = styled(Card)`
    && {
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 20vh;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
    margin-top: 10px;
    }
`;

const AsOf = styled.div `
    position: absolute;
    top: 20px;
    left: 20px;
    min-width: 207px;
`;

const Town = styled.h2 `  
`;

const Region = styled.div `
    margin-left: 10px;
`;

const Temp = styled.div `
    position: absolute;
    top: 40px;
    left: 20px;
    font-size: 40px;
    font-weight: bold;
`;

const Condition = styled.div `
    position: absolute;
    top: 90px;
    left: 20px;  
`;

const ConditionIcon = styled.img `
    position: absolute;
    left: 75%;
    top: 25%;
`;

const HighAndLow = styled.div `
    position: absolute;
    left: 76%;
    top: 70%;
`;

const LocalTime = styled.span `
    font-size: 12px;
`;

const DegreeUnits = styled.span `
    font-size: 20px;
`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;

    // Extract only the time from the JSON response in a 12-hour time format
    getLastUpdated = (timeDate) => {
        const timeArray = timeDate.split("");
        const timeOnlyArr = [];

        for (let i = 0; i <= 15; i++) {
            if (i > 10) {
                timeOnlyArr.push(timeArray[i])
            }
        }
        const joinedTime = timeOnlyArr.join("");

        return moment(joinedTime, "HH:mm::ss").format("h:mmA");
    }
    // Remove decimal value from temp
    getWholeTemp = (temp) => {
        const newTemp = Math.trunc(temp);

        return newTemp;
    }
    // Remove decimal value from high temp
    truncHigh = (highTemp) => {
        const newHighTemp = Math.trunc(highTemp);

        return newHighTemp;
    }
    // Remove decimal value from low temp
    truncLow = (lowTemp) => {
        const newLowTemp = Math.trunc(lowTemp);

        return newLowTemp;
    }

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
        const lastUpdated = this.getLastUpdated(this.context.current.last_updated);
        const currentTemp = this.getWholeTemp(this.context.current.temp_f);
        const conditionText = this.context.current.condition.text;
        const highTemp = this.truncHigh(this.context.forecast.forecastday[0].day.maxtemp_f);
        const lowTemp = this.truncLow(this.context.forecast.forecastday[0].day.mintemp_f);
        const icon = this.context.current.condition.icon;

        return (
            <Wrap>
                <AreaContainer>
                    <Town>
                        {townName},
                        <Region>{regionName}</Region>
                    </Town>
                </AreaContainer>
                <WeatherSelector/>
                <WeatherContainer>
                    <AsOf>
                        As of {lastUpdated}
                        <LocalTime>
                            (local time)</LocalTime>
                    </AsOf>
                    <Temp>
                        {currentTemp}&#176;<DegreeUnits>F</DegreeUnits>
                    </Temp>
                    <Condition>{conditionText}</Condition>
                    <ConditionIcon src={icon}/>
                    <HighAndLow>{highTemp}&#176;/{lowTemp}&#176;</HighAndLow>
                </WeatherContainer>
            </Wrap>
        )
    }
}
