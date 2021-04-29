import React, { Component } from 'react'
import styled from 'styled-components'

const WeatherHeader = styled.header`
    color: whitesmoke;
    font-size: 50px;
    margin-left: 100px;


@media (max-width: 768px) {
    font-size: 25px;
    display: flex;
    justify-content: center;
    margin-left: 0px;
}
`;


export default class Header extends Component {
    render() {
        return (
            <div>
                <WeatherHeader>
                    <span style={{marginTop:"10px"}}>Weather on demand</span>
                </WeatherHeader>
            </div>
        )
    }
}
