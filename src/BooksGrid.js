import React from 'react';
import PropTypes from 'prop-types';

/**
* Functional component used to display a collection of books.
* List of books comes from the the prop booksList.
* @extends React.Component
*/
function BooksGrid(props) {
  const { booksList } = props;

  /**
  * Function used to handle the menu change for each book.
  * @param {object} e - Event passed by the onChange event.
  * @param {object} book - The book data object.
  */
  const handleBookChange = (data) => {
    const { e, book } = data;
    const shelf = e.target.value;
    if (props.onBookChange) {
      props.onBookChange({ book, shelf })
    }
  }

  return (
    <ol className="books-grid">
      {booksList && booksList.length > 0 && booksList.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf || `none`} onChange={(e) => handleBookChange({e, book})}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
          </div>
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