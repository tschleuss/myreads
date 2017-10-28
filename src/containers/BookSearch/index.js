import React, { Component } from 'react'
import Book from 'containers/Book'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import Loading from 'components/Loading'
import * as BooksAPI from 'api/BooksAPI'
import './index.css'

/**
 * Represent the book search function in the app.
 * The search bar as well as the grid of books are created here.
 */
class BookSearch extends Component {

    state = {
        query: '',
        showLoading: false,
        books: [],
        emptyResponse: false
    }

    /**
     * Listener that hear the input value as the user types the search query.
     */
    onUpdateQuery = (query) => {
        const searchTerm = query.trim()
        this.setState({ query: searchTerm, books: [], showLoading: false, emptyResponse: false }, () => {
            this.findBooks(searchTerm)
        })
    }

    /**
     * Find for book with the especified term in the server.
     */
    findBooks = (searchTerm) => {
        if (searchTerm) {
            this.setState({ showLoading: true })
            BooksAPI.search(searchTerm).then(result => {
                const emptyResponse = !!result.error
                const books = emptyResponse ? [] : result
                this.updateBooksShelves(books)
                this.setState({ showLoading: false, emptyResponse, books })
            })
        }
    }

    /**
     * Check the books returned from the search to see if some of them are already on shelves.
     * If we find some, we update their shelf status on the search grid.
     */
    updateBooksShelves = (books) => {
        const { shelvesBooks } = this.props
        books.forEach(book => {
            const bookOnShelve = shelvesBooks.find(shelfBook => shelfBook.id === book.id)
            if (bookOnShelve) {
                book.shelf = bookOnShelve.shelf
            }
        })
    }

    /**
     * Intercept the book shelf changer Callback before propagate it,
     * so we can update the book shelf status in the search grid.
     */
    onChangeSearchedBook = (book, shelf) => {
        const { onChangeBook } = this.props
        const { books } = this.state
        onChangeBook(book, shelf)
        this.setState(state => {
            books.forEach(searchBook => {
                if (searchBook.id === book.id) {
                    searchBook.shelf = shelf
                }
            })
            return { books }
        })
    }

    /**
     * Render our component in the view.
     */
    render() {

        const { changeOptions } = this.props
        const { query, books, emptyResponse, showLoading } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            autoFocus={true}
                            type="text"
                            placeholder="Search by title or author"
                            debounceTimeout={500}
                            value={query}
                            onChange={event => this.onUpdateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showLoading && (
                            <Loading />
                        )}
                        {emptyResponse && (
                            <div className="search-books-notfound">
                                <span>Sorry, no results were found.</span>
                                <span>¯\_(ツ)_/¯</span>
                            </div>
                        )}
                        {books.map(book => (
                            <li key={book.id}>
                                <Book
                                    data={book}
                                    onChangeBook={this.onChangeSearchedBook}
                                    changeOptions={changeOptions} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch