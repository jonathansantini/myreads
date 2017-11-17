import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import BooksSearch from './BooksSearch';
import BooksList from './BooksList';
import './App.css';

/**
* Main class used as the parent component to the app.
* @extends React.Component
*/
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  /**
  * Used to update or add a book to the BooksAPI.
  * @param {object} book - Book object passed from the API.
  * @param {string} shelf - Name of shelf to assign. (i.e. currentlyReading, wantToRead, read)
  */
  updateBook(data) {
    const { book, shelf } = data;
    const currentBooks = this.state.books;
    let updatedBooks = [];

    // Checks if book passed is already set in state.
    const inList = this.state.books.filter((b) => b.id === book.id);
    if (inList.length) {
      // When book is in list, update shelf.
      updatedBooks = currentBooks.map((b) => {
        if (book.id === b.id) {
          b.shelf = shelf;
        }
        return b;
      })
    } else {
      // Otherwise, add shelf to book obj and add it to list.
      book.shelf = shelf;
      updatedBooks = currentBooks.concat([book]);
    }
    // Call API to make sure it is sync'd with state.
    BooksAPI.update(book, shelf);
    // Set state with modified updatedBooks.
    this.setState(state => ({
      books: updatedBooks
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
            allBooks={this.state.books}
            onBookChange={(data) => this.updateBook(data)}
          />
        )}/>
        <Route path="/search" render={({history}) => (
          <BooksSearch
            allBooks={this.state.books}
            onBookChange={(data) => this.updateBook(data)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
