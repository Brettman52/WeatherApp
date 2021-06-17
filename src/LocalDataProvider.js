import {Component} from 'react'
import WeatherContext from './weatherContext'
import config from './config'

export class LocalDataProvider extends Component {

    static contextType = WeatherContext;

    componentDidMount() {
        const savedWeatherSearch = localStorage.getItem('data');

        if (this.context.searchInit === false) {
            const base_url = config.API_ENDPOINT;

            function formatQueryParams(params) {
                const queryItems = Object
                    .keys(params)
                    .map((key) => `${key}=${params[key]}`);
                return queryItems.join("&");
            }

            const params = {
                q: savedWeatherSearch,
                days: 3,
                key: config.API_KEY
            };

            const queryString = formatQueryParams(params);
            const url = encodeURI(base_url + "?" + queryString);
            const options = {
                method: "GET"
            };

            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw new Error("Oops! Something went wrong. Please try again later.");
                }
                return response;

            }).then((response) => response.json()).then((data) => {

                this
                    .context
                    .setWeather(data);

                this.setState({setData: true})

                localStorage.setItem("data", savedWeatherSearch)

            }).catch((err) => {
                this.setState({error: err.props});
            });
        }
    }

    render() {
        return this.props.children
    }
}
