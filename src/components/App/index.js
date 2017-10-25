import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from 'containers/BookShelf'
import Book from 'containers/Book'
import Loading from 'components/Loading'
import * as BooksAPI from 'api/BooksAPI'
import './index.css'


class BooksApp extends Component {

  state = {
    books: [],
    showLoading: false
  }

  componentDidMount = () => {
    this.setState({ showLoading: true })
    BooksAPI.getAll().then(books => {
      this.setState({ books, showLoading: false })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact={true} path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.state.showLoading ? (
                <Loading />
              ) : (
                  <div>
                    <BookShelf name="Currently Reading" books={this.state.books.filter(book => book.shelf === 'currentlyReading')} />
                    <BookShelf name="Want to Read" books={this.state.books.filter(book => book.shelf === 'wantToRead')} />
                    <BookShelf name="Read" books={this.state.books.filter(book => book.shelf === 'read')} />
                  </div>
                )}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route exact={true} path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
