import React from 'react'
import BookShelfChanger from 'containers/BookShelfChanger'
import classNames from 'classnames'
import './index.css'

/**
 * Represent the book that is used in the library and/or the search.
 * It may or may not display the shelf changer based on props..
 */
const Book = (props) => {

    const {
        data,
        width = 128,
        height = 193,
        onChangeBook = () => { },
        changeOptions
    } = props

    const {
        title = '',
        authors = [],
        imageLinks = {},
        shelf = ''
    } = data

    const className = classNames({
        'book-cover': true,
        'book-no-cover': !imageLinks.thumbnail
    })

    const style = { width, height }

    if (imageLinks.thumbnail) {
        style.backgroundImage = `url(${imageLinks.thumbnail})`
    }

    /**
     * Render our component in the view.
     */
    return (
        <div className="book">
            <div className="book-top">
                <div className={className} style={style}></div>
                {changeOptions && (
                    <BookShelfChanger
                        options={changeOptions}
                        selected={shelf}
                        onChange={e => onChangeBook(data, e.target.value)} />
                )}
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
        </div>
    )
}

export default Book