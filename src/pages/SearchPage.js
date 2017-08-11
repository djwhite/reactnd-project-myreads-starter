import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBooks from '../components/SearchBooks';

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateShelf, onSearch } = this.props;

    return (
      <div className="search-books">
        <SearchBooks
          books={books}
          onUpdateShelf={onUpdateShelf}
          onSearch={onSearch}/>
      </div>
    );
  }
}

export default SearchPage;
