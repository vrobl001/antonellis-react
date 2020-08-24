import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../../utils/userService';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function ConditionalUI(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const conditionalUI = userService.getUser() ? (
    <>
      <p>
        Welcome
        <span className='userName'>{props.user.userName.firstName}</span>!
      </p>

      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'>
        <AccountCircle fontSize='large' />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}>
        <MenuItem>
          <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={{ textDecoration: 'none', color: 'black' }}>Past Orders</Link>
        </MenuItem>
        <hr />
        <MenuItem>
          <Link
            to='/login'
            onClick={() => {
              props.handleLogout();
              handleClose();
            }}
            style={{ textDecoration: 'none', color: 'black' }}>
            Log out
          </Link>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <>
      <li>
        <Link to='/login'>Log in</Link>
      </li>
    </>
  );
  return <>{conditionalUI}</>;
}
