import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { setNavigationState } from '../../redux/actions/navigationActions.js';

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

  test = () => {
    console.log('test');
  };

  render() {
    const { isNavigationOpen, setNavigationState, title, children } = this.props;
    return (
      <div className={styles.app}>
        <div className={styles.background}></div>
        <div className={styles.blend}></div>
        <AppBar title={title} onLeftIconButtonTouchTap={()=>{setNavigationState(open)}}/>
        <LeftNav docked={false} open={isNavigationOpen} onRequestChange={(open)=>setNavigationState(open)}>
          <MenuItem ><Link to="/">Home</Link></MenuItem>
          <MenuItem ><Link to="/trips">Trips</Link></MenuItem>
        </LeftNav>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isNavigationOpen: state.navigation,
  title: state.title,
  trips: state.trips
});

const mapDispatchToProps = { setNavigationState };

export default connect(mapStateToProps, mapDispatchToProps)(App);

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
    // backgroundImage: 'url(\'/static/new_zealand_sheep_farm.jpg\')',
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
    // backgroundColor: 'rgba(0, 10, 0, 0.3)',
    // background: 'radial-gradient(ellipse at center,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
  }
});
