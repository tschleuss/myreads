import React, { Component } from 'react'
import BookShelfChanger from 'containers/BookShelfChanger'
import classNames from 'classnames'
import './index.css'

class Book extends Component {

  render() {

    const {
      data,
      width = 128,
      height = 193,
      onChangeBook = () => { },
      changeOptions
    } = this.props

    const {
      title = '',
      authors = [],
      imageLinks = {},
      shelf = ''
    } = data

    const className = classNames({
      'book-cover': true,
      'book-no-cover': !imageLinks.thumbnail
    })

    const style = { width, height }

    if (imageLinks.thumbnail) {
      style.backgroundImage = `url(${imageLinks.thumbnail})`
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className={className} style={style}></div>
          {changeOptions && (
            <BookShelfChanger
              options={changeOptions}
              selected={shelf}
              onChange={e => onChangeBook(data, e.target.value)} />
          )}
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book