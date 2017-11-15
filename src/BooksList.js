import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksListShelf from './BooksListShelf'
import config from './config'

class BooksList extends Component {
  render() {
    const { allBooks } = this.props

    const filterBooks = (id) => {
      return allBooks.filter((book) => book.shelf === id)
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {config.shelfsList.map((shelf) => (
            <div key={shelf.id}>
              <BooksListShelf
                id={shelf.id}
                title={shelf.title}
                booksList={filterBooks(shelf.id)}
              />
            </div>
            ))
          }
        </div>
        <div className="open-search">
          <Link
            to="/create">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default BooksList
