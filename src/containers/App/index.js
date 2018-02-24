import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookSearch from 'containers/BookSearch'
import UserLibrary from 'containers/UserLibrary'
import Loading from 'components/Loading'
import * as BooksAPI from 'api/BooksAPI'
import { ToastContainer, toast } from 'react-toastify'
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
    const { shelves } = this.state
    return shelves.map(shelf => shelf.key)
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
    BooksAPI.get(bookId).then(book => this.addLocalBook(book))
  }

  /**
   * Listener to check when some book has moved from one shelf to another.
   * Here we update it state on the server and then update or view.
   */
  onChangeBook = (book, shelf) => {
    this.checkNewBookFromSearch(book, shelf)
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
    const shelveKeys = this.getShelvesKeys()
    shelveKeys.forEach(shelf => {
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
    this.setState({ emptyLibrary: books.length === 0, books })
  }

  /**
   * Check if a book exists in local state, if not, we add it.
   */
  checkNewBookFromSearch = (changedBook, changedShelf) => {
    const book = this.state.books.find(book => book.id === changedBook.id)
    const shelveKeys = this.getShelvesKeys()
    if (shelveKeys.includes(changedShelf)) {
      if (!book) {
        this.addLocalBook(changedBook)
      } else {
        const shelfObj = this.state.shelves.find(el => el.key === changedShelf)
        toast.info(`The book '${changedBook.title}' was changed to '${shelfObj.value}' successfully`)
      }
    } else {
      if (book) {
        toast.info(`The book '${changedBook.title}' was removed successfully`)
      }
    }
  }

  /**
   * When we change a book's shelf the server respond with an updated state of all shelves.
   * If for some reason, like the user is changing his/her books on this page and at the same time
   * is adding new books in another tab, we can identify here that a new book that we don't have loaded in the view was added.
   * So here we discover what is the book id and then call the server for that book information.
   */
  checkForNewBooksFromServer = (shelvesUpdated) => {
    const { books } = this.state
    const viewBooks = []
    const serverBooks = []
    const shelveKeys = this.getShelvesKeys()
    shelveKeys.forEach(shelf => {
      books.forEach(book => viewBooks.push(book.id))
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
    const { shelves } = this.state
    return [...shelves, { key: 'none', value: 'None' }]
  }

  /**
   * Add a new book to local state.
   */
  addLocalBook = (book) => {
    this.setState(state => ({
      books: state.books.concat(book)
    }), () => {
      toast.info(`The book '${book.title}' was added successfully`)
    })
  }

  /**
   * Render our component in the view.
   */
  render() {

    const { showLoading, shelves, books } = this.state
    const showEmptyLibrary = !showLoading && books.length === 0
    const showLibrary = !showLoading && !showEmptyLibrary

    return (
      <div className="app" >
        <Route exact={true} path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
              {showLoading && (
                <Loading />
              )}
              {showEmptyLibrary && (
                <div className="empty-library">
                  <span>Seems that your library is empty!</span>
                  <span>Click on the + button below to add some.</span>
                </div>
              )}
              {showLibrary && (
                <UserLibrary
                  shelves={shelves}
                  books={books}
                  changeOptions={this.getShelfChangeOptions()}
                  onChangeBook={(book, shelf) => this.onChangeBook(book, shelf)} />
              )}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact={true} path="/search" render={() => (
          <BookSearch
            shelvesBooks={books}
            changeOptions={this.getShelfChangeOptions()}
            onChangeBook={(book, shelf) => this.onChangeBook(book, shelf)} />
        )} />
        <ToastContainer
          position="bottom-left"
          hideProgressBar={true}
          newestOnTop={true}
        />
      </div>
    )
  }
}

export default BooksApp
