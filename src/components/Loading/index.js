import React from 'react'
import spinner from './spinner.svg'
import './index.css'

/**
 * A simple spinner that is displayed on the app to enable 
 * the user to know when some process is executing.
 */
const Loading = (props) => {

    /**
     * Render our component in the view.
     */
    return (
        <div className="spinner">
            <img src={spinner} alt="Loading..." />
        </div>
    )
}

export default Loading