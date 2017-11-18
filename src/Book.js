import React from 'react';
import PropTypes from 'prop-types';
import config from './config';

/**
* Functional component used to display a collection of books.
* List of books comes from the the prop booksList.
* @extends React
*/
function Book (props) {
  const { book, onBookChange } = props;

  /**
  * Function used to handle the menu change for each book.
  * @param {object} e - Event passed by the onChange event.
  * @param {object} book - The book data object.
  */
  const handleBookChange = (data) => {
    const { e, book } = data;
    const shelf = e.target.value;
    if (onBookChange) {
      onBookChange({ book, shelf })
    }
  }

  const thumb = (book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : config.defaultBookThumb;
  const shelf = book.shelf || 'none';
  const title = book.title || '';
  const authors = book.authors ? book.authors.join(', ') : '';

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumb})` }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => handleBookChange({e, book})}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default Book;