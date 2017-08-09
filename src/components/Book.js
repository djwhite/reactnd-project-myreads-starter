import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail}` }}></div>
          <ShelfChanger book={book} onUpdateShelf={this.props.onUpdateShelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    );
  }
}

export default Book;
