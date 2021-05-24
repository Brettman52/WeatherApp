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

    state = {
        search: "",
        error: ""
    }

    controlSearch = (search) => {
        this.setState({search})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // API Key: 366f8b17c2784407b7e141220212604

        sessionStorage.removeItem("data");

        if (this.state.search === "") {
            alert("Enter a search to continue.")
        } else {
            const base_url = "https://api.weatherapi.com/v1/forecast.json";

            function formatQueryParams(params) {
                const queryItems = Object
                    .keys(params)
                    .map((key) => `${key}=${params[key]}`);
                return queryItems.join("&");
            }

            const params = {
                q: this.state.search,
                days: 3,
                key: "366f8b17c2784407b7e141220212604"
            };

            const queryString = formatQueryParams(params);
            const url = encodeURI(base_url + "?" + queryString);

            const options = {
                method: "GET"
            };

            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong, please try again later.");
                }
                return response;
            }).then((response) => response.json()).then((data) => {
                this
                    .context
                    .setWeather(data);
                this
                    .props
                    .history
                    .push('/current');
                sessionStorage.setItem("data", JSON.stringify(data))
                console.log(data);
            }).catch((err) => {
                this.setState({error: err.message});
            });
        }
    }

    render() {
        return (
            <div>
                <CityForm onSubmit={this.handleSubmit}>
                    <CityInput onChange={e => this.controlSearch(e.target.value)}/>
                    <SubmitButton type="submit">
                        GO
                    </SubmitButton>
                </CityForm>
            </div>
        )
    }
}
