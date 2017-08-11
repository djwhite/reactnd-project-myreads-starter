import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from '../components/Bookshelf';
import Navigation from '../components/Navigation';

class BookshelvesPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <div>
        <Navigation />
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              books={books.filter((book) => (book.shelf === 'currentlyReading'))}
              onUpdateShelf={this.props.onUpdateShelf} />
            <Bookshelf
              title='Want to Read'
              books={books.filter((book) => (book.shelf === 'wantToRead'))}
              onUpdateShelf={this.props.onUpdateShelf} />
            <Bookshelf
              title='Read'
              books={books.filter((book) => (book.shelf === 'read'))}
              onUpdateShelf={this.props.onUpdateShelf} />
          </div>
        </div>
      </div>
    );
  }
}

export default BookshelvesPage;
