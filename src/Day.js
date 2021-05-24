import React, {Component} from 'react'
import styled from 'styled-components'
import WeatherContext from './weatherContext'

const WeatherContainer = styled.div `
    
`;

const Date = styled.div `
    font-size: 14px;
    font-weight: bold;
`;

const HighTemp = styled.div `
    color: blue;
    font-weight: bolder;
    font-size: 20px;
`;

const LowTemp = styled.div `
`;

const ConditionIcon = styled.img `
    height: 50px;
`;

const DayContainer = styled.div `
   text-align: center;
`;
export default class Day extends Component {

    static contextType = WeatherContext;

    //format date as mm/dd
    truncDate = (date) => {
        const dateSplit = date.split('');
        const dateArray = [];

        for (let i = 0; i <= dateSplit.length; i++) {
            if (i > 5) {
                if (dateSplit[i] === "-") {
                    dateSplit[i] = "/";
                }
                dateArray.push(dateSplit[i])
            }
        }
        return dateArray.join('')
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

    render() {
        const {id} = this.props
        const {forecastday} = this.context.forecast;
        const forecastDate = this.truncDate(forecastday[id].date);
        const highTemp = this.truncHigh(forecastday[id].day.maxtemp_f);
        const lowTemp = this.truncLow(forecastday[id].day.mintemp_f);
        const icon = forecastday[id].day.condition.icon;

        console.log(this.props);
        return (
            <div>
                <WeatherContainer>
                    <DayContainer>
                        <Date>{forecastDate}</Date>
                        <HighTemp>{highTemp}&#176;</HighTemp>
                        <LowTemp>{lowTemp}&#176;</LowTemp>
                        <ConditionIcon src={icon}/>
                    </DayContainer>
                </WeatherContainer>
            </div>
        )
    }
}
