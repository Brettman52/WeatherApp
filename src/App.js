import './App.css';
import React, {Component} from 'react'
import {mockData} from './mockData';
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
        current: {}
    }

    setWeather = () => {
        this.setState({location: mockData.location, current: mockData.current})
    }

    componentDidMount(){
        this.setWeather()
    }

    render() {
        
        const contextValue = {
            location: this.state.location,
            current: this.state.current,
            setWeather: this.setWeather
        }

        return (
            <Wrap>
                <Switch>
                    <WeatherContext.Provider value={contextValue}>
                        <Route exact path='/' component={Homepage}/>
                        <Route path='/daily' component={DailyCastPage}/>
                    </WeatherContext.Provider>
                </Switch>
            </Wrap>
        )
    }
}
