import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    options: {
      moveTo: { text: 'Move to...', enabled: false },
      currentlyReading: { text: 'Currently Reading', enabled: true },
      wantToRead: { text: 'Want to Read', enabled: true },
      read: { text: 'Read', enabled: true },
      none: { text: 'None', enabled: true }
    }
  }

  onShelfChanged = function (event) {
    const { book, onUpdateShelf } = this.props;

    if (book.shelf !== event.target.value) {
      onUpdateShelf(book, event.target.value)
    }
  }

  render() {
    const { book } = this.props;
    const { options } = this.state;

    return (
      <div className="book-shelf-changer">
        <select onChange={(event) => this.onShelfChanged(event)} value={book.shelf}>
          {Object.keys(options).map(
            (key) => (
              options[key].enabled ?
                (<option key={key} value={key}>{options[key].text}</option>)
                :
                (<option key={key} value={key} disabled>{options[key].text}</option>)
              )
            )
          }
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
