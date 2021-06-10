import React, {Component} from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import WeatherContext from './weatherContext'
import Error from './Error'
import config from './config'

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

export default class Homepage extends Component {

    static contextType = WeatherContext;

    state = {
        search: ""
    }

    //Focus on input field after component mounts
    componentDidMount() {
        this
            .cityInput
            .focus();
    }
    //set state of search on change of input
    controlSearch = (search) => {
        this.setState({search})
    }

    // Fetch data, handle various errors (if any), and set weather search term in in localStorage
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.search === "") {
            alert("Enter a search to continue.")
        } else {
            const base_url = config.API_ENDPOINT;

            function formatQueryParams(params) {
                const queryItems = Object
                    .keys(params)
                    .map((key) => `${key}=${params[key]}`);
                return queryItems.join("&");
            }

            const params = {
                q: this.state.search,
                days: 3,
                key: config.API_KEY
            };

            const queryString = formatQueryParams(params);
            const url = encodeURI(base_url + "?" + queryString);

            const options = {
                method: "GET"
            };

            fetch(url, options).then((response) => {
                if (response.status === 400) {
                    throw new Error(`No results found for "${this.state.search}"`);
                } else if (!response.ok) {
                    throw new Error("Oops! Something went wrong. Please try again later.");
                }

                return response;

            }).then((response) => response.json()).then((data) => {

                this
                    .context
                    .setSearchInit();
                this
                    .context
                    .setWeather(data);

                this
                    .props
                    .history
                    .push('/current');
                    
                localStorage.setItem("data", this.state.search)

            }).catch((err) => {
                this.setState({error: err.props});
                this
                    .cityInput
                    .focus();
            });
        }
    }

    render() {
        return (
            <div>
                <CityForm onSubmit={this.handleSubmit}>
                    <CityInput
                        ref={(ref) => this.cityInput = ref}
                        placeholder="Search city or zip code"
                        onChange={e => this.controlSearch(e.target.value)}/>
                    <SubmitButton type="submit">
                        GO
                    </SubmitButton>
                </CityForm>
                <Error error={this.state.error}/>
            </div>
        )
    }
}
