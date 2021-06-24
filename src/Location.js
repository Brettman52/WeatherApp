import React, {Component} from 'react'
import styled from 'styled-components'
import WeatherContext from './weatherContext'

const Town = styled.h2 ` 
    @media (min-width: 650px){
        color: whitesmoke; 
    }
`;

const Region = styled.div `
    margin-left: 10px;

    @media (min-width: 650px){
        display: inline;
        margin-left: 1px;
    }
`;

const Country = styled.div `
    margin-left: 10px;
`;

const AreaContainer = styled.div `
   top: 1vh;
   margin-left: 10px;
   font-size: 18px;

   @media (min-width: 650px){
        text-align: center;
    }
`;

export default class Location extends Component {

    static contextType = WeatherContext;

    render() {
        const townName = this.context.weather.location.name;
        const regionName = this.context.weather.location.region;
        const countryName = this.context.weather.location.country;
        return (
            <div>
                <AreaContainer>
                    <Town>
                        {townName},{regionName
                            ? <Region>{regionName}</Region>
                            : <Country>{countryName}</Country>}
                    </Town>
                </AreaContainer>
            </div>
        )
    }
}
