import React, {Component} from 'react'
import Header from './Header'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import WeatherContext from './weatherContext'

const CityForm = styled.form `
    text-align: center;
    margin-top: 28px;
        
`;

const CityInput = styled.input `
    border-radius: 5px;
    opacity: .4;
    margin-top: 10px;
`;

const SubmitButton = styled(Button)`
&& {
    height: 20px;
    width: 0px;
    background-color: ghostwhite;
    opacity: .5;
    margin-left: 2px;
     
}
`;

export default class Homepage extends Component {

    static contextType = WeatherContext;

    handleSubmit = (e) => {
        e.preventDefault();

        this
            .props
            .history
            .push('/daily');
    }

    render() {
        return (
            <div>
                <Header/>
                <CityForm onSubmit={this.handleSubmit}>
                    <CityInput/>
                    <SubmitButton type="submit">
                        GO
                    </SubmitButton>
                </CityForm>
            </div>
        )
    }
}
