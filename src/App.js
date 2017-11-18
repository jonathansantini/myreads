import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Switch, Route } from 'react-router-dom';
import BooksSearch from './BooksSearch';
import BooksList from './BooksList';
import PageNotFound from './PageNotFound';
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
  * Used to properly create a new array of user books.
  * Uses previousState and then checks if the book passed is in already in the list.
  * If it is in the list, books.map generates a new array with the new shelf added to the book.
  * Otherwise, the book is concatenated to the previous book list.
  * @param {array} books - Array of book ojects already added by the user.
  * @param {object} book - Book object passed from the API.
  * @param {string} shelf - Name of shelf to assign. (i.e. currentlyReading, wantToRead, read)
  */
  createBooksList(data) {
    const { books, book, shelf } = data;
    let updatedBooks = [];

    // Checks if book passed is already set in state.
    const inList = books.filter((b) => b.id === book.id);
    if (inList.length) {
      // When book is in list, update shelf.
      updatedBooks = books.map((b) => {
        if (book.id === b.id) {
          b.shelf = shelf;
        }
        return b;
      })
    } else {
      // Otherwise, add shelf to book obj and add it to list.
      book.shelf = shelf;
      updatedBooks = books.concat([book]);
    }
    return updatedBooks;
  }

  /**
  * Used to update or add a book to the BooksAPI and current state.
  * @param {object} book - Book object passed from the API.
  * @param {string} shelf - Name of shelf to assign. (i.e. currentlyReading, wantToRead, read)
  */
  updateBook(data) {
    const { book, shelf } = data;

    // Call API to make sure it is sync'd with state.
    BooksAPI.update(book, shelf);
    // Set state with modified updatedBooks.
    this.setState((prevState) => ({
      books: this.createBooksList({ books: prevState.books, book, shelf })
    }));
  }

  render() {
    return (
      <div className="app">
        <Switch>
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
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
