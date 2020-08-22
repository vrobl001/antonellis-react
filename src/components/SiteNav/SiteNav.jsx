import React from 'react';
import '../../App.scss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

function ElevationScroll(props) {
  const { children } = props;
  return React.cloneElement(children);
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function SiteNav(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant='h6'>Scroll to Elevate App Bar</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
