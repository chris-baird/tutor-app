import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1> <Link to="/signin">Sign In</Link>{' '}
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}

export default HomePage;
