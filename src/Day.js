import React, {Component} from 'react'
import styled from 'styled-components'
import WeatherContext from './weatherContext'

const WeatherContainer = styled.div `
    
`;

const Date = styled.div `
    font-size: 14px;
    font-weight: bold;
    margin-right: .5rem;
    

    @media (min-width: 1000px) {
        font-size: 20px;
        margin-right: .7rem;
    }
`;

const HighTemp = styled.div `
    color: blue;
    font-weight: bolder;
    font-size: 20px;
    
    @media (min-width: 1000px) {
        font-size: 26px;
    }

`;

const LowTemp = styled.div `
    @media (min-width: 1000px) {
        font-size: 20px;
    }
`;

const ConditionIcon = styled.img `
    height: 50px;

    @media (min-width: 1000px) {
        height: 60px;
        width:60px;
    }
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

    render() {
        const {id} = this.props
        const {forecastday} = this.context.weather.forecast;
        const forecastDate = this.truncDate(forecastday[id].date);
        const highTemp = Math.trunc(forecastday[id].day.maxtemp_f);
        const lowTemp = Math.trunc(forecastday[id].day.mintemp_f);
        const icon = forecastday[id].day.condition.icon;

        return (
            <div>
                <WeatherContainer>
                    <DayContainer>
                        {this.props.id === 0 && <Date>Today</Date>}
                        {this.props.id !== 0 && <Date>{forecastDate}</Date>}
                        <HighTemp>{highTemp}&#176;</HighTemp>
                        <LowTemp>{lowTemp}&#176;</LowTemp>
                        <ConditionIcon src={icon}/>
                    </DayContainer>
                </WeatherContainer>
            </div>
        )
    }
}
