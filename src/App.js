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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
            allBooks={this.state.books}
          />
        )}/>
        <Route path='/create' render={({history}) => (
          <BooksSearch
            onBookInsert={(book) => {
              this.insertBook(book)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
