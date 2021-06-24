import React, {Component} from 'react'
import styled from 'styled-components'
import Search from './Search'

const ErrorMessage = styled.div `
    font-size: 24px;
    text-align: center;
    background-color: rgba(232, 226, 226, .9);
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    line-height: 25px;
    width: 50%;
    padding: 20px;
    border-radius: 10px;
    word-wrap: break-word;
`;

export default class Error extends Component {
    render() {
        if (this.props.error) {
            return (
                <div>
                    <Search/>
                    <ErrorMessage>
                        {this.props.error}
                    </ErrorMessage>
                </div>
            )
        }
        return null;
    }
}
