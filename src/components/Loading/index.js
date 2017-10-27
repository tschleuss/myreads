import React, { Component } from 'react'
import spinner from './spinner.svg'
import './index.css'

class Loading extends Component {

    render() {
        return (
            <div className="spinner">
                <img src={spinner} alt="Loading..." />
            </div>
        )
    }
}

export default Loading