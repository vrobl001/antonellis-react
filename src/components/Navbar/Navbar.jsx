import React from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import Cart from '../Cart/Cart';
import '../../App.css';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
          <Link to='/login' onClick={props.handleLogout} style={{ textDecoration: 'none', color: 'black' }}>
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
  return (
    <div className='navbarOuterContainer'>
      <div className='imageContainer'>
        <Link to='/'>
          <img src='/images/brand-logo.svg' />
        </Link>
      </div>
      <div className='navbarInnerContainer'>
        <div className='upperNav'>{conditionalUI}</div>
        <div className='lowerNav'>
          <div className='menuLinks'>
            <Link to='/menu'>Menu</Link>
            <Link to='/catering'>Catering</Link>
            <Link to='/blog'>Blog</Link>
            <Link to='/coupons'>Coupons</Link>
          </div>
          <div className='cart'>
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
