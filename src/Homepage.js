import React, {Component} from 'react'
import Header from './Header'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import WeatherContext from './weatherContext'
import {Link} from 'react-router-dom'

const CityForm = styled.form `
    text-align: center;
    margin-top: 28px;
        
`;

const CityInput = styled.input `
    border-radius: 5px;
    opacity: .4;
`;

const SubmitButton = styled(Button)`
&& {
    height: 20px;
    width: 0px;
    background-color: ghostwhite;
    opacity: .8;
    margin-left: 2px;
     
}
`;

export default class Homepage extends Component {

    static contextType = WeatherContext;

    render() {
        return (
            <div>
                <Header/>
                <CityForm>
                    <CityInput/>
                    <Link to='/daily'>
                        <SubmitButton color="primary">
                            GO
                        </SubmitButton>
                    </Link>
                </CityForm>
            </div>
        )
    }
}
