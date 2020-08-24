import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ConditionalUI from './ConditionalUI/ConditionalUI';
import '../../App.css';

export default function Navbar(props) {
  const [siteNav, setSite] = useState({
    page: [
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

  function handleActivePage(e) {
    let pageName = e.target.name;
    setSite((prevState) => ({
      page: prevState.page.map((page, idx) =>
        idx.toString() === pageName ? { ...page, active: !page.active } : { ...page, active: false }
      ),
    }));
  }

  const pageLinks = siteNav.page.map((page, idx) =>
    page.active === true ? (
      <Link key={idx} to={page.link} name={idx} onClick={handleActivePage} style={{ borderBottom: '2px solid white' }}>
        {page.title}
      </Link>
    ) : (
      <Link key={idx} to={page.link} name={idx} onClick={handleActivePage}>
        {page.title}
      </Link>
    )
  );

  return (
    <div className='navbarOuterContainer'>
      <div className='imageContainer'>
        <Link onClick={handleActivePage} to='/'>
          <img src='/images/brand-logo.svg' alt='brand logo' />
        </Link>
      </div>
      <div className='navbarInnerContainer'>
        <div className='upperNav'>
          <ConditionalUI user={props.user} handleLogout={props.handleLogout} />
        </div>
        <div className='lowerNav'>
          <div className='pageLinks'>{pageLinks}</div>
          <div className='cart'>
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
