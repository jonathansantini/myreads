import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class BooksSearch extends Component {

  state = {
    query: '',
    searchBooks: []
  }

  onQueryChange = (query) => {
    BooksAPI.search(query.trim()).then(books => {
      this.setState(state => ({
        query: query.trim(),
        searchBooks: books
      }))
    })
  }

  render() {
    const { onBookChange } = this.props;
    const { query, searchBooks } = this.state;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.onQueryChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            booksList={searchBooks}
            onBookChange={onBookChange}
          />
        </div>
      </div>
    )
  }
}

export default BooksSearch