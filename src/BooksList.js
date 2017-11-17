import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksListShelf from './BooksListShelf';
import config from './config';

/**
* Functional component used to display book list UI.
* @extends React.Component
*/
function BooksList(props) {
  const { allBooks, onBookChange } = props;

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
          to="/search">
          Add a book
        </Link>
      </div>
    </div>
  )
}

BooksList.propTypes = {
  allBooks: PropTypes.array.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default BooksList;
