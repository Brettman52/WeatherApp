import React, {Component} from 'react'
import CurrentCast from './CurrentCast'
import Homepage from './Homepage'

export default class CurrentCastPage extends Component {

    render() {
        
        return (
            <div>
                <Homepage />
                <CurrentCast/>
            </div>
        )
    }
}
