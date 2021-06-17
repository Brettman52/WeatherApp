import React, {Component} from 'react'
import config from './config'
import {STORAGE_KEY} from './App'

export const WeatherContext = React.createContext({})

export class LocalDataProvider extends Component {

    state = {
        searching: false,
        error: null,
        weather: null
    }

    formatQueryParams = params => {
        const queryItems = Object
        .keys(params)
        .map((key) => `${key}=${params[key]}`);
        return queryItems.join("&");
    }

    fetchWeather = async () => {
        const search = this.props.search

        if(!search) return

        const params = {
            q: search,
            days: 3,
            key: config.API_KEY
        };

        const url = encodeURI(config.API_ENDPOINT + "?" + this.formatQueryParams(params));
        this.setState({ searching: true})
        const resp = await fetch(url, {method: "GET"})

        if(resp.status === 400){
            this.setState({
                error: `No results found for "${this.props.search}"`,
                searching: false
            })
        }
        else if(!resp.ok) {
            this.setState({
                error: "Oops! Something went wrong. Please try again later.",
                searching: false
            })
        }
        else {
            this.setState({
                error: null,
                weather: await resp.json(),
                searching: false
            })
            localStorage.setItem(STORAGE_KEY, this.props.search)
            this.props.callback()
        }
    }

    componentDidMount() {
        this.fetchWeather()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.search && this.props.search !== prevProps.search){
            this.fetchWeather()
        }
    }

    render() {
        return (
          <WeatherContext.Provider value={this.state}>
              {this.props.children}
          </WeatherContext.Provider>
        )
    }
}
