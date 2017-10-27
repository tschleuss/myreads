import React, { Component } from 'react'
import './index.css'

class BookShelfChanger extends Component {

    render() {
        const { options = [], selected = '', onChange } = this.props
        return (
            <div className="book-shelf-changer">
                <select value={selected} onChange={onChange}>
                    <option value="" disabled>Move to...</option>
                    {options.map(el => (
                        <option key={el.key} value={el.key}>{el.value}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default BookShelfChanger