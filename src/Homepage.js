import React, {Component} from 'react'
import Error from './Error'
import {WeatherContext} from './LocalDataProvider'
import Search from './Search'



export default class Homepage extends Component {

    static contextType = WeatherContext

    render() {
        return (
            <div>
                <Search/>
                <Error error={this.context.error}/>
            </div>
        )
    }
}