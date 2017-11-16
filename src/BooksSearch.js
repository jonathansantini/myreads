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
    this.setState({
      query: query.trim()
    })

    BooksAPI.search(query.trim()).then(books => {
      this.setState(state => ({
        searchBooks: books
      }))
    })
  }

  render() {
    const { allBooks, onBookChange } = this.props;
    const { query, searchBooks } = this.state;

    let showingBooks = []
    if (searchBooks && searchBooks.length) {
      showingBooks = searchBooks.map(book => {
        const inList = allBooks.filter(b => b.id === book.id)
        if (inList.length) {
          book = inList[0]
        }
        return book
      })
    }

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
            booksList={showingBooks}
            onBookChange={onBookChange}
          />
        </div>
      </div>
    )
  }
}

export default BooksSearch