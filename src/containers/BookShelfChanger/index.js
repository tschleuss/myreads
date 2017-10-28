import React from 'react'
import './index.css'

/**
 * Represent the select option that may appear on top of the books to
 *  allow's user to change the book from shelf to shelf.
 */
const BookShelfChanger = (props) => {

    const { options = [], selected = '', onChange } = props

    /**
     * Render our component in the view.
     */
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

export default BookShelfChanger