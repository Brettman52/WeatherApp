import React, {Component} from 'react'
import DailyCast from './DailyCast'
import styled from 'styled-components'
import WeatherContext from './weatherContext'

const CastHeading = styled.div `
    padding-top: 30px;
    margin-left: 10px;
    font-size: 35px;
    text-align: center;
    color: white;

`;



export default class DailyCastPage extends Component {

    static contextType = WeatherContext;

    render() {
        console.log(this.props.history)

        return (
            <div>
                <CastHeading>
                  Currently
                </CastHeading>
                <DailyCast/>
            </div>
        )
    }
}
