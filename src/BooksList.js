import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksListShelf from './BooksListShelf';
import config from './config';

/**
* Controlled component used to display book list UI.
* @extends React.Component
*/
class BooksList extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  }

  render() {
    const { allBooks, onBookChange } = this.props;

    /**
    * Used to filter the book list per shelf.
    * @param {string} id - Id of shelf.
    */
    const filterBooks = (id) => {
      return allBooks.filter((book) => book.shelf === id);
    };

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
                onBookChange={onBookChange}
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

export default BooksList;
