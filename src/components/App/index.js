import React, { Component } from 'react'
import Book from 'containers/Book'
import Loading from 'components/Loading'
import * as BooksAPI from 'api/BooksAPI'
import './index.css'


class BooksApp extends Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showLoading: true,
    showSearchPage: false
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      console.log(books)
    })
  }



  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.showLoading && (
                  <Loading />
                )}
                {!this.state.showLoading && (
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <Book title="To Kill a Mockingbird" authors={["Harper Lee"]} imageLinks={{ thumbnail: 'https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                          <li>
                            <Book title="Ender's Game" authors={["Orson Scott Card"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <Book title="1776" authors={["David McCullough"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                          <li>
                            <Book title="Harry Potter and the Sorcerer's Stone" authors={["J.K. Rowling"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <Book title="The Hobbit" authors={["J.R.R. Tolkien"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                          <li>
                            <Book title="Oh, the Places You'll Go!" authors={["Seuss"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                          <li>
                            <Book title="The Adventures of Tom Sawyer" authors={["Mark Twain"]} imageLinks={{ thumbnail: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' }} />
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
