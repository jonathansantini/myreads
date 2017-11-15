import React, { Component } from 'react'

function ShelfBooks(props) {
    return (
      <ol className="books-grid">
        {props.booksList.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors.join(', ')}</div>
            </div>
          </li>
        ))}
      </ol>
    )
}

class BooksListShelf extends Component {
  render() {
    return (
      <div className={`bookshelf ${this.props.id}`}>
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ShelfBooks
            booksList={this.props.booksList}
          />
        </div>
      </div>
    )
  }
}

export default BooksListShelf