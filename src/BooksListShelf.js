import React, { Component } from 'react'
import BooksListShelfBooks from './BooksListShelfBooks'

class BooksListShelf extends Component {
  handleBookChange = (e, book) => {
    const shelf = e.target.value;
    if (this.props.onBookChange) {
      this.props.onBookChange(book, shelf)
    }
  }

  render() {
    return (
      <div className={`bookshelf ${this.props.id}`}>
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksListShelfBooks
            booksList={this.props.booksList}
            onBookChange={this.handleBookChange}
          />
        </div>
      </div>
    )
  }
}

export default BooksListShelf