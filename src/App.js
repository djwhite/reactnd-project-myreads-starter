import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookshelvesPage from './pages/BookshelvesPage';
import SearchPage from './pages/SearchPage';

class BooksApp extends Component {
  state = {
    books: [],
    bookSearchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let found = false;

    // Attempt to update the book:
    this.setState((state) => ({
      books: state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
          found = true;
        }
        return b;
      })
    }));

    if (!found) {
      book.shelf = shelf;
      // It's a new one from search
      this.setState((state) => ({
        books: state.books.concat([ book ])
      }));
    }
  }

  getShelf = (book) => {
    let matchingBooks = this.state.books.filter(b => b.id === book.id);
    if (matchingBooks && matchingBooks.length > 0) {
      return matchingBooks[0];
    } else {
      return null;
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((bookSearchResults) => {
      // The search API doesn't seem to populate the shelf,
      // so update it here so the shelfchanger reflects the
      // current shelf.
      this.setState((state) => ({
        ...state,
        bookSearchResults: bookSearchResults.map(book => {
          if (!book.shelf) {
            const existingBook = this.getShelf(book);
            if (existingBook) {
              book.shelf = existingBook.shelf || 'none';
            } else {
              book.shelf = 'none';
            }
          }
          return book;
        })
      }));
    });
  }

  render() {
    const { books, bookSearchResults } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <div>
              <BookshelvesPage books={books} onUpdateShelf={this.updateShelf} />
              <div className="open-search">
                <Link to="/search">Search</Link>
              </div>
            </div>
          )} />

          <Route exact path="/search" render={() => (
            <SearchPage
              books={bookSearchResults}
              onUpdateShelf={this.updateShelf}
              onSearch={this.searchBooks} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
