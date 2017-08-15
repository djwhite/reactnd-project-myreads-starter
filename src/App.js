import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookshelvesPage from './pages/BookshelvesPage';
import SearchPage from './pages/SearchPage';
import InvalidRoute from './pages/InvalidRoute';

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
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf

      // The book being added could be a new one from search, so
      // filter out any existing book matching that ID so we don't
      // have two copies.
      this.setState(previousState => ({
        books: previousState.books.filter(b => b.id !== book.id).concat([book])
      }))
    });
  }

  getShelf = (book) => {
    let matchingBooks = this.state.books.filter(b => b.id === book.id);
    if (matchingBooks && matchingBooks.length > 0) {
      return matchingBooks[0];
    } else {
      return null;
    }
  }

  isEmptyOrBlank = (query) => {
    return (!query || query.trim().length === 0);
  }

  searchBooks = (query) => {
    if (!this.isEmptyOrBlank(query)) {
      BooksAPI.search(query, 20).then((bookSearchResults) => {
        // The search API doesn't seem to populate the shelf,
        // so update it here so the shelfchanger reflects the
        // current shelf.
        if (bookSearchResults && bookSearchResults.length > 0)
        {
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
        }
      });
    } else {
      this.setState((state) => ({
        ...state,
        bookSearchResults: []
      }));
    }
  }

  render() {
    const { books, bookSearchResults } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
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

            <Route component={InvalidRoute} />
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default BooksApp;
