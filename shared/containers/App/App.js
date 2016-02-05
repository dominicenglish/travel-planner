import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  // static propTypes = {
  //   children: PropTypes.object.isRequired,
  //   user: PropTypes.object,
  //   logout: PropTypes.func.isRequired,
  //   pushState: PropTypes.func.isRequired,
  // };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.background}></div>
        <div className={styles.blend}></div>
        <div className={styles.header}>
          <h1 className={styles.logo}> Logo </h1>
          <nav>navigation</nav>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({trips: state.trips}))(App);

const styles = cssInJS({
  app: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: 0,
  },
  header: {
    display: 'flex',
    backgroundColor: '#333',
    color: '#eee',
    padding: '10px'
  },
  logo: {
    marginRight: '10px',
  },
  background: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: 'url(\'/static/new_zealand_sheep_farm.jpg\')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  blend: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 10, 0, 0.3)',
    background: 'radial-gradient(ellipse at center,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
  }
});
