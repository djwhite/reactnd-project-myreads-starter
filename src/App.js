import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookshelvesPage from './pages/BookshelvesPage';
import SearchPage from './pages/SearchPage';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {

    BooksAPI.update(book, shelf);

    this.setState((state) => {
      state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      });
    });
  }

  render() {
    const { books } = this.state;

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
            <SearchPage books={books} onUpdateShelf={this.updateShelf} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
