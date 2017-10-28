import React, { Component } from 'react'
import BookShelf from 'containers/BookShelf'
import './index.css'

/**
 * Represent the user library with all the bookshelves.
 */
class UserLibrary extends Component {

    /**
     * Filter all books for an specific shelf.
     */
    getBooksForShelf = (books, shelf) => {
        return books.filter(book => book.shelf === shelf)
    }

    /**
     * Render our component in the view.
     */
    render() {
        const { shelves, books, changeOptions, onChangeBook } = this.props
        return (
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                        <BookShelf
                            key={shelf.key}
                            name={shelf.value}
                            books={this.getBooksForShelf(books, shelf.key)}
                            changeOptions={changeOptions}
                            onChangeBook={(book, shelf) => onChangeBook(book, shelf)} />
                    ))}
                </div>
            </div>
        )
    }
}

export default UserLibrary
