import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'
import WeatherSelector from './WeatherSelector'
import Card from '@material-ui/core/Card'
import Day from './Day'
import Location from './Location'

const ForecastContainer = styled(Card)`
      && {
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 10rem;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    min-width: 200px;

    @media (min-width: 650px){
        margin-left: 50px;
        margin-right: 50px;
    }

    @media (min-width: 1000px) {
        margin-left: 200px;
        margin-right: 200px;
        height: 14rem;
    }
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

    @media (min-width: 1000px) {
        font-size: 25px;
    }
`;

const DayContainer = styled.div `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;

    render() {
        const weatherRow = this
            .context
            .weather
            .forecast
            .forecastday
            .map((_, i) => <Day key={i} id={i}/>)

        return (
            <div>
                <Location/>
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
