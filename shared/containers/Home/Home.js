import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.welcome}>
          <h1>Welcome</h1>
          <p>This is an app to help you organise your adventures</p>
          <p>Signup to create a new account</p>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = cssInJS({
  home: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    width: '500px',
    backgroundColor: '#fff',
    padding: '30px',
  }
});
