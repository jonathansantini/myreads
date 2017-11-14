import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import BooksSearch from './BooksSearch'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList />
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
