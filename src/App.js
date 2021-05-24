import {Component} from 'react'
import background from './background.jpg'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Homepage'
import WeatherContext from './weatherContext'
import CurrentCastPage from './CurrentCastPage'
import DailyCastPage from './DailyCastPage'
import Header from './Header'

const Wrap = styled.div `
background-image: url(${background});
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
height: 100vh;

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black !important;
}
`;

export default class App extends Component {

    state = {
        location: {
            name: "",
            region: ""
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
    }

    setWeather = (data) => {
        this.setState({location: data.location, current: data.current, forecast: data.forecast, initiated: true})
    }

    render() {
        const contextValue = {
            location: this.state.location,
            current: this.state.current,
            forecast: this.state.forecast,
            setWeather: this.setWeather
        }

        return (
            <Wrap>
                <Header/>
                <WeatherContext.Provider value={contextValue}>
                    <Switch>
                        <Route exact path='/' component={Homepage}/>
                        <Route path='/current' component={CurrentCastPage}/>
                        <Route path='/daily' component={DailyCastPage}/>
                    </Switch>
                </WeatherContext.Provider>
            </Wrap>
        )
    }
}
