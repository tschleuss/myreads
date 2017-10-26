import React, { Component } from 'react'
import Book from 'containers/Book'
import './index.css'

class BookShelf extends Component {

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