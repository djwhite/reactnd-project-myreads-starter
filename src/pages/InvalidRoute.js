import React, { Component } from 'react';
import Navigation from '../components/Navigation';

class InvalidRoute extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="bookshelf">
          <h2 className="bookshelf-title">404: Not Found</h2>
          <p>The page you are looking for does not exist</p>
        </div>
      </div>
    );
  }
}

export default InvalidRoute;
