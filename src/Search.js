import React, {Component} from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import WeatherContext from './weatherContext'

const CityForm = styled.form `
    text-align: center;
    margin-top: 28px;
`;

const CityInput = styled.input `
    border-radius: 5px;
    opacity: .7;
    margin-top: 10px;
    font-size: 18px;
`;

const SubmitButton = styled(Button)`
&& {
    height: 23px;
    background-color: ghostwhite;
    opacity: .8;
    margin-left: 2px;
}
`;

export default class Search extends Component {

    static contextType = WeatherContext;

    cityInput = React.createRef()

    onSubmit = e => {
        e.preventDefault()
        this.context.onSearch(this.cityInput.current.value)
        e.target.reset();
    }

    render() {
        return (
            <div>
                <CityForm onSubmit={this.onSubmit}>
                    <CityInput ref={this.cityInput} placeholder="Search city or zip code"/>
                    <SubmitButton type="submit">
                        GO
                    </SubmitButton>
                </CityForm>
            </div>
        )
    }
}
