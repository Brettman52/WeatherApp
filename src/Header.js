import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const WeatherHeader = styled.header `
    color: whitesmoke;
    font-size: 35px;
    text-align: center;
    top: 10px;
    margin-bottom: 50px;
    background-color: rgba(179, 177, 173, .6);
    padding: 10px;
    
    a {
        text-decoration: none;
        color: whitesmoke;
    }

    a:visited {
        color: whitesmoke;
    }

    @media (min-width: 650px) {

        a {
            color: black;
        }

        a:visited {
            color: black;
        }
    }
`;

export default class Header extends Component {
    render() {
        return (
            <div>
                <WeatherHeader>
                    <Link to='/'>
                        Weather on Demand
                    </Link>
                </WeatherHeader>
            </div>
        )
    }
}
