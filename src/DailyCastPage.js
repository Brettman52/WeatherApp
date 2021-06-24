import React, {Component} from 'react'
import DailyCast from './DailyCast'
import Search from './Search'

export default class DailyCastPage extends Component {
    render() {
        return (
            <div>
                <Search/>
                <DailyCast/>
            </div>
        )
    }
}
