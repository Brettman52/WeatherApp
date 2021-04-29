import React, {Component} from 'react'
import styled from 'styled-components'

const DickButt = styled.img `

@media (max-width: 768px) {
    height: 350px;
    width: 350px;
 
}
    height: 1000px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    display: block;
`;

export default class DailyCastPage extends Component {

    render() {
        return (
            <div>
                <DickButt src="https://i.imgur.com/etjgJ2D.jpg" alt="dickbutt"/>
            </div>
        )
    }
}
