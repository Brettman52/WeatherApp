import './App.css';
import React, {Component} from 'react'
import background from './background.jpg'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Homepage';
import WeatherContext from './weatherContext'
import DailyCastPage from './DailyCastPage';

const Wrap = styled.div `
background-image: url(${background});
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
height: 100vh;
width: 100vw;
`;

export default class App extends Component {

    state = {
        location: {},
        current: {},
        forecast: {},
        initiated: false,
    }

    setWeather = (data) => {
        this.setState({
            location: data.location, 
            current: data.current,
            forecast: data.forecast,
        })
    }

    searchInit = () => {
        this.setState({
            initiated: true,
        })
    }

    render() {
        
        const contextValue = {
            location: this.state.location,
            current: this.state.current,
            forecast: this.state.forecast,
            initiated: this.state.initiated,
            setWeather: this.setWeather,
            searchInit: this.searchInit,
        }

        return (
            <Wrap>
                <WeatherContext.Provider value={contextValue}>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path= '/daily' component={(this.state.initiated === true) ? DailyCastPage : Homepage}/>
                </Switch>
                </WeatherContext.Provider>
            </Wrap>
        )
    }
}
