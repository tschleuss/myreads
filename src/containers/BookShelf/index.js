import React from 'react'
import Book from 'containers/Book'
import './index.css'

/**
 * Represent a specific shelf type with books on the app.
 */
const BookShelf = (props) => {

    const {
        name = '',
        books = [],
        onChangeBook,
        changeOptions
    } = props

    /**
     * Render our component in the view.
     */
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Book data={book} onChangeBook={onChangeBook} changeOptions={changeOptions} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf