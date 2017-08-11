import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BookList books={books} onUpdateShelf={this.props.onUpdateShelf}/>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
