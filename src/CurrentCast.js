import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'
import moment from 'moment'
import WeatherSelector from './WeatherSelector'
import Card from '@material-ui/core/Card'
import Location from './Location'

const Wrap = styled.div `
    margin-left: auto;
    margin-right: auto;
    
`;

const DegreeUnits = styled.span `
    font-size: 20px;
`;

const WeatherContainer = styled(Card)`
    && {
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 8rem;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @media (min-width: 650px){
        margin-left: 50px;
        margin-right: 50px;
       
    }

    @media (min-width: 1000px){
        margin-left: 200px;
        margin-right: 200px;
        justify-content: space-around;
        height: 10rem;
       
        }
    }
`;

const DataContainer1 = styled.div `
    margin-top: 15px;
    margin-left: 20px;
`;

const DataContainer2 = styled.div `
    margin-top: 15px;
    margin-right: 20px;

    @media (min-width: 1000px) {
        font-size: 30px;
    }
`;

const AsOf = styled.div `
        @media (min-width: 1000px) {
        font-size: 20px;
    }
`;

const Temp = styled.div `
    font-size: 40px;
    font-weight: bold;

    @media (min-width: 1000px) {
        font-size: 50px;
    }
`;

const Condition = styled.div `
        @media (min-width: 1000px) {
        font-size: 20px;
    }
`;

const ConditionIcon = styled.img `
     
`;

const HighAndLow = styled.div `
       @media (min-width: 1000px) {
        font-size: 20px;
    }
`;

const LocalTime = styled.span `
    font-size: 12px;
`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;

    // Convert extracted time from JSON object to 12-hour format
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
    // Remove decimal value from whole temp
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

    // Test code 53646543 to exhibit conditional rendering based on available information

    render() {

        const lastUpdated = this.getLastUpdated(this.context.current.last_updated);
        const currentTemp = this.getWholeTemp(this.context.current.temp_f);
        const conditionText = this.context.current.condition.text;
        const highTemp = this.truncHigh(this.context.forecast.forecastday[0].day.maxtemp_f);
        const lowTemp = this.truncLow(this.context.forecast.forecastday[0].day.mintemp_f);
        const icon = this.context.current.condition.icon;

        return (
            <Wrap>
                <Location/>
                <WeatherSelector/>
                <WeatherContainer>
                    <DataContainer1>
                        <AsOf>
                            As of {lastUpdated}&nbsp;
                            <LocalTime>
                                (local time)</LocalTime>
                        </AsOf>
                        <Temp>
                            {currentTemp}&#176;<DegreeUnits>F</DegreeUnits>
                        </Temp>
                        <Condition>{conditionText}</Condition>
                    </DataContainer1>
                    <DataContainer2>
                        <ConditionIcon src={icon}/>
                        <HighAndLow>{highTemp}&#176;/{lowTemp}&#176;</HighAndLow>
                    </DataContainer2>
                </WeatherContainer>
            </Wrap>
        )
    }
}
