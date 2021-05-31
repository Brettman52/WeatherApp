import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const CastList = styled.div `
    border: 3px solid gray;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 20px;
    height: 30px;
    display: flex;
    justify-content: space-around;
    

    a {
        text-decoration: none;
        flex-basis: 50%;
        border-radius: 20px;
        text-align: center;
        border-radius: 20px;
        height: 100%;
        line-height: 30px;
        font-size: 20px;
        color: white;
    }

    a:visited {
        color: black;
        color: white;
    }

    .active {
        background-color: papayawhip;
    }

    a.active {
        color: black;
    }

    @media (min-width: 650px) {
        margin-left: 50px;
        margin-right: 50px;
    }

    @media (min-width: 1000px) {
        margin-left: 200px;
        margin-right: 200px;
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
