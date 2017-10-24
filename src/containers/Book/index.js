import React, { Component } from 'react'
import classNames from 'classnames'
import './index.css'

class Book extends Component {

  render() {

    const title = this.props.title
    const authors = this.props.authors || []
    const imageLinks = this.props.imageLinks || {}
    const className = classNames({ 'book-cover': true, 'book-no-cover': !imageLinks.thumbnail })
    const style = { width: 128, height: 193 }

    if (imageLinks.thumbnail) {
      style.backgroundImage = `url(${imageLinks.thumbnail})`
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className={className} style={style}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book