import React, {Component} from 'react'
import background from './background.jpg'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Homepage'
import WeatherContext from './weatherContext'
import CurrentCastPage from './CurrentCastPage'
import DailyCastPage from './DailyCastPage'
import Header from './Header'
import {LocalDataProvider} from'./LocalDataProvider'

const Wrap = styled.div `
background-image: url(${background});
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
height: 100vh;
min-width: 250px;
`;

export default class App extends Component {

    state = {
        location: {
            name: "",
            region: "",
            country: ""
        },
        current: {
            last_updated: "",
            temp_f: "",
            condition: {
                text: "",
                icon: ""
            }
        },
        forecast: {
            forecastday: [
                {
                    date: "",
                    day: {
                        maxtemp_f: "",
                        mintemp_f: "",
                        condition: {
                            icon: ""
                        }
                    }
                }, {
                    date: "",
                    day: {
                        maxtemp_f: "",
                        mintemp_f: "",
                        condition: {
                            icon: ""
                        }
                    }
                }, {
                    date: "",
                    day: {
                        maxtemp_f: "",
                        mintemp_f: "",
                        condition: {
                            icon: ""
                        }
                    }
                }
            ]
        },
        searchInit: false
    }

    setWeather = (data) => {
        this.setState({location: data.location, current: data.current, forecast: data.forecast,})
    }

    setSearchInit = ()=> {
        this.setState({searchInit: true})
    }

    render() {

        const contextValue = {
            location: this.state.location,
            current: this.state.current,
            forecast: this.state.forecast,
            setSearchInit: this.setSearchInit,
            searchInit: this.state.searchInit,
            setWeather: this.setWeather
        }

        return (
            <Wrap>
                <Header/>
                <WeatherContext.Provider value={contextValue}>
                <LocalDataProvider>
                    <Switch>
                        <Route exact path='/' component={Homepage}/>
                        <Route path='/current' component={CurrentCastPage}/>
                        <Route path='/daily' component={DailyCastPage}/>
                    </Switch>
                </LocalDataProvider>
                </WeatherContext.Provider>
            </Wrap>
        )
    }
}
