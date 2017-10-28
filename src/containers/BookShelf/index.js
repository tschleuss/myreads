import React, { Component } from 'react'
import Book from 'containers/Book'
import './index.css'

/**
 * Represent a specific shelf type with books on the app.
 */
class BookShelf extends Component {

    /**
     * Render our component in the view.
     */
    render() {

        const {
            name = '',
            books = [],
            onChangeBook,
            changeOptions
        } = this.props

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
}

export default BookShelf