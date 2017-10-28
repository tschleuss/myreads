import React from 'react'
import BookShelf from 'containers/BookShelf'
import './index.css'

/**
 * Represent the user library with all the bookshelves.
 */
const UserLibrary = (props) => {

    /**
     * Filter all books for an specific shelf.
     */
    const getBooksForShelf = (books, shelf) => {
        return books.filter(book => book.shelf === shelf)
    }

    const { shelves, books, changeOptions, onChangeBook } = props

    /**
     * Render our component in the view.
     */
    return (
        <div className="list-books-content">
            <div>
                {shelves.map(shelf => (
                    <BookShelf
                        key={shelf.key}
                        name={shelf.value}
                        books={getBooksForShelf(books, shelf.key)}
                        changeOptions={changeOptions}
                        onChangeBook={(book, shelf) => onChangeBook(book, shelf)} />
                ))}
            </div>
        </div>
    )
}

export default UserLibrary
