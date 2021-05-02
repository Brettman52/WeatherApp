import React, {Component} from 'react'
import DailyCast from './DailyCast'
import styled from 'styled-components'

const CastHeading = styled.header`
    position: relative;
    top: 10px;
`;


export default class DailyCastPage extends Component {

    render() {
        return (
            <div>
              <CastHeading>Current weather</CastHeading>
                <DailyCast/>
            </div>
        )
    }
}
