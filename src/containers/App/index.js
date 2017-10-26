import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from 'containers/BookShelf'
import Loading from 'components/Loading'
import * as BooksAPI from 'api/BooksAPI'
import './index.css'

class BooksApp extends Component {

  state = {
    showLoading: false,
    books: [],
    shelves: [
      { key: 'currentlyReading', value: 'Currently Reading' },
      { key: 'wantToRead', value: 'Want to Read' },
      { key: 'read', value: 'Read' }
    ]
  }

  /**
   * Listener to know when we need to query the server for all users books.
   */
  componentDidMount = () => {
    this.getUserBooks()
  }

  /**
   * Build and aeeay one with shelves ids.
   */
  getShelvesKeys = () => {
    return this.state.shelves.map(shelf => shelf.key)
  }

  /**
   * Retrieve all the users books, so we can display on the view.
   */
  getUserBooks = () => {
    this.setState({ showLoading: true })
    BooksAPI.getAll().then(books => {
      this.setState({ showLoading: false, books })
    })
  }

  /**
   * Call the server, asking for information about a specific book.
   * Usually, it's a book that the view is not aware, so we need to retrieve that information.
   */
  addRemoteBook = (bookId) => {
    BooksAPI.get(bookId).then(book => {
      this.setState(state => ({
        books: state.books[book.shelf].push(book)
      }))
    })
  }

  /**
   * Listener to check when some book has moved from one shelf to another.
   * Here we update it state on the server and then update or view.
   */
  onChangeBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelvesUpdated => {
      this.checkForNewBooksFromServer(shelvesUpdated)
      this.updateBookShelfsWithRemoteData(shelvesUpdated)
    })
  }

  /**
   * When we change a book's shelf the server respond with an updated state of all shelves.
   * Here we update the situation of all books that we currently have loaded in the view using what the server respond to us.
   * Books that were removed will not be added in the new books array.
   */
  updateBookShelfsWithRemoteData = (shelvesUpdated) => {
    const serverBooks = []
    this.getShelvesKeys().forEach(shelf => {
      shelvesUpdated[shelf].forEach(id => serverBooks.push({ id, shelf }))
    })
    const books = []
    serverBooks.forEach(serverBook => {
      const viewBook = this.state.books.find(book => serverBook.id === book.id)
      if (viewBook) {
        viewBook.shelf = serverBook.shelf
        books.push(viewBook)
      }
    })
    this.setState({ books })
  }

  /**
   * When we change a book's shelf the server respond with an updated state of all shelves.
   * If for some reason, like the user is changing his/her books on this page and at the same time
   * is adding new books in another tab, we can identify here that a new book that we don't have loaded in the view was added.
   * So here we discover what is the book id and then call the server for that book information.
   */
  checkForNewBooksFromServer = (shelvesUpdated) => {
    const viewBooks = []
    const serverBooks = []
    this.getShelvesKeys().forEach(shelf => {
      this.state.books.forEach(book => viewBooks.push(book.id))
      shelvesUpdated[shelf].forEach(id => serverBooks.push(id))
    })
    const newBooks = serverBooks.filter(id => viewBooks.indexOf(id) < 0)
    newBooks.forEach(bookId => this.addRemoteBook(bookId))
  }

  /**
   * Filter all books for an specific shelf.
   */
  getBooksForShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf)
  }

  /**
   * Return an array of options to build the shelf changer select.
   * I decided to store it here so the entire shelf construction and management can be done dynamically.
   * Alternatively, you can decide to show different options for each shelf, 
   * or disable the shelf changer select in some shelves and so on.
   */
  getShelfChangeOptions = () => {
    return [...this.state.shelves, { key: 'none', value: 'None' }]
  }

  /**
   * Render our component in the view.
   */
  render() {
    return (
      <div className="app" >
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
                    {this.state.shelves.map(shelf => (
                      <BookShelf
                        key={shelf.key}
                        name={shelf.value}
                        books={this.getBooksForShelf(this.state.books, shelf.key)}
                        changeOptions={this.getShelfChangeOptions()}
                        onChangeBook={this.onChangeBook} />
                    ))}
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
