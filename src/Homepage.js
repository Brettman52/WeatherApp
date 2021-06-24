import React, {Component} from 'react'
import WeatherContext from './weatherContext'
import Search from './Search'

export default class Homepage extends Component {

    static contextType = WeatherContext

    render() {
        return (
            <div>
                <Search/>
            </div>
        )
    }
}