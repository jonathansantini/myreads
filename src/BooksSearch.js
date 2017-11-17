import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

/**
* Controlled component used to display the book search.
* @extends React.Component
*/
class BooksSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchBooks: []
    };
  }

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  }

  clearQuery = () => {
    this.setState({
      query: '',
      searchBooks: []
    })
  }

  /**
  * Function used to handle what happens when the search query is updated.
  * @param {string} query - Text string coming from the search input.
  */
  onQueryChange = (e) => {
    const query = e.target.value || '';

    // BooksAPI call that returns a book list based on the query in state.
    BooksAPI.search(query.trim()).then(books => {
      this.setState(state => ({
        searchBooks: books ? books : []
      }))
    })

    this.setState({
      query: query.trim()
    })
  };

  render() {
    const { allBooks, onBookChange } = this.props;
    const { query, searchBooks } = this.state;

    // Handles checking if the books searched are already in list.
    let showingBooks = [];
    if (searchBooks && searchBooks.length) {
      showingBooks = searchBooks.map(book => {
        const inList = allBooks.filter(b => b.id === book.id);
        if (inList.length) {
          book = inList[0];
        }
        return book;
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
              onChange={_.debounce(this.onQueryChange, 400, { 'leading': true })}
            />
            { this.state.query && (
              <button
                className="search-clear"
                onClick={this.clearQuery}>
                Clear
              </button>
            )}
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

export default BooksSearch;