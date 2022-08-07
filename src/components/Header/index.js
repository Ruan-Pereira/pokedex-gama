// import './App.scss';
import React, { useState, useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import logo from '../../images/logo.png';
import iconMenu from '../../images/menu-drop.png';
import { IconMinicart } from './components/IconMinicart';

import './index.scss';

function Header() {
  const datas = useContext(StoreContext);
  const { setOpenCart, search, setSearch } = datas;

  const [openMenuHeader, setOpenMenuHeader] = useState(false);

  function filterProducts() {
    if (window.location.pathname === '/') {
      setOpenMenuHeader(!openMenuHeader);
    } else {
      document.querySelector('.content__name a').click();
      setOpenMenuHeader(true);
    }
  }

  return (
    <header className="container header">
      <div className="header-content">
        <a href="/" className="header-content-logo">
          <img src={logo} alt="Pokedex" />
          <h2>Pokedex</h2>
        </a>
        <div className="header-content-icons-menu">
          <button className="icon-search" onClick={(e) => filterProducts()}>
            <img src={iconMenu} alt="icon-open" />
          </button>
          <button className="icon__bag" onClick={(e) => setOpenCart(true)}>
            <IconMinicart />
          </button>
        </div>
      </div>
      <div className={`header-search ${openMenuHeader ? 'active' : ''}`}>
        <input
          placeholder="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;
