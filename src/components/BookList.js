import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} onUpdateShelf={this.props.onUpdateShelf}/>
          </li>
        ))}
      </ol>
    );
  }
}

export default BookList;
