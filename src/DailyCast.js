import React, { Component } from 'react'
import WeatherContext from './weatherContext'
import styled from 'styled-components'

const WeatherContainer = styled.div`

`;

export default class DailyCast extends Component {

    static contextType = WeatherContext;


    render() {
        return (
            <WeatherContainer>

            </WeatherContainer>
        )
    }
}
