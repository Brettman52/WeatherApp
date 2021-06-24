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

    fetchWeather = async() => {
        const search = this.props.search;

        const params = {
            q: search,
            days: 3,
            key: config.API_KEY
        };

        const url = encodeURI(config.API_ENDPOINT + "?" + this.formatQueryParams(params));
        this.setState({searching: true})
        const resp = await fetch(url, {method: "GET"})

        if (resp.status === 400) {
            this.setState({error: `No results found for "${this.props.search}"`, searching: false})
            this
                .props
                .setInitOnError();
        } else if (!resp.ok) {
            this.setState({error: "Oops! Something went wrong. Please try again later.", searching: false})
            this
                .props
                .setInitOnError();
        } else {
            this.setState({
                error: null,
                weather: await resp.json(),
                searching: false
            })
            localStorage.setItem(STORAGE_KEY, this.props.search)
            this
                .props
                .onWeatherUpdate();
        }
    }

    //fetchWeather used only when page is refreshed (in this instance)
    componentDidMount() {
        const init = this.props.init;
        const path = window.location.pathname;

        // Did this because the app was getting stuck on the loading page when hitting
        // refresh after data had been fetched App was getting stuck on loading page
        // because upon reload, weather weas cleared from context, thus triggering the
        // conditional rendering of the <Loading /> component in the App component for the loading page
        if (!init && path === '/') 
            return;
        this.fetchWeather()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // if((this.props.search && this.props.init) && (this.props.search !==
        // prevProps.search || this.props.init !== prevProps.init)){
        // this.fetchWeather() }

        if ((this.props.search && this.props.init) && this.props.init !== prevProps.init) {
            this.fetchWeather()
        }

        // if((this.props.search && this.props.init) && (this.props.searchIndexStore !==
        // prevProps.searchIndexStore || this.props.init !== prevProps.init)){
        // this.fetchWeather() }
    }

    render() {

        // Created context value that includes onSearch method so that it can easily be
        // accessed no matter where the <Search /> component is in the component tree
        const contextValue = {
            searching: this.state.searching,
            error: this.state.error,
            weather: this.state.weather,
            onSearch: this.props.onSearch

        }
        console.log("Init is....", this.props.init)
        return (
            <WeatherContext.Provider value={contextValue}>
                {this.props.children}
            </WeatherContext.Provider>
        )
    }
}