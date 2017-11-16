import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

/**
* Controlled component used to display each shelf row.
* @extends React.Component
*/
class BooksListShelf extends Component {
  static propTypes = {
    booksList: PropTypes.array.isRequired,
    onBookChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className={`bookshelf ${this.props.id}`}>
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            booksList={this.props.booksList}
            onBookChange={this.props.onBookChange}
          />
        </div>
      </div>
    )
  }
}

export default BooksListShelf;