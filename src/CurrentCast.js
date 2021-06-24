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

    // Convert extracted time from 24-hour format to 12-hour format
    getLastUpdated = (timeDate) => {
        const extractedTime = timeDate.split(' ')[1]

        return moment(extractedTime, "HH:mm::ss").format("h:mmA");
    }

    // Test code 53646543 to exhibit conditional rendering based on available
    // information This code will render the following [city, country] instead of
    // [city, state] because state info is not available in all countries

    render() {
        const lastUpdated = this.getLastUpdated(this.context.weather.current.last_updated);
        const currentTemp = Math.trunc(this.context.weather.current.temp_f);
        const conditionText = this.context.weather.current.condition.text;
        const highTemp = Math.trunc(this.context.weather.forecast.forecastday[0].day.maxtemp_f);
        const lowTemp = Math.trunc(this.context.weather.forecast.forecastday[0].day.mintemp_f);
        const icon = this.context.weather.current.condition.icon;

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
