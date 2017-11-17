import React from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

/**
* Functional component used to display each shelf row.
* @extends React.Component
*/
function BooksListShelf (props) {
  const { id, title, booksList, onBookChange } = props;

  return (
    <div className={`bookshelf ${id}`}>
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          booksList={booksList}
          onBookChange={onBookChange}
        />
      </div>
    </div>
  )
}

BooksListShelf.propTypes = {
  booksList: PropTypes.array.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default BooksListShelf;