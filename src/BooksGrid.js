import React, { Component } from 'react'

class BooksGrid extends Component {
  handleBookChange = (e, book) => {
    const shelf = e.target.value;
    if (this.props.onBookChange) {
      this.props.onBookChange(book, shelf)
    }
  }

  render() {
    const { booksList } = this.props

    return (
      <ol className="books-grid">
        {booksList && booksList.length > 0 && booksList.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf || `none`} onChange={(e) => this.handleBookChange(e, book)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksGrid