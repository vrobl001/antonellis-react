import React from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import styles from './Navbar.module.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Navbar(props) {
  const conditionalUI = userService.getUser() ? (
    <div className={styles.rightNav}>
      <p>
        Welcome
        <Link to='/profile' onClick={props.handleActiveApp}>
          <span>{props.user.userName.firstName}</span>!
        </Link>
      </p>

      <li>
        <Link to='/login' onClick={props.handleLogout}>
          Log out
        </Link>
      </li>
    </div>
  ) : (
    <div className={styles.rightNav}>
      <li>
        <Link to='/login'>Log in</Link>
      </li>
    </div>
  );
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={styles.navbar}>
            <Typography variant='h6'>Antonellis Pizza</Typography>
            <ul>{conditionalUI}</ul>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
