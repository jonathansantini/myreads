import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
* Functional component used to display a collection of books.
* List of books comes from the the prop booksList.
* @extends React
*/
function BooksGrid (props) {
  const { booksList, onBookChange } = props;

  return (
    <ol className="books-grid">
      {booksList
        && booksList.length > 0
        && booksList.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              onBookChange={onBookChange} />
          </li>
      ))}
    </ol>
  )
}

BooksGrid.propTypes = {
  booksList: PropTypes.array.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default BooksGrid;