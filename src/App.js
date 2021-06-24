import React, {Component} from 'react'
import background from './background.jpg'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Homepage'
import CurrentCastPage from './CurrentCastPage'
import DailyCastPage from './DailyCastPage'
import Header from './Header'
import {LocalDataProvider} from './LocalDataProvider'
import {withRouter} from 'react-router'
import {WeatherContext} from './LocalDataProvider'
import LoadingScreen from './LoadingScreen'

const Wrap = styled.div `
  background-image: url(${background});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  min-width: 250px;
`
export const STORAGE_KEY = 'search';

class App extends Component {

    state = {
        search: localStorage.getItem(STORAGE_KEY),
        init: false
    }

    onSearch = value => {
        this.setState({search: value, init: true})
    }

    setInitOnError = () => {
        this.setState({init: false})
    }

    // If go button has been pressed, go to /current page Otherwise (if the page is
    // being refreshed), stay on the currently displayed page

    onWeatherUpdate = () => {
        if (this.state.init === true) {
            this
                .props
                .history
                .push('/current')
        } else {
            this
                .props
                .history
                .push(window.location.pathname)
        }
        this.setState({init: false})
    }

    render() {
        return (
            <Wrap>
                <Header/>
                <LocalDataProvider
                    search={this.state.search}
                    setInitOnError={this.setInitOnError}
                    init={this.state.init}
                    onWeatherUpdate={this.onWeatherUpdate}
                    onSearch={this.onSearch}
                    >
                    <WeatherContext.Consumer>
                        {({weather}) => (
                            <Switch>
                                <Route exact path="/" render={() => <Homepage onSearch={this.onSearch}/>}/> {weather && (
                                    <Switch>
                                        <Route path="/current" component={CurrentCastPage}/>
                                        <Route path="/daily" component={DailyCastPage}/>
                                    </Switch>
                                )}
                                {!weather && (<LoadingScreen/>)}
                            </Switch>
                        )}
                    </WeatherContext.Consumer>
                </LocalDataProvider>
            </Wrap>
        )
    }
}

export default withRouter(App)