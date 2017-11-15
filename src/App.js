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

  updateBook(book, shelf) {

    const isAvail = this.state.books.filter((b) => b.id === book.id)
    if (isAvail.length) {

      this.setState(state => ({
        books: state.books.map((b) => {
          if (book.id === b.id) {
            b.shelf = shelf
          }
          return b
        })
      }))

    } else {

      book.shelf = shelf
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    }

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
            allBooks={this.state.books}
            onBookChange={(book, shelf) => this.updateBook(book, shelf)}
          />
        )}/>
        <Route path='/create' render={({history}) => (
          <BooksSearch
            onBookChange={(book, shelf) => this.updateBook(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
