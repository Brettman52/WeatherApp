import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const CastList = styled.div `
    border: 1px solid black;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 20px;
    height: 30px;
    display: flex;
    justify-content: space-around;

    a {
        text-decoration: none;
        flex: 1 1 auto;
        flex-basis: 50%;
        border-radius: 20px;
        text-align: center;
        border-radius: 20px;
        height: 100%;
        line-height: 30px;
        color: black;
    
    }

    a:visited {
        color: black;
    }

    .active {
        background-color: lightblue;
    }
`;

export default class WeatherSelector extends Component {
    render() {
        return (
            <div>
                <CastList>
                    <NavLink to='/current'>
                        Currently
                    </NavLink>
                    <NavLink to='/daily'>
                        Daily
                    </NavLink>
                </CastList>
            </div>
        )
    }
}
