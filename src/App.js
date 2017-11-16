import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import BooksSearch from './BooksSearch'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  checkBookInList(book) {
    const isAvail = this.state.books.filter((b) => b.id === book.id)
    return isAvail.length ? true : false
  }

  updateBook(data) {
    const { book, shelf } = data
    const currentBooks = this.state.books
    let updatedBooks = []

    if (this.checkBookInList(book)) {
      updatedBooks = currentBooks.map((b) => {
        if (book.id === b.id) {
          b.shelf = shelf
        }
        return b
      })
    } else {
      book.shelf = shelf
      updatedBooks = currentBooks.concat([book])
    }

    this.setState(state => ({
      books: updatedBooks
    }))
    BooksAPI.update(book, shelf)
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
        <Route path='/create' render={({history}) => (
          <BooksSearch
            allBooks={this.state.books}
            onBookChange={(data) => this.updateBook(data)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
