import React, { Component } from 'react'
import BooksGrid from './BooksGrid'

class BooksListShelf extends Component {
  render() {
    return (
      <div className={`bookshelf ${this.props.id}`}>
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            booksList={this.props.booksList}
            onBookChange={this.props.onBookChange}
          />
        </div>
      </div>
    )
  }
}

export default BooksListShelf