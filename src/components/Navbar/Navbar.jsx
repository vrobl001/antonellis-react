import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import Cart from '../Cart/Cart';
import NavTabs from './NavTabs/NavTabs';
import '../../App.css';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function Navbar(props) {
  const [activeNav, setActive] = useState({
    navTabs: [
      {
        title: 'Menu',
        link: '/menu',
        active: false,
      },
      {
        title: 'Catering',
        link: '/catering',
        active: false,
      },
      {
        title: 'Blog',
        link: '/blog',
        active: false,
      },
      {
        title: 'Coupons',
        link: '/coupons',
        active: false,
      },
    ],
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleActivePage(e) {
    let name = e.target.name;
    setActive((prevState) => ({
      navTabs: prevState.navTabs.map((tab, idx) =>
        idx.toString() === name ? { ...tab, active: !tab.active } : { ...tab, active: false }
      ),
    }));
  }

  function clearActivePage(e) {
    setActive((prevState) => ({
      navTabs: prevState.navTabs.map((tab, idx) =>
        !idx ? { ...tab, active: !tab.active } : { ...tab, active: false }
      ),
    }));
  }

  const navTabs = activeNav.navTabs.map((tab, idx) =>
    tab.active === true ? (
      <Link key={idx} to={tab.link} name={idx} onClick={handleActivePage} style={{ borderBottom: '2px solid white' }}>
        {tab.title}
      </Link>
    ) : (
      <Link key={idx} to={tab.link} name={idx} onClick={handleActivePage}>
        {tab.title}
      </Link>
    )
  );

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
        <Link onClick={clearActivePage} to='/'>
          <img src='/images/brand-logo.svg' />
        </Link>
      </div>
      <div className='navbarInnerContainer'>
        <div className='upperNav'>{conditionalUI}</div>
        <div className='lowerNav'>
          <div className='menuLinks'>{navTabs}</div>
          <div className='cart'>
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
