import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'
import moment from 'moment';

const Wrap = styled.div `
`;

const WeatherContainer = styled.div `
    background-color: rgba(232, 226, 226, .9);
    border-radius: 5px;
    height: 20vh;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
    top: 10vh;
    
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

const AreaContainer = styled.div`
   position: relative;
   top: 9vh;
   margin-left: 10px;
   font-size: 18px;
`;

const Temp = styled.div`
    position: absolute;
    top: 40px;
    left: 25px;
    font-size: 40px;
    font-weight: bold;
`;

const Condition = styled.div`
    position: absolute;
    top: 90px;
    left: 20px;
    
`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;

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

    getWholeTemp = (temp) => {
     const newTemp = Math.trunc(temp);

        return newTemp;
    }

    render() {
        const townName = this.context.location.name;
        const regionName = this.context.location.region;
        const lastUpdated = this.context.current.last_updated;
        const tempInF = this.context.current.temp_f;
        const conditionText = this.context.current.condition.text;
      


        return (
            <Wrap>
                <AreaContainer>
                   <Town>
                        {townName},
                        <Region>{regionName}</Region>
                    </Town>
                </AreaContainer>
                <WeatherContainer>
                    <AsOf>
                        As of {lastUpdated !== undefined && this.getLastUpdated(lastUpdated)} <span style={{fontSize:"12px"}}>(local time)</span>
                    </AsOf>
                    <Temp>{tempInF !== undefined && this.getWholeTemp(tempInF)}&#176;<span style={{fontSize:"20px"}}>F</span></Temp>
                    <Condition>{conditionText}</Condition>
                </WeatherContainer>
            </Wrap>
        )
    }
}
