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

const Wrap = styled.div`
  background-image: url(${background});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  min-width: 250px;
`
export const STORAGE_KEY = 'search'

class App extends Component {

  state = {
    search: localStorage.getItem(STORAGE_KEY)
  }

  onSearch = value => {
    this.setState({search: value})
  }

  onWeatherUpdate = () => {
    this.props.history.push('/current')
  }

  render() {
    return (
      <Wrap>
        <Header/>
        <LocalDataProvider search={this.state.search} callback={this.onWeatherUpdate}>
          <WeatherContext.Consumer>
            {({weather}) => (
              <Switch>
                <Route exact path="/" render={() => <Homepage onSearch={this.onSearch}/>}/>
                {weather && (
                  <>
                    <Route path="/current" component={CurrentCastPage}/>
                    <Route path="/daily" component={DailyCastPage}/>
                  </>
                )}
                {!weather && (
                  <Route render={() => <div>fetching</div>}/>
                )}
              </Switch>
            )}
          </WeatherContext.Consumer>
        </LocalDataProvider>
      </Wrap>
    )
  }
}

export default withRouter(App)